'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Cpu, Target, Play, ArrowRight,
  CheckCircle, Menu, X, Star, Zap, Users, Lock, BarChart3, Sparkles
} from 'lucide-react';

const FEATURES = [
  { icon: Cpu, title: 'Deep Repo Analysis', desc: 'Llama-3 scans your entire commit history, architecture decisions, and code patterns to generate an objective technical profile.' },
  { icon: Play, title: 'Live Technical Viva', desc: 'AI-driven interrogation sessions that probe your real knowledge depth — not what you claim to know, but what you can demonstrate.' },
  { icon: Target, title: 'Market Fit Score', desc: 'Match your verified profile with roles based on weighted skill alignment, not keyword spam.' },
  { icon: BarChart3, title: 'Growth Trajectory', desc: 'See how your skills compound over time and know exactly where to invest your effort next.' },
  { icon: Users, title: 'Recruiter Intelligence', desc: 'Recruiters get deep signal on candidate quality — reasoning behind scores, not just numbers.' },
  { icon: Lock, title: 'Tamper-Proof Identity', desc: 'Your technical identity is AI-verified. No fake scores, no self-reported inflation.' },
];

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how' },
  { label: 'Why PoSA', href: '#why' },
];

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0d1117', overflowX: 'hidden' }}>

      {/* Background glow */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '-5%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)' }} />
      </div>

      {/* ── NAV ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid #e4e7ec' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: 64, justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(79,70,229,0.3)' }}>
              <ShieldCheck size={16} color="white" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.025em', color: '#0d1117' }}>PoSA</span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#0d1117')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link href="/login" className="btn btn-outline btn-sm" style={{ display: 'none' }} data-desktop>
              Sign In
            </Link>
            <Link href="/login" className="btn btn-ghost btn-sm" style={{ fontSize: '0.8125rem' }}>
              Sign In
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm">
              Get Started <ArrowRight size={13} />
            </Link>
            {/* Mobile menu button */}
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="mobile-menu-btn"
              style={{ display: 'flex', marginLeft: 4 }}
              aria-label="Menu"
            >
              {navOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {navOpen && (
          <div style={{ background: 'white', borderBottom: '1px solid #e4e7ec', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={() => setNavOpen(false)}
                style={{ display: 'block', padding: '10px 12px', borderRadius: 8, fontSize: '0.9rem', fontWeight: 500, color: '#374151', textDecoration: 'none' }}>
                {l.label}
              </a>
            ))}
            <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #f3f4f6' }} />
            <Link href="/register" className="btn btn-primary btn-md" style={{ marginTop: 4 }} onClick={() => setNavOpen(false)}>
              Get Started Free
            </Link>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', zIndex: 1, paddingTop: 120, paddingBottom: 80 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="badge badge-blue" style={{ margin: '0 auto 24px', display: 'inline-flex', padding: '6px 14px' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4f46e5', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              Powered by Llama-3 · Python FastAPI
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
            className="text-hero" style={{ maxWidth: 780, margin: '0 auto 20px' }}>
            Your code is your{' '}
            <span className="gradient-text">résumé.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
            className="text-body" style={{ maxWidth: 520, margin: '0 auto 40px', fontSize: '1.0625rem' }}>
            PoSA uses AI to extract your true technical depth from GitHub and create a verified identity that gets you in front of the right teams.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 56 }}>
            <Link href="/register" className="btn btn-primary btn-lg">
              Connect GitHub Free <ArrowRight size={16} />
            </Link>
            <Link href="/login" className="btn btn-outline btn-lg">
              Recruiter Portal
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px', justifyContent: 'center' }}>
            {['No résumé needed', 'Free for developers', 'AI-verified scores', 'Recruiter trusted'].map(t => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: '#6b7280', fontWeight: 500 }}>
                <CheckCircle size={13} color="#10b981" /> {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HERO PREVIEW CARD ── */}
      <section style={{ position: 'relative', zIndex: 1, paddingBottom: 100 }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="card-dark"
            style={{ padding: 'clamp(24px, 4vw, 48px)' }}
          >
            {/* Stats Row */}
            <div className="grid-3" style={{ marginBottom: 24 }}>
              {[
                { label: 'Genetic Index', val: '97', unit: '/100', color: '#818cf8' },
                { label: 'Repositories Analyzed', val: '84', unit: ' repos', color: '#34d399' },
                { label: 'Market Fit Score', val: '94', unit: '%', color: '#c084fc' },
              ].map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px 22px' }}>
                  <div className="text-label" style={{ color: 'rgba(255,255,255,0.35)', marginBottom: 10 }}>{s.label}</div>
                  <div style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: s.color }}>
                    {s.val}<span style={{ fontSize: '1rem', fontWeight: 500, color: 'rgba(255,255,255,0.25)' }}>{s.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Skill DNA */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px 22px' }}>
              <div className="text-label" style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Skill DNA — Llama-3 Extracted</div>
              <div className="grid-2" style={{ gap: '14px 32px' }}>
                {[{ s: 'Python', p: 97 }, { s: 'FastAPI', p: 92 }, { s: 'LLM Integration', p: 89 }, { s: 'System Design', p: 85 }].map(({ s, p }) => (
                  <div key={s}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)' }}>{s}</span>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#818cf8' }}>{p}%</span>
                    </div>
                    <div className="skill-bar-track" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <div className="skill-bar-fill" style={{ width: `${p}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
              {[
                { label: '✓ Identity Verified', bg: 'rgba(16,185,129,0.12)', c: '#34d399' },
                { label: '⚡ Llama-3 Analyzed', bg: 'rgba(99,102,241,0.15)', c: '#818cf8' },
                { label: '🏆 Top 5% Developer', bg: 'rgba(196,132,252,0.12)', c: '#c084fc' },
              ].map(b => (
                <div key={b.label} style={{ padding: '5px 12px', borderRadius: 8, background: b.bg, border: `1px solid ${b.c}30`, fontSize: '0.75rem', fontWeight: 700, color: b.c }}>
                  {b.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ position: 'relative', zIndex: 1, paddingBottom: 100 }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="text-label-colored" style={{ marginBottom: 12 }}>Platform Features</div>
            <h2 className="text-h1" style={{ maxWidth: 480, margin: '0 auto 16px' }}>Everything you need to prove your skills.</h2>
            <p className="text-body" style={{ maxWidth: 420, margin: '0 auto' }}>Built for developers who want to be seen for what they can actually build.</p>
          </div>
          <div className="grid-3">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }} viewport={{ once: true }}
                className="card card-hover" style={{ padding: '28px 28px 32px' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <f.icon size={18} color="#4f46e5" />
                </div>
                <h3 className="text-h3" style={{ marginBottom: 10 }}>{f.title}</h3>
                <p className="text-sm" style={{ lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ position: 'relative', zIndex: 1, paddingBottom: 100 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="text-label-colored" style={{ marginBottom: 12 }}>3-Step Protocol</div>
            <h2 className="text-h1">From code to career.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { n: '01', t: 'Connect GitHub', d: 'Link your repositories. Our Python engine pulls your full commit history, language usage, and collaboration signals.' },
              { n: '02', t: 'AI Analysis', d: 'Llama-3 performs deep code evaluation — logic quality, security awareness, system thinking, and growth velocity.' },
              { n: '03', t: 'Verified Identity', d: 'Get your Skill DNA profile, take a Live Viva, and get matched with teams looking for exactly your capabilities.' },
            ].map((step, i) => (
              <motion.div key={step.n}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="card" style={{ padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'flex-start', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(79,70,229,0.25)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#e4e7ec')}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.8125rem', boxShadow: '0 4px 12px rgba(79,70,229,0.25)' }}>
                  {step.n}
                </div>
                <div>
                  <div className="text-h3" style={{ marginBottom: 6 }}>{step.t}</div>
                  <p className="text-sm">{step.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: 'relative', zIndex: 1, paddingBottom: 120 }}>
        <div className="container">
          <div className="card-dark" style={{ padding: 'clamp(40px, 6vw, 80px)', textAlign: 'center' }}>
            <h2 className="text-h1" style={{ color: 'white', maxWidth: 520, margin: '0 auto 16px' }}>Stop sending résumés. Start sending proof.</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', marginBottom: 36, maxWidth: 380, margin: '0 auto 36px' }}>
              Join developers who let their code speak for itself.
            </p>
            <Link href="/register" className="btn btn-primary btn-xl">
              Create Free Profile <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #e4e7ec', background: 'white', padding: '32px 0' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={12} color="white" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', letterSpacing: '-0.015em' }}>PoSA</span>
          </div>
          <p className="text-xs">© 2026 Proof of Skills Authority · Built with Python + Next.js</p>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media(min-width:768px) { .desktop-nav { display: flex !important; } }
        @media(max-width:767px) { .desktop-nav { display: none !important; } }
      `}</style>
    </div>
  );
}
