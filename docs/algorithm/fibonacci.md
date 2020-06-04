---
id: fibonacci
title: Fibonacci
---

```javascript
/*
 * 一只青蛙可以一次跳1~n级台阶，问要跳到n级台阶一共有多少种跳法？
 * 分析: 第一次跳到n级上，剩下0级可跳，总共是F(0) = 1种；
 * 第一次跳到n-1级上，剩下1级可跳，总共是F(1) = 1种；
 * 第一次跳到n-2级上，剩下2级可跳，总共是F(2) = 1 + 1 = 2种；
 * 第一次跳到n-3级上，剩下3级可跳，总共是F(3) = 1 + 1 + 2 = 4种；
 * 第一次跳到n-n级上，剩下n级可跳，总共是F(n) = F(n - 1) + F(n -2) + ... + F(2) + F(1)；
 * 所以这蕴含了一个斐波那契数列，只不过结果是所有更小项目的和。
 *
 * F(1) = F(0) = 1,
 * F(n) = F(n - 1) + F(n -2),
 * Fsum(n) = F(n - 1) + F(n -2) + ... + F(2) + F(1)
 *
 * 一般计算斐波那契数列需要用到递归，但是JavaScript里递归过深会产生栈溢出错误，
 * 用下列方法可以规避它。虽然把每次计算的结果缓存起来也可以规避它，但是还是没有这种
 * 方法简洁。
 *
 */
function fibonacci(n) {
  var sum = 0;
  var [prev, curr] = [0, 1];
  while (n-- > 0) {
    [prev, curr, sum] = [curr, prev + curr, sum + curr];
  }
  return [curr, sum];
}

for (var i = 0; i < 10; i++) {
  console.log(i, '--->', fibonacci(i));
}
```
