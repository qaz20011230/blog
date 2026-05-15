import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import Categories from './pages/Categories';
import About from './pages/About';
import Books from './pages/Books';
import Gate from './components/Gate';

function LocaleSync() {
  const { locale } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isEnUrl = location.pathname.startsWith('/en');
    const isEnLocale = locale === 'en';

    if (isEnUrl && !isEnLocale) {
      navigate(location.pathname.replace(/^\/en/, '') || '/', { replace: true });
    } else if (!isEnUrl && isEnLocale) {
      navigate('/en' + (location.pathname === '/' ? '' : location.pathname), { replace: true });
    }
  }, [locale, location.pathname]);

  return null;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <LocaleSync />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="post/:slug" element={<BlogDetail />} />
          <Route path="categories" element={<Categories />} />
          <Route path="books" element={<Books />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/en" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="post/:slug" element={<BlogDetail />} />
          <Route path="categories" element={<Categories />} />
          <Route path="books" element={<Books />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="*" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function AppContent() {
  const [passed, setPassed] = useState(() => {
    return localStorage.getItem('liang_world_gate_passed') === 'true';
  });

  if (!passed) return <Gate />;

  return <AppRoutes />;
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
