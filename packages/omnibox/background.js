console.log('Service Worker Script')

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
  console.log(`Input changed to ${text}`)
  suggest([
    {
      content: 'https://developer.mozilla.org/zh-CN/search?q=' + text,
      description: 'Search in MDN',
    },
    { content: 'test', description: 'Test' },
    { content: 'test2', description: 'Test2' },
  ])
})

chrome.omnibox.onInputEntered.addListener(function (text) {
  console.log(`Input entered: ${text}`)
  // chrome.tabs.goForward({ url: text })
})
