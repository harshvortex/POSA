'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Lock, ShieldCheck, Briefcase } from 'lucide-react';
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
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="hero-glow" />
      <Link href="/" className="fixed top-8 left-8 flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-10 rounded-[2.5rem] w-full max-w-md shadow-2xl relative overflow-hidden"
      >
        <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mb-6 mx-auto">
          <ShieldCheck className="text-white w-7 h-7" />
        </div>
        
        <h2 className="text-3xl font-extrabold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-gray-400 text-sm mb-10">Access your Skill DNA and Viva insights.</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-xs font-medium mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-2">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="email" 
                required 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all font-medium text-sm"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-2">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="password" 
                required 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all font-medium text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 rounded-2xl gradient-bg text-white font-extrabold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-blue-500/30 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <p className="text-center text-gray-500 text-sm mt-10">
          Don&apos;t have an account? <Link href="/register" className="text-blue-400 font-bold hover:underline">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
}
