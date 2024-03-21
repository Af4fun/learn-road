---
title: 鞋带公式求不规则面积
nav:
  title: 一些算法
---

定义由一组点围城的多边形

**定义**

```ts
interface Point {
  x: number;
  y: number;
}

interface Geometry {
  path: Array<Point>;
}
```

**多边形面积**

```ts
function getArea(geometry: Geometry) {
  let area = 0;
  let len = geometry.path.length;
  let j = len - 1;
  let p1, p2;

  for (let i = 0; i < len; j = i++) {
    p1 = geometry.path[i];
    p2 = geometry.path[j];
    area += p1.x * p2.y;
    area -= p1.y * p2.x;
  }
  area /= 2;

  return area;
}
```
