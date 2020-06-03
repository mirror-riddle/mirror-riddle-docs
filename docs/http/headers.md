---
id: headers
title: Http Headers
---

HTTP Headers 是请求和回应中携带的额外信息，分为

- general headers，请求和回应中都包括，并且和 body 的数据无关
- request headers，包含要获取的资源的信息，还有关于客户端的信息
- response headers，包含关于回应的信息，比如 location，还有关于服务器的信息
- entity headers，包含有关 body 的信息，比如 content length 或者 MIME type（文档类型）

也可按照代理不同分为

- end-to-end headers，headers 必须传送给最终接收者，请求给服务器，回应给客户端，中间代理必须不能修改 headers，缓存必须存储 headers
- hop-by-hop headers, 这些 headers 只对单个传输级别的连接有意义，中间代理或者缓存不应该传送或存储它们。只有 hop-by-hop headers 才可以
  用 Connection 设置。

### Authentication

WWW-Authenticate 属于 response headers，定义应该用于获取资源的证明方法，401 Unauthorized reponse 会带着这个头

    格式：WWW-Authenticate: <type> realm=<realm>
    type 是证明类别，如 Basic, Bearer, OAuth
    realm 是保护区域，如果不设置，客户端会显示 hostname
    WWW-Authenticate: Basic
    WWW-Authenticate: Basic realm="Access to the staging site", charset="UTF-8"

Authorization 属于 response headers，包含了客户端用来向服务器证明自己的凭据(credentials)

    格式：Authorization: <type> <credentials>
    credentials 会被 base64 encoded，但是 base64 encode 是可以 decode 的，所以只能在 HTTPS 上安全使用
    Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l

Proxy-Authenticate 属于 response headers，定义通过代理服务器获取资源的证明方法，向代理服务器证明一个请求，使得它将请求继续发出去。407

    Proxy Authentication Required 回应带着这个头
    格式：Proxy-Authenticate: <type> realm=<realm>

Proxy-Authorization: 参见 Authorization

### Caching

防止缓存的方法是 response 设置 Cache-Control: no-store。

想要不变的静态文件缓存，response 设置 Cache-Control: public, max-age=604800, immutable。

设置 no-cache 或者 max-age=0, 表示客户端可以缓存资源，但是每次都要去服务器验证，验证成功了就可以直接用，节省了下载资源的流量。

    Cache-Control: no-cache
    Cache-Control: no-cache, max-age=0
    Cache-Control: no-cache, max-age=0, stale-while-revalidate=300

Age 属于 response headers，以秒表示对象在代理缓存中存在的时间，通常接近于 0。如果 Age: 0，可能是刚从服务器直接拿到的，不然 Age 就是 Proxy 的当前时间和服务器回应中的时间之间的差值

Cache-Control 属于 general headers，记录了请求和回应中对缓存的指令，请求中带有某个指令不代表回应中也带着同样的指令。
通常浏览器会缓存 response，如果 response 满足以下条件之一

- 状态码为 301，302，307，308，410，并且 Cache-Control 不含有 no-store，如果是代理的话，不含有 private，并且 Authorization 未设置
- 状态码为 301，302，307，308，410，或者 Cache-Control 含有 public, max-age, s-maxage，或者设置了 Expires

  public 可以被任何缓存存储，即使 response 不可缓存

  private 只能被浏览器缓存，即使 response 不可缓存

  no-cache 同 pubic，但是每次都要去服务器验证才能用

  no-store 不能被任何缓存存储，禁止浏览器缓存的唯一方法

  `max-age=<seconds>`: 缓存被认为是新鲜的最大时间，相对于请求的时间而言

  s-maxage 覆盖 max-age 和 Expires，只针对于共享缓存（代理缓存），对私有缓存不起作用

  max-stale 表示客户端将接受多老的陈旧缓存

  min-fresh / stale-while-revalidate / stale-if-error

  must-revalidate 如果缓存变陈旧，必须要重新验证才可使用

  proxy-revalidate / immutable

  no-transform 资源不会改变

  only-if-cached

      ```http
      // HTTP request
      Cache-Control: max-age=seconds
      Cache-Control: max-stale[=seconds]
      Cache-Control: min-fresh=seconds
      Cache-Control: no-cache
      Cache-Control: no-store
      Cache-Control: no-transform
      Cache-Control: only-if-cached

      // HTTP response
      Cache-Control: must-revalidate
      Cache-Control: no-cache
      Cache-Control: no-store
      Cache-Control: no-transform
      Cache-Control: public
      Cache-Control: private
      Cache-Control: proxy-revalidate
      Cache-Control: max-age=seconds
      Cache-Control: s-maxage=seconds
      ```

  Clear-Site-Data 属于 response headers，清除浏览器有关请求网站的数据（cookies, storage, cache），可以发送一个请求，让服务器清理用户浏览器的数据，在升级程序而浏览器的旧数据不兼容时可以使用该方法清除掉，或者在用户退出登录时清除掉用户数据。

  ```http
  // Single directive
  Clear-Site-Data: "cache"

  // Multiple directives (comma separated)
  Clear-Site-Data: "cache", "cookies", "storage"

  // Wild card
  Clear-Site-Data: "\*"
  ```

