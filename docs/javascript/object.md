---
id: object
title: Object
---

[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

## 静态方法

`Object.assign(target, ...sources)` 复制一个或多个源对象的所有可枚举 own properties 到目标对象中，返回目标对象。目标对象如果和源对象有相同 key, 会覆盖掉目标对象的值。

```javascript
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```

`Object.create(proto, [propertiesObject])` 创建一个新对象，以 proto 作为它的 prototype

`Object.defineProperty(obj, prop, descriptor)` 定义对象 obj 的属性

```javascript
const object1 = {};

Object.defineProperty(object1, "property1", {
  value: 42,
  writable: false
});

object1.property1 = 77;
// throws an error in strict mode

console.log(object1.property1);
// expected output: 42
```

`Object.defineProperties(obj, props)`

`Object.entries()` 返回键值对的迭代器

`Object.freeze(obj)` 冰冻一个对象，该对象不能被改变

`Object.fromEntries()` 将键值对列表转化为对象

`Object.getOwnPropertyDescriptor()` 返回某个属性的 property descriptor

`Object.getOwnPropertyDescriptors()`

`Object.getOwnPropertyNames()`

`Object.getOwnPropertySymbols()`

`Object.getPrototypeOf()`

`Object.is(value1, value2)` 比 == 和 === 都要严格。

`Object.isExtensible()` An object can be marked as non-extensible using Object.preventExtensions(),
Object.seal(), or Object.freeze().

`Object.isFrozen()`

`Object.isSealed()`

`Object.keys()`

`Object.values()`

`Object.preventExtensions()`

`Object.seal()` seals an object, preventing new properties from being added to it and marking all
existing properties as non-configurable. Values of present properties can still be changed as
long as they are writable.

`Object.setPrototypeOf()`
