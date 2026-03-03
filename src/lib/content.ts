import matter from 'gray-matter';
import { Post, Weekly, Book } from '../types';

// Import all markdown files
const postFiles = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true });
const weeklyFiles = import.meta.glob('../content/weekly/*.md', { query: '?raw', import: 'default', eager: true });
const bookFiles = import.meta.glob('../content/books/*.md', { query: '?raw', import: 'default', eager: true });

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
      content: body,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export function getAllWeeklies(): Weekly[] {
  const weeklies: Weekly[] = [];

  for (const path in weeklyFiles) {
    const content = weeklyFiles[path] as string;
    const { data, content: body } = matter(content);
    
    // Extract slug from filename
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    weeklies.push({
      slug,
      title: data.title,
      date: data.date,
      issueNumber: data.issueNumber,
      description: data.description,
      content: body,
    });
  }

  return weeklies.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getWeeklyBySlug(slug: string): Weekly | undefined {
  const weeklies = getAllWeeklies();
  return weeklies.find((weekly) => weekly.slug === slug);
}

export function getAllBooks(): Book[] {
  const books: Book[] = [];

  for (const path in bookFiles) {
    const content = bookFiles[path] as string;
    const { data, content: body } = matter(content);
    
    // Extract slug from filename
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    books.push({
      slug,
      title: data.title,
      author: data.author,
      coverImage: data.coverImage,
      description: data.description,
      publishDate: data.publishDate,
      downloadUrl: data.downloadUrl,
      content: body,
    });
  }

  return books.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

export function getBookBySlug(slug: string): Book | undefined {
  const books = getAllBooks();
  return books.find((book) => book.slug === slug);
}
