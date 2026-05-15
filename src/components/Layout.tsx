import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import SicasShare from './SicasShare';

export default function Layout() {
  const location = useLocation();
  const canonicalUrl = `https://liang.world${location.pathname}`;

  return (
    <div className="min-h-screen flex flex-col bg-hilbert font-sans text-text">
      <Helmet>
        <title>良之世界 | Liang.World — 思想助产士的数字花园</title>
        <meta name="description" content="良之世界 - 怀瑾握瑜，解惑忘隙。融合精神分析、哲学践行与商业逻辑，助你澄清概念、暴露预设、重构认知。" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="思想助产士 (Ang Li)" />

        {/* Open Graph */}
        <meta property="og:site_name" content="良之世界 | Liang.World" />
        <meta property="og:title" content="良之世界 | Liang.World — 思想助产士的数字花园" />
        <meta property="og:description" content="怀瑾握瑜，解惑忘隙。融合精神分析、哲学践行与商业逻辑，助你澄清概念、暴露预设、重构认知。" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://liang.world/favicon.jpg" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:locale" content="zh_CN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="良之世界 | Liang.World — 思想助产士的数字花园" />
        <meta name="twitter:description" content="怀瑾握瑜，解惑忘隙。融合精神分析、哲学践行与商业逻辑，助你澄清概念、暴露预设、重构认知。" />
        <meta name="twitter:image" content="https://liang.world/favicon.jpg" />
        <meta name="twitter:creator" content="@liang_world" />
      </Helmet>
      <Navbar />
      <main className="relative flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl z-10">
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
      <SicasShare />
    </div>
  );
}
