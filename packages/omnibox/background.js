console.log('Service Worker Script')

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
  suggest([
    { content: text, description: 'Open MDN' },
    {
      content: 'https://developer.mozilla.org/zh-CN/search?q=' + text,
      description: 'Search in MDN',
    },
  ])
})

chrome.omnibox.onInputEntered.addListener(function (text, disposition) {
  const url = /https?:\/\//g.test(text)
    ? text
    : `https://developer.mozilla.org/zh-CN/search?q=${text}`
  chrome.tabs.create({ url })
})
