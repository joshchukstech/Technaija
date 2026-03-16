import React from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Briefcase } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-slate-900 dark:bg-white min-h-screen text-white dark:text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-slate-400 dark:text-slate-600">
            Bridging the gap between technology, energy, and business in Nigeria.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src="/profile.jpg" 
              alt="Profile" 
              className="rounded-2xl shadow-2xl w-full object-cover aspect-[3/4]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-emerald-400 dark:text-emerald-600">Who I Am</h2>
            <p className="text-slate-300 dark:text-slate-600 mb-6 leading-relaxed">
              I am a Nigerian tech entrepreneur and electrical engineer with a passion for solving real-world problems. With over a decade of experience in software development and renewable energy systems, I help businesses and individuals leverage technology for growth.
            </p>
            <p className="text-slate-300 dark:text-slate-600 leading-relaxed">
              My mission is to empower the next generation of Nigerian tech leaders and provide sustainable energy solutions to power our digital future.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Code, title: 'Web Development', desc: 'Building scalable, modern web applications using the MERN stack.' },
            { icon: Zap, title: 'Solar Energy', desc: 'Designing and installing efficient solar power systems for homes and offices.' },
            { icon: Briefcase, title: 'Tech Business', desc: 'Consulting on digital transformation and tech startup strategy.' },
          ].map((skill, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-slate-800 dark:bg-slate-100 p-8 rounded-xl border border-slate-700 dark:border-slate-200 shadow-lg"
            >
              <skill.icon className="h-12 w-12 text-emerald-400 dark:text-emerald-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">{skill.title}</h3>
              <p className="text-slate-400 dark:text-slate-500">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
