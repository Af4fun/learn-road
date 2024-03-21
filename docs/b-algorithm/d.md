---
title: 射线法判断是否处于多边形内部
nav:
  title: 一些算法
---

定义由一组点围城的多边形

**定义**

> 在几何学中，PIP（Point in Polygon）问题即判断一点在多边形的内部或外部。射线法（Ray casting algorithm）是一种判断点是否在多边形内部的一种简单方法。即从该点做一条射线，计算它跟多边形边界的交点个数，如果交点个数为奇数，那么点在多边形内部，否则点在多边形外部。

```ts
interface Point {
  x: number;
  y: number;
}

interface Geometry {
  path: Array<Point>;
}
```

```ts
function isInPath(x: number, y: number, geometry: Geometry) {
  let c = false;
  const path = geometry.path;
  for (let i = -1, l = path.length, j = l - 1; ++i < l; j = i)
    ((path[i].y <= y && y < path[j].y) || (path[j].y <= y && y < path[i].y)) &&
      x <
        ((path[j].x - path[i].x) * (y - path[i].y)) / (path[j].y - path[i].y) +
          path[i].x &&
      (c = !c);
  return c;
}
```
