---
id: promise-async-programming
title: Promise Async Programming
---

### 异步编程

- JS 引擎是建立在单线程事件循环(single-threaded event loop)这一概念上的。单线程意味着一次只能执行一块代码，所以 JS 引擎需要负责追踪将要执行的代码块。
- 上述代码块保存在工作队列(job queue)里，当一块代码准备好要执行的时候，它就会被放进工作队列里。当 JS 引擎完成执行代码块后，事件循环(event loop)会接着执行工作队列里的下一个代码块。
- 事件循环是 JS 引擎内的一个进程，用于监控代码执行和管理工作队列。
- 工作队列遵循先进先出原则。

### 事件模型

在浏览器里，当某个事件触发时，把对应的事件处理函数推入到工作队列中，这是 JS 中最基本的异步编程模型。缺点是在绑定事件处理函数之前，触发事件不会执行处理函数。

```javascript
const button = document.querySelector('#btn');
button.onClick = function (event) {
  console.log(event.target); // button itself
};
```

### 回调模式

在 Node.js 中，通过给异步操作传递回调函数来实现异步编程。回调函数里还可以继续用回调，嵌套太多回调函数，最后就造成了回调地狱。

```javascript
readFile('example.txt', function (err, contents) {
  if (err) {
    throw err;
  }
  console.log(contents);
});
```

### promise

- promise 最开始处于 pending 状态，如果 promise 得到 resolve，就进入 fullfiled 状态，如果 promise 被 reject，就进入 rejected 状态。
- 我们不能访问 promise 当前的状态，但是可以通过 then()方法在 promise 状态改变的时候进行相应操作。then()方法接受两个函数参数，前一个在 promise 进入 fullfiled 状态时调用，后一个在 promise 进入 rejected 状态时调用。
- then()和 catch()被调用时，会创建一个新的 job，该任务在 promise resolve 或 reject 的时候被推入一个 promise 专有的工作队列中。
- 一个实现了 then() 方法的对象叫做 thenable, promise 都是 thenable, thenable 不是 promise。
- Promise.reject() 和 Promise.resolve() 的参数是 promise 的时候，原封不动地返回该 promise；如果参数是 thenable, 那么会把原来 promise 的 resolve, reject 参数传递给 thenable.then()，于是原来原来的 promise 要在 thenable resolve 或 reject 之后才会得到处理。

  ```javascript
  const thenable = {
    then(resolve, reject) {
      resolve(1);
    },
  };
  const promise = Promise.resolve(thenable);
  // 相当于
  const promise = new Promise((resolve) => {
    queueMicroTask(() => {
      thenable.then(resolve);
    });
  });
  ```

### 总结

- Promises are designed to improve asynchronous programming in JavaScript by giving you more control and composability over asynchronous opera- tions than events and callbacks can.

- Promises schedule jobs to be added to the JavaScript engine’s job queue for future execution, and a second job queue tracks promise fulfillment and rejection handlers to ensure proper execution.

- Promises have three states: pending, fulfilled, and rejected. A promise starts in a pending state and becomes fulfilled on a successful execution or rejected on a failure. In either case, you can add handlers to indicate when a promise is settled. The then() method allows you to assign a fulfillment and rejection handler, and the catch() method allows you to assign only a rejection handler.

- You can chain promises together in a variety of ways and pass information between them. Each call to then() creates and returns a new promise that is resolved when the previous one is resolved. Such chains can be used to trigger responses to a series of asynchronous events. You can also use Promise.race() and Promise.all() to monitor the progress of multiple prom- ises and respond accordingly.

- Asynchronous task running is easier when you combine generators and promises, because promises provide a common interface that asynchronous operations can return. You can then use generators and the yield operator to wait for asynchronous responses and respond appropriately.

- Most new web APIs are being built on top of promises, and you can expect many more to follow suit in the future.
