import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { isValidCategory, VALID_CATEGORIES } from '../constants/categories.ts';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  authorName?: string;
  author?: { name: string };
  createdAt: string;
  category: string;
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fallbackImage = `https://picsum.photos/seed/${post._id || post.title}/800/400`;
  const displayCategory = isValidCategory(post.category) ? post.category : null;

  return (
    <article className="bg-slate-800 dark:bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-700 dark:border-slate-200 group">
      <Link to={`/post/${post.slug}`} className="block relative">
        <div className="relative h-48 overflow-hidden bg-slate-700 dark:bg-slate-200">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-slate-600 dark:bg-slate-300 w-full h-full"></div>
            </div>
          )}
          {imageError ? (
            <img 
              src={fallbackImage} 
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <img 
              src={post.coverImage || fallbackImage} 
              alt={post.title}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="inline-flex items-center text-white text-sm font-medium">
            Read Article <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </div>
      </Link>
      
      <div className="p-6">
        {displayCategory && (
          <Link to={`/blog?category=${encodeURIComponent(post.category)}`}>
            <span className="inline-block bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold mb-3 hover:bg-emerald-500/30 transition-colors">
              {post.category}
            </span>
          </Link>
        )}
        
        <Link to={`/post/${post.slug}`}>
          <h2 className="text-xl font-bold text-white dark:text-slate-900 mb-3 hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-slate-400 dark:text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-700 dark:border-slate-200">
          <div className="flex items-center">
            <div className="bg-slate-700 dark:bg-slate-200 p-1.5 rounded-full mr-2">
              <User className="h-3 w-3 text-emerald-400 dark:text-emerald-600" />
            </div>
            <span className="font-medium">{post.authorName || post.author?.name || 'Admin'}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {post.createdAt ? format(new Date(post.createdAt), 'MMM d, yyyy') : 'Unknown Date'}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
