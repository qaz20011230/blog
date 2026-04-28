import React from 'react';
import { Rss, Mail } from 'lucide-react';
import SiteStats from './SiteStats';

export default function Footer() {
  return (
    <footer className="relative bg-hilbert border-t border-gray-900 py-8 mt-auto z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm tracking-wide">
              &copy; {new Date().getFullYear()} 良之世界 (LeoZ Universe). All rights reserved.
            </p>
            <div className="mt-2 text-gray-500">
              <SiteStats />
            </div>
          </div>

          <div className="flex space-x-6">
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 inline-block"
            >
              <span className="sr-only">RSS</span>
              <Rss size={20} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-gray-500 hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 inline-block"
            >
              <span className="sr-only">Email</span>
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
