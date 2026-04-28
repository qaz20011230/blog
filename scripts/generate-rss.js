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
    managingEditor: 'contact@example.com (思想助产士)',
    webMaster: 'contact@example.com (思想助产士)',
    copyright: `© ${new Date().getFullYear()} LeoZ Universe`,
    language: 'zh-CN',
    pubDate: new Date(),
    ttl: 60,
  });

  // Add blog posts
  const postFiles = await glob('src/content/posts/*.md');
  const posts = postFiles
    .map((file) => {
      const content = fs.readFileSync(file, 'utf-8');
      const { data } = matter(content);
      const slug = path.basename(file, '.md');

      return {
        slug,
        title: data.title,
        description: data.description,
        tags: data.tags || [],
        date: data.date,
        pinned: Boolean(data.pinned),
      };
    })
    .sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return Number(b.pinned) - Number(a.pinned);
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  for (const post of posts) {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/post/${post.slug}`,
      guid: `${BASE_URL}/post/${post.slug}`,
      categories: post.tags,
      author: '思想助产士',
      date: post.date,
    });
  }

  const xml = feed.xml({ indent: true });
  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log(`RSS feed generated at ${OUTPUT_FILE}`);
}

generateRSS().catch(console.error);
