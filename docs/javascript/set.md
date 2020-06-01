---
id: set
title: Set
---

[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

The `Set` object lets you store unique values of any type, whether primitive values or object references.

`Set` objects are collections of values. You can iterate through the elements of a set in insertion order. A value in the Set may only occur once; it is unique in the Set's collection.

## Syntax

`new Set([iterable])`

`iterable` If an iterable object is passed, all of its elements will be added to the new Set. If you don't specify this parameter, or its value is null, the new Set is empty.

## Set instances

`Set.prototype.size` Returns the number of values in the Set object.

`set.add(value)` Appends a new element with the given value to the Set object. Returns the Set object.

`set.clear()` Removes all elements from the Set object.

`set.delete(value)` Removes the element associated to the value and returns the value that Set.prototype.has(value) would have previously returned. Set.prototype.has(value) will return false afterwards.

`set.entries()` Returns a new Iterator object that contains an array of [value, value] for each element in the Set object, in insertion order. This is kept similar to the Map object, so that each entry has the same value for its key and value here.

`set.forEach()` Calls callbackFn once for each value present in the Set object, in insertion order. If a thisArg parameter is provided to forEach, it will be used as the this value for each callback.

`set.has(value)` Returns a boolean asserting whether an element is present with the given value in the Set object or not.

`set.keys()` Is the same function as the values() function and returns a new Iterator object that contains the values for each element in the Set object in insertion order.

`set.values()` Returns a new Iterator object that contains the values for each element in the Set object in insertion order.
