import Layer from "../../core/layer";
import Point from "../../core/point";
import { styleMerge } from "../../utils";
import LineEdit from "./edit";

export type LineStyle = {
  width: number;
  color: string;
  dashed: boolean;
};

const DEFAULT_STYLE: LineStyle = {
  width: 1,
  color: "#000",
  dashed: false,
};

class Line extends Layer {
  private style: LineStyle;
  private styleBackup: LineStyle;
  private editLayer?: LineEdit;
  private start: Point;
  private _startBackup: Point;
  private end: Point;
  private _endBackup: Point;
  constructor({
    style,
    start,
    end,
  }: {
    style?: Partial<LineStyle>;
    start: Point;
    end: Point;
  }) {
    super("line");
    this.start = Point.fromArray(start.toArray());
    this.end = Point.fromArray(end.toArray());
    this._endBackup = Point.fromArray(end.toArray());
    this._startBackup = Point.fromArray(start.toArray());
    this.style = styleMerge(DEFAULT_STYLE, style) as LineStyle;
    this.styleBackup = styleMerge(DEFAULT_STYLE, style) as LineStyle;
  }

  get long(): number {
    const d = Math.sqrt(
      (this.end.y - this.start.y) ** 2 + (this.end.x - this.start.x) ** 2
    );
    return d;
  }

  /** 求解在线段两边宽度为4的范围内的合法点 */
  isInPath(p: Point) {
    // ** 位置修正**
    if (this.isEdit) {
      return this.editLayer?.isInPath(p) ?? false;
    } else {
      const offset_w = 10;
      // 线段旋转至水平需要转动的角度为 r
      const angle = Math.atan2(
        this.end.y - this.start.y,
        this.end.x - this.start.x
      );
      const center = Point.getCenter(this.start, this.end);
      const [x, y] = Point.rotateByPoint(p, center, -angle).toArray();
      const [sx, sy] = Point.rotateByPoint(
        this.start,
        center,
        -angle
      ).toArray();
      const [ex, ey] = Point.rotateByPoint(this.end, center, -angle).toArray();
      return (
        Math.min(sx, ex) <= x &&
        Math.max(sx, ex) >= x &&
        Math.min(sy + offset_w, ey - offset_w) <= y &&
        Math.max(sy + offset_w, ey - offset_w) >= y
      );
    }
  }

  getPath() {
    const [x, y] = this.start.toArray();
    const [ex, ey] = this.end.toArray();
    return {
      type: this.type,
      path: [
        [Number(x.toFixed(2)), Number(y.toFixed(2))],
        [Number(ex.toFixed(2)), Number(ey.toFixed(2))],
      ],
      style: this.style,
    };
  }

  changeStyle(style: Partial<LineStyle>) {
    const newStyle = { ...this.style, ...style };
    this.style = newStyle;
    this.editLayer?.changeStyle(newStyle);
  }

  reset() {
    this.start = Point.clone(this._startBackup);
    this.end = Point.clone(this._endBackup);
    this.style = this.styleBackup;
  }

  render(context: CanvasRenderingContext2D, scale: number): void {
    if (this.isEdit) {
      this.editLayer?.paint(context, scale);
    } else {
      context.beginPath();
      this.style.width > 0 && (context.lineWidth = this.style.width);
      this.style.dashed ? context.setLineDash([5]) : context.setLineDash([0]);
      context.strokeStyle = this.style.color;
      const [sx, sy] = this.start.getTruePosition(scale);
      const [ex, ey] = this.end.getTruePosition(scale);
      context.moveTo(sx, sy);
      context.lineTo(ex, ey);
      context.closePath();
      context.stroke();
    }
  }

  startEdit() {
    this.isEdit = true;
    this.editLayer = new LineEdit(this.start, this.end, this.style);
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

export default Line;
