---
id: console
title: console
---

# console

一些需要留意的 API。

## logging functions

1. `assert(condition, ...data)`

   如果条件不成立，打印后面的参数。也就是说要在假设不成立的情况下才打印消息。

## counting functions

1. `count(label)`

   如果未设置过 label，设置其次数为 1；否则设置其次数加 1；无论那种情况，都会输出其当前次数

2. `countReset(label)`

   如果 label 没有设置过，什么也不做；反之，设置其次数为 0

## timing functions

1. `time(label)`

   如果没有设置过 label 计时器，设置 label 计时器起点为当前时间；重复调用不会改变计时起点

2. `timeLog(label, ...data)`

   打印 label 计时器已经过的时间，打印 data

3. `timeEnd(label)`

   停止 label 计时器
