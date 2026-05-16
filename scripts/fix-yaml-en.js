import fs from 'fs';
import path from 'path';

const EN_DIR = 'src/content/posts/en';

function fixYaml(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  
  // Extract frontmatter boundaries
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return false;
  
  let fm = match[1];
  let changed = false;
  
  // Fix: title with special chars (colons, quotes) must be quoted
  fm = fm.replace(/^title: (.+)$/m, (m, t) => {
    const trimmed = t.trim();
    if (trimmed.startsWith('"') || trimmed.startsWith("'")) return m;
    if (trimmed.includes(':') || trimmed.includes('"') || trimmed.includes("'") || trimmed.includes('\u2019') || trimmed.includes('\u2018')) {
      changed = true;
      return `title: "${trimmed.replace(/"/g, '\\"')}"`;
    }
    return m;
  });
  
  // Fix: description with raw > followed by special chars
  fm = fm.replace(/^description: >\n((?:\s{2}.+\n?)+)/m, (m, d) => {
    // Already fine with folded block scalar
    return m;
  });
  
  if (changed) {
    const newRaw = `---\n${fm}\n---` + raw.slice(match[0].length);
    fs.writeFileSync(filePath, newRaw, 'utf-8');
    return true;
  }
  return false;
}

const files = fs.readdirSync(EN_DIR).filter(f => f.endsWith('.md'));
let count = 0;
for (const f of files) {
  if (fixYaml(path.join(EN_DIR, f))) {
    console.log(`Fixed: ${f}`);
    count++;
  }
}
console.log(`\nFixed ${count} files`);
