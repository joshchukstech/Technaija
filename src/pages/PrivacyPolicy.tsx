import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="bg-slate-900 dark:bg-white min-h-screen text-white dark:text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-slate-400 dark:text-slate-600">Last updated: March 25, 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert dark:prose prose-slate max-w-none space-y-8"
        >
          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">Introduction</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed">
              At Tech9ja, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. By using our site, you consent to the practices described in this policy.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">Information We Collect</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed mb-4">
              We collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-slate-300 dark:text-slate-700 space-y-2 ml-4">
              <li>Leave comments on blog posts</li>
              <li>Fill out our contact form</li>
              <li>Subscribe to our newsletter</li>
              <li>Create an account</li>
            </ul>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed mt-4">
              This information may include your name, email address, and any other details you choose to share.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">How We Use Your Information</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-slate-300 dark:text-slate-700 space-y-2 ml-4">
              <li>Send you newsletters and updates (with your consent)</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Display your comments on our blog posts</li>
              <li>Analyze website usage to improve our content</li>
              <li>Display relevant advertisements through Google AdSense</li>
            </ul>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">Cookies and Advertising</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-slate-300 dark:text-slate-700 space-y-2 ml-4">
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our website</li>
              <li>Display personalized advertisements through Google AdSense</li>
            </ul>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed mt-4">
              Google AdSense uses cookies to serve ads based on your prior visits to our site and other websites. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">Google's Ads Settings</a>.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">Third-Party Services</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed mb-4">
              We may use third-party services that collect and process data, including:
            </p>
            <ul className="list-disc list-inside text-slate-300 dark:text-slate-700 space-y-2 ml-4">
              <li><strong>Firebase</strong> - For authentication and database</li>
              <li><strong>Cloudinary</strong> - For image storage and delivery</li>
              <li><strong>Google AdSense</strong> - For displaying advertisements</li>
              <li><strong>Google Analytics</strong> - For website analytics</li>
            </ul>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed mt-4">
              These services have their own privacy policies governing their use of your information.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">Data Security</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">Your Rights</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc list-inside text-slate-300 dark:text-slate-700 space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your personal information</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed mt-4">
              To exercise these rights, please contact us at <a href="mailto:chukwuemekajoshua32@gmail.com" className="text-emerald-400 hover:text-emerald-300">chukwuemekajoshua32@gmail.com</a>.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">Children's Privacy</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed">
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">Changes to This Policy</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically for any changes.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">Contact Us</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none text-slate-300 dark:text-slate-700 space-y-2 mt-4">
              <li><strong>Email:</strong> <a href="mailto:chukwuemekajoshua32@gmail.com" className="text-emerald-400 hover:text-emerald-300">chukwuemekajoshua32@gmail.com</a></li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/2349151995031" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">+234 915 199 5031</a></li>
              <li><strong>Location:</strong> Enugu, Nigeria</li>
            </ul>
          </section>
        </motion.div>
      </article>
    </div>
  );
};

export default PrivacyPolicy;
