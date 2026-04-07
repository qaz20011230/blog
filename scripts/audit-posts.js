import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'src', 'content', 'posts');

const ALLOWED_CATEGORIES = new Set(['Philosophy', 'Psychology', 'Logic', 'Ecommerce']);

function listMarkdownFiles(dir) {
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
}

function normalizeTitle(title) {
  return String(title || '').trim();
}

function auditDuplicatesByTitle() {
  const files = listMarkdownFiles(postsDir);
  const byTitle = new Map();

  const missingDescription = [];
  const invalidCategory = [];
  const invalidDate = [];

  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const title = normalizeTitle(parsed.data.title);
    const date = String(parsed.data.date || '').trim();
    const category = String(parsed.data.category || '').trim();
    const description = String(parsed.data.description || '').trim();

    if (!description) missingDescription.push(file);
    if (category && !ALLOWED_CATEGORIES.has(category)) invalidCategory.push({ file, category });
    if (!date || Number.isNaN(new Date(date).getTime())) invalidDate.push({ file, date });

    if (!title) continue;

    const list = byTitle.get(title) ?? [];
    list.push({ file, date, category, bytes: raw.length });
    byTitle.set(title, list);
  }

  const duplicates = [...byTitle.entries()].filter(([, list]) => list.length > 1);
  duplicates.sort((a, b) => b[1].length - a[1].length);

  console.log(`Posts scanned: ${files.length}`);
  console.log(`Missing description: ${missingDescription.length}`);
  console.log(`Invalid category: ${invalidCategory.length}`);
  console.log(`Invalid date: ${invalidDate.length}`);

  if (missingDescription.length > 0) {
    console.log('\nMissing description files:');
    missingDescription.slice(0, 50).forEach((f) => console.log(` - ${f}`));
  }

  if (invalidCategory.length > 0) {
    console.log('\nInvalid category files:');
    invalidCategory.slice(0, 50).forEach((it) => console.log(` - ${it.file}: ${it.category}`));
  }

  if (invalidDate.length > 0) {
    console.log('\nInvalid date files:');
    invalidDate.slice(0, 50).forEach((it) => console.log(` - ${it.file}: ${it.date}`));
  }

  if (duplicates.length === 0) {
    console.log('\nNo duplicate titles found.');
    return;
  }

  for (const [title, list] of duplicates) {
    console.log(`\n=== ${title} (${list.length}) ===`);
    list
      .slice()
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
      .forEach((it) => {
        console.log(` - ${it.file} | ${it.date} | ${it.category} | ${it.bytes} bytes`);
      });
  }
}

auditDuplicatesByTitle();
