import fs from 'fs';
import path from 'path';
import RSS from 'rss';
import { glob } from 'glob';
import matter from 'gray-matter';

const BASE_URL = 'https://liang.world';
const OUTPUT_FILE = path.resolve('public', 'rss.xml');

async function generateRSS() {
  console.log('Generating RSS feed...');

  const feed = new RSS({
    title: '良之世界 | 思想助产士',
    description: '怀瑾握瑜，解惑忘隙。融合精神分析、哲学践行与商业逻辑，助你澄清概念、暴露预设、重构认知。',
    feed_url: `${BASE_URL}/rss.xml`,
    site_url: BASE_URL,
    image_url: `${BASE_URL}/favicon.jpg`,
    managingEditor: 'contact@liang.world (思想助产士)',
    webMaster: 'contact@liang.world (思想助产士)',
    copyright: `© ${new Date().getFullYear()} Liang's World`,
    language: 'zh-CN',
    pubDate: new Date(),
    ttl: 60,
  });

  // Add blog posts
  const postFiles = await glob('src/content/posts/*.md');
  for (const file of postFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const { data } = matter(content);
    const slug = path.basename(file, '.md');
    
    feed.item({
      title: data.title,
      description: data.description,
      url: `${BASE_URL}/post/${slug}`,
      guid: `${BASE_URL}/post/${slug}`,
      categories: data.tags || [],
      author: '思想助产士',
      date: data.date,
    });
  }

  // Add weekly issues
  const weeklyFiles = await glob('src/content/weekly/*.md');
  for (const file of weeklyFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const { data } = matter(content);
    const slug = path.basename(file, '.md');
    
    feed.item({
      title: data.title,
      description: data.description,
      url: `${BASE_URL}/weekly/${slug}`,
      guid: `${BASE_URL}/weekly/${slug}`,
      categories: ['Weekly'],
      author: '思想助产士',
      date: data.date,
    });
  }

  // Sort items by date (descending) is handled by most readers, but let's ensure order if needed
  // RSS package adds items in order, so we might want to sort files first if strict order is needed.
  // For now, glob order is file system dependent, usually fine for build.

  const xml = feed.xml({ indent: true });
  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log(`RSS feed generated at ${OUTPUT_FILE}`);
}

generateRSS().catch(console.error);
