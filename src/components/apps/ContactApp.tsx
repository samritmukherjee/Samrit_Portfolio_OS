'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Pin } from 'lucide-react';
import { SOCIALS } from '@/constants';

interface SocialLink {
  name: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  link: string;
  color: string;
}

const socialLinks: SocialLink[] = [
  { name: 'GitHub', icon: Github, link: SOCIALS.github, color: 'hover:text-white hover:bg-zinc-800' },
  { name: 'LinkedIn', icon: Linkedin, link: SOCIALS.linkedin, color: 'hover:text-blue-400 hover:bg-blue-400/10' },
  { name: 'Email', icon: Mail, link: SOCIALS.email, color: 'hover:text-red-400 hover:bg-red-400/10' },
];

export default function ContactApp() {
  return (
    <div className="p-6 md:p-12 h-full flex flex-col items-center justify-center text-white max-w-4xl mx-auto space-y-12 overflow-y-auto scrollbar-hide">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">Let&apos;s Connect</h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">Open for collaborations, interesting projects, and internship opportunities. Reach out through any of these channels.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mx-auto justify-center">
        {socialLinks.map((social, idx) => (
          <motion.a
            key={social.name}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`flex flex-col items-center justify-center gap-4 p-8 bg-white/[0.03] border border-white/[0.05] rounded-3xl transition-all duration-300 ${social.color} group shadow-2xl text-center`}
          >
            <div className="flex items-center justify-center p-4 rounded-2xl bg-white/5 group-hover:bg-transparent group-hover:scale-110 transition-all">
              <social.icon size={32} />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">{social.name}</span>
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-2xl p-8 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-3xl border border-white/[0.05] backdrop-blur-3xl ring-1 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <div className="text-center space-y-2">
          <p className="text-lg font-bold text-blue-400 flex items-center justify-center gap-2">
            <Pin size={18} className="shrink-0" />
            Currently Open for Internship Offers
          </p>
          <p className="text-white/50 text-sm">Excited to work on innovative projects and grow my skills with industry professionals.</p>
        </div>
      </motion.div>
    </div>
  );
}
