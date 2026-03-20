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
    <div className="relative min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans">
      <div className="gradient-mesh" />
      <div className="scan-line" />
      
      {/* Redesigned Floating Cyber-Navbar */}
      <nav className={`fixed top-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[950px] z-[200] transition-all duration-700 rounded-2xl border ${scrolled ? 'bg-slate-900/40 backdrop-blur-3xl shadow-2xl border-white/5 py-4 scale-100' : 'bg-transparent border-transparent py-8 scale-105'}`}>
        <div className="container mx-auto px-10 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-2xl shadow-blue-500/10">
               <Shield size={24} strokeWidth={2.5} />
             </div>
             <span className="text-3xl font-black tracking-tighter glow-text">PoSA.</span>
          </div>
          
          <div className="hidden lg:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
             <Link href="#how" className="hover:text-blue-400 transition-colors">Protocol</Link>
             <Link href="#how" className="hover:text-blue-400 transition-colors">Talent</Link>
             <Link href="#how" className="hover:text-blue-400 transition-colors">Verify</Link>
          </div>

          <div className="flex gap-4">
            <Link href="/login" className="px-6 py-3 rounded-xl border border-white/5 text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95">
              Portal
            </Link>
            <Link href="/register" className="px-8 py-4 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20 active:scale-95">
              Sync DNA
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-8 pt-72 pb-48 relative z-10 text-center flex flex-col items-center">
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 rounded-full border border-blue-500/10 mb-12 flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.4em] bg-blue-500/5 text-blue-400 shadow-2xl shadow-blue-500/5"
         >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" /> Security Protocol 4.0 ACTIVE
         </motion.div>
         
         <motion.h1 
           initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
           className="text-7xl md:text-[9rem] font-[1000] tracking-[-0.05em] leading-[0.85] mb-16 max-w-6xl capitalize glow-text"
         >
           Verified <br/> Technical <span className="text-blue-500 italic">Genesis.</span>
         </motion.h1>
         
         <motion.p 
           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
           className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl font-medium mb-20 tracking-tight"
         >
           Resumes are legacy data. PoSA uses **Llama-3-70B Verification** to ingest your total GitHub history into a tamper-proof professional DNA.
         </motion.p>
         
         <div className="flex flex-wrap justify-center gap-8 mb-48">
            <Link href="/register" className="group px-14 py-8 rounded-2xl bg-white text-black font-[1000] text-3xl transition-all hover:bg-blue-600 hover:text-white active:scale-95 shadow-2xl flex items-center gap-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 group-hover:block hidden animate-ping" />
               Build Your Protocol <ArrowRight size={38} strokeWidth={4} className="group-hover:translate-x-2 transition-transform" />
            </Link>
         </div>

         {/* Cyber-Grid Features */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl pt-24 border-t border-white/5 relative">
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-blue-500 shadow-[0_0_20px_blue]" />
            <Feature 
               icon={<Cpu size={36} />} 
               title="Llama-3 Detection" 
               desc="Deep-layer repository analysis detecting architecture patterns, security maturity, and execution depth." 
            />
            <Feature 
               icon={<Play size={36} />} 
               title="Reactive Viva" 
               desc="High-fidelity interrogation sessions designed to explore technical boundaries in real-time." 
            />
            <Feature 
               icon={<Target size={36} />} 
               title="Market Precision" 
               desc="Instant alignment with high-value positions based on verified genetic skill markup." 
            />
         </div>
      </main>

      {/* Cyber-Social Proof */}
      <div className="py-24 border-t border-white/5 bg-slate-900/20 backdrop-blur-md">
         <div className="container mx-auto px-10 text-center">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-12">Secured Network Partners</div>
            <div className="flex flex-wrap justify-center gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
               <LogoPlaceholder hideOnMobile={false} /> <LogoPlaceholder hideOnMobile={false} /> <LogoPlaceholder hideOnMobile={true} /> <LogoPlaceholder hideOnMobile={true} />
            </div>
         </div>
      </div>

      <footer className="py-20 text-center border-t border-white/5 relative z-10">
         <div className="flex justify-center gap-12 mb-8">
            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-400">Security</Link>
            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-400">Documentation</Link>
            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-400">Network</Link>
         </div>
         <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.4em]">&copy; 2026 PoSA ARCHIVE &bull; VERSION 4.2.0 &bull; ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }: any) {
  return (
    <div className="cyber-card p-16 text-left group">
       <div className="w-16 h-16 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center mb-12 text-blue-400 group-hover:scale-110 group-hover:border-blue-500 transition-all">
          {icon}
       </div>
       <h3 className="text-4xl font-[1000] mb-4 tracking-tighter leading-none glow-text">{title}</h3>
       <p className="text-slate-400 text-lg leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function LogoPlaceholder({ hideOnMobile }: { hideOnMobile: boolean }) {
  return <div className={`text-2xl font-black uppercase tracking-[0.2em] transform -skew-x-12 ${hideOnMobile ? 'hidden lg:block' : ''}`}>STITCH.DEV</div>;
}
