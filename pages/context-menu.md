
## Context Menu

就是右键菜单，可以向其新增 item 以及二级 item

```json
{
  "permissions": ["contextMenus"],
}
```

<img class="max-h-72 mt-2" src="../assets/context-menu.png" />

---

可以区分更多场景来扩展菜单


- page
- frame
- link
- image
- video
- audio
- selection
- editable
- launcher
- browser_action
- page_action
- action
- all

---

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