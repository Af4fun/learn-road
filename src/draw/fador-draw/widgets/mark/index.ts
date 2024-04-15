import Layer from '../../core/layer';
import Point from '../../core/point';
import { deepClone, styleMerge } from '../../utils';
import MarkEdit from './edit';

export type MarkStyle = {
  color: string;
  size: number;
  src?: string;
  width: number;
  height: number;
  offset: [number, number];
};

const DEFAULT_STYLE: MarkStyle = {
  color: 'red',
  size: 4,
  width: 40,
  height: 40,
  offset: [0, 0],
};

enum LoadStatus {
  Loading,
  Loaded,
  LoadError,
}

export class Mark extends Layer {
  private style: MarkStyle;
  private _style: MarkStyle;
  private image?: HTMLImageElement;
  private status: LoadStatus = LoadStatus.Loading;
  editLayer?: MarkEdit;
  center: Point;

  constructor(start: Point, config?: Partial<MarkStyle>) {
    super('mark');
    this.center = start;
    this.style = styleMerge(DEFAULT_STYLE, config) as MarkStyle;
    this._style = styleMerge(DEFAULT_STYLE, config) as MarkStyle;
    if (this.style.src !== undefined && this.style.src !== '') {
      const img = new Image();
      img.src = this.style.src;
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        this.status = LoadStatus.Loaded;
      };
      img.onerror = () => {
        this.status = LoadStatus.LoadError;
      };
      this.image = img;
    }
  }

  onmousedown(position: { x: number; y: number }) {
    if (!this.editLayer) return;
    this.editLayer.mousedown.call(this.editLayer, position);
  }
  onmousemove(position: { x: number; y: number }) {
    if (!this.editLayer) return;
    this.editLayer.mousemove.call(this.editLayer, position);
  }

  isInPath(p: Point): boolean {
    const x = p.x;
    const y = p.y;
    const [cx, cy] = this.center.toArray();
    if (this.isEdit) {
      return this.editLayer?.isInPath(p) ?? false;
    } else if (this.image) {
      const xisAllow =
        x >= cx - this.style.width / 2 - this.style.offset[0] &&
        x <= cx + this.style.width / 2 + this.style.offset[0];
      const yisAllow =
        y >= cy - this.style.height - this.style.offset[1] &&
        y <= cy + this.style.offset[1];
      return xisAllow && yisAllow;
    } else {
      const d = Math.sqrt((y - this.center.y) ** 2 + (x - this.center.x) ** 2);
      return d < this.style.size;
    }
  }

  getPath() {
    const [x, y] = this.center.toArray();
    return {
      type: this.type,
      path: [[Number(x.toFixed(2)), Number(y.toFixed(2))]],
      style: this.style,
    };
  }

  onEdit() {
    this.isEdit = true;
    this.editLayer = new MarkEdit({
      center: this.center,
      image: this.image,
      style: this.style,
    });
  }

  onSave() {
    if (!this.editLayer) return;
    const { center, style } = this.editLayer.save();
    this.style = style;
    this.center = center;
    this.isEdit = false;
  }

  changeStyle(style: Partial<MarkStyle>) {
    this.style = styleMerge(this.style, style) as MarkStyle;
    this.editLayer?.changeStyle(this.style);
  }

  reset() {
    this.style = deepClone(this._style);
  }

  render(ctx: CanvasRenderingContext2D, scale: number) {
    if (this.isEdit) {
      this.editLayer?.draw(ctx);
    } else {
      if (this.image) {
        if (this.status === LoadStatus.Loading) {
          ctx.textAlign = 'center';
          ctx.fillText('loading...', this.center.x, this.center.y);
        } else if (this.status === LoadStatus.LoadError) {
          ctx.textAlign = 'center';
          ctx.fillText('资源加载失败!', this.center.x, this.center.y);
        } else {
          const dx =
            this.center.x - this.style.width / 2 - this.style.offset[0];
          const dy = this.center.y - this.style.height - this.style.offset[1];
          ctx.drawImage(
            this.image,
            dx, // image的左上角在目标canvas上 X 轴坐标。
            dy, // image的左上角在目标canvas上 Y 轴坐标。
            this.style.width, // img 在canvas 上绘制的宽度 dWidth  设置后图片将会缩放
            this.style.height, // img 在canvas 上绘制的高度 dHeight
          );
        }
      } else {
        ctx.beginPath();
        ctx.fillStyle = this.style.color;
        const [x, y] = this.center.getTruePosition(scale);
        ctx.arc(x, y, this.style.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      }
    }
  }

  startEdit() {
    this.isEdit = true;
    this.editLayer = new MarkEdit({
      center: this.center,
      style: this.style,
      image: this.image,
    });
  }

  saveEdit(): void {
    if (this.editLayer) {
      const { center, style } = this.editLayer.save();
      this.center = Point.clone(center);
      this.style = style;
      this.editLayer = undefined;
      this.isEdit = false;
    }
  }

  cancelEdit() {
    this.editLayer = undefined;
    this.isEdit = false;
    this.reset();
  }
}
