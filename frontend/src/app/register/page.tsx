'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Lock, ShieldCheck, Briefcase } from 'lucide-react';
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
    <div className="min-h-screen relative flex items-center justify-center py-20">
      <div className="hero-glow" />
      <Link href="/" className="fixed top-8 left-8 flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-10 rounded-[2.5rem] w-full max-w-xl shadow-2xl relative overflow-hidden"
      >
        <h2 className="text-3xl font-extrabold text-center mb-2">Create Account</h2>
        <p className="text-center text-gray-400 text-sm mb-10">Choose your path and start verifying skills.</p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-xs font-medium mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-2">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-500" />
              <input 
                type="text" required 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-blue-500/30 transition-all text-sm"
                placeholder="John Doe"
                value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="email" required 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-blue-500/30 transition-all text-sm"
                placeholder="john@example.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="password" required 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-blue-500/30 transition-all text-sm"
                placeholder="••••••••"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-2">I am a...</label>
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-blue-500/30 transition-all text-sm appearance-none outline-none"
              value={role} onChange={(e) => setRole(e.target.value)}
            >
              <option value="CANDIDATE" className="bg-zinc-900">Candidate</option>
              <option value="RECRUITER" className="bg-zinc-900">Recruiter</option>
            </select>
          </div>

          {role === 'RECRUITER' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-2">Company Name</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" required 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-blue-500/30 transition-all text-sm"
                  placeholder="Acme Corp"
                  value={company} onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="md:col-span-2 w-full py-4 rounded-2xl gradient-bg text-white font-extrabold text-lg transition-all shadow-xl shadow-blue-500/30 disabled:opacity-50 mt-4"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <p className="text-center text-gray-500 text-sm mt-10">
          Already have an account? <Link href="/login" className="text-blue-400 font-bold hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
