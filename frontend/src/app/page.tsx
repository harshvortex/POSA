'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Play, ArrowRight, ShieldCheck, Cpu, Briefcase } from 'lucide-react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="hero-glow" />
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-card py-3 translate-y-2 mx-auto max-w-[90%] left-0 right-0 rounded-2xl border' : 'py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">PoSA</span>
          </div>
          
          <div className="flex gap-4 items-center">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="px-5 py-2 rounded-xl gradient-bg text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-blue-500/20">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-40 pb-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Cpu className="w-3 h-3" /> AI-Driven Skill Analysis
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-8"
          >
            Verify Technical <span className="gradient-text">DNA</span> with Confidence.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 mb-10 max-w-2xl leading-relaxed"
          >
            PoSA uses Hugging Face AI to analyze GitHub portfolios and conduct automated technical interviews. Zero friction, total transparency.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/register" className="group flex items-center gap-2 px-8 py-4 rounded-2xl gradient-bg text-white font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-blue-500/25">
              Launch Dashboard <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="flex items-center gap-2 px-8 py-4 rounded-2xl glass-card font-bold text-lg hover:border-gray-500 transition-all">
              <Play className="fill-current w-4 h-4" /> Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32">
          <FeatureCard 
            icon={<Github className="w-6 h-6 text-blue-400" />}
            title="Portfolio Analysis"
            desc="Deep repo scanning to calculate Skill DNA based on stars, contributions, and stack diversity."
            delay={0.4}
          />
          <FeatureCard 
            icon={<Cpu className="w-6 h-6 text-purple-400" />}
            title="AI Interrogation"
            desc="The Viva system conducts a 5-question technical interview using Llama-3 to verify underlying knowledge."
            delay={0.5}
          />
          <FeatureCard 
            icon={<Briefcase className="w-6 h-6 text-indigo-400" />}
            title="Smarter Hiring"
            desc="Recruiters get a verified leaderboard of candidates with detailed job-fit and growth scores."
            delay={0.6}
          />
        </div>
      </main>

      <footer className="border-t border-white/5 py-10 mt-20 text-center text-gray-500 text-sm">
        &copy; 2024 Proof of Skill Analysis (PoSA). Powered by Hugging Face.
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-8 rounded-3xl hover:border-white/20 transition-all group"
    >
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">
        {desc}
      </p>
    </motion.div>
  );
}
