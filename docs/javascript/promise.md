---
id: promise
title: Promise
---

## 语法

`new Promise(executor)`

`executor` 函数有两个参数（resolve 函数和 reject 函数），它执行一些异步操作，完成时执行 resolve 函数，失败时执行 reject 函数，如果它执行时抛出错误，也执行 reject 函数。

## 概念

Promise 对象是一个占位符(placeholder)，用来代表一个异步操作的最终结果。

Promise 对象有三种可能的状态，

- `pending` 初始状态
- `fulfilled` 遇到 promise.then(f), f 被添加到微任务队列里
- `rejected` 遇到 promise.then(f, r), r 被添加到微任务队列里

如果一个 Promise 对象不处于`pending`状态，我们就称它已经 settled。

当 promise 进入 settled 状态时，`promise.then()` 绑定的回调函数将会依序被调用。即使在 promise 已经 settled 的情况下，继续给`promise.then()`绑定回调函数，这些函数还是会被调用（异步微任务），因此异步操作完成和回调函数绑定不存在竞争条件。`promise.then()` 、`promise.finally()` 和 `promise.catch()` 都会返回新的 promise, 因此他们可以连起来用。

![promises](/img/promises.png)

## 静态方法

`Promise.all(iterable)` 等待所有 promises 都 resolve，或者任一个 reject。如果都 resolve，返回包含所有 resolved values 的数组。否则，以第一个 reject 的 promise 为准 reject。

`Promise.allSettled(iterable)` 等待所有 promises 都 settled

`Promise.race(iterable)` 等待最先 settled 的那个 promise

`Promise.reject(reason)` 返回一个以 reason reject 的 promise

`Promise.resolve(value)` 返回一个以 value resolve 的 promise，如果 value 是一个 promise，那么返回的 promise 会追随这个 promise 的“一举一动”。通常，如果你不知道 value 是否是一个 promise，那么就可以用这个方法将它包装成一个 promise。

##　实例方法

`promise.catch()` 给 promise 追加一个 rejection 函数，返回一个新的 promise，这个 promise 以该函数的返回值作为 resolve 值（如果原 promise 进入 rejected 状态的话），或者跟随原 promise 的 resolve 值（如果原来的 promise 进入 fulfilled 状态的话）

`promise.then()` 给 promise 添加 fulfillment 和 rejecttion 函数，如果这两个函数任一个被调用了，返回一个新的 promise（以被调用函数的返回值为 resolve 值），否则返回的 promise 跟随原来的 promise。

`promise.finally()` 给 promise 添加一个处理函数，无论 fulfilled 还是 rejected 都会被调用，但是这个函数并不以 resolve 值或者 reject 值作为参数，返回一个 promise 跟随原来的 promise。

无论是 catch、then 还是 finally，如果给定的处理函数没有被调用，那么返回的 promise 就会跟随原来的 promise，否则返回的 promise 的 resolve 值会是处理函数的返回值。一个 promise 跟随另一个 promise 的意思是指一个 promise 总是在另一个 promise resolve 的时候跟着 resolve，reject 的时候跟着 reject。另外，promise 链中一旦调用过处理函数，后续的 promise 就只能添加 resolve 处理函数，因为后续的 promise 只能 resolve 到第一个被调用的处理函数的返回值。也正因为如此，catch 只能用一次，后续再用也无效。

## promise 链

```javascript
Promise.resolve('resolved')
  .then(function (result) {
    const newResult = getNewResult(result);
    return newResult;
  })
  .then(function (newResult) {
    const finalResult = getFinalResult(newResult);
    return finalResult;
  })
  .then(function (finalResult) {
    console.log('Got the final result: ' + finalResult);
  })
  .catch(failureCallback);
```

## promise 要点

1. promise 的处理函数总是在当前 event loop 流程执行完毕之后才会执行。

2. 即使 promise 已经 resolve 或者 reject，此时用 then()添加处理函数，这些函数也会执行，但是像上一条所描述的那样，它们会在下次 event loop 流程中执行。

3. 通过多次调用 then()添加多个处理函数，这些函数会按照它们添加的顺序依次执行。

