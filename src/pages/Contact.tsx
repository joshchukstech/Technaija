import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message sent successfully! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="bg-slate-900 dark:bg-white min-h-screen text-white dark:text-slate-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get In <span className="text-emerald-400 dark:text-emerald-600">Touch</span>
            </h1>
            <p className="text-xl text-slate-300 dark:text-slate-600 max-w-2xl mx-auto">
              Have a question, project idea, or just want to say hello? I'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white dark:text-slate-900">Let's Connect</h2>
                <p className="text-slate-400 dark:text-slate-600 mb-8 leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of these channels.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'chukwuemekajoshua32@gmail.com', href: 'mailto:chukwuemekajoshua32@gmail.com', color: 'bg-blue-500' },
                  { icon: Phone, label: 'Phone', value: '+234 915 199 5031', href: 'tel:+2349151995031', color: 'bg-emerald-500' },
                  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat on WhatsApp', href: 'https://wa.me/2349151995031', color: 'bg-green-500' },
                  { icon: MapPin, label: 'Location', value: 'Enugu, Nigeria', href: null, color: 'bg-purple-500' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className={`${item.color} p-3 rounded-xl`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 dark:text-slate-600 mb-1">{item.label}</p>
                      {item.href ? (
                        <a 
                          href={item.href} 
                          target={item.href.startsWith('http') ? '_blank' : undefined} 
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-white dark:text-slate-900 font-medium hover:text-emerald-400 dark:hover:text-emerald-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white dark:text-slate-900 font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800 dark:bg-slate-100 rounded-xl p-6 border border-slate-700 dark:border-slate-200">
                <div className="flex items-center mb-3">
                  <Clock className="h-5 w-5 text-emerald-400 dark:text-emerald-600 mr-2" />
                  <span className="font-semibold text-white dark:text-slate-900">Response Time</span>
                </div>
                <p className="text-slate-400 dark:text-slate-600 text-sm">
                  I typically respond within 24-48 hours. For urgent matters, WhatsApp is the fastest way to reach me.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-slate-800 dark:bg-slate-100 rounded-2xl p-6 md:p-8 border border-slate-700 dark:border-slate-200 shadow-2xl">
                <h3 className="text-xl font-bold mb-6 text-white dark:text-slate-900">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 dark:text-slate-700 mb-2">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-slate-700 dark:bg-white border border-slate-600 dark:border-slate-300 rounded-xl py-3 px-4 text-white dark:text-slate-900 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 dark:text-slate-700 mb-2">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-slate-700 dark:bg-white border border-slate-600 dark:border-slate-300 rounded-xl py-3 px-4 text-white dark:text-slate-900 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 dark:text-slate-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="What's this about?"
                      className="w-full bg-slate-700 dark:bg-white border border-slate-600 dark:border-slate-300 rounded-xl py-3 px-4 text-white dark:text-slate-900 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 dark:text-slate-700 mb-2">Message *</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project or question..."
                      className="w-full bg-slate-700 dark:bg-white border border-slate-600 dark:border-slate-300 rounded-xl py-3 px-4 text-white dark:text-slate-900 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Quick Response Promise */}
              <div className="mt-6 flex items-center justify-center text-sm text-slate-400 dark:text-slate-600">
                <CheckCircle className="h-4 w-4 mr-2 text-emerald-400 dark:text-emerald-600" />
                I typically respond within 24-48 hours
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
