# GitHub Pages 扁平修复版

这个版本专门解决 `themes/05.html` 等子目录文件未被正确上传/发布而进入 404 的问题。

## 根目录必须直接看到这些文件

- index.html
- admin.html
- 404.html
- .nojekyll
- 01.html
- 02.html
- 03.html
- 04.html
- 05.html
- assets/

## 发布后测试

先直接访问：

- /adult-happy-party/01.html
- /adult-happy-party/02.html
- /adult-happy-party/03.html
- /adult-happy-party/04.html
- /adult-happy-party/05.html

再访问：

- /adult-happy-party/admin.html

后台生成的邀请链接仍然访问根入口 `/?theme=05&to=姓名...`，index.html 会跳转到根目录 `05.html`，不再依赖 themes 子目录。
