import fs from 'fs';
import { glob } from 'glob';

const rename = async () => {
  const files = await glob('**/*.{md,tsx,ts,js,html,xml,json}', {
    ignore: ['node_modules/**', 'dist/**', 'build/**', '.git/**'],
    nodir: true,
  });

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;

    // Authorship
    newContent = newContent.replace(/\[匿名作者\]/g, '良之');
    newContent = newContent.replace(/LeoZ/g, 'LeoZ');
    
    // Website English Name
    newContent = newContent.replace(/Liang\.World/gi, 'LeoZ Universe');
    newContent = newContent.replace(/LeoZ Universe/gi, 'LeoZ Universe');
    
    // specifically update the footer or metadata strings that might be "LeoZ Universe"
    newContent = newContent.replace(/\|\s*liang\.world/gi, '| LeoZ Universe');
    newContent = newContent.replace(/良之世界 \/ liang\.world/gi, '良之世界 / LeoZ Universe');

    // Package JSON name
    if (file.endsWith('package.json') || file.endsWith('package-lock.json')) {
      newContent = newContent.replace(/"name": "LeoZ Universe"/g, '"name": "leoz.universe"');
    }

    if (content !== newContent) {
      fs.writeFileSync(file, newContent);
      console.log(`Updated ${file}`);
    }
  }
};

rename();
