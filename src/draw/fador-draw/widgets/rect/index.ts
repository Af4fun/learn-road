import Layer from '../../core/layer';
import Point from '../../core/point';
import { styleMerge } from '../../utils';
import RectEdit from './edit';

export type RectStyle = Partial<{
  borderColor: string;
  borderWidth: number;
  backgroundColor: string;
  dashed: boolean;
}>;

const DEFAULT_STYLE: RectStyle = {
  backgroundColor: 'rgba(3,3,3,.2)',
  borderColor: 'transparent',
  borderWidth: 1,
  dashed: false,
};

export default class Rect extends Layer {
  private style: RectStyle;
  private styleBackup: RectStyle;
  private start: Point;
  private _startBackup: Point;
  private end: Point;
  private _endBackup: Point;

  editLayer?: RectEdit;

  constructor({
    start,
    end,
    style,
  }: {
    style?: Partial<RectStyle>;
    start: Point;
    end: Point;
  }) {
    super('rect');
    this.start = this._startBackup = Point.clone(start);
    this.end = this._endBackup = Point.clone(end);
    this.style = this.styleBackup = styleMerge(
      DEFAULT_STYLE,
      style,
    ) as RectStyle;
  }

  getCenter() {
    return Point.getCenter(this.start, this.end);
  }

  render(ctx: CanvasRenderingContext2D, scale: number): void {
    if (this.isEdit) {
      this.editLayer?.render(ctx, scale);
    } else {
      ctx.beginPath();
      this.style.borderWidth! > 0 && (ctx.lineWidth = this.style.borderWidth!);
      this.style.dashed ? ctx.setLineDash([5]) : ctx.setLineDash([0]);
      ctx.strokeStyle = this.style.borderColor!;
      ctx.fillStyle = this.style.backgroundColor!;
      const [sx, sy] = this.start.getTruePosition(scale);
      const [ex, ey] = this.end.getTruePosition(scale);
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, sy);
      ctx.lineTo(ex, ey);
      ctx.lineTo(sx, ey);
      ctx.lineTo(sx, sy);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }

  isInPath(p: Point) {
    if (this.isEdit) {
      return this.editLayer?.isInPath(p) ?? false;
    } else {
      const xisAllow = p.x >= this.start.x && p.x <= this.end.x;
      const yisAllow = p.y >= this.start.y && p.y <= this.end.y;
      return xisAllow && yisAllow;
    }
  }

  reset() {
    this.start = this._startBackup;
    this.end = this._endBackup;
    this.style = this.styleBackup;
  }

  startEdit() {
    this.isEdit = true;
    this.editLayer = new RectEdit(this.start, this.end, this.style);
  }

  saveEdit(): void {
    if (this.editLayer) {
      const { start, end, style } = this.editLayer.onSave();
      this.end = Point.clone(end);
      this.start = Point.clone(start);
      this._startBackup = Point.clone(start);
      this._endBackup = Point.clone(end);
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

  onmousedown(position: Point) {
    if (this.isEdit) {
      this.editLayer?.mousedown.call(this.editLayer, position);
    }
  }

  onmousemove(position: Point) {
    if (this.isEdit) {
      this.editLayer?.mousemove.call(this.editLayer, position);
    }
  }
}
