# 良之世界 · Liang.World

<p align="center">
  <strong>思想助产士的数字花园 | Digital Garden of the Midwife of Thought</strong>
</p>

<p align="center">
  <a href="https://liang.world">liang.world</a> &nbsp;|&nbsp;
  <a href="https://liang.world/llms.txt">llms.txt</a> &nbsp;|&nbsp;
  <a href="https://liang.world/rss.xml">RSS</a> &nbsp;|&nbsp;
  <a href="https://liang.world/about">哲学咨询</a> &nbsp;|&nbsp;
  <a href="https://liang.world/search">搜索</a>
</p>

---

## 关于本站 | About

**良之世界（Liang.World）** 是良之（Ang Li）的个人博客。菲娜睿特AI 首席技术官，爱丁堡大学语言学博士。

这里汇集了关于哲学践行、精神分析、AI 架构、数学证明、商业战略与教育理念的深度思考。全站中英双语，向 AI 代理和所有搜索引擎开放。

**Liang.World** is the personal blog of Ang Li (Liangzhi). CTO of Phaenarete AI, PhD in Linguistics (University of Edinburgh).

A bilingual digital garden of deep thought on philosophical practice, psychoanalysis, AI architecture, mathematical proof, business strategy, and education. Fully open to AI agents and all search engines.

---

## 当前状态 | Status

| 指标 | 数值 |
|------|------|
| 文章总数 / Total Posts | **113 篇（中）/ 105 篇（英）** |
| SSG 路由 / Routes | 228 个静态页面 |
| 分类 / Categories | Philosophy / Psychology / AI & Technology / Mathematics & Logic / Business & Strategy / Culture & Art |
| 部署 / Deployment | Vercel，全球 CDN |
| 域名 / Domain | `liang.world` |
| AI 友好 / AI-Ready | llms.txt · ai.txt · robots.txt · Content-Signal · CORS |
| RSS | 中文 113 篇 · English 105 篇 |
| Sitemap | 中文 117 URL · English 109 URL · News Sitemap |
| CI | GitHub Actions (Node 22) — type-check + lint + build + 确定性产物漂移校验 |
| 测试 | Vitest — 5 tests passed |

---

## 技术栈 | Tech Stack

| 层级 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript (strict) |
| 预渲染 | vite-react-ssg（228 路由静态 HTML 输出） |
| 路由 | React Router 6（数据路由 + lazy 代码分割） |
| 构建 | Vite 6 |
| 样式 | Tailwind CSS 3 + `@tailwindcss/typography` + CSS 变量主题 |
| 内容 | Markdown 元数据索引 + 路由 loader 按需加载正文 |
| 数学 | KaTeX（remark-math + rehype-katex） |
| 图标 | Lucide React |
| 测试 | Vitest |
| SEO | SSG 预渲染 `<title>`/`<meta>` + hreflang + Open Graph + Twitter Card + JSON-LD |
| GEO | `Content-Signal` 响应头（每篇文章） · `ai.txt` · `llms.txt` · robots.txt 全开放 |
| RSS | 双语言 RSS 自动生成 |
| Sitemap | 双语言 sitemap + hreflang 标注 + 确定性优先级计算 |
| CI | GitHub Actions — 类型检查 / 代码规范 / 构建 / 产物漂移校验 |
| 部署 | Vercel（GitHub push 自动构建） |

---

## 功能特色 | Features

- **SSG 预渲染** — 228 个页面构建期输出为静态 HTML，含完整文章正文与 SEO 元数据
- **代码分割** — 路由级 lazy loading，markdown 正文按需加载（不入 JS bundle）
- **中英双语** — 全站 UI 双语，`/`→中文，`/en`→英文，Locale 由 URL 派生（SSR 安全）
- **全文搜索** — 客户端实时搜索，支持标题/描述/标签匹配，URL 状态同步可分享
- **分类浏览** — 6 大领域动态筛选，URL 参数同步
- **哲学咨询** — `/about` 页面开放全球预约，PEACE 流程 + 北辰七德 + 苏格拉底对话
- **书架** — 书籍资源页面，数据驱动（`books.json`）
- **Markdown + LaTeX** — 完整学术排版，GFM 表格、代码块、数学公式
- **阅读进度条** — 文章页面顶部实时进度指示
- **克莱因蓝主题** — 月白底色 × 克莱因蓝主色 × 宋体排版 × 金黄色点缀
- **动效系统** — 滚动渐入、卡片悬浮光晕、页面过渡动画
- **SEO/GEO 完善** — hreflang 双语标注、Open Graph、Twitter Card、JSON-LD（WebSite + Article + BreadcrumbList）、每篇文章 `Content-Signal` 头
- **响应式** — 移动端 / 桌面端自适应
- **分享组件** — 悬浮分享按钮，支持复制链接 / 微信分享

