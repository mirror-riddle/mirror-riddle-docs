---
id: npm_workspaces
title: Npm Workspaces
---

外层 package.json (与 packages 目录同级)指定

```json
{
  "private": true,
  "workspaces": ["packages/*"]
}
```

packages 之下的包 package.json 里指定 name, version

```json
{
  "name": "xxx",
  "version": "xxx"
}
```
