---
id: cors-solutions
title: 跨域方案
---

同源策略：限制一个 origin 的文档或者它加载的脚本如何和另一个 origin 的资源进行交互。

相同 origin 的定义：protocol，domain，port 相同。

解决跨域问题的方法：

1. CORS 跨域资源共享
   使用额外的 HTTP 头来告诉浏览器，让运行在一个 origin 的 APP 被允许访问来自另一个 origin 服务器的指定资源。
   分为简单请求和非简单请求
   简单请求允许 GET, HEAD, POST 方法，限制了人为设置的请求头的类别，限制了 Content-Type 的类型 text/plain,
   multipart/form-data, application/x-www-form-urlencoded，限制了 XMLHttpRequestUpload 不能注册监听函数，
   限制了请求中不使用 ReadableStream 对象。
   对于简单请求，服务器只需要设置 Access-Control-Allow-Origin 的值为相应 origin 即可。

   对于非简单请求，服务器还要设置 Access-Control-Request-Methods 的值为相应 HTTP 方法；设置
   Access-Control-Allow-Headers 的值为客户端发来的 HTTP 头；如果请求中设置了 withCredentials 为真，那么
   服务器还要设置 Access-Control-Allow-Credentials 为真；如果是传递 cookies，那么服务器设置的
   Access-Control-Allow-Origin 不能为\*，必须明确设置为正确的 origin

2. 服务器正向代理
   利用服务器端请求没有跨域限制的特性，让接口服务器和客户端同源。
   webpack 设置 devServer.proxy

3. Nginx 反向代理
   让 Nginx 把跨域的请求映射到目标服务器上去。

4. JSONP
   利用了`<script>`标签没有跨域限制的特性
   仅仅支持 GET 方法
   浏览器加载`<script>`时，发送一个带有参数和函数名的 GET 请求，让服务器将它拼接成类似"callback(a, b)"的字符串，然后返回给客户端，最后浏览器执行 script。
   因为 script 是服务器拼接出来的，所以可以在里面加入客户端想要的东西。

   如果服务器不能确定允许哪些 origin，同时又不能允许所有 origin，同时又想向所有 origin 开发部分接口，那么就把这些接口做成 JSONP 形式，就能派上用场。

5. WebSocket
   利用 websocket 在浏览器和服务器之间建立套接字连接，由于两端存在持久的连接，而且双方都可以随时发送数据，而且传输过程没有涉及 HTTP 头，所以也就不存在跨域的限制。

6. window.postMessage
   允许页面和它打开的页面、它内置的 iframe 进行安全的跨域通信。
   A 窗口把请求发送给另一个 originB 窗口，B 将请求发送给 B 服务器，最后将 response 发回给 A 窗口，于是
   A 实现了跨域请求。
