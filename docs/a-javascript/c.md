---
title: promise 增强
group:
  title: 前端基础
---

### allSettled

Promise.allSettled() 是 JavaScript 中的一个 Promise 方法，它接收一个 Promise 数组作为参数，并返回一个新的 Promise，该 Promise 在所有给定的 Promise 都已经解决或拒绝后才会解决。与 Promise.all() 不同的是，Promise.allSettled() 不会在任何一个 Promise 被拒绝时立即返回，而是等待所有 Promise 都被解决后返回一个包含每个 Promise 结果的数组。

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

time 重试次数

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

or

```js
Promise.prototype.retry = function (num: number) {
  return new Promise((resolve, reject) => {
    const retryAttempt = (count: number) => {
      this.then(resolve).catch((error) => {
        if (count >= num) {
          reject(error);
          return;
        }
        retryAttempt(count + 1);
      });
    };

    retryAttempt(1);
  });
};
```

### race

Promise.race() 是 JavaScript 中的一个 Promise 方法，它接收一个 Promise 数组作为参数，并返回一个新的 Promise，该 Promise 将在给定的 Promise 数组中的任何一个 Promise 被解决或拒绝后解决。换句话说，它将返回最先解决或拒绝的 Promise 的结果。

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

写法 2：

```js
Promise.prototype.finally2 = function (callback) {
  return this.then(
    (value) => Promise.resolve(callback()).then(() => value),
    (reason) =>
      Promise.reject(callback()).then(() => {
        throw reason;
      }),
  );
};
```

## multiRequest

这段代码定义了一个名为 multiRequest 的函数，该函数用于并发发起多个请求，并在所有请求完成后返回它们的结果。

首先，函数接收两个参数 urls 和 maxNum，分别表示请求的 URL 数组和最大并发请求数量。

然后，函数内部创建了一个空数组 ret，用于存储每个请求的 Promise 对象。接着定义了一个变量 i 用于追踪当前处理的请求索引，以及一个变量 resolve 用于存储 Promise 解决函数。

接下来，创建了一个新的 Promise 对象 promise，并将其解决函数赋值给了 resolve。

然后定义了一个名为 addTask 的函数，该函数用于向 ret 数组添加新的请求任务。在 addTask 函数中，首先检查当前处理的请求索引 i 是否超过了 ret 数组的长度，如果是，则说明所有请求都已经添加完毕，此时调用 resolve() 解决 Promise。

然后，创建一个名为 task 的 Promise 对象，该 Promise 对象表示当前处理的请求。该请求是通过调用 request(urls[i++]) 发起的，request 函数的具体实现不在此代码中，但可以假设它是一个能够发起请求并返回 Promise 对象的函数。无论请求是否成功，都会通过 finally 方法调用 addTask 函数，以确保在每次请求完成后都会继续添加新的请求任务到 ret 数组中。

最后，在一个 while 循环中，通过多次调用 addTask 函数来添加并发请求数量限制内的请求任务。

最后，返回了 promise 对象，该 Promise 对象在所有请求完成后会解决，并使用 Promise.all(ret) 来等待所有请求的 Promise 对象都解决，返回它们的结果。

总的来说，这段代码实现了一个并发发起多个请求的功能，并限制了最大并发请求数量，以避免同时发送过多的请求。

```js
function multiRequest(urls, maxNum) {
  const ret = [];
  let i = 0;
  let resolve;
  const promise = new Promise((r) => (resolve = r));
  const addTask = () => {
    if (i >= ret.length) {
      return resolve();
    }

    const task = request(urls[i++]).finally(() => {
      addTask();
    });
    ret.push(task);
  };

  while (i < maxNum) {
    addTask();
  }

  return promise.then(() => Promise.all(ret));
}
```
