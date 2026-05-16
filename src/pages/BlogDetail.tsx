import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { format } from 'date-fns';
import { getPostBySlug } from '../lib/content';
import { Share2, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import rehypeRaw from 'rehype-raw';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useLanguage } from '../context/LanguageContext';
import { UI } from '../types';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { locale, t } = useLanguage();
  const post = slug ? getPostBySlug(slug, locale) : undefined;
  const progress = useScrollProgress();
  const prefix = locale === 'en' ? '/en' : '';

  if (!post) {
    return <div className="text-center py-20">{t(UI.blogDetail.notFound.zh, UI.blogDetail.notFound.en)}</div>;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, text: post.description, url: window.location.href }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    }
  };

  return (
    <article className="max-w-3xl mx-auto page-enter">
      <Helmet>
        <title>{post.title} | Liang's World</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://liang.world/favicon.jpg" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Ang Li" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        {post.tags.map(tag => <meta property="article:tag" content={tag} key={tag} />)}
      </Helmet>

      <div className="reading-progress-bar" style={{ width: `${progress * 100}%` }} />

      <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-primary mb-8 transition-colors tracking-widest font-mono text-sm uppercase group">
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        {t(UI.blogDetail.back.zh, UI.blogDetail.back.en)}
      </button>

      <header className="mb-12 border-b border-gray-800 pb-8">
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-mono uppercase tracking-widest">{post.category}</span>
          {post.tags.map(tag => <span key={tag} className="bg-gray-900 text-gray-400 px-3 py-1 text-xs font-mono transition-colors duration-300 hover:text-primary hover:bg-gray-800">#{tag}</span>)}
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-100 mb-6 leading-tight">{post.title}</h1>
        <div className="flex justify-between items-center text-gray-500 text-sm font-mono tracking-widest">
          <time dateTime={post.date}>{format(new Date(post.date), 'MMM dd, yyyy')}</time>
          <button onClick={handleShare} className="flex items-center gap-2 hover:text-primary transition-colors duration-300 group" title="Share">
            <Share2 size={16} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline uppercase">{t(UI.blogDetail.share.zh, UI.blogDetail.share.en)}</span>
          </button>
        </div>
      </header>

      <div className="prose prose-lg prose-invert prose-slate max-w-none prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]}>
          {post.content || ''}
        </ReactMarkdown>
      </div>
    </article>
  );
}
