---
id: array
title: Array
---

[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

数组只能以数字作为索引。因为数组也是 object，所以数组也可以有属性，但是属性和索引是分开的。数组迭代忽略属性，只关注索引。

## 常规操作

```javascript
// Create Array
const fruits = ["Apple", "Orange"];

// access Array item
const first = fruits[0];
// Apple
const last = fruits[fruits.length - 1];
// Orange

// Loop over Array
fruits.forEach((item, index, array) => {
  console.log(index, " ", item);
});
// 0 Apple
// 1 Orange

// Add to end of Array
fruits.push("Banana");
// ['Apple', 'Orange', 'Banana']

// Remove from end of Array
fruits.pop();
// ['Apple', 'Orange']

// Remove from front of Array
fruits.shift();
// ['Orange']

// Add to front of Array
fruits.unShift("Apple");
// ['Apple', 'Orange']

// Find index if item in Array
const position = fruits.indexOf("Apple");
// 0

// Remove item by index position
fruits.splice(position, 1);
// ['Orange']

// Remove items from an index position
const numbers = [0, 1, 2, 3, 4, 5];
const [position, n] = [3, 2];
const removedNumbers = numbers.splice(position, n);
console.log(numbers);
// [0, 1, 2, 5]
console.log(removedNumbers);
// [3, 4]

// Copy Array
const shallowCopy = fruits.slice();
// or
const shallowCopy2 = [...fruits];
```

## 获取数组元素

对数组索引隐式调用`toString()`，然后获取元素，所以 `[1]` 相当于 `["1"]`

```javascript
const years = [2019, 2020];
years[0] === years["0"]; // true
years["1"] !== years["01"]; // true
```

## length 和 数值属性

数组长度和数值属性相关，长度不一定等于数值属性的个数，因为数组里可能存在“断点”。

```javascript
const a = [0, 1];
a[5] = 5;
// 3 numberical properties
console.log(a.length);
// length is 6
```

## Array 静态方法

`Array.from(arrayLike[, mapFn[, thisArg]])` : 给定一个类似数组的或可迭代的对象，创建一个新数组。

类似数组的对象： 有 length 属性和可索引元素的对象，比如字符串，函数参数 arguments, {length: 5}。

可迭代对象： 可以 get 到它的元素的对象，比如 Map 和 Set。

```javascript
const a = Array.from("apple");
// ['a', 'p', 'p', 'l', 'e']
const b = Array.from("abc", x => x.toUppercase());
// ['A', 'B', 'C']
const c = Array.from({ length: 5 }, (v, i) => i);
// [0,1,2,3,4]
```

利用 Array.from()构建一个 Sequence generator

```javascript
// Sequence generator function (commonly referred to as "range", e.g. Clojure, PHP etc)
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

// Generate numbers range 0..4
range(0, 4, 1);
// [0, 1, 2, 3, 4]

// Generate numbers range 1..10 with step of 2
range(1, 10, 2);
// [1, 3, 5, 7, 9]

// Generate the alphabet using Array.from making use of it being ordered as a sequence
range("A".charCodeAt(0), "Z".charCodeAt(0), 1).map(x => String.fromCharCode(x));
// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q",
// "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
```

`Array.isArray()` : 判断给定参数是否是数组。

`Array.of()` : 给定不定数量的参数，创建一个新数组。

```javascript
const a = Array.of(1, "apple", true, [1, 2]);
// [1, 'apple', true, [1, 2]]
```

## 实例方法

数组实例继承自 Array.prototype 。

### Mutator methods 改变数组的方法

`arr.copyWithin(target[, start[, end]])` : 浅复制数组内的部分元素，到同一数组的另一位置，返回该数组，会改变原数组，但不改变它的长度。The copyWithin works like C and C++'s memmove, and is a high-performance method to shift the data of an Array.

```javascript
const array1 = ["a", "b", "c", "d", "e"];

// copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// expected output: Array ["d", "b", "c", "d", "e"]

// copy to index 1 all elements from index 3 to the end
console.log(array1.copyWithin(1, 3));
// expected output: Array ["d", "d", "e", "d", "e"]
```

`arr.fill(value[, start[, end]])` : 从 start 到 end, 替换成 value, 返回改变后的数组。

```javascript
const array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]

// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]

console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]
```

`arr.pop()`

`arr.push(element1[, ...[, elementN]])`

`arr.shift()`

`arr.unshift(element1[, ...[, elementN]])`

`arr.reverse()`

`arr.sort((firstEl, secondEl): boolean)`

`arr.splice(start[, deleteCount[, item1[, item2[, ...]]]])`

### Accessor methods 不改变数组

`arr.concat()` 合并多个数组

语法： `const new_array = old_array.concat([value1[, value2[, ...[, valueN]]]])`

`arr.includes(valueToFind[, fromIndex])` 判断数组是否含有某个值

`arr.indexOf(searchElement[, fromIndex])` 未找到则返回-1

`arr.join([separator])` 合并数组，以 separator 连接

`arr.lastIndexOf(searchElement[, fromIndex])`

`arr.slice([begin[, end]])`

`arr.toString()` 元素调用 toString(), 然后用逗号连接成字符串

`arr.toLocaleString()`

### Iteration methods

`arr.entries()` 返回一个新的数组迭代器对象，它包含了所有的键值对

```javascript
const array1 = ["a", "b", "c"];

const iterator1 = array1.entries();

console.log(iterator1.next().value);
// expected output: Array [0, "a"]

console.log(iterator1.next().value);
// expected output: Array [1, "b"]

// Iteration with index and element
const a = ["a", "b", "c"];
for (const [index, element] of a.entries()) {
  console.log(index, element);
}

// 0 'a'
// 1 'b'
// 2 'c'

// Using a for...of loop
var a = ["a", "b", "c"];
for (let e of a.entries()) {
  console.log(e);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
```

`arr.every(callback(element[, index[, array]])[, thisArg])` 测试是否每个元素都通过测试

`arr.filter(callback(element[, index[, array]])[, thisArg])` 创建一个新数组，它的元素为所有通过测试的元素

`arr.find(callback(element[, index[, array]])[, thisArg])` 返回第一个通过测试的元素

`arr.findIndex(callback(element[, index[, array]])[, thisArg])` 返回第一个通过测试的元素索引，都不能通过测试则返回-1

`arr.forEach(callback(currentValue [, index [, array]])[, thisArg])` 对每一个元素，执行一次回调函数，不能通过抛出错误来终止执行

`arr.keys()` 返回一个新的数组迭代器对象，它包含数组的每个索引

`arr.map()` 创建一个新数组，每个元素 都是原数组元素执行一个回调函数的结果

`arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])` 对数组里的每个元素执行 reducer 函数，最终返回一个值

```javascript
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

`arr.reduceRight()` 与 `arr.reduce()` 反序

`arr.some()` 返回 true，当至少有一个元素通过测试。对用空数组，返回 false

`arr.values()` 返回一个新的数组迭代器，它包含了数组的所有元素

`arr.flat([depth])` 将子数组元素提升到一级，按提供的深度参数递归

`arr.flatMap()` 相当于 flat(深度为 1) 之后再调用 map
