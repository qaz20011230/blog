import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { Search as SearchIcon } from 'lucide-react';
import { getAllPosts } from '../lib/content';
import PostCard from '../components/PostCard';
import { useLanguage } from '../context/LanguageContext';

export function Component() {
  const { locale } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [input, setInput] = useState(query);
  const allPosts = getAllPosts(locale);

  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return allPosts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [query, allPosts]);

  const handleSearch = (value: string) => {
    setInput(value);
    const params = new URLSearchParams();
    if (value) params.set('q', value);
    setSearchParams(params, { replace: true });
  };

  return (
    <div className="page-enter">
      <Head>
        <title>{locale === 'zh' ? '搜索' : 'Search'} | Liang.World</title>
      </Head>

      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-100 mb-8 font-serif tracking-widest">
          {locale === 'zh' ? '搜索' : 'Search'}
        </h1>
        <div className="relative">
          <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={input}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={locale === 'zh' ? '输入关键词搜索文章...' : 'Search articles...'}
            className="w-full bg-gray-900/50 border border-gray-800 rounded-lg pl-12 pr-4 py-3 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-primary transition-colors font-mono text-sm"
            autoFocus
          />
        </div>
      </div>

      {query && (
        <p className="text-gray-500 text-sm font-mono mb-6">
          {locale === 'zh'
            ? `找到 ${results.length} 篇与"${query}"相关的文章`
            : `Found ${results.length} article(s) matching "${query}"`
          }
        </p>
      )}

      <div className="stagger-children">
        {results.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {query && results.length === 0 && (
        <p className="text-gray-500 italic font-mono tracking-widest text-center py-12">
          {locale === 'zh' ? '未找到匹配的文章。' : 'No matching articles found.'}
        </p>
      )}
    </div>
  );
}
