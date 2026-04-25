import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <Helmet>
        <title>关于良之 | 良之世界</title>
      </Helmet>
      
      <div className="space-y-8 py-20">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 tracking-[0.1em] hover:text-primary transition-colors cursor-pointer">
          <a href="https://liang.world/cv" target="_blank" rel="noopener noreferrer">
            良之
          </a>
        </h1>
        
        <div className="w-12 h-[1px] bg-primary/40 mx-auto"></div>
        
        <p className="text-lg md:text-xl text-gray-400 font-light tracking-wide leading-relaxed">
          广州菲娜睿特人工智能科技有限责任公司联合创始人 & CTO
        </p>
      </div>
    </div>
  );
}