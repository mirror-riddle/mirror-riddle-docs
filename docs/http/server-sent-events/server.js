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
