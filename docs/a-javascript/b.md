---
title: 一些js的写法
group:
  title: javascript
---

### 1. 生成 n 进制的 m 位 随机数

```js
let num = Math.random().toString(n).substr(2, m);
```

### 2. 进行补‘0’ 操作

```js
// 数组
function format(n, length) {
  return (Array(length).join('0') + n).substr(-length);
}

// 利用正则
var str = '2020-1-8 15:8:6';
console.log(str.replace(/\b\d\b/g, '0$&'));
```

### 3. 克隆

- 数组克隆

```js
const sheeps = ['1', '2', '3'];

const cloneSheeps = sheeps.slice();

console.log(sheeps == cloneSheeps);

console.log(sheeps === cloneSheeps);
```

- 对象克隆

```js
/**
 * @description: 利用递归的克隆函数
 * @param {Object}
 * @return: copy obj
 */
function clone(obj) {
  if (typeof obj !== 'object' || !obj) return obj;
  let newObj = new Object();
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'object') {
      newObj[key] = obj[key];
    } else {
      newObj[key] = clone(obj[key]);
    }
  });
  return newObj;
}
```

**$\color{#e4393c}{以上方法未处理重复引用问题, 处理重复应用 使用如下方法}$**

参考解决方式一：<br> 使用 **weekmap** 解决循环引用问题，我们可以开辟一个存储空间，来存储当前对象和拷贝对象的对应关系 这个存储空间，需要可以存储 key-value 形式的数据，且 key 是一个引用类型。 我们可以选 WeakMap 这种数据结构：

```js
function isObject(obj) {
  return (typeof obj === 'object' || typeof obj === 'function') && obj !== null;
}
function cloneDeep(source, hash = new WeakMap()) {
  if (!isObject(source)) return source;
  if (hash.has(source)) return hash.get(source); // 新增代码，查哈希表

  var target = Array.isArray(source) ? [] : {};
  hash.set(source, target); // 新增代码，哈希表设值

  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = cloneDeep(source[key], hash); // 新增代码，传入哈希表
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
```

参考解决方式二： <br> 可以用 Set,发现相同的对象直接赋值，也可用 Map:

```js
const o = {a:1，b:2}
o.c = o

function isPrimitive(val) {
    return Object(val) !== val
}
const set = new Set()
function clone(obj){
    const copied = {}
    for(const [key, value] of Object.entries(obj)) {
        if(isPrimitive(value)) {
            copied[key] = value
        }else {
            if(set.has(value)) {
                copied[key] = {...value}
            }else {
                set.add(value)
                copied[key] = clone(value)
            }
        }
    }
    return copied;
}

```

#### [参考](https://juejin.cn/post/6933168401200185351)

补充一种简单粗暴的

```js
/**
 * @description: 利用json转换拷贝
 * @param {Object}
 * @return: obj
 */
function jsonClone(obj) {
  let str = JSON.stringify(obj);
  return JSON.parse(obj);
}
```

### 4. ~”运算符（位非）用于对一个二进制操作数逐位进行取反操作。

- 第 1 步：把运算数转换为 32 位的二进制整数。
- 第 2 步：逐位进行取反操作。
- 第 3 步：把二进制反码转换为十进制浮点数。

* 位非运算实际上就是对数字进行取负运算，再减 1。例如：

```js
console.log(!!~sheeps.indexOf('3'));
// 运算过程
// sheeps.indexOf('3') === 2
// ~2 = -2-1 = -3
// !-3 = !true = false
// !false = true
console.log(~~2311.233); // 2311
```

### 5. 快速构造一个自增数组

```js
Number.prototype[Symbol.iterator] = function* () {
  let i = 0;
  while (i < this) {
    yield i++;
  }
};

var arr = [...20];
```

### 6. 生成一个螺旋数组

```js
[
[1,2,3]，
[8,9,4]，
[7,6,5]
];

```

```js
function cycleArray(n) {
  let arr = [];

  let cycle = Math.ceil(n / 2); // 计算 n*n 矩阵的 环绕圈数

  let start = 1;

  for (let i = 0; i < n; i++) {
    arr[i] = [];
    for (let j = 0; j < n; j++) {
      arr[i][j] = '';
    }
  }

  for (let j = 0; j < cycle; j++) {
    creatCycle(j);
  }
  /*循环一圈之后找到起始点再次循环*/
  function creatCycle(cycleStart) {
    /**从左到右**/
    for (let i = 0; i < n; i++) {
      if (!arr[cycleStart][i]) {
        arr[cycleStart][i] = start;
        start++;
      }
    }
    /**上到下**/
    for (let i = 0; i < n; i++) {
      if (!arr[i][n - 1 - cycleStart]) {
        arr[i][n - 1 - cycleStart] = start;
        start++;
      }
    }
    /**右到左**/
    for (let i = n - 1; i >= 0; i--) {
      if (!arr[n - 1 - cycleStart][i]) {
        arr[n - 1 - cycleStart][i] = start;
        start++;
      }
    }
    /** 下到上**/
    for (let i = n - 1; i >= 0; i--) {
      if (!arr[i][cycleStart]) {
        arr[i][cycleStart] = start;
        start++;
      }
    }
  }

  return arr;
}

var arr = cycleArray(3);
console.log(arr); // [ [ 1, 2, 3 ], [ 8, 9, 4 ], [ 7, 6, 5 ] ]
```

### 7. 仿 element 表单验证

```js
const validator = async (form, rules) => {
  for (let filed in form) {
    for (let rule in rules[filed]) {
      const err = await validatorFnc(form[filed], rules[filed][rule]);
      if (err) {
        return Promise.reject(err);
      }
    }
  }
  return Promise.resolve();
};

const validatorFnc = (value, rule) => {
  const requiredReg = new RegExp(/^.+$/); // 基础验证
  return new Promise((resolve, reject) => {
    /* 为空验证 */
    if (rule.required) {
      if (!requiredReg.test(value)) {
        reject(rule.msg);
      } else {
        resolve();
      }
    }
    /* 正则验证 */
    if (rule.reg) {
      if (!rule.reg.test(value)) {
        reject(rule.msg);
      } else {
        resolve();
      }
    }
    /* 自定义方法验证 */
    if (rule.validatorFnc && typeof rule.validatorFnc === 'function') {
      if (!rule.validatorFnc(value)) {
        reject(rule.msg);
      } else {
        resolve();
      }
    }
  });
};
```

使用：

```js
let form = {
  name: '1',
  code: '4',
};

let rules = {
  name: [
    {
      required: true,
      msg: '请填写昵称',
    },
  ],
  code: [
    {
      required: true,
      msg: '请填写识别码',
    },
    {
      reg: new RegExp(/\d/),
      msg: '仅限数字',
    },
  ],
};

validator(form, rules)
  .then((resp) => {
    console.log('验证通过');
    console.log(resp);
  })
  .catch((err) => {
    console.log(err);
  });
```

### 8. 贝赛尔曲线

> [参考 1](https://www.jianshu.com/p/0c9b4b681724)

> [参考 2](https://github.com/hujiulong/blog/issues/1)

#### 示例：二次贝赛尔曲线方程

```js
/// 起点 p0 终点 p2 控制点 p1 t∈[0, 1]
function quadraticBezier(p0, p1, p2, t) {
  var k = 1 - t;
  return k * k * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
}
```

关于找到二次贝塞尔曲线的控制点

TODO

### 9 常用的 js 的设计模式

1. 单例设计模式

```js
// es5:
let singleCase = function (name) {
  this.name = name;
};
singleCase.prototype.getName = function () {
  return this.name;
};
// 获取实例对象
let getInstance = (function () {
  var instance = null;
  return function (name) {
    if (!instance) {
      //相当于一个一次性阀门,只能实例化一次
      instance = new singleCase(name);
    }
    return instance;
  };
})();
// 测试单体模式的实例,所以one===two
let one = getInstance('one');
let two = getInstance('two');
```

es6: class 关键字

```ts
class SingleInstance {
  private static _instance: SingleInstance = new SingleInstance();

  public name: string;

  private constructor() {
    this.name = 'singleInstance';
  }

  public static getInstance(): SingleInstance {
    return this._instance;
  }
}
```

2. 订阅发布

```js
var EventBus = {
  events: {},
  on: function (type, fn) {
    if (typeof this.events[type] === 'undefined') {
      this.events[type] = [fn];
    } else {
      this.events[type].push(fn);
    }
  },
  emit: function (type, arg) {
    if (!this.events[type]) return;
    var fns = this.events[type];
    for (let i = 0; i < fns.length; i++) {
      fns[i].call(this, arg);
    }
  },
  off: function (type) {
    if (!this.events[type]) return;
    if (this.events[type] instanceof Array) {
      for (let i = this.events[type].length - 1; i > 0; i--) {
        this.events[type].splice(i, 1);
      }
    }
  },
};
EventBus.on('update', function (arg) {
  console.log(arg);
});

EventBus.emit('update', 'some arguments');
```

### 10. vue 中小技巧

```js
// 输入框回弹
//  修复页面错误 的问题
const windowHeight = window.innerHeight;

Vue.directive('fixedInput', (el, binding) => {
  el.addEventListener('blur', () => {
    const windowFocusHeight = window.innerHeight;
    if (windowHeight == windowFocusHeight) {
      return;
    }
    let currentPosition;
    const speed = 1; // 页面滚动距离
    currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    currentPosition -= speed;
    window.scrollTo(0, currentPosition); // 页面向上滚动
    currentPosition += speed; // speed变量
    window.scrollTo(0, currentPosition); // 页面向下滚动
  });
});
```

## 11 关于排序

> 二分排序法

```js
function sortQuick(arr) {
  if (!(arr instanceof Array) || arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let midTarget = arr.splice(mid, 1)[0];
  let left = [];
  let right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < midTarget) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  /// 利用递归
  return sortQuick(left).concat(midTarget, sortQuick(right));
}
```

> 冒泡排序

```js
function doubbleSort(arr) {
  if (arr.length <= 1) return arr;

  for (let i = 0; i < arr.length - 1; i++) {
    console.log(`第${i + 1}遍`);
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
      console.log(`第${i + 1}遍, 第${j + 1}次交换`);
    }
  }

  console.log(arr);
}
```

## 12 函数柯里化实现

```js
function sum(a, b, c, d) {
  return a + b + c + d;
}

function curry(fn, outArgs) {
  let len = fn.length;
  return function () {
    let all_arg = [...outArgs, ...arguments];
    if (all_arg.length >= len) {
      fn.apply(this, all_arg);
    } else {
      return curry(fn, all_arg);
    }
  };
}

function count() {
  return curry(sum, arguments);
}

count(1)(2)(3)(4); //  10
```

otherone:

```js
function sum(...arg) {
  return arg.reduce((p, n) => p + n, 0);
}

function curry(fn, outArgs) {
  return function (...arg) {
    let all_arg = [...outArgs, ...arg];
    if (arg.length === 0) {
      return fn.apply(this, all_arg);
    } else {
      return curry(fn, all_arg);
    }
  };
}

function fn(...arg) {
  return curry(sum, arg);
}
console.log(fn(1)(2)(3)()); // 6

console.log(fn(1, 2, 3)(4)()); // 10

console.log(fn(1)(2)(3)(4)(5)()); // 15
```

## 13 洗牌算法

```js
const shuffle = (arr = []) => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let idx = Math.floor(Math.random() * (len - i)) + i;
    [arr[len - 1 - i], arr[idx]] = [arr[idx], arr[len - 1 - i]];
  }
  return arr;
};
```
