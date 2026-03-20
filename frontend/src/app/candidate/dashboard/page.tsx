'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Github, Play, ShieldCheck, Trophy, Target, TrendingUp, Calendar, Zap, Activity, User, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import api from '@/lib/api';

export default function CandidateDashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [vivas, setVivas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ghUser, setGhUser] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('posa_user');
    if (!storedUser) router.push('/login');
    else {
      setUser(JSON.parse(storedUser));
      fetchDashboard();
    }
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get('/candidate/dashboard');
      setProfile(data.profile === 'not created' ? null : data.profile);
      setVivas(data.vivaSessions || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const connectGitHub = async () => {
    if (!ghUser) return;
    setAnalyzing(true);
    try {
      await api.post('/candidate/github/connect', { githubUsername: ghUser });
      fetchDashboard();
    } catch (err) { alert('Failed to connect GitHub'); }
    finally { setAnalyzing(false); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center p-20 font-bold text-muted-foreground animate-pulse text-2xl uppercase tracking-widest">Inference Hub Initializing...</div>;

  return (
    <div className="min-h-screen p-8 lg:p-12 max-w-7xl mx-auto pt-24 space-y-12 pb-40 relative z-20">
      <header className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-4">
          <Badge variant="outline" className="px-3 py-1 font-bold text-[10px] tracking-widest uppercase">
            Authed Profile Node
          </Badge>
          <h1 className="text-6xl font-black tracking-tight leading-none">Welcome, {user?.name.split(' ')[0]}</h1>
          <p className="text-muted-foreground font-medium text-lg max-w-lg">Your technical genetic code is live and ready for interrogation.</p>
        </div>
        <Button variant="outline" size="lg" className="h-12 border-muted-foreground/20 rounded-xl" onClick={() => router.push('/settings')}>
           Access Settings
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Profile Info - Bento Feature */}
        <Card className="lg:col-span-3 border p-12 hover:shadow-xl transition-all group relative overflow-hidden h-[500px] flex flex-col justify-between">
           <div className="absolute top-0 right-0 p-12 opacity-5"><Github size={200} /></div>
           <CardHeader className="p-0">
             <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20">
                  <Github size={32} strokeWidth={2.5} />
                </div>
                {!profile && <Badge variant="destructive" className="px-5 py-1.5 font-bold uppercase tracking-widest">Offline Protocol</Badge>}
                {profile && <Badge variant="secondary" className="px-5 py-1.5 font-bold uppercase tracking-widest text-blue-600 bg-blue-50">Synchronized Node</Badge>}
             </div>
             <CardTitle className="text-4xl font-bold tracking-tight mt-10">Identity Protocol</CardTitle>
             <CardDescription className="text-xl max-w-xl">Initialize your technical DNA by connecting your GitHub repository network. Python-driven analysis begins instantly.</CardDescription>
           </CardHeader>

           <CardContent className="p-0">
             {!profile ? (
                <div className="flex flex-col md:flex-row gap-4 mt-8">
                  <Input 
                    placeholder="GITHUB_ENTITY_HANDLE"
                    className="h-14 bg-muted border-transparent rounded-xl px-6 font-bold text-lg max-w-sm tracking-widest"
                    value={ghUser} onChange={(e) => setGhUser(e.target.value)}
                  />
                  <Button onClick={connectGitHub} disabled={analyzing} className="h-14 px-10 text-lg font-bold">
                    {analyzing ? 'Ingesting...' : 'Sync with Node'}
                  </Button>
                </div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t">
                   <div className="space-y-2">
                     <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Genetic Index</span>
                     <div className="text-5xl font-black text-blue-600">{Math.round(profile.skillScore)}</div>
                   </div>
                   <div className="space-y-2">
                     <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Market Fit</span>
                     <div className="text-5xl font-black">{Math.round(profile.jobFitScore)}</div>
                   </div>
                   <div className="space-y-2">
                     <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Network Gravity</span>
                     <div className="text-5xl font-black">{profile.totalStars}</div>
                   </div>
                </div>
             )}
           </CardContent>
        </Card>

        {/* Start Interview Action */}
        <Card className="lg:col-span-1 bg-black text-white hover:shadow-2xl hover:shadow-primary/20 transition-all p-12 flex flex-col justify-between group h-[500px]">
           <div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-all">
                <Play size={24} fill="currentColor" />
              </div>
              <CardTitle className="text-4xl font-black tracking-tight leading-tight">Interrogate Skills.</CardTitle>
              <CardDescription className="text-white/40 text-lg font-medium leading-relaxed mt-4">
                Enter the interrogation node to verify your real-world architecture depth.
              </CardDescription>
           </div>
           <Button variant="outline" size="lg" className="w-full h-14 rounded-xl bg-white text-black font-black border-transparent hover:bg-primary hover:text-white" onClick={() => router.push('/candidate/viva/new')}>
             Enter Viva <ArrowRight className="ml-2" size={18} />
           </Button>
        </Card>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
           <h2 className="text-3xl font-bold tracking-tight">Timeline Log</h2>
           <div className="h-px flex-1 bg-muted" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vivas.length > 0 ? vivas.map((v) => (
            <Card key={v.id} className="p-10 border hover:shadow-lg transition-all flex flex-col justify-between h-[320px]">
               <div>
                  <div className="flex justify-between items-center mb-6">
                    <Badge variant={v.status === 'COMPLETED' ? "secondary" : "outline"} className="px-4 py-1 text-[9px] font-black uppercase tracking-widest">
                       {v.status}
                    </Badge>
                    <span className="text-[10px] font-bold text-gray-300 uppercase underline decoration-gray-100 decoration-2 underline-offset-4">ID {v.id}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase">{v.topic}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{new Date(v.createdAt).toLocaleDateString()}</p>
               </div>
               
               <div className="flex justify-between items-end">
                  <div className="space-y-1">
                     <span className="text-[9px] text-gray-400 block font-bold uppercase tracking-widest">Verification Index</span>
                     <span className="text-5xl font-black text-blue-600">{v.score || '--'}</span>
                  </div>
                  <Button size="icon" variant="ghost" className="w-12 h-12 rounded-xl border-gray-100 hover:bg-gray-50 border">
                     <ArrowRight size={20} />
                  </Button>
               </div>
            </Card>
          )) : (
            <Card className="md:col-span-3 py-48 text-center border-dashed group">
               <Sparkles size={64} className="text-gray-200 mx-auto mb-6 group-hover:text-primary transition-all duration-700" strokeWidth={1} />
               <p className="text-gray-400 font-bold text-xl tracking-tight uppercase opacity-50">Historical logs are uninitialized. Begin your first protocol.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
