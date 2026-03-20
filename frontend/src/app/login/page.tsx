'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogIn, ShieldCheck, Mail, Lock, Sparkles, Smile, ArrowRight, Shield } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('posa_token', data.token);
      localStorage.setItem('posa_user', JSON.stringify(data.user));
      router.push(data.user.role === 'RECRUITER' ? '/recruiter/dashboard' : '/candidate/dashboard');
    } catch (err) {
      alert('Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-8 selection:bg-blue-600/30 font-sans relative">
      <div className="gradient-mesh opacity-20" />
      <div className="scan-line" />
      
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="cyber-card p-12 md:p-20 w-full max-w-2xl bg-[#020617]/50 backdrop-blur-3xl border border-white/5 shadow-2xl shadow-black relative z-20">
        <div className="w-16 h-16 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-12 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
           <Shield size={32} strokeWidth={2.5} />
        </div>
        
        <div className="mb-20 px-2">
          <h1 className="text-6xl font-[1000] mb-4 tracking-tighter leading-none glow-text">Access <br/> Protocol.</h1>
          <p className="text-slate-500 font-bold text-xl tracking-tight">Enter your technical DNA handle.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 pl-6">Identification</label>
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-blue-500 transition-colors"><Mail size={18} /></div>
              <input 
                type="email" placeholder="EMAIL_HANDLE" required 
                className="w-full bg-slate-900/50 border-white/5 rounded-2xl p-6 pl-14 outline-none font-bold text-2xl tracking-widest text-blue-400 focus:border-blue-500/50 transition-all"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 pl-6">Security Phrase</label>
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-blue-500 transition-colors"><Lock size={18} /></div>
              <input 
                type="password" placeholder="••••••••" required 
                className="w-full bg-slate-900/50 border-white/5 rounded-2xl p-6 pl-14 outline-none font-bold text-2xl tracking-widest text-blue-400 focus:border-blue-500/50 transition-all"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" disabled={loading} 
            className="w-full py-8 mt-4 rounded-2xl bg-white text-black font-[1000] text-3xl hover:bg-blue-600 hover:text-white transition-all shadow-4xl active:scale-95 disabled:opacity-50 uppercase tracking-widest"
          >
            {loading ? 'Authenticating...' : 'Enter Hub'}
          </button>
        </form>

        <p className="mt-16 text-center text-xs font-black uppercase tracking-widest text-slate-700">
           New developer? <Link href="/register" className="text-blue-500 hover:text-white transition-colors">Register Node</Link>
        </p>
      </motion.div>
    </div>
  );
}
