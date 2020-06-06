---
id: debounce-throttle
title: Debounce Throttle
---

### Debounce 防抖

防抖是把多次函数调用合并为一次。

以电梯为例，电梯门关闭正要下行，但是此时有人按下开门按钮，于是电梯会停止下行，开门让他进来，然后关门继续下行。如果又有人按下开门按钮，电梯又会打开让他进来，再下行。这个机制让电梯延迟了下行，但是节约了资源。

1. 最简单版本，只保证延迟执行

   ```javascript
   function debounce(func, delay) {
     let id = null;
     return function () {
       if (id) {
         clearTimeout(id);
       }
       id = setTimeout(func, delay);
     };
   }
   ```

2. 保持 this 和 event 参数

   ```javascript
   function debounce(func, delay) {
     let id = null;
     return function (...args) {
       if (id) {
         clearTimeout(id);
       }
       id = setTimeout(func.bind(this, ...args), delay);
     };
   }
   ```

3. 触发后立即执行一次，然后等待规定时间后才可再次执行

   ```javascript
   function debounce(func, delay, leading) {
     let id = null;
     return function (...args) {
       if (id) {
         clearTimeout(id);
       }
       if (id === null && !!leading === true) {
         func.call(this, ...args);
         id = setTimeout(function () {
           // 如果在固定时间后设置id = null, 并且这段时间内事件没有发生，那么立即触发特性再次生效。
           // 如果注释掉id = null, 立即触发特性只会生效一次。
           id = null;
         }, delay);
       } else {
         id = setTimeout(func.bind(this, ...args), delay);
       }
     };
   }
   ```

4. 取消 debounce， 立即执行 debounce

   ```javascript
   function debounce(func, delay, leading) {
     let id = null;
     let lastArgs, lastThis;

     function callFunc() {
       func.call(lastThis, lastArgs);
     }

     function bindFunc() {
       return func.bind(lastThis, lastArgs);
     }

     const debounced = function (...args) {
       lastArgs = args;
       lastThis = this;
       if (id) {
         clearTimeout(id);
       }
       if (id === null && !!leading === true) {
         callFunc();
         id = setTimeout(function () {
           // 如果在固定时间后设置id = null, 并且这段时间内事件没有发生，那么立即触发特性再次生效。
           // 如果注释掉id = null, 立即触发特性只会生效一次。
           id = null;
         }, delay);
       } else {
         id = setTimeout(bindFunc(), delay);
       }
     };
     debounced.cancel = function () {
       if (id) {
         clearTimeout(id);
         id = null;
       }
     };
     debounced.flush = function () {
       clearTimeout(id);
       id = null;
       func.call(lastThis, lastArgs);
     };
     return debounced;
   }
   ```

### Throttle 节流

节流是在规定时间内只允许函数执行一次。节流和防抖的区别是，节流保证函数在规定时间内必然会执行一次。

以无限滚动页面为例，我们需要监测滚动条是否已经接近底部，如果已经接近，就发起 ajax 请求获取更多内容并添加到页面中。这种情况下就不可以用防抖了，因为防抖只有在滚动条不再滚动后一段时间时才触发。节流机制可以周期性地监测滚动条的位置，既能及时触发，又不至于过频触发。

两种方案，一种是通过比较时间戳差是否大于规定时间来确定是否执行，另一种是使用定时器，第一次触发启动定时器，以后再触发如果定时器存在，就不执行，直到定时器执行，再执行函数，清空定时器。

1. 时间戳：事件触发时，立即执行一次；之后如果继续触发的话，隔 wait 时间后执行一次；停止事件触发就不会执行。（leading）

   ```javascript
   function throttle(func, wait) {
     let lastThis, lastArgs;
     let prevTime = 0;
     return function (...args) {
       const time = Date.now();
       const remaining = wait - (time - prevTime);
       lastThis = this;
       lastArgs = args;
       if (remaining <= 0) {
         func.apply(lastThis, lastArgs);
         prevTime = time;
       }
     };
   }
   ```

2. 定时器：事件触发时，隔 wait 时间后执行一次；继续触发，还是隔 wait 时间触发一次；停止触发后依然会在 wait 时间后触发一次。(tailing)

   ```javascript
   function throttle(func, wait) {
     let lastThis, lastArgs;
     let timeId = null;
     return function (...args) {
       lastThis = this;
       lastArgs = args;
       if (timeId === null) {
         timeId = setTimeout(function () {
           func.apply(lastThis, lastArgs);
           timeId = null;
         }, wait);
       }
     };
   }
   ```

3. 时间戳和定时器结合

   ```javascript
   function throttle(func, wait) {
     let timeId = null,
       previous = 0,
       lastThis,
       lastArgs;

     return function () {
       const now = Date.now();
       const remaining = wait - (now - previous);
       lastThis = this;
       lastArgs = args;
       if (remaining <= 0 || remaining > wait) {
         if (timeId) {
           clearTimeout(timeId);
           timeId = null;
         }
         func.apply(lastThis, lastArgs);
         previous = now;
       } else if (timeout === null) {
         timeId = setTimeout(function () {
           previous = Date.now();
           func.apply(lastThis, lastArgs);
           timeId = null;
         }, remaining);
       }
     };
   }
   ```

### requestAnimationFrame

rAF 包装的函数会在页面下次重绘前执行。如果该函数也调用了 rAF 的话，就相当于经过一个周期为 16.7ms 的节流处理。

```javascript
function requestCallback(timeStamp) {
  // do something
  // requestAnimationFrame(requestCallback);
}
requestAnimationFrame(requestCallback);
```

防抖和 rAF 结合

```javascript
function debounce(func) {
  let time;
  return function () {
    cancelAnimationFrame(time);
    time = requestAnimationFrame();
  };
}
```

优点：

1. 由浏览器决定最好的调用时机。
2. 简单而标准的 API，未来不会改变，易维护。

缺点：

1. IE9 不支持，不能在 node 环境下用。
2. 如果浏览器标签页不活动的话，不会执行。
