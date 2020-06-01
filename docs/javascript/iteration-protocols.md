---
id: iteration-protocols
title: Iteration Protocels
---

[Iteration Protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

## Iterable protocol

The iterable protocol allows JavaScript objects to define or customize their iteration behavior, such as what values are looped over in a `for..of` construct. Some built-in types are `built-in iterables` with a default iteration behavior, such as `Array` or `Map`, while other types (such as Object) are not.

In order to be iterable, an object must implement the `@@iterator` method, meaning that the object (or one of the objects up its `prototype chain`) must have a property with a `@@iterator` key which is available via constant `Symbol.iterator`:

Whenever an object needs to be iterated (such as at the beginning of a `for..of` loop), its `@@iterator` method is called with no arguments, and the returned iterator is used to obtain the values to be iterated.

## Iterator protocol

The `iterator` protocol defines a standard way to produce a sequence of values (either finite or infinite), and potentially a return value when all values have been generated.

An object is an iterator when it implements a next() method with the following semantics:

`const next = next()` The next method always has to return an object with appropriate properties including done and value. If a non-object value gets returned (such as false or undefined), a TypeError ("iterator.next() returned a non-object value") will be thrown.

`next.done` Has the value true if the iterator is past the end of the iterated sequence. In this case value optionally specifies the return value of the iterator. Has the value false if the iterator was able to produce the next value in the sequence. This is equivalent of not specifying the done property altogether.

`next.value` any JavaScript value returned by the iterator. Can be omitted when done is true.

It is not possible to know reflectively whether a particular object implements the iterator protocol, however it is easy to create an object that satisfies both the iterator and iterable protocols (as shown in the example below). Doing so allows an iterator to be consumed by the various syntaxes expecting iterables. Thus it is rarely desirable to implement the iterator protocol without also implementing iterable.

```javascript
const myIterator = {
  next: function() {
    // ...
  },
  [Symbol.iterator]: function() {
    return this;
  }
};
```

## Iterable Example

### Built-in iterables

`String`, `Array`, `TypedArray`, `Map` and `Set` are built-in iterable, because each of their prototype objects
implements an `@@iterator` method.

```javascript
const myIterable = {};
myIterable[Symbol.iterator] = function*() {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable]; // [1, 2, 3]
```
