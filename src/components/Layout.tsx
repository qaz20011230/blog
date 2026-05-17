import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import SicasShare from './SicasShare';
import { useLanguage } from '../context/LanguageContext';
import { UI } from '../types';

export default function Layout() {
  const location = useLocation();
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const pathLocale = location.pathname.startsWith('/en') ? 'en' : 'zh';
    if (pathLocale !== locale) {
      setLocale(pathLocale);
    }
  }, [location.pathname, locale, setLocale]);

  const isEn = locale === 'en';
  const canonicalUrl = `https://liang.world${location.pathname}`;
  const altUrl = isEn
    ? `https://liang.world${location.pathname.replace(/^\/en/, '') || '/'}`
    : `https://liang.world/en${location.pathname === '/' ? '' : location.pathname}`;

  const title = t(UI.siteName.zh, UI.siteName.en) + ' — ' + t(UI.tagline.zh, UI.tagline.en);
  const desc = t(UI.description.zh, UI.description.en);
  const keywords = t(UI.keywords.zh, UI.keywords.en);

  const siteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': t(UI.siteName.zh, UI.siteName.en),
    'url': 'https://liang.world',
    'description': desc,
    'author': {
      '@type': 'Person',
      'name': isEn ? 'Ang Li (良之)' : '良之 (Ang Li)',
      'jobTitle': isEn ? 'CTO, Phaenarete AI; Former CTO, Alibaba Group' : '菲娜睿特AI首席技术官；阿里巴巴前首席技术官',
      'url': 'https://liang.world/about',
    },
    'inLanguage': isEn ? 'en' : 'zh-CN',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': { '@type': 'EntryPoint', 'urlTemplate': 'https://liang.world/search?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-hilbert font-sans text-text" lang={isEn ? 'en' : 'zh-CN'}>
      <Helmet>
        <html lang={isEn ? 'en' : 'zh-CN'} />
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Ang Li (良之)" />
        <meta name="application-name" content={t(UI.siteName.zh, UI.siteName.en)} />
        <meta name="theme-color" content="#050505" />
        <meta name="apple-mobile-web-app-title" content={t(UI.siteName.zh, UI.siteName.en)} />
        <meta name="geo.region" content={isEn ? 'GB-SCT' : 'CN-44'} />
        <meta name="geo.placename" content={isEn ? 'Guangzhou / Edinburgh' : '广州 / 爱丁堡'} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="zh" href={`https://liang.world${location.pathname.replace(/^\/en/, '') || '/'}`} />
        <link rel="alternate" hrefLang="en" href={`https://liang.world/en${location.pathname === '/' ? '' : location.pathname}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://liang.world${location.pathname.replace(/^\/en/, '') || '/'}`} />
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Ang Li (良之)" />

        <meta property="og:site_name" content={t(UI.siteName.zh, UI.siteName.en)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://liang.world/favicon.jpg" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:locale" content={isEn ? 'en_US' : 'zh_CN'} />
        <meta property="og:locale:alternate" content={isEn ? 'zh_CN' : 'en_US'} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@liang_world" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content="https://liang.world/favicon.jpg" />

        <script type="application/ld+json">{JSON.stringify(siteJsonLd)}</script>
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
