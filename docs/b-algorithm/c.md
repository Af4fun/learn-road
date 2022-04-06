---
title: UTF8转UTF16
group:
  title: 一些算法
---

unicode 相当于一个字典，每个字符都能找到它的 unicode

在 js 中 我们获取 unicode 用到的方法通常有 `charCodeAt`, `codePointAt`

```js
const str = '𠮷';
const ch1 = str.charCodeAt(0); // 0xd842;
const ch2 = str.charCodeAt(1); // 0xdfb7;
const th1 = str.codePointAt(0); // 0x20bb7;
/*
 *  0xd842 0xdfb7 表示utf-16的编码
 *  0x20bb7 表示他的 unicode
 */
console.log(str.length); // 2
```

我们常见的中文字符一般是两个字节表示 但是有的字符是需要用到 3 or 多个字节表示这是 因为 js 运行环境是 utf-16 编码，那么中文转二进制流的时候 需要:

**string**-> **unicode** -> **utf-16** -> **utf8** -> **unit8array**

当我们遇到两个字节时，到底是把这两个字节当作一个字符还是与后面的两个字节一起当作一个字符呢？

在基本平面内，从 $\color{#333}{U+D800}$ 到 $\color{#333}{U+DFFF}$ 是一个空段，即这些码点不对应任何字符。<br/> 因此，这个空段可以用来映射**辅助平面**的字符。<br/> 辅助平面的字符位共有 **2^20**个，因此表示这些字符至少需要 20 个二进制位。<br/> UTF-16 将这 20 个二进制位分成两半: <br> 前 10 位映射在 $\color{#333}{U+D800}$ 到 $\color{#333}{U+DBFF}$，称为高位（H），<br> 后 10 位映射在 $\color{#333}{U+DC00}$ 到 $\color{#333}{U+DFFF}$，称为低位（L）。<br> 这意味着，一个辅助平面的字符，被拆成两个基本平面的字符表示。<br> 因此，当我们遇到两个字节，发现它的码点在 $\color{#333}{U+D800}$ 到 $\color{#333}{U+DBFF}$ 之间，就可以断定，紧跟在后面的两个字节的码点，应该在 U+DC00 到 U+DFFF 之间，这四个字节必须放在一起解读

#### 举个栗子：解析 "𠮷" 字

1. 通过第一部分的方法获取到的 unicode;

2. 根据码点对应表的码点范围，判断是否大于 **0x80**， 如果小于这个码点那么直接返回 unicode

3. 当不满足于第 2 点的条件，那么 取 charCodeAt(0) 和 charCodeAt(1); <br /> 根据 utf16 的映射规则 对 charCodeAt(0) 取高 8 位 判断是否为 H 位对 charCodeAt(1) 取高 8 位 判断是否为 L 位如果条件都满足 那么 这四个字节组成一个 unicode 字符 其中高位 H 为 d842 低位 L 为 dfb7

   > H、L 取低地址位 后 10 位 然后转为 20 位 补超出部分 0x10000 (基本平面大小为 0000 ~ FFFF) 函数公式：` H & 0x3FF << 10 | L & 0x3FF + 0x10000`

```js
const str = '𠮷';
const ch1 = str.charCodeAt(0); // 0xd842;
let unicode;
if (ch1 < 0x80) {
  unicode = ch1;
} else {
  const ch2 = str.charCodeAt(1); // 0xdfb7;
  if (ch1 & (0xdc00 === 0xd800) && ch2 & (0xdc00 === 0xdc00)) {
    unicode = (ch1 & (0x3ff << 10)) | (ch2 & (0x3ff + 0x10000));
  } else {
    unicode = ch1;
  }
}
```

附：码点对应表

| Unicode 十六进制码点范围 | UTF-8 二进制                        |
| ------------------------ | ----------------------------------- |
| 0000 0000 - 0000 007F    | 0xxxxxxx                            |
| 0000 0080 - 0000 07FF    | 110xxxxx 10xxxxxx                   |
| 0000 0800 - 0000 FFFF    | 1110xxxx 10xxxxxx 10xxxxxx          |
| 0001 0000 - 0010 FFFF    | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx |

4. 第三步获取到了字符的 unicode 后 根据图表判断 unicode 16 进制的码点范围进行 utf-8 二进制补码

```js
const list = [];
if (unicode <= 0x7f) {
  list.push(unicode);
} else if (unicode <= 0x7ff) {
  list.push((unicode >> 6) | 0xc0);
  list.push((unicode & 0x3f) | 0x80);
} else if (unicode <= 0xffff) {
  list.push((unicode >> 12) | 0xe0);
  list.push(((unicode >> 6) & 0x3f) | 0x80);
  list.push((unicode & 0x3f) | 0x80);
} else if (unicode <= 0x10ffff) {
  list.push((unicode >> 18) | 0xf0);
  list.push(((unicode >> 12) & 0x3f) | 0x80);
  list.push(((unicode >> 6) & 0x3f) | 0x80);
  list.push((unicode & 0x3f) | 0x80);
}
//  后码点范围不做计算
```

附：辅助平面计算公式

```js
H = Math.floor((c - 0x10000) / 0x400) + 0xd800;
L = ((c - 0x10000) % 0x400) + 0xdc00;
```

完整的函数

```js
/**
 *
 * @param {string} str
 * @returns {Array<unicode>}
 */
const getUnicodeList = (str) => {
  const unicodeList = [];
  /** str 字符串字节数 */
  for (let i = 0; i < str.length; i++) {
    /** 获取到 当前为 utf16 编码的unicode */
    let ch1 = str.charCodeAt(i);
    /** 当ch1 小于 D800 那么确定为基础平面 */
    if (ch1 < 0xd800) {
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
};
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
  if ((chartCode1 & 0xfc00) === 0xd800 && (chartCode2 & 0xfc00) === 0xdc00) {
    return (((chartCode1 & 0x3ff) << 10) | (chartCode2 & 0x3ff)) + 0x10000;
  }
  return undefined;
};
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
    if (unicode <= 0x7f) {
      buffer.push(unicode);
    } else if (unicode <= 0xff) {
      buffer.push((unicode >> 6) | 0xc0);
      buffer.push((unicode & 0x3c) | 0x80);
    } else if (unicode <= 0xffff) {
      buffer.push((unicode >> 12) | 0xe0);
      buffer.push(((unicode >> 6) & 0x3f) | 0x80);
      buffer.push((unicode & 0x3f) | 0x80);
    } else if (unicode <= 0x1fffff) {
      buffer.push((unicode >> 18) | 0xf0);
      buffer.push(((unicode >> 12) & 0x3f) | 0x80);
      buffer.push(((unicode >> 6) & 0x3f) | 0x80);
      buffer.push((unicode & 0x3f) | 0x80);
    }
  }
  return buffer;
};
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
      unicodes.push(utf8Char);
    } else if (n > 1) {
      const utf8List = array.slice(index, index + n);
      const code = decodeUt8Unicode(utf8List);
      unicodes.push(code);
    }
  });
  return unicodes;
};
/**
 * @description  将utf8编码的二进制 转换为 unicode 16进制的码点
 * @param {array} codes
 * @returns
 */
const decodeUt8Unicode = (codes = []) => {
  const len = codes.length;
  if (len == 0) return null;
  let start = codes[0];
  let result = start & (2 ** (7 - len) - 1);
  for (let i = 1; i < len; i++) {
    let follow = codes[i];
    if ((follow & 0x80) == 0x80) {
      result = (result << 6) | (follow & 0x3f);
    }
  }
  return result;
};
// 解析unicode
const getStringFromUnicode = (unicodes = []) => {
  let str = '';
  unicodes.forEach((c) => {
    console.log(c.toString(16));
    if (c < 0x10000) {
      str += String.fromCharCode(c);
    } else {
      let minus = c - 0x10000;
      let ch1 = (minus >> 10) | 0xd800;
      let ch2 = (minus & 0x3ff) | 0xdc00;
      str += String.fromCharCode(ch1, ch2);
    }
  });
  return str;
};
```

### [uint8array 和 string 的互转](https://www.jianshu.com/p/4db4b2633dbe)

### [彻底弄懂 Unicode 编码](https://www.cnblogs.com/crazylqy/p/10184291.html)