Expires 属于 response headers，定义 response 要多久才算陈旧。如果 Cache-Control 里设定了 max-age 或者 s-maxage，Expires 会被忽略。

    Expires: Wed, 21 Oct 2015 07:28:00 GMT

Pragma 兼容性 header，Pragma: no-cache，相当于 Cache-Control：no-cache

### Conditionals

last-Modified 属于 response headers，资源的最后更改时间，用来比对不同版本的同一资源，没有 ETag 准确，属于 fallback 机制

ETag 属于 response headers，描述某一版本的资源的 ID，主要用于缓存检查，如果资源变化了，必须要给出一个新的 ETag。客户端要发送 If-Match 或者 If-None-Match 头给服务器，让服务器比对资源是否有变化。

If-Match 属于 request headers，对于 GET 和 POST 请求，如果 ETag 匹配的话，服务器才会发送相应资源给客户端。对 PUT 和其他非安全请求，只会上传资源而已。

If-None-Match 参考 If-Match

If-Modified-Since / If-Unmodified-Since 参考以上

Vary 属于 response headers，决定如何匹配未来的请求头，以确定缓存的资源可以直接用而不是去服务器获取新的。服务器用这来表明它用到了什么头来选择正确的资源。304 Not Modified 回应应该带着 Vary，就像 200 OK 回应一样。比如要对不同的设备提供不同版本的页面，那么回应中应该带上 Vary：User-Agent，如此就能避免发送错误版本的页面，同时也让搜索引擎发送手机版本的页面https://www.fastly.com/blog/best-practices-using-vary-header

### Connection management

Connection 属于 general headers，控制在当前事务结束后，网络连接是否保持 open，如果值是 keep-alive, 连接不会关闭，于是后续请求不需要重新建立请求。如果是 close，就会关闭。不能用于 HTTP/2

Keep-Alive 属于 general headers，允许发送者提示连接如何设置 timeout，以及最多请求数。Connection 必须设为 keep-alive 才可以，两个都不能用于 HTTP/2。
timeout 表示不活动连接可以在多少秒之内保持 open
max 表示在关闭连接前最多可以发送多少个请求
Keep-Alive: timeout=5, max=1000

### Content negotiation

Accept 属于 request headers，说明客户端能理解哪些类型的资源（MIME types），服务器根据这一 header 发给客户端想要的资源。

Accept-Charset / Accept-Encoding / Accept-Language

### Controls

Expect 属于 request headers，表明需要服务器完成的期待，以正确处理请求。唯一的只是 100-continue，服务器返回 100（如果 header 中的信息不足以导致立即成功），返回 417（服务器做不到...）比如先向服务器发送一个 PUT 请求，询问服务器是否接受 header 里的参数，如果服务器返回 100 表示可以继续，反之就不能。

### Cookies

Cookie 属于 request headers，包含了服务器通过 Set-Cookie 发给客户端的 cookie，也有客户端自己加的 cookie
Cookie: `<cookie-list>`
Cookie: name=value
Cookie: name=value; name2=value2; name3=value3

Set-Cookie 属于 response headers，服务器发送 cookie 给客户端，以便客户端之后发回服务器。设置参数
`<cookie-name>=<cookie-value>` cookie 名和值
`Expires=<date timestamp>` cookie 最大存活时间，如果不设置的话，cookie 会成为 session cookie，这个存活时间相对浏览器设置时的时间点而言的。
`Max-Age=<number>` cookies 过期的最大时间（秒）优先级比 Expires 高
`Domain=<domain-value>` cookie 要发往的 host
`Path=<path-value>` 发送时必须带这个，否则浏览器不会发 Cookie 头
Secure 只能用于 HTTPS
HTTPOnly JavaScript 不能读取 cookie，消除 XSS 攻击
`SameSite=<samesite-value>` Strict / Lax / None 是否只发送同源服务器，部分消除 CSRF 攻击

