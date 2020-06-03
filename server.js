const http = require('http');
const express = require('express');
const { execFile } = require('child_process');
const { json, urlencoded } = require('body-parser');

const app = express();
app.use(json(), urlencoded({ extended: false }));
app
  .route('/')
  .get('/', (req, res) => {
    res.sendStatus(200);
  })
  .post('/', (req, res) => {
    res.sendStatus(200);
    execFile('./deploy.sh', [], {}, (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      console.log(stdout);
    });
  });

http.createServer(app).listen(3100);
