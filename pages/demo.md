---
layout: center
---

# 案例分享

---

## 创建扩展程序播放器应用


---

## Wappalyzer

分析页面的 HTML、CSS、JS 代码，然后通过正则匹配，提取出页面的框架信息

1. HTML 特征，分析网页的 HTML 源代码，查找特定的标签、属性、元数据、脚本链接、CSS 样式表链接等，这些特征可以指示网站使用了哪些技术。

- `<meta name="generator" content="WordPress">`
- `<script src="https://cdn.jquery.com/jquery.min.js">`

2. 响应头特征，使用 `chrome.webRequest` 观察页面请求，分析 HTTP 响应头，查找特定的字段和值，例如 Server、X-Powered-By、Set-Cookie 等，这些特征可以指示网站使用了哪些服务器软件、编程语言、框架等。
3. JS 特征，出于安全考虑，不能直接访问页面加载的 JavaScript 文件内容。但是可以根据加载链接，查找 window 对象，DOM 结构等，推断出使用了哪些 JavaScript 库或框架。
