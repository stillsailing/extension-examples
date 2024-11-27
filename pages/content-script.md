## Content Script

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

调试 Content Script

1. 在目标网页上打开开发者工具。
2. 选择“Sources”面板。
3. 在左侧导航栏中找到扩展程序的文件夹和 content.js 文件。
4. 设置断点、单步调试代码。