---

## AI 友好化 | AI Accessibility

| 资源 | URL |
|------|-----|
| llms.txt | https://liang.world/llms.txt |
| ai.txt | https://liang.world/ai.txt |
| robots.txt | 完全开放（GPTBot, ClaudeBot, DeepSeekBot, Bytespider, Baiduspider 等 40+ 爬虫） |
| Content-Signal | `ai-train=yes, ai-input=yes, search=yes`（全部文章页面） |
| CORS | `Access-Control-Allow-Origin: *` |
| 许可证 | CC-BY-4.0 |

---

## 项目结构 | Structure

```
liang.world/
├── .github/workflows/
│   └── ci.yml                       # GitHub Actions CI（Node 22）
├── src/
│   ├── main.tsx                     # SSG 入口 (ViteReactSSG)
│   ├── App.tsx                      # 路由配置 (RouteRecord[])
│   ├── index.css                    # 全局样式 + CSS 变量主题 + 动画
│   ├── components/
│   │   ├── Layout.tsx               # 全局布局 + SEO Head + LanguageProvider
│   │   ├── Navbar.tsx               # 导航栏 + 语言切换 + 搜索入口
│   │   ├── Footer.tsx               # 页脚 + 站点统计
│   │   ├── PostCard.tsx             # 文章卡片
│   │   ├── SicasShare.tsx           # 悬浮分享按钮
│   │   └── SiteStats.tsx            # 站点统计（字数 / PV / UV）
│   ├── pages/
│   │   ├── Home.tsx                 # 首页
│   │   ├── BlogDetail.tsx           # 文章详情 (SSG loader + Component)
│   │   ├── Categories.tsx           # 分类筛选（URL 状态同步）
│   │   ├── Books.tsx                # 书架（数据驱动）
│   │   ├── About.tsx                # 关于 / 咨询预约（数据驱动）
│   │   └── Search.tsx               # 全文搜索
│   ├── context/
│   │   └── LanguageContext.tsx       # 双语上下文（URL 派生，SSR 安全）
│   ├── hooks/
│   │   └── useScrollProgress.ts     # 阅读进度
│   ├── lib/
│   │   ├── content.ts               # 内容加载（基于 posts-index.json）
│   │   └── utils.ts                 # cn() / formatDate() 工具
│   ├── types/
│   │   └── index.ts                 # TypeScript 类型 + UI 翻译字典
│   └── content/
│       ├── posts-index.json          # 文章元数据索引（构建期生成）
│       ├── about-content.ts          # About 页面双语内容
│       ├── books.json                # 书架数据
│       └── posts/
│           ├── zh/                   # 113 篇中文 Markdown
│           └── en/                   # 105 篇英文 Markdown
├── scripts/
│   ├── config.js                    # 共享配置（BASE_URL / 作者 / 分类）
│   ├── generate-content-index.js    # 文章元数据索引生成
│   ├── generate-rss.js              # 中英 RSS 生成
│   ├── generate-sitemap.js          # 中英 Sitemap 生成（确定性优先级）
│   ├── generate-news-sitemap.js     # News Sitemap
│   ├── generate-llms-txt.js         # llms.txt 生成
│   ├── generate-stats.js            # 站点统计（字数 / 文件数）
│   ├── normalize-frontmatter.js     # Frontmatter 规范化
│   ├── audit-posts.js               # 文章审计
│   ├── audit-extended.js            # 扩展审计
│   └── archive/                     # 历史一次性脚本归档
├── tests/
│   └── utils.test.ts                # 单元测试（Vitest）
├── public/                          # 静态资源
│   ├── ai.txt                       # AI 访问声明
│   ├── robots.txt                   # 爬虫权限（40+ 爬虫全开放）
│   ├── llms.txt                     # LLM 发现索引
│   ├── rss.xml / en-rss.xml         # 中英 RSS 订阅源
│   ├── sitemap.xml / en-sitemap.xml # 中英站点地图
│   ├── news-sitemap.xml             # 新闻站点地图
│   └── stats.json                   # 站点统计
├── index.html                       # HTML 模板 + JSON-LD
├── vite.config.ts                   # Vite + SSG 配置（dev 模式容错）
├── vercel.json                      # Vercel 部署配置（重定向/重写/CORS/Content-Signal）
├── tailwind.config.js               # Tailwind 配置 + typography 插件
├── tsconfig.json                    # TypeScript 配置（strict: true）
├── eslint.config.js                 # ESLint flat config
└── package.json
```

