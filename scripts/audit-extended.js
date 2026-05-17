import fs from 'fs';
import path from 'path';

function collectMdFiles(...dirs) {
  const results = [];
  for (const d of dirs) {
    if (!fs.existsSync(d)) continue;
    for (const f of fs.readdirSync(d)) {
      if (f.endsWith('.md')) results.push({ file: f, dir: d });
    }
  }
  return results;
}
const entries = collectMdFiles('src/content/posts/zh', 'src/content/posts/en');
const files = entries.map(e => path.join(e.dir, e.file));
const totalCount = entries.length;

let issues = [];

for (const f of files) {
  const raw = fs.readFileSync(f, 'utf-8');
  const body = raw.replace(/^---[\s\S]*?---\n*/, '');

  // 1. Unclosed code blocks
  const backtickMatches = body.match(/```/g);
  if (backtickMatches && backtickMatches.length % 2 !== 0) {
    issues.push(`[UNCLOSED CODE] ${f}: ${backtickMatches.length} backtick markers`);
  }

  // 2. Stray --- that might break markdown
  const hrInBody = body.match(/^---\s*$/gm);
  if (hrInBody && hrInBody.length > 5) {
    issues.push(`[MANY HRs] ${f}: ${hrInBody.length} horizontal rules`);
  }

  // 3. Empty description or very short description
  const descMatch = raw.match(/description:\s*(.*)/);
  const desc = descMatch ? descMatch[1].trim() : '';
  if (desc && desc.length < 10) {
    issues.push(`[SHORT DESC] ${f}: "${desc}"`);
  }

  // 4. Links without https
  const bareUrls = body.match(/\]\((\/|\.\/)/g);
  if (bareUrls) {
    issues.push(`[RELATIVE LINK] ${f}: ${bareUrls.length} relative links`);
  }

  // 5. img tags without alt text
  const imgTags = body.match(/!\[\]\(/g);
  if (imgTags) {
    issues.push(`[IMG NO ALT] ${f}: ${imgTags.length} images without alt`);
  }

  // 6. Check for <img> HTML tags
  const htmlImgs = body.match(/<img[^>]*>/g);
  if (htmlImgs) {
    issues.push(`[HTML IMG] ${f}: ${htmlImgs.length} HTML img tags`);
  }
}

// Report
console.log(`\n=== EXTENDED AUDIT: ${totalCount} posts (${entries.length} md files) ===`);
if (issues.length === 0) {
  console.log('No issues found. All posts pass.');
} else {
  console.log(`Issues: ${issues.length}\n`);
  issues.forEach(i => console.log('  ' + i));
}

// Show posts WITHOUT any description at all
console.log('\n=== POSTS WITH EMPTY DESCRIPTION ===');
for (const f of files) {
  const raw = fs.readFileSync(f, 'utf-8');
  const descMatch = raw.match(/description:\s*(.+)/m);
  if (!descMatch || !descMatch[1].trim()) {
    console.log('  ' + f);
  }
}
