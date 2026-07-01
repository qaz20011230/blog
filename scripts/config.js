// Shared configuration for build-time generator scripts (RSS / sitemap / stats).
// Single source of truth for site-wide constants — avoid duplicating these
// values across individual scripts.

export const BASE_URL = 'https://liang.world';

export const CONTACT_EMAIL = 'contact@liang.world';

export const AUTHOR = {
  zh: '思想助产士',
  en: 'Leon',
};

export const SITE = {
  zh: {
    title: '良之世界 | Liang.World',
    description: '怀瑾握瑜，解惑忘隙。融合精神分析、哲学践行与商业逻辑。',
    language: 'zh-CN',
  },
  en: {
    title: 'Liang.World | Midwife of Thought',
    description: 'Where psychoanalysis, philosophical practice, and business logic converge.',
    language: 'en',
  },
};

export const CATEGORIES = [
  'Philosophy',
  'Psychology',
  'AI & Technology',
  'Mathematics & Logic',
  'Business & Strategy',
  'Culture & Art',
  'Others',
];

export const STATIC_PAGES = ['categories', 'books', 'about'];

// Markdown content directories, relative to repo root.
export const CONTENT_DIRS = {
  zh: 'src/content/posts/zh',
  en: 'src/content/posts/en',
};
