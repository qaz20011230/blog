import matter from 'gray-matter';
import { Post, Category } from '../types';

const zhPosts = import.meta.glob('../content/posts/zh/*.md', { query: '?raw', import: 'default', eager: true });
const enPosts = import.meta.glob('../content/posts/en/*.md', { query: '?raw', import: 'default', eager: true });

function parsePosts(files: Record<string, unknown>): Post[] {
  const posts: Post[] = [];

  for (const filePath in files) {
    const raw = files[filePath] as string;
    const { data, content: body } = matter(raw);
    const slug = filePath.split('/').pop()?.replace('.md', '') || '';

    posts.push({
      slug,
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      category: (data.category as Category) || 'Others',
      tags: data.tags || [],
      pinned: Boolean(data.pinned),
      content: body,
    });
  }

  return posts.sort((a, b) => {
    if (a.pinned !== b.pinned) return Number(b.pinned) - Number(a.pinned);
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

const zhCache = parsePosts(zhPosts);
const enCache = parsePosts(enPosts);

export function getAllPosts(locale: 'zh' | 'en' = 'zh'): Post[] {
  return locale === 'en' ? enCache : zhCache;
}

export function getPostBySlug(slug: string, locale: 'zh' | 'en' = 'zh'): Post | undefined {
  const posts = locale === 'en' ? enCache : zhCache;
  return posts.find((post) => post.slug === slug);
}
