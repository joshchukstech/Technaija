import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Upload } from 'lucide-react';
import { collection, addDoc, doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.ts';
import { useAuth } from '../context/AuthContext.tsx';

const CreateEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = !!id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [coverImage, setCoverImage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const fetchPost = async () => {
        if (!db) return;
        try {
          const docRef = doc(db, 'posts', id!);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const post = docSnap.data();
            setTitle(post.title || '');
            setContent(post.content || '');
            setExcerpt(post.excerpt || '');
            setCategory(post.category || 'Web Development');
            setCoverImage(post.coverImage || '');
          } else {
            toast.error('Post not found');
            navigate('/admin');
          }
        } catch (error) {
          console.error(error);
          toast.error('Failed to fetch post');
        }
      };
      fetchPost();
    }
  }, [id, isEdit, navigate]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'unsigned_preset');

    setUploading(true);
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) throw new Error('Cloudinary cloud name not configured in .env');
      
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setCoverImage(data.secure_url);
        toast.success('Image uploaded');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Image upload failed. Check your Cloudinary config.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
      toast.error('Firebase is not configured. Please check your .env file.');
      return;
    }
    try {
      const postData = { 
        title, 
        slug: title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        content, 
        excerpt, 
        category, 
        coverImage,
        updatedAt: serverTimestamp()
      };

      if (isEdit) {
        await updateDoc(doc(db, 'posts', id!), postData);
        toast.success('Post updated');
      } else {
        await addDoc(collection(db, 'posts'), {
          ...postData,
          createdAt: serverTimestamp(),
          authorName: user?.name || 'Admin'
        });
        toast.success('Post created');
      }
      navigate('/admin');
    } catch (error) {
      toast.error('Error saving post');
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700">
        <h1 className="text-3xl font-bold mb-8">{isEdit ? 'Edit Post' : 'Create New Post'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            >
              <option value="Web Development Tutorials">Web Development</option>
              <option value="Solar & Electrical Guides">Solar & Electrical</option>
              <option value="Tech Business in Nigeria">Tech Business</option>
              <option value="Tech News">Tech News</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">Cover Image</label>
            <div className="mt-1 flex items-center space-x-4">
              {user?.role === 'admin' && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-md border border-slate-600 flex items-center"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    {uploading ? 'Uploading...' : 'Upload Image'}
                  </label>
                </>
              )}
              {coverImage && (
                <img src={coverImage} alt="Preview" className="h-16 w-16 object-cover rounded-md" referrerPolicy="no-referrer" />
              )}
              {!coverImage && user?.role !== 'admin' && (
                <span className="text-slate-500 text-sm">Contact admin to add cover image</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">Excerpt</label>
            <textarea
              required
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">Content (Markdown supported)</label>
            <textarea
              required
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm font-mono"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              {isEdit ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditPost;
