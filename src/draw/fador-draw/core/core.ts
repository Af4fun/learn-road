import { arrayMoveImmutable } from '../utils';
import EventCenter from '../utils/event';
import ActiveLayer from './active_layer';
import Layer from './layer';
import Point from './point';

interface Layout {
  // dpr
  dpr: number;
  width: number;
  height: number;
  // 原点
  origin: Point;
  // 偏移值
  offset: Point;
  // 缩放值
  zoom: number;
}

export default class Core {
  layers: Layer[] = [];
  /** 被选中激活的图层 */
  selectedLayers: Layer[] = [];
  /**正在绘制的元素 */
  activedLayer?: ActiveLayer;
  layout: Layout;
  animationFrame?: number;
  isDrag: boolean = false;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  eventCenter = new EventCenter();

  constructor(el?: HTMLDivElement) {
    if (!el) throw new Error('need a div target');
    const { canvas, context, ...rest } = this.creatElement(el);
    this.canvas = canvas;
    this.context = context;
    this.layout = rest;
    this.bindEvents();
    this.render();
  }

  get scale() {
    const zoom = this.layout.zoom;
    if (zoom > 0) {
      return zoom + 1;
    } else if (zoom < 0) {
      return 1 / (-zoom + 1);
    }
    return 1;
  }

  creatElement(el: HTMLDivElement): Layout & {
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
  } {
    let target = document.createElement('canvas');
    const dpr = window.devicePixelRatio || 1;
    const _style = window.getComputedStyle(el);
    const width = parseFloat(_style.width);
    const height = parseFloat(_style.height);
    target.width = width * dpr;
    target.height = height * dpr;
    target.style.width = width + 'px';
    target.style.height = height + 'px';
    target.style.cursor = 'grab';
    target.style.userSelect = 'none';
    const context = target.getContext('2d') as CanvasRenderingContext2D;
    context.scale(dpr, dpr);
    context.translate(width / 2, height / 2);
    el.appendChild(target);
    return {
      dpr,
      zoom: 0,
      width,
      height,
      origin: new Point(0, 0),
      offset: new Point(0, 0),
      canvas: target,
      context,
    };
  }

  addlayer(layers: Layer | Layer[]): Layer[] {
    if (Array.isArray(layers)) {
      this.layers = this.layers.concat(layers);
    } else {
      this.layers.push(layers);
    }

    return this.layers;
  }

  deleteLayer(layer: Layer | Layer[]): Layer[] {
    for (let i = 0; i < this.layers.length; i++) {
      if (Array.isArray(layer)) {
        for (let l of layer) {
          if (l === this.layers[i]) {
            this.layers.splice(i, 1);
            const idx = this.selectedLayers.findIndex((acl) => acl == l);
            if (idx > -1) {
              this.selectedLayers.splice(idx, 1);
            }
          }
        }
      } else {
        if (layer === this.layers[i]) {
          this.layers.splice(i, 1);
          const idx = this.selectedLayers.findIndex((l) => l == layer);
          if (idx > -1) {
            this.selectedLayers.splice(idx, 1);
          }
        }
      }
    }

    return this.layers;
  }

  selectLayerByUuid(uuid: string): Layer | undefined {
    for (let i = 0; i < this.layers.length; i += 1) {
      if (this.layers[i].uuid == uuid) {
        return this.layers[i];
      }
    }
    return undefined;
  }

  // 拖拽变更 数组元素位置
  layerMove(oldIndex: number, newIndex: number) {
    this.layers = arrayMoveImmutable(
      this.layers,
      oldIndex,
      newIndex,
    ) as Layer[];
    this.eventCenter.emit('layerChange', this.layers);
  }

  // 触发观察者
  notifyAllObservers(action: string, ...arg: any): void {
    this.layers.forEach((layer) => layer.update.call(layer, action, ...arg));
  }

