'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BarChart3, Briefcase, Medal, Trophy } from 'lucide-react';

export default function AboutApp() {
  const stats = [
    { label: 'Hackathons Participated', value: '7' },
    { label: 'Hackathons Won', value: '3' },
  ];

  const accomplishments = [
    { title: 'Winner', icon: Medal, event: 'DoubleSlash 4.0', org: 'Jadavpur University', year: '2026' },
    { title: 'Winner', icon: Medal, event: 'ShowcaseX Techsprint', org: 'RCC IIT', year: '2026' },
    { title: 'Track Winner', icon: Trophy, event: 'Hello World Hacks', org: 'RCC IIT', year: '2025' },
  ];

  return (
    <div className="p-8 md:p-14 text-white max-w-5xl mx-auto space-y-16">
      {/* Hero Section - Asymmetric Layout */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-center md:items-start">
        <motion.div 
          initial={{ rotate: -3, scale: 0.9, opacity: 0 }}
          animate={{ rotate: -2, scale: 1, opacity: 1 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          className="relative group shrink-0"
        >
          <div className="absolute -inset-2 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-700" />
          <div className="relative w-44 h-44 md:w-60 md:h-60 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a]">
            <Image
              src="/wallpapers/my image.jpeg"
              alt="Samrit Mukherjee"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 176px, 240px"
            />
            {/* Organic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
        </motion.div>

        <div className="flex-1 text-center md:text-left pt-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent italic"
          >
            Samrit Mukherjee
          </motion.h1>
          <motion.p 
             initial={{ y: 10, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.1 }}
             className="text-xl md:text-2xl text-blue-400/90 font-medium tracking-tight mb-8"
          >
            Full-Stack Developer & AI Enthusiast
          </motion.p>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 leading-[1.8] text-lg max-w-2xl font-light"
          >
            Focused on building <span className="text-white/90 font-medium">high-performance</span> web applications. My passion lies in blending <span className="text-blue-400 italic">futuristic design</span> with robust engineering to solve real-world problems.
          </motion.p>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-blue-400/80 font-medium mt-6 flex items-center gap-2"
          >
            <Briefcase size={18} className="shrink-0" />
            Open for internship opportunities
          </motion.p>
        </div>
      </div>

      {/* Structured Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Stats - Left Col (4/12) */}
        <div className="md:col-span-5 space-y-8">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white/30 mb-6 flex items-center gap-4">
                <span className="h-px bg-white/10 flex-1" /> Metrics
            </h2>
            <div className="grid grid-cols-1 gap-5">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        whileHover={{ translateX: 8, backgroundColor: 'rgba(255,255,255,0.05)' }}
                        className="p-6 bg-white/[0.03] rounded-3xl border border-white/5 flex items-center justify-between group transition-colors"
                    >
                        <div className="space-y-1">
                            <p className="text-[11px] font-black uppercase tracking-widest text-white/40">{stat.label}</p>
                            <p className="text-4xl font-black tracking-tighter text-white group-hover:text-blue-400 transition-colors">{stat.value}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.02] text-white/20 group-hover:scale-110 transition-transform">
                          <BarChart3 size={28} strokeWidth={1.5} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Achievements - Right Col (7/12) */}
        <div className="md:col-span-7 space-y-8">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white/30 mb-6 flex items-center gap-4">
                Track Record <span className="h-px bg-white/10 flex-1" />
            </h2>
            <div className="space-y-4">
                {accomplishments.map((item, i) => (
                    <motion.div
                        key={item.event}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="relative p-6 bg-white/[0.02] rounded-3xl border border-white/[0.03] flex items-center gap-6 group hover:border-white/10 transition-all"
                    >
                        <div className="text-amber-400 group-hover:scale-125 transition-transform duration-500">
                          <item.icon size={28} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-white/90 group-hover:text-white transition-colors">
                                    {item.title} — {item.event}
                                </h3>
                                <span className="text-[10px] font-black text-white/20 tracking-widest">{item.year}</span>
                            </div>
                            <p className="text-sm text-white/40">{item.org}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>

      {/* Skills Micro-grid */}
      <div className="pt-12">
          <div className="flex flex-wrap gap-3">
            {['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'AI APIs', 'PostgreSQL'].map((skill, idx) => (
                <motion.span
                    key={skill}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + idx * 0.05 }}
                    className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white/60 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 transition-all cursor-default"
                >
                    {skill}
                </motion.span>
            ))}
          </div>
      </div>
    </div>
  );
}
