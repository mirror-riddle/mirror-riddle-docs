---
id: css-in-head
title: 首页CSS
---

如果 stylesheets 可能还没有下载、解析，网页就已经渲染，等到 stylesheets 加载好，突然应用 CSS 会导致闪屏。

要解决这个问题，首页 HTML 中需要直接在 style 标签中写下必要的 CSS，保证网页初始风格不因后续下载的 CSS 而变化。因为浏览器解析写在 HTML 中的 style 是不需要额外下载的，所以赶在首次渲染之前就与 render tree 链接。

如果设置脚本 defer，使得 DOMContentLoaded 在脚本加载之后才触发，一定程度上可以延迟首次渲染，避免闪屏，但是不一定百分百有效。
