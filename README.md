# 良之世界 · Liang.World

<p align="center">
  <strong>思想助产士的数字花园 | Digital Garden of the Midwife of Thought</strong>
</p>

<p align="center">
  <a href="https://liang.world">liang.world</a> &nbsp;|&nbsp;
  <a href="https://liang.world/llms.txt">llms.txt</a> &nbsp;|&nbsp;
  <a href="https://liang.world/rss.xml">RSS</a> &nbsp;|&nbsp;
  <a href="https://liang.world/about">哲学咨询</a>
</p>

---

## 关于本站 | About

**良之世界（Liang.World）** 是良之（Ang Li）的个人博客。阿里巴巴前CTO，菲娜睿特AI 首席技术官，美国哲学从业者协会（APPA）附属会员。

这里汇集了关于哲学践行、精神分析、AI 架构、数学证明、商业战略与教育理念的深度思考。全站中英双语，向 AI 代理和所有搜索引擎开放。

**Liang.World** is the personal blog of Ang Li (Liangzhi). Former CTO of Alibaba Group, CTO of Phaenarete AI, APPA Affiliate Member.

A bilingual digital garden of deep thought on philosophical practice, psychoanalysis, AI architecture, mathematical proof, business strategy, and education. Fully open to AI agents and all search engines.

---

## 当前状态 | Status

| 指标 | 数值 |
|------|------|
| 文章总数 / Total Posts | **109 篇（中）/ 104 篇（英）** |
| 分类 / Categories | Philosophy / Psychology / AI & Technology / Mathematics & Logic / Business & Strategy / Culture & Art |
| 部署 / Deployment | Vercel，全球 CDN |
| 域名 / Domain | `liang.world` |
| AI 友好 / AI-Ready | llms.txt · ai.txt · robots.txt 完全开放 |
| RSS | 中文 109 篇 · English 104 篇 |
| Sitemap | 中文 113 URL · English 108 URL |
| CI | GitHub Actions（type-check + lint + build + 产物漂移校验） |

---

## 技术栈 | Tech Stack

| 层级 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript |
| 预渲染 | vite-react-ssg（221 路由静态 HTML 输出） |
| 路由 | React Router 6（数据路由 + lazy 代码分割） |
| 构建 | Vite 6 |
| 样式 | Tailwind CSS 3 + `@tailwindcss/typography` |
| 内容 | Markdown 元数据索引 + 路由 loader 按需加载正文 |
| 数学 | KaTeX（remark-math + rehype-katex） |
| 图标 | Lucide React |
| SEO | SSG 预渲染 `<title>`/`<meta>` + hreflang + Open Graph + Twitter Card + JSON-LD |
| RSS | 双语言 RSS 自动生成 |
| Sitemap | 双语言 sitemap，hreflang 标注 |
| 部署 | Vercel（GitHub push 自动构建） |

---

## AI 友好化 | AI Accessibility

| 资源 | URL |
|------|-----|
| llms.txt | https://liang.world/llms.txt |
| ai.txt | https://liang.world/ai.txt |
| robots.txt | 完全开放所有爬虫（GPTBot, ClaudeBot, PerplexityBot 等） |
| Content-Signal | `ai-train=yes, ai-input=yes, search=yes` |
| CORS | `Access-Control-Allow-Origin: *` |

---

## 功能特色 | Features

- **SSG 预渲染** — 221 个页面构建期输出为静态 HTML，含完整文章正文与 SEO 元数据
- **代码分割** — 路由级 lazy loading，markdown 正文按需加载（不入 JS bundle）
- **中英双语** — 全站 UI 双语，`/`→中文，`/en`→英文，Locale 由 URL 派生
- **哲学咨询** — `/about` 页面开放全球预约，PEACE 流程 + 北辰七德 + 苏格拉底对话
- **Markdown + LaTeX** — 完整学术排版，GFM 表格、代码块、数学公式
- **阅读进度条** — 文章页面顶部实时进度指示
- **暗色动效系统** — 滚动渐入、卡片悬浮光晕、页面过渡动画
- **点阵背景** — Hilbert Black 底 + Klein Blue 点阵纹理
- **分类浏览** — 6 大领域动态筛选
- **书架** — 书籍资源页面
- **SEO 完善** — SSG 预渲染 hreflang 双语标注、Open Graph、Twitter Card、JSON-LD（源文件可见）
- **响应式** — 移动端 / 桌面端自适应

