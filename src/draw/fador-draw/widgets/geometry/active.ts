import ActiveLayer from "../../core/active_layer";
import Point from "../../core/point";
import { styleMerge } from "../../utils";

interface GeoActiveNodeCfg {
  borderWidth?: number;
  borderColor?: string;
  color?: string;
}

interface GeoActiveLineCfg {
  width?: number;
  color?: string;
}

export interface GeoActiveStyle {
  node?: GeoActiveNodeCfg;
  nodeLine?: GeoActiveLineCfg;
  backgroundColor?: string;
}

const GEOMENTRY_DEFAULT_STYLE = {
  node: {
    color: "#1890ff",
    borderWidth: 2,
    borderColor: "green",
  },
  nodeLine: {
    width: 2,
    color: "green",
  },
  backgroundColor: "rgba(255,255,0, .5)",
};

export class GeometryActiveLayer implements ActiveLayer {
  private style: GeoActiveStyle;
  private paths: Point[] = [];
  private actived?: Point;
  isClose: boolean = false;
  constructor(config?: GeoActiveStyle) {
    this.style = styleMerge(GEOMENTRY_DEFAULT_STYLE, config);
  }

  reset() {
    this.paths = [];
    this.actived = undefined;
    this.isClose = false;
  }

  updatePath(p: Point) {
    this.paths.push(p);
  }

  setActived(p: Point) {
    this.actived = p;
    this.isClose = this.paths.length > 1;
  }

  get first(): Point | undefined {
    return this.paths[0];
  }

  get last(): Point | undefined {
    if (!this.paths.length) return undefined;
    return this.paths[this.paths.length - 1];
  }

  render(context: CanvasRenderingContext2D, scale: number): void {
    if (!this.first) return;
    context.save();
    if (this.paths.length == 1) {
      this.drawActive(context, scale);
      this.drawStart(context, scale);
    } else {
      this.drawLine(context, scale);
      this.drawNode(context, scale);
    }
    context.restore();
  }

  drawActive(ctx: CanvasRenderingContext2D, scale: number) {
    if (!this.last || !this.actived) return;
    ctx.beginPath();
    ctx.lineWidth = this.style.nodeLine!.width!;
    ctx.strokeStyle = this.style.nodeLine!.color!;
    ctx.setLineDash([5]);
    const [lx, ly] = this.last.getTruePosition(scale);
    ctx.moveTo(lx, ly);
    const [ax, ay] = this.actived.getTruePosition(scale);
    ctx.lineTo(ax, ay);
    ctx.stroke();
    ctx.closePath();
  }

  drawStart(ctx: CanvasRenderingContext2D, scale: number) {
    if (!this.first) return;
    ctx.strokeStyle = this.style.node!.borderColor!;
    ctx.lineWidth = this.style.node!.borderWidth!;
    ctx.setLineDash([0]);
    ctx.beginPath();
    ctx.fillStyle = this.style.node!.color!;
    const [x, y] = this.first.getTruePosition(scale);
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  drawLine(ctx: CanvasRenderingContext2D, scale: number) {
    if (!this.first || !this.actived) return;
    ctx.beginPath();
    ctx.strokeStyle = this.style.nodeLine!.color!;
    ctx.lineWidth = this.style.nodeLine!.width!;
    ctx.setLineDash([5]);
    const [fx, fy] = this.first.getTruePosition(scale);
    ctx.moveTo(fx, fy);
    for (let i = 1; i < this.paths.length; i++) {
      const [x, y] = this.paths[i].getTruePosition(scale);
      ctx.lineTo(x, y);
    }
    const [ax, ay] = this.actived.getTruePosition(scale);
    ctx.lineTo(ax, ay);
    ctx.lineTo(fx, fy);
    ctx.fillStyle = this.style.backgroundColor!;
    ctx.fill();
    ctx.stroke();
  }

  drawNode(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.setLineDash([0]);
    ctx.lineWidth = this.style.node!.borderWidth!;
    ctx.strokeStyle = this.style.node!.borderColor!;
    for (let i = 0; i < this.paths.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = this.style.node!.color!;
      const [x, y] = this.paths[i].getTruePosition(scale);
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }
  }

  genPath(): Array<Point> {
    return this.paths.map((p) => Point.clone(p));
  }

  clearPath() {
    this.paths.pop();
  }
}
