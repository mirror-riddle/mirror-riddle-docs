---
id: script
title: Script
---

DOMContentLoaded 事件在初始 HTML 文件完成下载、解析后触发，不等待 stylesheets, scripts, images 和 subframes 加载完成。
load 事件在页面完全加载后触发，包括所有依赖资源，比如 stylesheets，images 等。

如果`<script>`没有设置 async、defer、type="module"，或者是 inline scripts, 一旦 HTML 解析到该标签，脚本会立即下载并执行，结束之前 HTML 都不会再继续解析后面的内容。

1. async 异步
   对于 classic scripts，浏览器会并行下载、解析、执行这些 scripts；
   对于 module scripts，浏览器会将这些 scripts 和它们的依赖脚本并行下载、解析、执行。
   async 可以消除 parser-blocking javascript 问题，通常情况下，浏览器会下载、解析、执行一个 script 后，才会继
   续解析之后的 HTML。defer 也有类似效果。

2. defer 推迟
   表示脚本应该在 document 解析完成后，但尚未启动 DOMContentLoaded 事件时下载、解析、执行，在脚本执行
   之后才会启动 DOMContentLoaded 事件。
   如果`<script>`标签没有设置 src，defer 无效。
   defer 对 module scripts 无效，因为它们默认 defer。
   带 defer 标签的 scripts 会按照它们出现的顺序执行。
   defer 可以消除 parser-blocking javascript 问题。

async 和 defer 的区别是：
async 脚本并行下载、解析、执行，defer 脚本按顺序下载、解析、执行。
async 是遇到脚本标签就开始异步、并行加载，defer 是推迟到 document 解析完成后才开始顺序加载。
简而言之，async 异步并行，defer 推迟顺行。
由于 defer 脚本执行完毕后才触发 DOMContentLoaded 事件，因此一定可以捕捉到该事件，
而 async 脚本就不一定了，因为这种情况下脚本执行时 DOMContentLoaded 事件可能早就被触发了。
当然，defer 也使得 DOMContentLoaded 事件晚触发了，页面首次渲染的时间也要随之推迟。
如果同时设置 async 和 defer，async 优先，如果浏览器不支持 async 却支持 defer，那么就会采用 defer。

3. crossorigin 跨域
   对`<audio>, <img>, <link>, <script>, <video>`标签有效
   决定了元素如何处理跨域请求
   值为 anonymous 时，跨域时不通过 cookies，client-side SSL certificates, 或者 HTTP authentication 提供任何
   user credentials
   值为 use-credentials 时，跨域时携带 user credentials
   其他值一律视为 anonymous
   当设置 crossorigin 时，跨域出错时 window.onerror 会给出更多信息。
   To allow error logging for sites which use a separate domain for static media, use this attribute.

4. integrity 完整性
   包括了 inline metadata，浏览器可以用它来分辨获取的资源是否被篡改

5. nomodule 非模块
   表示此脚本不应该在支持 es2015 modules 的浏览器中执行。可以用来支持那些不支持 module JavaScript
   的浏览器

6. nonce 临时随机数
   临时随机数（）用来作为白名单，以使得脚本绕过 script-src Content-Security-Policy。 The server must generate
   a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as
   bypassing a resource's policy is otherwise trivial.

7. src 脚本路径

8. type 类型
   忽略或者是 text/javascript, 表示这是 JavaScript，没必要写。
   module，表示这是 JavaScript module，执行脚本不会受到 charset 和 defer 的影响。Unlike classic scripts, module
   scripts require the use of the CORS protocol for cross-origin fetching.
   其他值，文件内容将被作为 data block 对待，浏览器不会执行它。Developers must use a valid MIME type that is
   not a JavaScript MIME type to denote data blocks. The src attribute will be ignored.
