import React from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, getAllWeeklies } from '../lib/content';
import PostCard from '../components/PostCard';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const posts = getAllPosts();
  const weeklies = getAllWeeklies();
  const latestWeekly = weeklies[0];

  return (
    <div className="space-y-12">
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
