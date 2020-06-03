---
id: webhooks
title: Webhooks
---

github webhooks 可以在项目发生变动时（push, issue 等），向指定 URL 发送 POST 请求，在服务器处理这一请求就可以针对项目变化做些工作（自动部署）。

服务器端需要做以下工作：

1. 设置环境变量`SECRET_TOKEN`,可以用以下命令生成 token。

```bash
ruby -rsecurerandom -e 'puts SecureRandom.hex(20)'
# b9120719fb2c343d1b0a42285327557f7e82ea90

# 编辑 ~/.bash_profile
export SECRET_TOKEN="b9120719fb2c343d1b0a42285327557f7e82ea90"

# 使上述改变生效
source ~/.bash_profile
```

2. `server.js`, 用于接收 webhooks 的 web 服务，代码如下，需要用到 body-parser 对 req.body 进行转换，child_process 调用 shell 脚本。

```javascript
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
    // 根据req.body内容做相应处理
    execFile('./deploy.sh', [], {}, (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      console.log(stdout);
    });
  });

http.createServer(app).listen(3100);
```

3. 用 pm2 来启动`server.js`, 管理 node 进程，查看日志

```bash
npm install -g pm2
pm2 start server.js # 服务名为server
pm2 log server
```
