import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, User } from 'lucide-react';

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
  return (
    <div className="bg-slate-800 dark:bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-700 dark:border-slate-200">
      <img 
        src={post.coverImage || 'https://picsum.photos/seed/tech/800/400'} 
        alt={post.title} 
        className="w-full h-48 object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="p-6">
        <div className="flex items-center text-xs text-emerald-400 dark:text-emerald-600 mb-2 font-semibold uppercase tracking-wider">
          {post.category}
        </div>
        <Link to={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold text-white dark:text-slate-900 mb-2 hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="text-slate-400 dark:text-slate-600 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-700 dark:border-slate-200 pt-4">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            {post.authorName || post.author?.name || 'Admin'}
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {post.createdAt ? format(new Date(post.createdAt), 'MMM d, yyyy') : 'Unknown Date'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
