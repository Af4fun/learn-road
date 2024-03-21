---
title: Vue
group:
  title: 框架
---

## 响应式原理

使用 Object.defineProperty() 方法来劫持每一个属性的 setter 和 getter。

```ts
const targetMap = new WeakMap<Object, Map<unknown, Set<Function>>>();
let activeEffect: Function | null = null; // 引入 activeEffect 变量

const effect = (eff: Function) => {
  activeEffect = eff; // 1. 将副作用赋值给 activeEffect
  activeEffect(); // 2. 执行 activeEffect
  activeEffect = null; // 3. 重置 activeEffect
};

const track = (target: object, key: unknown) => {
  if (activeEffect) {
    // 1. 判断当前是否有 activeEffect
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect); // 2. 添加 activeEffect 依赖
  }
};

const trigger = (target: object, key: unknown) => {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  let dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => effect());
  }
};

const reactive = (target: object) => {
  const handler: ProxyHandler<any> = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      track(target, key);
      return result;
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      if (oldValue != result) {
        trigger(target, key);
      }
      return result;
    },
  };

  return new Proxy(target, handler);
};

const ref = (raw?: any) => {
  const r = {
    get value() {
      track(r, 'value');
      return raw;
    },
    set value(val) {
      raw = val;
      trigger(r, 'value');
    },
  };

  return r;
};

const computed = (fn) => {
  let result = ref();
  effect(() => {
    result.value = fn();
  });
  return result;
};

let product = reactive({ price: 10, quantity: 2 });
let total = 0,
  salePrice = 0;
// 修改 effect 使用方式，将副作用作为参数传给 effect 方法
effect(() => {
  total = product.price * product.quantity;
});
effect(() => {
  salePrice = product.price * 0.9;
});
console.log(total, salePrice); // 20 9
product.quantity = 5;
console.log(total, salePrice); // 50 9
product.price = 20;
console.log(total, salePrice); // 100 18
```
