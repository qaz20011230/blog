import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';

const BASE_URL = 'https://liang.world';
const OUTPUT_FILE = path.resolve('public', 'sitemap.xml');

const STATIC_PAGES = ['', '/categories', '/books', '/about'];

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function generateSitemap() {
  console.log('Generating sitemap.xml...');

  const urls = [];

  // Static pages
  for (const page of STATIC_PAGES) {
    urls.push({
      loc: `${BASE_URL}${page}`,
      priority: page === '' ? '1.0' : '0.7',
      changefreq: 'weekly',
    });
  }

  // Blog posts
  const postFiles = await glob('src/content/posts/*.md');
  for (const file of postFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const { data } = matter(content);
    const slug = path.basename(file, '.md');

    urls.push({
      loc: `${BASE_URL}/post/${slug}`,
      lastmod: data.date || new Date().toISOString().split('T')[0],
      priority: '0.8',
      changefreq: 'monthly',
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log(`Sitemap generated at ${OUTPUT_FILE} (${urls.length} URLs)`);
}

generateSitemap().catch(console.error);
