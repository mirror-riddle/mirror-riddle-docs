---
id: chrome-error
title: Chrome Error
---

Chrome console 打印以下错误：

```
Unchecked runtime.lastError: The message port closed before a response was received.
```

经查是 Chrome 插件的问题。因为 Chrome 更新了 cors 策略，但是某些插件没更新。已知迅雷插件会导致该问题。
