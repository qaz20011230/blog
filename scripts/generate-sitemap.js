import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { BASE_URL, STATIC_PAGES, CONTENT_DIRS } from './config.js';

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildXml(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  for (const u of urls) {
    xml += `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <changefreq>${u.changefreq || 'weekly'}</changefreq>\n    <priority>${u.priority}</priority>\n`;
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
    { loc: root, priority: '1.0' },
    ...STATIC_PAGES.map(page => ({ loc: `${root}/${page}`, priority: '0.7' })),
  ];
}

async function generateSitemaps() {
  const zhFiles = await glob(`${CONTENT_DIRS.zh}/*.md`);
  const enFiles = await glob(`${CONTENT_DIRS.en}/*.md`);
  const enSlugs = new Set(enFiles.map(f => path.basename(f, '.md')));

  // === Chinese sitemap ===
  const zhUrls = staticUrls('');
  for (const file of zhFiles) {
    const slug = path.basename(file, '.md');
    const zhHref = `${BASE_URL}/post/${slug}`;
    const alternates = [
      { hreflang: 'zh', href: zhHref },
      { hreflang: 'x-default', href: zhHref },
    ];
    if (enSlugs.has(slug)) {
      alternates.unshift({ hreflang: 'en', href: `${BASE_URL}/en/post/${slug}` });
    }
    zhUrls.push({ loc: zhHref, priority: '0.8', changefreq: 'monthly', alternates });
  }
  fs.writeFileSync(path.resolve('public', 'sitemap.xml'), buildXml(zhUrls));
  console.log(`Generated sitemap.xml (${zhUrls.length} URLs)`);

  // === English sitemap ===
  const enUrls = staticUrls('/en');
  for (const file of enFiles) {
    const slug = path.basename(file, '.md');
    const enHref = `${BASE_URL}/en/post/${slug}`;
    const zhHref = `${BASE_URL}/post/${slug}`;
    enUrls.push({
      loc: enHref,
      priority: '0.8',
      changefreq: 'monthly',
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
