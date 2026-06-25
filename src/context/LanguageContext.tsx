import React, { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

type Locale = 'zh' | 'en';

interface LanguageContextType {
  locale: Locale;
  t: (zh: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

/**
 * Locale is derived purely from the URL path (`/en/...` → en, otherwise zh).
 * This makes it correct during static prerendering (no localStorage/navigator
 * access at render time) and keeps the URL as the single source of truth.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const locale: Locale = location.pathname.startsWith('/en') ? 'en' : 'zh';
  const t = (zh: string, en: string) => (locale === 'zh' ? zh : en);

  return (
    <LanguageContext.Provider value={{ locale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
