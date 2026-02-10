import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';

const BASE_URL = 'https://liang.world';
const OUTPUT_FILE = path.resolve('public', 'sitemap.xml');

// Static routes
const staticRoutes = [
  '',
  '/about',
  '/weekly',
  '/categories'
];

async function generateSitemap() {
  console.log('Generating sitemap...');

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static routes
  staticRoutes.forEach(route => {
    xml += `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Add blog posts
  const postFiles = await glob('src/content/posts/*.md');
  for (const file of postFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const { data } = matter(content);
    const slug = path.basename(file, '.md');
    const date = data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

    xml += `
  <url>
    <loc>${BASE_URL}/posts/${slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }

  // Add weekly issues
  const weeklyFiles = await glob('src/content/weekly/*.md');
  for (const file of weeklyFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const { data } = matter(content);
    const slug = path.basename(file, '.md');
    const date = data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

    xml += `
  <url>
    <loc>${BASE_URL}/weekly/${slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  xml += `
</urlset>`;

  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log(`Sitemap generated at ${OUTPUT_FILE}`);
}

generateSitemap().catch(console.error);
