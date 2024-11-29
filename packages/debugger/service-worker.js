let tabId

chrome.action.onClicked.addListener(function (tab) {
  tabId = tab.id
  if (tab.url.startsWith('http')) {
    chrome.debugger.attach({ tabId: tab.id }, '1.3', function () {
      chrome.debugger.sendCommand({ tabId: tab.id }, 'Network.enable', {}, function () {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError)
        }
      })
    })
  } else {
    console.log('Debugger can only be attached to HTTP/HTTPS pages.')
  }
})

chrome.debugger.onEvent.addListener(function (source, method, params) {
  if (method === 'Network.requestWillBeSent') {
    // Perform your desired action with the request data
    if (params.request.url.startsWith('https://git.woa.com/api/web/v2/user')) {
      console.log(params.request)
    }
  }
  if (method === 'Network.responseReceived') {
    // Perform your desired action with the response data
    if (params.response.url.startsWith('https://git.woa.com/api/web/v2/user')) {
      console.log(params.response)
      // chrome.debugger.sendCommand(
      //   { tabId: tabId },
      //   'Network.getResponseBody',
      //   {
      //     requestId: params.response.id,
      //   },
      //   function (result) {
      //     if (chrome.runtime.lastError) {
      //       console.error(chrome.runtime.lastError)
      //     }
      //     console.log(result)
      //   }
      // )
    }
  }
})
