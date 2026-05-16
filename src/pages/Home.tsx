import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getAllPosts } from '../lib/content';
import PostCard from '../components/PostCard';
import { useLanguage } from '../context/LanguageContext';
import { UI } from '../types';

export default function Home() {
  const { locale, t } = useLanguage();
  const recentPosts = getAllPosts(locale).slice(0, 6);

  return (
    <div className="relative z-10">
      <Helmet>
        <title>{t(UI.siteName.zh, UI.siteName.en)} | Liang.World</title>
        <meta name="description" content={t(UI.description.zh, UI.description.en)} />
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-12 pt-8 pb-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        </div>

        <div className="relative select-none">
          <h1 className="relative text-5xl md:text-8xl font-serif font-bold text-gray-100 tracking-[0.2em] md:tracking-[0.3em] uppercase">
            LIANG<span className="text-primary">.</span>WORLD
          </h1>
          <div className="absolute -right-8 -top-8 text-primary/30 font-mono text-sm tracking-widest hidden md:block animate-float">
            {'{\n  "status": "online",\n  "protocol": "Zeta"\n}'}
          </div>
        </div>

        <div className="space-y-6 max-w-2xl relative z-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-lg md:text-xl font-mono text-gray-400 tracking-widest uppercase">
            {t(UI.home.subtitle.zh, UI.home.subtitle.en)}
          </p>
          <p className="text-sm md:text-base text-gray-500 font-serif tracking-widest leading-relaxed italic">
            {t(UI.home.motto.zh, UI.home.motto.en)}
          </p>
        </div>

        <div className="relative z-10">
          <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent mx-auto animate-pulse-glow" />
        </div>
      </div>

      {recentPosts.length > 0 && (
        <section className="pb-16">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-lg font-mono text-primary tracking-[0.3em] uppercase">
              {t(UI.home.recent.zh, UI.home.recent.en)}
            </h2>
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
