---
id: this
title: This
---

大多数情况下，函数内 this 的值取决于函数是如何被调用的。不能在函数执行时重新给 this 赋值，同时每次函数被调用 this 的值也可能不一样。`bind()`方法可以给函数绑定 this，使 this 的值与函数如何被调用无关。箭头函数没有自己的 this 绑定，其内部的 this 指向上层语义上下文的 this。

### 全局上下文

在全局上下文中（不在任何函数中），this 指向全局对象。无论代码在哪个执行上下文中运行，都可以用`globalThis`访问全局对象。

```javascript
// In web browsers, the window object is also the global object:
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = 'MDN';
console.log(window.b); // "MDN"
console.log(b); // "MDN"
```

### 函数上下文

在函数内部，this 的值取决于函数如何被调用。

非严格模式下，`this`指代全局对象，在浏览器里就是 `window`

```javascript
function f1() {
  return this;
}

// In a browser:
f1() === window; // true

// In Node:
f1() === global; // true
```

严格模式下，如果函数执行上下文没有设置`this`的话，`this`等于`undefined`。

```javascript
function f2() {
  'use strict'; // see strict mode
  return this;
}

f2() === undefined; // true
```

可以用`call()`, `apply()`,在调用函数时设置`this`。

```javascript
// An object can be passed as the first argument to call or apply and this will be bound to it.
var obj = { a: 'Custom' };

// This property is set on the global object
var a = 'Global';

function whatsThis() {
  return this.a; // The value of this is dependent on how the function is called
}

whatsThis(); // 'Global'
whatsThis.call(obj); // 'Custom'
whatsThis.apply(obj); // 'Custom'

function add(c, d) {
  return this.a + this.b + c + d;
}

var o = { a: 1, b: 3 };

// The first parameter is the object to use as
// 'this', subsequent parameters are passed as
// arguments in the function call
add.call(o, 5, 7); // 16

// The first parameter is the object to use as
// 'this', the second is an array whose
// members are used as the arguments in the function call
add.apply(o, [10, 20]); // 34
```

### bind()

调用 `f.bind(someObject)` 会返回一个新函数，这个函数的函数体和作用域和 f 相同，但是 this 永久地和 someObject 绑定。

```javascript
function f() {
  return this.a;
}

var g = f.bind({ a: 'azerty' });
console.log(g()); // azerty

var h = g.bind({ a: 'yoo' }); // bind only works once!
console.log(h()); // azerty

var o = { a: 37, f: f, g: g, h: h };
console.log(o.a, o.f(), o.g(), o.h()); // 37,37, azerty, azerty
```

### 箭头函数

箭头函数内，this 指向包含该函数的语义上下文(lexical context)的 this。如果箭头函数处在全局环境下，this 就是全局对象(global object)。

```javascript
var globalObject = this;
var foo = () => this;
console.log(foo() === globalObject); // true
```

call(), apply(), bind()不会改变箭头函数的 this。

```javascript
// Call as a method of an object
var obj = { func: foo };
console.log(obj.func() === globalObject); // true

// Attempt to set this using call
console.log(foo.call(obj) === globalObject); // true

// Attempt to set this using bind
foo = foo.bind(obj);
console.log(foo() === globalObject); // true
```

如果箭头函数是在另一个普通函数中创建的，那么它的 this 指向的就是外层函数的 this。

```javascript
// Create obj with a method bar that returns a function that
// returns its this. The returned function is created as
// an arrow function, so its this is permanently bound to the
// this of its enclosing function. The value of bar can be set
// in the call, which in turn sets the value of the
// returned function.
var obj = {
  bar: function () {
    var x = () => this;
    return x;
  },
};

// Call bar as a method of obj, setting its this to obj
// Assign a reference to the returned function to fn
var fn = obj.bar();

// Call fn without setting this, would normally default
// to the global object or undefined in strict mode
console.log(fn() === obj); // true

// But caution if you reference the method of obj without calling it
var fn2 = obj.bar;
// Calling the arrow function's this from inside the bar method()
// will now return window, because it follows the this from fn2.
console.log(fn2()() == window); // true
```

### 对象方法

当函数作为一个对象的方法被调用时，this 指向该对象。

```javascript
var o = {
  prop: 37,
  f: function () {
    return this.prop;
  },
};

console.log(o.f()); // 37
```

### 事件监听函数

在元素的事件监听函数内，this 指向该元素(对于普通函数而言)。如果监听函数是箭头函数，那么 this 就取决于语义环境了。

```javascript
const nav = document.querySelector('.nav');
nav.addEventListener(
  'click',
  function () {
    console.log(this); // nav element
  },
  false
);

nav.addEventListener('load', () => {
  console.log(this); // window
});
```

### 异步代码

异步代码执行的环境和它的语义环境是不一样的，所以 this 的值也是要变的。

```javascript
document.body.addEventListener('click', function () {
  setTimeout(function () {
    console.log(this); // window
  });
});
```
