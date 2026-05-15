import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import Categories from './pages/Categories';
import About from './pages/About';
import Books from './pages/Books';
import Gate from './components/Gate';

function AppContent() {
  const { locale } = useLanguage();
  const [passed, setPassed] = useState(() => {
    return localStorage.getItem('liang_world_gate_passed') === 'true';
  });

  if (!passed) {
    return <Gate />;
  }

  const prefix = locale === 'en' ? '/en' : '';

  return (
    <BrowserRouter>
      <Routes>
        <Route path={prefix} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="post/:slug" element={<BlogDetail />} />
          <Route path="categories" element={<Categories />} />
          <Route path="books" element={<Books />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
