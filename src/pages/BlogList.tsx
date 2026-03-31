import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard.tsx';
import { Search, Filter, BookOpen, AlertCircle } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase.ts';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES, VALID_CATEGORIES, isValidCategory } from '../constants/categories.ts';

const BlogList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const rawCategory = searchParams.get('category') || '';
  const [page, setPage] = useState(1);
  const postsPerPage = 9;
  const [totalPages, setTotalPages] = useState(1);
  const [invalidCategory, setInvalidCategory] = useState(false);

  useEffect(() => {
    if (rawCategory && !isValidCategory(rawCategory)) {
      setInvalidCategory(true);
      setLoading(false);
      return;
    }
    setInvalidCategory(false);

    const fetchPosts = async () => {
      setLoading(true);
      if (!db) {
        setLoading(false);
        return;
      }
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        let postsData = querySnapshot.docs.map(doc => ({
          _id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString()
        }));

        if (rawCategory) {
          postsData = postsData.filter((post: any) => post.category === rawCategory);
        }

        if (search) {
          postsData = postsData.filter((post: any) => 
            post.title.toLowerCase().includes(search.toLowerCase()) || 
            post.excerpt.toLowerCase().includes(search.toLowerCase())
          );
        }

        setPosts(postsData as any);
        setTotalPages(Math.ceil(postsData.length / postsPerPage));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
      fetchPosts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, rawCategory]);

  const paginatedPosts = posts.slice((page - 1) * postsPerPage, page * postsPerPage);

  if (invalidCategory) {
    return (
      <div className="bg-slate-900 dark:bg-white min-h-screen text-white dark:text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center py-20">
          <AlertCircle className="h-20 w-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Invalid Category</h2>
          <p className="text-slate-400 dark:text-slate-600 mb-8">
            The category "{rawCategory}" does not exist. Please choose a valid category.
          </p>
          <div className="bg-slate-800 dark:bg-slate-100 rounded-xl p-6 mb-8">
            <h3 className="font-bold mb-4">Valid Categories:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {VALID_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSearchParams({ category: cat })}
                  className="bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 px-4 py-2 rounded-full hover:bg-emerald-500/30 transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <Link to="/blog" className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
            Browse All Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 dark:bg-white min-h-screen text-white dark:text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-emerald-400 dark:text-emerald-600">Blog</span> Posts
          </h1>
          <p className="text-slate-400 dark:text-slate-600 max-w-2xl mx-auto">
            Explore our collection of tech news, AI tools, and opportunities in Nigeria's tech ecosystem
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-8 space-y-4 md:space-y-0 gap-4"
        >
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full bg-slate-800 dark:bg-slate-100 border border-slate-700 dark:border-slate-200 rounded-xl py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white dark:text-slate-900"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 dark:text-slate-500" />
          </div>

          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-slate-400 dark:text-slate-500 hidden md:block" />
            <select
              value={rawCategory}
              onChange={(e) => {
                setPage(1);
                if (e.target.value) {
                  setSearchParams({ category: e.target.value });
                } else {
                  setSearchParams({});
                }
              }}
              className="bg-slate-800 dark:bg-slate-100 border border-slate-700 dark:border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white dark:text-slate-900 min-w-[180px]"
            >
              <option value="">All Categories</option>
              <option value={CATEGORIES.TECH_NEWS}>Tech Updates</option>
              <option value={CATEGORIES.OPPORTUNITIES}>Tech Jobs</option>
              <option value={CATEGORIES.AI_TOOLS}>{CATEGORIES.AI_TOOLS}</option>
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-slate-400 dark:text-slate-600 flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>{posts.length} {posts.length === 1 ? 'article' : 'articles'} found</span>
          {rawCategory && (
            <span className="bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 px-3 py-1 rounded-full text-sm ml-2">
              {rawCategory}
            </span>
          )}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-slate-400 dark:text-slate-500">Loading articles...</p>
          </div>
        ) : paginatedPosts.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {paginatedPosts.map((post: any, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-slate-800 dark:bg-slate-100 rounded-2xl p-12 max-w-lg mx-auto">
              <Search className="h-16 w-16 text-slate-500 dark:text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white dark:text-slate-900">No articles found</h3>
              <p className="text-slate-400 dark:text-slate-600 mb-6">
                {search || rawCategory 
                  ? 'Try adjusting your search or filters'
                  : 'No blog posts available yet. Check back soon!'}
              </p>
              <Link to="/blog" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-6 rounded-full transition-colors">
                Browse All
              </Link>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-12 space-x-2"
          >
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-slate-800 dark:bg-slate-200 text-slate-400 dark:text-slate-600 hover:bg-slate-700 dark:hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  page === i + 1
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800 dark:bg-slate-200 text-slate-400 dark:text-slate-600 hover:bg-slate-700 dark:hover:bg-slate-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-slate-800 dark:bg-slate-200 text-slate-400 dark:text-slate-600 hover:bg-slate-700 dark:hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
