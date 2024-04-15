import Point from "../../core/point";
import type { GeometryStyle } from "./index";

export default class GeometryEdit {
  path: Point[];
  style: GeometryStyle;
  private sx: number = 0;
  private sy: number = 0;
  private px: number = 0;
  private py: number = 0;
  ctrlRadius: number = 4;
  actived: number = -1;
  targets: "path" | "center" = "path";
  constructor(paths: Array<Point>, style: GeometryStyle) {
    this.path = paths.map((p) => Point.clone(p));
    this.style = style;
  }

  paint(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.beginPath();
    this.style.borderWidth > 0 && (ctx.lineWidth = this.style.borderWidth);
    this.style.dashed ? ctx.setLineDash([5]) : ctx.setLineDash([0]);
    ctx.strokeStyle = this.style.borderColor;
    ctx.fillStyle = this.style.backgroundColor;
    const [fx, fy] = this.path[0].getTruePosition(scale);
    ctx.moveTo(fx, fy);
    for (let i = 1; i < this.path.length; i++) {
      const [x, y] = this.path[i].getTruePosition(scale);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(fx, fy);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    for (let i = 0; i < this.path.length; i++) {
      this.drawCtr(this.path[i], ctx, scale);
    }

    for (let i = 0; i < this.centers.length; i++) {
      this.drawCtrCenter(this.centers[i], ctx, scale);
    }
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

  drawCtrCenter(p: Point, ctx: CanvasRenderingContext2D, scale: number) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.setLineDash([0]);
    ctx.strokeStyle = "#e4393c";
    const [px, py] = p.getTruePosition(scale);
    ctx.arc(px, py, this.ctrlRadius, 0, Math.PI * 2);
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

  get centers(): Array<Point> {
    const centers = [];
    for (let i = 0; i < this.path.length; i++) {
      if (this.path[i + 1]) {
        const [sx, sy] = this.path[i].toArray();
        const [ex, ey] = this.path[i + 1].toArray();
        const center = new Point((ex + sx) / 2, (ey + sy) / 2);
        centers.push(center);
      }
    }
    const [sx, sy] = this.path[0].toArray();
    const [ex, ey] = this.path[this.path.length - 1].toArray();
    const fc = new Point((ex + sx) / 2, (ey + sy) / 2);
    centers.push(fc);
    return centers;
  }

  isInPath(p: Point) {
    for (let i = 0; i < this.path.length; i++) {
      if (this.isInCtrPoint(p.x, p.y, this.path[i])) {
        this.targets = "path";
        this.actived = i;
        return true;
      }
    }
    for (let i = 0; i < this.centers.length; i++) {
      if (this.isInCtrPoint(p.x, p.y, this.centers[i])) {
        this.targets = "center";
        this.actived = i;
        return true;
      }
    }

    let c = false;
    for (let i = -1, l = this.path.length, j = l - 1; ++i < l; j = i)
      ((this.path[i].y <= p.y && p.y < this.path[j].y) ||
        (this.path[j].y <= p.y && p.y < this.path[i].y)) &&
        p.x <
          ((this.path[j].x - this.path[i].x) * (p.y - this.path[i].y)) /
            (this.path[j].y - this.path[i].y) +
            this.path[i].x &&
        (c = !c);
    return c;
  }

  mousedown(p: Point) {
    this.sx = p.x;
    this.sy = p.y;
    if (this.targets == "path") {
      const el = this.path[this.actived];
      this.px = el.x;
      this.py = el.y;
    } else if (this.targets == "center") {
      const el = this.centers[this.actived];
      this.px = el.x;
      this.py = el.y;
    }
  }
  mousemove(end: Point) {
    const x = end.x - this.sx;
    const y = end.y - this.sy;
    const newPoint = new Point(this.px + x, this.py + y);
    if (this.targets == "path") {
      this.path.splice(this.actived, 1, newPoint);
    } else {
      this.path.splice(this.actived + 1, 0, newPoint);
      this.targets = "path";
      this.actived += 1;
    }
  }

  onSave() {
    return {
      path: this.path,
      style: this.style,
    };
  }

  changeStyle(style: GeometryStyle) {
    this.style = style;
  }
}