### CORS

Access-Control-Allow-Origin 属于 response headers，表明 response 可以被指定 origin 的脚本获取

    Access-Control-Allow-Origin: *
    Access-Control-Allow-Origin: https://developer.mozilla.org

    // 告诉浏览器根据访问统一服务器时，发起请求的 origin 不同，需要分别缓存
    Vary: Origin

Access-Control-Allow-Credentials 属于 response headers，服务器告诉浏览器，当请求设置了 credentials 时，是否开放 response 给前端 JavaScript 代码。credentials 包括 cookies，authorization headers 或者 TLS client certificates

    如果是简单请求，只需要服务器设置 Access-Control-Allow-Credentials 为 true 即可
    如果是非简单请求，客户端要设置 XMLHttpRequest.withCredentials 或者 Request.credentials，服务器也要设置 Access-Control-Allow-Credentials

Access-Control-Allow-Headers 属于 response headers，服务器回应 preflight request 时要带上这个头，表明服务器接收哪些 HTTP headers
对于不带 credentials 的请求，可以使用*表示所有；反之，*表示字面意义上的*。另外，\*\*Authorization 不能被*包含，必须明确写。\*\*

Access-Control-Allow-Methods 属于 response headers，参见上面

Access-Control-Expose-Headers 属于 response headers，表明哪些 headers 可以作为 response 的一部分暴露。默认的 7 个 CORS-safelisted response headers 包括 Cache-Control / Content-Language / Content-Length / Content-Type / Expires / Last-Modified / Pragma
对于不带 credentials 的请求，可以使用*表示所有；反之，*表示字面意义上的*。\*\*另外，Authorization 不能被*包含，必须明确写。\*\*
注意只能 expose 服务器 response 里的 headers，不能用来 expose 客户端请求的 headers，暴露这些 headers 可以让 JavaScript 访问它们。

Access-Control-Max-Age 属于 response headers，表示 preflight request 可以缓存的最大时间（秒）。浏览器设置了上限

    Firefox caps this at 24 hours (86400 seconds).
    Chromium (prior to v76) caps at 10 minutes (600 seconds).
    Chromium (starting in v76) caps at 2 hours (7200 seconds).
    Chromium also specifies a default value of 5 seconds.
    A value of -1 will disable caching, requiring a preflight OPTIONS check for all calls.

Access-Control-Request-Headers 属于 response headers，用于 preflight request 中指定 headers

Access-Control-Request-Method 属于 request headers，用于 preflight request 中指定 method

Origin 属于 request headers，表示从哪里获取资源，不包含 path，只含有 host name。在 CORS 请求中会带着这个，POST 请求也会带上它，类似于 Referer，但是 Referer 包含完整路径

    // Origin: <scheme> "://" <hostname> [ ":" <port> ]
    Origin: https://developer.mozilla.org

Timing-Allow-Origin 属于 response headers，允许某些 origin 查看由 Resource Timing API 提供的资源属性，不然因为跨域限制，这些属性都会显示 0。

Do Not Track
DNT 属于 request headers，用户的 do not track 设置，可以用 navigator.doNotTrac 获取
TK 属于 response headers，表示对应 request 的跟踪状态

### Downloads

Content-Disposition 可以是 response header，也可以是 general header，表示内容是否在浏览器里 inline 显示，也就是说，是作为网页还是网页的一部分，又或者是作为附件下载
作为 main body 的 response header，inline 表示他可以在网页在显示，或者就是个网页，attachment 表示它应该被下载，多数浏览器会显示 Save as 对话框（会显示指定文件名）
Content-Disposition: inline
Content-Disposition: attachment
Content-Disposition: attachment; filename="filename.jpg"

作为 multipart body 的 header，第一个值永远是 form-data，
Content-Disposition: form-data
Content-Disposition: form-data; name="fieldName"
Content-Disposition: form-data; name="fieldName"; filename="filename.jpg"

这就是点击链接下载文件的原理，还有表单提交文件，发出请求的 header 设置。

### Message body information

Content-Length 属于 entity headers，body 的大小，以字节计算，发送给接受者

