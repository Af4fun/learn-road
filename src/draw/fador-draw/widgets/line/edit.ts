import Point from "../../core/point";
import { LineStyle } from ".";

export default class LineEdit {
  private start: Point;
  private end: Point;
  active?: "start" | "end";
  private sx: number = 0;
  private sy: number = 0;
  private px: number = 0;
  private py: number = 0;
  ctrlRadius: number = 4;
  style: LineStyle;

  constructor(start: Point, end: Point, style: LineStyle) {
    this.start = Point.clone(start);
    this.end = Point.clone(end);
    this.style = style;
  }

  paint(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.save();
    ctx.beginPath();
    this.style.width > 0 && (ctx.lineWidth = this.style.width);
    this.style.dashed ? ctx.setLineDash([5]) : ctx.setLineDash([0]);
    ctx.strokeStyle = this.style.color;
    const [x, y] = this.start.getTruePosition(scale);
    const [ex, ey] = this.end.getTruePosition(scale);
    ctx.moveTo(x, y);
    ctx.lineTo(ex, ey);
    ctx.closePath();
    ctx.stroke();
    this.paintCtr(this.start, ctx, scale);
    this.paintCtr(this.end, ctx, scale);
    ctx.restore();
  }

  /** 绘制控制点 */
  paintCtr(p: Point, ctx: CanvasRenderingContext2D, scale: number) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.setLineDash([0]);
    ctx.strokeStyle = "green";
    ctx.fillStyle = "#1890ff";
    const [px, py] = p.getTruePosition(scale);
    ctx.arc(px, py, this.ctrlRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }

  isInCtrPoint(p: Point, c: Point) {
    return (
      p.x > c.x - this.ctrlRadius &&
      p.x < c.x + this.ctrlRadius &&
      p.y > c.y - this.ctrlRadius &&
      p.y < c.y + this.ctrlRadius
    );
  }

  isInPath(p: Point) {
    if (this.isInCtrPoint(p, this.start)) {
      this.active = "start";
      return true;
    } else if (this.isInCtrPoint(p, this.end)) {
      this.active = "end";
      return true;
    }
    this.active = undefined;

    const offset_w = 10;
    // 线段旋转至水平需要转动的角度为 r
    const angle = Math.atan2(
      this.end.y - this.start.y,
      this.end.x - this.start.x
    );
    const center = Point.getCenter(this.start, this.end);
    const [x, y] = Point.rotateByPoint(p, center, -angle).toArray();
    const [sx, sy] = Point.rotateByPoint(this.start, center, -angle).toArray();
    const [ex, ey] = Point.rotateByPoint(this.end, center, -angle).toArray();
    return (
      Math.min(sx, ex) <= x &&
      Math.max(sx, ex) >= x &&
      Math.min(sy + offset_w, ey - offset_w) <= y &&
      Math.max(sy + offset_w, ey - offset_w) >= y
    );
  }

  mousedown(p: Point) {
    this.sx = p.x;
    this.sy = p.y;
    if (this.active == "start") {
      this.px = this.start.x;
      this.py = this.start.y;
    } else if (this.active == "end") {
      this.px = this.end.x;
      this.py = this.end.y;
    }
  }

  mousemove(p: Point) {
    const x = p.x - this.sx;
    const y = p.y - this.sy;
    if (this.active == "start") {
      this.start = new Point(this.px + x, this.py + y);
    } else if (this.active == "end") {
      this.end = new Point(this.px + x, this.py + y);
    }
  }

  onSave() {
    return {
      start: this.start,
      end: this.end,
      style: this.style,
    };
  }

  changeStyle(style: LineStyle) {
    this.style = style;
  }
}
