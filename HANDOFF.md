# 交接说明 · 插画师作品集

> 把这份工程拷到另一台电脑的 DSH 继续开发时，先读这一页。

---

## 一、跑起来

```bash
pnpm install      # 首次安装依赖（react / vite / ogl / gsap）
pnpm run dev      # 开发服务器 → http://localhost:5173
pnpm run build    # 产出 dist/
pnpm run preview  # 预览 dist → http://localhost:4173
```

**如果 `node` / `pnpm` 不在 PATH 上**（部分 DSH 环境如此），用绝对路径：

```
<用户目录>\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe
<用户目录>\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs
```

调用方式：

```powershell
& "$nodeDir\node.exe" "$pnpmMjs" run dev
```

> 安装 esbuild 时若报 `ERR_PNPM_IGNORED_BUILDS`：`pnpm-workspace.yaml` 里已写好
> `allowBuilds: esbuild: true`，**不要删这个文件**。若 `node` 不在 PATH，还需临时把
> node 目录加进 PATH，否则 esbuild 的 postinstall 会失败。

---

## 二、技术栈

React 18 + Vite 5，纯静态站点。额外依赖只有两个：`ogl`（WebGL 波纹）、`gsap`（手风琴动画）。

---

## 三、文件地图（改内容只看这几个）

| 想改什么 | 去哪 |
|---|---|
| **所有文案 / 项目 / 优势 / 个人信息 / 联系方式** | `src/data/content.js` |
| 配色、字体、版心、全部区块样式 | `src/styles/index.css`（顶部 `:root` 是设计变量） |
| 首页结构 | `src/components/Hero.jsx` |
| 关于我 | `src/components/About.jsx` |
| 精选作品 | `src/components/Works.jsx` |
| 个人优势 | `src/components/Strengths.jsx` |
| 收尾联系页 | `src/components/Contact.jsx` |
| 作品图（占位 SVG，待替换） | `src/assets/works/` |
| 首页手风琴图 | `src/assets/hero/panel-01~04.jpg` |
| 关于我背景图 | `src/assets/about-bg.jpg` |

---

## 四、已集成的 React Bits 组件

都不需要额外安装（除 `ogl` / `gsap`）。

| 组件 | 用在哪 | 关键参数与注意事项 |
|---|---|---|
| `PatternWaves.jsx` | 首页背景 +「首页之后」整段背景 | 首页：`preset="lines"`；下半页：`preset="terminal"`、`fade="center"`。下半页用 `position: sticky` 让画布保持视口大小 |
| `TechText.jsx` | 首页大标题「献给想象 / 无尽的山海」 | 两行各一个实例。**源码被我改过**：新增 `align` 参数（默认仍是居中），这里用 `align="left"`。⚠️ 画布行高必须 ≥ `fontSize / 0.66`，否则组件会自动把字压小 |
| `AccordionGallery.jsx` | 首页右侧图片 | `expandRatio=0.5`、`height=640`。图片容器是**竖版**，比例约 **0.87 : 1**（宽:高） |
| `BorderGlow.jsx` | 关于我的玻璃框 | **已关掉 `::before` / `::after`**（这两层会在框内铺色，与透明背景冲突），只保留 `.edge-light` 边缘光晕；并把它的 `mix-blend-mode` 从 `plus-lighter` 改成 `normal`（否则浅色底上粉色会被加成白色而看不见） |

---

## 五、容易踩的坑

1. **`overflow-x` 必须用 `clip`**：`body` 上是 `overflow-x: clip`（不是 `hidden`）。改成 `hidden` 会让 body 变成滚动容器，**下半页的 sticky 波纹背景会直接失效**。
2. **Vite 的 Host 校验**：`vite.config.js` 里有 `allowedHosts: true`，是为了通过隧道/外部域名访问。正式静态托管用不到，放着无害。
3. **`base: './'`**：构建产物使用相对路径，可放在任意子目录，也能直接 `file://` 打开。
4. **`import.meta.url`**：构建后图片是 `new URL("xxx.jpg", import.meta.url)` 形式。**要做单文件 HTML 必须把这类引用替换成 base64**，否则内联后会 404。单文件生成脚本的逻辑见下。

---

## 六、当前进度

- [x] 首页：全屏 hero + 波纹背景 + TechText 标题 + 手风琴画廊（4 张图）
- [x] 关于我：插画背景（左 100% → 右 0% 渐变）+ 透明玻璃框 + 个人信息（邮箱/电话/微信用图标）
- [x] 精选作品 / 个人优势 / 收尾联系页
- [x] 全站低饱和粉蓝配色、磨砂玻璃导航、滚动淡入
- [ ] **精选作品里的 6 张图仍是占位 SVG**，待替换为真实作品图
- [ ] 图片资源可再压缩（现共约 1.3 MB）
- [ ] 正式部署（需要账号登录，见 `DEPLOY.md`）

---

## 七、交付文件（在工程文件夹的上一级）

| 文件 | 说明 |
|---|---|
| `portfolio-site-single.html` | 整个网站打包成**一个 HTML**，双击即开、可直接发人 |
| `portfolio-site-single.zip` | 上面那个的压缩版（方便用微信/邮件发送） |
| `portfolio-site-dist.zip` | 部署包，拖到 Netlify / Cloudflare Pages 即可上线 |

**单文件版是脚本生成的**，核心逻辑：读 `dist/index.html` → 把 CSS、JS 内联成 `<style>` / `<script>` → 把 JS 里所有 `new URL("<文件名>",import.meta.url).href` 替换成对应图片的 base64 data URI → 把 favicon 也内联。改动网站后需重新生成。
