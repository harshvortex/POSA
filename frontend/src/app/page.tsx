'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Cpu, Target, Play, ArrowRight, Github,
  Zap, Sparkles, CheckCircle, Star, TrendingUp, BarChart3,
  ChevronRight, Users, Lock, Code2
} from 'lucide-react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] selection:bg-indigo-100 overflow-x-hidden">
      {/* Gradient bg blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-purple-100/40 blur-3xl" />
      </div>

      {/* === NAV === */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-2xl border-b border-gray-100 shadow-sm'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck size={16} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">PoSA</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#how" className="hover:text-gray-900 transition-colors">How It Works</a>
            <a href="#stats" className="hover:text-gray-900 transition-colors">Why PoSA</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-ghost text-sm px-4 h-9">
              Sign In
            </Link>
            <Link href="/register" className="btn-primary text-sm px-5 h-9">
              Get Started <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* === HERO === */}
      <section className="relative z-10 pt-36 pb-24 max-w-7xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 12 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="label-xs text-indigo-600">Powered by Llama-3 · Python FastAPI</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="display-xl max-w-4xl mx-auto mb-6"
        >
          Your code is your{' '}
          <span className="gradient-text">résumé.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 16 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          PoSA ingests your GitHub history through AI to build a tamper-proof
          technical identity—verified skills, real depth, zero guesswork.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 12 }} transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/register" className="btn-primary text-base px-8 h-12">
            <Github size={18} /> Connect GitHub
          </Link>
          <Link href="/login" className="btn-ghost text-base px-8 h-12">
            Recruiter Portal <ChevronRight size={16} />
          </Link>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-medium"
        >
          {['256-bit encrypted', 'Free for candidates', 'No resume needed', 'Recruiter-trusted'].map(t => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-emerald-500" /> {t}
            </span>
          ))}
        </motion.div>
      </section>

      {/* === HERO CARD === */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30, scale: mounted ? 1 : 0.97 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="card-hero p-10 noise"
        >
          {/* Decorative orbs */}
          <div className="absolute top-0 right-20 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-20 w-48 h-48 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Genetic Index', value: '97', suffix: '/100', color: 'text-indigo-400', desc: 'Code Quality Score' },
              { label: 'Repositories', value: '84', suffix: ' repos', color: 'text-emerald-400', desc: 'Analyzed & Indexed' },
              { label: 'Market Fit', value: '94%', suffix: '', color: 'text-purple-400', desc: 'Role Alignment Score' },
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm">
                <div className="label-xs text-gray-500 mb-3">{stat.label}</div>
                <div className={`text-5xl font-black tracking-tight ${stat.color} mb-1`}>
                  {stat.value}<span className="text-xl font-bold text-white/30">{stat.suffix}</span>
                </div>
                <div className="text-xs text-white/40 font-medium">{stat.desc}</div>
              </div>
            ))}
          </div>

          <div className="relative z-10 mt-8 p-6 rounded-2xl bg-white/5 border border-white/8">
            <div className="label-xs text-gray-500 mb-4">Skill DNA — AI-Extracted Profile</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { skill: 'Python', pct: 97 },
                { skill: 'FastAPI', pct: 92 },
                { skill: 'LLMs', pct: 89 },
                { skill: 'System Design', pct: 85 },
              ].map(({ skill, pct }) => (
                <div key={skill}>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-semibold text-white/60">{skill}</span>
                    <span className="text-xs font-bold text-indigo-400">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-6 flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/25">
              <span className="text-xs font-bold text-emerald-400">✓ Identity Verified</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/25">
              <span className="text-xs font-bold text-indigo-400">⚡ Llama-3 Analyzed</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/25">
              <span className="text-xs font-bold text-purple-400">🏆 Top 3% Developer</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* === FEATURES === */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <div className="label-xs text-indigo-500 mb-4">Platform Features</div>
          <h2 className="display-md max-w-2xl mx-auto">Everything you need to prove your skills.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Cpu size={20} />, color: 'text-indigo-500 bg-indigo-50',
              title: 'AI Repository Analysis',
              desc: 'Llama-3 scans your entire commit history, architecture decisions, and code quality to generate an objective technical profile.'
            },
            {
              icon: <Play size={20} />, color: 'text-purple-500 bg-purple-50',
              title: 'Live Technical Viva',
              desc: 'AI-driven interrogation sessions that probe your actual knowledge depth—not just what you claim to know.'
            },
            {
              icon: <Target size={20} />, color: 'text-blue-500 bg-blue-50',
              title: 'Job Market Fit Score',
              desc: 'Instantly match your verified profile with thousands of roles based on weighted skill alignment, not keywords.'
            },
            {
              icon: <BarChart3 size={20} />, color: 'text-emerald-500 bg-emerald-50',
              title: 'Growth Trajectory',
              desc: 'Track your technical evolution over time. See how your skills compound and where to invest next.'
            },
            {
              icon: <Users size={20} />, color: 'text-rose-500 bg-rose-50',
              title: 'Recruiter Intelligence',
              desc: 'Recruiters get deep signal on candidate quality—not just scores, but the reasoning behind them.'
            },
            {
              icon: <Lock size={20} />, color: 'text-slate-500 bg-slate-50',
              title: 'Tamper-Proof Identity',
              desc: 'Your technical identity is cryptographically verified. No fake scores, no inflated claims.'
            },
          ].map((f) => (
            <div key={f.title} className="surface surface-hover p-8 group">
              <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 tracking-tight">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === HOW IT WORKS === */}
      <section id="how" className="relative z-10 max-w-4xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <div className="label-xs text-indigo-500 mb-4">The Protocol</div>
          <h2 className="display-md">From code to career, in 3 steps.</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              step: '01',
              title: 'Connect GitHub',
              desc: 'Link your repositories. Our Python engine pulls your full commit history, languages, architecture patterns, and collaboration signals.'
            },
            {
              step: '02',
              title: 'Llama-3 Analysis',
              desc: 'The AI model performs deep code evaluation—assessing logic quality, security awareness, system thinking, and evolution velocity.'
            },
            {
              step: '03',
              title: 'Verified Identity',
              desc: 'Receive your Skill DNA profile, take the Live Viva to solidify your identity, and get matched with aligned opportunities.'
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="surface p-8 flex gap-8 items-start group hover:border-indigo-200 transition-all"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                {item.step}
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === CTA BANNER === */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-24">
        <div className="card-hero noise p-16 text-center">
          <div className="absolute inset-0 grid-bg opacity-30 rounded-3xl" />
          <div className="relative z-10">
            <h2 className="display-lg text-white mb-6 max-w-3xl mx-auto">
              Stop sending résumés. Start sending proof.
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of developers who let their code speak for them.
            </p>
            <Link href="/register" className="btn-primary text-base px-10 h-12 inline-flex">
              Start Free <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="relative z-10 border-t border-gray-100 bg-white/50 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <ShieldCheck size={12} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-sm">PoSA</span>
          </div>
          <p className="label-xs text-gray-400">© 2026 Proof of Skills Authority · Python + Next.js</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Docs'].map(l => (
              <a key={l} href="#" className="label-xs text-gray-400 hover:text-gray-700 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
