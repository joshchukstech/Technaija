import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, User, Tag, ArrowLeft, Share2, Copy, Check } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase.ts';
import Comments from '../components/Comments.tsx';
import ReactionBar from '../components/ReactionBar.tsx';
import ShareButton from '../components/ShareButton.tsx';

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

  if (loading) {
    return <div className="min-h-screen bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex justify-center items-center">Loading...</div>;
  }

  if (!post) {
    return <div className="min-h-screen bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex justify-center items-center">Post not found</div>;
  }

  return (
    <div className="bg-slate-900 dark:bg-white min-h-screen text-white dark:text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center text-emerald-400 dark:text-emerald-600 hover:text-emerald-300 dark:hover:text-emerald-500 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white dark:text-slate-900">{post.title}</h1>
        
        <div className="flex flex-wrap items-center text-sm text-slate-400 dark:text-slate-500 mb-8 space-x-4">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            {post.authorName || post.author?.name || 'Admin'}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {post.createdAt ? format(new Date(post.createdAt), 'MMMM d, yyyy') : 'Unknown Date'}
          </div>
          <div className="flex items-center text-emerald-400 dark:text-emerald-600">
            <Tag className="h-4 w-4 mr-1" />
            {post.category}
          </div>
        </div>

        <img 
          src={post.coverImage || 'https://picsum.photos/seed/tech/1200/600'} 
          alt={post.title} 
          className="w-full h-96 object-cover rounded-2xl mb-12 shadow-2xl"
          referrerPolicy="no-referrer"
        />

        <div className="prose prose-invert prose-lg dark:prose-invert:dark max-w-none mb-16 text-slate-300 dark:text-slate-700">
          {/* In a real app, use a Markdown renderer here */}
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 border-y border-slate-800 dark:border-slate-200 mb-12">
          <ReactionBar postId={post._id} />
          <ShareButton title={post.title} />
        </div>

        <Comments postId={post._id} />
      </div>
    </div>
  );
};

export default SingleBlog;
