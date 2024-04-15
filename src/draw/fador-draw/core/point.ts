class Point {
  /** 坐标轴上x坐标 */
  public x: number;
  /** 坐标轴上y坐标 */
  public y: number;

  constructor(x: number, y: number) {
    this.x = Number(x.toFixed(2));
    this.y = Number(y.toFixed(2));
  }

  toArray(): [number, number] {
    return [this.x, this.y];
  }

  update(x: number, y: number) {
    this.x = Number(x.toFixed(2));
    this.y = Number(y.toFixed(2));
  }

  getTruePosition(scale: number): [number, number] {
    return [this.x / scale, this.y / scale];
  }

  // 相对于点旋转
  public static rotateByPoint(p: Point, c: Point, angle: number) {
    const x =
      (p.x - c.x) * Math.cos(angle) - (p.y - c.y) * Math.sin(angle) + c.x;
    const y =
      (p.x - c.x) * Math.sin(angle) + (p.y - c.y) * Math.cos(angle) + c.y;

    return new Point(x, y);
  }

  public static rotate(p: Point, angle: number) {
    return Point.rotateByPoint(p, new Point(0, 0), angle);
  }

  public static getCenter(start: Point, end: Point) {
    return new Point((start.x + end.x) / 2, (start.y + end.y) / 2);
  }

  public static fromArray([x, y]: [number, number]) {
    return new Point(x, y);
  }

  public static clone(p: Point) {
    return new Point(p.x, p.y);
  }
}

export default Point;
