---
title: Diff的简单实现
nav:
  title: 一些算法
  order: 2
---

### Vue 和 React 的 diff 有什么区别

Vue 和 React 的 diff 算法都是用来比较虚拟 DOM（Virtual DOM）的变化，并且尽量减少实际 DOM 操作的次数，从而提高性能。它们的主要区别在于实现方式和一些细节上的差异。

1. Vue 使用了双端比较策略（又称为双向比较），即同时对比新旧节点树的头尾节点，通过最大限度地复用节点和优化渲染路径来实现高效的更新。

2. React 使用了基于 Fiber 架构的协调算法，该算法通过任务切片和优先级调度来实现增量更新，使得 React 在渲染大型应用时能够更好地响应用户输入和动态变化。

总的来说，Vue 的 diff 算法更倾向于通过双端比较来优化更新过程，而 React 则通过 Fiber 架构实现了更灵活和可控的更新策略。

```js
class VNode {
  constructor(tag, props, children) {
    this.tag = tag;
    this.props = props;
    this.children = children;
  }

  render() {
    const el = document.createElement(this.tag);
    const props = this.props;
    for (let p in props) {
      const v = props[p];
      el.setAttribute(p, v);
    }

    this.children?.forEach((child) => {
      const childEl =
        child instanceof VNode ? child.render() : document.createElement(child);
      el.appendChild(childEl);
    });
  }
}

const h = (...arg) => new VNode(arg);

const tree = h('ul', { id: 'list' }, [
  h('li', {}, ['item1']),
  h('li', {}, ['item2']),
  h('li', {}, ['item3']),
]);

const tree2 = h('ol', { id: 'x' }, [
  h('li', {}, ['item1']),
  h('li', {}, ['xitem']),
  h('li', {}, ['item3']),
]);

const root = tree.render();

const REPLACE = 1;
const REORDER = 2;
const PROPS = 1;
const TEXT = 1;

const typeIs = (el, name) => {
  const str = Object.prototype.toString.call(el).slice(8, -1);
  return str === name;
};

const diff = (oldNode, newNode) => {
  let k = 0;
  const patches = {};
  diffWsark(newNode, oldNode, k, patches);
  return patches;
};

const diffWsark = (oldNode, newNode, index, patches) => {
  let currentPath = [];
  if (newNode) {
    if (typeIs(oldNode, 'string') && typeIs(newNode, 'string')) {
      oldNode != newNode && currentPath.push({ type: TEXT, content: newNode });
    } else if (oldNode.tag === newNode.tag && oldNode.key === newNode.key) {
      var propsPatches = diffProps(oldNode, newNode);
      if (propsPatches) {
        currentPatch.push({ type: patch.PROPS, props: propsPatches });
      }
      // Diff children. If the node has a `ignore` property, do not diff children
      if (!isIgnoreChildren(newNode)) {
        diffChildren(
          oldNode.children,
          newNode.children,
          index,
          patches,
          currentPatch,
        );
      }
    } else {
      currentPath.push({ type: REPLACE, node: newNode });
    }

    if (currentPath.length) {
      patches[index] = currentPath;
    }
  }
};
```
