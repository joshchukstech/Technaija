import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, serverTimestamp, doc } from 'firebase/firestore';
import { db } from '../firebase.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { ThumbsUp, Heart, Smile } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Reaction {
  id: string;
  postId: string;
  userId: string;
  reactionType: string;
  createdAt: any;
}

interface ReactionBarProps {
  postId: string;
}

const REACTION_TYPES = [
  { type: 'like', icon: ThumbsUp, label: 'Like', color: 'text-blue-400' },
  { type: 'love', icon: Heart, label: 'Love', color: 'text-red-400' },
  { type: 'wow', icon: Smile, label: 'Wow', color: 'text-yellow-400' },
];

const ReactionBar: React.FC<ReactionBarProps> = ({ postId }) => {
  const { user } = useAuth();
  const [reactions, setReactions] = useState<Reaction[]>([]);

  useEffect(() => {
    if (!db) return;

    const q = query(collection(db, 'reactions'), where('postId', '==', postId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reactionsData: Reaction[] = [];
      snapshot.forEach((doc) => {
        reactionsData.push({ id: doc.id, ...doc.data() } as Reaction);
      });
      setReactions(reactionsData);
    });

    return () => unsubscribe();
  }, [postId]);

  const getUserReaction = (type: string) => {
    return user ? reactions.some(r => r.reactionType === type && r.userId === user.uid) : null;
  };

  const handleReaction = async (reactionType: string) => {
    if (!user) {
      toast.error('You must be logged in to react.');
      return;
    }

    try {
      const existingReaction = reactions.find(
        r => r.reactionType === reactionType && r.userId === user.uid
      );

      if (existingReaction) {
        await deleteDoc(doc(db!, 'reactions', existingReaction.id));
        toast.success('Reaction removed');
      } else {
        await addDoc(collection(db!, 'reactions'), {
          postId,
          userId: user.uid,
          reactionType,
          createdAt: serverTimestamp()
        });
        toast.success('Reaction added!');
      }
    } catch (error) {
      console.error('Error handling reaction:', error);
      toast.error('Failed to add reaction.');
    }
  };

  const getReactionCount = (type: string) => {
    return reactions.filter(r => r.reactionType === type).length;
  };

  return (
    <div className="flex items-center gap-3">
      {REACTION_TYPES.map(({ type, icon: Icon, label, color }) => {
        const isActive = getUserReaction(type);
        const count = getReactionCount(type);
        
        return (
          <button
            key={type}
            onClick={() => handleReaction(type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              isActive 
                ? 'bg-slate-800 dark:bg-slate-200 border-2 border-emerald-500' 
                : 'bg-slate-800/50 dark:bg-slate-100/50 border-2 border-transparent hover:bg-slate-800 dark:hover:bg-slate-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? color : 'text-slate-400 dark:text-slate-500'}`} />
            <span className={`text-sm font-medium ${isActive ? 'text-white dark:text-slate-900' : 'text-slate-400 dark:text-slate-500'}`}>
              {count > 0 ? count : label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ReactionBar;