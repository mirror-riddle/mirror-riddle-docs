---
id: html-event
title: Event
---

## 常见事件

### Resource events

`error` 资源加载失败

`abort` 资源加载终止

`load` 资源和它依赖的资源加载完成

`beforeunload` 页面将要关闭

`unload` 页面正要关闭

### Network events

`online` 浏览器获得网络连接

`offline` 浏览器断开网络连接

### Focus Events （事件不冒泡）

`focus` 元素获得焦点

`blur` 元素失去焦点

`focusin` 元素将要获得焦点

`focusout` 元素将要失去焦点

### WebSocket Events

`open` websocket 连接已建立

`message` 接收到 websocket 消息

`error` 因为某些错误，websocket 连接关闭（例如某些数据无法发送）

`close` websocket 连接关闭

### Session History events

`pagehide` A session history entry is being traversed from.

`pageshow` A session history entry is being traversed to.

`popstate` A session history entry is being navigated to.

### CSS Animation events

`animationstart` CSS 动画开始

`animationcancel` CSS 动画终止

`animationend` CSS 动画完成

`animationiteration` CSS 动画重复

### CSS Transition events

`transitionstart` CSS transition 已实际开始（在延迟之后触发）

`transitioncancel` transition 取消

`transitionend` transition 完成

`transitionrun` transition 已经开始（在延迟之前触发）

### Form events

`reset` 点击了 reset 按钮

`submit` 点击了 submit 按钮

### View events

`fullscreenchange` 某个元素进入或退出全屏

`fullscreenerror` 因为无权限或者其他技术原因无法切换全屏模式

`resize` 页面大小改变

`scroll` 页面或元素滚动

### Clipboard events

`cut` 剪切

`copy` 复制

`paste` 粘贴

### Keyboard events

`keydown` 按下某个键

`keypress` 按住某个键（会持续触发，Shift，Fn, CapsLock 除外）

`keyup` 释放某个键

### Mouse events

`auxclick` 点击了任何非 primary button 的键（中键和右键）event.which 是 2 或 3

`click` 点击了任意键（以后会只包含 primary button，现在可能已经是这样了）

`contextmenu` 点击右键，event.which 是 3

`dblclick` 双击 primary button

`mousedown`, `mouseenter`, `mouseleave`, `mousemove`, `mouseover`, `mouseout`, `mouseup`

`pointerlockchange` 指针锁定或释放

`pointerlockerror` 因为无权限或者技术原因无法锁定指针

`select` 在文本框里选择了某些文本，不是在任意地方选择文本都会触发

`wheel` 鼠标滚轮移动，应该设置 passive 为 true

### Drag & Drop events

`drag` 元素或者文本选择区域被拖拽（持续触发，每 350ms 触发一次）

`dragend` 拖拽操作结束(释放鼠标键或者按下 escape)

`dragenter` 拖拽的对象进入有效的 drop target

`dragstart` 拖拽开始

`dragleave` 拖拽对象离开有效的 drop target

`dragover` 拖拽对象在 drop target 之上（持续触发，每 350ms 触发一次）

`drop` 拖拽对象 drop 在有效的 drop target 之上

### Media events

`audioprocess` The input of a `ScriptProcessorNode` is ready to be processed.

`canplay` 浏览器可以播放 media，但是估计要播放到底的话，需要停下来加载更多资源

`canplaythrough` 浏览器可以播放 media，一直播放到底，不用再加载

`complete` the rendering of an `OfflineAudioContext` is terminated.

`durationchange` `duration` 属性变化

`emptied` The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it.

`ended` 结束播放

`loadeddata` 已加载 media 的第一帧

`loadedmetadata` 已加载 meta data

`pause` 播放暂停

`play` 播放开始

`playing` playback is ready to start after having been paused or delayed due to lack of data.

`ratechange` 播放 rate 已变化

`seeked` A seek operation completed

`seeking` A seek operation began

`stalled` 客户端尝试获取数据，但是数据没来

`suspend` 加载 media 数据被挂起

`timeupdate` the time indicated by the `currentTime` attribute has been updated

`volumechange` 音量变化

`waiting` 因为临时缺少数据而停止播放

### Progress events

`abort` 过程中止

`error` 过程错误

`load` 过程成功结束

`loadend` 过程停止（在 error，abort，或 load 之后）

`loadstart` 过程开始

`progress` 过程中

`timeout` 因为超时而结束

### Storage events 非标准事件

`storage` 在一个 tab 里改变 localStorage，另一个同源的 tab 里接收事件，只有在真正改变的时候才会触发。
