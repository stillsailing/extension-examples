setTimeout(function () {
  chrome.runtime.sendMessage({
    message: 'hello from popup',
  })
}, 3000)
