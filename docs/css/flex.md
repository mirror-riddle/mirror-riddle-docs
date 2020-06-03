---
id: flex
title: Flex
---

flexbox 的初衷是使 container 元素可以改变 item 元素的高度、宽度、顺序，以适应不同大小的设备。flexbox 适合运用在应用组件、小范围布局上，grid layout 适合大范围布局。

flexbox layout is most appropriate to the compoennts of application, and small-scale layout, while the Grid layout is intended for larger scale layouts.

display: flex | inline-flex;

### 重点

1. align-content 要在 flex-wrap 不为 no-wrap 时才有效，因为该属性在单行 flex container 里无效
2. 居中布局方案中，align-items: center 可以用 align-content: center; flex-wrap: wrap;替代，也可以由 flex item 设置 align-self: center;替代
3. justify-content 与主轴 main-axis 有关，默认是水平方向，align-\*与副轴 cross-axis 有关，默认是垂直方向。

### 属性

flex-basis: 基础宽度或者高度，是 flex-grow 和 flex-shrink 的参照，可以是数值，默认是 auto。也可以设置为 flex-basis: content; 按实际内容而自动变化
content 类型包括：max-content / min-content / fit-content / fill /content
如果同时设置了 flex-basis 和 width/height, flex-basis 优先级更高

flex-grow: 空间充足时，决定 item 能占据多少可分配空间，默认为 0, 不增大。数值越大，占据比例越高。

flex-shrink: 当空间不足时，决定 item 的相对缩放比例，默认为 1，平均缩放。数值越大，缩小比例越大。

flex-wrap: 设置内容 wrap 方式 nowrap, wrap, wrap-reverse，默认 nowrap

flex-direction: 设定 item 排列方向 row, row-reverse, column, column-reverse, 默认是 row

order: 设置排列 items 的顺序，从小到大，优先级比代码书写顺序高

align-content: 决定在副轴方向（默认垂直方向），如何处理内容和空白。如果设置了 flex-wrap: no-wrap, align-content 无效

justify-content: 决定在主轴方向（默认水平方向），如果处理内容和空白。The alignment is done after lengths and auto margins are applied。所以在 flex 布局中，如果存在 flex-grow 不为 0 的 item，那么这个 item 就会占据所有剩余空间，justify-content 随之无效，因为没有剩余空间让它处理了。参数和 align-content 一样，除了多了 left 和 right 两个参数。

align-items: 为所有的 items 统一设置 align-self，控制 items 在副轴方向的排列。

flex 参数包括了 flex-grow, flex-shrink, flex-basis
flex-flow 参数包括了 flex-direction, flex-wrap

flex 居中

```css
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;

  // using align-content instead of align-items
  // align-content; center;
  // flex-wrap: wrap;
}
```
