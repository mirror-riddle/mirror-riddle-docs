# Microtask

[Microtask](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)

[Microtasks and the Javascript runtime](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth)

A microtask is a short function which is executed after the function or program which created it exits and only if the JavaScript execution stack is empty, but before returning control to the event loop being used by the user agent to drive the script's execution environment. This event loop may be either the browser's main event loop or the event loop driving a web worker. This lets the given function run without the risk of interfering with another script's execution, yet also ensures that the microtask runs before the user agent has the opportunity to react to actions taken by the microtask.

一个 微任务（microtask）就是一个简短的函数，当创建该函数的函数执行之后，并且 只有当 Javascript 调用栈为空，而控制权尚未返还给被 user agent 用来驱动脚本执行环境的事件循环之前，该微任务才会被执行。 事件循环既可能是浏览器的主事件循环也可能是被一个 web worker 所驱动的事件循环。这使得给定的函数在没有其他脚本执行干扰的情况下运行，也保证了微任务能在用户代理有机会对该微服务带来的行为做出反应之前运行。

## Tasks and microtasks

### Tasks

A task is any JavaScript code which is scheduled to be run by the standard mechanisms such as initially starting to run a program, an event callback being run, or an interval or timeout being fired. These all get scheduled on the `task queue`.

1. A new JavaScript program or subprogram is executed (such as from a console, or by running the code in a `<script>` element) directly.

2. An event fires, adding the event's callback function to the task queue.

3. A timeout or interval created with `setTimeout()` or `setInterval()` is reached, causing the corresponding callback to be added to the task queue.

The event loop driving your code handles these tasks one after another, in the order in which they were enqueued. Only tasks which were already in the task queue when the event loop pass began will be executed during the current iteration. The rest will have to wait until the following iteration.

### Microtasks

1. each time a task exits, the event loop checks to see if the task is returning control to other JavaScript code. If not, it runs all of the microtasks in the microtask queue. The microtask queue is, then, processed multiple times per iteration of the event loop, including after handling events and other callbacks.

2. if a microtask adds more microtasks to the queue by calling queueMicrotask(), those newly-added microtasks execute before the next task is run. That's because the event loop will keep calling microtasks until there are none left in the queue, even if more keep getting added.

## When to use microtasks

1. Ensuring ordering on conditional use of promises

2. Batching operations.

You can also use microtasks to collect multiple requests from various sources into a single batch, avoiding the possible overhead involved with multiple calls to handle the same kind of work.

```javascript
const messageQueue = [];

let sendMessage = message => {
  messageQueue.push(message);

  if (messageQueue.length === 1) {
    queueMicrotask(() => {
      const json = JSON.stringify(messageQueue);
      messageQueue.length = 0;
      fetch("url-of-receiver", json);
    });
  }
};
```

When sendMessage() gets called, the specified message is first pushed onto the message queue array. Then things get interesting.

If the message we just added to the array is the first one, we enqueue a microtask that will send a batch. The microtask will execute, as always, when the JavaScript execution path reaches the top level, just before running callbacks. That means that any further calls to sendMessage() made in the interim will push their messages onto the message queue, but because of the array length check before adding a microtask, no new microtask is enqueued.

When the microtask runs, then, it has an array of potentially many messages waiting for it. It starts by encoding it as JSON using the JSON.stringify() method. After that, the array's contents aren't needed anymore, so we empty the messageQueue array. Finally, we use the fetch() method to send the JSON string to the server.

This lets every call to sendMessage() made during the same iteration of the event loop add their messages to the same fetch() operation, without potentially having other tasks such as timeouts or the like delay the transmission.

The server will receive the JSON string, then will presumably decode it and process the messages it finds in the resulting array.
