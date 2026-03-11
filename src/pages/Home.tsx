import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard.tsx';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.ts';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!db) {
        setLoading(false);
        return;
      }
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(6));
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map(doc => ({
          _id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString()
        }));
        setFeaturedPosts(postsData.slice(0, 3) as any);
        setRecentPosts(postsData.slice(3, 6) as any);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-slate-900 dark:bg-white min-h-screen text-white dark:text-slate-900">
      {/* Hero Section */}
      <section className="relative bg-slate-800 dark:bg-slate-100 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-slate-900/50 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
          >
            Empowering <span className="text-emerald-400 dark:text-emerald-600">Nigerian Tech</span> & <span className="text-yellow-400 dark:text-yellow-500">Solar</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 dark:text-slate-600 max-w-3xl mx-auto mb-8"
          >
            Your go-to resource for web development tutorials, solar energy guides, and navigating the tech business landscape in Nigeria.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center space-x-4"
          >
            <Link to="/blog" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg shadow-emerald-500/30">
              Read Blog
            </Link>
            <Link to="/contact" className="bg-slate-700 dark:bg-slate-200 hover:bg-slate-600 dark:hover:bg-slate-300 text-white dark:text-slate-900 font-bold py-3 px-8 rounded-full transition-colors border border-slate-600 dark:border-slate-300">
              Contact Me
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-slate-900 dark:bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white dark:text-slate-900">Explore Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Web Development', desc: 'Modern tutorials for React, Node.js, and more.', color: 'bg-blue-600', category: 'Web Development Tutorials' },
              { title: 'Solar & Electrical', desc: 'Guides on solar installation and electrical engineering.', color: 'bg-yellow-500', category: 'Solar & Electrical Guides' },
              { title: 'Tech Business', desc: 'Insights on running a tech business in Nigeria.', color: 'bg-emerald-600', category: 'Tech Business in Nigeria' },
              { title: 'Tech News', desc: 'Latest updates and trends in the tech world.', color: 'bg-purple-600', category: 'Tech News' },
            ].map((cat, idx) => (
              <Link key={idx} to={`/blog?category=${encodeURIComponent(cat.category)}`}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`${cat.color} p-8 rounded-2xl shadow-lg text-center cursor-pointer h-full`}
                >
                  <h3 className="text-2xl font-bold mb-2">{cat.title}</h3>
                  <p className="text-white/80">{cat.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-slate-800 dark:bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white dark:text-slate-900">Featured Posts</h2>
            <Link to="/blog" className="text-emerald-400 dark:text-emerald-600 hover:text-emerald-300 dark:hover:text-emerald-500 font-medium">View All &rarr;</Link>
          </div>
          
          {loading ? (
            <div className="text-center py-12 text-slate-400 dark:text-slate-500">Loading posts...</div>
          ) : featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 dark:text-slate-500">No posts available yet.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
