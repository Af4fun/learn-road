---
title: Tree （2x树）
nav:
  title: 一些算法
---

定义：

```js
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

let node1 = new TreeNode(1);
let node2 = new TreeNode(2);
let node3 = new TreeNode(3);
let node4 = new TreeNode(4);
let node5 = new TreeNode(5);
let node6 = new TreeNode(6);
let node7 = new TreeNode(7);

/**
 *     1
     2   3
    4 5 6 7
 */
node1.left = node2;
node1.right = node3;

node2.left = node4;
node2.right = node5;

node3.left = node6;
node3.right = node7;
```

    中
    /  \
    左   右

前序遍历：中，左，右 <br> 中序遍历：左，中，右 <br> 后序遍历：左，右，中

### 前序遍历

```js
//输出 4-2-5-1-6-3-7
function fn() {
  const stack = [];
  const result = [];
  while (stack.length || root) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    let t = stack.pop();
    result.push(t.val);
    root = t.right;
  }
  return result;
}
```

### 中遍历

```js
// 输出 1234567
function fn() {
  const queue = [];
  queue.push(root);
  const result = [];
  while (queue.length) {
    let node = queue.shift();
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
    result.push(node.val);
  }
  return result;
}
```

### 后序遍历

```js
// 输出 7361524
function fn() {
  const stack = [];
  const result = [];
  while (stack.length || root) {
    while (root) {
      stack.push(root);
      root = root.right;
    }
    let t = stack.pop();
    result.push(t.val);
    if (t.left) {
      root = t.left;
    }
  }
  return result;
}
```

### 多叉树的遍历

```js
function fn(node) {
  if (!node) return;
  console.log(node);
  if (node.childrens) {
    for (let i = 0; i < node.childrens.length; i++) {
      fn(node.childrens[i]);
    }
  }
}
```
