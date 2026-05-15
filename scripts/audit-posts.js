import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const dir = 'src/content/posts/zh';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let errors = [];
let warnings = [];

for (const f of files) {
  const filePath = path.join(dir, f);
  const raw = fs.readFileSync(filePath, 'utf-8');

  // 1. YAML validation
  let data;
  try {
    const parsed = matter(raw);
    data = parsed.data;
  } catch (e) {
    errors.push(`[YAML] ${f}: ${e.message.substring(0, 150)}`);
    continue;
  }

  // 2. Required fields
  if (!data.title) warnings.push(`[MISSING title] ${f}`);
  if (!data.date) warnings.push(`[MISSING date] ${f}`);
  if (!data.category) warnings.push(`[MISSING category] ${f}`);

  // 3. Content checks
  const content = raw;

  // Unclosed LaTeX delimiters
  const inlineDollar = (content.match(/(?<!\$)\$(?!\$)/g) || []).length;
  if (inlineDollar % 2 !== 0) {
    warnings.push(`[UNPAIRED $] ${f}: ${inlineDollar} single $ signs`);
  }

  const openParen = (content.match(/\\\(/g) || []).length;
  const closeParen = (content.match(/\\\)/g) || []).length;
  if (openParen !== closeParen) {
    warnings.push(`[UNPAIRED \\(] ${f}: \\( ${openParen} vs \\) ${closeParen}`);
  }

  const openBracket = (content.match(/\\\[/g) || []).length;
  const closeBracket = (content.match(/\\\]/g) || []).length;
  if (openBracket !== closeBracket) {
    warnings.push(`[UNPAIRED \\[] ${f}: \\[ ${openBracket} vs \\] ${closeBracket}`);
  }

  // Suspicious --- patterns (could be broken YAML or HR markers)
  const bodyText = content.replace(/^---[\s\S]*?---/, ''); // remove frontmatter
  const hLines = (bodyText.match(/^---\s*$/gm) || []).length;
  // Check for --- directly after frontmatter (broken)
  if (/^---[\s\S]*?---\n---/.test(content)) {
    warnings.push(`[ADJACENT ---] ${f}: possible duplicate frontmatter markers`);
  }

  // Check for stray YAML markers inside content
  if (/^---\S/.test(bodyText)) {
    warnings.push(`[INLINE ---#] ${f}: --- followed by text on same line`);
  }

  // Check for <br> or HTML that should be markdown
  if (/<br\s*\/?>/.test(bodyText)) {
    warnings.push(`[HTML <br>] ${f}`);
  }

  // Check for unescaped pipes in table cells that might break tables
  const tableLines = bodyText.split('\n').filter(l => /^\|.*\|$/.test(l.trim()));
  if (tableLines.length > 0) {
    // Check table consistency
    const sepLineIdx = tableLines.findIndex((l, i) => i > 0 && /^\|[\s\-:|]+\|$/.test(l));
  }
}

// Report
console.log(`\n=== AUDIT REPORT ===`);
console.log(`Total posts: ${files.length}`);
console.log(`Errors (YAML): ${errors.length}`);
console.log(`Warnings: ${warnings.length}\n`);

if (errors.length > 0) {
  console.log('--- ERRORS ---');
  errors.forEach(e => console.log('  ' + e));
}

if (warnings.length > 0) {
  console.log('--- WARNINGS ---');
  warnings.forEach(w => console.log('  ' + w));
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('All posts pass basic checks.');
}

// Also list all posts with tables
const postsWithTables = [];
for (const f of files) {
  const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
  const body = raw.replace(/^---[\s\S]*?---/, '');
  if (/\|.*\|.*\|/.test(body) && /^\|[-:\s|]+\|$/m.test(body)) {
    postsWithTables.push(f);
  }
}
console.log(`\nPosts with tables: ${postsWithTables.length}`);
postsWithTables.forEach(f => console.log('  ' + f));
