# Content Script

扩展程序可以插入内容脚本来读取、修改当前所访问网页内容。

首先在 manifest.json 中添加注册

```json
{
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "css": []
    }
  ]
}
```