import ActiveLayer from "../../core/active_layer";
import Point from "../../core/point";
import { styleMerge } from "../../utils";

export interface RectActiveStyle {
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  dashed?: boolean;
}

const DEFAULT_STYLE: RectActiveStyle = {
  borderWidth: 1,
  borderColor: "#000",
  backgroundColor: "#fff",
  dashed: false,
};

export default class RectActiveLayer implements ActiveLayer {
  private style: RectActiveStyle;
  private actived?: Point;
  start?: Point;

  constructor(config?: RectActiveStyle) {
    this.style = styleMerge(DEFAULT_STYLE, config);
  }

  setActived(p: Point) {
    this.start && (this.actived = Point.clone(p));
  }

  setStart(p: Point) {
    this.start = Point.clone(p);
  }

  get width(): number {
    if (!this.start || !this.actived) return 0;
    return Math.abs(this.actived.x - this.start.x);
  }

  get height(): number {
    if (!this.start || !this.actived) return 0;
    return Math.abs(this.actived.y - this.start.y);
  }

  reset() {
    this.start = undefined;
    this.actived = undefined;
  }

  render(ctx: CanvasRenderingContext2D, scale: number) {
    if (this.start && this.actived) {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = this.style.borderWidth!;
      this.style.dashed ? ctx.setLineDash([5]) : ctx.setLineDash([0]);
      ctx.strokeStyle = this.style.borderColor!;
      ctx.fillStyle = this.style.backgroundColor!;
      const [sx, sy] = this.start.getTruePosition(scale);
      const [ax, ay] = this.actived.getTruePosition(scale);
      ctx.moveTo(sx, sy);
      ctx.lineTo(ax, sy);
      ctx.lineTo(ax, ay);
      ctx.lineTo(sx, ay);
      ctx.lineTo(sx, sy);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  }
}
