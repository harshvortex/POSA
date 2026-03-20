'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Briefcase, Sparkles, Smile, ArrowLeft, Shield, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8 selection:bg-primary/10 font-sans relative">
      <div className="mesh-glow opacity-30" />
      
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-4xl">
        <Card className="p-8 md:p-14 shadow-2xl border bg-white/50 backdrop-blur-3xl rounded-[2.5rem] relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5"><UserPlus size={180} /></div>
           <CardHeader className="p-0 mb-16 flex flex-row justify-between items-start">
              <div className="space-y-6">
                 <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
                    <ShieldCheck size={26} strokeWidth={2.5} />
                 </div>
                 <CardTitle className="text-5xl font-black tracking-tight leading-none mb-4">Initialize node.</CardTitle>
                 <CardDescription className="text-xl font-medium text-muted-foreground">Sync your technical genetic identity.</CardDescription>
              </div>
              <Button variant="ghost" className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground" asChild>
                 <Link href="/">Abort</Link>
              </Button>
           </CardHeader>
           
           <CardContent className="p-0">
             <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-10">
                 <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground pl-4">Full Identity</label>
                   <Input 
                     type="text" placeholder="NAME_REAL_ENTITY" required 
                     className="h-14 bg-muted border-transparent rounded-xl px-6 font-bold text-lg tracking-widest text-primary focus:border-primary/50 transition-all"
                     value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                   />
                 </div>

                 <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground pl-4">Digital Address</label>
                   <Input 
                     type="email" placeholder="EMAIL_HANDLE" required 
                     className="h-14 bg-muted border-transparent rounded-xl px-6 font-bold text-lg tracking-widest text-primary focus:border-primary/50 transition-all"
                     value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                   />
                 </div>

                 <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground pl-4">Security Phrase</label>
                   <Input 
                     type="password" placeholder="••••••••" required 
                     className="h-14 bg-muted border-transparent rounded-xl px-6 font-bold text-lg tracking-widest text-primary focus:border-primary/50 transition-all"
                     value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                   />
                 </div>
               </div>

               <div className="space-y-10 flex flex-col justify-between">
                 <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground pl-4">Access Role</label>
                    <div className="grid grid-cols-2 gap-4">
                       <Button 
                          type="button" 
                          variant={role === 'CANDIDATE' ? "default" : "outline"}
                          className={`h-24 rounded-2xl flex flex-col items-center justify-center transition-all ${role === 'CANDIDATE' ? 'shadow-xl shadow-primary/20' : 'bg-muted border-transparent text-muted-foreground'}`}
                          onClick={() => setRole('CANDIDATE')}
                       >
                          <User size={24} className="mb-2" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Candidate</span>
                       </Button>
                       <Button 
                          type="button" 
                          variant={role === 'RECRUITER' ? "default" : "outline"}
                          className={`h-24 rounded-2xl flex flex-col items-center justify-center transition-all ${role === 'RECRUITER' ? 'shadow-xl shadow-primary/20' : 'bg-muted border-transparent text-muted-foreground'}`}
                          onClick={() => setRole('RECRUITER')}
                       >
                          <Briefcase size={24} className="mb-2" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Recruiter</span>
                       </Button>
                    </div>
                 </div>

                 {role === 'RECRUITER' && (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground pl-4">Organization Hub</label>
                       <Input 
                         type="text" placeholder="COMPANY_IDENTIFIER" required 
                         className="h-14 bg-muted border-transparent rounded-xl px-6 font-bold text-lg tracking-widest text-primary focus:border-primary/50 transition-all"
                         value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                       />
                    </motion.div>
                 )}

                 <Button 
                    type="submit" disabled={loading} 
                    className="w-full h-16 rounded-xl text-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 group transition-all"
                 >
                    {loading ? 'Initializing Interface...' : 'Commit Protocol'} <ArrowRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </div>
             </form>
           </CardContent>

           <CardFooter className="p-0 mt-16 flex justify-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Existing node? <Link href="/login" className="text-primary hover:underline ml-2 transition-all">Sign In</Link>
           </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
