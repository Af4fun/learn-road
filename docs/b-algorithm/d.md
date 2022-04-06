---
title: 射线法判断是否处于多边形内部
group:
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

```ts
function isInPath(x: number, y: number, geometry: Geometry) {
  let c = false;
  const path = geometry.path;
  for (let i = -1, l = path.length, j = l - 1; ++i < l; j = i)
    ((path[i].y <= y && y < path[j].y) || (path[j].y <= y && y < path[i].y)) &&
      x < ((path[j].x - path[i].x) * (y - path[i].y)) / (path[j].y - path[i].y) + path[i].x &&
      (c = !c);
  return c;
}
```
