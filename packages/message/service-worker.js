chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'back-popup') {
    port.onMessage.addListener((action) => {
      console.log('Message from popup:', action.message)
      port.postMessage({ message: 'Hello from service worker' })
    })
  }
})
