import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../hooks/useTheme';

const navItems = [
  { name: '首页', path: '/' },
  { name: '分类', path: '/categories' },
  { name: '书架', path: '/books' },
  { name: '关于', path: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
            <Link
              to="/"
              className="text-xl font-serif font-bold text-gray-100 hover:text-primary transition-colors tracking-widest"
            >
              良之世界
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'relative text-sm font-medium tracking-widest transition-colors duration-300 py-1',
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-gray-400 hover:text-gray-200'
                )}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary rounded-full animate-line-grow origin-left" />
                )}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="text-gray-400 hover:text-primary focus:outline-none transition-colors p-1"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <button
              onClick={toggleTheme}
              className="text-gray-400 hover:text-primary focus:outline-none transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-primary focus:outline-none transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-64 border-b border-gray-800' : 'max-h-0'
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'block px-3 py-2 rounded-md text-base font-medium tracking-widest transition-all duration-200',
                location.pathname === item.path
                  ? 'text-primary bg-gray-900 border-l-2 border-primary'
                  : 'text-gray-400 hover:text-primary hover:bg-gray-900 border-l-2 border-transparent'
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
