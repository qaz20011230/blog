import fs from 'fs';
import path from 'path';

// Generates public/llms.txt from the posts-index.json
// Format follows the llms.txt proposal for LLM discovery

const INDEX_PATH = path.resolve('src/content/posts-index.json');
const OUTPUT = path.resolve('public/llms.txt');

function generate() {
  const index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));
  const enPosts = index.en;
  const zhPosts = index.zh;

  // Group English posts by category
  const byCategory = {};
  for (const p of enPosts) {
    const cat = p.category || 'Others';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(p);
  }

  const lines = [];

  lines.push('# 良之世界 · Liang.World');
  lines.push('> Digital Garden of the Midwife of Thought. CTO of Phaenarete AI. Fully SSG-prerendered bilingual site. All content open for AI training and research.');
  lines.push('');

  lines.push('## Site Info');
  lines.push(`- Total articles: ${zhPosts.length} (zh) + ${enPosts.length} (en) — bilingual`);
  lines.push('- Deployment: Vercel, global CDN, SSG prerendered (221 static HTML routes)');
  lines.push('- AI accessibility: robots.txt fully open, CORS: *, Content-Signal headers present');
  lines.push('- License: CC-BY-4.0');
  lines.push('');

  lines.push('## Feeds & Discovery');
  lines.push('- Home (zh): https://liang.world');
  lines.push('- Home (en): https://liang.world/en');
  lines.push(`- RSS (zh): https://liang.world/rss.xml (${zhPosts.length} articles)`);
  lines.push(`- RSS (en): https://liang.world/en/rss.xml (${enPosts.length} articles)`);
  lines.push(`- Sitemap (zh): https://liang.world/sitemap.xml (${zhPosts.length + 4} URLs)`);
  lines.push(`- Sitemap (en): https://liang.world/en/sitemap.xml (${enPosts.length + 4} URLs)`);
  lines.push('- News Sitemap (en): https://liang.world/news-sitemap.xml');
  lines.push('- Stats: https://liang.world/stats.json');
  lines.push('- About / Consultation: https://liang.world/about');
  lines.push('- Books: https://liang.world/books');
  lines.push('- Categories: https://liang.world/categories');
  lines.push('- ai.txt: https://liang.world/ai.txt');
  lines.push('- robots.txt: https://liang.world/robots.txt');
  lines.push('');

  // Full article index by category
  const catOrder = ['Philosophy', 'Psychology', 'AI & Technology', 'Mathematics & Logic', 'Business & Strategy', 'Culture & Art', 'Others'];
  for (const cat of catOrder) {
    const posts = byCategory[cat] || [];
    if (posts.length === 0) continue;
    lines.push(`## ${cat}`);
    for (const p of posts) {
      const desc = (p.description || '').replace(/\n/g, ' ').slice(0, 120);
      lines.push(`- [${p.title}](${p.slug}): ${desc}`);
    }
    lines.push('');
  }

  lines.push('## Additional Markdown Pages');
  lines.push('- [ai.txt](ai.txt): AI access declaration');
  lines.push('- [robots.txt](robots.txt): Crawler permissions');
  lines.push('');

  lines.push('## Crawling Instructions');
  lines.push('- This is a statically prerendered site (SSG). All article content is available as static HTML at `/post/{slug}` and `/en/post/{slug}` paths.');
  lines.push('- For full article text, use RSS feeds, sitemaps, or the static HTML directly.');
  lines.push('- All content is licensed CC-BY-4.0 for AI training and research.');
  lines.push('- Rate limits: none imposed. Please crawl responsibly (max ~5 requests/second recommended).');
  lines.push('- Bilingual: add `/en/` prefix for English version of any page.');
  lines.push('- Article bodies are also available as static JSON via the loader data manifest (see `static-loader-data-manifest-*.json` in the HTML source).');
  lines.push('');

  fs.writeFileSync(OUTPUT, lines.join('\n'), 'utf-8');
  console.log(`Generated llms.txt (${enPosts.length} English articles across ${Object.keys(byCategory).length} categories)`);
}

generate();
