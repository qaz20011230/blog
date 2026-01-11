import matter from 'gray-matter';
import { Post, Weekly, AudioItem } from '../types';

// Import all markdown files
const postFiles = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true });
const weeklyFiles = import.meta.glob('../content/weekly/*.md', { query: '?raw', import: 'default', eager: true });
const audioFiles = import.meta.glob('../content/audios/*.md', { query: '?raw', import: 'default', eager: true });

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

export function getAllAudios(): AudioItem[] {
  const audios: AudioItem[] = [];

  for (const path in audioFiles) {
    const content = audioFiles[path] as string;
    const { data, content: body } = matter(content);
    
    // Extract slug from filename
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    audios.push({
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      src: data.src,
      content: body,
    });
  }

  return audios.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAudioBySlug(slug: string): AudioItem | undefined {
  const audios = getAllAudios();
  return audios.find((audio) => audio.slug === slug);
}
