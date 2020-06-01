# Interfaces

[Interfaces](http://www.typescriptlang.org/v2/docs/handbook/interfaces.html)

## Function Types

可以用 interface 来描述函数类型

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

## Indexable Types

```typescript
interface StringArray {
  [index: number]: string;
}
```

可以同时支持`number`和`string`两种类型的 index，但是`number`的 index 对应的类型必须时`string`的 index 对应类型的子类。因为 javascript 在索引的时候会自动将数字索引转化为字符串索引。

```typescript
interface {
  [index: string]: string|number;
  [index: number]: number;
}
```

## Class Types

class 可以 implement interfaces

```typescript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}
```
