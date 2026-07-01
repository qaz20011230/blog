import { Outlet, useLocation } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import Navbar from './Navbar';
import Footer from './Footer';
import SicasShare from './SicasShare';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { UI } from '../types';

export default function Layout() {
  return (
    <LanguageProvider>
      <LayoutContent />
    </LanguageProvider>
  );
}

function LayoutContent() {
  const location = useLocation();
  const { locale, t } = useLanguage();

  const isEn = locale === 'en';
  const canonicalUrl = `https://liang.world${location.pathname}`;
  const zhHref = `https://liang.world${location.pathname.replace(/^\/en/, '') || '/'}`;
  const enHref = `https://liang.world/en${location.pathname === '/' ? '' : location.pathname.replace(/^\/en/, '')}`;

  const title = t(UI.siteName.zh, UI.siteName.en) + ' — ' + t(UI.tagline.zh, UI.tagline.en);
  const desc = t(UI.description.zh, UI.description.en);
  const keywords = t(UI.keywords.zh, UI.keywords.en);

  return (
    <div className="min-h-screen flex flex-col bg-hilbert font-serif text-text" lang={isEn ? 'en' : 'zh-CN'}>
      <Head>
        <html lang={isEn ? 'en' : 'zh-CN'} />
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Ang Li (良之)" />
        <meta name="application-name" content={t(UI.siteName.zh, UI.siteName.en)} />
        <meta name="theme-color" content="#f8fafc" />
        <meta name="apple-mobile-web-app-title" content={t(UI.siteName.zh, UI.siteName.en)} />
        <meta name="geo.region" content={isEn ? 'GB-SCT' : 'CN-44'} />
        <meta name="geo.placename" content={isEn ? 'Guangzhou / Edinburgh' : '广州 / 爱丁堡'} />
        <meta name="geo.position" content="23.1291;113.2644" />
        <meta name="ICBM" content="23.1291, 113.2644" />
        <meta name="generator" content="vite-react-ssg" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="zh" href={zhHref} />
        <link rel="alternate" hrefLang="en" href={enHref} />
        <link rel="alternate" hrefLang="x-default" href={zhHref} />
        <link rel="alternate" type="application/rss+xml" title="RSS" href={isEn ? '/en/rss.xml' : '/rss.xml'} />

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
      </Head>
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
