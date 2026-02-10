import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const canonicalUrl = `https://liang.world${location.pathname}`;

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-text">
      <Helmet>
        <title>良之世界 | 思想助产士</title>
        <meta name="description" content="良之世界 - 思想助产士的个人博客。融合精神分析、哲学践行与商业逻辑，助你澄清概念、暴露预设、重构认知。这里不是标准答案的贩卖机，而是思想觉醒的演练场，致力于建立不可动摇的思想主权。" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        {/* Anti-AI meta tag (optional, support varies) */}
        <meta name="robots" content="noai" />
        <meta name="robots" content="noimageai" />
      </Helmet>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
