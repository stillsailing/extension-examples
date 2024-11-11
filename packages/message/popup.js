setInterval(() => {
  chrome.runtime.sendMessage({
    message: 'ping',
  })
}, 5000)
