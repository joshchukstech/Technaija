import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Trash2, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: any;
  parentId: string | null;
  likes: string[];
}

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    if (!db) {
      console.warn('Firestore not initialized');
      return;
    }
    
    const q = query(
      collection(db, 'comments'),
      where('postId', '==', postId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const commentsData: Comment[] = [];
        snapshot.forEach((doc) => {
          commentsData.push({ id: doc.id, ...doc.data() } as Comment);
        });
        setComments(commentsData);
      },
      (error) => {
        console.error('Error fetching comments:', error);
        if (error.code === 'failed-precondition') {
          console.warn('Firestore index required. Check Firebase Console for index creation link.');
        }
      }
    );

    return () => unsubscribe();
  }, [postId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to comment.');
      return;
    }
    if (!newComment.trim()) return;

    try {
      await addDoc(collection(db!, 'comments'), {
        postId,
        userId: user.uid,
              userName: user.name || 'Anonymous',
        content: newComment.trim(),
        createdAt: serverTimestamp(),
        parentId: null,
        likes: []
      });
      setNewComment('');
      toast.success('Comment added!');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment.');
    }
  };

  const handleAddReply = async (parentId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to reply.');
      return;
    }
    if (!replyContent.trim()) return;

    try {
      await addDoc(collection(db!, 'comments'), {
        postId,
        userId: user.uid,
              userName: user.name || 'Anonymous',
        content: replyContent.trim(),
        createdAt: serverTimestamp(),
        parentId,
        likes: []
      });
      setReplyContent('');
      setReplyingTo(null);
      toast.success('Reply added!');
    } catch (error) {
      console.error('Error adding reply:', error);
      toast.error('Failed to add reply.');
    }
  };

  const handleToggleLike = async (commentId: string, likes: string[]) => {
    if (!user) {
      toast.error('You must be logged in to like a comment.');
      return;
    }

    const commentRef = doc(db!, 'comments', commentId);
    const hasLiked = likes.includes(user.uid);

    try {
      if (hasLiked) {
        await updateDoc(commentRef, {
          likes: arrayRemove(user.uid)
        });
      } else {
        await updateDoc(commentRef, {
          likes: arrayUnion(user.uid)
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    try {
      await deleteDoc(doc(db!, 'comments', commentId));
      toast.success('Comment deleted.');
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment.');
    }
  };

  const rootComments = comments.filter(c => !c.parentId);
  const getReplies = (parentId: string) => comments.filter(c => c.parentId === parentId);

  return (
    <div className="mt-16 border-t border-slate-800 dark:border-slate-200 pt-10">
      <h3 className="text-2xl font-bold text-white dark:text-slate-900 mb-8 flex items-center">
        <MessageCircle className="w-6 h-6 mr-2 text-emerald-400 dark:text-emerald-600" />
        Comments ({comments.length})
      </h3>

      {user ? (
        <form onSubmit={handleAddComment} className="mb-10">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex-shrink-0 flex items-center justify-center text-white font-bold">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="What are your thoughts?"
                rows={3}
                className="w-full bg-slate-800 dark:bg-slate-100 border border-slate-700 dark:border-slate-200 rounded-xl p-4 text-white dark:text-slate-900 focus:outline-none focus:border-emerald-500 resize-none"
              />
              <div className="mt-2 flex justify-end">
                <button 
                  type="submit"
                  disabled={!newComment.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-slate-800 dark:bg-slate-100 rounded-xl p-6 text-center mb-10 border border-slate-700 dark:border-slate-200">
          <p className="text-slate-300 dark:text-slate-600 mb-4">Join the conversation!</p>
          <a href="/login" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Sign In to Comment
          </a>
        </div>
      )}

      <div className="space-y-6">
        {rootComments.length > 0 ? (
          rootComments.map(comment => {
            const hasLiked = user ? comment.likes?.includes(user.uid) : false;
            const isOwner = user?.uid === comment.userId || user?.role === 'admin';
            
            return (
              <div key={comment.id} className="flex flex-col space-y-2 mt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                      {comment.userName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-200 dark:text-slate-700">{comment.userName}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                        {comment.createdAt ? formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true }) : 'just now'}
                      </span>
                    </div>
                  </div>
                  {isOwner && (
                    <button onClick={() => handleDelete(comment.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <p className="text-slate-300 dark:text-slate-600 text-sm leading-relaxed">{comment.content}</p>
                
                <div className="flex items-center space-x-4 text-xs text-slate-400 dark:text-slate-500 mt-2">
                  <button 
                    onClick={() => handleToggleLike(comment.id, comment.likes || [])}
                    className={`flex items-center space-x-1 transition-colors ${hasLiked ? 'text-red-400' : 'hover:text-red-400'}`}
                  >
                    <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                    <span>{comment.likes?.length || 0}</span>
                  </button>
                  
                  <button 
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="flex items-center space-x-1 hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                </div>

                {replyingTo === comment.id && (
                  <form onSubmit={(e) => handleAddReply(comment.id, e)} className="mt-3 flex items-start space-x-2">
                    <input
                      type="text"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 bg-slate-800 dark:bg-slate-100 border border-slate-700 dark:border-slate-200 rounded-lg px-3 py-2 text-sm text-white dark:text-slate-900 focus:outline-none focus:border-emerald-500"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={!replyContent.trim()}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {/* Render Replies */}
                {getReplies(comment.id).map(reply => {
                  const replyHasLiked = user ? reply.likes?.includes(user.uid) : false;
                  const replyIsOwner = user?.uid === reply.userId || user?.role === 'admin';
                  
                  return (
                    <div key={reply.id} className="flex flex-col space-y-2 ml-8 mt-4 border-l-2 border-slate-700 dark:border-slate-200 pl-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                            {reply.userName?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-200 dark:text-slate-700 text-sm">{reply.userName}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                              {reply.createdAt ? formatDistanceToNow(reply.createdAt.toDate(), { addSuffix: true }) : 'just now'}
                            </span>
                          </div>
                        </div>
                        {replyIsOwner && (
                          <button onClick={() => handleDelete(reply.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-400 transition-colors">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      
                      <p className="text-slate-300 dark:text-slate-600 text-sm leading-relaxed">{reply.content}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-slate-400 dark:text-slate-500 mt-2">
                        <button 
                          onClick={() => handleToggleLike(reply.id, reply.likes || [])}
                          className={`flex items-center space-x-1 transition-colors ${replyHasLiked ? 'text-red-400' : 'hover:text-red-400'}`}
                        >
                          <Heart className={`w-4 h-4 ${replyHasLiked ? 'fill-current' : ''}`} />
                          <span>{reply.likes?.length || 0}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <p className="text-slate-500 dark:text-slate-400 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
