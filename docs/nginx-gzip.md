---
id: nginx-gzip
title: nginx 开启 gzip
---

### 配置

[参考资料](https://www.cnblogs.com/Renyi-Fan/p/11047490.html)

```nginx
gzip on|off; #是否开启gzip

gzip_buffers 32 4K| 16 8K #缓冲(压缩在内存中缓冲几块? 每块多大?)

gzip_comp_level [1-9] #推荐6 压缩级别(级别越高,压得越小,越浪费CPU计算资源)

gzip_disable #正则匹配UA 什么样的URI不进行gzip压缩

gzip_min_length 200 # 开始压缩的最小长度(再小就不要压缩了,意义不大)

gzip_http_version 1.0|1.1 # 开始压缩的http协议版本(可以不设置,目前几乎全是1.1协议)

gzip_proxied # 设置请求者代理服务器,该如何缓存内容

gzip_types text/javascript application/css # 对哪些类型的文件用压缩 如txt,xml,html ,css

gzip_vary on|off # 是否在http header中添加Vary: Accept-Encoding，建议开启
```

### 注意点

- 二进制资源：例如图片/mp3 这样的二进制文件,不必压缩；因为压缩率比较小, 比如 100->80 字节,而且压缩也是耗费 CPU 资源的。

- 太小的文件不必压缩。
