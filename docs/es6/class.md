---
id: class
title: Class
---

### 要点

- class 声明没有变量提升，就像 let 一样存在暂时性死锁
- class 内部代码总是处于严格模式
- class 方法总是不可以枚举的，不可用 new 调用。它们实际上是在 class 的原型上定义。
- class 只能用 new 来实例化
- 不能在 class 方法里面重命名 class

first-class-citizen 在编程领域指的是一个值可以被传入函数，可以被函数返回，可以赋值给变量。函数、类都是 JS 中的 first-class-citizens。

### 创建单例类

```javascript
const person = new (class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
})('mirror-riddle');
```

### Accessor Properties

```javascript
class Person {
  constructor(name) {
    this.name = name;
    this._age = 0;
  }
  get age() {
    return `${this._age} years old`;
  }
  set age(value) {
    this._age = Number(value);
  }
}
const person = new Person();
person.age = 28;
console.log(person.age);
```

### super()

- 只能在子类的 constructor()里面使用 super()。
- 在 constructor 里面必须先调用 super()然后才可以使用 this，因为 super()负责初始化 this。
- 要避免调用 super()的唯一办法是在 constructor()里面返回一个对象。

### Symbol.species

Symbol.species 用于声明一个静态 accessor 属性(get 类型)，该属性返回一个函数。这个函数是是一个 constructor，在类方法里要实例化一个新实例都要调用这个 constructor。

```javascript
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}
const myArray = new MyArray(1, 2, 3, 4); // 同时是 Array, MyArray 实例
const arr = myArray.copyWithin(2, 0, 1); // 只是 Array 实例，不是 MyArray 实例
```
