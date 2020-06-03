---
id: xhr
title: XMLHttpRequest
---

XMLHttpRequest 是一个 API，提供客户端和服务器之间传递数据的功能。

```javascript
const client = new XMLHttPRequest()
// 设置状态为 UNSET
client.open(method, url, async?=true, username?=null, password?=null)
// open 成功后发起 readystatechange 事件，设置状态为 OPENED
// client.setRequestHeader()
// client.timeout
// client.withCredentials
// client.upload
client.send(body)
// 收到 response 后设置状态为 HEADERS_RECEIVED, 发起 readystatechange 事件
// 然后读取 body，设置状态为 LOADING，发起 readystatechange 事件，发起 process 事件
// 因为读取 body 是一个循环过程，所以 readystatechange 可能会发生多次
// 在读取 end-of-body 时，发出 process 事件，设置状态为 DONE，发起 readystatechange 事件
// 最后，发起 load，loadend 事件
// 所以整个过程中，至少会发出三次 readystatechange 事件
// 如果发生了错误，也会发出一次 readystatechange 事件，状态设为 DONE

// client.abort()
// client.getResponseHeader(name)
// client.getAllResponseHeaders()
// client.overrideMimeType()
// client.responseType
// 可以是 arraybuffer, blob, document, json, text，默认是""，相当于 text
```

client 有以下状态：

1. UNSET == 0 以建立实例后，默认状态
2. OPENED == 1 成功调用了 open()方法，此时可以调用 setRequestHeader()和 send()
3. HEADERS_RECEIVED == 2 重定向（如果有的话）全部完成，response 的 headers 全部接受到
4. LOADING == 3 正在接收 response 的 body 部分
5. DONE == 4 数据传递已完成或者过程中出错了

值得注意的地方：

1. XMlHttpRequest 对象里存在一个 XMLHttpRequestUpload 对象，在 Upload 对象上绑定监听器会导致 cors-preflight-request，因为绑定监听器会设置 XMLHttpRequest 的 upload listener flag，进而造成 use-CORS-preflight flag 被设置。
2. 同步的 XMLHttpRequest 只应该在 workers 中使用。如果当前全局对象是 window，那么设置同步会导致客户端抛出错误。
3. username 和 password 如果存在的话，是用来设置 URL 定义的 username 和 password 参数的。
4. 用 setRequestHeader()多次设置同一 header，不会覆盖，而是会在原有基础上追加新字段。
5. XMLHTTPRequest 有一个 timeout 属性，控制多少毫秒后请求没有结束，就会抛出 timeout 错误。但是呢，可以在请求过程中设置 timeout，此时的 timeout 时间还是相对于请求发起时刻而言的。
6. 如果要在跨域请求中携带 credentials，设置 withCredentials 为 true；如果跨域请求不携带 credentials，或者需要忽略掉 response 中的 cookie，设置它为 false。也就是说在同域请求时，设置 withCredentials 是无意义的。
7. 在 send()开始时对 Upload 发出 loadstart 事件；在发送 request body 时对 Upload 发出 process 事件，在发送 request end-of-body 时对 Upload 发出 process，load，loadend 事件。
8. 在 send()开始时对 Request 发出 loadstart，readystatechnage 事件；在接收 response 后，先在收到 headers 时发出 readystatechange 事件，在读取 body 时循环发出 process，readystatechange 事件；在接收处理 end-of-body 时发出 process，readystatechange 事件
9. 调用 abort()不会发起 readystatechange 事件
10. 调用 overrideMimeType()可以覆盖掉 response 中给出的 MIME Type，但是并不会改变原始的 response header

![xhr-events](/img/xhr-events.png)
