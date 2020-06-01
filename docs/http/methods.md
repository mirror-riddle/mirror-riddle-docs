---
id: methods
title: methods
---

1. GET 用于获取资源，也应该只获取资源，没有副作用。

2. HEAD 和GET请求一样获取response, 但是response只有headers，没有body

3. POST 提交信息到指定URL，通常会改变服务器状态或者产生副作用。当使用form提交时，请求body的类型由Content-Type决定

    `application/x-www-form-urlencoded`: the keys and values are encoded in key-value tuples separated by '&', with a '=' between the key and the value. Non-alphanumeric characters in both keys and values are percent encoded: this is the reason why this type is not suitable to use with binary data (use multipart/form-data instead)

    `multipart/form-data`: each value is sent as a block of data ("body part"), with a user agent-defined delimiter ("boundary") separating each part. The keys are given in the `Content-Disposition` header of each part.

    `text/plain`

    当不使用form，body的类型没有限制。HTTP1.1设定POST的作用：

    Annotation of existing resources

    Posting a message to a bulletin board, newsgroup, mailing list, or similar group of articles;

    Adding a new user through a signup modal;

    Providing a block of data, such as the result of submitting a form, to a data-handling process;

    Extending a database through an append operation.

4. PUT replaces all current representations of the target resource with the request payload.

    一次还是多次PUT请求，结果是一样的，后面的结果会覆盖前面的，也就是说没有副作用。
    POST请求不同，它可以有副作用，比如多次提交订单导致订单量递增。

5. DELETE deletes the specified resource.

6. CONNECT establishes a tunnel to the server identified by the target resource.

7. OPTIONS used to describe the communication options for the target resource.

    用来确定服务器允许什么访问方法，以及发起preflight request，以确定服务器的Access-Control-Allow-Methods, Access-Control-Allow-Headers

8. TRACE performs a message loop-back test along the path to the target resource.

9. PATCH is used to apply partial modifications to a resource.
