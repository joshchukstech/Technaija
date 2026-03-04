import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to backend
    toast.success('Message sent successfully! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-slate-900 dark:bg-white min-h-screen text-white dark:text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-16">Get In Touch</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-emerald-400 dark:text-emerald-600">Contact Information</h2>
            <p className="text-slate-400 dark:text-slate-600 mb-8">
              Have a project in mind or just want to say hi? Feel free to reach out to me. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-slate-300 dark:text-slate-600">
                <Mail className="h-6 w-6 text-emerald-500" />
                <span>hello@technaija.com</span>
              </div>
              <div className="flex items-center space-x-4 text-slate-300 dark:text-slate-600">
                <Phone className="h-6 w-6 text-emerald-500" />
                <span>+234 915 199 5031</span>
              </div>
              <div className="flex items-center space-x-4 text-slate-300 dark:text-slate-600">
                <MapPin className="h-6 w-6 text-emerald-500" />
                <span>Enugu, Nigeria</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 dark:bg-slate-100 p-8 rounded-xl border border-slate-700 dark:border-slate-200 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 dark:text-slate-600">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full bg-slate-700 dark:bg-slate-200 border border-slate-600 dark:border-slate-300 rounded-md shadow-sm py-2 px-3 text-white dark:text-slate-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 dark:text-slate-600">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full bg-slate-700 dark:bg-slate-200 border border-slate-600 dark:border-slate-300 rounded-md shadow-sm py-2 px-3 text-white dark:text-slate-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 dark:text-slate-600">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 block w-full bg-slate-700 dark:bg-slate-200 border border-slate-600 dark:border-slate-300 rounded-md shadow-sm py-2 px-3 text-white dark:text-slate-900 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 flex items-center justify-center"
              >
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
