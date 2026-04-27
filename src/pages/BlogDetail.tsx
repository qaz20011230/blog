import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;
  const progress = useScrollProgress();

  useEffect(() => {
    if (!post) {
      // navigate('/404');
    }
  }, [post, navigate]);

  if (!post) {
    return <div className="text-center py-20">Post not found</div>;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
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
        <meta property="article:published_time" content={post.date} />
        {post.tags.map(tag => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "author": {
              "@type": "Person",
              "name": "思想助产士",
              "url": "https://liang.world/about"
            },
            "datePublished": post.date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": window.location.href
            },
            "publisher": {
              "@type": "Organization",
              "name": "良之世界",
              "logo": {
                "@type": "ImageObject",
                "url": "https://liang.world/favicon.jpg"
              }
            },
            "keywords": post.tags.join(", ")
          })}
        </script>
      </Helmet>

      {/* Reading Progress Bar */}
      <div className="reading-progress-bar" style={{ width: `${progress * 100}%` }} />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-500 hover:text-primary mb-8 transition-colors tracking-widest font-mono text-sm uppercase group"
      >
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      {/* Article Header */}
      <header className="mb-12 border-b border-gray-800 pb-8">
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-mono uppercase tracking-widest">
            {post.category}
          </span>
          {post.tags.map(tag => (
            <span key={tag} className="bg-gray-900 text-gray-400 px-3 py-1 text-xs font-mono transition-colors duration-300 hover:text-primary hover:bg-gray-800">
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-100 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex justify-between items-center text-gray-500 text-sm font-mono tracking-widest">
          <time dateTime={post.date}>
            {format(new Date(post.date), 'MMM dd, yyyy')}
          </time>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 hover:text-primary transition-colors duration-300 group"
            title="Share this article"
          >
            <Share2 size={16} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline uppercase">Share</span>
          </button>
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg prose-invert prose-slate max-w-none prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
        >
          {post.content || ''}
        </ReactMarkdown>
      </div>
    </article>
  );
}
