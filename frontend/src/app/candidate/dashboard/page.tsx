'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Github, Play, ShieldCheck, Trophy, Target, TrendingUp, Calendar, ExternalLink, Sparkles, Smile, LogOut, ArrowRight, Shield, Cpu, Activity, User } from 'lucide-react';
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

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#020617] font-black text-slate-800 animate-pulse text-4xl uppercase tracking-[0.4em]">Deciphering Protocol...</div>;

  return (
    <div className="min-h-screen bg-transparent p-10 lg:p-16 max-w-7xl mx-auto pt-28 text-slate-100 flex flex-col gap-16 pb-40 relative z-20">
      <header className="flex flex-col md:flex-row justify-between items-start gap-12 mb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-blue-500 font-extrabold text-[10px] uppercase tracking-[0.6em] pl-1 relative">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping absolute -left-4" />
             Authenticated Profile Node
          </div>
          <h1 className="text-7xl font-[1000] tracking-tighter leading-none glow-text">Access granted, <span className="italic">{user?.name.split(' ')[0]}.</span></h1>
          <p className="text-slate-500 font-bold text-xl tracking-tight">Your technical genetic code is live.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Card */}
        <div className="lg:col-span-2 cyber-card p-16 space-y-16">
          <div className="flex justify-between items-start">
             <div className="w-20 h-20 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
               <Github size={42} strokeWidth={2.5} />
             </div>
             {!profile && <span className="px-5 py-2 rounded-xl bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-[0.4em] border border-rose-500/20">Offline Protocol</span>}
             {profile && <span className="px-5 py-2 rounded-xl bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] border border-emerald-500/20">Node Synchronized</span>}
          </div>
          
          <div>
            <h2 className="text-5xl font-[1000] mb-4 tracking-tighter glow-text">Identity Protocol.</h2>
            {!profile ? (
              <div className="space-y-10">
                <p className="text-slate-500 text-xl font-bold leading-relaxed max-w-xl">Initialize your technical DNA by connecting your GitHub repository network. Metadata analysis will begin immediately.</p>
                <div className="flex flex-col md:flex-row gap-4">
                  <input 
                    type="text" placeholder="USER_NODE_HANDLE"
                    className="bg-slate-900/50 border-white/5 rounded-2xl p-6 outline-none font-bold text-2xl flex-1 tracking-widest text-blue-400"
                    value={ghUser} onChange={(e) => setGhUser(e.target.value)}
                  />
                  <button onClick={connectGitHub} disabled={analyzing} className="px-12 py-6 rounded-2xl bg-white text-black font-[1000] text-2xl hover:bg-blue-600 hover:text-white transition-all shadow-4xl active:scale-95 disabled:opacity-50">
                    {analyzing ? 'Ingesting...' : 'Sync Now'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-16">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <CyberStat icon={<Activity className="text-blue-500" />} label="Genetic Index" value={profile.skillScore} />
                   <CyberStat icon={<Target className="text-emerald-500" />} label="Market Fit" value={profile.jobFitScore} />
                   <CyberStat icon={<TrendingUp className="text-purple-500" />} label="Momentum" value={profile.growthScore} />
                 </div>

                 <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="flex-1 space-y-6">
                       <h3 className="text-[10px] uppercase font-black tracking-[0.6em] text-slate-600 pl-1">Neural Bio-Summary</h3>
                       <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 italic text-slate-300 font-bold text-lg leading-relaxed relative group overflow-hidden">
                          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><Sparkles size={180} /></div>
                          "{profile.summary || 'Incomplete protocol. Synchronize GitHub to generate Gen-3 AI synopsis.'}"
                       </div>
                    </div>
                    <div className="w-full md:w-64 space-y-8">
                       <h3 className="text-[10px] uppercase font-black tracking-[0.6em] text-slate-600 pl-1">Genetic Components</h3>
                       <div className="space-y-6">
                         {Object.entries(JSON.parse(profile.skillDna || '{}')).slice(0, 5).map(([skill, pct]: any) => (
                           <div key={skill} className="space-y-3">
                              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest px-1">
                                <span className="text-slate-500">{skill}</span>
                                <span className="text-blue-500">{pct}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-px">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
                              </div>
                           </div>
                         ))}
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Start Interview Card */}
        <div className="cyber-card p-16 bg-blue-600 text-white shadow-[0_0_100px_rgba(37,99,235,0.2)] flex flex-col justify-between group overflow-hidden">
           <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-1000"><Shield size={300} strokeWidth={0.5} /></div>
           <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-12 shadow-2xl">
                 <Play size={32} fill="currentColor" />
              </div>
              <h2 className="text-6xl font-[1000] mb-6 tracking-tighter leading-none">Interrogate <br/> Your Skills.</h2>
              <p className="text-white/60 text-xl font-bold leading-relaxed mb-12 max-w-xs">
                Enter the high-fidelity technical interrogation node to verify your real-world architecture depth.
              </p>
           </div>
           
           <button 
             onClick={() => router.push('/candidate/viva/new')}
             className="w-full py-8 rounded-2xl bg-white text-blue-600 font-[1000] text-3xl hover:bg-black hover:text-white transition-all shadow-4xl active:scale-90 relative z-10 uppercase tracking-widest"
           >
             Initialize Viva
           </button>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center gap-6 mb-12 px-2">
           <h2 className="text-5xl font-[1000] tracking-tighter glow-text">Timeline Log.</h2>
           <div className="h-px flex-1 bg-white/5 shadow-[0_0_10px_white/5]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {vivas.length > 0 ? vivas.map((v) => (
            <div key={v.id} className="cyber-card p-10 group overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-5 transition-opacity"><Activity size={100} /></div>
               <div className="flex justify-between items-center mb-10">
                  <span className={`px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border ${v.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                    {v.status}
                  </span>
                  <span className="text-xs font-[1000] text-slate-700 tracking-widest">ID {v.id}</span>
               </div>
               <h3 className="text-3xl font-[1000] mb-2 group-hover:text-blue-500 transition-colors uppercase tracking-widest">{v.topic}</h3>
               <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-12">{new Date(v.createdAt).toLocaleDateString()}</p>
               
               <div className="flex justify-between items-end">
                  <div>
                    <span className="text-6xl font-[1000] tracking-tighter glow-text">{v.score || '---'}</span>
                    <span className="text-[9px] text-slate-600 block font-black uppercase tracking-widest mt-1">Verification Index</span>
                  </div>
                  <button className="w-14 h-14 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                     <ArrowRight size={24} strokeWidth={3} />
                  </button>
               </div>
            </div>
          )) : (
            <div className="md:col-span-3 py-48 text-center cyber-card border-dashed border-white/5 group">
               <Smile size={80} className="text-slate-800 mx-auto mb-8 group-hover:text-blue-500 transition-colors duration-1000" strokeWidth={1} />
               <p className="text-slate-500 font-black text-2xl tracking-tighter uppercase opacity-50">Protocol database empty. Begin your first session.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CyberStat({ icon, label, value }: any) {
  return (
    <div className="bg-white/[0.02] border border-white/5 p-10 rounded-3xl hover:bg-white/[0.05] transition-all hover:border-blue-500/20 group">
       <div className="mb-6 group-hover:scale-110 transition-transform">{icon}</div>
       <div className="text-6xl font-[1000] mb-2 tracking-tighter text-white glow-text">{value ? Math.round(value) : '---'}</div>
       <div className="text-[10px] uppercase font-black text-slate-600 tracking-[0.4em]">{label}</div>
    </div>
  );
}
