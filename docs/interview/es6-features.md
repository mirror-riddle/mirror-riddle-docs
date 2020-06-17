---
id: es6-features
title: es6特性
---

1. for...in 和 for...of

for...in 用于可枚举对象，会给出对象以及对象原型的属性, 可以使用 Object.keys(), Object.entries()将对象转化可迭代对象，再用 for...of

for...of 用于可迭代对象。属于 es6 特性

```javascript
for (const key in { a: 'va', b: 'vb' }) {
  // a, b
}

for (const item in [1, 2, 3]) {
  // 1,2,3
}
```

2. 迭代器和生成器

迭代器(iterator)是一个实现了 next()方法的对象，next()方法返回一个对象，包含 value 和 done 属性，value 此次迭代的返回值，done 是标志迭代器是否到达末端的标志。

```javascript
const createIterator = (items) => {
  var i = 0;
  return {
    next: () => {
      var done = i >= items.length;
      var value = !done ? items[i++] : undefined;
      return { done, value };
    },
    // 表明它是可迭代对象
    [Symbol.iterator]: function () {
      return this;
    },
  };
};

var iterator = createIterator([1, 2, 3]);

for (const item of iterator) {
  console.log(item);
}
```

生成器是一个返回迭代器的函数。

```javascript
const

```
