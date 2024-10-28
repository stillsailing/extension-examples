console.log('Service Worker Script')

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: 'search-in-mdn',
    title: 'Search in MDN"',
    type: 'normal',
    contexts: ['selection'],
  })
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  const selection = info.selectionText
  const newTabIndex = tab.index + 1
  const url = `https://developer.mozilla.org/zh-CN/search?q=${selection}`
  chrome.tabs.create({ url, index: newTabIndex })
})
