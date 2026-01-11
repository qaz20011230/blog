import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';
import { getPostBySlug } from '../lib/content';
import { Share2, ArrowLeft } from 'lucide-react';

import rehypeRaw from 'rehype-raw';

export default function BlogDetail() {
  // ... existing code ...

  return (
    <article className="max-w-3xl mx-auto">
      {/* ... header code ... */}

      <div className="prose prose-lg prose-slate max-w-none prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]} 
          rehypePlugins={[rehypeRaw]}
        >
          {post.content || ''}
        </ReactMarkdown>
      </div>
    </article>
  );
}
