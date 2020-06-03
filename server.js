const http = require('http');
const express = require('express');
const childProcess = require('child_process');
const bodyParser = require('body-parser');
const path = require('path');

path.join(__dirname, 'deploy.sh');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/').post((req, res) => {
  console.log(req.body, res.headers);
  childProcess.execFile('./deploy.sh', [], {}, (error, stdout, stderr) => {
    if (err) {
      throw err;
    }
    console.log(stdout);
  });
});

http.createServer(app).listen(3100);
