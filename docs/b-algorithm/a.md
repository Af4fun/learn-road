---
title: Diff的简单实现
group:
  title: 一些算法
---

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
      const childEl = child instanceof VNode ? child.render() : document.createElement(child);
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
        diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
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
