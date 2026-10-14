# 部署到静态托管（获得永久地址）

网站是纯静态文件，**不需要服务器、不需要数据库**。构建产物在 `dist/`，
打包好的 zip 在项目上一级目录：`portfolio-site-dist.zip`。

> 单页 + 锚点导航，**不需要任何路由 / 重定向配置**，传上去即可。
> 字体走 Google Fonts，访客需要联网。

---

## 方案 A：Cloudflare Pages（推荐，免费永久）

1. 注册 / 登录：https://dash.cloudflare.com/sign-up （邮箱 + 密码，免费，不需要信用卡）
2. 左侧菜单 → **Workers & Pages** → **创建 / Create**
3. 切到 **Pages** 标签 → 选 **上传资产 / Upload assets**
4. 项目名填 `lichangchun-portfolio`（最终网址会是 `lichangchun-portfolio.pages.dev`，可自定义）
5. 把 **`portfolio-site-dist.zip`** 拖进上传区（或直接拖 `dist` 文件夹）
6. 点 **部署站点 / Deploy site**，等十几秒
7. 拿到永久地址：`https://lichangchun-portfolio.pages.dev`

**以后更新**：进入该项目 → **创建新部署 / Create new deployment** → 再拖一次 zip。
**地址不变**，也不会因为关电脑而失效。

---

## 方案 B：Netlify Drop（更简单，但国内访问可能慢）

1. 打开 https://app.netlify.com/drop
2. 把 `portfolio-site-dist.zip` 拖进去
3. 拿到 `https://xxxx.netlify.app`
4. 建议顺手注册 / 登录（免费）以保留站点

---

## 方案 C：命令行部署（可以让我来跑）

```bash
npx wrangler pages deploy dist --project-name=lichangchun-portfolio
```

首次需要 `npx wrangler login`，会在浏览器里弹出 Cloudflare 授权页，点同意即可。
登录一次之后，后续每次改动我都可以直接帮你部署。

---

## 常见问题

- **打开是白屏？** 确认拖的是 `dist` 文件夹（或那个 zip），且 `index.html` 在根目录。
- **图片不显示？** 本项目用相对路径（`base: './'`），放在根目录或任意子目录都能正常工作。
- **以后想换域名？** Cloudflare Pages / Netlify 都支持绑定自定义域名。
