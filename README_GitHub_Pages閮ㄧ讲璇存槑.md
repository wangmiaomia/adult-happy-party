# 成年人放风邀请函 · GitHub Pages 最终上线包

## 推荐仓库名
`adult-happy-party` 或 `party-invite`

发布后地址通常为：
`https://你的GitHub用户名.github.io/仓库名/`

后台链接生成器：
`https://你的GitHub用户名.github.io/仓库名/admin.html`

## 上传方法（网页操作）
1. GitHub 新建一个 Public repository。
2. 进入仓库，选择 Add file → Upload files。
3. 上传本文件夹里的所有文件和文件夹到仓库根目录：
   - index.html
   - admin.html
   - 404.html
   - .nojekyll
   - assets/
   - themes/
4. 提交到 main 分支。
5. 打开 Settings → Pages。
6. Build and deployment → Source 选择 `Deploy from a branch`。
7. Branch 选择 `main`，Folder 选择 `/(root)`，Save。
8. 等待发布完成后，在 Settings → Pages 点击 Visit site。

## 生成专属邀请
打开 `/admin.html`，输入朋友姓名、日期、时间、地点、邀请人，选择五种互动方式之一，即可生成专属链接。

示例：
`https://username.github.io/party-invite/?theme=05&to=小明&date=2026年8月29日&time=19:30&venue=王苗苗之家`

## 五种互动
01 长按认证
02 黑金刮刮乐
03 红头文件翻阅
04 滑动解锁快乐模式
05 撕票入场

## 注意
- 这是纯静态网站，不需要数据库。
- `.nojekyll` 用于让 GitHub Pages 原样发布静态文件。
- `admin.html` 没有密码保护，不要把后台地址公开发给朋友。
- GitHub Pages 发布可能需要几分钟。
