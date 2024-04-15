import Point from "../../core/point";
import ActiveLayer from "../../core/active_layer";
import { styleMerge } from "../../utils";

/** 线段绘制中样式 */
export interface LineActiveStyle {
  borderWidth?: number;
  borderColor?: string;
  dashed?: boolean;
}

const LINE_ACTIVE_STYLE: LineActiveStyle = {
  borderWidth: 1,
  borderColor: "#000",
  dashed: true,
};

class LineActiveLayer implements ActiveLayer {
  private style: LineActiveStyle;
  start?: Point;
  end?: Point;

  constructor(config?: LineActiveStyle) {
    this.style = styleMerge(LINE_ACTIVE_STYLE, config);
  }

  setActived(x: number, y: number) {
    const p = new Point(x, y);
    if (this.start) this.end = p;
  }

  setStart(x: number, y: number) {
    this.start = new Point(x, y);
  }

  reset() {
    this.start = undefined;
    this.end = undefined;
  }

  render(ctx: CanvasRenderingContext2D, scale: number): void {
    if (this.start && this.end) {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = this.style.borderWidth!;
      this.style.dashed ? ctx.setLineDash([5]) : ctx.setLineDash([0]);
      ctx.strokeStyle = this.style.borderColor!;
      const [sx, sy] = this.start.getTruePosition(scale);
      const [ex, ey] = this.end.getTruePosition(scale);
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  }
}

export default LineActiveLayer;
