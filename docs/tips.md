## jser 的日常

### 1. 生成 n 进制的 m 位 随机数

    let num = Math.random().toString(n).substr(2, m);

### 2. 进行补‘0’ 操作

```
    function format(n, length) {
        return (Array(length).join('0') + n).substr(-length);
    }

    // 利用正则
    var str = '2020-1-8 15:8:6'
    console.log(str.replace(/\b\d\b/g, '0$&'));
```

### 3. 克隆

- 数组克隆

```
	const sheeps = ['1', '2', '3'];

	const cloneSheeps = sheeps.slice();

	console.log(sheeps==cloneSheeps);

	console.log(sheeps===cloneSheeps);
```

- 对象克隆

```
/**
 * @description: 利用递归的克隆函数
 * @param {Object}
 * @return: copy obj
 */
function clone(obj){
	if(typeof obj !== 'object' || !obj) return obj;
	let newObj = new Object();
	Object.keys(obj).forEach((key)=>{
			if(typeof obj[key] !== 'object'){
					newObj[key] = obj[key];
			}else{
					newObj[key] = clone(obj[key]);
			}
	});
	return newObj;
}
```

$\color{#e4393c}{以上方法未处理重复引用问题, 处理重复应用 使用如下方法}$

参考解决方式一：使用 weekmap: 解决循环引用问题，我们可以开辟一个存储空间，来存储当前对象和拷贝对象的对应关系 这个存储空间，需要可以存储 key-value 形式的数据，且 key 是一个引用类型。 我们可以选 WeakMap 这种数据结构：

```
function isObject(obj) {
  return (typeof obj === "object" || typeof obj === "function") && obj !== null;
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

参考解决方式二： 可以用 Set,发现相同的对象直接赋值，也可用 Map:

```
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

```
/**
 * @description: 利用json转换拷贝
 * @param {Object}
 * @return: obj
 */
function jsonClone(obj){
    let str = JSON.stringify(obj);
    return JSON.parse(obj);
}

```

### 4. ~”运算符（位非）用于对一个二进制操作数逐位进行取反操作。

- 第 1 步：把运算数转换为 32 位的二进制整数。
- 第 2 步：逐位进行取反操作。
- 第 3 步：把二进制反码转换为十进制浮点数。

* 位非运算实际上就是对数字进行取负运算，再减 1。例如：

```
    console.log(!!~sheeps.indexOf('3'))
    // 运算过程
    // sheeps.indexOf('3') === 2
    // ~2 = -2-1 = -3
    // !-3 = !true = false
    // !false = true
    console.log(~~2311.233) // 2311
```

### 5. 快速构造一个自增 数组

```
    Number.prototype[Symbol.iterator] = function * () {
        let i = 0;
        while (i < this) {
            yield i++
        }
    }

    var arr = [...20]
```

### 6. 生成一个螺旋数组

ex：

```
    [[1,2,3]，
    [8,9,4]，
    [7,6,5]];

```

```
    function cycleArray(n){

        let arr = [];

        let cycle = Math.ceil(n/2); // 计算 n*n 矩阵的 环绕圈数

        let start = 1;

        for(let i=0;i<n;i++){
            arr[i] = [];
            for(let j = 0;j<n;j++){
                arr[i][j] = "";
            }
        }

        for(let j = 0;j<cycle;j++){
            creatCycle(j)
        }
        /*循环一圈之后找到起始点再次循环*/
        function creatCycle(cycleStart){
            /**从左到右**/
            for(let i=0;i<n;i++){
                if(!arr[cycleStart][i]){
                    arr[cycleStart][i] = start;
                    start++;
                }
            }
            /**上到下**/
            for(let i=0;i<n;i++){
                if(!arr[i][n-1-cycleStart]){
                    arr[i][n-1-cycleStart] = start;
                    start++;
                }

            }
            /**右到左**/
            for(let i=n-1;i>=0;i--){
                if(!arr[n-1-cycleStart][i]){
                    arr[n-1-cycleStart][i] = start;
                    start++;
                }
            }
            /** 下到上**/
            for(let i=n-1;i>=0;i--){
                if(!arr[i][cycleStart]){
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

```
	const validator = async (form, rules) => {
    for (let filed in form) {
      for (let rule in rules[filed]) {
        const err = await validatorFnc(form[filed], rules[filed][rule])
        if (err) {
          return Promise.reject(err)
        }
      }
    }
    return Promise.resolve()
  }

	const validatorFnc = (value, rule) => {
	const requiredReg = new RegExp(/^.+$/) // 基础验证
	return new Promise((resolve, reject) => {
			/* 为空验证 */
			if (rule.required) {
					if (!requiredReg.test(value)) {
							reject(rule.msg)
					} else {
							resolve()
					}
			}
			/* 正则验证 */
			if (rule.reg) {
					if (!rule.reg.test(value)) {
							reject(rule.msg)
					} else {
							resolve()
					}
			}
			/* 自定义方法验证 */
			if (rule.validatorFnc && typeof rule.validatorFnc === 'function') {
					if (!rule.validatorFnc(value)) {
							reject(rule.msg)
					} else {
							resolve()
					}
			}
	})
	}

	// ex:
	let form = {
        name: '1',
        code: '4',
	};

	let rules = {
        name: [
            {
                required: true, msg: '请填写昵称'
            }
        ],
        code:[
            {
                required: true, msg: '请填写识别码'
            },
            {
                reg: new RegExp(/\d/),
                msg: '仅限数字'
            }
        ]
	}

	validator(form, rules).then((resp)=>{
			console.log('验证通过')
			console.log(resp);
	}).catch(err=>{
			console.log(err);
	})

```

### 8. 贝赛尔曲线

> [参考 1](https://www.jianshu.com/p/0c9b4b681724)

> [参考 2](https://github.com/hujiulong/blog/issues/1)

#### 示例：二次贝赛尔曲线方程

```
    /// 起点 p0 终点 p2 控制点 p1 t∈[0, 1]
    function quadraticBezier( p0, p1, p2, t ) {
        var k = 1 - t;
        return k * k * p0 + 2 * ( 1 - t ) * t * p1 + t * t * p2;
    }
```

关于找到二次贝塞尔曲线的控制点

TODO

### 9 常用的 js 的设计模式

1. 单例设计模式

```
    // es5:
    let singleCase = function(name){
        this.name = name;
    };
    singleCase.prototype.getName = function(){
        return this.name;
    }
    // 获取实例对象
    let getInstance = (function() {
        var instance = null;
        return function(name) {
            if(!instance) {//相当于一个一次性阀门,只能实例化一次
                instance = new singleCase(name);
            }
            return instance;
        }
    })();
    // 测试单体模式的实例,所以one===two
    let one = getInstance("one");
    let two = getInstance("two");

    // es6 （ts）:
    class SingleInstance {

        private static _instance: SingleInstance = new SingleInstance();

        public name:string;

        private constructor(){
            this.name = 'singleInstance';
        }

        public static getInstance():SingleInstance{
            return this._instance;
        }
    }

```

2. 订阅发布

```
    var EventBus = {
    events :{},
    on: function(type, fn){
        if(typeof this.events[type] === 'undefined'){
            this.events[type] = [fn]
        }else{
            this.events[type].push(fn)
        }
    },
    emit: function(type, arg){
        if(!this.events[type]) return
        var fns = this.events[type]
        for(let i = 0; i< fns.length; i++){
            fns[i].call(this, arg)
        }
    },
    off: function(type){
        if(!this.events[type]) return;
        if(this.events[type] instanceof Array){
            for(let i=this.events[type].length - 1;i>0; i--){
                this.events[type].splice(i, 1)
            }
        }
    }

}
EventBus.on('update', function(arg){
    console.log(arg);
})

EventBus.emit('update', 'some arguments')

```

### 10. 小技巧

```
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

```
    function sortQuick(arr){
        if(! (arr instanceof Array) || arr.length<=1) return arr
        let mid = Math.floor(arr.length / 2);
        let midTarget = arr.splice(mid, 1)[0];
        let left = [];
        let right = [];

        for(let i=0; i< arr.length; i++){
            if(arr[i] < midTarget){
                left.push(arr[i])
            }else{
                right.push(arr[i])
            }
        }
        /// 利用递归
        return sortQuick(left).concat(midTarget, sortQuick(right));
    }
```

> 冒泡排序

```
    function doubbleSort(arr){
            if(arr.length<=1) return arr;

            for(let i = 0; i< arr.length - 1; i++){
                console.log(`第${i+1}遍`)
                for(let j = 0; j< arr.length - 1 - i; j++){
                    if(arr[j] > arr[j+1]){
                        var tmp = arr[j];
                        arr[j] = arr[j+1];
                        arr[j+1] = tmp
                    }
                    console.log(`第${i+1}遍, 第${j+1}次交换`)
                }
            }

            console.log(arr)
        }

```

## 12 函数柯里化实现

```
function sum (a, b, c, d){
   return a + b + c + d;
}

function curry(fn, outArgs){
    let len = fn.length;
    return function(){
        let all_arg = [...outArgs, ...arguments];
        if(all_arg.length>=len){
           fn.apply(this, all_arg)
        }else{
            return curry(fn, all_arg)
        }
    }
}

function count(){
    return curry(sum, arguments)
}

count(1)(2)(3)(4) //  10
```

otherone:

```
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

## 13 unicode utf8 utf16 编码问题

unicode 相当于一个字典， 每个字符都能找到它的 uniocde

在 js 中 我们获取 unicode 用到的方法通常有 `charCodeAt`, `codePointAt`

```
    const str = '𠮷';
    const ch1 = str.charCodeAt(0); // 0xd842;
    const ch2 = str.charCodeAt(1); // 0xdfb7;
    const th1 = str.codePointAt(0); // 0x20bb7;
    /* 0xd842 0xdfb7 表示utf-16的编码
    *  0x20bb7 表示他的 unicode
    */
    console.log(str.length) // 2
```

我们常见的中文字符一般是两个字节表示 但是有的字符是需要用到 3 or 多个字节表示 因为 js 运行环境是 16 进制的编码，那么中文转二进制流的时候 需要

> string-> unicode -> utf-16 -> utf8 -> unit8array

当我们遇到两个字节时，到底是把这两个字节当作一个字符还是与后面的两个字节一起当作一个字符呢？

在基本平面内，从 ==U+D800== 到 ==U+DFFF== 是一个空段，即这些码点不对应任何字符。因此，这个空段可以用来映射辅助平面的字符。辅助平面的字符位共有 2^20 个，因此表示这些字符至少需要 20 个二进制位。UTF-16 将这 20 个二进制位分成两半，前 10 位映射在 U+D800 到 U+DBFF，称为高位（H），后 10 位映射在 ==U+DC00== 到 ==U+DFFF==，称为低位（L）。这意味着，一个辅助平面的字符，被拆成两个基本平面的字符表示。因此，当我们遇到两个字节，发现它的码点在 U+D800 到 U+DBFF 之间，就可以断定，紧跟在后面的两个字节的码点，应该在 U+DC00 到 U+DFFF 之间，这四个字节必须放在一起解读

举个栗子：解析 "𠮷" 字

1. 通过第一部分的方法获取到的 unicode;
2. 根据图表的码点范围，判断是否大于 0x80， 如果小于这个码点那么直接返回 unicode
3. 当不满足于第 2 点的条件，那么 取 charCodeAt(0) 和 charCodeAt(1); <br /> 根据 utf16 的映射规则 对 charCodeAt(0) 取高 8 位 判断是否为 H 位对 charCodeAt(1) 取高 8 位 判断是否为 L 位

```
    const str = '𠮷';
    const ch1 = str.charCodeAt(0); // 0xd842;
    let unicode;
    if(ch1 < 0x80) {
        unicode = ch1
    }else{
        const ch2 = str.charCodeAt(1); // 0xdfb7;
        if(ch1 & 0xDC00 === 0xD800 && ch2 & 0xDC00 === 0xDC00){
            unicode = (ch1 & 0x3FF << 10 | ch2 & 0x3FF + 0x10000);
        }else{
            unicode = ch1
        }
    }

```

如果条件都满足 那么 这四个字节组成一个 unicode 字符 其中高位 H 为 d842 低位 L 为 dfb7

> H、L 取低地址位 后 10 位 然后转为 20 位 补超出部分 0x10000 (基本平面大小为 0000 ~ FFFF)

函数公式： H & 0x3FF << 10 | L & 0x3FF + 0x10000

4. 根据表

| Unicode 十六进制码点范围 | UTF-8 二进制                        |
| ------------------------ | ----------------------------------- |
| 0000 0000 - 0000 007F    | 0xxxxxxx                            |
| 0000 0080 - 0000 07FF    | 110xxxxx 10xxxxxx                   |
| 0000 0800 - 0000 FFFF    | 1110xxxx 10xxxxxx 10xxxxxx          |
| 0001 0000 - 0010 FFFF    | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx |

第三步获取到了字符的 unicode 后 根据图表判断 unicode 16 进制的码点范围进行 utf-8 二进制补码

```
const list = [];
if(unicode <= 0x7f){
    list.push(unicode);
}else if(unicode <= 0x7FF){
    list.push((unicode >> 6) | 0xC0);
    list.push((unicode & 0x3F) | 0x80);
}else if(unicode <= 0xFFFF){
    list.push((unicode >> 12) | 0xe0);
    list.push(((unicode >> 6) & 0x3f) | 0x80);
    list.push((unicode & 0x3F) | 0x80);
}else if(unicode <= 0x10FFFF){
    list.push((unicode >> 18) | 0xf0);
    list.push(((unicode >> 12) & 0x3f) | 0x80);
    list.push(((unicode >> 6) & 0x3f) | 0x80);
    list.push((unicode & 0x3f) | 0x80);
}
<!-- 后码点范围不做计算-->
```

附录：辅助平面计算公式

```
    H = Math.floor((c-0x10000) / 0x400) + 0xD800

    L = (c - 0x10000) % 0x400 + 0xDC00
```

完整的函数

```
    /**
 *
 * @param {string} str
 * @returns {Array<unicode>}
 */
const getUnicodeList = (str) => {
    const unicodeList = [];
    /** str 字符串字节数 */
    for (let i = 0; i < str.length; i++){
        /** 获取到 当前为 utf16 编码的unicode */
        let ch1 = str.charCodeAt(i);
        /** 当ch1 小于 D800 那么确定为基础平面 */
        if (ch1 < 0xD800) {
            unicodeList.push(ch1);
        } else {
            let ch2 = str.charCodeAt(i + 1);
            let unicode = isSMP(ch1, ch2);
            if (unicode) {
                i += 1;
                unicodeList.push(unicode);
            } else {
                unicodeList.push(ch1);
            }
        }
    }
    return unicodeList;
}
/**
 * unicode 是否属于辅助平面
 * BMP 基础平面 0000 - FFFF
 * SMP 辅助平面 010000 - 10FFFF
 * 辅助平面 映射基本平面范围 D800 - DFFF;
 * H 高位 D800 - DBFF;
 * L 低位 DC00 - DFFF;
 */
const isSMP = (chartCode1, chartCode2) => {
    // & FC00 取高八位 判断 c1 和c2 是否属于 H 和 L
    if ((chartCode1 & 0xFC00) === 0xD800 && (chartCode2 & 0xFC00) === 0xDC00) {
        return (((chartCode1 & 0x3FF) << 10) | (chartCode2 & 0x3FF)) + 0x10000;
    }
    return undefined;
}
/**
 * unicode 码点             utf8编码
 * 0000 0000 - 0000 007F    0xxxxxxx
 * 0000 0080 - 0000 07FF	110xxxxx 10xxxxxx
 * 0000 0800 - 0000 FFFF	1110xxxx 10xxxxxx 10xxxxxx
 * 0001 0000 - 0010 FFFF	11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
 * @param {*} unicodes
 * @returns utf8 code array
 */
const utf8Arr = (unicodes) => {
    const buffer = [];
    for (let k in unicodes) {
        const unicode = unicodes[k];
        if (unicode <= 0x7F) {
            buffer.push(unicode)
        } else if (unicode <= 0xFF) {
            buffer.push((unicode >> 6) | 0xC0)
            buffer.push((unicode & 0x3c) | 0x80)
        } else if (unicode <= 0xFFFF) {
            buffer.push((unicode >> 12) | 0xe0)
            buffer.push(((unicode >> 6) & 0x3f) | 0x80)
            buffer.push((unicode & 0x3f) | 0x80);
        } else if (unicode <= 0x1FFFFF) {
            buffer.push((unicode >> 18) | 0xf0);
            buffer.push(((unicode >> 12) & 0x3f) | 0x80)
            buffer.push(((unicode >> 6) & 0x3f) | 0x80)
            buffer.push((unicode & 0x3f) | 0x80);
        }
    }
    return buffer;
}
/**
 * 从unit8Arry 中解析出unicode
 */
const getUnicodeWithUtf8 = (array = []) => {
    const unicodes = [];
    array.forEach((utf8Char, index) => {
        let n = 7;
        while (((utf8Char >> n) & 1) == 1) n--;
        n = 7 - n;
        if (n == 0) {
            unicodes.push(utf8Char)
        } else if (n > 1) {
            const utf8List = array.slice(index, index + n);
            const code = decodeUt8Unicode(utf8List);
            unicodes.push(code);
        }
    });
    return unicodes;
}
/**
 * @description  将utf8编码的二进制 转换为 unicode 16进制的码点
 * @param {array} codes
 * @returns
 */
const decodeUt8Unicode = (codes = []) => {
    const len = codes.length;
    if (len == 0) return null;
    let start = codes[0];
    let result = start & (2**(7 - len) - 1);
    for (let i = 1; i < len; i++){
        let follow = codes[i];
        if ((follow & 0x80) == 0x80) {
            result = (result << 6) | (follow & 0x3f);
        }
    }
    return result;
}
// 解析unicode
const getStringFromUnicode = (unicodes = []) => {
    let str = '';
    unicodes.forEach((c) => {
        console.log(c.toString(16))
        if (c < 0x10000) {
            str += String.fromCharCode(c)
        } else {
            let minus = c - 0x10000;
            let ch1 = (minus >> 10) | 0xd800;
            let ch2 = (minus & 0x3ff) | 0xdc00;
            str += String.fromCharCode(ch1, ch2);
        }
    })
    return str;
}

```

### [uint8array 和 string 的互转](https://www.jianshu.com/p/4db4b2633dbe)

### [彻底弄懂 Unicode 编码](https://www.cnblogs.com/crazylqy/p/10184291.html)

## 14 洗牌算法

```

const shuffle = (arr = []) => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let idx = Math.floor(Math.random() * (len - i)) + i;
    [arr[len - 1 - i], arr[idx]] = [arr[idx], arr[len - 1 - i]];
  }
  return arr;
};

```
