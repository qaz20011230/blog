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
        <title>Liang's World | 思想助产士</title>
        <meta name="description" content="思想助产士的个人博客 - 哲学、心理学、商业与逻辑的交叉探索" />
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
