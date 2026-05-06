export type Category = 
  | 'Philosophy' 
  | 'Psychology' 
  | 'AI & Technology' 
  | 'Mathematics & Logic' 
  | 'Business & Strategy' 
  | 'Culture & Art';

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: Category;
  tags: string[];
  pinned?: boolean;
  content?: string;
}
