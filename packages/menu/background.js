console.log('Service Worker Script')

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: 'disable-in-current-tab',
    title: '在当前页面禁用',
    type: 'normal',
    contexts: ['action'],
  })

  chrome.contextMenus.create({
    id: 'image',
    title: 'image',
    type: 'normal',
    contexts: ['frame'],
  })
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  const selection = info.selectionText
  const newTabIndex = tab.index + 1
  const url = `https://developer.mozilla.org/zh-CN/search?q=${selection}`
  chrome.tabs.create({ url, index: newTabIndex })
})
