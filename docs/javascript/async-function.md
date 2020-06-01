---
id: async-function
title: Async Function
---

[async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

The async function declaration defines an asynchronous function — a function that returns an `AsyncFunction` object. Asynchronous functions operate in a separate order than the rest of the code via the `event loop`, returning an implicit `Promise` as its result. But the syntax and structure of code using async functions looks like standard synchronous functions.

## Description

An async function can contain an `await` expression that pauses the execution of the async function to wait for the passed Promise's resolution, then resumes the async function's execution and evaluates as the resolved value.

The await keyword is only valid inside async functions. If you use it outside of an async function's body, you will get a `SyntaxError`.

While the async function is paused, the calling function continues running (having received the implicit Promise returned by the async function).

The purpose of `async/await` is to simplify using promises synchronously, and to perform some behavior on a group of Promises. As Promises are similar to structured callbacks, `async/await` is similar to combining generators and promises.

## Return await promiseValue; vs. return promiseValue

The implicit wrapping of return values in `Promise.resolve` does not imply that return `await promiseValue`; is functionally equivalent to return promiseValue;

Consider the following rewrite of the above code, that returns null if `processDataInWorker` rejects with an error:

```javascript
async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url);
  } catch (e) {
    v = await downloadFallbackData(url);
  }
  try {
    return await processDataInWorker(v); // Note the `return await` vs. just `return`
  } catch (e) {
    return null;
  }
}
```

Writing `return processDataInWorker(v)`; would have caused the `Promise` returned by the function to reject, instead of resolving to `null` if `processDataInWorker(v)` rejects.

This highlights the subtle difference between `return foo`; and `return await foo`; — `return foo`; immediately returns foo and never throws, even if foo is a promise and rejects. `return await foo`; will wait for foo to resolve or reject if it's a promise, and throws before returning if it rejects.
