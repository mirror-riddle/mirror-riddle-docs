---
id: array-improvement
title: Array Improvement
---

### Array.of(...items)

返回一个数组，形参依次序填入该数组。在这之前，需要用 new Array(1,2,3) 这样的形式，但是这种方式传给 Array()的参数如果只有一个的话，结果会有不同, 非常容易出错。

```javascript
new Array(2); // 创建长度为2的数组，元素为undefined

new Array('2'); // 创建长度为1的数组，第一个元素为'2'
```

### Array.from (items [ , mapfn [ , thisArg ] ])

接收一个可迭代对象，返回与之相应的数组。可以额外提供 mapfn 函数，对每个元素进行处理再返回。
在这之前，要完成同样的事情，要么用循环来创建新数组，要么用 Array.prototype.slice.call(arrayLike) 生成新数组，都不如 Array.from()优雅。

### Array.prototype.find(predicate [ , thisArg ])

predicate 是一个过滤函数，它的参数和 map() 函数一致，函数返回 true 表示找到了。find()可以用来寻找数组内满足某个条件的第一个元素，如果只是想寻找数组内的某个元素，应该用 indexOf() 或 lastIndexOf()。

### Array.prototype.findIndex(predicate [ , thisArg ])

参考 Array.prototype.find()

### Array.prototype.fill(value [ , start [ , end ] ])

将数组内指定区域的元素设置为 value，不指定区域的话，就是设置所有元素值为 value。

### Array.prototype.copyWithin(target, start [ , end ])

复制从 start 索引开始的数组元素, 从 target 索引处开始覆盖, end 表示复制到此处索引结束。

```javascript
const arr = [1, 2, 3, 4];
arr.copyWithin(2, 0); // [1, 2, 1, 2]
arr.copyWithin(2, 0, 1); // [1, 2, 1, 2]
```

### TypedArray
