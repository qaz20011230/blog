import fs from 'fs';
import path from 'path';
import RSS from 'rss';
import { glob } from 'glob';
import matter from 'gray-matter';

const BASE_URL = 'https://liang.world';

function parsePosts(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  return files.map(f => {
    try {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
      const { data } = matter(raw);
      const slug = f.replace('.md', '');
      return { slug, title: data.title || '', description: data.description || '', tags: data.tags || [], date: data.date, pinned: Boolean(data.pinned) };
    } catch (e) {
      console.warn(`  [SKIP] ${f}: ${e.message.substring(0, 80)}`);
      return null;
    }
  }).filter(Boolean).sort((a, b) => {
    if (a.pinned !== b.pinned) return Number(b.pinned) - Number(a.pinned);
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

async function generateRSS() {
  console.log('Generating RSS feeds...');

  // Chinese RSS
  const zhPosts = parsePosts('src/content/posts/zh');
  const zhFeed = new RSS({
    title: '良之世界 | Liang.World',
    description: '怀瑾握瑜，解惑忘隙。融合精神分析、哲学践行与商业逻辑。',
    feed_url: `${BASE_URL}/rss.xml`,
    site_url: BASE_URL,
    image_url: `${BASE_URL}/favicon.jpg`,
    managingEditor: 'contact@liang.world (思想助产士)',
    webMaster: 'contact@liang.world (思想助产士)',
    copyright: `© ${new Date().getFullYear()} 良之世界 (Liang.World)`,
    language: 'zh-CN',
    pubDate: new Date(),
    ttl: 60,
    categories: ['Philosophy', 'Psychology', 'Logic', 'Ecommerce', 'Others'],
  });
  for (const p of zhPosts) {
    zhFeed.item({ title: p.title, description: p.description, url: `${BASE_URL}/post/${p.slug}`, guid: `${BASE_URL}/post/${p.slug}`, categories: p.tags, author: '思想助产士', date: p.date });
  }
  fs.writeFileSync(path.resolve('public', 'rss.xml'), zhFeed.xml({ indent: true }));
  console.log(`Generated rss.xml (${zhPosts.length} items)`);

  // English RSS
  const enPosts = parsePosts('src/content/posts/en');
  const enFeed = new RSS({
    title: 'Liang.World | Midwife of Thought',
    description: 'Where psychoanalysis, philosophical practice, and business logic converge.',
    feed_url: `${BASE_URL}/en/rss.xml`,
    site_url: `${BASE_URL}/en`,
    image_url: `${BASE_URL}/favicon.jpg`,
    managingEditor: 'contact@liang.world (Ang Li)',
    webMaster: 'contact@liang.world (Ang Li)',
    copyright: `© ${new Date().getFullYear()} Liang.World`,
    language: 'en',
    pubDate: new Date(),
    ttl: 60,
    categories: ['Philosophy', 'Psychology', 'Logic', 'Ecommerce', 'Others'],
  });
  for (const p of enPosts) {
    enFeed.item({ title: p.title, description: p.description, url: `${BASE_URL}/en/post/${p.slug}`, guid: `${BASE_URL}/en/post/${p.slug}`, categories: p.tags, author: 'Ang Li', date: p.date });
  }
  fs.writeFileSync(path.resolve('public', 'en-rss.xml'), enFeed.xml({ indent: true }));
  console.log(`Generated en-rss.xml (${enPosts.length} items)`);
}

generateRSS().catch(console.error);
