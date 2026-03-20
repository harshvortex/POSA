'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cpu, Target, Play, TrendingUp, Sparkles, MessageCircle, ChevronRight, Zap, Box, Star, Verified, Search, Filter, Globe, BarChart3, Users, Briefcase, Plus, Menu, X, ArrowRight, Shield } from 'lucide-react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-black selection:bg-blue-500/10 overflow-x-hidden font-sans">
      <div className="mesh-glow" />
      
      {/* Redesigned Floating Minimal Navbar */}
      <nav className={`fixed top-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[900px] z-[200] transition-all duration-700 rounded-2xl ${scrolled ? 'bg-white/80 backdrop-blur-3xl shadow-xl shadow-black/2 py-4 border border-black/2' : 'bg-transparent py-8 border-transparent'}`}>
        <div className="container mx-auto px-10 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/10">
               <ShieldCheck size={18} strokeWidth={2.5} />
             </div>
             <span className="text-xl font-bold tracking-tight">PoSA</span>
          </div>
          
          <div className="hidden lg:flex gap-10 text-xs font-semibold text-gray-500">
             <Link href="#how" className="hover:text-black transition-colors">Platform</Link>
             <Link href="#how" className="hover:text-black transition-colors">Talent</Link>
             <Link href="#how" className="hover:text-black transition-colors">Verify</Link>
          </div>

          <div className="flex gap-4">
            <Link href="/login" className="px-5 py-2.5 rounded-xl border border-gray-100 text-xs font-semibold hover:bg-gray-50 transition-all active:scale-95">
              Portal
            </Link>
            <Link href="/register" className="px-7 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10 active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-8 pt-64 pb-48 relative z-10 text-center flex flex-col items-center">
         <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full border border-gray-100 mb-10 flex items-center gap-2 font-semibold text-xs text-gray-400 bg-gray-50/50"
         >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> AI-Verified Technical Protocol 2026
         </motion.div>
         
         <motion.h1 
           initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-6xl md:text-8xl font-bold tracking-[-0.03em] leading-[1.05] mb-12 max-w-4xl"
         >
           Technical <span className="text-blue-600 italic">Proof</span> over Paper Resumes.
         </motion.h1>
         
         <motion.p 
           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
           className="text-xl md:text-[1.35rem] text-gray-500 leading-relaxed max-w-2xl font-medium mb-16 tracking-tight"
         >
           PoSA ingest your GitHub history using high-intelligence LLMs to decode your actual code into a tamper-proof professional rank.
         </motion.p>
         
         <div className="flex flex-wrap justify-center gap-6 mb-48">
            <Link href="/register" className="group px-10 py-5 rounded-xl bg-black text-white font-bold text-lg transition-all hover:bg-blue-600 active:scale-95 shadow-2xl flex items-center gap-3">
               Connect GitHub <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="px-10 py-5 rounded-xl bg-white border border-gray-200 text-black font-bold text-lg transition-all hover:bg-gray-50 shadow-sm active:scale-95">
              Recruiter Hub
            </Link>
         </div>

         {/* Bento-Grid Features */}
         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-6xl pt-24">
            <Feature 
               className="md:col-span-8 h-[400px]"
               icon={<Cpu size={28} />} 
               title="Genetic Detection" 
               desc="Deep-layer repository analysis detecting architecture patterns, security maturity, and execution depth. We don't just count languages; we see code quality." 
            />
            <Feature 
               className="md:col-span-4 h-[400px]"
               icon={<Play size={28} />} 
               title="Real-Time Viva" 
               desc="Interrogation sessions designed to explore absolute technical limits." 
            />
            <Feature 
               className="md:col-span-4 h-[400px]"
               icon={<Target size={28} />} 
               title="Market Pulse" 
               desc="Direct alignment with high-value teams based on genetic skill markup." 
            />
            <Feature 
               className="md:col-span-8 h-[400px]"
               icon={<ShieldCheck size={28} />} 
               title="Secure Identification" 
               desc="Tamper-proof professional identity built on verified open-source contributions. Your work is your authority, forever." 
            />
         </div>
      </main>

      <footer className="py-24 text-center border-t border-gray-50 bg-[#fafafa]">
         <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">&copy; 2026 PoSA &bull; PURE INTELLIGENCE DESIGN</div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc, className = "md:col-span-4" }: any) {
  return (
    <div className={`bento-card p-12 text-left group flex flex-col justify-between ${className}`}>
       <div>
         <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-10 text-blue-600 transition-all group-hover:bg-white group-hover:border-blue-200 group-hover:shadow-sm">
            {icon}
         </div>
         <h3 className="text-3xl font-bold mb-4 tracking-tight leading-tight">{title}</h3>
         <p className="text-gray-500 text-lg leading-relaxed font-medium">{desc}</p>
       </div>
       <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="text-gray-300" />
       </div>
    </div>
  );
}
