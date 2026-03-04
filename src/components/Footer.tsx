import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-100 border-t border-slate-800 dark:border-slate-200 text-slate-400 dark:text-slate-600 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-emerald-400 dark:text-emerald-600 text-lg font-bold mb-4">TechNaija</h3>
            <p className="text-sm">
              Empowering Nigerian tech entrepreneurs and engineers with tutorials, guides, and business insights.
            </p>
          </div>
          <div>
            <h3 className="text-white dark:text-slate-900 text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-emerald-400 dark:hover:text-emerald-600">Home</Link></li>
              <li><Link to="/blog" className="hover:text-emerald-400 dark:hover:text-emerald-600">Blog</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 dark:hover:text-emerald-600">About</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 dark:hover:text-emerald-600">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white dark:text-slate-900 text-lg font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/chukwuemeka.ezugwu.1" className="hover:text-emerald-400 dark:hover:text-emerald-600"><Facebook className="h-5 w-5" /></a>
              <a href="https://x.com/JoshuaEzugwu1" className="hover:text-emerald-400 dark:hover:text-emerald-600"><Twitter className="h-5 w-5" /></a>
              <a href="https://www.linkedin.com/in/joshua-ezugwu-b-eng-167909241/" className="hover:text-emerald-400 dark:hover:text-emerald-600"><Linkedin className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/joshchukstech?igsh=djV0MWFocGlyeGhh" className="hover:text-emerald-400 dark:hover:text-emerald-600"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 dark:border-slate-200 text-center text-xs">
          &copy; {new Date().getFullYear()} TechNaija Blog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
