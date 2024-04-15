import Core from './core/core';
import Layer from './core/layer';
import MenuPop from './core/menu_pop';
import Point from './core/point';
import { arrayMoveImmutable } from './utils';
import Circular, { CircularStyle } from './widgets/circular';
import CircularActiveLayer, {
  CircularActiveStyle,
} from './widgets/circular/active';
import Geometry, { GeometryStyle } from './widgets/geometry';
import { GeoActiveStyle, GeometryActiveLayer } from './widgets/geometry/active';
import Line from './widgets/line';
import LineActiveLayer, { LineActiveStyle } from './widgets/line/active';
import { Mark } from './widgets/mark';
import Rect, { RectStyle } from './widgets/rect';
import RectActiveLayer, { RectActiveStyle } from './widgets/rect/active';

export default class Draw extends Core {
  menu: MenuPop;
  activedLayerIndex: number = -1;
  constructor(el?: HTMLDivElement) {
    super(el);
    this.menu = new MenuPop();
    el?.appendChild(this.menu.el);
  }

  onContextMenu(e: MouseEvent): void {
    super.onContextMenu(e);
    const position = this.getPosition(e);
    const layer = this.getLayerByPosition(position);
    const last = this.layers.length - 1;
    const self = this;
    if (layer) {
      this.menu.open(
        e.offsetX,
        e.offsetY,
        layer.isEdit
          ? {
              onSave() {
                layer.saveEdit();
                self.layers = arrayMoveImmutable(
                  self.layers,
                  last,
                  self.activedLayerIndex,
                );
              },
              onCancel() {
                layer.cancelEdit();
                self.layers = arrayMoveImmutable(
                  self.layers,
                  last,
                  self.activedLayerIndex,
                );
              },
            }
          : {
              onEdit() {
                // 此时需要将layer至于图层的顶层
                self.activedLayerIndex = self.layers.findIndex(
                  (l) => l.uuid === layer.uuid,
                );
                self.layers = arrayMoveImmutable(
                  self.layers,
                  self.activedLayerIndex,
                  last,
                );
                layer.startEdit.call(layer);
              },
              onDelete() {
                self.deleteLayer(layer);
                self.activedLayerIndex = -1;
              },
            },
      );
    } else {
      this.menu.close();
    }
  }

  bindDragEvent(position: Point, layer?: Layer | undefined): void {
    super.bindDragEvent(position, layer);
    if (this.menu.isOpen) {
      this.menu.close();
    }
  }

  line(config?: {
    activeStyle?: LineActiveStyle;
    lineStyle?: LineActiveStyle;
    onSuccess?(layer: Line): void;
  }) {
    this.removeEvents();
    this.canvas.style.cursor = 'crosshair';
    const line_active = new LineActiveLayer(config?.activeStyle);
    this.activedLayer = line_active;
    // 绑定绘制事件
    this.canvas.onmousedown = (e) => {
      if (e.button !== 0) return;
      const { x, y } = this.getPosition(e);
      line_active.setStart(x, y);
      this.canvas.onmousemove = (e: MouseEvent) => {
        const activedPosition = this.getPosition(e);
        line_active.setActived(activedPosition.x, activedPosition.y);
      };
    };

    this.canvas.onmouseup = (e) => {
      this.canvas.onmousemove = null;
      const end = this.getPosition(e);
      if (line_active.start) {
        /** 绘制线段长度 */
        const line_long = Math.sqrt(
          (end.y - line_active.start.y) ** 2 +
            (end.x - line_active.start.x) ** 2,
        );
        if (line_long > 5) {
          const line = new Line({
            start: line_active.start,
            end,
            style: config?.lineStyle,
          });
          this.addlayer(line);
          config?.onSuccess?.(line);
        } else {
          line_active.reset();
        }
      }

      this.afterPaint();
    };

    this.canvas.onmouseleave = () => {
      this.canvas.onmousemove = null;
      this.afterPaint();
    };
  }

