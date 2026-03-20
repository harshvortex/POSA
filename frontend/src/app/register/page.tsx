'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Eye, EyeOff, User, Briefcase, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

export default function Register() {
  const [role, setRole] = useState<'CANDIDATE' | 'RECRUITER'>('CANDIDATE');
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', { ...form, role });
      router.push('/login');
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const BENEFITS = [
    { title: 'No résumé required', desc: 'Your GitHub history speaks volumes.' },
    { title: 'AI-verified scores', desc: 'Llama-3 reads your actual code, no bias.' },
    { title: 'Recruiter visibility', desc: 'Top companies search verified profiles.' },
    { title: 'Scores improve over time', desc: 'Build more, rank higher automatically.' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr', background: '#f8fafc' }} className="auth-layout">
      {/* ── LEFT: FORM ── */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(32px, 5vw, 80px) clamp(24px, 6vw, 80px)', maxWidth: 560, width: '100%', margin: '0 auto' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 48 }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(79,70,229,0.3)' }}>
            <ShieldCheck size={15} color="white" strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: '#0d1117' }}>PoSA</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="text-label-colored" style={{ marginBottom: 10 }}>Create account</div>
          <h1 className="text-h1" style={{ marginBottom: 8 }}>Build your verified identity</h1>
          <p className="text-sm" style={{ marginBottom: 28 }}>Let your code prove your worth — no résumé needed.</p>

          {/* Role Toggle */}
          <div style={{ display: 'flex', background: '#f1f4f9', borderRadius: 12, padding: 4, gap: 4, marginBottom: 28, width: 'fit-content' }}>
            {(['CANDIDATE', 'RECRUITER'] as const).map(r => (
              <button key={r} type="button" onClick={() => setRole(r)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 16px', borderRadius: 9, border: 'none', cursor: 'pointer',
                  fontWeight: 600, fontSize: '0.8125rem', transition: 'all 0.2s',
                  background: role === r ? 'white' : 'transparent',
                  color: role === r ? '#4f46e5' : '#6b7280',
                  boxShadow: role === r ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                }}>
                {r === 'CANDIDATE' ? <User size={13} /> : <Briefcase size={13} />}
                {r === 'CANDIDATE' ? 'Developer' : 'Recruiter'}
              </button>
            ))}
          </div>

          {error && (
            <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', color: '#dc2626', fontSize: '0.875rem', fontWeight: 500, marginBottom: 20 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="name-email-grid">
              <div className="field">
                <label className="field-label">Full name</label>
                <input type="text" placeholder="Alex Johnson" required className="input"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="field">
                <label className="field-label">Work email</label>
                <input type="email" placeholder="alex@company.com" required className="input"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>

            <div className="field">
              <label className="field-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} placeholder="Create a strong password" required
                  className="input" style={{ paddingRight: 40 }}
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', display: 'flex', padding: 4 }}>
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {role === 'RECRUITER' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="field">
                <label className="field-label">Company name</label>
                <input type="text" placeholder="Your company" required className="input"
                  value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
              </motion.div>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary btn-md" style={{ width: '100%', height: 44, marginTop: 8 }}>
              {loading ? (
                <><div className="spinner" />&nbsp;Creating account...</>
              ) : (
                <>Create {role === 'CANDIDATE' ? 'Developer' : 'Recruiter'} Profile <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280', marginTop: 24 }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </motion.div>
      </div>

      {/* ── RIGHT: BENEFITS ── */}
      <div className="auth-panel" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(40px, 5vw, 64px)' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '70%', height: '70%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-5%', width: '55%', height: '55%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 400 }}>
          <div className="text-label" style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Why PoSA</div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 40 }}>
            One profile.<br />Infinite opportunities.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {BENEFITS.map((b, i) => (
              <motion.div key={b.title}
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: 'rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                  <CheckCircle size={12} color="#34d399" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'white', marginBottom: 2 }}>{b.title}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{b.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: 44, padding: '16px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="text-label" style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Candidate Preview</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)' }}>Starting Genetic Index</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
                --<span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.25)', fontWeight: 500 }}>/100</span>
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#818cf8', marginTop: 6, fontWeight: 500 }}>
              Syncs automatically after GitHub connect
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
          .name-email-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
