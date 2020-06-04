---
id: add-event-listener
title: AddEventListener
---

EventTarget.addEventListener(type, listener, [, options or useCapture])

EventTarget 可以是 Element, Document, Window, XMLHttpRequest 等。

listener 可以是一个函数（参数为 event），或者是一个实现了 EventListener 接口的对象。

options 有以下选项：
capture: boolean, 决定了是否确保先 dispatch 事件给 target 的监听器，再发送事件给 target 之下的 DOM 树（也就是向父元素方向冒泡）默认值是 false。这个参数决定了谁能先接受到事件，target 还是 target 的上层元素。target 先接收到事件的话，可以选择结束事件冒泡，从而防止上层元素接收该事件。

once: boolean, 决定了监听器是否至多执行一次，如果为 true，监听器会在触发后自动被移除。

passive: boolean, 如果为 true，表示监听器永远不会调用 preventDefault()，但是如果真的调用了，浏览器之后只是会给出警告信息而已。

如果只提高 useCapture 参数，相当于只提供 options.captrue

Why use addEventListener()
It allows adding more than a single handler for an event. This is particularly useful for AJAX libraries, JavaScript modules, or any other kind of code that needs to work well with other libraries/extensions.
It gives you finer-grained control of the phase when the listener is activated (capturing vs. bubbling).
It works on any DOM element, not just HTML elements.

Improving scrolling performance with passive listeners
According to the specification, the default value for the passive option is always false. However, this introduces the potential for event listeners handling certain touch events (among others) to block the browser's main thread while it is attempting to handle scrolling, resulting in possibly enormous reduction in performance during scroll handling.

To prevent this problem, some browsers (specifically, Chrome and Firefox) have changed the default value of the passive option to true for the touchstart and touchmove events on the document-level nodes Window, Document, and Document.body. This prevents the event listener from being called, so it can't block page rendering while the user is scrolling.

Event.preventDefault
告诉浏览器如果没有显式处理事件，事件的默认行为将不会发生，但是事件会继续照常 propagate，除非监听器调用了 stopPropagation()会在 stopImmediatePropagation()。对于不能取消的事件，调用 preventDefault()无效。

Event.stopPropatation
停止事件继续 propagate，但是并不会拦截默认行为（例如点击链接还是会打开链接）

Event.stopImmediatePropagation()
防止事件的其他监听器被调用。如果一个事件绑定了几个监听器，那么它们被调用的顺序会和绑定的顺序一样。如果前面的监听器调用了 stopImmediatePropagation()，后面的监听器就不起作用了。
