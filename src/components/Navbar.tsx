import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../context/LanguageContext';
import { UI } from '../types';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, setLocale, t } = useLanguage();

  const navItems = [
    { name: t(UI.nav.home.zh, UI.nav.home.en), path: '' },
    { name: t(UI.nav.categories.zh, UI.nav.categories.en), path: 'categories' },
    { name: t(UI.nav.books.zh, UI.nav.books.en), path: 'books' },
    
  ];

  const prefix = locale === 'en' ? '/en' : '';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const handleLangSwitch = () => {
    const newLocale = locale === 'zh' ? 'en' : 'zh';
    setLocale(newLocale);
    localStorage.setItem('liang_world_locale', newLocale);
    const currentPath = location.pathname;
    let newPath: string;
    if (newLocale === 'en') {
      newPath = '/en' + (currentPath === '/' ? '' : currentPath);
    } else {
      newPath = currentPath.replace(/^\/en/, '') || '/';
    }
    navigate(newPath, { replace: true });
  };

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 border-b',
        scrolled
          ? 'bg-hilbert/95 backdrop-blur-xl border-gray-800 shadow-[0_1px_20px_rgba(0,47,167,0.03)]'
          : 'bg-hilbert/90 backdrop-blur-md border-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={prefix || '/'} className="text-xl font-serif font-bold text-gray-100 hover:text-primary transition-colors tracking-widest">
              {t(UI.siteName.zh, UI.siteName.en)}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const itemPath = item.path ? `${prefix}/${item.path}` : (prefix || '/');
              const isActive = item.path
                ? location.pathname.startsWith(`${prefix}/${item.path}`)
                : location.pathname === (prefix || '/');
              return (
                <Link
                  key={item.path}
                  to={itemPath}
                  className={cn(
                    'relative text-sm font-medium tracking-widest transition-colors duration-300 py-1',
                    isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-200'
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary rounded-full animate-line-grow origin-left" />
                  )}
                </Link>
              );
            })}

            <div className="h-5 w-px bg-gray-800 mx-1" />
            <button
              onClick={handleLangSwitch}
              className="text-xs font-mono tracking-widest text-gray-500 hover:text-primary transition-colors duration-300 px-2 py-1 border border-gray-800 hover:border-primary rounded"
            >
              {locale === 'zh' ? 'EN' : '中'}
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={handleLangSwitch} className="text-xs font-mono text-gray-500 hover:text-primary mr-3 px-2 py-1 border border-gray-800 rounded">
              {locale === 'zh' ? 'EN' : '中'}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-primary transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={cn('md:hidden overflow-hidden transition-all duration-300', isOpen ? 'max-h-64 border-b border-gray-800' : 'max-h-0')}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => {
            const itemPath = item.path ? `${prefix}/${item.path}` : (prefix || '/');
            const isActive = item.path
              ? location.pathname.startsWith(`${prefix}/${item.path}`)
              : location.pathname === (prefix || '/');
            return (
              <Link
                key={item.path}
                to={itemPath}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium tracking-widest transition-all duration-200',
                  isActive ? 'text-primary bg-gray-900 border-l-2 border-primary' : 'text-gray-400 hover:text-primary hover:bg-gray-900 border-l-2 border-transparent'
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
