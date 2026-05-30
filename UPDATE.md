# 项目更新记录 · Project Update Log

> **网站**: https://liang.world  
> **仓库**: github.com/qaz20011230/blog  
> **更新截至**: 2026-05-18

---

## 2026-05-18

### 新增文章
- **普罗米修斯之火：可控核聚变综述**（中英双语，约30,000字）
  - 2024-2026全球聚变里程碑综述：EAST 1066秒/NIF Q=4.13/HL-3 10²⁰/SPARC HTS磁体
  - AI for Fusion产业化（新烛时代6000万天使轮）
  - 菲娜睿特可信聚变AI研究
  - 六条临界路径评估 + 太空聚变思想实验
  - 32篇参考文献（修正[31]为Bussard原始文献）
  - 中文 102 篇 / 英文 99 篇

---

## 2026-05-17

### 咨询页面上线
- **关于/哲学咨询页面**重构上线
  - 良之哲学践行咨询：苏格拉底对话、PEACE流程、北辰七德
  - 按所在地最低工资1/10定价，每周3名额含1个公益名额
  - 中英双语，预约邮箱 contact@liang.world
  - 路由恢复 + 导航栏恢复

### README 更新
- 反映最新状态：102篇文章、6大分类、AI友好化、咨询页面

### 新增文章
- **颜值这件小事——关于容貌、教养与人生底气的长谈**（中英双语）
  - 康德澄清前提划定界限，犯罪学日常活动理论拆解容貌焦虑
  - 美貌溢价只在低门槛领域生效，缺爱的孩子才会在恋爱里溺水
- **Think Different：异常宣言**（中英双语）
  - 福柯规训权力、海德格尔常人、列维纳斯面容伦理、韩炳哲倦怠社会、维特根斯坦语言游戏
- **此在的志业——致择业时代的不易青年**（中英双语）
  - 马克思1835年中学作文、海德格尔现象学、注意力经济vs信任经济

---

## 2026-05-16

### AI 友好化改造
- **robots.txt** 重写为完全开放：明确 Allow GPTBot/ClaudeBot/PerplexityBot/Google-Extended 等25种爬虫
- **llms.txt** 创建：LLM发现标准，62条文章索引
- **ai.txt** 创建：AI训练/搜索许可声明
- **index.html** 更新：`llms` link + `ai-agents`/`llm-training`/`license` meta 标签
- **vercel.json** 更新：CORS `Access-Control-Allow-Origin: *` + Content-Signal `ai-train=yes`
- **Gate.tsx** 删除（已无人引用）
- ⚠️ 需手动关闭 Cloudflare AI Labyrinth：Security → Bots → 关闭 AI Labyrinth

### YAML 修复
- 修复 22 个英文文件 frontmatter 解析错误（标题中的冒号引号问题）

### 全站标点规范化
- 16篇中文文章：英文标点→中文标点
- 81篇英文文章：中文标点→英文标点
- 85篇中文文章：中英文混排间距规范化（GB标准）
- 192篇文章：清除尾部空格、归一化多余空行、日期格式去引号

### 分类整理
- 合并 `Logic` → `Mathematics & Logic`（修复3个文件+types+RSS脚本+normalize脚本）
- 统一6大分类：Philosophy / Psychology / AI & Technology / Mathematics & Logic / Business & Strategy / Culture & Art

---

## 2026-05-15

### Bug 修复
- **黑屏根因定位**：`Layout.tsx` 中 `react-helmet-async` 在客户端注入 `<script type="application/ld+json">` 导致 React hydration 崩溃
- **修复**：移除客户端 JSON-LD 注入，保留 `index.html` 中的静态 JSON-LD
- **About 页面**：简化后仍黑屏，暂时删除待未来重建

### SEO 优化
- 阿里巴巴前CTO橙色高亮徽章
- 全站 meta：keywords/description/OG Profile/Twitter Card/geo/theme
- JSON-LD Schema.org Person + WebSite 结构化数据

---

## 早期更新

### 文章新增
- 冗余的艺术——从Doris到Baza（AI & Technology）
- 逐日盗火——通往商用可控核聚变（AI & Technology）
- 光能聚合，黑核脉冲——聚变产业链全息地图（Business & Strategy）

### 架构优化
- 中文文章迁移至 `src/content/posts/zh/` 子目录
- RSS/Sitemap 双语言自动生成
- 分类系统重构为7大领域动态检测
- 移除黎曼猜想门禁，开放访问
- 修复双语路由同步（`/en` 路径自动切换locale）
- Buffer polyfill 兼容性修复

### 全站审计
- i18n国际化：Footer/SiteStats/alert提示支持中英双语
- 脚本修正：RSS分类列表、统计生成、分类映射表
- 内容修正：6篇文章移除重复H1标题

---

## 当前统计

| 指标 | 数值 |
|------|------|
| 文章总数 | **102 篇**（中英双版本） |
| 分类 | 6 大领域 |
| 中文 RSS | 102 篇 |
| 英文 RSS | 99 篇 |
| 中文 Sitemap | 104 URL |
| 英文 Sitemap | 101 URL |
| 部署 | Vercel + Cloudflare DNS |
| AI 友好 | llms.txt · ai.txt · robots.txt 完全开放 |
