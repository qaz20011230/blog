import React, { useState } from 'react';
import { getAllPosts } from '../lib/content';
import PostCard from '../components/PostCard';
import { Category } from '../types';
import { cn } from '../lib/utils';

const categories: Category[] = ['Philosophy', 'Psychology', 'Logic', 'Ecommerce'];

export default function Categories() {
  const allPosts = getAllPosts();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  const filteredPosts = selectedCategory === 'All' 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>

      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setSelectedCategory('All')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            selectedCategory === 'All'
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        ) : (
          <p className="text-gray-500 italic">No posts found in this category.</p>
        )}
      </div>
    </div>
  );
}