---

## 项目结构 | Structure

```
liang.world/
├── .github/workflows/
│   └── ci.yml                     # GitHub Actions CI
├── src/
│   ├── main.tsx                   # SSG 入口 (ViteReactSSG)
│   ├── App.tsx                    # 路由配置 (RouteRecord[])
│   ├── components/
│   │   ├── Layout.tsx             # 全局布局 + SEO Head + LanguageProvider
│   │   ├── Navbar.tsx             # 导航栏 + 语言切换 (URL 驱动)
│   │   ├── Footer.tsx             # 页脚 + 站点统计
│   │   ├── PostCard.tsx           # 文章卡片
│   │   ├── SicasShare.tsx         # 悬浮分享按钮
│   │   └── SiteStats.tsx          # 站点统计
│   ├── pages/
│   │   ├── Home.tsx               # 首页
│   │   ├── BlogDetail.tsx         # 文章详情 (loader + Component)
│   │   ├── Categories.tsx         # 分类筛选
│   │   ├── Books.tsx              # 书架
│   │   └── About.tsx              # 关于/咨询预约
│   ├── context/LanguageContext.tsx # 双语上下文 (URL 派生，SSR 安全)
│   ├── hooks/
│   │   └── useScrollProgress.ts   # 阅读进度
│   ├── lib/
│   │   ├── content.ts             # 内容加载 (基于 posts-index.json)
│   │   └── utils.ts               # cn() / formatDate() 工具
│   ├── types/index.ts             # TypeScript 类型 + UI 翻译字典
│   └── content/
│       ├── posts-index.json        # 文章元数据索引 (构建期生成)
│       └── posts/
│           ├── zh/                 # 109 篇中文 Markdown
│           └── en/                 # 104 篇英文 Markdown
├── scripts/
│   ├── config.js                  # 共享配置 (BASE_URL / 作者 / 分类)
│   ├── generate-rss.js            # 中英 RSS 生成
│   ├── generate-sitemap.js        # 中英 Sitemap 生成
│   ├── generate-stats.js          # 站点统计
│   ├── generate-content-index.js  # 文章元数据索引生成
│   ├── normalize-frontmatter.js   # Frontmatter 规范化
│   ├── audit-posts.js             # 文章审计
│   ├── audit-extended.js          # 扩展审计
│   └── archive/                   # 历史一次性脚本归档
├── public/                        # 静态资源 (llms.txt / ai.txt / robots.txt / RSS / Sitemap)
├── index.html                     # HTML 模板
├── vercel.json                    # Vercel 部署配置
├── tsconfig.json                  # TypeScript 配置 (strict: true)
└── package.json
```

---

## 本地开发 | Dev

```bash
npm install              # 安装依赖
npm run dev              # 启动开发服务 (SSR)
npm run dev:csr          # 启动纯 CSR 开发模式 (可选)
npm run build            # 生产构建 (内容索引 + RSS + Sitemap + Stats + TypeScript + SSG)
npm run check            # TypeScript 类型检查
npm run lint             # ESLint
```

## 部署 | Deploy

推送至 `main` 分支自动触发 Vercel 构建：

```bash
git push origin main
```

---

## 设计系统 | Design

| 要素 | 值 |
|------|-----|
| 背景 | `#050505` Hilbert Black |
| 主色 | `#002FA7` Klein Blue |
| 文字 | `#E5E7EB` |
| 辅助 | `#9CA3AF` |

---

<p align="center">
  <sub>怀瑾握瑜 · 解惑忘隙</sub><br>
  <sub>React · Vite · TypeScript · vite-react-ssg · Vercel</sub>
</p>
