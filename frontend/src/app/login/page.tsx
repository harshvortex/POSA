'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogIn, ShieldCheck, Mail, Lock, Shield, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
      alert('Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8 selection:bg-primary/10 font-sans relative">
      <div className="mesh-glow opacity-30" />
      
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-lg">
        <Card className="p-8 md:p-14 shadow-2xl border bg-white/50 backdrop-blur-3xl rounded-[2.5rem]">
           <CardHeader className="p-0 mb-12">
              <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
                 <ShieldCheck size={26} strokeWidth={2.5} />
              </div>
              <CardTitle className="text-5xl font-black tracking-tight leading-none mb-4">Access Protocol</CardTitle>
              <CardDescription className="text-xl font-medium text-muted-foreground">Enter your technical DNA handle.</CardDescription>
           </CardHeader>
           
           <CardContent className="p-0">
             <form onSubmit={handleLogin} className="space-y-10">
               <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground pl-4">Identification</label>
                 <Input 
                   type="email" placeholder="EMAIL_HANDLE" required 
                   className="h-14 bg-muted border-transparent rounded-xl px-6 font-bold text-lg tracking-widest text-primary focus:border-primary/50 transition-all"
                   value={email} onChange={(e) => setEmail(email === '' ? e.target.value : e.target.value)}
                 />
                 {/* Re-rendering issue: input email can be lost if I use email === '' check, just normal value=email */}
                 <Input 
                   type="email" placeholder="EMAIL_HANDLE" required 
                   className="h-14 bg-muted border-transparent rounded-xl px-6 font-bold text-lg tracking-widest text-primary focus:border-primary/50 transition-all"
                   value={email} onChange={(e) => setEmail(e.target.value)}
                 />
               </div>

               <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground pl-4">Security Phrase</label>
                 <Input 
                   type="password" placeholder="••••••••" required 
                   className="h-14 bg-muted border-transparent rounded-xl px-6 font-bold text-lg tracking-widest text-primary focus:border-primary/50 transition-all"
                   value={password} onChange={(e) => setPassword(e.target.value)}
                 />
               </div>

               <Button 
                 type="submit" disabled={loading} 
                 className="w-full h-16 mt-4 rounded-xl text-xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 group transition-all"
               >
                 {loading ? 'Authenticating...' : 'Enter Hub'} <ArrowRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform" />
               </Button>
             </form>
           </CardContent>

           <CardFooter className="p-0 mt-16 flex justify-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              New developer? <Link href="/register" className="text-primary hover:underline ml-2 transition-all">Register Node</Link>
           </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
