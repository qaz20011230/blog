import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UI } from '../types';

const books = [
  { id: 1, title: { zh: '我懂你', en: 'I Understand You' }, author: { zh: '良之', en: 'Ang Li' }, description: { zh: '深度洞察人性的本质与社会互动的底层逻辑。', en: 'A profound insight into the nature of humanity and the underlying logic of social interaction.' }, year: '2024', pdfUrl: '/books/wo-dong-ni.pdf' }
];

export default function Books() {
  const { locale, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto page-enter">
      <Helmet>
        <title>{t(UI.books.heading.zh, UI.books.heading.en)} | 良之世界</title>
      </Helmet>
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-100 mb-4 font-serif tracking-widest">{t(UI.books.heading.zh, UI.books.heading.en)}</h1>
        <p className="text-gray-400 font-mono text-sm tracking-wider">{t(UI.books.tagline.zh, UI.books.tagline.en)}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
        {books.map((book) => (
          <div key={book.id} className="group relative border border-gray-800 bg-hilbert/50 p-6 hover:border-primary transition-all duration-300 flex flex-col justify-between min-h-[200px] card-hover">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <BookOpen className="text-gray-500 group-hover:text-primary transition-colors" size={24} />
                <span className="text-xs font-mono text-gray-600 bg-gray-900 px-2 py-1">{book.year}</span>
              </div>
              <h2 className="text-xl font-serif font-bold text-gray-200 mb-2 group-hover:text-white transition-colors">{book.title[locale]}</h2>
              <p className="text-sm text-primary mb-4 font-mono">{book.author[locale]}</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">{book.description[locale]}</p>
            </div>
            <div className="relative z-10 mt-auto pt-4 border-t border-gray-800/50">
              {/* eslint-disable-next-line react/jsx-no-target-blank */}
              <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-primary transition-all duration-300 group/link">
                <Download size={16} className="group-hover/link:translate-y-0.5 transition-transform" />
                <span>{t(UI.books.readPdf.zh, UI.books.readPdf.en)}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
      {books.length === 0 && (
        <div className="text-center py-20 border border-dashed border-gray-800">
          <p className="text-gray-500 font-mono tracking-widest">{t(UI.books.empty.zh, UI.books.empty.en)}</p>
        </div>
      )}
    </div>
  );
}
