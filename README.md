# 良之世界 · Liang.World

<p align="center">
  <strong>思想助产士的数字花园</strong>
</p>

<p align="center">
  <a href="https://liang.world">liang.world</a> &nbsp;|&nbsp; <a href="#中文">中文</a> &nbsp;|&nbsp; <a href="#english">English</a>
</p>

---

## 中文

### 关于本站

**良之世界（Liang.World）** 是思想助产士（Ang Li / 梁良）的个人博客。这里汇集了关于哲学践行、精神分析、AI 架构、数学证明与商业逻辑的深度思考。

网站以 Hilbert 黑 + Klein 蓝为主色调，采用极简极客美学设计，支持中英双语切换、Markdown + LaTeX 学术排版、暗色主题动效系统。

### 当前状态

| 指标 | 数值 |
|------|------|
| 文章总数 | **95 篇**（中英双版本） |
| 分类 | Philosophy / Psychology / Logic / Ecommerce / Others |
| 语言 | 中文版 + 英文版，导航栏一键切换 |
| 部署 | Vercel，全球 CDN |
| 域名 | `liang.world` |

### 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript 5.8 |
| 构建 | Vite 6 |
| 样式 | Tailwind CSS 3 + `@tailwindcss/typography` |
| 路由 | React Router v7（双语言路由 `/` + `/en/`） |
| 内容 | Markdown → react-markdown + remark-gfm |
| 数学 | KaTeX（remark-math + rehype-katex） |
| 状态 | React Context + Zustand |
| 图标 | Lucide React |
| SEO | react-helmet-async + hreflang + Open Graph + Twitter Card |
| RSS | 双语言 RSS feed 自动生成 |
| Sitemap | 双语言 sitemap 自动生成，含 hreflang 标注 |
| 部署 | Vercel（GitHub 自动构建） |

### 功能特色

- **中英双语** — 全站 UI 双语，`/`→中文，`/en`→英文，导航栏 EN/中 即时切换
- **黎曼门禁** — 访问首页需输入黎曼猜想原始命题（中文入中文站，英文入英文站）
- **Markdown + LaTeX** — 完整学术排版，支持 GFM 表格、代码块、数学公式
- **阅读进度条** — 文章页面顶部实时进度指示
- **视觉动效** — 滚动渐入、卡片悬浮光晕、页面过渡动画、呼吸光标
- **点阵背景** — 全站 Hilbert Black 背景覆盖 Klein Blue 点阵纹理
- **分类浏览** — 按 Philosophy / Psychology / Logic / Ecommerce 筛选
- **书架** — 书籍资源页面，PDF 下载
- **关于** — 双人信息，链接简历/CV
- **SEO 完善** — hreflang 双语标注、Open Graph、Twitter Card、JSON-LD
- **响应式** — 移动端 / 桌面端自适应
- **SicasShare** — 右下角悬浮分享按钮，支持复制链接和微信分享

### 项目结构

```
liang.world/
├── src/
│   ├── main.tsx                     # 应用入口
│   ├── App.tsx                      # 根组件 + 双语路由 + LocaleSync
│   ├── index.css                    # 全局样式 + 动画关键帧
│   ├── components/
│   │   ├── Layout.tsx              # 全局布局 (SEO/Hreflang)
│   │   ├── Navbar.tsx              # 导航栏 + 语言切换器
│   │   ├── Footer.tsx              # 页脚 + 站点统计
│   │   ├── PostCard.tsx            # 文章卡片
│   │   ├── Gate.tsx                # 黎曼猜想门禁
│   │   ├── SicasShare.tsx          # 悬浮分享按钮
│   │   ├── SiteStats.tsx           # 站点统计展示
│   │   └── Empty.tsx               # 空状态组件
│   ├── pages/
│   │   ├── Home.tsx                # 首页 (Hero + 最近文章)
│   │   ├── BlogDetail.tsx          # 文章详情 (进度条/KaTeX/Schema)
│   │   ├── Categories.tsx          # 分类筛选页
│   │   ├── Books.tsx               # 书架页
│   │   └── About.tsx               # 关于页 (双语)
│   ├── context/
│   │   └── LanguageContext.tsx      # 双语上下文 Provider
│   ├── hooks/
│   │   ├── useInView.ts            # 滚动可见性检测
│   │   ├── useScrollProgress.ts    # 阅读进度追踪
│   │   └── useTheme.ts             # 主题切换
│   ├── lib/
│   │   ├── content.ts              # 双语内容加载 (zh/en glob)
│   │   └── utils.ts                # cn() 工具函数
│   ├── types/
│   │   └── index.ts                # TypeScript 类型 + UI 翻译字典
│   └── content/
│       └── posts/
│           ├── zh/                  # 95 篇中文 Markdown
│           └── en/                  # 95 篇英文 Markdown
├── scripts/
│   ├── generate-rss.js             # 中英 RSS 生成
│   ├── generate-sitemap.js         # 中英 Sitemap 生成 (含 hreflang)
│   ├── generate-stats.js           # 站点统计生成
│   ├── audit-posts.js              # 文章排版自检
│   └── ...                         # 其他辅助脚本
├── api/                            # Express API 服务
├── public/                         # 静态资源 (favicon/sitemap/RSS/PDF)
├── index.html                      # HTML 模板
├── vercel.json                     # Vercel 部署配置
├── tailwind.config.js              # Tailwind 主题配置 (Klein Blue)
├── vite.config.ts                  # Vite 构建配置
└── package.json
```

