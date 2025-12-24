import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';
import { getPostBySlug } from '../lib/content';
import { Share2, ArrowLeft } from 'lucide-react';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) {
      // Handle 404 or redirect
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
    <article className="max-w-3xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back
      </button>

      <header className="mb-8 border-b border-gray-100 pb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-50 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
          {post.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex justify-between items-center text-gray-500 text-sm">
          <time dateTime={post.date}>
            {format(new Date(post.date), 'MMMM d, yyyy')}
          </time>
          
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 hover:text-primary transition-colors"
            title="Share this article"
          >
            <Share2 size={18} />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </header>

      <div className="prose prose-lg prose-slate max-w-none prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content || ''}
        </ReactMarkdown>
      </div>
    </article>
  );
}
