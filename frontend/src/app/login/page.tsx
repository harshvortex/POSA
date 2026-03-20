'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, ArrowRight, Github, Eye, EyeOff } from 'lucide-react';
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
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] grid lg:grid-cols-2">
      {/* Left Column – Form */}
      <div className="flex flex-col justify-center px-8 py-16 lg:px-20">
        <Link href="/" className="flex items-center gap-2 mb-16">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <ShieldCheck size={16} strokeWidth={2.5} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">PoSA</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="label-xs text-indigo-500 mb-3">Welcome Back</div>
          <h1 className="display-md mb-2">Sign in to your account.</h1>
          <p className="text-gray-500 text-sm mb-10">Enter your credentials to access the Protocol Hub.</p>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="label-xs text-gray-500">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  required
                  className="form-input pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="label-xs text-gray-500">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  className="form-input pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-11 text-sm mt-2"
            >
              {loading ? 'Authenticating...' : 'Access Protocol Hub'} {!loading && <ArrowRight size={15} />}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <button className="btn-ghost w-full h-11 text-sm justify-center">
            <Github size={16} /> GitHub OAuth (coming soon)
          </button>

          <p className="mt-8 text-center text-sm text-gray-400">
            No account?{' '}
            <Link href="/register" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              Create your Profile
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Column – Visual */}
      <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="relative z-10 max-w-sm">
          <div className="label-xs text-indigo-400 mb-6">Live Verification Preview</div>
          <h2 className="text-3xl font-black text-white tracking-tight leading-tight mb-8">
            Your GitHub tells the truth. We tell the world.
          </h2>

          <div className="space-y-4">
            {[
              { label: 'Code Quality', val: 94 },
              { label: 'Architecture Depth', val: 88 },
              { label: 'Security Maturity', val: 91 },
              { label: 'Collaboration Signal', val: 79 },
            ].map(({ label, val }) => (
              <div key={label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs font-medium text-white/50">{label}</span>
                  <span className="text-xs font-bold text-indigo-400">{val}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${val}%` }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-sm">
              A
            </div>
            <div>
              <div className="text-sm font-bold text-white">Anonymous Developer</div>
              <div className="text-xs text-white/40">Verified by Llama-3-70B</div>
            </div>
            <div className="ml-auto px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/25">
              <span className="text-xs font-bold text-emerald-400">✓ Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
