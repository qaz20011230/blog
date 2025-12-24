import React from 'react';
import { Mail, Github, Twitter } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About Me</h1>
      
      <div className="prose prose-lg prose-slate mb-8">
        <p>
          Hello! I'm the creator of Liang World. This is my personal corner of the internet where I share my thoughts, learnings, and explorations.
        </p>
        <p>
          I am passionate about philosophy, psychology, logic, and e-commerce. I believe in the power of simple, clear thinking and the importance of continuous learning.
        </p>
        <p>
          Through this blog and my weekly newsletter, I hope to connect with like-minded individuals and contribute to the collective knowledge of our community.
        </p>
      </div>

      <div className="border-t border-gray-100 pt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Connect</h2>
        <div className="flex flex-col space-y-3">
          <a href="mailto:contact@liang.world" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <Mail className="mr-3" size={20} />
            contact@liang.world
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <Github className="mr-3" size={20} />
            Follow on GitHub
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-primary transition-colors">
            <Twitter className="mr-3" size={20} />
            Follow on Twitter
          </a>
        </div>
      </div>
    </div>
  );
}
