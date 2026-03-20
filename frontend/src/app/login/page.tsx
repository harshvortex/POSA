'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('posa_token', data.token);
      localStorage.setItem('posa_user', JSON.stringify(data.user));
      router.push(data.user.role === 'RECRUITER' ? '/recruiter/dashboard' : '/candidate/dashboard');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr', background: '#f8fafc' }}
      className="auth-layout">
      {/* ── LEFT: FORM ── */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(32px, 5vw, 80px) clamp(24px, 6vw, 80px)', maxWidth: 520, width: '100%', margin: '0 auto' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 48 }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(79,70,229,0.3)' }}>
            <ShieldCheck size={15} color="white" strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: '#0d1117' }}>PoSA</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="text-label-colored" style={{ marginBottom: 10 }}>Welcome back</div>
          <h1 className="text-h1" style={{ marginBottom: 8 }}>Sign in to your account</h1>
          <p className="text-sm" style={{ marginBottom: 36 }}>Access your Protocol Hub and verified identity.</p>

          {error && (
            <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', color: '#dc2626', fontSize: '0.875rem', fontWeight: 500, marginBottom: 24 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="field">
              <label className="field-label">Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input type="email" placeholder="you@company.com" required className="input" style={{ paddingLeft: 40 }}
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="field">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="field-label">Password</label>
                <a href="#" style={{ fontSize: '0.75rem', color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input type={showPass ? 'text' : 'password'} placeholder="••••••••" required
                  className="input" style={{ paddingLeft: 40, paddingRight: 40 }}
                  value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: 4, display: 'flex' }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary btn-md" style={{ width: '100%', height: 44, marginTop: 4 }}>
              {loading ? (
                <><div className="spinner" />&nbsp;Signing in...</>
              ) : (
                <>Sign in to Protocol Hub <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#e4e7ec' }} />
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500 }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#e4e7ec' }} />
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
            Don't have an account?{' '}
            <Link href="/register" style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>
              Create one free
            </Link>
          </p>
        </motion.div>
      </div>

      {/* ── RIGHT: VISUAL PANEL (hidden on mobile) ── */}
      <div className="auth-panel" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px, 5vw, 64px)' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '70%', height: '70%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '60%', height: '60%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 400 }}>
          <div className="text-label" style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Live Verification Preview</div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 36 }}>
            Your GitHub tells the truth.<br />We tell the world.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 36 }}>
            {[
              { label: 'Code Quality', value: 94 },
              { label: 'Architecture Depth', value: 88 },
              { label: 'Security Maturity', value: 91 },
              { label: 'Collaboration Signal', value: 79 },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>{label}</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#818cf8' }}>{value}%</span>
                </div>
                <div className="skill-bar-track" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="skill-bar-fill" />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.875rem', color: 'white', flexShrink: 0 }}>
              A
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'white' }}>Senior Developer</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>Verified by Llama-3-70B</div>
            </div>
            <div style={{ marginLeft: 'auto', padding: '4px 10px', borderRadius: 8, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)', fontSize: '0.7rem', fontWeight: 700, color: '#34d399' }}>
              ✓ Verified
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .auth-layout { grid-template-columns: 1fr 1fr !important; }
          .auth-panel { display: flex !important; }
        }
        @media (max-width: 899px) {
          .auth-panel { display: none !important; }
        }
      `}</style>
    </div>
  );
}
