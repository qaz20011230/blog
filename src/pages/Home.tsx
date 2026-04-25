import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getAllPosts } from '../lib/content';
import PostCard from '../components/PostCard';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="space-y-12">
      <Helmet>
        <title>良之世界</title>
        <meta name="description" content="良之世界是思想助产士（梁良）的数字花园。这里汇集了关于哲学践行、精神分析与商业逻辑的深度思考，以及【思想助产士】与【哲思锻造坊】公众号的精华内容。" />
        <meta name="keywords" content="良之世界, 思想助产士, 哲思锻造坊, 哲学咨询, 精神分析, 梁良, 深度阅读" />
      </Helmet>

      {/* Recent Posts */}
      <section>
        <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-2">
          <h2 className="text-2xl font-bold text-gray-900">Recent Writings</h2>
          <Link to="/categories" className="text-primary text-sm font-medium hover:underline mb-1">
            View all
          </Link>
        </div>
        
        <div className="space-y-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))
          ) : (
            <p className="text-gray-500 italic">No posts found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
