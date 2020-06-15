---
id: curry-function
title: 柯里化
---

在计算机编程领域，柯里化是一项将使用多个参数的函数转化成一系列使用单个参数的函数的技术。

### 简单的例子

```javascript
// 普通版本
// 调用方式: sum(10, 2);
function sum(base, extra) {
  return base + extra;
}

// 柯里化版本
// 调用方式: curriedSum(10)(2);
// 先执行curriedSum(base)，得到保存了第一个参数的求和函数sumWithBase，稍后再调用它得到最终结果。
function curriedSum(base) {
  return function sumWithBase(extra) {
    return base + extra;
  };
}
```

### 实现柯里化函数

简单版本，需要将要处理的参数传递给柯里化函数。`func.bind(this, ...restArgs)`相当于`(...args) => func.call(this, ...restArgs, ...args)`，注意...restArgs 在...args 之前。

```javascript
const basicCurry = (func, ...restArgs) => func.bind(this, ...restArgs);

// const sum = (x, y, z) => x + y + z;
// basicCurry(sum, 10)(5, 1) = 16;
// basicCurry(basicCurry(sum, 10), 5))(1) = 16;
```

根据参数的个数递归柯里化

```javascript
const curry = (func, length) => {
  length = length || func.length;
  return (...args) => {
    if (length <= args.length) {
      return func(...args);
    }
    return curry(basicCurry(func, ...args), length - args.length);
  };
};

// const sum = (x, y, z) => x + y + z;
// curry(sum)(1,2,3) = 6
// curry(sum)(1)(2)(3) = 6
// curry(sum)(1,2)(3) = 6
```

### func 绑定 this

如果要指定传入函数 func 的 this 值，需要在传入之前绑定 func 的 this。当然，这种情况下，func 就不能用箭头函数的形式编写了。

```javascript
const sum = function (x, y, z) {
  this.sum = x + y + z;
  return this.sum;
};
const curriedSum = curry(
  sum.bind({
    sum: 0,
  })
);
```

### 关于偏函数（partial application）

偏函数固定原始函数的一个或多个参数，相当于`basicCurry()`。
