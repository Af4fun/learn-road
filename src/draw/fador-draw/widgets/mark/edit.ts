import Point from "../../core/point";
import { MarkStyle } from ".";

export default class MarkEdit {
  private center: Point;
  private image?: HTMLImageElement;
  private style: MarkStyle;
  private sx: number = 0;
  private sy: number = 0;
  private px: number = 0;
  private py: number = 0;

  constructor(opt: {
    style: MarkStyle;
    center: Point;
    image?: HTMLImageElement;
  }) {
    const { style, image, center } = opt;
    this.image = image;
    this.style = style;
    this.center = center;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    if (this.image) {
      const dx = this.center.x - 10;
      const dy = this.center.y - 38;
      ctx.drawImage(
        this.image,
        dx, // image的左上角在目标canvas上 X 轴坐标。
        dy, // image的左上角在目标canvas上 Y 轴坐标。
        40, // img 在canvas 上绘制的宽度 dWidth  设置后图片将会缩放
        40 // img 在canvas 上绘制的高度 dHeight
      );
    } else {
      ctx.beginPath();
      ctx.fillStyle = this.style.color;
      ctx.arc(this.center.x, this.center.y, this.style.size, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
    ctx.restore();
  }

  isInPath(p: Point) {
    const [cx, cy] = this.center.toArray();
    const [x, y] = p.toArray();
    if (this.image) {
      const xisAllow = x >= cx - 10 && x <= cx + 10;
      const yisAllow = y >= cy - 40 && y <= cy;
      return xisAllow && yisAllow;
    } else {
      const d = Math.sqrt((y - this.center.y) ** 2 + (x - this.center.x) ** 2);
      return d < this.style.size * 2;
    }
  }

  changeStyle(style: MarkStyle) {
    this.style = style;
  }

  mousedown(position: { x: number; y: number }) {
    this.sx = position.x;
    this.sy = position.y;
    this.px = this.center.x;
    this.py = this.center.y;
  }

  mousemove(end: { x: number; y: number }) {
    const x = end.x - this.sx;
    const y = end.y - this.sy;
    this.center = new Point(this.px + x, this.py + y);
  }

  save(): {
    center: Point;
    style: MarkStyle;
  } {
    return {
      center: this.center,
      style: this.style,
    };
  }
}
