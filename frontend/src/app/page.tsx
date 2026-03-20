'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Play, ArrowRight, ShieldCheck, Cpu, Briefcase, Sparkles, Smile, Target, TrendingUp } from 'lucide-react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 overflow-x-hidden">
      <div className="hero-glow opacity-30" />
      
      {/* Humanistic Floating Navbar */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[800px] z-50 transition-all duration-500 rounded-3xl border ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-2xl shadow-rose-200/20 py-3 scale-100' : 'bg-transparent border-transparent py-5 scale-105'}`}>
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
               <ShieldCheck className="text-indigo-600 w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter">PoSA</span>
          </div>
          
          <div className="hidden lg:flex gap-10 text-sm font-bold text-zinc-500">
             <Link href="#features" className="hover:text-indigo-600 transition-colors">How it works</Link>
             <Link href="#solutions" className="hover:text-indigo-600 transition-colors">For Talent</Link>
             <Link href="#recruiter" className="hover:text-indigo-600 transition-colors">For Teams</Link>
          </div>

          <div className="flex gap-4 items-center">
            <Link href="/login" className="text-sm font-black text-indigo-600 px-4 py-2 hover:bg-indigo-50 rounded-xl transition-all">
              Sign In
            </Link>
            <Link href="/register" className="px-6 py-3 rounded-2xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Modern Hero Section */}
      <main className="container mx-auto px-6 pt-48 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-left space-y-8">
            <motion.div 
               initial={{ opacity: 0, x: -20 }} 
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-xs font-black uppercase tracking-wider border border-rose-100"
            >
               <Sparkles size={14} /> Human-Ai Synergy
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-6xl md:text-7xl font-[900] tracking-tight leading-[0.95] text-zinc-900"
            >
              Verify <span className="text-indigo-600">Talent</span> with Heart.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-zinc-500 leading-relaxed max-w-lg font-medium"
            >
              We don&apos;t just score code. We understand potential. Our AI creates a human-centered "Skill DNA" based on your actual work.
            </motion.p>
            
            <div className="flex flex-wrap gap-4 pt-4">
               <Link href="/register" className="group px-8 py-5 rounded-[2rem] bg-zinc-900 h-fit hover:bg-indigo-600 text-white font-black text-lg transition-all shadow-2xl shadow-indigo-200 flex items-center gap-3">
                 Build Your DNA <ArrowRight className="group-hover:translate-x-1" />
               </Link>
               <div className="flex items-center gap-4 px-6 border-l-2 border-zinc-100">
                  <div className="flex -space-x-3">
                     {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-zinc-200 border-2 border-white" />)}
                  </div>
                  <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Joined by 1.2k+ Engineers</div>
               </div>
            </div>
          </div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
             className="lg:w-1/2 relative"
          >
             <div className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group">
                <img 
                  src="/posa_humanistic_hero.png" 
                  alt="Humanistic AI Collaboration" 
                  className="w-full h-auto transform group-hover:scale-105 transition-all duration-1000"
                />
             </div>
             <div className="absolute -bottom-10 -left-10 glass-card p-6 border shadow-indigo-100 border-indigo-100 w-64 animate-bounce-slow">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center font-black text-xl shadow-lg">94</div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-zinc-400">Match Score</h4>
                    <p className="text-sm font-bold text-zinc-900">Highly Capable Senior Java</p>
                  </div>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Improved Feature Cards */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-48">
          <FeatureCard 
            icon={<Smile className="text-rose-500" />}
            bg="bg-rose-50"
            title="Approachable Analysis"
            desc="Instead of robotic metrics, we generate a professional career story from your repositories."
          />
          <FeatureCard 
            icon={<Target className="text-indigo-500" />}
            bg="bg-indigo-50"
            title="Real-time Interrogation"
            desc="A human-styled conversation that verifies depth without the stress of whiteboard coding."
          />
          <FeatureCard 
            icon={<TrendingUp className="text-emerald-500" />}
            bg="bg-emerald-50"
            title="Growth & Fit"
            desc="We score your trajectory, showing recruiters where you excel and how you&apos;ll evolve."
          />
        </div>
      </main>

      <footer className="py-20 text-center text-zinc-400 border-t border-zinc-50 relative z-10 bg-zinc-50/30">
        <p className="text-xs font-black uppercase tracking-[0.2em]">Build with heart &bull; powered by AI</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, bg }: any) {
  return (
    <div className="p-10 rounded-[3rem] bg-white border border-zinc-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-200/20 transition-all group">
      <div className={`w-14 h-14 rounded-3xl ${bg} flex items-center justify-center mb-10 transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black mb-4 tracking-tight">{title}</h3>
      <p className="text-zinc-500 leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  );
}
