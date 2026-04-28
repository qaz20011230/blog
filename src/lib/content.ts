import matter from 'gray-matter';
import { Post } from '../types';

// Import all markdown files
const postFiles = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true });

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const path in postFiles) {
    const content = postFiles[path] as string;
    const { data, content: body } = matter(content);
    
    // Extract slug from filename
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    posts.push({
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      category: data.category,
      tags: data.tags || [],
      pinned: Boolean(data.pinned),
      content: body,
    });
  }

  return posts.sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return Number(b.pinned) - Number(a.pinned);
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}
