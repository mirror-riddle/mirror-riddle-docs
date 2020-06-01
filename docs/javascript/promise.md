---
id: promise
title: Promise
---

[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[Using Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.

## Syntax

`new Promise(executor)`

`executor` 函数有两个参数（resolve 函数和 reject 函数），它执行一些异步操作，完成时执行 resolve 函数，失败时执行 reject 函数，如果它执行时抛出错误，也执行 reject 函数。

## Description

Promise 让异步方法可以像同步方法返回值那样返回一个 promise，这个 promise 可以在未来的某个时间提供最终的返回值。

Promise States

`pending` 初始状态

`fulfilled` 操作成功

`rejected` 操作失败

`settled` 成功或者失败

当 promise 进入 settled 状态时，`promise.then` 绑定的回调函数将会依序被调用。即使在 promise 已经 settled 的情况下，继续给`promise.then`绑定回调函数，这些函数还是会被调用的，因此异步操作完成和回调函数绑定不存在竞争条件。

`promise.then()` 和 `promise.catch()` 都会返回 promise, 因此他们可以连起来用。

## 静态方法

`Promise.all(iterable)` 等待所有 promises 都 resolve，或者任一个 reject。如果都 resolve，返回包含所有 resolved values 的数组。否则，以第一个 reject 的 promise 为准 reject。

`Promise.allSettled(iterable)` 等待所有 promises 都 settled

`Promise.race(iterable)` 等待最先 settled 的那个 promise

`Promise.reject(reason)` 返回一个以 reason reject 的 promise

`Promise.resolve(value)` 返回一个以 value resolve 的 promise，如果 value 是一个 promise，那么返回的 promise 会追随这个 promise 的“一举一动”

##　实例方法

`promise.catch()` 给 promise 追加一个 rejection handler，and returns a new promise resolving to the return value of the callback if it is called, or to its original fulfillment value if the promise is instead fulfilled.

`promise.then()` Appends fulfillment and rejection handlers to the promise, and returns a new promise resolving to the return value of the called handler, or to its original settled value if the promise was not handled (i.e. if the relevant handler onFulfilled or onRejected is not a function).

`promise.finally()` Appends a handler to the promise, and returns a new promise which is resolved when the original promise is resolved. The handler is called when the promise is settled, whether fulfilled or rejected.

## Chaining

```javascript
doSomething()
  .then(function(result) {
    return doSomethingElse(result);
  })
  .then(function(newResult) {
    return doThirdThing(newResult);
  })
  .then(function(finalResult) {
    console.log("Got the final result: " + finalResult);
  })
  .catch(failureCallback);
```

## Guarantees

1. Callbacks will never be called before the completion of the current run of the JavaScript event loop.

2. Callbacks added with then() even after the success or failure of the asynchronous operation, will be called, as above.

3. Multiple callbacks may be added by calling then() several times. Each callback is executed one after another, in the order in which they were inserted.

## Promise rejection events

Whenever a promise is rejected, one of two events is sent to the global scope (generally, this is either the window or, if being used in a web worker, it's the Worker or other worker-based interface). The two events are:

`rejectionhandled`

`unhandledrejection`

## When promises and tasks collide

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

This balances the clauses by having both situations handle the setting of data and firing of the load event within a microtask (using queueMicrotask() in the if clause and using the promises used by fetch() in the else clause).

## Common mistakes

1. 没有将 promises 连接起来

2. 不必要的嵌套

3. 没有用 catch()结束 promise chain

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

## Timing

To avoid surprises, functions passed to then() will never be called synchronously, even with an already-resolved promise:

```javascript
Promise.resolve().then(() => console.log(2));
console.log(1); // 1, 2
```

Instead of running immediately, the passed-in function is put on a microtask queue, which means it runs later when the queue is emptied at the end of the current run of the JavaScript event loop, i.e. pretty soon:

```javascript
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait().then(() => console.log(4));
Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));
console.log(1); // 1, 2, 3, 4
```
