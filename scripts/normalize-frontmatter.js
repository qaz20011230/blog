import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
import matter from 'gray-matter';

const CATEGORY_CANON = new Map([
  ['philosophy', 'Philosophy'],
  ['psychology', 'Psychology'],
  ['logic', 'Logic'],
  ['ecommerce', 'Ecommerce'],
  ['e-commerce', 'Ecommerce'],
  ['e commerce', 'Ecommerce'],
  ['e_commerce', 'Ecommerce'],
]);

function toIsoDateString(value) {
  if (!value) return '';

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  const s = String(value).trim();
  if (!s) return '';

  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;

  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);

  return s;
}

function normalizeCategory(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const key = raw.toLowerCase();
  return CATEGORY_CANON.get(key) ?? raw;
}

function stripMarkdown(markdown) {
  let s = String(markdown || '');

  s = s.replace(/```[\s\S]*?```/g, ' ');
  s = s.replace(/`[^`]*`/g, ' ');
  s = s.replace(/<[^>]+>/g, ' ');
  s = s.replace(/^\s{0,3}#{1,6}\s+/gm, '');
  s = s.replace(/^\s*>\s?/gm, '');
  s = s.replace(/^\s*[-*+]\s+/gm, '');
  s = s.replace(/^\s*\d+\.\s+/gm, '');
  s = s.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1');
  s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  s = s.replace(/\*\*([^*]+)\*\*/g, '$1');
  s = s.replace(/\*([^*]+)\*/g, '$1');
  s = s.replace(/_([^_]+)_/g, '$1');
  s = s.replace(/\s+/g, ' ');
  return s.trim();
}

function isCjk(text) {
  return /[\u3400-\u9FFF]/.test(text);
}

function generateDescriptionFromBody(body, title) {
  const raw = String(body || '');
  const blocks = raw
    .split(/\n\s*\n/g)
    .map((b) => stripMarkdown(b))
    .map((b) => b.replace(/^[-–—\s]+/, '').trim())
    .filter(Boolean);

  const candidate = blocks.find((b) => b.length >= 24) ?? blocks[0] ?? '';
  const fallback = candidate || String(title || '').trim();

  const maxLen = isCjk(fallback) ? 120 : 200;
  if (fallback.length <= maxLen) return fallback;

  const clipped = fallback.slice(0, maxLen);
  return isCjk(clipped) ? `${clipped}…` : `${clipped.trim()}…`;
}

function orderPostFrontmatter(data, body, filePath) {
  const ordered = {};

  const title = String(data.title || '').trim();
  const date = toIsoDateString(data.date);
  const category = normalizeCategory(data.category);
  const tags = Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [];
  const description = String(data.description || '').trim() || generateDescriptionFromBody(body, title);

  if (title) ordered.title = title;
  if (date) ordered.date = date;
  if (category) ordered.category = category;
  if (tags.length) ordered.tags = tags;
  ordered.description = description;

  const keptKeys = new Set(['title', 'date', 'category', 'tags', 'description']);
  for (const [k, v] of Object.entries(data)) {
    if (keptKeys.has(k)) continue;
    ordered[k] = v;
  }

  return { ordered, category, filePath };
}

function orderWeeklyFrontmatter(data, body) {
  const ordered = {};

  const title = String(data.title || '').trim();
  const date = toIsoDateString(data.date);
  const issueNumber = data.issueNumber;
  const description = String(data.description || '').trim() || generateDescriptionFromBody(body, title);

  if (title) ordered.title = title;
  if (date) ordered.date = date;
  if (typeof issueNumber !== 'undefined') ordered.issueNumber = issueNumber;
  ordered.description = description;

  const keptKeys = new Set(['title', 'date', 'issueNumber', 'description']);
  for (const [k, v] of Object.entries(data)) {
    if (keptKeys.has(k)) continue;
    ordered[k] = v;
  }

  return ordered;
}

function orderBookFrontmatter(data, body) {
  const ordered = {};

  const title = String(data.title || '').trim();
  const author = String(data.author || '').trim();
  const publishDate = toIsoDateString(data.publishDate);
  const downloadUrl = String(data.downloadUrl || '').trim();
  const coverImage = String(data.coverImage || '').trim();
  const description = String(data.description || '').trim() || generateDescriptionFromBody(body, title);

  if (title) ordered.title = title;
  if (author) ordered.author = author;
  if (coverImage) ordered.coverImage = coverImage;
  if (description) ordered.description = description;
  if (publishDate) ordered.publishDate = publishDate;
  if (downloadUrl) ordered.downloadUrl = downloadUrl;

  const keptKeys = new Set(['title', 'author', 'coverImage', 'description', 'publishDate', 'downloadUrl']);
  for (const [k, v] of Object.entries(data)) {
    if (keptKeys.has(k)) continue;
    ordered[k] = v;
  }

  return ordered;
}

async function normalizeAll() {
  const postFiles = await glob('src/content/posts/*.md');
  const weeklyFiles = await glob('src/content/weekly/*.md');
  const bookFiles = await glob('src/content/books/*.md');

  const invalidCategories = [];

  for (const file of postFiles) {
    const raw = fs.readFileSync(file, 'utf8');
    const parsed = matter(raw);
    const { ordered, category } = orderPostFrontmatter(parsed.data, parsed.content, file);
    const normalized = matter.stringify(parsed.content, ordered);
    fs.writeFileSync(file, normalized, 'utf8');

    const canon = normalizeCategory(category);
    if (canon && canon !== 'Philosophy' && canon !== 'Psychology' && canon !== 'Logic' && canon !== 'Ecommerce') {
      invalidCategories.push({ file, category: canon });
    }
  }

  for (const file of weeklyFiles) {
    const raw = fs.readFileSync(file, 'utf8');
    const parsed = matter(raw);
    const ordered = orderWeeklyFrontmatter(parsed.data, parsed.content);
    const normalized = matter.stringify(parsed.content, ordered);
    fs.writeFileSync(file, normalized, 'utf8');
  }

  for (const file of bookFiles) {
    const raw = fs.readFileSync(file, 'utf8');
    const parsed = matter(raw);
    const ordered = orderBookFrontmatter(parsed.data, parsed.content);
    const normalized = matter.stringify(parsed.content, ordered);
    fs.writeFileSync(file, normalized, 'utf8');
  }

  if (invalidCategories.length > 0) {
    console.log('Invalid categories found (need manual fix):');
    for (const it of invalidCategories) {
      console.log(` - ${it.file}: ${it.category}`);
    }
    process.exitCode = 2;
  } else {
    console.log('Frontmatter normalized. All categories are canonical.');
  }
}

normalizeAll().catch((err) => {
  console.error(err);
  process.exit(1);
});

