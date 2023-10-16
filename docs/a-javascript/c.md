---
title: promise增强
group:
  title: javascript
---

### allSettled

```js
const allSettled = (fnlist) => {
  return new Promise((resolve) => {
    let len = fnlist.length;
    const settledHandles = [];
    for (let i = 0; i < len; i++) {
      let fn = fnlist[i];
      fn.then((resp) => {
        settledHandles.push({
          status: 'fulfilled',
          val: resp,
        });
        if (settledHandles.length == len) {
          resolve(settledHandles);
        }
      }).catch((err) => {
        settledHandles.push({
          status: 'rejected',
          val: err,
        });
        if (settledHandles.length == len) {
          resolve(settledHandles);
        }
      });
    }
  });
};

const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promise3 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2, promise3];

allSettled(promises).then((results) => results.forEach((result) => console.log(result.status)));
```

### retry

```js
const promiseRetry = (fn, time) => {
  return new Promise(async (resovle, reject) => {
    while (time--) {
      try {
        const resp = await fn();
        resovle(resp);
      } catch (error) {
        if (time == 0) reject(error);
      }
    }
  });
};
```

### race

```js
const race = (holds = []) => {
  return new Promise((resolve, reject) => {
    let len = holds.length;
    for (let i = 0; i < len; i++) {
      let fn = holds[i];
      fn.then(resolve).catch(reject);
    }
  });
};
```

### finally

```js
Promise.prototype.finally = function (callback) {
  // 确保callback是一个函数
  callback = typeof callback === 'function' ? callback : function () {};

  // 返回一个新的Promise，该Promise在原Promise解决或拒绝后执行callback
  return this.then(
    // 解决时执行
    function (value) {
      return Promise.resolve(callback()).then(function () {
        return value;
      });
    },
    // 拒绝时执行
    function (reason) {
      return Promise.resolve(callback()).then(function () {
        throw reason;
      });
    },
  );
};
```
