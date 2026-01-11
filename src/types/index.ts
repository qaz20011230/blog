export type Category = 'Philosophy' | 'Psychology' | 'Logic' | 'Ecommerce';

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

export interface AudioItem {
  slug: string;
  title: string;
  date: string;
  description: string;
  src: string;
  content?: string;
}
