---
id: concepts
title: concepts
---

webpack 是一个针对现代 JavaScript 应用的静态模块打包工具。

## Entry

entry 表示 webpack 要使用哪个模块来开始建立它的内部依赖图。从 entry 模块出发，webpack 会递归地对所有引用到的资源（JavaScript 模块，图片，字体等）奖励依赖图，最后把它们归并到一个或多个 bundle 里。

### Single entry

使用方法: entry: string | string[]，如果传递多个 entry，那么 webpack 会将这些 entry 的依赖放在一个 bundle 里面。

```javascript
module.exports = {
  entry: 'src/index.js',

  // is a shorthand for
  // entry: {
  //   main: 'src/index.js'
  // }

  // multi-main entry
  // entry: ['src/index.js', 'src/app.js']
};
```

### Object syntax

最灵活的方式： entry: `<entryChunkName>` string | `<entryChunkName>` string[]

```javascript
module.exports = {
  entry: {
    app: 'src/index.js',
    adminApp: 'src/admin-app.js',
  },
};
```

### 最好的方法

一个 HTML 文件对应一个 entry point，单页面 APP 只需要设置一个 entry 就好。

## Output

output 告诉 webpack 要在哪里创建 bundle，以及如何命名它。默认值是`./dist/main.js`。entry 可以有多个，但是 output 只能有一个。如果指定了多个 entry，那么 output 的文件名就必须设置成类似`[name].js`这样，以使得每个文件有独特名字。

```javascript
module.exports = {
  entry: 'src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist')
    filename: '[name].bundle.js'
  }
};
```

## Loaders

webpack 默认只能识别 JavaScript 和 JSON 文件。loaders 的作用是处理其他的文件并把它们装换为有效的 webpack 模块。在 JavaScript 中导入 CSS 文件是 webpack 独有的特性。loader 主要有两个特性 test（匹配需要转化的文件）和 use（转化文件所必须的 loader ）

loaders 执行顺序是从右到左（从下到上）。

```javascript
module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: ['raw-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
};
```

## plugins

loaders 用于转化特定类型的模块，plugins 用途更广泛，可用来 bundle 优化，资源管理，以及注入环境变量等工作。plugins 可以多次使用，因此每次需要创建新的实例。例如，HtmlWebpackPlugin 就是用来生成 HTML 文件并且将所有的 bundles 注入进去。

plugins 的作用就是做那些 loaders 做不到的事。plugin 一个有 apply()方法的类，apply()会被 webpack 编译器调用。

```javascript
module.exports = {
  plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' })],
};
```

## Mode

设置 mode 为`development`, `production`, `none`可以启用对应的 webpack 内置优化策略。默认值是`production`

```javascript
module.exports = {
  mode: 'production',
};
```

## Browser Compatiblity & Environment

webpack 支持 ES5-compliant 浏览器（<=ie8 不支持）, 支持 nodejs >= 8.x

## Webpack Modules

这些情况会生成 module

1. ES6 import 语句
2. CommonJS require() 语句
3. AMD define 和 require 语句
4. CSS/Sass/Less 中的 @import 语句
5. stylesheet 中的 url(...) 或 HTML 中的 `<img src=...>`, `<link href=...>`

## Module Resolution

webpack 使用`enhanced-resolve`来决定 module 的来源，包括绝对路径、相对路径、module 路径，其中 module 路径由`resolve.modules`, `resolve.alias`决定。

一旦路径已经确定，如果它指向一个文件

    1. 包含文件扩展名，那么直接打包这个文件；
    2. 否则，要用`resolve.extensions`来确定哪些扩展名的文件可视为模块。

如果它指向一个目录

    1. 如果目录里包含package.json, 那么看它里面有没有`resolve.mainFields`指定的字段，找到的就是文件路径
    2. 否则，找`resolve.mainFields`里指定的文件是否存在于目录中
    3. 否则，用`resolve.extensions`来确定那些文件可视为模块

## Targets

`target`表明 webpack 针对什么平台处理模块， 默认为 `web`, 服务器端可以设置为 `node`。

## Manifest

`Runtime` 包含 loading 和 resolving 模块的逻辑。

`Manifest` 记录模块之间关系的详细信息。runtime 利用它才能完成工作。

如果需要提高性能，比如利用浏览器缓存，就需要研究这个。

## Hot Module Replacement (HMR)

HMR 在 APP 运行时动态交换、添加或移除模块，而不用整体重新加载。好处：

    1. 保持APP状态，全局重新加载会丢失掉
    2. 只更新改变的模块，节约开发时间
    3. 当CSS/JS改变时，自动更新浏览器

## Why Webpack

1. 支持所有模块，不仅仅是 JavaScript 和 CSS
