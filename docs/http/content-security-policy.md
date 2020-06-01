---
id: content-security-policy
title: Content Security Policy
---

Content-Security-Policy: 对于给定页面，网站管理员控制客户端能加载哪些资源。response header allows web site administrators to control resources the user agent is allowed to load for a given page. With a few exceptions, policies mostly involve specifying server origins and script endpoints. This helps guard against cross-site scripting attacks (XSS).

## Threats

`Mitigating cross site scripting`

A primary goal of CSP is to mitigate and report XSS attacks. XSS attacks exploit the browser's trust of the content received from the server. Malicious scripts are executed by the victim's browser because the browser trusts the source of the content, even when it's not coming from where it seems to be coming from.

CSP makes it possible for server administrators to reduce or eliminate the vectors by which XSS can occur by specifying the domains that the browser should consider to be valid sources of executable scripts. A CSP compatible browser will then only execute scripts loaded in source files received from those allowlisted domains, ignoring all other script (including inline scripts and event-handling HTML attributes).

As an ultimate form of protection, sites that want to never allow scripts to be executed can opt to globally disallow script execution.

`Mitigating packet sniffing attacks`

In addition to restricting the domains from which content can be loaded, the server can specify which protocols are allowed to be used; for example (and ideally, from a security standpoint), a server can specify that all content must be loaded using HTTPS. A complete data transmission security strategy includes not only enforcing HTTPS for data transfer, but also marking all cookies with the secure flag and providing automatic redirects from HTTP pages to their HTTPS counterparts. Sites may also use the Strict-Transport-Security HTTP header to ensure that browsers connect to them only over an encrypted channel.

## Using CSP

使用方法：在服务器返回的header里添加，或者在HTML文件的添加meta。例子：

    ```html
    // headers
    Content-Security-Policy: default-src https:

    <meta http-equiv="Content-Security-Policy" content="default-src https:">
    <meta http-equiv="Content-Security-Policy-Report-Only" content="default-src https:">
    ```

A policy is described using a series of policy directives, each of which describes the policy for a certain resource type or policy area. Your policy should include a `default-src` policy directive, which is a fallback for other resource types when they don't have policies of their own (for a complete list, see the description of the `default-src` directive). A policy needs to include a `default-src` or `script-src` directive to prevent inline scripts from running, as well as blocking the use of `eval()`. A policy needs to include a `default-src` or `style-src` directive to restrict inline styles from being applied from a `<style>` element or a `style` attribute.

可以设置`report-uri`，指定报告接收服务器地址。

## Fetch directives

Fetch directives control location from which certain resource types may be loaded.

`child-src` Defines the valid sources for web workers and nested browsing contexts loaded using elements such as `<frame>` and `<iframe>`.

`connect-src` Restricts the URLs which can be loaded using script interfaces

`default-src` Serves as a fallback for the other fetch directives

`font-src` Specifies valid sources for fonts loaded using @font-face.

`frame-src` Specifies valid sources for nested browsing contexts loading using elements such as `<frame>` and `<iframe>`.

`img-src` Specifies valid sources of images and favicons.

`manifest-src` Specifies valid sources of application manifest files.

`media-src` Specifies valid sources for loading media using the `<audio>` , `<video>` and `<track>` elements.

`object-src` Specifies valid sources for the `<object>`, `<embed>`, and `<applet>` elements.

`prefetch-src` Specifies valid sources to be prefetched or prerendered.

`script-src` Specifies valid sources for JavaScript.

`script-src-elem` Specifies valid sources for JavaScript `<script>` elements.

`script-src-attr` Specifies valid sources for JavaScript inline event handlers.

`style-src` Specifies valid sources for stylesheets.

`style-src-elem` Specifies valid sources for stylesheets `<style>` elements and `<link>` elements with rel="stylesheet".

`style-src-attr` Specifies valid sources for inline styles applied to individual DOM elements.

`worker-src` Specifies valid sources for Worker, SharedWorker, or ServiceWorker scripts.

## Document directives

Document directives govern the properties of a document or worker environment to which a policy applies.

`base-uri` Restricts the URLs which can be used in a document's `<base>` element.

`plugin-types` Restricts the set of plugins that can be embedded into a document by limiting the types of resources which can be loaded.

`sandbox` Enables a sandbox for the requested resource similar to the `<iframe>` sandbox attribute.

## Navigation directives

Navigation directives govern to which location a user can navigate to or submit a form to, for example.

`form-action` Restricts the URLs which can be used as the target of a form submissions from a given context.

`frame-ancestors` Specifies valid parents that may embed a page using `<frame>`, `<iframe>`, `<object>`, `<embed>`, or `<applet>`.

`navigate-to` Restricts the URLs to which a document can initiate navigation by any means, including `<form>` (if form-action is not specified), `<a>`, window.location, window.open, etc.
