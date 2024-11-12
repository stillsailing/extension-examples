setInterval(() => {
  chrome.runtime.sendMessage({
    message: 'ping',
  })
}, 5000)
document.addEventListener('DOMContentLoaded', () => {
  const port = chrome.runtime.connect({ name: 'back-popup' })
  port.onMessage.addListener((msg) => {
    console.log('Message from background:', msg)
  })
  setInterval(() => {
    port.postMessage({ message: 'Hello from popup' })
  }, 5000)
})
