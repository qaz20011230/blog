import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Download } from 'lucide-react';

// You can add your PDF books here. 
// Place the actual PDF files in the public/books/ folder.
const books = [
  {
    id: 1,
    title: '我懂你',
    author: '良之',
    description: '深度洞察人性的本质与社会互动的底层逻辑。',
    year: '2024',
    pdfUrl: '/books/wo-dong-ni.pdf'
  }
];

export default function Books() {
  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>书架 | 良之世界</title>
      </Helmet>

      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-100 mb-4 font-serif tracking-widest">
          LIBRARY
        </h1>
        <p className="text-gray-400 font-mono text-sm tracking-wider">
          {"// 思想的载体，数字的档案馆"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {books.map((book) => (
          <div 
            key={book.id} 
            className="group relative border border-gray-800 bg-hilbert/50 p-6 hover:border-primary transition-all duration-300 flex flex-col justify-between min-h-[200px]"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <BookOpen className="text-gray-500 group-hover:text-primary transition-colors" size={24} />
                <span className="text-xs font-mono text-gray-600 bg-gray-900 px-2 py-1 rounded">
                  {book.year}
                </span>
              </div>
              
              <h2 className="text-xl font-serif font-bold text-gray-200 mb-2 group-hover:text-white transition-colors">
                {book.title}
              </h2>
              
              <p className="text-sm text-primary mb-4 font-mono">
                {book.author}
              </p>
              
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {book.description}
              </p>
            </div>

            <div className="relative z-10 mt-auto pt-4 border-t border-gray-800/50">
              <a 
                href={book.pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-primary transition-colors"
              >
                <Download size={16} />
                <span>READ_PDF</span>
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {books.length === 0 && (
        <div className="text-center py-20 border border-dashed border-gray-800">
          <p className="text-gray-500 font-mono tracking-widest">
            {"[ 档案馆当前为空 ]"}
          </p>
        </div>
      )}
    </div>
  );
}
