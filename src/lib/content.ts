import type { Post } from '../types';
import index from '../content/posts-index.json';

// Metadata-only index (no post bodies). Bodies are loaded on demand by route
// loaders so the markdown corpus never enters the client JS bundle.
const data = index as unknown as { zh: Post[]; en: Post[] };

export function getAllPosts(locale: 'zh' | 'en' = 'zh'): Post[] {
  return data[locale] ?? [];
}

export function getPostBySlug(slug: string, locale: 'zh' | 'en' = 'zh'): Post | undefined {
  return (data[locale] ?? []).find((post) => post.slug === slug);
}
