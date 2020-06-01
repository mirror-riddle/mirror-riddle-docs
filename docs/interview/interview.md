---
id: interview
title: interview
---

## HTML

## CSS

1. 动画 animation, transition

2. 布局 flex, grid, box model

3. 居中方案

## JavaScript

1. 异步 XMLHttpRequest, Fetch, Promise, Observer

   Promise 可以串联，只要 then()返回一个新的 promise。

   async await 相当于同步的 promise，返回的是 promise resolve 的结果。

2. 事件 Event, CustomEvent, EventTarget, dispatchEvent()

   Event()参数，bubbles 决定是否可以冒泡，cancelable 决定是否可以取消，对不可取消的事件 preventDefault()无效。

   CustomEvent() 和 Event()不同的地方是，它可以携带自定义信息 `new CustomEvent('bind', {detail: ele.dataset.time})`。

   绑定监听器有两种方式，一种是 addEventListener(), 一种是设定元素的 onevent handler。

   EventTarget 对象可以添加监听器，移除监听器，派发事件。

   addEventListener() 第三个参数可以是个 option 对象，capture 决定是否首先执行本监听器，passive 决定监听器是否不会调用 preventDefault(),
   once 决定监听器是否只执行一次就立即移除。如果第三个参数是布尔值的话，那么就单单指 capture。

   dispatchEvent()会同步触发所有相关的事件监听器，之后会返回事件是否被取消。这和原生 event 不一样。

   DOM 树中事件的传播由事件 bubble 和 capture 决定，先从上到下遍历 capture 为 true 的监听器，然后到 eventTarget 的监听器，最后
   从下到上 bubble。

   preventDefault()，对于可取消的事件有效。

   stopPropagation(), 停止事件继续传播，不只是停止 bubble，如果是在 CAPTURING_PARSE 模式下，eventTarget 都不会接收到事件。

   stopImmediatePropagation()，比上面更严格，连同级的监听器也不能接收事件。

   自己构造的事件叫做 synthetic events，与浏览器原生事件不一样。

3. 原型链 prototype, class, factory function

4. bind(), call(), apply()

   bind(thisArg, ...args)创建一个新函数，当调用它时，this 是绑定的 this, 默认参数是绑定的参数。

   call(thisArg, ...args)调用一个函数，this 是绑定的 this，参数是绑定的参数。

   apply(thisArg, arg[])同 call()，但是参数是参数数组。当一个函数接受多个参数，而你手头只有一个数组，那么就可以用 apply()直接传递这个数组给这个函数，效果相当于
   一个一个传递参数。在 es6 中可以用 spread 语法来简化这个过程。

   ```javascript
   array.push.apply(array, arguments);
   // or
   array.push(...arguments);
   ```

   call 和 apply 都是改变 this 的指向，区别只在于传参方式。bind 和它们的区别是 bind()返回一个绑定了 this 的函数，可以用于实现柯里化。

5. 变量提升问题（var 变量和函数声明）

   JavaScript 有全局、函数、块级执行环境之分，变量总是处于三者之一当中。当执行 JavaScript 代码时，会生成执行环境，分为两个步骤，第一步是创建阶段，
   JS 解释器会找出所有的变量名和函数名，并且在内存中给它们提前分配好空间，函数的话就把整个函数存入内存中，变量的话就把它们初始化为 undefined。第二步
   是代码执行阶段，可以提前使用变量和函数。

6. for 循环优化

   事先计算长度，复杂度 O[n+1]。貌似 JavaScript 对 for 循环有优化，第一次计算数组长度后，第二次就可以直接获取，所以就算写成每次都获取长度的 for 循环，
   性能影响也不会像想象中那么大。

   ```javascript
   for (let i = 0, len = list.length, item; i < len; i++) {
     item = list[i];
   }
   ```

   利用查询数组中不存在的索引会返回 undefined（false）的原理，以此作为判断条件。这种方法要求数组里不存在 false 类型的元素（undefined, null, 0 等）。
   时间复杂度为 O[n]。奇怪的是，如果数组元素都是相等的，这种方法的时间复杂度会大大增加，当数组元素各异时，复杂度相当低。

   ```javascript
   for (let i = 0, item; (item = list[i]); i++) {
     // item
   }
   ```

7. this

   当使用 new 关键字实例化构造函数时，this 绑定到实例，不可改变，优先级最高。
   当使用 call, apply, bind 改变 this 的指向，优先级次之。
   当函数是包含在一个对象里，由对象调用，this 指向这个对象，优先级次之。
   当函数是包含在一个上层函数里，this 指向上层函数的作用域，优先级最低。

8. async, await 区别于 promise

   优点是可以写更清晰简洁的代码，不用写成串的 then。缺点是 await 会阻塞代码，导致代码失去了并发性。因为后面的代码不一定依赖前面的结果。

9.

## HTTP

1. cookie

2. 缓存

3. 跨域

4. headers

## 浏览器

1. 工作原理 解析网页

2. task queue, microtask queue, event loop, js excution stack

   event loop 是用来协调事件、用户交互、脚本、渲染、网络等事务的。

   worker 和 window 分别有自己的 event loop。

   event loop 有一个或多个 task queue。 严格意义上说，任务队列是任务的集合，不是纯粹的队列。因为先推出来的任务是第一个可执行的任务，不一定是第一个任务。

   浏览器派发事件通常通过 task 完成，但是有些事件不经过 task queue，因为它们是由其他 task 直接派发的。 回调函数、异步获取资源、响应 DOM 变化（插入元素等）通过 task 完成。

   task 包含几部分，steps 表示 task 要执行的步骤；source 用来给相关的 task 分类；document 指与 task 相关的 Document，如果不是在 window 里（例如 worker），则为 null；还有 JavaScript 执行环境的设置

   如果 document 是 null 或者 fully active，task 才可以执行。A Document d is said to be fully active when d's browsing context is non-null, d's browsing context's active document is d, and either d's browsing context is a top-level browsing context, or d's container document is fully active.

   当 js stack 为空时，event loop 从 task queue 中取出最老的那个，推入 stack 执行，完毕之后再重复以上过程。

   event loop 有一个 microtask queue。microtask 是一个函数，在创建它的函数或程序结束之后，并且 JavaScript 执行 stack 为空时（刚刚执行完一个 task 或者还未执行任何 task，进行下一个 task 之前），把 microtask queue 里的 task 全部按序执行掉。

   microtask 和 task 的区别，每一次 loop 只执行一个 task，但是会把 microtask queue 里的 microtask 全部执行完；如果 microtask 创建了新的 microtask，那么这些新的 microtask 会在当前 loop 中执行（所以要注意避免无限循环）。Promise 和 MutationObserver API 都运用到了 microtask。

   使用 microtask 的目的是严格保持操作的顺序。

   if...else 语句中，如果一个同步，一个异步，那么和外部代码一起运行，多次输出顺序结果就会不一致。把同步的部分用 queueMicrotask()包一下，就可以化同步为异步。

   microtask 可以用来合并操作。

   ```javascript
   const messageQueue = [];

   let sendMessage = (message) => {
     messageQueue.push(message);

     if (messageQueue.length === 1) {
       queueMicrotask(() => {
         const json = JSON.stringify(messageQueue);
         messageQueue.length = 0;
         fetch('url-of-receiver', json);
       });
     }
   };
   ```
