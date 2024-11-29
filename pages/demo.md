---
layout: center
---

# 案例分享

---

## AdBlock

1. 维护广告过滤规则

    通常会使用公开的广告过滤规则列表，会定期更新

2. 拦截网络请求

    根据过滤规则匹配，命中的请求直接拒绝，阻止广告的加载

3. 隐藏已加载的广告元素

    根据规则列表中的 CSS 选择器或 XPath 表达式来识别并隐藏命中的元素（尤其是 iframe，大多数广告通过 iframe 注入），比如设置 `visible: hidden` 防止影响页面布局


优化了网络浏览体验但是伤害了站点利益

---

## Wappalyzer

分析页面的 HTML、CSS、JS 代码，然后通过正则匹配，提取出页面的框架信息

1. HTML 特征，分析网页的 HTML 源代码，查找特定的标签、属性、元数据、脚本链接、CSS 样式表链接等，这些特征可以指示网站使用了哪些技术。

- `<meta name="generator" content="WordPress">`
- `<script src="https://cdn.jquery.com/jquery.min.js">`

2. 响应头特征，使用 `chrome.webRequest` 观察页面请求，分析 HTTP 响应头，查找特定的字段和值，例如 Server、X-Powered-By、Set-Cookie 等，这些特征可以指示网站使用了哪些服务器软件、编程语言、框架等。
3. JS 特征，出于安全考虑，不能直接访问页面加载的 JavaScript 文件内容。但是可以根据加载链接，查找 window 对象，DOM 结构等，推断出使用了哪些 JavaScript 库或框架。

---

## Redux-Devtools

首先回顾一下如何使用？

```js
const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() 
    : compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)))
```

这里 `window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__` 由扩展程序提供，增强 redux 的 compose 方法，作为 Redux-Devtools 和 Redux 应用的通信桥梁

使用 `window.postMessage` 和  `window.onMessage` 实现 App 和 Content Script 的通信，Content Script 作为桥梁再和 Service Worker 和 Devtools 通信，实现跨应用程序消息传递

```
App <==> Content Script <==> Service Worker/Devtools
```

> 为什么是增强 compose 而不是 middleware?
