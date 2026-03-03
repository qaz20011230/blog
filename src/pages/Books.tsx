import React from 'react';
import { getAllBooks } from '../lib/content';
import { format } from 'date-fns';
import { Download, Book as BookIcon } from 'lucide-react';

export default function Books() {
  const books = getAllBooks();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">书架</h1>
        <p className="text-xl text-gray-600">
          收集的一些好书与资源。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {books.map((book) => (
          <div key={book.slug} className="bg-white p-6 rounded-lg border border-slate-200 shadow hover:shadow-md transition-all flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <BookIcon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{book.title}</h3>
                  <p className="text-sm text-slate-500">作者: {book.author}</p>
                </div>
              </div>
            </div>
            
            <p className="text-slate-600 mb-6 flex-grow">
              {book.description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-mono">
                {format(new Date(book.publishDate), 'yyyy-MM-dd')}
              </span>
              <a 
                href={book.downloadUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <Download size={16} />
                <span>下载/阅读</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
