import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Mail, MapPin, BookOpen, Award, Briefcase, BarChart3, Github, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAllPosts } from '../lib/content';
import { UI } from '../types';

function useAboutData(locale: 'zh' | 'en') {
  const posts = React.useMemo(() => getAllPosts(locale), [locale]);
  return React.useMemo(() => {
    const tagCount: Record<string, number> = {};
    const catCount: Record<string, number> = {};
    for (const p of posts) {
      const cat = (p.category as string) || '';
      if (cat) catCount[cat] = (catCount[cat] || 0) + 1;
      for (const tag of p.tags || []) {
        if (tag) tagCount[tag] = (tagCount[tag] || 0) + 1;
      }
    }
    const topCats = Object.entries(catCount).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const topTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]).slice(0, 12);
    return {
      topCats, topTags,
      totalPosts: posts.length,
      totalTags: Object.keys(tagCount).length,
      totalCats: Object.keys(catCount).length,
      recentPosts: posts.slice(0, 6),
    };
  }, [posts]);
}

export default function About() {
  const { locale, t } = useLanguage();
  const data = useAboutData(locale);

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      <Helmet>
        <title>{t(UI.about.title.zh, UI.about.title.en)}</title>
      </Helmet>

      <div className="flex flex-col items-center text-center py-16 space-y-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center ring-1 ring-primary/20">
          <span className="text-3xl font-serif font-bold text-primary/80">良</span>
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-[0.1em]" style={{ fontFamily: '"Noto Serif SC", "SimSun", "STSong", serif' }}>
            {t(UI.about.name.zh, UI.about.name.en)}
          </h1>
          <p className="text-sm text-gray-500 font-mono tracking-widest mt-1">
            {t(UI.about.nameSub.zh, UI.about.nameSub.en)}
          </p>
        </div>
        <p className="text-base md:text-lg text-gray-300 font-light tracking-wide">
          {t(UI.about.role.zh, UI.about.role.en)}
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
          <MapPin size={14} />
          <span>{t(UI.about.location.zh, UI.about.location.en)}</span>
        </div>
        <div className="w-12 h-[1px] bg-primary/40" />
        <p className="text-sm md:text-base text-gray-400 font-serif leading-relaxed max-w-xl italic">
          {t(UI.about.bio.zh, UI.about.bio.en)}
        </p>
      </div>

      <div className="border-t border-gray-800/50 pt-10 pb-4">
        <h2 className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-6">
          <BookOpen size={14} className="inline mr-2 -mt-0.5" />
          {t(UI.about.education.heading.zh, UI.about.education.heading.en)}
        </h2>
        <div className="space-y-6">
          {UI.about.education.items.map((item, i) => (
            <div key={i} className="flex items-start gap-4 pl-2 border-l-2 border-gray-800">
              <div className="flex-1">
                <h3 className="text-gray-200 font-semibold">{t(item.degree.zh, item.degree.en)}</h3>
                <p className="text-gray-400 text-sm mt-0.5">{t(item.school.zh, item.school.en)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800/50 pt-10 pb-4">
        <h2 className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-6">
          <Briefcase size={14} className="inline mr-2 -mt-0.5" />
          {t(UI.about.position.heading.zh, UI.about.position.heading.en)}
        </h2>
        <div className="flex items-start gap-4 pl-2 border-l-2 border-primary/30">
          <div className="flex-1">
            <h3 className="text-gray-200 font-semibold">{t(UI.about.position.title.zh, UI.about.position.title.en)}</h3>
            <p className="text-gray-400 text-sm mt-0.5">{t(UI.about.position.org.zh, UI.about.position.org.en)}</p>
            <p className="text-primary/60 text-xs font-mono mt-0.5">{t(UI.about.position.period.zh, UI.about.position.period.en)}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800/50 pt-10 pb-4">
        <h2 className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-6">
          <BarChart3 size={14} className="inline mr-2 -mt-0.5" />
          {t(UI.about.expertise.heading.zh, UI.about.expertise.heading.en)}
        </h2>
        <p className="text-xs text-gray-600 font-mono mb-4">
          {t(UI.about.expertise.autoBuilt.zh, UI.about.expertise.autoBuilt.en)}
        </p>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          {locale === 'zh' ? '领域分布' : 'Categories'}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {data.topCats.map(([cat, count]) => (
            <span key={cat} className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50">
              {cat}<span className="text-gray-600 text-[10px]">×{count}</span>
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          {locale === 'zh' ? '热门标签' : 'Top Tags'}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {data.topTags.map(([tag, count]) => (
            <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded bg-gray-800/30 text-gray-500 border border-gray-800/50">
              {tag}<span className="text-gray-700 text-[10px]">×{count}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800/50 pt-10 pb-4">
        <h2 className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-6">
          <Award size={14} className="inline mr-2 -mt-0.5" />
          {t(UI.about.writings.heading.zh, UI.about.writings.heading.en)}
        </h2>
        <p className="text-xs text-gray-600 font-mono mb-4">
          {t(UI.about.writings.autoBuilt.zh, UI.about.writings.autoBuilt.en)}
        </p>
        <div className="space-y-3">
          {data.recentPosts.map((post) => (
            <Link
              key={post.slug}
              to={`${locale === 'en' ? '/en' : ''}/post/${post.slug}`}
              className="block group p-3 -mx-3 rounded-lg hover:bg-gray-800/30 transition-colors duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-gray-200 group-hover:text-primary transition-colors text-sm font-medium truncate">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-xs mt-1 truncate">{post.description}</p>
                </div>
                <span className="text-gray-600 text-[11px] font-mono whitespace-nowrap mt-0.5">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800/50 pt-10 pb-4">
        <h2 className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-6">
          <Layers size={14} className="inline mr-2 -mt-0.5" />
          {t(UI.about.stats.heading.zh, UI.about.stats.heading.en)}
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-gray-800/20 border border-gray-800/50">
            <div className="text-2xl font-bold text-gray-200 font-mono">{data.totalPosts}</div>
            <div className="text-xs text-gray-500 mt-1">{t(UI.about.stats.posts.zh, UI.about.stats.posts.en)}</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-gray-800/20 border border-gray-800/50">
            <div className="text-2xl font-bold text-gray-200 font-mono">{data.totalCats}</div>
            <div className="text-xs text-gray-500 mt-1">{t(UI.about.stats.categories.zh, UI.about.stats.categories.en)}</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-gray-800/20 border border-gray-800/50">
            <div className="text-2xl font-bold text-gray-200 font-mono">{data.totalTags}</div>
            <div className="text-xs text-gray-500 mt-1">{t(UI.about.stats.tags.zh, UI.about.stats.tags.en)}</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800/50 pt-10 pb-8">
        <h2 className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-6">
          <Mail size={14} className="inline mr-2 -mt-0.5" />
          {t(UI.about.contact.zh, UI.about.contact.en)}
        </h2>
        <div className="flex flex-col gap-3">
          <a href="mailto:contact@liang.world" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-mono text-sm">
            <Mail size={14} />
            {t(UI.about.email.zh, UI.about.email.en)}
          </a>
          <a href="https://github.com/qaz20011230" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-mono text-sm">
            <Github size={14} />
            {t(UI.about.github.zh, UI.about.github.en)}
          </a>
        </div>
      </div>
    </div>
  );
}
