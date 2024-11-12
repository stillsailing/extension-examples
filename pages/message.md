# 如何通信

很多扩展程序都在 Popup 中设计交互，由 Service Worker 来执行任务，那么通信就是最重要的问题

```js {2,4}
// popup.js
document.querySelector('#btn-send').addEventListener('click', function () {
  chrome.runtime.sendMessage({
    message: "hello",
  })
})
```

```js {1,3}
// service-worker.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.message)
})
```

安装 `@types/chrome` 获得完整的类型定义

---
transition: slide-left
---

或者使用 `chrome.runtime.connect` API 建立持久连接

<div class="flex items-start justify-between gap-8">

<div class="flex-1">
```js {3,4,6,8}
// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const port = chrome.runtime.connect({ name: 'back-popup' })
  port.onMessage.addListener((msg) => {
    console.log('Message from background:', msg)
  })
  setInterval(() => {
    port.postMessage({ message: 'Hello from Popup' })
  }, 5000)
})
```
</div>

<div class="flex-1">
```js {2,4,6,7,9}
// service-worker.js
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'back-popup') {
    port.onMessage.addListener((action) => {
      console.log('Message from popup:', action.message)
      port.postMessage({ message: 'Hello from Service Worker' })
    })
  }
})
```
</div>

</div>

也还有其他的通信方式

1. 使用 Storage API，chrome.storage 可以 set get 同时还支持监听变化，所有扩展程序脚本都可以访问共享存储。
2. 跨扩展程序消息传递 (External Messaging)，声明 externally_connectable 权限
3. 借助服务端的任何第三方消息机制，如 Websocket 
