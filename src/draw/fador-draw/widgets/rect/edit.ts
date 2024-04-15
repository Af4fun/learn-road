import Point from "../../core/point";
import { RectStyle } from ".";

export default class RectEdit {
  start: Point;
  end: Point;
  active?: "start" | "end";
  style: RectStyle;

  private sx: number = 0;
  private sy: number = 0;
  private px: number = 0;
  private py: number = 0;
  private ctrlRadius: number = 4;

  constructor(start: Point, end: Point, style: RectStyle) {
    this.start = Point.clone(start);
    this.end = Point.clone(end);
    this.style = style;
  }

  render(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.beginPath();
    this.style.borderWidth > 0 && (ctx.lineWidth = this.style.borderWidth);
    this.style.dashed ? ctx.setLineDash([5]) : ctx.setLineDash([0]);
    ctx.strokeStyle = this.style.borderColor;
    ctx.fillStyle = this.style.backgroundColor;
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
    this.drawCtr(this.start, ctx, scale);
    this.drawCtr(this.end, ctx, scale);
  }

  drawCtr(p: Point, ctx: CanvasRenderingContext2D, scale: number) {
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

  isInCtrPoint({ x, y }: Point, p: Point) {
    return (
      x > p.x - this.ctrlRadius &&
      x < p.x + this.ctrlRadius &&
      y > p.y - this.ctrlRadius &&
      y < p.y + this.ctrlRadius
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
    const xisAllow = p.x >= this.start.x && p.x <= this.end.x;
    const yisAllow = p.y >= this.start.y && p.y <= this.end.y;
    return xisAllow && yisAllow;
  }

  mousedown(position: Point) {
    this.sx = position.x;
    this.sy = position.y;
    if (this.active == "start") {
      this.px = this.start.x;
      this.py = this.start.y;
    } else if (this.active == "end") {
      this.px = this.end.x;
      this.py = this.end.y;
    }
  }

  mousemove(end: Point) {
    const x = end.x - this.sx;
    const y = end.y - this.sy;
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

  changeStyle(style: RectStyle) {
    this.style = style;
  }
}
