import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard.tsx';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.ts';
import { Facebook, Twitter, Linkedin, Instagram, MessageCircle, ArrowRight, Clock, Users } from 'lucide-react';
import { CATEGORIES, getCategoryColor, getCategoryIcon } from '../constants/categories.ts';

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!db) {
        setLoading(false);
        return;
      }
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map(doc => ({
          _id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString()
        }));
        setPosts(postsData as any);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const featuredPost = posts[0];
  const latestPosts = posts.slice(1);

  return (
    <div className="bg-slate-900 dark:bg-white min-h-screen text-white dark:text-slate-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-white dark:to-slate-100 py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 px-4 py-1 rounded-full text-sm font-medium mb-6">
                Welcome to Tech9ja
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                Your Source for <span className="text-emerald-400 dark:text-emerald-600">Tech Jobs</span>, <span className="text-blue-400 dark:text-blue-600">Tech Updates</span> & <span className="text-purple-400 dark:text-purple-600">AI Tools</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 dark:text-slate-600 mb-8 leading-relaxed">
                Stay ahead with the latest tech news, discover powerful AI tools, and find tech jobs in Nigeria's growing tech ecosystem.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/blog" className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50">
                  Explore Blog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/contact" className="inline-flex items-center bg-slate-700 dark:bg-slate-200 hover:bg-slate-600 dark:hover:bg-slate-300 text-white dark:text-slate-900 font-bold py-3 px-8 rounded-full transition-colors border border-slate-600 dark:border-slate-300">
                  Get In Touch
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-8">
                <div className="flex items-center">
                  <div className="bg-slate-800 dark:bg-slate-200 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-emerald-400 dark:text-emerald-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-2xl font-bold text-white dark:text-slate-900">{posts.length}+</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500">Blog Posts</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-slate-800 dark:bg-slate-200 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-emerald-400 dark:text-emerald-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-2xl font-bold text-white dark:text-slate-900">1000+</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500">Readers</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className=""
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-yellow-500 rounded-2xl blur-xl opacity-20"></div>
                <div className="relative bg-slate-800 dark:bg-slate-200 rounded-2xl p-8 shadow-2xl">
                  <h3 className="text-xl font-bold mb-4 text-emerald-400 dark:text-emerald-600">Connect With Me</h3>
                  <p className="text-slate-300 dark:text-slate-600 mb-6">Follow on social media for daily tech tips and updates.</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.facebook.com/chukwuemeka.ezugwu.1" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors">
                      <Facebook className="h-5 w-5 text-white" />
                    </a>
                    <a href="https://x.com/JoshuaEzugwu1" target="_blank" rel="noopener noreferrer" className="bg-slate-700 dark:bg-slate-300 hover:bg-slate-600 dark:hover:bg-slate-400 p-3 rounded-full transition-colors">
                      <Twitter className="h-5 w-5 text-white dark:text-slate-900" />
                    </a>
                    <a href="https://www.linkedin.com/in/joshua-ezugwu-gmnse-167909241/" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-800 p-3 rounded-full transition-colors">
                      <Linkedin className="h-5 w-5 text-white" />
                    </a>
                    <a href="https://www.instagram.com/joshchukstech?igsh=djV0MWFocGlyeGhh" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 p-3 rounded-full transition-colors">
                      <Instagram className="h-5 w-5 text-white" />
                    </a>
                    <a href="https://wa.me/2349151995031" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-colors">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-slate-900 dark:bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-slate-900 mb-4">Explore Topics</h2>
            <p className="text-slate-400 dark:text-slate-600 max-w-2xl mx-auto">Discover content across AI tools, tech news, and opportunities</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Tech Updates', desc: 'Stay updated with the latest in tech', category: CATEGORIES.TECH_NEWS },
              { title: 'Tech Jobs', desc: 'Jobs, internships & scholarships', category: CATEGORIES.OPPORTUNITIES },
              { title: 'AI & Tools', desc: 'Discover the latest AI tools & trends', category: CATEGORIES.AI_TOOLS },
            ].map((cat, idx) => (
              <Link key={idx} to={`/blog?category=${encodeURIComponent(cat.category)}`}>
                <motion.div 
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-gradient-to-br ${getCategoryColor(cat.category)} p-6 rounded-2xl shadow-lg cursor-pointer h-full relative overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  <span className="text-4xl mb-4 block">{getCategoryIcon(cat.category)}</span>
                  <h3 className="text-xl font-bold mb-2 text-white">{cat.title}</h3>
                  <p className="text-white/80 text-sm">{cat.desc}</p>
                  <div className="mt-4 flex items-center text-white/90 text-sm font-medium">
                    Explore <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-slate-800 dark:bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white dark:text-slate-900">Latest Post</h2>
              <Link to="/blog" className="text-emerald-400 dark:text-emerald-600 hover:text-emerald-300 dark:hover:text-emerald-500 font-medium flex items-center">
                All Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900 dark:bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-700 dark:border-slate-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={featuredPost.coverImage || `https://picsum.photos/seed/${featuredPost._id}/800/600`} 
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-block bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 px-3 py-1 rounded-full text-xs font-medium mb-4 w-fit">
                    {featuredPost.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white dark:text-slate-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-slate-400 dark:text-slate-600 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <Link 
                    to={`/post/${featuredPost.slug}`}
                    className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-full transition-all w-fit"
                  >
                    Read Article
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      {latestPosts.length > 0 && (
        <section className="py-16 bg-slate-900 dark:bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white dark:text-slate-900">More Posts</h2>
              <Link to="/blog" className="text-emerald-400 dark:text-emerald-600 hover:text-emerald-300 dark:hover:text-emerald-500 font-medium flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            {loading ? (
              <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                <p className="mt-4">Loading posts...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestPosts.map((post: any) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}

            {posts.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="bg-slate-800 dark:bg-slate-100 rounded-2xl p-12 max-w-lg mx-auto">
                  <p className="text-slate-400 dark:text-slate-600 mb-6">No blog posts yet. Check back soon for amazing content!</p>
                  <Link to="/blog" className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-full transition-all">
                    Browse Blog <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-900 to-slate-900 dark:from-emerald-100 dark:to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-slate-900 mb-4">Stay Updated</h2>
            <p className="text-slate-300 dark:text-slate-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest tech news, AI tools, and opportunities delivered to your inbox.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Contact Us to Subscribe
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
