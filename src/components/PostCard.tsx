import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { format } from 'date-fns';
import { useLanguage } from '../context/LanguageContext';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { locale } = useLanguage();
  const prefix = locale === 'en' ? '/en' : '';

  return (
    <article className="group relative mb-6 border border-gray-800/60 p-5 bg-hilbert/30 card-hover">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
        <h2 className="text-xl font-bold text-gray-100 group-hover:text-primary transition-colors duration-300">
          <Link to={`${prefix}/post/${post.slug}`} className="link-underline">
            {post.title}
          </Link>
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
          <time dateTime={post.date}>{format(new Date(post.date), 'MMM d, yyyy')}</time>
          <span className="text-gray-700">&bull;</span>
          <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-xs font-medium uppercase tracking-wider transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary">
            {post.category}
          </span>
        </div>
      </div>
      <p className="relative z-10 text-gray-400 line-clamp-2 leading-relaxed text-sm">
        {post.description}
      </p>
    </article>
  );
}
