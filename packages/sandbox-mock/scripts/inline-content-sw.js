self.addEventListener("fetch", (event) => {
  // ... Service Worker 逻辑
  console.log("fetch", event.request.url)
})
