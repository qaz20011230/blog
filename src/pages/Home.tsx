import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getAllPosts, getAllWeeklies } from '../lib/content';
import PostCard from '../components/PostCard';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const posts = getAllPosts();
  const weeklies = getAllWeeklies();
  const latestWeekly = weeklies[0];

  return (
    <div className="space-y-12">
      <Helmet>
        <title>良之世界</title>
        <meta name="description" content="良之世界是思想助产士（梁良）的数字花园。这里汇集了关于哲学践行、精神分析与商业逻辑的深度思考，以及【思想助产士】与【哲思锻造坊】公众号的精华内容。" />
        <meta name="keywords" content="良之世界, 思想助产士, 哲思锻造坊, 哲学咨询, 精神分析, 梁良, 深度阅读" />
      </Helmet>

      {/* Weekly Banner */}
      {latestWeekly && (
        <section className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="inline-block bg-white/20 px-2 py-1 rounded text-xs font-semibold mb-2">
                Latest Weekly
              </span>
              <h2 className="text-2xl font-bold mb-2">{latestWeekly.title}</h2>
              <p className="text-blue-100 mb-4 md:mb-0 max-w-xl">
                {latestWeekly.description}
              </p>
            </div>
            <Link 
              to={`/weekly/${latestWeekly.slug}`}
              className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors whitespace-nowrap"
            >
              Read Issue #{latestWeekly.issueNumber}
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      )}

      {/* Friend Links Entry */}
      <section className="text-center py-4">
        <Link 
          to="/links"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm"
        >
          <span>✦ 友情链接 / Friends</span>
        </Link>
      </section>

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
