import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { format } from 'date-fns';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group mb-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
          <Link to={`/post/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <time dateTime={post.date}>{format(new Date(post.date), 'MMM d, yyyy')}</time>
          <span>&bull;</span>
          <span className="bg-blue-50 text-primary px-2 py-0.5 rounded text-xs font-medium">
            {post.category}
          </span>
        </div>
      </div>
      <p className="text-gray-600 mb-3 line-clamp-2">
        {post.description}
      </p>
    </article>
  );
}
