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
