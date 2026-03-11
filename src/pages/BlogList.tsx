import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard.tsx';
import { Search } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase.ts';
import { useSearchParams } from 'react-router-dom';

const BlogList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const category = searchParams.get('category') || '';
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
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

        if (category) {
          postsData = postsData.filter((post: any) => post.category === category);
        }

        if (search) {
          postsData = postsData.filter((post: any) => 
            post.title.toLowerCase().includes(search.toLowerCase()) || 
            post.excerpt.toLowerCase().includes(search.toLowerCase())
          );
        }

        setPosts(postsData as any);
        setTotalPages(1);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [page, search, category]);

  return (
    <div className="bg-slate-900 dark:bg-white min-h-screen text-white dark:text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 dark:bg-slate-100 border border-slate-700 dark:border-slate-200 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:border-emerald-500 text-white dark:text-slate-900"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 dark:text-slate-500" />
          </div>

          <select
            value={category}
            onChange={(e) => {
              if (e.target.value) {
                setSearchParams({ category: e.target.value });
              } else {
                setSearchParams({});
              }
            }}
            className="w-full md:w-1/4 bg-slate-800 dark:bg-slate-100 border border-slate-700 dark:border-slate-200 rounded-lg py-2 px-4 focus:outline-none focus:border-emerald-500 text-white dark:text-slate-900"
          >
            <option value="">All Categories</option>
            <option value="Web Development Tutorials">Web Development</option>
            <option value="Solar & Electrical Guides">Solar & Electrical</option>
            <option value="Tech Business in Nigeria">Tech Business</option>
            <option value="Tech News">Tech News</option>
          </select>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 dark:text-slate-500">No posts found.</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-md ${
                  page === i + 1
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800 dark:bg-slate-200 text-slate-400 dark:text-slate-600 hover:bg-slate-700 dark:hover:bg-slate-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
