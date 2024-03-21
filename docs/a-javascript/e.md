---
title: 关于时间切片
order: 4
nav:
  title: 前端基础
---

## 概念

浏览器渲染超过 50ms 的任务就是长任务，此时用户感知会觉得卡顿。<br /> 在 react 的早期 diff 中渲染虚拟 dom 如果任务时间过长就会导致页面卡死的现象；<br /> 后期使用 fiber 架构处理其中 schedule 即为 react 自己实现的时间切片；<br />

## **requestIdleCallback**浏览器的实现

我们可以利用这个 api 做简单的实现

- 实现一个时间切片函数

```ts
const timeSlice = (gen: Function) => {
  if (typeof gen !== 'function')
    throw new Error('TypeError: the param expect a generator function');
  const g = gen();
  if (!g || typeof g.next !== 'function') return;
  return function next() {
    const start = performance.now();
    let res = null;
    do {
      res = g.next(); // 利用迭代器做任务分片
    } while (res.done !== true && performance.now() - start < 25);
    if (res.done) return;
    // 在空闲时执行
    window.requestIdleCallback(next);
  };
};
```

- 使用

```ts
const list = ref<number[]>([]);

const add = (i: number) => {
  list.value.push(i);
};

const gen = function* () {
  let i = 0;
  while (i < 10000) {
    yield add(i);
    i++;
  }
};

const setList = () => {
  const fn = timeSlice(gen);
  fn && fn();
};
```

## 场景

在处理前端耗时任务时 我们可以利用时间切片避免阻塞浏览器渲染，同时再利用 worker 浏览器新加线程提升性能
