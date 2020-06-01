---
id: taobao-mirrors
title: taobao mirrors
---

npm, yarn 均可 [淘宝镜像源](https://developer.aliyun.com/mirror/NPM?from=tnpm)

```bash
# npm
npm config set "registry" "http://registry.npm.taobao.org"

# electron, electron-builder, electron-rebuild
npm config set "electron_mirror" "http://npm.taobao.org/mirrors/electron/"
npm config set "electron_builder_binaries_mirror" "http://npm.taobao.org/mirrors/electron-builder-binaries/"

# node-sass
npm config set "sass_binary_site" "http://npm.taobao.org/mirrors/node-sass"

```
