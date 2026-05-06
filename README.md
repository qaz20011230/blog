# LeoZ Universe · 个人博客

<p align="center">
  <strong>liang-world.vercel.app</strong>
</p>

<p align="center">
  <strong>中文</strong>
</p>

---

## 关于本站

LeoZ Universe 是基于 **React + TypeScript + Vite + Express** 构建的个人博客，使用 Markdown + Obsidian 管理内容，通过 Vercel 部署。

支持数学公式渲染、RSS 订阅、归档与分类浏览，是技术写作与知识分享的数字空间。

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript 5.8 |
| 构建 | Vite 6 |
| 样式 | Tailwind CSS 3 + `@tailwindcss/typography` |
| 路由 | React Router v7 |
| 服务端 | Express 4 (开发代理 + API) |
| 内容 | Markdown → react-markdown + remark-gfm |
| 数学 | KaTeX (remark-math + rehype-katex) |
| 状态 | Zustand |
| 图标 | Lucide React |
| SEO | react-helmet-async |
| RSS | `rss` 包 + 自动生成脚本 |
| 部署 | Vercel (`@vercel/node`) |
| 内容管理 | Obsidian |
| Lint | ESLint 9 + TypeScript ESLint |

## 功能特色

- **Markdown 渲染** — 支持 GFM 表格、任务列表、代码高亮
- **数学公式** — KaTeX 引擎，LaTeX 语法实时渲染
- **RSS 订阅** — 自动生成 `rss.xml`
- **归档系统** — 按年份 / 标签分类浏览
- **书籍页面** — 读书笔记与书单管理
- **SEO 优化** — 动态 `<title>` + `<meta>` 标签
- **响应式** — 移动端 / 桌面端自适应

## 项目结构

```
blog/
├── src/
│   ├── main.tsx              # 入口
│   ├── App.tsx               # 根组件 + 路由
│   ├── components/           # 通用组件
│   ├── pages/                # 页面组件
│   ├── content/              # Markdown 文章
│   ├── hooks/                # 自定义 Hooks
│   ├── lib/                  # 工具函数
│   ├── types/                # TypeScript 类型
│   └── assets/               # 静态资源
├── api/                      # Express 服务端
│   ├── server.ts             # 服务入口
│   └── routes/               # API 路由
├── public/                   # 静态文件
│   ├── archives/             # 归档页面数据
│   ├── books/                # 书籍数据
│   ├── favicon.jpg
│   ├── robots.txt
│   └── rss.xml               # RSS 订阅源
├── scripts/                  # 构建脚本
│   ├── generate-rss.js       # RSS 生成
│   └── generate-stats.js     # 统计生成
├── .obsidian/                # Obsidian 配置
├── vercel.json               # Vercel 部署配置
├── vite.config.ts
└── tailwind.config.js
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务（前端 + 后端并行）
npm run dev

# 仅前端
npm run client:dev

# 仅后端
npm run server:dev

# 构建
npm run build

# 预览构建结果
npm run preview
```

## 内容管理

所有文章以 Markdown 格式存放在 `src/content/` 目录下，通过 [Obsidian](https://obsidian.md) 进行本地编辑。文章支持 YAML Front Matter：

```yaml
---
title: 文章标题
date: 2024-01-01
tags: [技术, 前端]
description: 文章摘要
---
```

## 部署

项目通过 Vercel 自动部署：

```bash
# 推送到 main 分支自动触发部署
git push origin main

# 生产地址
https://liang-world.vercel.app
```

配置文件 `vercel.json` 控制部署行为，Express API 通过 `@vercel/node` 适配器运行。

## 技术依赖

| 类别 | 包 |
|------|-----|
| 内容渲染 | `react-markdown`, `remark-gfm`, `remark-math`, `rehype-katex`, `rehype-raw` |
| 样式 | `tailwindcss`, `@tailwindcss/typography`, `tailwind-merge`, `clsx` |
| 工具 | `date-fns`, `gray-matter`, `buffer`, `dotenv` |
| 构建 | `vite`, `typescript`, `autoprefixer`, `postcss` |
| 开发 | `nodemon`, `concurrently`, `eslint`, `tsx` |
| 部署 | `@vercel/node`, `vite-tsconfig-paths` |

---

<p align="center">
  <sub>Built with React · Vite · TypeScript · Deployed on Vercel</sub>
</p>
