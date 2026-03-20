'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Lock, ShieldCheck, Briefcase, Smile, Heart } from 'lucide-react';
import api from '@/lib/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CANDIDATE');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data } = await api.post('/auth/register', { name, email, password, role, company });
      localStorage.setItem('posa_token', data.token);
      localStorage.setItem('posa_user', JSON.stringify(data.user));
      
      if (data.user.role === 'RECRUITER') router.push('/recruiter/dashboard');
      else router.push('/candidate/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-20 bg-zinc-50/50">
      <div className="hero-glow opacity-20" />
      <Link href="/" className="fixed top-12 left-12 flex items-center gap-2 text-sm font-black text-zinc-400 hover:text-indigo-600 transition-colors uppercase tracking-widest leading-none">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 rounded-[4rem] w-full max-w-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-white/80 bg-white/90"
      >
        <h2 className="text-4xl font-[1000] text-center mb-2 tracking-tight">Join the Network.</h2>
        <p className="text-center text-zinc-400 text-sm mb-12 font-medium">Define your DNA and connect with professional opportunities.</p>
        
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-3xl text-sm font-bold mb-8 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2 space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-4">Your Name</label>
            <div className="relative group">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" required 
                className="w-full bg-zinc-50 border-zinc-100 rounded-[2rem] py-5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-200 transition-all font-bold text-sm"
                placeholder="Jane Smith"
                value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-4">Email Handle</label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="email" required 
                className="w-full bg-zinc-50 border-zinc-100 rounded-[2rem] py-5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-200 transition-all font-bold text-sm"
                placeholder="you@email.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-4">Create Password</label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="password" required 
                className="w-full bg-zinc-50 border-zinc-100 rounded-[2rem] py-5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-200 transition-all font-bold text-sm"
                placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-4">Account Role</label>
            <select 
              className="w-full bg-zinc-50 border-zinc-100 rounded-[2rem] py-5 px-6 focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-200 transition-all font-bold text-sm appearance-none outline-none cursor-pointer"
              value={role} onChange={(e) => setRole(e.target.value)}
            >
              <option value="CANDIDATE">I want to be Hired</option>
              <option value="RECRUITER">I want to Hire Talent</option>
            </select>
          </div>

          {role === 'RECRUITER' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-4">Professional Organization</label>
              <div className="relative group">
                <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="text" required 
                  className="w-full bg-zinc-50 border-zinc-100 rounded-[2rem] py-5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-200 transition-all font-bold text-sm"
                  placeholder="Acme Corp"
                  value={company} onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="md:col-span-2 w-full py-5 rounded-[2rem] bg-zinc-900 text-white font-[900] text-xl hover:bg-rose-500 active:scale-95 transition-all shadow-2xl shadow-rose-100 disabled:opacity-50 mt-4"
          >
            {loading ? 'Processing...' : 'Complete Registration'}
          </button>
        </form>
        
        <p className="text-center text-zinc-400 text-sm mt-12 font-medium">
          Already a member? <Link href="/login" className="text-indigo-600 font-black hover:underline">Sign In Instead</Link>
        </p>
      </motion.div>
    </div>
  );
}
