# 插画师个人作品集（基础预览版）

基于 React + Vite 的亮色系插画师作品集。版心控制在约 1700px，面向 PC 端展示。

## 运行

```bash
pnpm install
pnpm run dev
```

默认访问 http://localhost:5173

## 目录结构

```
portfolio/
├── index.html
├── vite.config.js
├── public/
│   ├── favicon.svg
│   ├── hero-poster.svg      # hero 视频的封面占位图
│   └── hero.mp4             # ← 把真实视频放到这里（命名 hero.mp4）
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data/content.js      # ★ 所有文案 / 项目 / 优势都在这里改
    ├── styles/index.css     # 全部样式（设计系统 + 各区块）
    ├── components/          # Navbar / Hero / About / Works / ...
    └── assets/
        ├── portrait.svg     # 关于我区域的肖像占位图
        └── works/           # 6 张作品占位图
```

## 如何替换为自己的内容

1. **文案**：编辑 `src/data/content.js`（名字、简介、经历、项目、优势、联系方式等）。
2. **视频背景**：把 `hero.mp4` 放入 `public/`，hero 会自动切换为真实视频；未放置时使用内置光影动画兜底。
3. **作品图**：替换 `src/assets/works/` 下的图片，并同步修改 `content.js` 里对应的 `import` 与 `ratio`。
4. **肖像图**：替换 `src/assets/portrait.svg`。
5. **配色 / 字体**：在 `src/styles/index.css` 顶部的 `:root` 变量里调整。
