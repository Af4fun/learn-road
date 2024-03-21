---
nav:
  title: 框架
  order: 4
---

### 1. setState 是同步还是异步的

在 React 中，如果是由 React 引发的事件处理（比如通过 onClick 引发的事件处理），调用 setState 不会同步更新 this.state，除此之外的 setState 调用会同步执行 this.state 。所谓“除此之外”，指的是绕过 React 通过 addEventListener 直接添加的事件处理函数，还有通过 setTimeout/setInterval 产生的异步调用。

**原因：** 在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果，就是由 React 控制的事件处理过程 setState 不会同步更新 this.state。

注意： setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果

isBatchingUpdates 默认值为 false，当 react 自身的事件处理函数或 react 生命周期触发时，isBatchingUpdates 会被赋值为 true，当更新完成时又会被复原为 false

### 2. React Fiber 机制

React Fiber 是 React 16 引入的一种重新实现的调度算法，用于管理和更新 React 应用中的组件树。在 React Fiber 中，React 应用的组件树被称为“Fiber 树”。

React Fiber 的设计目标是提高 React 应用的性能和用户体验，使得 React 应用在进行更新时可以更好地控制和管理渲染的优先级，从而避免阻塞主线程，保证应用的流畅性。

React Fiber 的核心思想是将整个更新过程分解为多个小任务单元，通过控制这些任务单元的执行顺序和优先级来实现对渲染过程的更细致的控制。这些小任务单元被称为“Fiber”，每个 Fiber 对应应用中的一个组件或 DOM 节点，它们之间通过父子关系构成一棵 Fiber 树。

React Fiber 的主要特点包括：

1. **可中断性和优先级控制**：React Fiber 允许在渲染过程中中断当前任务，执行其他优先级更高的任务，从而保证用户交互的响应性。React Fiber 使用优先级标记来决定哪些任务应该先执行，哪些任务可以暂时中断。

2. **增量渲染**：React Fiber 采用增量渲染的方式，将渲染过程分解为多个小任务单元，每次只更新部分 UI，而不是一次性更新整个 UI。这样可以减少单次更新所带来的性能开销，提高渲染效率。

3. **可调度性**：React Fiber 允许在渲染过程中动态地调整任务的优先级和执行顺序，以适应不同的场景和用户操作。这样可以更好地平衡性能和用户体验之间的关系。

4. **任务分片和同步渲染**：React Fiber 使用任务分片的方式来将任务拆分成多个小单元，在执行过程中可以中断和恢复。同时，React Fiber 保留了同步渲染的能力，以确保某些关键任务的同步执行。

5. **错误边界和异常处理**：React Fiber 提供了更好的错误边界和异常处理机制，可以捕获和处理组件树中的错误，防止错误影响整个应用的稳定性和用户体验。

总的来说，React Fiber 通过重新设计调度算法和更新机制，提高了 React 应用的性能和用户体验，使得 React 应用可以更好地适应复杂的交互场景和大规模数据更新。

### 3. Hooks 原理

React Hooks 是 React 16.8 引入的一种新特性，它允许在函数组件中使用 state 和其他 React 特性，从而使函数组件具有了类组件的一些能力。Hooks 的设计目标是使得组件逻辑的复用变得更加容易，同时提高组件的可读性和可维护性。

Hooks 的原理可以通过以下几个核心概念来解释：

1. **函数式组件**：React 16 引入了函数式组件，允许以函数的形式定义组件。函数式组件没有实例，不支持状态和生命周期等特性。

2. **Hooks 函数**：Hooks 是一类特殊的函数，它们提供了一种在函数式组件中复用状态逻辑的方式。React 提供了一些内置的 Hooks，比如 `useState`、`useEffect`、`useContext` 等，同时也允许开发者自定义 Hooks。

3. **useState Hook**：`useState` Hook 允许函数组件使用状态，它返回一个包含当前状态值和更新函数的数组。React 使用闭包来保存每个状态的值，以保证状态在组件重新渲染时的一致性。

4. **useEffect Hook**：`useEffect` Hook 允许在函数组件中执行副作用操作，比如数据获取、订阅事件、手动操作 DOM 等。React 在组件渲染之后执行 `useEffect` 中定义的副作用函数，并在组件卸载或下一次执行 `useEffect` 之前清除副作用。

5. **自定义 Hooks**：开发者可以创建自定义的 Hooks，以便在不同组件之间共享逻辑。自定义 Hooks 是普通 JavaScript 函数，名称以 "use" 开头，可以在内部使用其他 Hooks。

Hooks 的实现原理主要涉及到 React 内部对组件状态、副作用处理、组件生命周期的管理和调度。React 使用 Fiber 架构来管理组件的更新过程，Hooks 通过 Fiber 架构提供的调度机制来保证状态的更新和副作用的执行按照预期进行。

总的来说，React Hooks 的原理基于函数式编程思想和闭包机制，通过提供一种简洁的 API 来让函数组件具备状态和副作用处理的能力，从而使得组件的逻辑复用更加容易。
