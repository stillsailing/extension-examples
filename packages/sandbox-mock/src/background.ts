chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: "options.html"
  })
})

async function clear() {
}

async function put() {

}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "put_rule") {
    put()
  }
  if (message.type === "clear_rule") {
    clear()
  }
})


// background.js (扩展程序后台脚本)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        navigator.serviceWorker.register(chrome.runtime.getURL('script/inline-content-sw.js'));
      },
    });
  }
});
