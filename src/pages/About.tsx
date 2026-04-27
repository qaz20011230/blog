import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <Helmet>
        <title>关于良之 | 良之世界</title>
      </Helmet>

      <div className="space-y-8 py-20 page-enter">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-[0.1em] hover:text-primary transition-colors duration-300" style={{ fontFamily: '"Noto Serif SC", "SimSun", "STSong", serif' }}>
          <a href="https://liang.world/resume" target="_blank" rel="noopener noreferrer" className="link-underline">
            李昂
          </a>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 font-light tracking-wide leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          广州菲娜睿特人工智能科技有限责任公司创始人 & CEO
        </p>

        <div className="w-12 h-[1px] bg-primary/40 mx-auto animate-pulse-glow" />

        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-[0.1em] hover:text-primary transition-colors duration-300" style={{ fontFamily: '"Noto Serif SC", "SimSun", "STSong", serif' }}>
          <a href="https://liang.world/cv" target="_blank" rel="noopener noreferrer" className="link-underline">
            Ang Li
          </a>
        </h2>

        <p className="text-lg md:text-xl text-gray-400 font-light tracking-wide leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          广州菲娜睿特人工智能科技有限责任公司联合创始人 & CTO
        </p>
      </div>
    </div>
  );
}
