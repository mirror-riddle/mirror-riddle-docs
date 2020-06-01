# react aha moments

1. Component(state, props) => View

   组件接受参数 state 和 props，然后输出 View。

2. App UI 由组件组合而成，JSX 背后是 React.createElement

   JSX 会被编译为 JS 对象，此对象描述实际 DOM

3. 组件不必须与 DOM 对应

   render 函数返回一个 React element 就行

4. 公共 state 的处理

   React 提倡 state lift up, 即将 state 提升到父组件中去

   Redux 将 state 统一存放到唯一的 store 中

5. 容器组件和展示组件

   容器组件处理业务逻辑，生命循环方法等

   展示组件接受 props，然后展示

6. 尽量使用 stateless 组件，减少复杂度
