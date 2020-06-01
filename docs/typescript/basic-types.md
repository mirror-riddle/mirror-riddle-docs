# Basic Types

[Basic Types](http://www.typescriptlang.org/v2/docs/handbook/basic-types.html)

`boolean`

`number`

`string`

`Array` 两种方式 `number[]` 或者 `Array<number>`

`tuple` 定义固定长度的数组，其元素类型已知，但不必须一致 `let x: [string, number]`

`enum` give more friendly names to sets of numeric values.

```typescript
enum Color {
  Red = 1,
  Green = 2,
  Blue = 3
}
let color: Color = Color.Green;
let colorName: string = Color[2]; // 'Green'
```

`any`

`void` 没有任何类型，差不多是`any`的反面

`null` `undefined` 它们是所有其他类型的子类型

`never` 代表永远不会出现的类型

`object` 代表 non-primitive type，不是 `number`, `string`, `boolean`, `symbol`, `null`, `undefined`，`object`类型的值只允许给他们改变属性，不能调用抽象方法，即使该方法实际存在，这一点和`any`不同

## Type assertions

设定类型，有两种形式，使用 JSX 时只能用 as 形式的

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length; // angle-bracket syntax
let strLength1: number = (someValue as string).length; // as syntax
```
