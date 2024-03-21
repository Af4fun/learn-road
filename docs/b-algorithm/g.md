---
title: 链表
nav:
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

let l1 = new ListNode(1);
l1.next = new ListNode(2);
l1.next.next = new ListNode(3);
l1.next.next.next = new ListNode(4);

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

### 从链表尾部打印

```js
var helper = function (head, newHead) {
  if (head === null) return;
  let next = head.next;
  head.next = newHead;
  helper(next, head);
  console.log(head.val);
};

helper(l1, undefined);
```

### 链表相交

> pa 走到末尾 把 pa 指向 HB pb 走到末尾 把 pb 指向 HA； 都为 null 也是跳出 loop.

```js
/**
 * @param { ListNode } headA
 * @param { ListNode } headB
 * @return { ListNode }
 **/
var getIntersectionNode = function (headA, headB) {
  if (headA == null || headB == null) return null;
  let pA = headA;
  let pB = headB;
  while (pA != pB) {
    pA = pA == null ? headB : pA.next;
    pB = pB == null ? headA : pB.next;
  }
  return pA;
};
```
