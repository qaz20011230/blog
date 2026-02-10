import React from 'react';
import { Github, Twitter, Mail, Rss } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} 良之世界 (Liang World). All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
              <span className="sr-only">RSS</span>
              <Rss size={20} />
            </a>
            <a href="mailto:contact@liang.world" className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">Email</span>
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
