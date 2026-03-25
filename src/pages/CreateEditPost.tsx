import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Upload, Bold, Italic, Underline, Link as LinkIcon, List, ListOrdered, Heading1, Heading2, AlignLeft, AlignCenter, AlignRight, Undo, Redo, RemoveFormatting } from 'lucide-react';
import { collection, addDoc, doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { CATEGORIES, isValidCategory } from '../constants/categories.ts';

const CreateEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = !!id;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState(CATEGORIES.TECH_UPDATES);
  const [coverImage, setCoverImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

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
            const postCategory = post.category || CATEGORIES.TECH_UPDATES;
            setCategory(isValidCategory(postCategory) ? postCategory : CATEGORIES.TECH_UPDATES);
            setCoverImage(post.coverImage || '');
            if (editorRef.current && post.content) {
              editorRef.current.innerHTML = post.content;
            }
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

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  }, []);

  const handleLink = useCallback(() => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  }, [execCommand]);

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

  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const editorContent = editorRef.current?.innerHTML || '';
    if (!editorContent || editorContent === '<br>' || editorContent === '<p><br></p>') {
      toast.error('Please add some content to your post');
      return;
    }
    
    if (!db) {
      toast.error('Firebase is not configured. Please check your .env file.');
      return;
    }
    try {
      const postData = { 
        title, 
        slug: title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        content: editorContent, 
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

  const ToolbarButton = ({ icon: Icon, command, value, onClick, title }: { 
    icon: React.ComponentType<{ className?: string }>; 
    command?: string; 
    value?: string;
    onClick?: () => void;
    title: string;
  }) => (
    <button
      type="button"
      onClick={() => {
        if (onClick) onClick();
        else if (command) execCommand(command, value);
      }}
      title={title}
      className="p-2 hover:bg-slate-600 rounded transition-colors"
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="bg-slate-900 min-h-screen text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{isEdit ? 'Edit Post' : 'Create New Post'}</h1>
          <button
            onClick={() => navigate('/admin')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter post title..."
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={CATEGORIES.TECH_UPDATES}>{CATEGORIES.TECH_UPDATES}</option>
              <option value={CATEGORIES.RENEWABLE_ENERGY}>{CATEGORIES.RENEWABLE_ENERGY}</option>
            </select>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Cover Image</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-lg border border-slate-700 flex items-center transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload Image'}
              </label>
              {coverImage && (
                <img src={coverImage} alt="Cover" className="h-16 w-16 object-cover rounded-lg" referrerPolicy="no-referrer" />
              )}
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt</label>
            <textarea
              required
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Write a short summary..."
            />
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Content</label>
            <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-700 bg-slate-800">
                <ToolbarButton icon={Undo} command="undo" title="Undo" />
                <ToolbarButton icon={Redo} command="redo" title="Redo" />
                <div className="w-px h-6 bg-slate-600 mx-1" />
                <ToolbarButton icon={Heading1} command="formatBlock" value="h1" title="Heading 1" />
                <ToolbarButton icon={Heading2} command="formatBlock" value="h2" title="Heading 2" />
                <div className="w-px h-6 bg-slate-600 mx-1" />
                <ToolbarButton icon={Bold} command="bold" title="Bold" />
                <ToolbarButton icon={Italic} command="italic" title="Italic" />
                <ToolbarButton icon={Underline} command="underline" title="Underline" />
                <ToolbarButton icon={RemoveFormatting} command="removeFormat" title="Remove Formatting" />
                <div className="w-px h-6 bg-slate-600 mx-1" />
                <ToolbarButton icon={List} command="insertUnorderedList" title="Bullet List" />
                <ToolbarButton icon={ListOrdered} command="insertOrderedList" title="Numbered List" />
                <div className="w-px h-6 bg-slate-600 mx-1" />
                <ToolbarButton icon={AlignLeft} command="justifyLeft" title="Align Left" />
                <ToolbarButton icon={AlignCenter} command="justifyCenter" title="Align Center" />
                <ToolbarButton icon={AlignRight} command="justifyRight" title="Align Right" />
                <div className="w-px h-6 bg-slate-600 mx-1" />
                <ToolbarButton icon={LinkIcon} onClick={handleLink} title="Insert Link" />
              </div>
              
              {/* Editor */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleContentChange}
                className="min-h-[300px] p-4 focus:outline-none text-white prose prose-invert max-w-none"
                style={{ minHeight: '300px' }}
                data-placeholder="Write your post content here..."
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">Use the toolbar above to format your content</p>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              {isEdit ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #64748b;
        }
        [contenteditable] h1 { font-size: 2rem; font-weight: bold; margin: 1rem 0; }
        [contenteditable] h2 { font-size: 1.5rem; font-weight: bold; margin: 0.75rem 0; }
        [contenteditable] p { margin: 0.5rem 0; }
        [contenteditable] ul, [contenteditable] ol { margin: 0.5rem 0; padding-left: 1.5rem; }
        [contenteditable] li { margin: 0.25rem 0; }
        [contenteditable] a { color: #10b981; text-decoration: underline; }
      `}</style>
    </div>
  );
};

export default CreateEditPost;
