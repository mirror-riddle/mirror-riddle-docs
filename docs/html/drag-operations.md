---
id: drag-operations
title: Drag Operations
---

### draggable 属性

网页中，只有选中的文字、图片和链接默认是可以拖拽的。对于文字，拖拽设置的数据就是文字本身，对于图片和链接，拖拽设置的数据是它们的 URL。要使得其他元素可拖拽，需设置：

1. 设置元素属性`draggable="true"`。元素设置为可拖拽后，要想选择其中的文字，需要按住`Alt`才可以。
2. 给元素添加`onDragStart`监听函数，并在其中通过`event.dataTransfer.setData()`设置拖拽数据。

### onDragStart

给可拖拽元素绑定`onDragStart`监听函数，当拖拽操作开始时，我们可以在监听函数中设置`drag data`、`drag effects`和`feedback image`，其中`drag data`是必须要设置的。

### drag data

`drag data`是监听函数`onDragStart`中需要设置的拖拽数据。在监听函数`onDragEnter`和`onDragOver`中我们可以获取之前设置的拖拽数据，以决定是否允许触发`drop`事件。

每条拖拽数据都包含`type: string`和`value: string`两种信息。我们通过`event.dataTransfer`对象来操作拖拽数据。数据类型是可以自定义的，数据数目也是不限制的。

```javascript
event.dataTransfer.setData('name', event.target.innerText);
event.dataTransfer.setData('desc', event.target.innerText);
event.dataTransfer.getData('text');
event.dataTransfer.clearData('name'); // 清除 name 数据
event.dataTranster.clearData(); // 清除所有数据
```

如果拖拽事件不包含拖拽数据，或者数据全部被清除了，拖拽操作就不能完成了。

### feedback image

`feedback image` 是拖拽过程中与鼠标同步移动的背景图片，默认情况下它是根据被拖拽元素生成的。我们也可以自己设定背景图片，图片来源可以是文档中的`<img>`元素、`canvas`元素或者任意元素，浏览器根据提供的元素在屏幕上显示的样子来生成背景图片。也可以用`javascript`生成的 `image` 和 `canvas` 来作为背景图片。

```javascript
// xOffset, yOffset 是图片相对于鼠标(0, 0)的坐标
event.dataTranster.setDragImage(image, xOffset, yOffset);
```

### drag effects

`drag effects`是拖拽过程中拖拽数据的行为，可以设置为下列值：

- `none`, 禁用所有行为

- `copy`, 表示拖拽数据将从来源地复制到目的地

- `move`, 表示拖拽数据将从来源地移动到目的地

- `link`, 表示拖拽数据会在来源地和目的地之间建立某种联系

- `copyMove`, `copyLink`, `linkMove`, `all`

- `uninitialized`, 默认就是`all`

我们在`onDragStart`监听函数中设置`effectAllowed`来决定可以允许哪些拖拽数据行为。

在`onDragEnter`和`onDragOver`触发时，`dropEffect`属性首先被初始化为用户要求的拖拽行为（用户通过按键盘上的 modifyer 键来改变拖拽行为），但是我们可以在这两个监听函数里手动设置`dropEffect`属性来覆盖用户要求的行为。此时设置的值必须处于`effectAllowed`的范围内，而且只能设置成`none`, `copy`, `move`和`link`四个值之一。

```javascript
// 只允许 copy 效果
event.dataTransfer.effectAllowed = 'copy';
```

### 指定 drop targets

要指定某个元素为拖拽的目的地，我们需要通过调用`event.preventDefault()`禁用`onDragEnter`和`onDragOver`的默认处理行为。通过我们会在这两个事件处理函数中判断拖拽数据的类型，来决定是否允许 drop。

```javascript
function doDragOver(event) {
  const isLink = event.dataTransfer.types.includes('text/uri-list');
  if (isLink) {
    event.preventDefault();
  }
}
```

### drop feedback

当拖拽物进入目的地时，我们希望拖拽的目的地可以高亮显示，在火狐浏览器里可以使用`:-moz-drag-over` CSS 伪类(必须在`onDragStart`监听函数中调用`event.preventDefault()`)

```css
.drop-area:-moz-drag-over {
  outline: 1px solid black;
}
```

我们可以在`onDragEnter` , `onDragOver`, `onDragLeave`三个事件监听函数中改变拖拽目的地的状态。

### perform a drop

拖拽到目的地后释放鼠标，即可执行drop操作。在`onDrop`监听函数获取拖拽数据，处理完毕后要调用`event.preventDefault()`以禁用浏览器对该事件的默认处理行为。

### finishing a drag

拖拽完成后，无论是否成功，可拖拽元素都会触发`onDragEnd`事件。如果此时的`dropEffect`为`none`，那么拖拽就是被取消了，否则说明`dropEffect`指定的行为被执行过。拖拽的起源地可以根据这一信息决定是否移除某一个元素(move操作)。