---
id: overview
title: overview
---

HTTP is a protocol which allows the fetching of resources, such as HTML documents. It is the foundation of any data exchange on the Web and it is a client-server protocol, which means requests are initiated by the recipient, usually the Web browser. A complete document is reconstructed from the different sub-documents fetched, for instance text, layout description, images, videos, scripts, and more.

![http fetch a page](assets/fetching_a_page.png)

Clients and servers communicate by exchanging individual messages (as opposed to a stream of data). The messages sent by the client, usually a Web browser, are called `requests` and the messages sent by the server as an answer are called `responses`.

![http layers](assets/http_layers.png)

## Components of HTTP-based systems

![client server chain](assets/client-server-chain.png)

一边是`user-agent`，通常就是浏览器，用于发送请求。要获取网页，浏览器发出请求获取html文档，如果文档中包含JS，CSS，图片，视频等，再发出额外请求去获取这些资源，最后将这些东西合在一起形成最终的网页。之后，还可以通过执行得到的JS按需获取更多网页。网页是一个超文本文档，其中可能包含着可与用户交互的链接。当用户点击链接时，浏览器将链接转化为新的请求。

另一边是`web server`, 用于接收`user-agent`的请求，提供它所需要的文档。

中间存在`proxies`，可对两边来往的信息进行处理（caching, filtering, load balancing, authentication, logging）。

## What can be controlled by HTTP

1. Caching
How documents are cached can be controlled by HTTP. The server can instruct proxies and clients, about what to cache and for how long. The client can instruct intermediate cache proxies to ignore the stored document.

2. Relaxing the origin constraint
To prevent snooping and other privacy invasions, Web browsers enforce strict separation between Web sites. Only pages from the same origin can access all the information of a Web page. Though such constraint is a burden to the server, HTTP headers can relax this strict separation on the server side, allowing a document to become a patchwork of information sourced from different domains; there could even be security-related reasons to do so.

3. Authentication
Some pages may be protected so that only specific users can access them. Basic authentication may be provided by HTTP, either using the WWW-Authenticate and similar headers, or by setting a specific session using HTTP cookies.

4. Proxy and tunneling
Servers or clients are often located on intranets and hide their true IP address from other computers. HTTP requests then go through proxies to cross this network barrier. Not all proxies are HTTP proxies. The SOCKS protocol, for example, operates at a lower level. Other protocols, like ftp, can be handled by these proxies.

5. Sessions
Using HTTP cookies allows you to link requests with the state of the server. This creates sessions, despite basic HTTP being a state-less protocol. This is useful not only for e-commerce shopping baskets, but also for any site allowing user configuration of the output.

## HTTP flow

当客户端要和服务器通信时，执行下列步骤：

1. 建立TCP连接，用于发一到多个请求，接收回应。客户端可以建立新的、重用已有的、或者建立多个TCP连接。

2. 发送HTTP消息。

    ```http
    GET / HTTP /1.1
    Host: developer.mozilla.org
    Accept-Language: fr
    ```

3. 读取回应

    ```http
    HTTP/1.1 200 OK
    Date: Sat, 09 Oct 2010 14:28:02 GMT
    Server: Apache
    Last-Modified: Tue, 01 Dec 2009 20:28:22 GMT
    ETag: "51142bc1-7449-479b075b2891b"
    Accept-Ranges: bytes
    Content-Length: 29769
    Content-Type: text/html
    <!DOCTYPE html... (here comes the 29769 bytes of the requested web page)
    ```

4. 关闭或者重用TCP连接

If HTTP pipelining is activated, several requests can be sent without waiting for the first response to be fully received. HTTP pipelining has proven difficult to implement in existing networks, where old pieces of software coexist with modern versions. HTTP pipelining has been superseded in HTTP/2 with more robust multiplexing requests within a frame.

## HTTP Messages

HTTP messages, as defined in HTTP/1.1 and earlier, are human-readable. In HTTP/2, these messages are embedded into a binary structure, a frame, allowing optimizations like compression of headers and multiplexing. Even if only part of the original HTTP message is sent in this version of HTTP, the semantics of each message is unchanged and the client reconstitutes (virtually) the original HTTP/1.1 request. It is therefore useful to comprehend HTTP/2 messages in the HTTP/1.1 format.

There are two types of HTTP messages, requests and responses, each with its own format.

### Requests

![http request](assets/http-request.png)

1. HTTP 方法， POST(提交表单), GET(获取资源), OPTIONS, HEAD

2. path, 请求路径，去除protocol，domain，port之后的路径

3. optional headers

4. body, 提交的数据

### Responses

![http response](assets/http-response.png)

1. 状态码和状态消息，显示请求是否成功

2. headers

3. body

## APIs based on HTTP

`XMLHttpRequest`, `Fetch API` 用于客户端和服务器交换数据。

`server-sent events` 服务器单向地向客户端传送events。客户端利用`EventSource`，建立连接并监听事件。浏览器会自动将接收到的HTTP消息转化为合适的`Event`对象，将它传送相对应的event handler，如果没有对应的event handler，就传送给默认的`onmessage`

## HTTP/2

HTTP/2 adds some complexity, by embedding HTTP messages in frames to improve performance, the basic structure of messages has stayed the same since HTTP/1.0.
