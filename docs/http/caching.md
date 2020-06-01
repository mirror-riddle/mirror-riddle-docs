---
id: caching
title: caching
---

重用已经获取的资源，可以极大地加速网页打开速度。web caching减少了延迟和网络拥堵，减少显示资源所需要的时间。

缓存类别

![http cache type](assets/http-cache-type.png)

1. private browser cache
存储的数据针对单个用户, 浏览器缓存所有通过HTTP获取的资源。

2. shared proxy cache
存储的数据针对多个用户, proxy缓存资源，给其下的多个客户端使用

3. browser, proxy, gateway, CDN, reverse proxy, load balancer.

## Targets of caching operations

通常HTTP缓存只针对GET请求的回应。

1. Successful results of a retrieval request: a 200 (OK) response to a GET request containing a resource like HTML documents, images or files.

2. Permanent redirects: a 301 (Moved Permanently) response.

3. Error responses: a 404 (Not Found) result page.

4. Incomplete results: a 206 (Partial Content) response.

5. Responses other than GET if something suitable for use as a cache key is defined.

## Controlling caching

`Cache-Control` header specify directives for caching mechanisms in both requests and responses.

1. no caching

    ```http
    Cache-Control: no-store
    ```

2. cache but revalidate: A cache will send the request to the origin server for validation before releasing a cached copy.

    ```http
    Cache-Control: no-cache
    ```

3. private and public caches

    ```http
    Cache-Control: private
    Cache-Control: public
    ```

4. expiration

    ```http
    Cache-Control: max-age=200000
    ```

5. validation

    ```http
    Cache-Control: must-revalidate
    ```

## Freshness

Once a resource is stored in a cache, it could theoretically be served by the cache forever. Caches have finite storage so items are periodically removed from storage. This process is called `cache eviction`. On the other side, some resources may change on the server so the cache should be updated. As HTTP is a client-server protocol, servers can't contact caches and clients when a resource changes; they have to communicate an expiration time for the resource. Before this expiration time, the resource is fresh; after the expiration time, the resource is stale. Eviction algorithms often privilege fresh resources over stale resources. Note that a stale resource is not evicted or ignored; when the cache receives a request for a stale resource, it forwards this request with a If-None-Match to check if it is in fact still fresh. If so, the server returns a 304 (Not Modified) header without sending the body of the requested resource, saving some bandwidth.

![http staleness](assets/http-staleness.png)

## Revved Resources

Web developers invented a technique that Steve Souders called revving[1]. Infrequently updated files are named in specific way: in their URL, usually in the filename, a revision (or version) number is added. That way each new revision of this resource is considered as a resource on its own that never changes and that can have an expiration time very far in the future, usually one year or even more. In order to have the new versions, all the links to them must be changed, that is the drawback of this method: additional complexity that is usually taken care of by the tool chain used by Web developers. When the infrequently variable resources change they induce an additional change to often variable resources. When these are read, the new versions of the others are also read.

This technique has an additional benefit: updating two cached resources at the same time will not lead to the situation where the out-dated version of one resource is used in combination with the new version of the other one. This is very important when web sites have CSS stylesheets or JS scripts that have mutual dependencies, i.e., they depend on each other because they refer to the same HTML elements.

![http revved](assets/http-revved.png)

## Cache Validation

When a cached document's expiration time has been reached, it is either validated or fetched again. Validation can only occur if the server provided either a strong validator or a weak validator.

Revalidation is triggered when the user presses the reload button. It is also triggered under normal browsing if the cached response includes the "Cache-control: must-revalidate" header. Another factor is the cache validation preferences in the Advanced->Cache preferences panel. There is an option to force a validation each time a document is loaded.

### Etags

The ETag response header is an opaque-to-the-useragent value that can be used as a strong validator. That means that a HTTP user-agent, such as the browser, does not know what this string represents and can't predict what its value would be. If the ETag header was part of the response for a resource, the client can issue an If-None-Match in the header of future requests – in order to validate the cached resource.

The Last-Modified response header can be used as a weak validator. It is considered weak because it only has 1-second resolution. If the Last-Modified header is present in a response, then the client can issue an If-Modified-Since request header to validate the cached document.

When a validation request is made, the server can either ignore the validation request and response with a normal 200 OK, or it can return 304 Not Modified (with an empty body) to instruct the browser to use its cached copy. The latter response can also include headers that update the expiration time of the cached document.

## Varying Responses

The Vary HTTP response header determines how to match future request headers to decide whether a cached response can be used rather than requesting a fresh one from the origin server.

When a cache receives a request that can be satisfied by a cached response that has a Vary header field, it must not use that cached response unless all header fields as nominated by the Vary header match in both the original (cached) request and the new request.

![http vary](assets/http-vary.png)

This can be useful for serving content dynamically, for example. When using the Vary: User-Agent header, caching servers should consider the user agent when deciding whether to serve the page from cache. If you are serving different content to mobile users, it can help you to avoid that a cache may mistakenly serve a desktop version of your site to your mobile users. In addition, it can help Google and other search engines to discover the mobile version of a page, and might also tell them that no Cloaking is intended.

```http
Vary: User-Agent
```
