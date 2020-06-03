---
id: fetch
title: Fetch
---

浏览器有一个 connection pool，连接池包含了多个连接，每个连接由 origin 和 credentials 属性来区分。
浏览器和服务器建立连接的过程
建立 HTTP connection
如果 credentials 为 true，发送 TLS client certificate
如果成功，将连接加入连接池

ReadableStream 代表 stream of data（数据流）

CORS protocol 为了允许跨域分享 response，建立在 HTTP 之上，允许 response 声明他们可以被其他 origin 分享。

CORS request 是一个携带了 Origin 头的 HTTP 请求，但是这并不是说存在 Origin 就一定是 CORS request，因为所有非 GET, HEAD 的请求
都会带上 Origin 头。

CORS-preflight-request 是用来检查服务器是否允许跨域的跨域请求，它使用 OPTIONS 方法，包含以下 headers。
Access-Control-Request-Method / Access-Control-Request-Headers

对于 CORS-request，response 可以包含以下 headers
Access-Control-Allow-Origin
Access-Control-Allow-Credentials
Access-Control-Allow-Methods
Access-Control-Allow-Headers
Access-Control-Max-Age
Access-Control-Expose-Headers
如果服务器不打算支持 CORS，那么它应该对跨域访问返回 403 forbidden 错误

Credentials 包含 HTTP Cookies，TLS client certificates，以及 authentication entries(for HTTP authentication)

authentication entries 是 username，password，realm 的元组，用于 HTTP authentication

local scheme 包括"about", "blob", "data"，HTTP(S) scheme 包括"http"，"https"，network scheme 包含"ftp"以及 HTTP(S) scheme，
fetch scheme 包含"file", network scheme, local scheme

forbidden methods 包含 CONNECT, TRACE, TRACK。

会被 normalize 的方法包含 DELETE, GET, HEAD, OPTIONS, POST, PUT

CORS non-wildcard request header 是 Authorization，所以 Authentication 不能用\*来包含。

CROS-safelisted methods 包含 GET, POST, HEAD

CORS-safelisted response header 包含 Cache-Control，Content-Language，Content-Length，Content-Type，Expires，Last-Modified，
Pragma

CORS-safelisted request header 包含 Accept，Accept-Language，Content-Language，Content-Type

no-CORS-safelisted request header 包含 Accept，Accept-Language，Content-Language，Content-Type
