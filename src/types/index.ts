export type Category = 'Philosophy' | 'Psychology' | 'Logic' | 'Ecommerce' | 'Others';

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: Category;
  tags: string[];
  content?: string;
}

export interface Weekly {
  slug: string;
  title: string;
  date: string;
  issueNumber: number;
  description: string;
  content?: string;
}

export interface Book {
  slug: string;
  title: string;
  author: string;
  coverImage?: string;
  description: string;
  publishDate: string;
  downloadUrl: string;
  content?: string;
}
