---
id: server-sent-events
title: server sent events
---

Traditionally, a web page has to send a request to the server to receive new data; that is, the page requests data from the server. With server-sent events, it's possible for a server to send new data to a web page at any time, by pushing messages to the web page. These incoming messages can be treated as Events + data inside the web page.

## Client Code

  ```javascript
  const eventSource = new EventSource('http://127.0.0.1:4000/event');
  eventSource.addEventListener('cur_time', event => {
    const data = JSON.parse(event.data);
    const div = document.querySelector('div#cur_time');
    div.innerText = new Date(data.time);
  });
  // eventSource.close();
  ```

  ```html
  <!doctype html>
  <html>
    <head>
      <script src="client.js"></script>
    </head>
    <body>
      <div id="cur_time"></div>
    </body>
  </html>
  ```

## Server Code

  ```javascript
  const http = require('http');
  const port = '4000';
  const hostname = '127.0.0.1';
  const server = http.createServer((req, res)=> {
    if (req.url === '/event') {
      res.writeHead(200, {
        // 'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/event-stream',
      });
      const data = JSON.stringify({time: Date.now()});
      res.write(`event: cur_time\nretry: 10000\ndata: ${data}\n\n`);
      res.end();
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World!');
    }
  });
  server.listen(port, hostname, () => {
    console.log(`server runing at http://${hostname}:${port}/`);
  });
  ```

## Event stream format

utf-8编码文本；

冒号开头为注释；

消息以`\n\n`结尾；

消息内的每一项以`\n`隔开；

可以不时发送注释给客户端，以保持连接状态；

IE不支持此API；

多条消息可以合在一起发送，以`\n\n`隔开即可。

每条消息可以包含以下字段，字段名后加冒号，后面再加内容，以`\n`结尾。

1. `event`
A string identifying the type of event described. If this is specified, an event will be dispatched on the browser to the listener for the specified event name; the website source code should use addEventListener() to listen for named events. The onmessage handler is called if no event name is specified for a message.

2. `data`
The data field for the message. When the EventSource receives multiple consecutive lines that begin with data:, it will concatenate them, inserting a newline character between each one. Trailing newlines are removed.

3. `id`
The event ID to set the EventSource object's last event ID value.

4. `retry`
The reconnection time to use when attempting to send the event. This must be an integer, specifying the reconnection time in milliseconds. If a non-integer value is specified, the field is ignored.

All other field names are ignored.

> Note: If a line doesn't contain a colon, the entire line is treated as the field name with an empty value string.
