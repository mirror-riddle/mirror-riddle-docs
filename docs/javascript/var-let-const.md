---
id: var-let-const
title: Var Let Const
---

全局环境下，var 定义变量会在 global object 里创建相应属性。let 和 const 则不会这样，只是会在全局环境下创建变量。

```javascript
// global scope
var x = null;
window.x === null; // true

let y = null;
window.y === null; // false

const c = null;
window.c === null; // false
```
