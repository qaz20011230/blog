import React, { useState, useEffect } from 'react';
import { Share2, Copy, Twitter, Check, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function SicasShare() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Sense: Show the button after a small delay or scroll to grab attention without being annoying
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Reset state on route change
  useEffect(() => {
    setIsOpen(false);
    setCopied(false);
  }, [location.pathname]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTwitterShare = () => {
    const text = document.title;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-2">
      {/* Action/Share Menu */}
      <div 
        className={`transition-all duration-300 ease-in-out transform origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-4'
        }`}
      >
        <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-2 flex flex-col gap-2 min-w-[160px]">
          {/* Interest & Connect: Provide value propositions for sharing */}
          <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-50">
            传播思想火种
          </div>
          
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors w-full text-left group"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-400 group-hover:text-primary" />}
            <span>{copied ? '已复制链接' : '复制链接'}</span>
          </button>

          <button
            onClick={handleTwitterShare}
            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors w-full text-left group"
          >
            <Twitter size={16} className="text-gray-400 group-hover:text-blue-400" />
            <span>分享至 Twitter</span>
          </button>
        </div>
      </div>

      {/* Sense: The Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300
          ${isOpen ? 'bg-gray-100 text-gray-600 rotate-90' : 'bg-primary text-white hover:bg-blue-600 hover:scale-110'}
        `}
        aria-label="Share"
      >
        {isOpen ? <X size={20} /> : <Share2 size={20} />}
      </button>
    </div>
  );
}