### 本地开发

```bash
npm install              # 安装依赖
npm run dev              # 启动开发服务（前端 + 后端并行）
npm run build            # 生产构建 (RSS + Sitemap + Stats + TypeScript + Vite)
npm run check            # TypeScript 类型检查
npm run preview          # 预览生产构建
```

### 内容管理

所有文章以 Markdown 格式存放在 `src/content/posts/zh/`（中文）和 `src/content/posts/en/`（英文），通过 Obsidian 进行本地编辑。

**文件命名**：全部使用英文 slug（如 `tendre-is-all-we-want-xanthippe-architecture.md`），中英双版共用同一 slug。

**YAML Front Matter**：

```yaml
---
title: 文章标题
date: '2026-04-28'
category: Philosophy
tags:
  - 哲学
  - 认知
description: >
  文章摘要描述
---
```

### 部署

项目连接 GitHub（`qaz20011230/blog`），推送到 `main` 分支自动触发 Vercel 构建部署。

```bash
git push origin main      # 自动部署到 liang.world
```

**域名**：`https://liang.world`（通过 Vercel Domains 配置）

### 设计系统

| 要素 | 值 |
|------|-----|
| 背景 | `#050505` Hilbert Black |
| 主色 | `#002FA7` Klein Blue |
| 文字 | `#E5E7EB` |
| 辅助 | `#9CA3AF` |
| 字体 | 系统无衬线 + 衬线标题 |
| 动效 | 9 组 @keyframes（fade-in-up / float / pulse-glow / shake 等） |

---

<a name="english"></a>

## English

### Overview

**Liang.World** is the personal blog of the "Midwife of Thought" (Ang Li). A bilingual digital garden where philosophy, psychoanalysis, AI architecture, mathematical proof, and business logic converge — rendered in a dark-themed minimalist geek aesthetic.

### Current Status

| Metric | Value |
|--------|-------|
| Total Posts | **95** (Chinese + English versions) |
| Categories | Philosophy / Psychology / Logic / Ecommerce / Others |
| Languages | Chinese (`/`) + English (`/en`), one-click toggle |
| Deployment | Vercel, global CDN |
| Domain | `liang.world` |

### Tech Stack

React 18 + TypeScript 5.8 + Vite 6 + Tailwind CSS 3 · React Router v7 · react-markdown + KaTeX · react-helmet-async · Vercel

### Features

- **Bilingual** — Full UI translation, `EN/中` navbar toggle, locale-aware routing
- **Riemann Gate** — Entry requires the Riemann Hypothesis original statement
- **Markdown + LaTeX** — Academic formatting with GFM, code blocks, math rendering
- **Reading progress bar** — Real-time scroll progress indicator
- **Motion system** — Fade-in-up on scroll, card hover glow, page transitions
- **Dot-grid background** — Klein Blue dot-matrix texture on Hilbert Black
- **Category filtering** — Browse by Philosophy / Psychology / Logic / Ecommerce
- **Bookshelf** — PDF resources with download links
- **SEO** — hreflang tags, Open Graph, Twitter Cards, JSON-LD structured data
- **Responsive** — Adaptive mobile/desktop layout
- **Sitemap+RSS** — Bilingual auto-generation with hreflang annotations

### Local Development

```bash
npm install              # Install dependencies
npm run dev              # Start dev server
npm run build            # Production build
npm run check            # TypeScript check
```

### Deployment

Git push to `main` triggers automatic Vercel deployment at `https://liang.world`.

---

<p align="center">
  <sub>怀瑾握瑜 · 解惑忘隙</sub><br>
  <sub>Built with React · Vite · TypeScript · Deployed on Vercel</sub>
</p>
