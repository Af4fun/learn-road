import Point from "../../core/point";
import { CircularStyle } from ".";

export default class CircularEdit {
  center: Point;
  radius: number;
  ctrlRadius: number = 4;
  style: CircularStyle;
  active?: "start" | "end";
  private sx: number = 0;
  private sy: number = 0;
  private px: number = 0;
  private py: number = 0;

  constructor(center: Point, radius: number, style: CircularStyle) {
    this.center = Point.clone(center);
    this.radius = radius;
    this.style = style;
  }

  get ctrPoint() {
    const cx = this.center.x + this.radius;
    return new Point(cx, this.center.y);
  }

  draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.beginPath();
    ctx.lineWidth = this.style.borderWidth;
    this.style.dashed ? ctx.setLineDash([5]) : ctx.setLineDash([0]);
    ctx.strokeStyle = this.style.borderColor;
    ctx.fillStyle = this.style.backgroundColor;
    const [x, y] = this.center.getTruePosition(scale);
    ctx.arc(x, y, this.radius / scale, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    this.drawCtr(this.ctrPoint, ctx, scale);
    this.drawCtr(this.center, ctx, scale);
  }

  drawCtr(p: Point, ctx: CanvasRenderingContext2D, scale: number) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.setLineDash([0]);
    ctx.strokeStyle = "green";
    ctx.fillStyle = "#1890ff";
    const [x, y] = p.getTruePosition(scale);
    ctx.arc(x, y, this.ctrlRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }

  isInCtrPoint(x: number, y: number, p: Point) {
    return (
      x > p.x - this.ctrlRadius &&
      x < p.x + this.ctrlRadius &&
      y > p.y - this.ctrlRadius &&
      y < p.y + this.ctrlRadius
    );
  }

  isInPath({ x, y }: Point) {
    if (this.isInCtrPoint(x, y, this.center)) {
      this.active = "start";
      return true;
    } else if (this.isInCtrPoint(x, y, this.ctrPoint)) {
      this.active = "end";
      return true;
    }
    this.active = undefined;
    const d = Math.sqrt((y - this.center.y) ** 2 + (x - this.center.x) ** 2);
    return d < this.radius;
  }

  onmousedown(p: Point) {
    this.sx = p.x;
    this.sy = p.y;
    if (this.active == "start") {
      this.px = this.center.x;
      this.py = this.center.y;
    } else if (this.active == "end") {
      this.px = this.ctrPoint.x;
      this.py = this.ctrPoint.y;
    }
  }

  onmousemove(end: Point) {
    const x = end.x - this.sx;
    const y = end.y - this.sy;
    if (this.active == "start") {
      this.center = new Point(this.px + x, this.py + y);
    } else if (this.active == "end") {
      this.radius = Math.sqrt(
        (this.py + y - this.center.y) ** 2 + (this.px + x - this.center.x) ** 2
      );
    }
  }

  onSave() {
    return {
      center: this.center,
      radius: this.radius,
      style: this.style,
    };
  }

  changeStyle(style: CircularStyle) {
    this.style = style;
  }

  changeRadius(radius: number) {
    this.radius = radius;
  }
}
