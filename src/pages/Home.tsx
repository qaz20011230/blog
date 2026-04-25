import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-12">
      <Helmet>
        <title>良之世界 | Liang.World</title>
        <meta name="description" content="良之世界是思想助产士（梁良）的数字花园。这里汇集了关于哲学践行、精神分析与商业逻辑的深度思考。" />
        <meta name="keywords" content="良之世界, 思想助产士, 哲学咨询, 架构师, 极客, 黎曼猜想" />
      </Helmet>

      {/* Geek Aesthetic Typographic Logo */}
      <div className="relative select-none">
        {/* Decorative Klein Blue Blur */}
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <h1 className="relative text-5xl md:text-8xl font-serif font-bold text-gray-100 tracking-[0.2em] md:tracking-[0.3em] uppercase">
          LIANG
          <span className="text-primary">.</span>
          WORLD
        </h1>
        
        <div className="absolute -right-8 -top-8 text-primary/40 font-mono text-sm tracking-widest hidden md:block">
          {'{\n  "status": "online",\n  "protocol": "Zeta"\n}'}
        </div>
      </div>

      <div className="space-y-6 max-w-2xl relative z-10">
        <p className="text-lg md:text-xl font-mono text-gray-400 tracking-widest uppercase">
          Architecture <span className="text-primary mx-2">/</span> Philosophy <span className="text-primary mx-2">/</span> Mathematics
        </p>
        
        <p className="text-sm md:text-base text-gray-500 font-serif tracking-widest leading-relaxed italic">
          "Ask, and it will be given to you; seek, and you will find; knock, and it will be opened to you."
        </p>
      </div>

      {/* Minimalist Interactive Element */}
      <div className="pt-12 relative z-10">
        <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent mx-auto opacity-50" />
      </div>
    </div>
  );
}
