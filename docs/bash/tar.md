---
id: tar
title: tar
---

`-c`为创建压缩文件，等于`--create`

`-x`为解压，等于`--extract`

`-f` 指定压缩或解压的目标文件(压缩包)，等于`--file`

`-t`为打印压缩包内容，等于`--list`

`-v`为显示更多信息，相当于调用了 ls 命令，等于`--verbose`

`-r`为添加内容到压缩包中，等于`--append`；`-u`也是一样，但只有在提供的新文件比压缩包里的原文件更新时才添加，等于`--update`

`-z`指压缩为`.gz`格式

`-j`指压缩为`.bz2`格式

`-a`根据压缩包后缀名决定使用哪种压缩格式

`-C`在下一步操作前进入目录

例子：

```bash
# 压缩，需要指定格式
tar -czf file.tar.gz source.js source.css
tar -cjf file.tar.bz2 source.js source.css

# 压缩，自动识别格式，上述命令可换为
tar -a -cf file.tgz source.js source.css
tar -a -cf file.tar.bz2 source.js source.css

# @把另一个压缩包内容作为源文件, 然后进入上层目录，将source.js加入压缩包
tar -a -cf file.tgz @file1.tgz -C ../ source.js

# 解压，不用指定格式，会自动识别
tar -xf file.tar.gz
tar -xf file.tar.bz2

# 要想解压到指定目录，需要先创建那个目录，然后用-C
tar -xf file.tgz -C file/
```

最重要的是`-a`, `-c`, `-x`, `-f`, `-C`, `@`
