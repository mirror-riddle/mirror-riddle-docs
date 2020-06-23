---
id: proxy-reflect
title: Proxy Reflect
---

### 要点

- Proxy 对象是对 JS 原生对象的代理，它通过拦截、处理被代理对象的一些操作，改变操作的结果。
- Reflect 对象定义了 Proxy 对象拦截器的默认行为，可以在拦截器里针对某些情况执行自定义代码，另一些情况通过 Reflect API 执行默认行为。
- new Proxy() 创建的 Proxy 对象是不可撤销的，而 Proxy.revokable() 创建的 Proxy 对象可以通过调用返回的 revoke 函数撤销。撤销后的 Proxy 对象不再起作用，对它进行操作都会抛出错误。

  ```javascript
  const target = { name: 'target' };
  const { proxy, revoke } = Proxy.revokable(target, {});
  console.log(proxy.name); // target
  revoke();
  console.log(proxy.name); // throw error
  ```
