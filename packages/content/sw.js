console.log('Service Worker Script')

/**
 * domain:minutes
 * google.com:300
 * @type {Map<string, number>}
 */
const timers = new Map()
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'set-timer') {
    getActiveTab().then((tab) => {
      const host = new URL(tab.url).hostname
      timers.set(host, request.payload)
    })
  }
  if (request.type === 'get-timer') {
    getActiveTab().then((tab) => {
      const host = new URL(tab.url).hostname
      sendResponse(timers.get(host))
    })
  }
  return true
})

/**
 * @returns {Promise<chrome.tabs.Tab>}
 */
async function getActiveTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true }, (tabs) => {
      resolve(tabs[0])
    })
  })
}
