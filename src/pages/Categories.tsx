import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getAllPosts } from '../lib/content';
import PostCard from '../components/PostCard';
import { useLanguage } from '../context/LanguageContext';
import { UI, Category } from '../types';
import { cn } from '../lib/utils';

const categories: Category[] = ['Philosophy', 'Psychology', 'Logic', 'Ecommerce', 'Others'];

export default function Categories() {
  const { locale, t } = useLanguage();
  const allPosts = getAllPosts(locale);
  const [searchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) || 'All';
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(initialCategory);

  useEffect(() => {
    const cat = searchParams.get('category') as Category;
    if (cat && categories.includes(cat)) setSelectedCategory(cat);
  }, [searchParams]);

  const filteredPosts = selectedCategory === 'All' ? allPosts : allPosts.filter(p => p.category === selectedCategory);

  return (
    <div className="page-enter">
      <h1 className="text-3xl font-bold text-gray-100 mb-8 font-serif tracking-widest">
        {t(UI.categories.heading.zh, UI.categories.heading.en)}
      </h1>
      <div className="flex flex-wrap gap-3 mb-12">
        <button onClick={() => setSelectedCategory('All')} className={cn('px-4 py-1.5 border text-sm font-mono tracking-widest transition-all duration-300 uppercase', selectedCategory === 'All' ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(0,47,167,0.3)]' : 'bg-transparent text-gray-400 border-gray-800 hover:border-primary hover:text-primary')}>
          {t(UI.categories.all.zh, UI.categories.all.en)}
        </button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} className={cn('px-4 py-1.5 border text-sm font-mono tracking-widest transition-all duration-300 uppercase', selectedCategory === cat ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(0,47,167,0.3)]' : 'bg-transparent text-gray-400 border-gray-800 hover:border-primary hover:text-primary')}>
            {cat}
          </button>
        ))}
      </div>
      <div className="stagger-children">
        {filteredPosts.length > 0 ? filteredPosts.map(p => <PostCard key={p.slug} post={p} />) : (
          <p className="text-gray-500 italic font-mono tracking-widest">{t(UI.categories.noPosts.zh, UI.categories.noPosts.en)}</p>
        )}
      </div>
    </div>
  );
}
