'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, User, Briefcase, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react';
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
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] grid lg:grid-cols-2">
      {/* Left – Form */}
      <div className="flex flex-col justify-center px-8 py-16 lg:px-20">
        <Link href="/" className="flex items-center gap-2 mb-16">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <ShieldCheck size={16} strokeWidth={2.5} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">PoSA</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="label-xs text-indigo-500 mb-3">Create Account</div>
          <h1 className="display-md mb-2">Build your verified identity.</h1>
          <p className="text-gray-500 text-sm mb-8">Join PoSA and let your code prove your worth.</p>

          {/* Role Toggle */}
          <div className="flex gap-3 mb-8 p-1 bg-gray-100 rounded-xl w-fit">
            {(['CANDIDATE', 'RECRUITER'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  role === r
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {r === 'CANDIDATE' ? <User size={14} /> : <Briefcase size={14} />}
                {r === 'CANDIDATE' ? 'Developer' : 'Recruiter'}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="label-xs text-gray-500">Full Name</label>
                <input
                  type="text" placeholder="Alex Johnson" required
                  className="form-input"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="label-xs text-gray-500">Work Email</label>
                <input
                  type="email" placeholder="alex@company.com" required
                  className="form-input"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="label-xs text-gray-500">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  required
                  className="form-input pr-10"
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {role === 'RECRUITER' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-1.5">
                <label className="label-xs text-gray-500">Company Name</label>
                <input
                  type="text" placeholder="Your company" required
                  className="form-input"
                  value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </motion.div>
            )}

            <button
              type="submit" disabled={loading}
              className="btn-primary w-full h-11 text-sm mt-2"
            >
              {loading ? 'Creating account...' : `Create ${role === 'CANDIDATE' ? 'Developer' : 'Recruiter'} Profile`}
              {!loading && <ArrowRight size={15} />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right – Benefits Visual */}
      <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative z-10 max-w-sm">
          <div className="label-xs text-indigo-400 mb-6">Why PoSA Works</div>
          <h2 className="text-3xl font-black text-white tracking-tight leading-tight mb-8">
            One profile. Infinite opportunities.
          </h2>

          <div className="space-y-5">
            {[
              { title: 'No Résumé Required', desc: 'Your GitHub history tells a richer story than any PDF.' },
              { title: 'AI-Verified Scores', desc: 'Llama-3 reads your actual code—no self-reporting bias.' },
              { title: 'Direct Recruiter Access', desc: 'Top companies actively search verified PoSA profiles.' },
              { title: 'Grow Your Score', desc: 'Your profile improves as you build. Code more, rank higher.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                  <CheckCircle size={13} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{item.title}</div>
                  <div className="text-xs text-white/40 mt-0.5 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 rounded-2xl bg-white/5 border border-white/8">
            <div className="label-xs text-indigo-400 mb-3">Candidate Snapshot</div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50">Genetic Index</span>
              <span className="text-xl font-black text-white">97<span className="text-sm text-white/30">/100</span></span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-white/50">Join Date</span>
              <span className="text-xs font-bold text-indigo-400">Today, 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
