---
id: string
title: String
---

[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

## Long literal string 长字符串

```javascript
let longString =
  "This is a very long string which needs " +
  "to wrap across multiple lines because " +
  "otherwise my code is unreadable.";

let longString =
  "This is a very long string which needs \
to wrap across multiple lines because \
otherwise my code is unreadable.";
```

## Character access

```javascript
return "cat".charAt(1);

return "cat"[1];
```

## string primitives and String objects

两者有不同之处

```javascript
// primitive strings
cons a = '11';
const b = String('11');

// string object
const c = new String('11');

const s1 = '2 + 2';             // creates a string primitive
const s2 = new String('2 + 2'); // creates a String object
console.log(eval(s1));        // returns the number 4
console.log(eval(s2));        // returns the string "2 + 2"

console.log(eval(s2.valueOf())); // returns the number 4
```

##　静态方法

`String.fromCharCode(...codes)` 返回由指定的 UTF-16 代码单元序列创建的字符串。

`String.fromCodePoint(...points)` 返回使用指定的代码点序列创建的字符串。

## 实例方法

`str.charAt(index)` 从一个字符串中返回指定的字符。

`str.charCodeAt(index)`

`str.codePointAt(index)`

`str.concat()`

`str.includes()`

`str.endsWith()`

`str.indexOf()`

`str.lastIndexOf()`

`str.localeCompare()`

`str.match()` 返回 str 的匹配结果（数组）

```javascript
const paragraph = "The quick brown fox jumps over the lazy dog. It barked.";
const regex = /[A-Z]/g;
const found = paragraph.match(regex);

console.log(found);
// expected output: Array ["T", "I"]
```

`str.matchAll()` 返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

```javascript
let regexp = /t(e)(st(\d?))/g;
let str = "test1test2";

let array = [...str.matchAll(regexp)];

console.log(array[0]);
// expected output: Array ["test1", "e", "st1", "1"]

console.log(array[1]);
// expected output: Array ["test2", "e", "st2", "2"]
```

`str.normalize()`

`str.padEnd(targetLength [, padString])` 会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。

```javascript
"abc".padEnd(10); // "abc       "
"abc".padEnd(10, "foo"); // "abcfoofoof"
"abc".padEnd(6, "123456"); // "abc123"
"abc".padEnd(1); // "abc"
```

`str.padStart()`

`str.repeat(count)` 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

`str.replace(regexp|substr, newSubstr|function)` 返回一个由替换值（replacement）替换一些或所有匹配的模式（pattern）后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。如果 pattern 是 substr, 那么只会替换第一处 [String.prototype.replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

`str.search(regexp)` 执行正则表达式和 String 对象之间的一个搜索匹配。成功则返回首次出现的索引，否则返回-1

`str.slice(start[, end])`

`str.split(separator[, limit])`

`str.startsWith()`

`str.substring(start[, end])` The substring() method swaps its two arguments if indexStart is greater than indexEnd, meaning that a string is still returned. The slice() method returns an empty string if this is the case.

`str.toLocaleLowerCase()`

`str.toLocaleUpperCase()`

`str.toLowerCase()`

`str.toString()`

`str.toUpperCase()`

`str.trim()` removes whitespace from both ends of a string. Whitespace in this context is all the whitespace characters (space, tab, no-break space, etc.) and all the line terminator characters (LF, CR, etc.).

`str.trimStart()` `str.trimLeft()`

`str.trimEnd()` `str.trimRight()`

`str.valueOf()` Returns the primitive value of the specified object.
