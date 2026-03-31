import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, User, Tag, ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase.ts';
import Comments from '../components/Comments.tsx';
import ReactionBar from '../components/ReactionBar.tsx';
import ShareButton from '../components/ShareButton.tsx';
import { motion } from 'framer-motion';

const SingleBlog = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!db) {
        setLoading(false);
        return;
      }
      try {
        const q = query(collection(db, 'posts'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          setPost({
            _id: querySnapshot.docs[0].id,
            ...docData,
            createdAt: docData.createdAt?.toDate().toISOString() || new Date().toISOString()
          });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Tech9ja`;
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', post.excerpt || `${post.title} - Read more on Tech9ja`);
      
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', `${post.title} | Tech9ja`);
      
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', post.excerpt || `${post.title} - Read more on Tech9ja`);
      
      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (!twitterTitle) {
        twitterTitle = document.createElement('meta');
        twitterTitle.setAttribute('name', 'twitter:title');
        document.head.appendChild(twitterTitle);
      }
      twitterTitle.setAttribute('content', `${post.title} | Tech9ja`);
      
      let twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (!twitterDesc) {
        twitterDesc = document.createElement('meta');
        twitterDesc.setAttribute('name', 'twitter:description');
        document.head.appendChild(twitterDesc);
      }
      twitterDesc.setAttribute('content', post.excerpt || `${post.title} - Read more on Tech9ja`);
    }
    return () => {
      document.title = 'Tech9ja | Tech News, AI Tools & Opportunities in Nigeria';
    };
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-slate-400 dark:text-slate-500">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex justify-center items-center">
        <div className="text-center bg-slate-800 dark:bg-slate-100 rounded-2xl p-12 max-w-lg mx-4">
          <BookOpen className="h-16 w-16 text-slate-500 dark:text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <p className="text-slate-400 dark:text-slate-600 mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blog" className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-6 rounded-full transition-colors">
            Browse All Articles
          </Link>
        </div>
      </div>
    );
  }

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };
  
  const contentWords = stripHtml(post.content || '').split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(contentWords / 200));

  return (
    <div className="bg-slate-900 dark:bg-white min-h-screen text-white dark:text-slate-900">
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img 
          src={post.coverImage || `https://picsum.photos/seed/${post._id}/1200/600`} 
          alt={post.title} 
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/blog" className="inline-flex items-center text-emerald-400 dark:text-emerald-600 hover:text-emerald-300 dark:hover:text-emerald-500 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
          </Link>
          
          <article className="bg-slate-800 dark:bg-white rounded-2xl shadow-2xl p-6 md:p-10 border border-slate-700 dark:border-slate-200">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 px-4 py-1.5 rounded-full text-sm font-medium">
                <Tag className="h-4 w-4 mr-2" />
                {post.category}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white dark:text-slate-900 leading-tight">
              {post.title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-400 dark:text-slate-600 pb-6 border-b border-slate-700 dark:border-slate-200 mb-8">
              <div className="flex items-center">
                <div className="bg-slate-700 dark:bg-slate-200 p-2 rounded-full mr-3">
                  <User className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />
                </div>
                <span className="font-medium">{post.authorName || post.author?.name || 'Admin'}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {post.createdAt ? format(new Date(post.createdAt), 'MMMM d, yyyy') : 'Unknown Date'}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {readingTime} min read
              </div>
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <div className="bg-slate-700/50 dark:bg-slate-100 rounded-xl p-6 mb-8 border-l-4 border-emerald-500">
                <p className="text-lg text-slate-300 dark:text-slate-700 italic">
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* Content */}
            <div 
              className="prose prose-invert dark:prose-lg max-w-none text-slate-300 dark:text-slate-700 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-4 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_a]:text-emerald-400 [&_a]:hover:underline [&_strong]:font-bold [&_em]:italic"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />

            {/* Reactions and Share */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 mt-8 border-t border-b border-slate-700 dark:border-slate-200">
              <ReactionBar postId={post._id} />
              <ShareButton title={post.title} />
            </div>
          </article>

          {/* Comments Section */}
          <div className="mt-8">
            <Comments postId={post._id} />
          </div>

          {/* Related Actions */}
          <div className="mt-8 mb-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              to="/blog" 
              className="flex items-center justify-center bg-slate-800 dark:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-200 rounded-xl p-4 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2 text-emerald-400 dark:text-emerald-600" />
              <span className="font-medium text-white dark:text-slate-900">Back to All Posts</span>
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 rounded-xl p-4 transition-colors"
            >
              <span className="font-medium text-white">Contact Me</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SingleBlog;
