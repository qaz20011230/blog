import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';

const OUTPUT_FILE = path.resolve('public', 'stats.json');

function stripFencedCodeBlocks(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '');
}

function stripHtmlTags(text) {
  return text.replace(/<\/?[^>]+>/g, ' ');
}

function markdownToPlainText(markdown) {
  let s = markdown;

  s = stripFencedCodeBlocks(s);
  s = stripHtmlTags(s);

  s = s.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');
  s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  s = s.replace(/`([^`]+)`/g, '$1');

  s = s.replace(/^\s{0,3}#{1,6}\s+/gm, '');
  s = s.replace(/^\s{0,3}>\s?/gm, '');
  s = s.replace(/^\s{0,3}([-*+])\s+/gm, '');
  s = s.replace(/^\s{0,3}\d+\.\s+/gm, '');

  s = s.replace(/(\*\*|__)(.*?)\1/g, '$2');
  s = s.replace(/(\*|_)(.*?)\1/g, '$2');
  s = s.replace(/~~(.*?)~~/g, '$1');

  s = s.replace(/^---+$/gm, ' ');
  s = s.replace(/^\|.*\|$/gm, ' ');

  s = s.replace(/&nbsp;/g, ' ');
  s = s.replace(/&amp;/g, '&');
  s = s.replace(/&lt;/g, '<');
  s = s.replace(/&gt;/g, '>');

  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function countEffectiveWords(plainText) {
  const cjkMatches = plainText.match(/[\u3400-\u4dbf\u4e00-\u9fff]/g);
  const cjkCount = cjkMatches ? cjkMatches.length : 0;

  const latinWordMatches = plainText.match(/[A-Za-z0-9]+(?:'[A-Za-z0-9]+)?/g);
  const latinWordCount = latinWordMatches ? latinWordMatches.length : 0;

  return cjkCount + latinWordCount;
}

async function countMarkdownFiles(globPattern) {
  const files = await glob(globPattern);
  let totalWords = 0;

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf-8');
    const parsed = matter(raw);
    const content = parsed.content || '';
    const plain = markdownToPlainText(content);
    totalWords += countEffectiveWords(plain);
  }

  return { files, totalWords };
}

async function generateStats() {
  console.log('Generating site stats...');

  const posts = await countMarkdownFiles('src/content/posts/*.md');

  const totalWords = posts.totalWords;
  const payload = {
    generatedAt: new Date().toISOString(),
    totalWords,
    totalFiles: posts.files.length,
    posts: { files: posts.files.length, words: posts.totalWords },
  };

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2) + '\n', 'utf-8');
  console.log(`Stats generated at ${OUTPUT_FILE}`);
}

generateStats().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
