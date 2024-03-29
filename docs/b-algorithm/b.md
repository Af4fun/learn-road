---
title: KMP 匹配子串
nav:
  title: 一些算法
---

- step1-生成前缀表:

举例子：

```js
/** abac
   *  a    前缀 无 后缀 无 -> 0
      ab   前缀 a, 后缀 b -> 0
      aba  前缀 a，ab, 后缀 b, ba -> 0
      abac 前缀 a，ab, abc 后缀 b, bc, bcd -> 0
      前缀表是[-1,0,0,0]
  */
```

```js
const prefix_table = (p = '') => {
  let n = p.length;
  let prefix = new Array(n).fill();
  prefix[0] = 0;
  let len = 0;
  let i = 1;
  while (i < n) {
    if (p[i] /*后缀*/ == p[len] /** 前缀 */) {
      // len++; // 最大长度
      prefix[i] = ++len;
      i++;
    } else {
      if (len > 0) {
        len = prefix[len - 1];
      } else {
        prefix[i] = len; // pr[1] = 0; pr[2] = 0;
        i++;
      }
    }
  }
  prefix.unshift(-1);
  prefix.pop();
  return prefix;
};
```

- step2-利用前缀表匹配：

```js
const kmp = (t = '', p = '') => {
  let prefix = prefix_table(p);
  let n = prefix.length;
  let m = t.length;
  let i = 0;
  let j = 0;
  let result = [];
  while (i < m) {
    if (j == n - 1 && t[i] == p[j]) {
      result.push(i - j);
      j = prefix[j];
    }
    if (t[i] == p[j]) {
      i++;
      j++;
    } else {
      j = prefix[j];
      if (j == -1) {
        i++, j++;
      }
    }
  }

  return result;
};
```
