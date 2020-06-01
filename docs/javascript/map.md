---
id: map
title: Map
---

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.

## Syntax

`new Map([iterable])`

`iterable` 数组或可迭代对象（元素是键值对）

## Object and Map

1. The keys of an Object are String and Symbol, whereas they can be any value for a Map, including functions, objects, and any primitive.

2. The keys in Map are ordered while keys added to object are not. Thus, when iterating over it, a Map object returns keys in order of insertion. (Note that in the ECMAScript 2015 spec objects do preserve creation order for string and Symbol keys, so traversal of an object with only string keys would yield the keys in order of insertion)

3. You can get the size of a Map easily with the size property, while the number of properties in an Object must be determined manually.

4. A Map is an iterable and can thus be directly iterated, whereas iterating over an Object requires obtaining its keys in some fashion and iterating over them.

5. An Object has a prototype, so there are default keys in the map that could collide with your keys if you're not careful. As of ES5 this can be bypassed by using Object.create(null), but this is seldom done.

6. A Map may perform better in scenarios involving frequent addition and removal of key pairs.

## Map instances

`Map.prototype.size` Returns the number of key/value pairs in the Map object.

`map.clear()` Removes all key/value pairs from the Map object.

`map.delete(key)` Returns true if an element in the Map object existed and has been removed, or false if the element does not exist. Map.prototype.has(key) will return false afterwards.

`map.entries()` Returns a new Iterator object that contains an array of [key, value] for each element in the Map object in insertion order.

`map.forEach()` Calls callbackFn once for each key-value pair present in the Map object, in insertion order. If a thisArg parameter is provided to forEach, it will be used as the this value for each callback.

`map.get(key)` Returns the value associated to the key, or undefined if there is none.

`map.has(key)` Returns a boolean asserting whether a value has been associated to the key in the Map object or not.

`map.keys()` Returns a new Iterator object that contains the keys for each element in the Map object in insertion order.

`map.set(key, value)` Sets the value for the key in the Map object. Returns the Map object.

`map.values()` Returns a new Iterator object that contains the values for each element in the Map object in insertion order.
