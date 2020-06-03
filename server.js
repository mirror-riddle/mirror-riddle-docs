const http = require('http');
const express = require('express');
const childProcess = require('child_process');

const app = express();
app.post('/', (req, res) => {
  console.log(req.body);
  childProcess.execFile('./deploy.sh');
});

http.createServer(app).listen(3100);
