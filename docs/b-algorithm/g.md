---
title: 链表
group:
  title: 一些算法
---

定义

```js
/**
 * Definition for singly-linked list.
 
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

let l1 = new ListNode(0);
l1.next = new ListNode(0);
l1.next.next = new ListNode(0);
l1.next.next.next = new ListNode(0);

let l2 = new ListNode(5);
l2.next = new ListNode(6);
l2.next.next = new ListNode(4);
```

### 翻转链表

```js
var reverseList = function (head) {
  if (!head || !head.next) return head;
  let stack = [];
  while (head) {
    stack.push(head);
    head = head.next;
  }
  let newHead = stack.pop();
  let dumy = newHead; // 内存地址
  while (stack.length) {
    let next = stack.pop();
    newHead.next = next;
    newHead = next.next;
  }
  newHead.next = null;
  return dumy;
};

reverseList(a);

// 尾递归
const reverseList2 = (head) => {
  return reverseListInt(head, null);
};

const reverseListInt = (head, newHead) => {
  if (head == null) return newHead;
  let next = head.next;
  head.next = newHead;
  return reverseListInt(next, head);
};

reverseList2(a);
```