  paint(): void {
    const { width, height, offset } = this.layout;
    const context = this.context;
    if (!context) return;
    context.clearRect(-width / 2, -height / 2, width * 2, height * 2);
    context.save();
    const [x, y] = offset.getTruePosition(this.scale);
    /** 把原点移动到画布的中心 */
    context.translate(x, y);
    for (let i = 0; i < this.layers.length; i += 1) {
      this.layers[i].render(context, this.scale);
    }
    this.activedLayer?.render(context, this.scale);
    context.restore();
  }

  resize() {
    const el = this.canvas.parentElement as HTMLDivElement;
    const _style = window.getComputedStyle(el);
    const w = parseFloat(_style.width);
    const h = parseFloat(_style.height);
    this.canvas.width = w * this.layout.dpr;
    this.canvas.height = h * this.layout.dpr;
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.layout.width = w;
    this.layout.height = h;
    this.context.scale(this.layout.dpr, this.layout.dpr);
    this.context.translate(this.layout.width / 2, this.layout.height / 2);
  }

  render(): void {
    this.animationFrame = requestAnimationFrame(this.render.bind(this));
    this.paint();
  }

  // 销毁实例
  destroy() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }

  /**
   * 捕获触发位置的layer
   * layers 是一个队列 若layer 有重叠 那么应该取索引比较大的那一个
   * @param x
   * @param y
   * @returns
   */
  getLayerByPosition(p: Point): Layer | undefined {
    const queue = [...this.layers];
    while (queue.length) {
      const topLayer = queue.pop();
      if (!topLayer) return;
      if (topLayer.isInPath(p)) return topLayer;
      continue;
    }
  }

  /**
   * 获取鼠标位于坐标轴上的位置
   * @param e
   * @returns
   */
  getPosition({ offsetX, offsetY }: MouseEvent): Point {
    const { origin, width, height } = this.layout;
    // 真实像素
    const tx = offsetX - width / 2;
    const ty = offsetY - height / 2;
    // 映射到坐标轴上的坐标
    const lx = tx * this.scale;
    const ly = ty * this.scale;
    return new Point(lx - origin.x, ly - origin.y);
  }

  onWheel(e: WheelEvent) {
    e.preventDefault();
    if (e.deltaY < 0) {
      this.layout.zoom = Math.min(3, this.layout.zoom + 1);
    } else {
      this.layout.zoom = Math.max(-3, this.layout.zoom - 1);
    }
  }
  // 绑定编辑事件
  bindEditEvent(layer: Layer) {
    const canvas = this.canvas;
    canvas.onmouseup = (e: MouseEvent) => {
      e.preventDefault();
      layer.update('onmouseup', this.getPosition(e));
      canvas.onmousemove = (e: MouseEvent) => this.onHover.call(this, e);
      // 移除事件
      canvas.onmouseup = null;
    };

    canvas.onmouseleave = (e: MouseEvent) => {
      e.preventDefault();
      layer.update('onmouseup', this.getPosition(e));
      canvas.onmousemove = (e: MouseEvent) => this.onHover.call(this, e);
      // 移除事件
      canvas.onmouseup = null;
      canvas.onmouseleave = null;
    };

    canvas.onmousemove = (e: MouseEvent) => {
      e.preventDefault();
      layer.update('onmousemove', this.getPosition(e));
    };
  }
  // 绑定拖拽事件
  bindDragEvent(position: Point, layer?: Layer) {
    const canvas = this.canvas;
    const { origin } = this.layout;
    this.isDrag = false;
    canvas.onmousemove = (e: MouseEvent) => {
      e.preventDefault();
      this.isDrag = true;
      canvas.style.cursor = 'grabbing';
      const end = this.getPosition(e);
      const x = end.x - position.x;
      const y = end.y - position.y;
      if (this.selectedLayers.length > 0) {
        this.selectedLayers.forEach((actived) => {
          const [ox, oy] = actived.origin.toArray();
          // actived.offset.update(ox + x, oy + y);
        });
      } else {
        const [ox, oy] = origin.toArray();
        // 重置偏移量
        this.layout.offset.update(ox + x, oy + y);
      }

      canvas.onmouseleave = (e: MouseEvent) => {
        e.preventDefault();
        handleUpdate.call(this, e);
        canvas.onmousemove = (e: MouseEvent) => this.onHover.call(this, e);
        // 移除事件
        canvas.onmouseup = null;
        canvas.onmouseleave = null;
        this.isDrag = false;
      };
    };

    const handleUpdate = (e: MouseEvent) => {
      const end = this.getPosition(e);
      const x = end.x - position.x;
      const y = end.y - position.y;
      if (this.selectedLayers.length > 0) {
        this.selectedLayers.forEach((actived) => {
          const [ox, oy] = actived.origin.toArray();
          actived.origin.update(ox + x, oy + y);
        });
      } else {
        // 修正原点
        const [ox, oy] = origin.toArray();
        this.layout.origin.update(ox + x, oy + y);
      }
      canvas.style.cursor = 'grab';
    };

    canvas.onmouseup = (e: MouseEvent) => {
      e.preventDefault();
      if (!this.isDrag) {
        layer && layer.update('emit', 'onclick', e);
      } else {
        handleUpdate.call(this, e);
      }
      canvas.onmousemove = (e: MouseEvent) => this.onHover.call(this, e);
      //  移除事件
      canvas.onmouseup = null;
      canvas.onmouseleave = null;
      this.isDrag = false;
    };
  }

  onMouseDown(e: MouseEvent) {
    e.preventDefault();
    const { button } = e;
    /** 区分左右键 */
    if (button !== 0) return;
    const position = this.getPosition(e);
    const layer = this.getLayerByPosition(position);
    // 捕获到编辑中的图层 对canvas 执行事件监听
    if (layer && layer.isEdit) {
      // 对canvas 事件覆盖监听
      layer.update('onmousedown', position);
      this.bindEditEvent(layer);
    } else {
      // 否则执行图层移动方法
      this.bindDragEvent(position, layer);
    }
  }

  onMouseLeave(e: MouseEvent) {
    e.preventDefault();
    this.isDrag = false;
  }

  onHover(e: MouseEvent) {
    e.preventDefault();
    const canvas = this.canvas;
    const position = this.getPosition(e);
    const layer = this.getLayerByPosition(position);
    if (layer) {
      if (!layer.isMouseIn && !layer.isEdit) {
        this.eventCenter.emit('mouseenter', layer);
        layer.isMouseIn = true;
        layer.update('onhover');
      }
      canvas.style.cursor = 'inherit';
    } else {
      canvas.style.cursor = 'grab';
    }
    this.layers.forEach((x) => {
      if (x != layer && x.isMouseIn) {
        this.eventCenter.emit('mouseleave', layer);
        x.isMouseIn = false;
      }
    });
  }

  // 响应事件
  on(name: string, fc: (arg?: any) => void) {
    this.eventCenter.on(name, fc);
  }

  onContextMenu(e: MouseEvent) {
    e.preventDefault();
  }

  // 绑定初始事件
  bindEvents() {
    const canvas = this.canvas;
    /** 绑定滚轮事件 */
    canvas.onwheel = (e: WheelEvent) => this.onWheel.call(this, e);
    canvas.onmousedown = (e: MouseEvent) => this.onMouseDown.call(this, e);
    canvas.onmouseleave = (e: MouseEvent) => this.onMouseLeave.call(this, e);
    canvas.oncontextmenu = (e: MouseEvent) => this.onContextMenu.call(this, e);
    canvas.onmousemove = (e: MouseEvent) => this.onHover.call(this, e);
  }
  // 移除事件
  removeEvents() {
    const canvas = this.canvas;
    // canvas.onwheel = null;
    canvas.onmousedown = null;
    canvas.onmouseleave = null;
    canvas.oncontextmenu = null;
    canvas.onmousemove = null;
  }

  afterPaint() {
    this.removeEvents();
    this.canvas.style.cursor = 'grab';
    this.activedLayer?.reset();
    this.bindEvents();
  }

  reset() {
    this.afterPaint();
    this.layout.offset.update(0, 0);
    this.layout.origin.update(0, 0);
    this.layout.zoom = 0;
    // this.notifyAllObservers("onScale", this.layout.zoom);
  }
}
