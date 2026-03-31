import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Zap, Briefcase, Award, Users, Globe, ArrowRight, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-slate-900 dark:bg-white min-h-screen text-white dark:text-slate-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-emerald-400 dark:text-emerald-600">TechNaija</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 dark:text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Bridging the gap in Nigeria's tech ecosystem through quality content covering tech news, AI tools, and opportunities for aspiring tech professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-yellow-500 rounded-2xl blur-xl opacity-20"></div>
                <img 
                  src="/profile.jpg" 
                  alt="Joshua Ezugwu - TechNaija Founder" 
                  className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/5]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                About the Author
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white dark:text-slate-900">
                Hi, I'm Joshua Ezugwu
              </h2>
              <div className="space-y-4 text-slate-300 dark:text-slate-700 leading-relaxed">
                <p>
                  I'm a Nigerian tech entrepreneur and full-stack developer with over a decade of experience in software development, AI integration, and tech community building.
                </p>
                <p>
                  My passion lies in helping others break into tech and stay ahead of the curve. I focus on making complex tech topics accessible and highlighting opportunities in Nigeria's growing tech ecosystem.
                </p>
                <p>
                  Through Tech9ja, I share the latest tech news, AI tools, and opportunities to empower the next generation of Nigerian tech professionals.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-400 dark:text-emerald-600 mr-3" />
                  <span className="text-sm font-medium text-slate-300 dark:text-slate-700">GMNSE Certified</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-400 dark:text-emerald-600 mr-3" />
                  <span className="text-sm font-medium text-slate-300 dark:text-slate-700">10+ Years Experience</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-400 dark:text-emerald-600 mr-3" />
                  <span className="text-sm font-medium text-slate-300 dark:text-slate-700">Full-Stack Developer</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-emerald-400 dark:text-emerald-600 mr-3" />
                  <span className="text-sm font-medium text-slate-300 dark:text-slate-700">Tech Community Lead</span>
                </div>
              </div>

              <div className="mt-8">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg shadow-emerald-500/30"
                >
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {[
              { icon: Code, number: '50+', label: 'Blog Posts' },
              { icon: Users, number: '1000+', label: 'Readers' },
              { icon: Globe, number: 'Nigeria', label: 'Coverage' },
              { icon: Award, number: 'GMNSE', label: 'Certified' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-800 dark:bg-slate-100 rounded-xl p-6 text-center border border-slate-700 dark:border-slate-200">
                <stat.icon className="h-8 w-8 text-emerald-400 dark:text-emerald-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-white dark:text-slate-900 mb-1">{stat.number}</p>
                <p className="text-sm text-slate-400 dark:text-slate-600">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Services/Skills */}
          <div className="mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-slate-900 mb-4">What I Do</h2>
              <p className="text-slate-400 dark:text-slate-600 max-w-2xl mx-auto">
                Combining technical expertise with practical experience to deliver solutions that matter
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Code, 
                  title: 'Tech News', 
                  desc: 'Stay updated with the latest developments in technology, from AI breakthroughs to new tools and platforms reshaping the industry.',
                  color: 'from-blue-600 to-cyan-500'
                },
                { 
                  icon: Briefcase, 
                  title: 'Opportunities', 
                  desc: 'Discover tech jobs, internships, and scholarships in Nigeria. Helping you take the first step in your tech career.',
                  color: 'from-green-600 to-emerald-500'
                },
                { 
                  icon: Zap, 
                  title: 'AI & Tools', 
                  desc: 'Explore cutting-edge AI tools and technologies. Learn how to leverage AI for productivity and innovation.',
                  color: 'from-purple-600 to-pink-500'
                },
              ].map((skill, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`bg-gradient-to-br ${skill.color} p-8 rounded-2xl shadow-lg h-full`}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 inline-block mb-6">
                    <skill.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{skill.title}</h3>
                  <p className="text-white/90 leading-relaxed">{skill.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mission Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-emerald-900 to-slate-900 dark:from-emerald-100 dark:to-white rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white dark:text-slate-900 mb-6">My Mission</h2>
            <p className="text-lg md:text-xl text-slate-300 dark:text-slate-700 max-w-3xl mx-auto leading-relaxed">
              To empower the next generation of Nigerian tech professionals through quality content, practical insights, and by highlighting opportunities in AI, tech news, and career development.
            </p>
            <div className="mt-8">
              <Link 
                to="/blog" 
                className="inline-flex items-center bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                Explore My Blog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
