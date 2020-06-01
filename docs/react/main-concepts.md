# Main Concepts

## Introducing JSX

1. Babel compiles JSX down to React.createElement() calls, which creates objects (React Elements).

2. JSX prevents XSS attacks. By default, React DOM escapes any values embedded in JSX before rendering them.

3. JSX is transformed to Javascript Objects (React Elements). You can think of them as descriptions of what you want to see on the screen. React reads these objects and uses them to construct the DOM and keep it up to date.

## Rendering Elements

1. Unlike browser DOM elements, React elements are plain objects, and are cheap to create. React DOM takes care of updating the DOM to match the React elements.

2. React elements are immutable. Once you create an element, you can’t change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

３．React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

## Components and Props

1. Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

2. We recommend naming props from the component’s own point of view rather than the context in which it is being used.

3. When React sees an element representing a user-defined component, it passes JSX attributes and children to this component as a single object. We call this object “props”.

4. 纯函数：不改变输入，并且对于同样的输入，输出恒定。

5. 对于 props 来说，react 组件必须是纯函数。

## State and Lifecycle

1. 不要尝试直接改变 state，这是无效的，只有在 constructor 里才可以直接给 state 赋值。

2. state 的更新可能是异步的，为性能考虑，react 可能将几个 setState 合并在一起执行。因为 props 和 state 都可能异步更新，所以不应该依赖它们去计算新的 state。在这种情况下，应该使用 setState((prevState, currentProps) => nextState)。

3. state 更新会将提供的新 state 合并到现有 state 中。

4. 数据是从上至下流动的

   组件不知道其他组件是否有状态，也不应该关心这一点。所以 state 是本地的，只有拥有和设置 state 的组件才能接触它。

   This is commonly called a “top-down” or “unidirectional” data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components “below” them in the tree.

   If you imagine a component tree as a waterfall of props, each component’s state is like an additional water source that joins it at an arbitrary point but also flows down.

## Handling events

1. Bind this, using public class fields syntax or arrow function.

2. Passing arguments to event handler, using arrow functions or Function.prototype.bind.

## Conditional Rendering

1. Just like in Javascript

## Lists and keys

1. Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.

2. Keys serve as a hint to React but they don’t get passed to your components. If you need the same value in your component, pass it explicitly as a prop with a different name.

## Forms

1. In HTML, form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with setState().

2. We can combine the two by making the React state be the “single source of truth”. Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a “controlled component”.

3. When you need to handle multiple controlled input elements, you can add a name attribute to each element and let the handler function choose what to do based on the value of event.target.name.

4. Specifying the value prop on a controlled component prevents the user from changing the input unless you desire so. If you’ve specified a value but the input is still editable, you may have accidentally set value to undefined or null.

5. Form solution: [Formik](https://jaredpalmer.com/formik)

## Lifting state up

1. Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor.

## Composition vs Inheritance

1. React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components.

## Thinking in React

1. React is, in our opinion, the premier way to build big, fast Web apps with JavaScript. It has scaled very well for us at Facebook and Instagram.

2. But how do you know what should be its own component? Use the same techniques for deciding if you should create a new function or object. One such technique is the single responsibility principle, that is, a component should ideally only do one thing. If it ends up growing, it should be decomposed into smaller subcomponents.
