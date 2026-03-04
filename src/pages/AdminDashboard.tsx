import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase.ts';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    if (!db) {
      setLoading(false);
      return;
    }
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
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

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!db) return;
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'posts', id));
        toast.success('Post deleted');
        fetchPosts();
      } catch (error) {
        toast.error('Error deleting post');
      }
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link
            to="/admin/create"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" /> Create New Post
          </Link>
        </div>

        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-slate-400">Loading...</td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-slate-400">No posts found. Create one!</td>
                </tr>
              ) : (
                posts.map((post: any) => (
                  <tr key={post._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{post.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{post.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/admin/edit/${post._id}`} className="text-emerald-400 hover:text-emerald-300 mr-4">
                        <Edit className="h-5 w-5 inline" />
                      </Link>
                      <button onClick={() => handleDelete(post._id)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-5 w-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
