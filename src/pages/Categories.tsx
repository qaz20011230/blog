import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllPosts } from '../lib/content';
import PostCard from '../components/PostCard';
import { Category } from '../types';
import { cn } from '../lib/utils';

const categories: Category[] = ['Philosophy', 'Psychology', 'Logic', 'Ecommerce', 'Others'];

export default function Categories() {
  const allPosts = getAllPosts();
  const [searchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) || 'All';

  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(initialCategory);

  useEffect(() => {
    const categoryParam = searchParams.get('category') as Category;
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredPosts = selectedCategory === 'All'
    ? allPosts
    : allPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="page-enter">
      <h1 className="text-3xl font-bold text-gray-100 mb-8 font-serif tracking-widest">CATEGORIES</h1>

      <div className="flex flex-wrap gap-3 mb-12">
        <button
          onClick={() => setSelectedCategory('All')}
          className={cn(
            'px-4 py-1.5 border text-sm font-mono tracking-widest transition-all duration-300 uppercase',
            selectedCategory === 'All'
              ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(0,47,167,0.3)]'
              : 'bg-transparent text-gray-400 border-gray-800 hover:border-primary hover:text-primary'
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'px-4 py-1.5 border text-sm font-mono tracking-widest transition-all duration-300 uppercase',
              selectedCategory === category
                ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(0,47,167,0.3)]'
                : 'bg-transparent text-gray-400 border-gray-800 hover:border-primary hover:text-primary'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="stagger-children">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        ) : (
          <p className="text-gray-500 italic font-mono tracking-widest">No posts found in this category.</p>
        )}
      </div>
    </div>
  );
}
