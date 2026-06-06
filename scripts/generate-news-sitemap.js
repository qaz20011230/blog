import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BASE_URL, CONTENT_DIRS } from './config.js';

// Generates public/news-sitemap.xml — Google News sitemap for recent articles

const OUTPUT = path.resolve('public', 'news-sitemap.xml');
const RECENT_DAYS = 2; // Articles published within last 2 days

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generate() {
  const cutoff = Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000;
  const urls = [];

  for (const locale of ['zh', 'en']) {
    const dir = CONTENT_DIRS[locale];
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

    for (const f of files) {
      try {
        const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
        const { data } = matter(raw);
        const date = data.date;
        if (!date) continue;

        const time = new Date(date).getTime();
        if (Number.isNaN(time) || time < cutoff) continue;

        const slug = f.replace(/\.md$/, '');
        const prefix = locale === 'en' ? '/en' : '';
        const url = `${BASE_URL}${prefix}/post/${slug}`;
        const title = data.title || slug;

        urls.push({
          loc: url,
          news: {
            publication: { name: '良之世界 · Liang.World', language: locale === 'zh' ? 'zh' : 'en' },
            publication_date: new Date(date).toISOString(),
            title,
          },
        });
      } catch {
        // skip unparseable files
      }
    }
  }

  if (urls.length === 0) {
    // Generate an empty but valid sitemap to avoid 404
    urls.push({
      loc: `${BASE_URL}/`,
      news: {
        publication: { name: 'Liang.World', language: 'en' },
        publication_date: new Date().toISOString(),
        title: 'Latest Articles',
      },
    });
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';
  for (const u of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(u.loc)}</loc>\n`;
    xml += '    <news:news>\n';
    xml += `      <news:publication>\n        <news:name>${escapeXml(u.news.publication.name)}</news:name>\n        <news:language>${u.news.publication.language}</news:language>\n      </news:publication>\n`;
    xml += `      <news:publication_date>${u.news.publication_date}</news:publication_date>\n`;
    xml += `      <news:title>${escapeXml(u.news.title)}</news:title>\n`;
    xml += '    </news:news>\n';
    xml += '  </url>\n';
  }
  xml += '</urlset>';

  fs.writeFileSync(OUTPUT, xml, 'utf-8');
  console.log(`Generated news-sitemap.xml (${urls.length} URLs, last ${RECENT_DAYS} days)`);
}

generate();
