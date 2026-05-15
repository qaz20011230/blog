import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const BASE_URL = 'https://liang.world';

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function generateSitemaps() {
  const zhFiles = await glob('src/content/posts/zh/*.md');
  const enFiles = await glob('src/content/posts/en/*.md');
  const enSlugs = new Set(enFiles.map(f => path.basename(f, '.md')));

  // === Chinese sitemap ===
  let zhUrls = [
    { loc: BASE_URL, priority: '1.0' },
    { loc: `${BASE_URL}/categories`, priority: '0.7' },
    { loc: `${BASE_URL}/books`, priority: '0.7' },
    { loc: `${BASE_URL}/about`, priority: '0.7' },
  ];

  for (const file of zhFiles) {
    const slug = path.basename(file, '.md');
    const enLoc = enSlugs.has(slug) ? `${BASE_URL}/en/post/${slug}` : null;
    zhUrls.push({
      loc: `${BASE_URL}/post/${slug}`,
      priority: '0.8',
      changefreq: 'monthly',
      enLoc,
    });
  }

  let zhXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  for (const u of zhUrls) {
    zhXml += `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <changefreq>${u.changefreq || 'weekly'}</changefreq>\n    <priority>${u.priority}</priority>\n`;
    if (u.enLoc) zhXml += `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(u.enLoc)}"/>\n`;
    zhXml += `    <xhtml:link rel="alternate" hreflang="zh" href="${escapeXml(u.loc)}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(u.loc)}"/>\n  </url>\n`;
  }
  zhXml += '</urlset>';
  fs.writeFileSync(path.resolve('public', 'sitemap.xml'), zhXml);
  console.log(`Generated sitemap.xml (${zhUrls.length} URLs)`);

  // === English sitemap ===
  let enUrls = [
    { loc: `${BASE_URL}/en`, priority: '1.0' },
    { loc: `${BASE_URL}/en/categories`, priority: '0.7' },
    { loc: `${BASE_URL}/en/books`, priority: '0.7' },
    { loc: `${BASE_URL}/en/about`, priority: '0.7' },
  ];

  for (const file of enFiles) {
    const slug = path.basename(file, '.md');
    const zhLoc = `${BASE_URL}/post/${slug}`;
    enUrls.push({
      loc: `${BASE_URL}/en/post/${slug}`,
      priority: '0.8',
      changefreq: 'monthly',
      zhLoc,
    });
  }

  let enXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  for (const u of enUrls) {
    enXml += `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <changefreq>${u.changefreq || 'weekly'}</changefreq>\n    <priority>${u.priority}</priority>\n`;
    if (u.zhLoc) enXml += `    <xhtml:link rel="alternate" hreflang="zh" href="${escapeXml(u.zhLoc)}"/>\n`;
    enXml += `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(u.loc)}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(u.zhLoc || u.loc)}"/>\n  </url>\n`;
  }
  enXml += '</urlset>';
  fs.writeFileSync(path.resolve('public', 'en-sitemap.xml'), enXml);
  console.log(`Generated en-sitemap.xml (${enUrls.length} URLs)`);
}

generateSitemaps().catch(console.error);
