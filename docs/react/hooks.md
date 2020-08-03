---
id: hooks
title: React Hooks
---

Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

### 创造Hooks的动机

1. **很难在组件间重用状态逻辑。** 通常要解决这一问题，可以用render props 或者构建高阶组件来实现重用。但是这两种方法要么需要对组件进行重构，要么需要加入层层“包覆层”组件，使得代码变得难读。利用React Hooks，我们可以将组件的状态逻辑从组件中剥离出来，使得他们可以被单独测试和重用。**简而言之，Hooks允许我们在不改变组件层级的前提下，在组件间实现状态逻辑重用。**

2. **随着组件越来越复杂，组件也越来越难懂。** 通常我们在React生命周期方法中添加状态逻辑和副作用，这导致大量互不相干的代码被放在同一个方法中，容易带来bug，同时也很难单独测试这些代码。于是我们会用额外的中间件专门来处理这些代码，但是引入第三方库又会增加系统的抽象程度，并且导致我们要在不同的文件中跳来跳去，使得组件复用更加困难。**利用React Hooks，我们可以根据功能，将一个组件分解为多个更小的函数，每个函数完成一项特定工作（例如发起api请求、建立监听函数等）**

3. **类组件比函数组件概念更复杂，却没有更多好处。** Hooks让我们无需写类组件，就可以利用大多数React特性。

### State Hook

1. useState和this.state的区别：在设置状态时，后者会合并新旧状态，前者不会。

### Effect Hook

useEffect()的作用是在函数组件中执行sider effects。相当于将类组件的componentDidMount, componentDidUpdate, componentWillUnmount方法合并到一起，

1. 使用多个useEffect()来执行不相干的操作

2.