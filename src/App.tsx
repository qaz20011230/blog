import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import Weekly from './pages/Weekly';
import WeeklyDetail from './pages/WeeklyDetail';
import Categories from './pages/Categories';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="post/:slug" element={<BlogDetail />} />
          <Route path="weekly" element={<Weekly />} />
          <Route path="weekly/:slug" element={<WeeklyDetail />} />
          <Route path="categories" element={<Categories />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
