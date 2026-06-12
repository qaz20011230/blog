import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { getAllPosts } from '../lib/content';
import PostCard from '../components/PostCard';
import { useLanguage } from '../context/LanguageContext';
import { UI, Category } from '../types';
import { cn } from '../lib/utils';

export function Component() {
  const { locale, t } = useLanguage();
  const allPosts = getAllPosts(locale);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category) || 'All';
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(initialCategory);

  const categories = useMemo(() => {
    const catSet = new Set<Category>();
    for (const p of allPosts) {
      if (p.category && p.category !== 'Others') catSet.add(p.category as Category);
    }
    return Array.from(catSet);
  }, [allPosts]);

  useEffect(() => {
    const cat = searchParams.get('category') as Category;
    if (cat && categories.includes(cat)) setSelectedCategory(cat);
  }, [searchParams, categories]);

  const handleCategoryChange = (cat: Category | 'All') => {
    setSelectedCategory(cat);
    const params = new URLSearchParams();
    if (cat !== 'All') params.set('category', cat);
    setSearchParams(params, { replace: true });
  };

  const filteredPosts = selectedCategory === 'All' ? allPosts : allPosts.filter(p => p.category === selectedCategory);

  return (
    <div className="page-enter">
      <Head>
        <title>{t(UI.categories.heading.zh, UI.categories.heading.en)} | 良之世界</title>
        <meta name="description" content={locale === 'zh' ? '良之世界的文章分类浏览——哲学、心理学、AI与技术、数学与逻辑、商业与战略、文化与艺术。' : 'Browse articles by category — Philosophy, Psychology, AI & Technology, Mathematics & Logic, Business & Strategy, Culture & Art.'} />
      </Head>
      <h1 className="text-3xl font-bold text-gray-100 mb-8 font-serif tracking-widest">
        {t(UI.categories.heading.zh, UI.categories.heading.en)}
      </h1>
      <div className="flex flex-wrap gap-3 mb-12">
        <button onClick={() => handleCategoryChange('All')} className={cn('px-4 py-1.5 border text-sm font-mono tracking-widest transition-all duration-300 uppercase', selectedCategory === 'All' ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(195,30,30,0.3)]' : 'bg-transparent text-gray-400 border-gray-800 hover:border-primary hover:text-primary')}>
          {t(UI.categories.all.zh, UI.categories.all.en)}
        </button>
        {categories.map(cat => (
          <button key={cat} onClick={() => handleCategoryChange(cat)} className={cn('px-4 py-1.5 border text-sm font-mono tracking-widest transition-all duration-300 uppercase', selectedCategory === cat ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(195,30,30,0.3)]' : 'bg-transparent text-gray-400 border-gray-800 hover:border-primary hover:text-primary')}>
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
