---
title: 前端基础
group:
  title: javascript
---

### 1.理解原型设计模式以及 JavaScript 中的原型规则

**原型对象：** 我们创建的每一个函数（JavaScript 中函数也是一个对象）都有一个原型属性 prototype，原型属性实质上是一个指针，它指向一个对象，这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法（通俗的说：就是这个特定类型的所有实例都可以共享原型对象包含的属性和方法）.

### 2.instanceof 的底层实现原理，手动实现一个 instanceof

```js
function instance_of(L, R) {
  // L 表示instanceof左边，R 表示instanceof右边
  let O = R.prototype; // 取 R 的显示原型
  L = L.__proto__; // 取 L 的隐式原型
  while (true) {
    // 循环执行，直到 O 严格等于 L
    if (L === null) return false;
    if (O === L) return true;
    L = L.__proto__;
  }
}
var str = 'test';
console.log(str.__proto__ === String.prototype); //true ，true是因为，你这里的变量str，它根本就没有__proto__属性，可以访问的原因是因为，它经过了包装类，也就是js底层给你创建了一个 var str = new String('test'); 然后你这里访问的str.__proto__ ,是String返回给你的str，所以肯定打印true，
console.log(str instanceof String); //false
```

包装类创建的 str 用完之后就会被销毁，这里的 str 就是一个变量的 str，它不是对象，所以它肯定不是 String 的实例

```js
var str1 = new String('test');
console.log(str1.__proto__ === String.prototype, str1 instanceof String); // true true
```

### 3.实现继承的几种方式以及他们的优缺点

1. **原型链 new**

```js
function Fn() {}

var fn = new Fn();
```

2. **借用构造函数**

在解决原型中包含引用类型值所带来的问题中，使用借用构造函数技术来解决。借用构造函数的基本思想，即在子类型构造函数的内部调用超类型构造函数。函数只不过是在特定环境中执行代码的对象，因此通过使用`apply()`和`call()`方法可以在新创建的对象上执行构造函数。

```js
function Parent() {}

function Child() {
  Parent.call(this);
}

var child = new Child();
```

3. **组合继承**

组合继承，指的是将原型链和借用构造函数的技术组合到一起。思路是使用原型链实现对原型方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数的复用，又能够保证每个实例都有它自己的属性。 <br>

```js
function Parent() {}

function Child() {
  Parent.call(this);
}

Child.prototype = new Parent();

Child.prototype.constructor = Child;

var child = new Child();
```

### 4.可以描述 new 一个对象的详细过程，手动实现一个 new 操作符

new 操作符创建对象可以分为以下四个步骤：

1. 创建一个空对象；
2. 链接到原型（将所创建对象的**proto**属性值设为构造函数的 **prototype** 属性值）；
3. 绑定 this（构造函数中的 this 指向新对象并且调用构造函数）；
4. 返回新对象。

### 5.理解 es6 class 构造以及继承的底层实现原理

先说结论： class 组合寄生继承 简单写法

1.  校验构造函数
2.  配置构造函数或构造函数原型上的公有函数和静态方法
3.  挂载公有函数和静态方法描述符到构造构造函数或者构造函数原型

### 6. DOM 的事件机制，怎么阻止事件捕获

1. EventTraget、Event (addEventListener, removeEventListener, dispatchEvent);
2. 事件捕获 从上至下
3. 事件冒泡 从下至上

### 7. var 怎么实现 let

let 和 var 的区别是具有块级作用域，暂时性死区的概念要模拟这种需要用作用域来模拟，利用闭包

### 8. Set 的用法，用 Set 实现数组去重

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。 Set 本身是一个构造函数，用来生成 Set 数据结构。

Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

### 9. 大文件的分片上传和断点续传怎么做的

大文件转成 Unit8array 是一个 类数组（ArrayLike); 数组拆分成 若干片段，每段片段打上 Hash 与后端配合记录 hash，每次上传校验 hash，后端根据 hash 进行拼接

### 10. 如何针对性能指标做优化

chrome 进行性能分析，找出性能需要优化的点。 render：优化渲染性能加载速度，响应速度。

### 11. 从输入 URL 到浏览器显示页面过程中都发生了什么？， DNS 解析流程。

### 12. 哈希表原理，哈希碰撞时怎么处理？

### 13. 内存回收机制？

### 14. 栈内存和堆内存的概念

### 15. Vue 和 React 的 diff 有什么区别

### 16. CommonJs, ESM, UMD

模块化主要是用来抽离公共代码，隔离作用域，避免变量冲突等。

**IIFE**： 使用自执行函数来编写模块化，特点：在一个单独的函数作用域中执行代码，避免变量冲突。

```js
(function () {
  return { data: [] };
})();
```

**AMD**： 使用 requireJS 来编写模块化，特点：依赖必须提前声明好。

```js
define('./index.js',function(code){ // code 就是 index.js 返回的内容 })
```

**CMD**： 使用 seaJS 来编写模块化，特点：支持动态引入依赖文件。

```js
define(function (require, exports, module) {
  var indexCode = require('./index.js');
});
```

**CommonJS**： nodejs 中自带的模块化。

`var fs = require('fs');`

**UMD**：兼容 AMD，CommonJS 模块化语法。

webpack(require.ensure)：webpack 2.x 版本中的代码分割。

**ES** Modules： ES6 引入的模块化，支持 import 来引入另一个 js 。

`import a from 'a';`
