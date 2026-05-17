import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Github } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAllPosts } from '../lib/content';
import { UI } from '../types';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-gray-800/50 pt-10 pb-4">
      <h2 className="text-sm font-mono text-primary tracking-[0.2em] uppercase mb-6">{title}</h2>
      {children}
    </div>
  );
}

export default function About() {
  const { locale, t } = useLanguage();
  const isEn = locale === 'en';
  const posts = getAllPosts(locale);

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      <Helmet>
        <title>{t(UI.about.title.zh, UI.about.title.en)}</title>
        <meta name="description" content={t(UI.about.bio.zh, UI.about.bio.en)} />
        <meta property="og:title" content={t(UI.about.name.zh, UI.about.name.en)} />
        <meta property="og:description" content={t(UI.about.bio.zh, UI.about.bio.en)} />
        <meta property="og:type" content="profile" />
      </Helmet>

      {/* Hero */}
      <div className="flex flex-col items-center text-center py-16 space-y-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center ring-1 ring-primary/20">
          <span className="text-3xl font-serif font-bold text-primary/80">良</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-[0.1em]">
          {t(UI.about.name.zh, UI.about.name.en)}
        </h1>
        <p className="text-sm text-gray-500 font-mono tracking-widest">
          {t(UI.about.nameSub.zh, UI.about.nameSub.en)}
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-primary/10 border border-orange-500/30">
          <span className="text-xs font-mono text-orange-400 tracking-wider uppercase">
            {isEn ? 'Former CTO, Alibaba Group' : '阿里巴巴前首席技术官'}
          </span>
        </div>

        <p className="text-base md:text-lg text-gray-300 font-light tracking-wide">
          {isEn ? 'CTO of Phaenarete AI' : '菲娜睿特AI首席技术官'}
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

      {/* Career */}
      <Section title={t(UI.about.career.heading.zh, UI.about.career.heading.en)}>
        <div className="space-y-6">
          {UI.about.career.items.map((item, i) => (
            <div key={i} className="flex items-start gap-4 pl-2 border-l-2 border-orange-500/60">
              <div className="flex-1">
                <h3 className="text-orange-400 font-semibold">{t(item.title.zh, item.title.en)}</h3>
                <p className="text-gray-400 text-sm mt-0.5">{t(item.org.zh, item.org.en)}</p>
                {item.period.zh && <p className="text-gray-600 text-xs font-mono mt-0.5">{t(item.period.zh, item.period.en)}</p>}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section title={t(UI.about.education.heading.zh, UI.about.education.heading.en)}>
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
      </Section>

      {/* Expertise */}
      <Section title={t(UI.about.expertise.heading.zh, UI.about.expertise.heading.en)}>
        <p className="text-xs text-gray-600 font-mono mb-4">
          {t(UI.about.expertise.autoBuilt.zh, UI.about.expertise.autoBuilt.en)}
        </p>
        <div className="flex flex-wrap gap-2">
          {[...new Set(posts.map(p => p.category).filter(Boolean))].slice(0, 8).map(cat => (
            <span key={cat} className="px-3 py-1 text-xs rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50">
              {cat}
            </span>
          ))}
        </div>
      </Section>

      {/* Writings */}
      <Section title={t(UI.about.writings.heading.zh, UI.about.writings.heading.en)}>
        <div className="space-y-3">
          {posts.slice(0, 5).map(post => (
            <Link
              key={post.slug}
              to={`${isEn ? '/en' : ''}/post/${post.slug}`}
              className="block group p-3 -mx-3 rounded-lg hover:bg-gray-800/30 transition-colors"
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
      </Section>

      {/* Contact */}
      <Section title={t(UI.about.contact.zh, UI.about.contact.en)}>
        <div className="flex flex-col gap-3">
          <a href="mailto:contact@liang.world" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-mono text-sm">
            <Mail size={14} />contact@liang.world
          </a>
          <a href="https://github.com/qaz20011230" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-mono text-sm">
            <Github size={14} />github.com/qaz20011230
          </a>
        </div>
      </Section>
    </div>
  );
}
