import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="bg-slate-900 dark:bg-white min-h-screen text-white dark:text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-emerald-400 dark:text-emerald-600 hover:text-emerald-300 dark:hover:text-emerald-500 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-slate-400 dark:text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <div className="prose prose-invert dark:prose prose-slate max-w-none space-y-8">
          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">1. Agreement to Terms</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed">
              By accessing and using Tech9ja, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this website.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">2. Use License</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed mb-4">
              Permission is granted to temporarily access the materials on Tech9ja for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:
            </p>
            <ul className="list-disc list-inside text-slate-300 dark:text-slate-700 space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">3. Disclaimer</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed mb-4">
              The materials on Tech9ja are provided on an 'as is' basis. Tech9ja makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed">
              Further, Tech9ja does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">4. Limitations</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed">
              In no event shall Tech9ja or its authors be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Tech9ja, even if we have been notified of the possibility of such damage.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">5. Accuracy of Materials</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed">
              The materials appearing on Tech9ja could include technical, typographical, or photographic errors. Tech9ja does not warrant that any of the materials on its website are accurate, complete, or current. Tech9ja may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">6. Links</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed">
              Tech9ja has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Tech9ja of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">7. Modifications</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed">
              Tech9ja may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">8. Governing Law</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of Nigeria, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">9. User Conduct</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed mb-4">
              By using Tech9ja, you agree to:
            </p>
            <ul className="list-disc list-inside text-slate-300 dark:text-slate-700 space-y-2 ml-4">
              <li>Not use the website for any unlawful purpose</li>
              <li>Not violate any laws in your jurisdiction</li>
              <li>Not interfere with or disrupt the website</li>
              <li>Not attempt to gain unauthorized access to any part of the website</li>
              <li>Not transmit any viruses, worms, or other malicious code</li>
              <li>Not collect or track personal information of other users</li>
            </ul>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">10. Comments and Feedback</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed">
              By posting comments or providing feedback on Tech9ja, you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, and distribute such content in any form.
            </p>
          </section>

          <section className="bg-slate-800 dark:bg-slate-100 p-8 rounded-2xl border border-slate-700 dark:border-slate-200">
            <h2 className="text-2xl font-bold text-emerald-400 dark:text-emerald-600 mb-4">11. Contact Information</h2>
            <p className="text-slate-300 dark:text-slate-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-none text-slate-300 dark:text-slate-700 space-y-2 mt-4">
              <li><strong>Email:</strong> <a href="mailto:chukwuemekajoshua32@gmail.com" className="text-emerald-400 hover:text-emerald-300">chukwuemekajoshua32@gmail.com</a></li>
              <li><strong>WhatsApp:</strong> <a href="https://wa.me/2349151995031" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">+234 915 199 5031</a></li>
              <li><strong>Location:</strong> Enugu, Nigeria</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
