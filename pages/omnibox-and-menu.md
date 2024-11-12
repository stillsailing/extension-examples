## Omnibox & Context Menu

### Omnibox 

就是地址栏，官方文档中称其为多功能框，可以设定关键词激活扩展程序接管输入行为

```json
{
  "omnibox": {
    "keyword": "mdn"
  }
}
```

### Context Menu 

就是右键菜单，可以向其新增 item 以及二级 item

```json
{
  "permissions": ["contextMenus"],
}
```

---

### Search in MDN

增强两部分功能，实现快捷搜索

#### Omnibox

```js {1,4,12,14}
chrome.omnibox.onInputChanged.addListener(async function (text, suggest) {
  const result = await search(text)
  if (result && result.length > 0) {
    suggest(
      result.map((index) => {
        const { title, url } = index.item
        return {
          content: title,
          description: `${highlight(title, text)}  ➔  <url>${MDN_SITE_URL}${url}</url>`,
        }
      })
    )
  }
})
```

--- 

#### Context Menu

```js {2,6,12,14}
chrome.runtime.onMessage.addListener((message) => setupSubMenu(message.selection))
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const result = await search(selection)
  result.forEach((index) => {
    const { title, url } = index.item
    chrome.contextMenus.create({
      parentId: ExtensionMenuId,
      id: url,
      title: title,
      type: 'normal',
      contexts: ['selection'],
    })
  })
})
```
