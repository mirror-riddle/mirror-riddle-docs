---
id: css-triangle
title: CSS 三角形
---

## 1. 利用 `border` 属性画三角形

相邻的 border 在 box 的边角“相遇”时，会平分公共空间。如果这两个 border 的颜色不一样，相遇处就会形成边界线，可以作为三角形的边。

下文中的 box 指的是三角形元素的盒子模型。

```css
.triangle-up {
  box-sizing: border-box;
  display: inline-block;
  border-width: 50px;
  border-style: solid;
  border-color: transparent;
  /* 如果需要去掉box的上半透明部分，可以设置 border-top-width: 0; */
  border-bottom-color: black;
}
```

### box-sizing

如果设置 `box-sizing: border-box`，那么 `border-width` 会计入 box 的高度和宽度，于是 box 默认高度、宽度分别是上下、左右`border-width` 和。如果主动设置 box 高度宽度值，但是不超过上述宽度和，将形同虚设；反之，“溢出”值将决定 box content 的大小，此时三角形就变成了梯形。

如果设置 `box-sizing: content-box`，那么`border-width` 不会计入 box 的高度和宽度。如果主动设置 box 宽度值，相当于设置 box content 的大小，也可以让三角形变成梯形。

### display

三角形元素类型不确定。如果是`div`，那么默认`display: block`，默认 width 为 100%, 于是我们还需额外设置 width 的值（小于左右 `border-width` 之和），同时 box 可以完全“框住”内容，不与邻近 box 冲突。如果是`span`，那么默认`display: inline`，默认高度将由 `font-size` 决定，同时 border 出现溢出现象，box 内容会延伸到邻近的 box 中。因此我们设置 `display: inline-block` 规避以上缺点。

### border

利用到的 border 属性分别为`border-width`，`border-color`，`border-style`。通过设置一边的 border，隐藏掉其他三边的 border，就可以画出三角形。

### 控制三角形朝向、大小

要控制三角形朝向，一种方法是通过控制 border 的显示和隐藏实现只显示某一边 border。第二种方法是通过`transform: scale()`在水平和垂直方向翻转 box。控制大小也可以用这两种方法。第三种方法是通过`transform: rotate()`旋转 box 来调整三角形朝向。使用 transform 属性, box 可能和邻近 box 发生冲突，所以还是用第一种方法最恰当。

```css
.down {
  /* 垂直方向上翻转, 同时放大高度为原来的1.5倍 */
  transform: scaleY(-1.5);
  /* 顺时针旋转90度 */
  transform: rotate(-90deg);
}
```