Content-Type 属于 entity headers，表明资源的 media type
在 response 中，服务器设置 Content-Type 告诉客户端返回的内容的格式。浏览器会自己甄别，所以最后的结果不一定和服务器设置的一样。想要浏览器不甄别，要设置 X-Content-Type-Options 为 nosniff
在 request 中（比如 POST 和 PUT），客户端告诉浏览器实际发送的数据是什么格式的。
boundary 用来压缩消息
Content-Type: text/html; charset=UTF-8
Content-Type: multipart/form-data; boundary=something

提交 form 时，Content-Type 由 form 中的 enctype 属性决定

```html
<form action="/" method="post" enctype="multipart/form-data">
  <input type="text" name="description" value="some text" />
  <input type="file" name="myFile" />
  <button type="submit">Submit</button>
</form>
```

```http
POST /foo HTTP/1.1
Content-Length: 68137
Content-Type: multipart/form-data; boundary=---------------------------974767299852498929531610575

-----------------------------974767299852498929531610575
Content-Disposition: form-data; name="description"

some text
-----------------------------974767299852498929531610575
Content-Disposition: form-data; name="myFile"; filename="foo.txt"
Content-Type: text/plain

(content of the uploaded file foo.txt)
-----------------------------974767299852498929531610575--

Content-Encoding 属于 entity headers，指明按什么格式压缩 media，让客户端知道如何解码资源。客户端发送 Accept-Encoding，服务器回应 Content-Encoding。
Content-Encoding: gzip
Content-Encoding: compress
Content-Encoding: deflate
Content-Encoding: identity
Content-Encoding: br

// Multiple, in the order in which they were applied
Content-Encoding: gzip, identity
Content-Encoding: deflate, gzip
```

Content-Language 属于 entity headers，表示文档是给什么人群看的，并不是说文档是什么文字写的。文档是什么文字应由 html lang 属性来表明。

Content-Location 属于 entity headers，表明返回数据的替代 location。The principal use is to indicate the URL of a resource transmitted as the result of content negotiation.
和 Location 不一样，Location 表明重定向的 URL，而 Content-Location 表明获取资源的直接 URL（以后不用再和服务器沟通就可以直接获取资源）。Location 和 response headers 关联，
Content-Location 和返回的数据关联。
对同样的请求，如果之前已经处理过了，浏览器直接打开结果页面。比如交易成功后，再次提交，会直接引导到交易成功页面。

### Proxies

Fowarded 属于 request headers，包含了代理服务器的客户端的信息，即由于代理的存在而在请求途中被修改或丢失的信息
X-Forward-For / X-Forward-Host / X-Forward-Proto

    // by: the interface where the request came into the proxy server
    // for: the client that initiated the request and subsequent proxies in a chain of proxies
    // host: Host request header
    // proto: https or http
    Forwarded: by=<identifier>; for=<identifier>; host=<host>; proto=<http|https>

Via 属于 general headers，被正向或者反向代理添加，可以在请求和回应 headers 里见到。用来跟踪消息转发，避免请求死循环，分辨 request/response 链条中发送者的 protocol capability。

Redirects
Location 属于 response headers，表明需要页面需要重定向的 URL。只有在提供 3xx（重定向）或者 201（created）状态码时才有意义。

Request context
From 属于 request headers，包含控制客户端的用户的 email 地址。如果在搞爬虫，加上这个之后，服务器可以联系你

Host 属于 request headers，指定服务器的 domain，port，在 HTTP/1.1 下请求必须携带 Host，如果没有的话，会收到 400 bad request 错误。

Referer 属于 request headers，包含本页面是由哪个页面的链接引导出来的，它让服务器知道用户是从什么地方被引导到该网站上的，可用以数据分析等。
如果 refering resource 是本地文件或者 data URL，或者从 HTTPS 网站链接到 HTTP 网站，这两种情况下，浏览器不会发送 Referer

User-Agent 属于 request headers，让服务器和网络节点知道客户端的信息

### Response context

Allow 属于 entity headers，列出资源支持的 HTTP 方法
如果服务器返回 405 Method Not Allowed，那么必须带着 Allow 头，如果 Allow 为空，代表所有方法都不可用。

Server 属于 response headers，描述服务器的信息

Range requests
Accept-Ranges 属于 response headers，服务器利用此标记来表示它支持 partial requests（断点续传）

Range 属于 request headers，和 Accept-Ranges，客户端发送 Range 给服务器以继续下载资源。

If-Range 属于 request headers，

Content-Range 属于 response headers，indicates where in a full body message a partial message belongs.