---

## 本地开发 | Dev

```bash
npm install              # 安装依赖
npm run dev              # 启动开发服务（SSR）
npm run dev:csr          # 启动纯 CSR 开发模式（可选）
npm run check            # TypeScript 类型检查
npm run lint             # ESLint
npm run test             # 运行单元测试（Vitest）
npm run build            # 生产构建（prebuild + TypeScript + SSG）
```

> 首次 clone 后直接运行 `npm run dev` 即可，`posts-index.json` 不存在时会自动回退为空索引。

---

## 构建流水线 | Build Pipeline

`npm run build` 依次执行：

```
prebuild（6 个生成器）
  ├── generate-content-index.js  → src/content/posts-index.json
  ├── generate-rss.js            → public/rss.xml + en-rss.xml
  ├── generate-sitemap.js        → public/sitemap.xml + en-sitemap.xml
  ├── generate-news-sitemap.js   → public/news-sitemap.xml
  ├── generate-llms-txt.js       → public/llms.txt
  └── generate-stats.js          → public/stats.json
       ↓
tsc -b（TypeScript 类型检查）
       ↓
vite-react-ssg build（228 页面 SSG 预渲染）
  ├── Vite client build
  ├── Vite SSR build
  ├── Rendering Pages (228)
  └── Generating static loader data
```

---

## 部署 | Deploy

推送至 `main` 分支自动触发 Vercel 构建：

```bash
git push origin main
```

GitHub Actions CI 同步运行验证流水线（type-check → lint → build → 确定性产物漂移校验）。

---

## 设计系统 | Design

| 要素 | 值 |
|------|-----|
| 背景 | `#F8FAFC` 月白 |
| 主色 | `#002FA7` 克莱因蓝 |
| 辅助蓝 | `#2563EB` |
| 点缀（黄） | `#E6AA14` 金黄 |
| 文字 | `#111119` 墨黑 |
| 辅助文字 | `#6B7280` |
| 字体 | 宋体（Noto Serif SC / SimSun / 宋体） |

主题通过 CSS 变量（`:root`）统一管理，Tailwind 通过 `rgb(var(--color-*) / <alpha-value>)` 引用。

---

## 架构要点 | Architecture Highlights

- **构建时与运行时分离**：`scripts/` 负责生成静态产物，`src/` 只消费预生成的 JSON 索引，Markdown 正文永不出现在客户端 bundle 中
- **SSG loader**：`BlogDetail.tsx` 的 loader 使用 `import.meta.env.SSR` 守卫，`node:fs`/`gray-matter` 在生产客户端中被 tree-shake
- **URL 驱动国际化**：Locale 从 URL 路径派生（`/en/...` → en），不依赖 localStorage/navigator，SSR 期间也能正确工作
- **数据驱动页面**：About 页面内容抽取为 `about-content.ts`，Books 数据抽取为 `books.json`
- **单一配置源**：`scripts/config.js` 集中管理 BASE_URL、作者、分类等常量
- **确定性构建**：Sitemap 优先级锚定于最新文章日期，而非 `Date.now()`，确保 CI 漂移校验通过
- **全面 AI 友好**：每篇文章页面响应 `Content-Signal` 头，robots.txt 覆盖 40+ 爬虫，llms.txt 提供完整文章索引

---

<p align="center">
  <sub>怀瑾握瑜 · 解惑忘隙</sub><br>
  <sub>React · Vite · TypeScript · vite-react-ssg · Vitest · Vercel</sub>
</p>
