console.log('Service Worker Script')

/**
 * domain:minutes
 * google.com:300
 * @type {Map<string, number>}
 */
const timers = new Map()
let timer = 0 /** seconds */
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  const tab = await getActiveTab()
  if (request.type === 'set-timer') {
    timer = request.payload.timeout
    if (tab) {
      const host = new URL(tab.url).hostname
      timers.set(host, timer)
    }
  }
  if (request.type === 'get-timer') {
    if (tab) {
      const host = new URL(tab.url).hostname
      sendResponse(timers.get(host))
    }
  }
})

/**
 * @returns {Promise<chrome.tabs.Tab>}
 */
function getActiveTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      resolve(tabs[0])
    })
  })
}
