---
id: async-function
title: Async Function
---

async 关键字定义异步函数(`AsyncFunction`)。异步函数内部肯可以使用 await 关键字。async 和 await 关键字允许我们写更简洁的代码实现以 promise 为基础的异步操作，而不用显式编写 promise 链。

## 描述

异步函数内，await 表达式暂停函数执行，等待目标 promise resolve，然后接受 resolve 值，await 表示式执行完毕，函数继续往下执行。当异步函数暂停时，调用异步函数的外部函数会继续执行（异步函数会隐式地返回一个 promise，外部函数？？？）。使用异步函数的目的是以同步代码的形式写 promise，以及对一组 promise 执行操作。`async/await`类似于合并使用生成器和 promise。

## 要点

1. 调用异步函数会返回 promise，当返回的值不是 promise 的时候，它会自动被 promise 化。

```javascript
async function getName() {
  const name = await 'mirror-riddle';
  return name;
  // 相当于 return Promise.resolve(name);
}
```

2. 异步函数内，在第一个 await 表达式之前的代码是同步执行的，之后的代码可以被视为存在于.then()回调中。

```javascript
async function foo() {
  await 1;
  return 2;
  // value is 1
  // 相当于 return Promise.resolve(1).then((value) => 2);
}

async function getName() {
  const name = await 'mirror-riddle';
  return name;
  // name is 'mirror-riddle'
  // 相当于 return Promise.resolve('mirror-riddle').then((name) => name);
}

async function foobar() {
  const prefix = await 'foo';
  const subfix = await 'bar';
  return prefix + subfix;
  // prefix is 'foo', subfix is 'bar'
  // 相当于 return Promise.resolve('foo').then((prefix) =>
  // Promise.resolve('bar').then((subfix) => prefix + subfix)).
}
```

## return await VS return

```javascript
async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url);
  } catch (e) {
    v = await downloadFallbackData(url);
  }
  try {
    // Note the return await vs. just return
    // return processDateInWorker(v);
    return await processDataInWorker(v);
  } catch (e) {
    return null;
  }
}
```

如果 processDateInWorker(v) reject 的话，return processDataInWorker(v) 会导致异步函数返回的 promise reject，而不是返回一个 resove 值为 null 的 promise。

return foo 和 return await foo 的区别:

- return foo 立即返回 foo，即使 foo 是一个 promise 并且 reject 了，也不会抛出错误。
- return await foo 会等待 foo reject 或者 resolve，并且在 reject 的情况下，在返回之前就会抛出错误。
