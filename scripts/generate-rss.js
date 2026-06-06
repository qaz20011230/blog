import fs from 'fs';
import path from 'path';
import RSS from 'rss';
import matter from 'gray-matter';
import { BASE_URL, CONTACT_EMAIL, AUTHOR, SITE, CATEGORIES, CONTENT_DIRS } from './config.js';

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

function buildFeed({ locale, sitePath, feedFile, outFile }) {
  const meta = SITE[locale];
  const posts = parsePosts(CONTENT_DIRS[locale]);
  const author = AUTHOR[locale];
  const editor = `${CONTACT_EMAIL} (${author})`;
  const copyright = locale === 'zh'
    ? `© ${new Date().getFullYear()} 良之世界 (Liang.World)`
    : `© ${new Date().getFullYear()} Liang.World`;

  const feed = new RSS({
    title: meta.title,
    description: meta.description,
    feed_url: `${BASE_URL}${feedFile}`,
    site_url: `${BASE_URL}${sitePath}`,
    image_url: `${BASE_URL}/favicon.jpg`,
    managingEditor: editor,
    webMaster: editor,
    copyright,
    language: meta.language,
    pubDate: new Date(),
    ttl: 60,
    categories: CATEGORIES,
  });

  for (const p of posts) {
    const url = `${BASE_URL}${sitePath}/post/${p.slug}`;
    feed.item({ title: p.title, description: p.description, url, guid: url, categories: p.tags, author, date: p.date });
  }

  fs.writeFileSync(path.resolve('public', outFile), feed.xml({ indent: true }));
  console.log(`Generated ${outFile} (${posts.length} items)`);
}

function generateRSS() {
  console.log('Generating RSS feeds...');
  buildFeed({ locale: 'zh', sitePath: '', feedFile: '/rss.xml', outFile: 'rss.xml' });
  buildFeed({ locale: 'en', sitePath: '/en', feedFile: '/en/rss.xml', outFile: 'en-rss.xml' });
}

generateRSS();
