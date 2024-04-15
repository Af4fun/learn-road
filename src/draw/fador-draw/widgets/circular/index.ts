import Layer from "../../core/layer";
import Point from "../../core/point";
import { styleMerge } from "../../utils";
import CircularEdit from "./edit";

export type CircularStyle = {
  borderColor: string;
  borderWidth: number;
  backgroundColor: string;
  dashed: boolean;
};

const DEFAULT_STYLE: CircularStyle = {
  backgroundColor: "rgba(3,3,3,.2)",
  borderColor: "transparent",
  borderWidth: 1,
  dashed: false,
};

export default class Circular extends Layer {
  private style: CircularStyle;
  private styleBack: CircularStyle;
  private center: Point;
  private centerBack: Point;
  private radius: number;
  private radiusBack: number;
  private editLayer?: CircularEdit;
  constructor({
    center,
    radius,
    style,
  }: {
    center: Point;
    radius: number;
    style?: Partial<CircularStyle>;
  }) {
    super("circular");
    this.style = this.styleBack = styleMerge(
      DEFAULT_STYLE,
      style
    ) as CircularStyle;
    this.center = this.centerBack = Point.clone(center);
    this.radius = this.radiusBack = Number(radius.toFixed(2));
  }

  render(context: CanvasRenderingContext2D, scale: number): void {
    if (this.isEdit) {
      this.editLayer?.draw(context, scale);
    } else {
      context.beginPath();
      context.lineWidth = this.style.borderWidth;
      this.style.dashed ? context.setLineDash([5]) : context.setLineDash([0]);
      context.strokeStyle = this.style.borderColor;
      context.fillStyle = this.style.backgroundColor;
      const [x, y] = this.center.getTruePosition(scale);
      context.arc(x, y, this.radius / scale, 0, 2 * Math.PI);
      context.stroke();
      context.fill();
      context.closePath();
    }
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  isInPath(p: Point) {
    if (this.isEdit) {
      return this.editLayer?.isInPath(p) ?? false;
    } else {
      const d = Math.sqrt(
        (p.y - this.center.y) ** 2 + (p.x - this.center.x) ** 2
      );
      return d < this.radius;
    }
  }

  startEdit(): void {
    this.isEdit = true;
    this.editLayer = new CircularEdit(this.center, this.radius, this.style);
  }

  saveEdit(): void {
    if (this.editLayer) {
      const { center, radius, style } = this.editLayer.onSave();
      this.center = Point.clone(center);
      this.centerBack = Point.clone(center);
      this.style = this.styleBack = style;
      this.radius = radius;
      this.radiusBack = radius;
      this.editLayer = undefined;
      this.isEdit = false;
    }
  }

  cancelEdit(): void {
    this.editLayer = undefined;
    this.isEdit = false;
    this.reset();
  }

  reset() {
    this.center = Point.clone(this.centerBack);
    this.style = this.styleBack;
  }

  onmousedown(position: Point) {
    if (this.isEdit) {
      this.editLayer?.onmousedown.call(this.editLayer, position);
    }
  }

  onmousemove(position: Point) {
    if (this.isEdit) {
      this.editLayer?.onmousemove.call(this.editLayer, position);
    }
  }
}
