import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { UI } from '../types';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <Helmet>
        <title>{t(UI.about.title.zh, UI.about.title.en)}</title>
      </Helmet>
      <div className="space-y-8 py-20 page-enter">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-[0.1em] hover:text-primary transition-colors duration-300" style={{ fontFamily: '"Noto Serif SC", "SimSun", "STSong", serif' }}>
          <a href="https://liang.world/resume" target="_blank" rel="noopener noreferrer" className="link-underline">
            {t(UI.about.name1.zh, UI.about.name1.en)}
          </a>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 font-light tracking-wide leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {t(UI.about.role1.zh, UI.about.role1.en)}
        </p>
        <div className="w-12 h-[1px] bg-primary/40 mx-auto animate-pulse-glow" />
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-[0.1em] hover:text-primary transition-colors duration-300" style={{ fontFamily: '"Noto Serif SC", "SimSun", "STSong", serif' }}>
          <a href="https://liang.world/cv" target="_blank" rel="noopener noreferrer" className="link-underline">
            {t(UI.about.name2.zh, UI.about.name2.en)}
          </a>
        </h2>
        <p className="text-lg md:text-xl text-gray-400 font-light tracking-wide leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {t(UI.about.role2.zh, UI.about.role2.en)}
        </p>
      </div>
    </div>
  );
}
