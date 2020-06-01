---
id: cors
title: CORS
---

Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. A web application executes a cross-origin HTTP request when it requests a resource that has a different origin (domain, protocol, or port) from its own.

CORS（跨域资源共享）: 服务器用额外的http headers告诉浏览器, 给予运行在某个origin的app权限，让其访问位于另一个orgin的资源。这样发送的请求叫做跨域请求。

处于安全原因，浏览器限制了从脚本中发起的跨域请求，因此网页APP只能访问同一origin的资源，除非另一个origin的服务器response包含了正确的跨域header。

![cors principle](assets/cors-principle.png)

## Simple requests

简单请求不触发cors preflight, 满足以下条件：

1. 方法：GET, HEAD, POST

2. 自设定headers: Accept, Accept-Language, Content-Language, Content-Type, DPR, DownLink, Save-Data, Viewport-Width, Width

3. Content-Type: application/x-www-form-urlencoded, multipart/form-data, text/plain

4. No event listeners are registered on any XMLHttpRequestUpload object used in the request; these are accessed using the XMLHttpRequest.upload property.

5. No ReadableStream object is used in the request.

只要服务器设置正确的Access-Control-Allow-Origin即可。

## Preflighted requests

首先向目标服务器发送OPTIONS请求，以确定是否可以发送实际请求。

![preflight-correct](assets/preflight-correct.png)

OPTIONS is an HTTP/1.1 method that is used to determine further information from servers, and is a safe method, meaning that it can't be used to change the resource.

发送的OPTIONS请求携带着两个headers：

  ```http
  Access-Control-Request-Method: Post
  Access-Control-Request-Headers: Content-Type
  ```

告诉服务器实际请求的方法以及自设定headers, 服务器根据这两项来确定是否接受实际请求。

服务器的回应：

  ```http
  Access-Control-Allow-Origin: http://foo.example
  Access-Control-Allow-Methods: POST, GET, OPTIONS
  Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
  Access-Control-Max-Age: 86400
  ```

Access-Control-Max-Age 设置preflight request的缓存时间，在限定时间内可以直接发送实际请求。

## preflighted request with redirects

Not all browsers currently support following redirects after a preflighted request. If a redirect occurs after a preflighted request, some browsers currently will report an error message such as the following.

>The request was redirected to 'https://example.com/foo', which is disallowed for cross-origin requests that require preflight

>Request requires preflight, which is disallowed to follow cross-origin redirect

The CORS protocol originally required that behavior but was subsequently changed to no longer require it. However, not all browsers have implemented the change, and so still exhibit the behavior that was originally required.

Until browsers catch up with the spec, you may be able to work around this limitation by doing one or both of the following:

Change the server-side behavior to avoid the preflight and/or to avoid the redirect
Change the request such that it is a simple request that doesn’t cause a preflight
If that's not possible, then another way is to:

Make a simple request (using Response.url for the Fetch API, or XMLHttpRequest.responseURL) to determine what URL the real preflighted request would end up at.
Make another request (the “real” request) using the URL you obtained from Response.url or XMLHttpRequest.responseURL in the first step.
However, if the request is one that triggers a preflight due to the presence of the Authorization header in the request, you won’t be able to work around the limitation using the steps above. And you won’t be able to work around it at all unless you have control over the server the request is being made to.

## request with credentials

The most interesting capability exposed by both XMLHttpRequest or Fetch and CORS is the ability to make "credentialed" requests that are aware of HTTP cookies and HTTP Authentication information. By default, in cross-site XMLHttpRequest or Fetch invocations, browsers will not send credentials. A specific flag has to be set on the XMLHttpRequest object or the Request constructor when it is invoked.

In this example, content originally loaded from http://foo.example makes a simple GET request to a resource on http://bar.other which sets Cookies. Content on foo.example might contain JavaScript like this:

  ```javascript
  const invocation = new XMLHttpRequest();
  const url = 'http://bar.other/resources/credentialed-content/';

  function callOtherDomain() {
    if (invocation) {
      invocation.open('GET', url, true);
      invocation.withCredentials = true;
      invocation.onreadystatechange = handler;
      invocation.send();
    }
  }
  ```

Line 7 shows the flag on XMLHttpRequest that has to be set in order to make the invocation with Cookies, namely the withCredentials boolean value. By default, the invocation is made without Cookies. Since this is a simple GET request, it is not preflighted, but the browser will reject any response that does not have the Access-Control-Allow-Credentials: true header, and not make the response available to the invoking web content.


Here is a sample exchange between client and server:

  ```http
  GET /resources/access-control-with-credentials/ HTTP/1.1
  Host: bar.other
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:71.0) Gecko/20100101 Firefox/71.0
  Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
  Accept-Language: en-us,en;q=0.5
  Accept-Encoding: gzip,deflate
  Connection: keep-alive
  Referer: http://foo.example/examples/credential.html
  Origin: http://foo.example
  Cookie: pageAccess=2


  HTTP/1.1 200 OK
  Date: Mon, 01 Dec 2008 01:34:52 GMT
  Server: Apache/2
  Access-Control-Allow-Origin: https://foo.example
  Access-Control-Allow-Credentials: true
  Cache-Control: no-cache
  Pragma: no-cache
  Set-Cookie: pageAccess=3; expires=Wed, 31-Dec-2008 01:34:53 GMT
  Vary: Accept-Encoding, Origin
  Content-Encoding: gzip
  Content-Length: 106
  Keep-Alive: timeout=2, max=100
  Connection: Keep-Alive
  Content-Type: text/plain
  ```

[text/plain payload]
Although line 10 contains the Cookie destined for the content on http://bar.other, if bar.other did not respond with an Access-Control-Allow-Credentials: true (line 17) the response would be ignored and not made available to web content.

Credentialed requests and wildcards
When responding to a credentialed request, the server must specify an origin in the value of the Access-Control-Allow-Origin header, instead of specifying the "*" wildcard.

Because the request headers in the above example include a Cookie header, the request would fail if the value of the Access-Control-Allow-Origin header were "*". But it does not fail: Because the value of the Access-Control-Allow-Origin header is "http://foo.example" (an actual origin) rather than the "*" wildcard, the credential-cognizant content is returned to the invoking web content.

Note that the Set-Cookie response header in the example above also sets a further cookie. In case of failure, an exception—depending on the API used—is raised.

Third-party cookies
Note that cookies set in CORS responses are subject to normal third-party cookie policies. In the example above, the page is loaded from foo.example, but the cookie on line 20 is sent by bar.other, and would thus not be saved if the user has configured their browser to reject all third-party cookies.

## http response headers

服务器response

Access-Control-Allow-Origin: 允许哪些origin访问服务器, 如果它是可以根据请求的origin变化的，还要设置Vary: Origin

Access-Control-Expose-Headers: 浏览器能够“看到”哪些headers

Access-Control-Max-Age: preflight request 缓存时间

Access-Control-Allow-Credentials: 设置当请求设定了证书时，response是否“可见”，必须设定为true才可见。

Access-Control-Allow-Methods: preflight request 完成后response设定哪些方法可以用

Access-Control-Allow-Headers: preflight request 完成后response设定哪些headers可以用

## http request headers

客户端request，由浏览器自动设置

Origin: 发起请求的URL

Access-Control-Request-Method: 在发起preflight request的时候设定实际请求的方法

Access-Control-Request-Headers: 在发起preflight request的时候设定实际请求的headers
