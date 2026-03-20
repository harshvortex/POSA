'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Briefcase, Sparkles, Smile, ArrowLeft, Shield, CheckCircle2 } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

export default function Register() {
  const [role, setRole] = useState('CANDIDATE');
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register', { ...form, role });
      alert('Node successfully registered! Proceeding to authentication.');
      router.push('/login');
    } catch (err) {
      alert('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-8 selection:bg-blue-600/30 font-sans relative">
      <div className="gradient-mesh opacity-20" />
      <div className="scan-line" />
      
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="cyber-card p-12 md:p-16 w-full max-w-4xl bg-[#020617]/50 backdrop-blur-3xl border border-white/5 shadow-2xl relative z-20">
        <div className="flex justify-between items-start mb-16">
           <div className="w-16 h-16 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <Shield size={32} strokeWidth={2.5} />
           </div>
           <Link href="/" className="px-6 py-2 rounded-xl bg-white/5 text-[10px] uppercase font-black tracking-widest text-slate-500 hover:text-white transition-all">Abort</Link>
        </div>
        
        <div className="mb-16">
          <h1 className="text-6xl font-[1000] mb-4 tracking-tighter leading-none glow-text">Initialize node.</h1>
          <p className="text-slate-500 font-bold text-xl tracking-tight">Sync your technical genetic identity.</p>
        </div>

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="space-y-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 pl-6">Full Identity</label>
                 <div className="relative group">
                   <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-blue-500 transition-colors"><User size={18} /></div>
                   <input 
                     type="text" placeholder="NAME_REAL_ENTITY" required 
                     className="w-full bg-slate-900/50 border-white/5 rounded-2xl p-6 pl-14 outline-none font-bold text-2xl tracking-widest text-blue-400 focus:border-blue-500/50 transition-all"
                     value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                   />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 pl-6">Digital Address</label>
                 <div className="relative group">
                   <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-blue-500 transition-colors"><Mail size={18} /></div>
                   <input 
                     type="email" placeholder="EMAIL_HANDLE" required 
                     className="w-full bg-slate-900/50 border-white/5 rounded-2xl p-6 pl-14 outline-none font-bold text-2xl tracking-widest text-blue-400 focus:border-blue-500/50 transition-all"
                     value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                     value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                   />
                 </div>
              </div>
           </div>

           <div className="space-y-10">
              <div className="space-y-6">
                 <label className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 pl-6">Access Role</label>
                 <div className="grid grid-cols-2 gap-4">
                    <button 
                       type="button" 
                       onClick={() => setRole('CANDIDATE')}
                       className={`p-10 rounded-2xl border transition-all text-center ${role === 'CANDIDATE' ? 'bg-blue-600 border-blue-400 text-white shadow-3xl shadow-blue-500/20' : 'bg-slate-900/50 border-white/5 text-slate-500'}`}
                    >
                       <User size={30} className="mx-auto mb-4" />
                       <span className="text-xs font-black uppercase tracking-widest">Candidate</span>
                    </button>
                    <button 
                       type="button" 
                       onClick={() => setRole('RECRUITER')}
                       className={`p-10 rounded-2xl border transition-all text-center ${role === 'RECRUITER' ? 'bg-blue-600 border-blue-400 text-white shadow-3xl shadow-blue-500/20' : 'bg-slate-900/50 border-white/5 text-slate-500'}`}
                    >
                       <Briefcase size={30} className="mx-auto mb-4" />
                       <span className="text-xs font-black uppercase tracking-widest">Recruiter</span>
                    </button>
                 </div>
              </div>

              {role === 'RECRUITER' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 pl-6">Organization Hub</label>
                   <div className="relative group">
                     <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-blue-500 transition-colors"><Briefcase size={18} /></div>
                     <input 
                       type="text" placeholder="COMPANY_IDENTIFIER" required 
                       className="w-full bg-slate-900/50 border-white/5 rounded-2xl p-6 pl-14 outline-none font-bold text-2xl tracking-widest text-blue-400 focus:border-blue-500/50 transition-all"
                       value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                     />
                   </div>
                </motion.div>
              )}

              <button 
                 type="submit" disabled={loading} 
                 className="w-full py-8 mt-4 rounded-2xl bg-white text-black font-[1000] text-3xl hover:bg-blue-600 hover:text-white transition-all shadow-4xl active:scale-95 disabled:opacity-50 uppercase tracking-widest flex items-center justify-center gap-4"
              >
                 {loading ? 'Initializing...' : 'Commit Protocol'} <CheckCircle2 size={24} strokeWidth={4} />
              </button>
           </div>
        </form>

        <p className="mt-16 text-center text-xs font-black uppercase tracking-widest text-slate-700">
           Existing node? <Link href="/login" className="text-blue-500 hover:text-white transition-colors">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
