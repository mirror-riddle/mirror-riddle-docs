---
id: this
title: This
---

[this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

A function's `this` keyword behaves a little differently in JavaScript compared to other languages. It also has some differences between strict mode and non-strict mode.

In most cases, the value of `this` is determined by how a function is called (runtime binding). It can't be set by assignment during execution, and it may be different each time the function is called. ES5 introduced the `bind()` method to set the value of a function's this regardless of how it's called, and ES2015 introduced arrow functions which don't provide their own this binding (it retains the this value of the enclosing lexical context).

## Global context

In the global execution context (outside of any function), `this` refers to the global object whether in strict mode or not.

```javascript
// In web browsers, the window object is also the global object:
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b); // "MDN"
console.log(b); // "MDN"
```

You can always easily get the global object using the global `globalThis` property, regardless of the current context in which your code is running.

## Function context

Inside a function, the value of `this` depends on how the function is called.

### Simple call

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
  "use strict"; // see strict mode
  return this;
}

f2() === undefined; // true
```

可以用`call()`, `apply()`,在调用函数时设置`this`。

```javascript
// An object can be passed as the first argument to call or apply and this will be bound to it.
var obj = { a: "Custom" };

// This property is set on the global object
var a = "Global";

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

### The bind method

ECMAScript 5 introduced `Function.prototype.bind()`. Calling `f.bind(someObject)` creates a new function with the same body and scope as `f`, but where this occurs in the original function, in the new function it is **permanently** bound to the first argument of bind, regardless of how the function is being used.

```javascript
function f() {
  return this.a;
}

var g = f.bind({ a: "azerty" });
console.log(g()); // azerty

var h = g.bind({ a: "yoo" }); // bind only works once!
console.log(h()); // azerty

var o = { a: 37, f: f, g: g, h: h };
console.log(o.a, o.f(), o.g(), o.h()); // 37,37, azerty, azerty
```

### Arrow functions

In arrow functions, this retains the value of the enclosing lexical context's `this`. In global code, it will be set to the global object:

```javascript
var globalObject = this;
var foo = () => this;
console.log(foo() === globalObject); // true
```

if this arg is passed to call, bind, or apply on invocation of an arrow function it will be ignored. You can still prepend arguments to the call, but the first argument (thisArg) should be set to null.

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

No matter what, foo's this is set to what it was when it was created (in the example above, the global object). The same applies to arrow functions created inside other functions: their this remains that of the enclosing lexical context.

```javascript
// Create obj with a method bar that returns a function that
// returns its this. The returned function is created as
// an arrow function, so its this is permanently bound to the
// this of its enclosing function. The value of bar can be set
// in the call, which in turn sets the value of the
// returned function.
var obj = {
  bar: function() {
    var x = () => this;
    return x;
  }
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

### As an object method

When a function is called as a method of an object, its `this` is set to the object
the method is called on.

```javascript
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};

console.log(o.f()); // 37
```
