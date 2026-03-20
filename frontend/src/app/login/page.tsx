'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import api from '@/lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      
      if (data.user.role === 'RECRUITER') router.push('/recruiter/dashboard');
      else router.push('/candidate/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-zinc-50/50">
      <div className="hero-glow opacity-20" />
      <Link href="/" className="fixed top-12 left-12 flex items-center gap-2 text-sm font-black text-zinc-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 rounded-[4rem] w-full max-w-md shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-white/80 bg-white/90"
      >
        <div className="w-16 h-16 rounded-[2rem] bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-8 mx-auto shadow-sm">
          <ShieldCheck className="text-indigo-600 w-8 h-8" />
        </div>
        
        <h2 className="text-4xl font-[900] text-center mb-2 tracking-tighter">Welcome Back.</h2>
        <p className="text-center text-zinc-400 text-sm mb-12 font-medium">Step back into your technical DNA.</p>
        
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-3xl text-xs font-bold mb-8 text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-4">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="email" required 
                className="w-full bg-zinc-50 border-zinc-100 rounded-[2rem] py-5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-200 transition-all font-bold text-sm"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-4">Security Phrase</label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="password" required 
                className="w-full bg-zinc-50 border-zinc-100 rounded-[2rem] py-5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-200 transition-all font-bold text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-5 rounded-[2rem] bg-zinc-900 text-white font-[900] text-xl hover:bg-indigo-600 active:scale-95 transition-all shadow-2xl shadow-indigo-100 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <p className="text-center text-zinc-400 text-sm mt-12 font-medium">
          New here? <Link href="/register" className="text-indigo-600 font-black hover:underline">Create DNA Account</Link>
        </p>
      </motion.div>
    </div>
  );
}
