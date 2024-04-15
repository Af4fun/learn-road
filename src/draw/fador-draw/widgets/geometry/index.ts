import Layer from '../../core/layer';
import Point from '../../core/point';
import { styleMerge } from '../../utils';
import GeometryEdit from './edit';

export type GeometryStyle = Partial<{
  borderColor: string;
  borderWidth: number;
  backgroundColor: string;
  dashed: boolean;
}>;

const DEFAULT_STYLE: GeometryStyle = {
  backgroundColor: 'rgba(3,3,3,.2)',
  borderColor: 'transparent',
  borderWidth: 1,
  dashed: false,
};

export default class Geometry extends Layer {
  style: GeometryStyle;
  styleBack: GeometryStyle;
  path: Point[];
  pathBack: Point[];
  editLayer?: GeometryEdit;
  constructor({
    path = [],
    style,
  }: {
    path?: Point[];
    style?: Partial<GeometryStyle>;
  }) {
    super('geometry');
    this.style = this.styleBack = styleMerge(
      DEFAULT_STYLE,
      style,
    ) as GeometryStyle;
    this.path = this.pathBack = path;
  }

  getArea(): number {
    // 鞋带公式： s = 1/2 * |limt (i=1, n) (x<i>*y<i-1> - x<i+1>* y<i>|
    let area = 0;
    let len = this.path.length;
    let j = len - 1;
    let p1, p2;
    for (let i = 0; i < len; j = i++) {
      p1 = this.path[i];
      p2 = this.path[j];
      area += p1.x * p2.y;
      area -= p1.y * p2.x;
    }
    area /= 2;
    return area;
  }

  getCenter(): Point | undefined {
    let len = this.path.length;
    if (len <= 1) return undefined;
    let x = 0;
    let y = 0;
    let f;
    let j = len - 1;
    let p1;
    let p2;
    for (let i = 0; i < len; j = i++) {
      p1 = this.path[i];
      p2 = this.path[j];
      f = p1.x * p2.y - p2.x * p1.y;
      x += (p1.x + p2.x) * f;
      y += (p1.y + p2.y) * f;
    }
    f = this.getArea() * 6;
    return new Point(x / f, y / f);
  }

  // 射线法判断是否在路径中
  isInPath(p: Point) {
    if (this.isEdit) {
      return this.editLayer?.isInPath(p) ?? false;
    } else {
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
  }

  render(context: CanvasRenderingContext2D, scale: number): void {
    if (this.isEdit) {
      this.editLayer?.paint(context, scale);
    } else {
      const [fx, fy] = this.path[0].getTruePosition(scale);
      context.beginPath();
      this.style.borderWidth! > 0 &&
        (context.lineWidth = this.style.borderWidth!);
      this.style.dashed ? context.setLineDash([5]) : context.setLineDash([0]);
      context.strokeStyle = this.style.borderColor!;
      context.fillStyle = this.style.backgroundColor!;
      context.moveTo(fx, fy);
      for (let i = 1; i < this.path.length; i++) {
        const [x, y] = this.path[i].getTruePosition(scale);
        context.lineTo(x, y);
      }
      context.lineTo(fx, fy);
      context.closePath();
      context.fill();
      context.stroke();
    }
  }

  startEdit(): void {
    this.isEdit = true;
    this.editLayer = new GeometryEdit(this.path, this.style);
  }

  saveEdit(): void {
    if (this.editLayer) {
      const { path, style } = this.editLayer.onSave();
      this.path = path.map((p) => Point.clone(p));
      this.pathBack = path.map((p) => Point.clone(p));
      this.style = this.styleBack = style;
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
    this.path = this.pathBack.map((p) => Point.clone(p));
    this.style = this.styleBack;
  }

  onmousedown(position: Point) {
    if (this.isEdit) {
      this.editLayer?.mousedown.call(this.editLayer, position);
    }
  }

  onmousemove(position: Point) {
    if (this.isEdit) {
      this.editLayer?.mousemove.call(this.editLayer, position);
    }
  }
}
