import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';
import { getWeeklyBySlug } from '../lib/content';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function WeeklyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const weekly = slug ? getWeeklyBySlug(slug) : undefined;

  useEffect(() => {
    if (!weekly) {
      // navigate('/404');
    }
  }, [weekly, navigate]);

  if (!weekly) {
    return <div className="text-center py-20">Weekly issue not found</div>;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: weekly.title,
        text: weekly.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <article className="max-w-3xl mx-auto">
      <Helmet>
        <title>{weekly.title} | Liang's World Weekly</title>
        <meta name="description" content={weekly.description} />
        <meta property="og:title" content={weekly.title} />
        <meta property="og:description" content={weekly.description} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={weekly.date} />
      </Helmet>
      <button 
        onClick={() => navigate('/weekly')} 
        className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Weekly
      </button>

      <header className="mb-8 border-b border-gray-100 pb-8 text-center">
        <span className="inline-block bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-bold mb-4">
          Issue #{weekly.issueNumber}
        </span>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {weekly.title}
        </h1>

        <div className="flex justify-center items-center gap-6 text-gray-500 text-sm">
          <time dateTime={weekly.date}>
            {format(new Date(weekly.date), 'MMMM d, yyyy')}
          </time>
          
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Share2 size={16} />
            Share
          </button>
        </div>
      </header>

      <div className="prose prose-lg prose-slate max-w-none prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg mx-auto">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {weekly.content || ''}
        </ReactMarkdown>
      </div>
    </article>
  );
}
