console.log('Service Worker Script')

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  console.log(request)
})
