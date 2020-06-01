---
id: storage-api
title: storage api
---

web storage 为每个 origin 保持一个存储区域，可以存键值对。

`session storage` 只在页面 session 里有效（在关闭浏览器或标签页时 session 结束），刷新、恢复页面不影响`session storage`。能存贮的数据不超过 5MB。

`local storage` 在浏览器关闭和标签关闭时依然存在，只能通过 js 调用或者清除浏览器缓存来清除它。能存的数据比 session storage 要多。