  mark(config?: {
    src?: string;
    color?: string;
    size?: number;
    onSuccess?(layer: Mark): void;
  }) {
    this.removeEvents();
    this.canvas.style.cursor = 'crosshair';
    this.canvas.onmousedown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const start = this.getPosition(e);
      const layer = new Mark(start, {
        src: config?.src,
        color: config?.color,
        size: config?.size,
      });
      this.addlayer(layer);
      this.afterPaint();
      config?.onSuccess?.(layer);
    };
  }

  cricular(config?: {
    activeStyle?: CircularActiveStyle;
    /** 生成样式 */
    cricularStyle?: CircularStyle;

    onSuccess?(layer: Circular): void;
  }) {
    this.removeEvents();
    this.canvas.style.cursor = 'crosshair';
    const circular_active = new CircularActiveLayer(config?.activeStyle);
    this.activedLayer = circular_active;

    const setAct = (n: MouseEvent) => {
      const p = this.getPosition(n);
      circular_active.setActived(p);
    };

    this.canvas.onmousedown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const center = this.getPosition(e);
      circular_active.setCenter(center);
      this.canvas.addEventListener('mousemove', setAct);
    };

    this.canvas.onmouseup = () => {
      this.canvas.removeEventListener('mousemove', setAct);
      if (circular_active.center && circular_active.radius > 0) {
        const layer = new Circular({
          center: circular_active.center,
          radius: circular_active.radius,
          style: config?.cricularStyle,
        });
        this.addlayer(layer);
        this.afterPaint();
        config?.onSuccess?.(layer);
      }
    };

    this.canvas.onmouseleave = () => {
      this.canvas.removeEventListener('mousemove', setAct);
      this.afterPaint();
    };
  }

  geometry(config?: {
    /** 活动器样式 */
    activeStyle?: GeoActiveStyle;
    /** 生成样式 */
    geoStyle?: GeometryStyle;
    onSuccess?: (layer: Geometry) => void;
  }) {
    this.removeEvents();
    this.canvas.style.cursor = 'crosshair';
    let timeId: any;
    const geometry_active = new GeometryActiveLayer(config?.activeStyle);
    this.activedLayer = geometry_active;
    this.canvas.onmousedown = (e: MouseEvent) => {
      if (timeId) clearTimeout(timeId);
      timeId = setTimeout(() => {
        if (e.button !== 0) return;
        const p = this.getPosition(e);
        geometry_active.updatePath(p);
        this.canvas.onmousemove = (n: MouseEvent) => {
          const m = this.getPosition(n);
          geometry_active.setActived(m);
        };
      }, 100);
    };

    this.canvas.oncontextmenu = (e: MouseEvent) => {
      e.preventDefault();
      clearTimeout(timeId);
      if (geometry_active) {
        if (!geometry_active.first) {
          // cancel
          this.afterPaint();
        } else {
          geometry_active.clearPath();
        }
      }
    };

    this.canvas.ondblclick = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      clearTimeout(timeId);
      if (geometry_active.isClose) {
        const path = geometry_active.genPath();
        const layer = new Geometry({
          path,
          style: config?.geoStyle,
        });
        this.addlayer(layer);
        config?.onSuccess?.(layer);
        this.afterPaint();
      }
    };
  }

  rect(config?: {
    activeStyle?: RectActiveStyle;
    rectStyle?: RectStyle;
    onSuccess?(layer: Rect): void;
  }) {
    this.removeEvents();
    this.canvas.style.cursor = 'crosshair';
    const rect_active = new RectActiveLayer(config?.activeStyle);
    this.activedLayer = rect_active;

    const setAct = (n: MouseEvent) => {
      rect_active.setActived(this.getPosition(n));
    };

    this.canvas.onmousedown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      this.canvas.addEventListener('mousemove', setAct);
      rect_active.setStart(this.getPosition(e));
    };

    this.canvas.onmouseup = (e: MouseEvent) => {
      this.canvas.removeEventListener('mousemove', setAct);
      const end = this.getPosition(e);
      if (
        rect_active.start &&
        rect_active.width > 20 &&
        rect_active.height > 20
      ) {
        const layer = new Rect({
          start: rect_active.start,
          end,
          style: config?.rectStyle,
        });
        this.addlayer(layer);
        this.afterPaint();
        config?.onSuccess?.(layer);
      } else {
        rect_active.reset();
      }
    };

    this.canvas.onmouseleave = () => {
      this.afterPaint();
    };
  }
}
