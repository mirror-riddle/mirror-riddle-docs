---
id: generator
title: Generator
---

[Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[function\*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

The Generator object is returned by a generator function and it conforms to both the iterable protocol and the iterator protocol.

## Syntax

```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen(); // "Generator { }"
```

## 实例方法

`generator.next(value)` Returns a value yielded by the yield expression.

The next() method returns an object with two properties done and value. You can also provide a parameter to the next method to send a value to the generator.

```javascript
// In this example, next is called with a value. Note that the
// first call did not log anything, because the generator was not
// yielding anything initially.
function* gen() {
  while (true) {
    var value = yield null;
    console.log(value);
  }
}

var g = gen();
g.next(1);
// "{ value: null, done: false }"
g.next(2);
// 2
// "{ value: null, done: false }"
```

`generator.return()` Returns the given value and finishes the generator.

`generator.throw()` Throws an error to a generator (also finishes the generator, unless caught from within that generator).

The throw() method resumes the execution of a generator by throwing an error into it and returns an object with two properties done and value.

```javascript
function* gen() {
  while (true) {
    try {
      yield 42;
    } catch (e) {
      console.log("Error caught!");
    }
  }
}

var g = gen();
g.next();
// { value: 42, done: false }
g.throw(new Error("Something went wrong"));
// "Error caught!"
// { value: 42, done: false }
```

## Desciption

Generators are functions which can be exited and later re-entered. Their context (variable bindings) will be saved across re-entrances.

Generators in JavaScript -- especially when combined with Promises -- are a very powerful tool for asynchronous programming as they mitigate -- if not entirely eliminate -- the problems with callbacks, such as [Callback Hell](http://callbackhell.com/) and [Inversion of Control](https://frontendmasters.com/courses/rethinking-async-js/callback-problems-inversion-of-control/).

Calling a generator function does not execute its body immediately; an iterator object for the function is returned instead. When the iterator's `next()` method is called, the generator function's body is executed until the first yield expression, which specifies the value to be returned from the iterator or, with `yield\*`, delegates to another generator function. The `next()` method returns an object with a value property containing the yielded value and a done property which indicates whether the generator has yielded its last value, as a boolean. Calling the `next()` method with an argument will resume the generator function execution, replacing the yield expression where execution was paused with the argument from `next()`.
