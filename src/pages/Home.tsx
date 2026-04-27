import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getAllPosts } from '../lib/content';
import PostCard from '../components/PostCard';

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 6);

  return (
    <div className="relative z-10">
      <Helmet>
        <title>良之世界 | Liang.World</title>
        <meta name="description" content="良之世界是思想助产士（梁良）的数字花园。这里汇集了关于哲学践行、精神分析与商业逻辑的深度思考。" />
        <meta name="keywords" content="良之世界, 思想助产士, 哲学咨询, 架构师, 极客, 黎曼猜想" />
      </Helmet>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-12 pt-8 pb-16">
        {/* Decorative Klein Blue Blur - Breathing */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        </div>

        <div className="relative select-none">
          <h1 className="relative text-5xl md:text-8xl font-serif font-bold text-gray-100 tracking-[0.2em] md:tracking-[0.3em] uppercase">
            LIANG
            <span className="text-primary">.</span>
            WORLD
          </h1>

          {/* Floating JSON decoration */}
          <div className="absolute -right-8 -top-8 text-primary/30 font-mono text-sm tracking-widest hidden md:block animate-float">
            {'{\n  "status": "online",\n  "protocol": "Zeta"\n}'}
          </div>
        </div>

        <div className="space-y-6 max-w-2xl relative z-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-lg md:text-xl font-mono text-gray-400 tracking-widest uppercase">
            Architecture <span className="text-primary mx-2">/</span> Philosophy <span className="text-primary mx-2">/</span> Mathematics
          </p>

          <p className="text-sm md:text-base text-gray-500 font-serif tracking-widest leading-relaxed italic">
            "Ask, and it will be given to you; seek, and you will find; knock, and it will be opened to you."
          </p>
        </div>

        {/* Pulsing vertical line */}
        <div className="relative z-10">
          <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent mx-auto animate-pulse-glow" />
        </div>
      </div>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="pb-16">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-lg font-mono text-primary tracking-[0.3em] uppercase">Recent</h2>
            <div className="flex-1 h-px bg-gray-800" />
          </div>
          <div className="stagger-children">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
