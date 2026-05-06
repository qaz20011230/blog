import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllPosts } from '../lib/content';
import PostCard from '../components/PostCard';
import { cn } from '../lib/utils';

type CategoryKey = 'Philosophy' | 'Psychology' | 'AI & Technology' | 'Mathematics & Logic' | 'Business & Strategy' | 'Culture & Art';

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  'Philosophy': '哲学',
  'Psychology': '心理学',
  'AI & Technology': 'AI与技术',
  'Mathematics & Logic': '数学与逻辑',
  'Business & Strategy': '商业与战略',
  'Culture & Art': '文化与艺术',
};

const CATEGORY_ICONS: Record<CategoryKey, string> = {
  'Philosophy': 'φ',
  'Psychology': 'ψ',
  'AI & Technology': '∫',
  'Mathematics & Logic': '∀',
  'Business & Strategy': '♟',
  'Culture & Art': '♫',
};

export default function Categories() {
  const allPosts = getAllPosts();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || '';
  const selectedCategory = (CATEGORY_LABELS[categoryParam as CategoryKey] ? categoryParam : 'All') as CategoryKey | 'All';

  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const post of allPosts) {
      if (post.category) {
        counts[post.category] = (counts[post.category] || 0) + 1;
      }
    }
    return Object.entries(counts)
      .filter(([cat]) => cat in CATEGORY_LABELS)
      .sort(([, a], [, b]) => b - a)
      .map(([cat, count]) => ({ key: cat as CategoryKey, count }));
  }, [allPosts]);

  const filteredPosts = selectedCategory === 'All'
    ? allPosts
    : allPosts.filter(post => post.category === selectedCategory);

  const handleCategorySelect = (cat: CategoryKey | 'All') => {
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="page-enter">
      <h1 className="text-3xl font-bold text-gray-100 mb-2 font-serif tracking-widest">CATEGORIES</h1>
      <p className="text-gray-500 text-sm mb-8 font-mono">
        {allPosts.length} articles · {categoriesWithCounts.length} categories
      </p>

      <div className="flex flex-wrap gap-3 mb-12">
        <button
          onClick={() => handleCategorySelect('All')}
          className={cn(
            'px-4 py-1.5 border text-sm font-mono tracking-widest transition-all duration-300',
            selectedCategory === 'All'
              ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(0,47,167,0.3)]'
              : 'bg-transparent text-gray-400 border-gray-800 hover:border-primary hover:text-primary'
          )}
        >
          All ({allPosts.length})
        </button>
        {categoriesWithCounts.map(({ key, count }) => (
          <button
            key={key}
            onClick={() => handleCategorySelect(key)}
            className={cn(
              'px-4 py-1.5 border text-sm font-mono transition-all duration-300 group',
              selectedCategory === key
                ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(0,47,167,0.3)]'
                : 'bg-transparent text-gray-400 border-gray-800 hover:border-primary hover:text-primary'
            )}
          >
            <span className="mr-1.5 opacity-60 text-xs">{CATEGORY_ICONS[key]}</span>
            {CATEGORY_LABELS[key]}
            <span className="ml-1.5 opacity-50 text-xs">({count})</span>
          </button>
        ))}
      </div>

      <div className="stagger-children">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        ) : (
          <p className="text-gray-500 italic font-mono tracking-widest">此分类暂无文章。</p>
        )}
      </div>
    </div>
  );
}
