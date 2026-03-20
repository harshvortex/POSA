'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Target, Play, ArrowRight, Github, Zap, Shield, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/10 overflow-x-hidden font-sans">
      <div className="mesh-glow" />
      
      {/* Shadcn Optimized Navbar */}
      <nav className={`fixed top-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[900px] z-[200] transition-all duration-700 rounded-2xl ${scrolled ? 'bg-background/80 backdrop-blur-3xl shadow-lg py-4 border' : 'bg-transparent py-8 border-transparent'}`}>
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/10">
               <ShieldCheck size={18} strokeWidth={2.5} />
             </div>
             <span className="text-xl font-bold tracking-tight">PoSA</span>
          </div>
          
          <div className="hidden lg:flex gap-8 text-xs font-semibold text-muted-foreground">
             <Link href="#how" className="hover:text-foreground transition-colors">Platform</Link>
             <Link href="#how" className="hover:text-foreground transition-colors">Verification</Link>
             <Link href="#how" className="hover:text-foreground transition-colors">API</Link>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Portal</Link>
            </Button>
            <Button variant="default" size="sm" asChild className="shadow-lg shadow-primary/20">
              <Link href="/register">Join Protocol</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-8 pt-64 pb-48 relative z-10 text-center flex flex-col items-center">
         <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8"
         >
            <Badge variant="secondary" className="px-4 py-1.5 rounded-full font-bold text-[10px] tracking-widest uppercase">
               Next-Gen Skill Validation
            </Badge>
         </motion.div>
         
         <motion.h1 
           initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.05] mb-12 max-w-4xl"
         >
           Verified <span className="text-primary italic">Intelligence</span> for the Modern Era.
         </motion.h1>
         
         <motion.p 
           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
           className="text-xl md:text-[1.35rem] text-muted-foreground leading-relaxed max-w-2xl font-medium mb-16 tracking-tight"
         >
           PoSA utilizes Python-driven LLM analysis (Llama-3) to transform your GitHub repositories into a high-trust technical identity.
         </motion.p>
         
         <div className="flex flex-wrap justify-center gap-6 mb-48">
            <Button size="lg" asChild className="h-14 px-10 text-lg font-bold group">
               <Link href="/register" className="flex items-center gap-3">
                  Connect GitHub <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="h-14 px-10 text-lg font-bold">
              <Link href="/login">Recruiter Hub</Link>
            </Button>
         </div>

         {/* Bento Grid with Shadcn Cards */}
         <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-6xl">
            <Card className="md:col-span-8 flex flex-col justify-between hover:shadow-xl transition-all h-[400px]">
               <CardHeader className="p-12 pb-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                     <Cpu size={24} />
                  </div>
                  <CardTitle className="text-4xl font-bold tracking-tight">Repo DNA Ingestion</CardTitle>
                  <CardDescription className="text-lg leading-relaxed mt-4">Deep analysis of logic, security, and scalability patterns within your cluster. Not just commit counts—real architectural insight.</CardDescription>
               </CardHeader>
               <div className="p-12 pt-0 flex justify-end">
                  <ArrowRight className="text-muted-foreground/30" />
               </div>
            </Card>

            <Card className="md:col-span-4 flex flex-col justify-between hover:shadow-xl transition-all h-[400px]">
               <CardHeader className="p-12 pb-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 text-emerald-500">
                     <Zap size={24} fill="currentColor" />
                  </div>
                  <CardTitle className="text-4xl font-bold tracking-tight">Live Viva</CardTitle>
                  <CardDescription className="text-lg leading-relaxed mt-4">AI-Interrogated verification of your true coding capabilities.</CardDescription>
               </CardHeader>
               <div className="p-12 pt-0 flex justify-end">
                  <ArrowRight className="text-muted-foreground/30" />
               </div>
            </Card>

            <Card className="md:col-span-4 flex flex-col justify-between hover:shadow-xl transition-all h-[400px]">
               <CardHeader className="p-12 pb-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 text-blue-500">
                     <Target size={24} />
                  </div>
                  <CardTitle className="text-4xl font-bold tracking-tight">Market Fit</CardTitle>
                  <CardDescription className="text-lg leading-relaxed mt-4">Alignment with top roles using weighted genetic skill mapping.</CardDescription>
               </CardHeader>
               <div className="p-12 pt-0 flex justify-end">
                  <ArrowRight className="text-muted-foreground/30" />
               </div>
            </Card>

            <Card className="md:col-span-8 flex flex-col justify-between hover:shadow-xl transition-all h-[400px]">
               <CardHeader className="p-12 pb-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                     <Sparkles size={24} />
                  </div>
                  <CardTitle className="text-4xl font-bold tracking-tight">AI Identity Hub</CardTitle>
                  <CardDescription className="text-lg leading-relaxed mt-4">A unified, tamper-proof professional node built on Python + LLM intelligence. Forget legacy resumes—your code is your authority.</CardDescription>
               </CardHeader>
               <div className="p-12 pt-0 flex justify-end">
                  <ArrowRight className="text-muted-foreground/30" />
               </div>
            </Card>
         </div>
      </main>

      <footer className="py-24 text-center border-t bg-muted/30">
         <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">&copy; 2026 PoSA &bull; POWERED BY PYTHON & SHADCN UI</div>
      </footer>
    </div>
  );
}
