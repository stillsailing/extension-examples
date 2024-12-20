console.log('Service Worker Script')

/**
 * domain:seconds
 * google.com:300
 * @type {Map<string, number>}
 */
const timers = new Map<string, number>()

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'set-timer') {
    getActiveTab().then((tab) => {
      const host = new URL(tab.url).hostname
      timers.set(host, request.payload)
      chrome.tabs.sendMessage(tab.id, { type: 'setup' })
    })
  }
  if (request.type === 'get-timer') {
    getActiveTab().then((tab) => {
      const host = new URL(tab.url).hostname
      sendResponse(timers.get(host))
    })
  }
  if (request.type === 'update-timer') {
    getActiveTab().then((tab) => {
      const host = new URL(tab.url).hostname
      if (timers.has(host)) {
        timers.set(host, request.payload)
      }
    })
  }
  return true
})

async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true })
  return tabs[0]
}
