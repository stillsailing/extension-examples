# Service Worker

类似于 Web 页面中 Service Worker，扩展程序 Service Worker 也是持续运行在插件的整个生命周期，可以进行生命周期管理

<div class="flex items-start justify-between gap-8">

<div class="flex-1">
```json
{
  "background": {
    "service_worker": "service-worker.js"
  }
}
```
</div>

<div class="flex-1">
比如安装时设定定时任务

```js
// service-worker.js
function task() { /***/ }
chrome.alarms.onAlarm.addListener(task)
chrome.runtime.onInstalled.addListener(() => {
  task()
  chrome.alarms.create('task', {
    periodInMinutes: 1440, // per day
  })
})
```
</div>
  
</div>

---
transition: slide-left
---

#### Q.如何调试？
#### Q.alarms 是什么，为什么用这个？

出于性能和资源消耗考虑，会在闲时关停 Service Worker 脚本：

1. 无操作 30 秒后。收到事件或调用扩展程序 API 会重置此计时器。
2. 单个请求（例如事件或 API 调用）的处理用时超过 5 分钟。
3. 当 fetch() 响应时间超过 30 秒时。

因此更推荐使用 `chrome.alarms` API 来代替 `setTimeout`，首先在 manifest.json 中申请 alarms 权限

```json
{
  "permissions": ["alarms"]
}
```