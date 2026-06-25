import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BASE_URL, STATIC_PAGES, CONTENT_DIRS } from './config.js';

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function normalizeDate(raw) {
  if (raw instanceof Date) return raw.toISOString().slice(0, 10);
  if (typeof raw === 'string') return raw.slice(0, 10);
  return '';
}

function readPostMeta(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    return {
      date: normalizeDate(data.date),
      pinned: Boolean(data.pinned),
    };
  } catch {
    return { date: '', pinned: false };
  }
}

/** Adaptive priority: newer posts get higher priority (0.9 → 0.5 over time).
 *  @param {string} dateStr
 *  @param {number} nowMs - deterministic anchor timestamp (latest post date)
 */
function computePriority(dateStr, nowMs) {
  if (!dateStr) return '0.6';
  const daysAgo = (nowMs - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24);
  if (!Number.isFinite(daysAgo)) return '0.6';
  if (daysAgo <= 7) return '0.9';
  if (daysAgo <= 30) return '0.8';
  if (daysAgo <= 180) return '0.7';
  if (daysAgo <= 365) return '0.6';
  return '0.5';
}

function latestPostTimestamp(files) {
  let latest = 0;
  for (const file of files) {
    const meta = readPostMeta(file);
    if (meta.date) {
      const t = new Date(meta.date).getTime();
      if (Number.isFinite(t) && t > latest) latest = t;
    }
  }
  return latest || Date.now();
}

function buildXml(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  for (const u of urls) {
    xml += `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n`;
    if (u.lastmod) xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${u.changefreq || 'weekly'}</changefreq>\n    <priority>${u.priority}</priority>\n`;
    for (const alt of u.alternates || []) {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeXml(alt.href)}"/>\n`;
    }
    xml += '  </url>\n';
  }
  xml += '</urlset>';
  return xml;
}

function staticUrls(prefix) {
  const root = `${BASE_URL}${prefix}` || BASE_URL;
  return [
    { loc: root, priority: '1.0', changefreq: 'daily' },
    ...STATIC_PAGES.map(page => ({ loc: `${root}/${page}`, priority: '0.7', changefreq: 'weekly' })),
  ];
}

function sortFilesByDateDesc(files) {
  return files.slice().sort((a, b) => {
    const ma = readPostMeta(a);
    const mb = readPostMeta(b);
    const da = ma.date ? new Date(ma.date).getTime() : 0;
    const db = mb.date ? new Date(mb.date).getTime() : 0;
    if (db !== da) return db - da;
    const sa = path.basename(a, '.md');
    const sb = path.basename(b, '.md');
    return sa < sb ? -1 : sa > sb ? 1 : 0;
  });
}

async function generateSitemaps() {
  const zhFiles = sortFilesByDateDesc((await import('glob')).glob.sync(`${CONTENT_DIRS.zh}/*.md`));
  const enFiles = sortFilesByDateDesc((await import('glob')).glob.sync(`${CONTENT_DIRS.en}/*.md`));
  const enSlugs = new Set(enFiles.map(f => path.basename(f, '.md')));

  const now = latestPostTimestamp([...zhFiles, ...enFiles]);

  // === Chinese sitemap ===
  const zhUrls = staticUrls('');
  for (const file of zhFiles) {
    const slug = path.basename(file, '.md');
    const meta = readPostMeta(file);
    const zhHref = `${BASE_URL}/post/${slug}`;
    const alternates = [
      { hreflang: 'zh', href: zhHref },
      { hreflang: 'x-default', href: zhHref },
    ];
    if (enSlugs.has(slug)) {
      alternates.unshift({ hreflang: 'en', href: `${BASE_URL}/en/post/${slug}` });
    }
    zhUrls.push({
      loc: zhHref,
      lastmod: meta.date || undefined,
      priority: computePriority(meta.date, now),
      changefreq: meta.pinned ? 'weekly' : 'monthly',
      alternates,
    });
  }
  fs.writeFileSync(path.resolve('public', 'sitemap.xml'), buildXml(zhUrls));
  console.log(`Generated sitemap.xml (${zhUrls.length} URLs)`);

  // === English sitemap ===
  const enUrls = staticUrls('/en');
  for (const file of enFiles) {
    const slug = path.basename(file, '.md');
    const meta = readPostMeta(file);
    const enHref = `${BASE_URL}/en/post/${slug}`;
    const zhHref = `${BASE_URL}/post/${slug}`;
    enUrls.push({
      loc: enHref,
      lastmod: meta.date || undefined,
      priority: computePriority(meta.date, now),
      changefreq: meta.pinned ? 'weekly' : 'monthly',
      alternates: [
        { hreflang: 'zh', href: zhHref },
        { hreflang: 'en', href: enHref },
        { hreflang: 'x-default', href: zhHref },
      ],
    });
  }
  fs.writeFileSync(path.resolve('public', 'en-sitemap.xml'), buildXml(enUrls));
  console.log(`Generated en-sitemap.xml (${enUrls.length} URLs)`);
}

generateSitemaps().catch(console.error);
