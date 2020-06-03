---
id: closure
title: Closure
---

闭包是可以访问外部函数作用域中变量的函数。形式:

```javascript
function sayHello() {
  const greeting = 'hello ';
  // 匿名函数是闭包
  return function (name) {
    console.log(greeting + name);
  };
}

sayHello()('mirror-riddle');
// hello mirror-riddle
```

### 要点

1. 闭包是一个函数。
2. 闭包可以访问外部函数的作用域，即使外部函数已经执行完毕。
3. 创建闭包的常见方式是在一个函数内部创建另一个函数，并且内部函数要访问外部函数中的变量。

### 原理

函数被调用时，会创建一个执行环境（execution context）和相应的作用域链，然后，使用 arguments 和形式参数的值来初始化函数的活动对象（activation object，也就是 calleeContext.lexicalEnvironment.environmentRecord），而它的作用域（lexicalEnvironment）存在一个引用指向外部函数的作用域，外部函数作用域存在一个引用指向更外部函数的作用域，于是形成了作用域链。通常函数执行完毕后，它的作用域会被销毁，只有全局作用域才会一直存在于内存中。但是闭包引用了外部函数作用域中的 environmentRecord，所以即使外部函数执行完毕，因为 environmentRecord 仍然被闭包引用，所以外部函数的作用域链会销毁，但是它的 environmentRecord 仍然存在于内存中。

由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存。过度使用闭包可能会导致内存占用过多。因此应该只在必要的时候使用闭包。另外，可以通过给闭包赋值为 null 来解除对它的引用，以便释放内存。
