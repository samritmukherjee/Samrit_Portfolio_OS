'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Cosmic Canvas',
    description: 'AI-powered design platform that generates fully editable layered visuals. Bridging the gap between AI creativity and human customization.',
    link: 'https://cosmic-canvas-delta.vercel.app/',
    tags: ['AI', 'Canvas API', 'Next.js', 'Framer Motion'],
    image: '/wallpapers/Cosmic canvas logo.png',
  },
  {
    id: 2,
    title: 'Sukalya AI',
    description: 'AI-based solution designed to deliver intelligent and user-focused functionality. Focus on usability, automation, and smart interaction.',
    link: 'https://sukalya-ai.vercel.app/',
    tags: ['AI', 'Automation', 'FullStack', 'TypeScript'],
    image: '/wallpapers/sukalya.jpeg',
  }
];

export default function ProjectsApp() {
  return (
    <div className="p-4 md:p-8 text-white space-y-4 max-w-5xl mx-auto w-full overflow-x-hidden">
      {projects.map((project, idx) => (
        <motion.a
           key={project.id}
           href={project.link}
           target="_blank"
           rel="noopener noreferrer"
           initial={{ x: -20, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ 
             duration: 0.4, 
             delay: idx * 0.1,
             ease: [0.16, 1, 0.3, 1]
           }}
           className="group relative block w-full"
        >
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 p-4 md:p-6 bg-gradient-to-r from-white/[0.03] to-transparent rounded-xl border border-white/[0.08] hover:border-blue-500/40 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-transparent transition-all duration-300 cursor-pointer">
              {/* Logo/Image */}
              <div className="relative flex-shrink-0 rounded-lg bg-white/5 group-hover:bg-blue-500/20 transition-all duration-300 w-16 h-16 md:w-20 md:h-20 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover p-3"
                  sizes="80px"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-black text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed line-clamp-2 font-medium group-hover:text-white/70 transition-colors">
                  {project.description}
                </p>
              </div>
              
              {/* Tags & Link */}
              <div className="flex-shrink-0 flex flex-col items-center md:items-end gap-2 md:gap-3">
                <div className="flex gap-2 flex-wrap justify-center md:justify-end">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-blue-400/80 font-black uppercase tracking-widest bg-blue-900/20 px-2.5 py-1 rounded-full border border-blue-500/20 group-hover:border-blue-500/40 transition-all">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-blue-400 group-hover:text-cyan-300 transition-colors">
                  <span className="text-[11px] font-bold uppercase tracking-widest">Open →</span>
                </div>
              </div>
            </div>
        </motion.a>
      ))}
    </div>
  );
}
