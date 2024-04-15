import ActiveLayer from "../../core/active_layer";
import Point from "../../core/point";
import { styleMerge } from "../../utils";

export interface CircularActiveStyle {
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  dashed?: boolean;
}

const DEFAULT_STYLE: CircularActiveStyle = {
  borderWidth: 2,
  borderColor: "green",
  backgroundColor: "rgba(255,255,0, .5)",
  dashed: true,
};

export default class CircularActiveLayer implements ActiveLayer {
  center?: Point;
  private actived?: Point;
  private style: CircularActiveStyle;

  constructor(config?: Partial<CircularActiveStyle>) {
    this.style = styleMerge(DEFAULT_STYLE, config);
  }

  setActived(p: Point) {
    if (this.center) {
      this.actived = Point.clone(p);
    }
  }

  setCenter(center: Point) {
    this.center = center;
  }

  get radius(): number {
    if (!this.center || !this.actived) return 0;
    return Math.sqrt(
      (this.center.y - this.actived.y) ** 2 +
        (this.center.x - this.actived.x) ** 2
    );
  }

  reset() {
    this.center = undefined;
    this.actived = undefined;
  }

  drawCenter(ctx: CanvasRenderingContext2D, scale: number) {
    if (this.center) {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = this.style!.borderColor!;
      ctx.lineWidth = 0;
      ctx.setLineDash([0]);
      const [x, y] = this.center.getTruePosition(scale);
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  }

  render(ctx: CanvasRenderingContext2D, scale: number) {
    if (this.center && this.radius) {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = this.style!.borderWidth!;
      this.style.dashed ? ctx.setLineDash([5]) : ctx.setLineDash([0]);
      ctx.strokeStyle = this.style!.borderColor!;
      ctx.fillStyle = this.style!.backgroundColor!;
      const [x, y] = this.center.getTruePosition(scale);
      ctx.arc(x, y, this.radius / scale, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
      this.drawCenter(ctx, scale);
      ctx.restore();
    }
  }
}
