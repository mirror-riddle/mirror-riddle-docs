const http = require('http');
const express = require('express');
const childProcess = require('child_process');
const bodyParser = require('body-parser');
const path = require('path');

path.join(__dirname, 'deploy.sh');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.post('/', (req, res) => {
  res.sendStatus(200);
  childProcess.execFile('./deploy.sh', [], {}, (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });
});

http.createServer(app).listen(3100);