4. 当 resolve()的参数是当前 promise，抛出类型错误。当参数是另一个 promise（准确地说是一个实现了 then 方法的对象），会在这个 promise 的 then 处理函数里调用当前 promise 对象的 resolve()。

## Promise reject 事件

当 promise reject 的时候，以下两个事件之一会被发送到全局作用域(window)。`rejectionhandled`, `unhandledrejection`。如果对它们绑定监听函数，监听函数也是作为微任务在下一轮事件循环开头执行的。

## promise 和微任务

```javascript
customElement.prototype.getData = url => {
  if (this.cache[url]) {
    queueMicrotask(() => {
      this.data = this.cache[url];
      this.dispatchEvent(new Event("load"));
    });
  } else {
    fetch(url).then(result => result.arrayBuffer()).then(data => {
      this.cache[url] = data;
      this.data = data;
      this.dispatchEvent(new Event("load"));
    )};
  }
};
```

promise 的处理函数会作为微任务执行，用 queueMicrotask()也可以将代码打包成微任务，这样两种情况下代码的执行时机就相同了。

## 错误用法

1. 没有将 promises 连接起来

2. 不必要的嵌套

3. 没有用 catch()结束 promise 链条

```javascript
/ Bad example! Spot 3 mistakes!

doSomething().then(function(result) {
  doSomethingElse(result) // Forgot to return promise from inner chain + unnecessary nesting
  .then(newResult => doThirdThing(newResult));
}).then(() => doFourthThing());
// Forgot to terminate chain with a catch!

// good rules
doSomething()
.then(function(result) {
  return doSomethingElse(result);
})
.then(newResult => doThirdThing(newResult))
.then(() => doFourthThing())
.catch(error => console.error(error));
```

## 调用时机

传递给 then()的处理函数不会被同步调用，即使 promise 已经 resolve 过了。

```javascript
Promise.resolve().then(() => console.log(2));
console.log(1); // 1, 2

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
wait().then(() => console.log(4));
Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));
console.log(1); // 1, 2, 3, 4
```

### 自定义 promise 实现

```javascript
class CustomPromise {
  constructor(executor) {
    this.state = 'pending';
    this.result = undefined;
    this.rejectHandlers = [];
    this.fullfilHandlers = [];
    this.alreadyResolved = false;
    executor(this.resolve, this.reject);
  }

  resolve = (resolution) => {
    if (promise.alreadyResolved === true) {
      return;
    }
    promise.alreadyResolved = true;
    if (resolution === promise) {
      const reason = new TypeError("can't resolve self");
      return promise.rejectPromise(reason);
    }
    return promise.fullfilPromise(resolution);
  };

  reject = (reason) => {
    if (promise.alreadyResolved === true) {
      return;
    }
    promise.alreadyResolved = true;
    return promise.rejectPromise(reason);
  };

  rejectPromise(reason) {
    if (this.state !== 'pending') {
      return;
    }
    const handlers = this.rejectHandlers;
    this.result = reason;
    this.fullfilHandlers = undefined;
    this.rejectHandlers = undefined;
    this.state = 'rejected';
    this.triggerPromiseHandlers(handlers, reason);
  }

  fullfilPromise(value) {
    if (this.state !== 'pending') {
      return;
    }
    const handlers = this.fullfilHandlers;
    this.result = value;
    this.fullfilHandlers = undefined;
    this.rejectHandlers = undefined;
    this.state = 'fullfiled';
    this.triggerPromiseHandlers(handlers, value);
  }

  triggerPromiseHandlers(handlers, reason) {
    for (const handler of handlers) {
      queueMicrotask(function () {
        handler(reason);
      });
    }
  }

  then(onFullfiled, onRejected) {
    if (this.state === 'pending') {
      // if it is function
      if (onFullfiled) {
        this.fullfilHandlers.push(onFullfiled);
      }
      if (onRejected) {
        this.rejectHandlers.push(onRejected);
      }
    } else if (this.state === 'fullfiled') {
      const value = this.result;
      queueMicrotask(function () {
        onFullfiled(value);
      });
    } else if (this.state === 'rejected') {
      const reason = this.result;
      queueMicrotask(function () {
        onRejected(reason);
      });
    }
  }
}
```
