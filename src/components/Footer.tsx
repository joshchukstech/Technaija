import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { CATEGORIES } from '../constants/categories.ts';

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-100 border-t border-slate-800 dark:border-slate-200 text-slate-400 dark:text-slate-600 py-12">
      <div className="max-w-7xl mx- auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-emerald-400 dark:text-emerald-600 text-xl font-bold mb-4">Tech9ja</h3>
            <p className="text-sm leading-relaxed">
              Your go-to source for tech news, AI tools, and opportunities in Nigeria's growing tech ecosystem.
            </p>
          </div>
          <div>
            <h3 className="text-white dark:text-slate-900 text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors">Home</Link></li>
              <li><Link to="/blog" className="hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white dark:text-slate-900 text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to={`/blog?category=${encodeURIComponent(CATEGORIES.TECH_NEWS)}`} className="hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors">{CATEGORIES.TECH_NEWS}</Link></li>
              <li><Link to={`/blog?category=${encodeURIComponent(CATEGORIES.OPPORTUNITIES)}`} className="hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors">Tech Jobs</Link></li>
              <li><Link to={`/blog?category=${encodeURIComponent(CATEGORIES.AI_TOOLS)}`} className="hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors">{CATEGORIES.AI_TOOLS}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white dark:text-slate-900 text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors">Terms of Service</Link></li>
            </ul>
            <h3 className="text-white dark:text-slate-900 text-lg font-bold mb-4 mt-6">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/chukwuemeka.ezugwu.1" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="https://x.com/JoshuaEzugwu1" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="https://www.linkedin.com/in/joshua-ezugwu-gmnse-167909241/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/joshchukstech?igsh=djV0MWFocGlyeGhh" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 dark:border-slate-200 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Tech9ja Blog. All rights reserved.</p>
          <p className="mt-2 text-xs">Joshchuks Tech Solutions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
