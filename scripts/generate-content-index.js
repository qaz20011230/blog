import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CONTENT_DIRS } from './config.js';

// Generates src/content/posts-index.json — a metadata-only index of all posts
// (no bodies). This is bundled into the client for list pages, keeping the
// markdown bodies out of the JS bundle. Post bodies are loaded on demand via
// route loaders (see src/pages/BlogDetail.tsx).

const OUTPUT_FILE = path.resolve('src', 'content', 'posts-index.json');

function normalizeDate(rawDate) {
  if (rawDate instanceof Date) return rawDate.toISOString().slice(0, 10);
  if (typeof rawDate === 'string') return rawDate;
  return '';
}

function dateToTime(date) {
  const time = new Date(date).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function buildIndex(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  const posts = [];
  for (const f of files) {
    try {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
      const { data } = matter(raw);
      const slug = f.replace(/\.md$/, '');
      posts.push({
        slug,
        title: typeof data.title === 'string' ? data.title : slug,
        date: normalizeDate(data.date),
        description: typeof data.description === 'string' ? data.description : '',
        category: data.category || 'Others',
        tags: Array.isArray(data.tags) ? data.tags : [],
        pinned: Boolean(data.pinned),
      });
    } catch (e) {
      console.warn(`  [SKIP] ${f}: ${String(e.message).slice(0, 80)}`);
    }
  }
  return posts.sort((a, b) => {
    if (a.pinned !== b.pinned) return Number(b.pinned) - Number(a.pinned);
    return dateToTime(b.date) - dateToTime(a.date);
  });
}

function generate() {
  console.log('Generating content index...');
  const index = {
    zh: buildIndex(CONTENT_DIRS.zh),
    en: buildIndex(CONTENT_DIRS.en),
  };
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index) + '\n', 'utf-8');
  console.log(`Generated posts-index.json (zh: ${index.zh.length}, en: ${index.en.length})`);
}

generate();
