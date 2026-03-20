'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Github, Play, ShieldCheck, Trophy, Target, TrendingUp, Calendar, ExternalLink, Sparkles, Smile, LogOut, ArrowRight } from 'lucide-react';
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const connectGitHub = async () => {
    if (!ghUser) return;
    setAnalyzing(true);
    try {
      await api.post('/candidate/github/connect', { githubUsername: ghUser });
      fetchDashboard();
    } catch (err) {
      alert('Failed to connect GitHub');
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-zinc-50 font-black text-zinc-300">Syncing DNA...</div>;

  return (
    <div className="min-h-screen bg-zinc-50/30 p-8 max-w-7xl mx-auto pt-24 text-zinc-900 pb-32">
      <div className="hero-glow opacity-10" />
      
      <header className="flex justify-between items-start mb-16 px-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-rose-500 font-black text-xs uppercase tracking-widest pl-1">
             <Smile size={14} /> Personalized Workspace
          </div>
          <h1 className="text-5xl font-[1000] tracking-tighter leading-none">Hello, {user?.name.split(' ')[0]}.</h1>
          <p className="text-zinc-500 font-medium">Your technical identity is evolving.</p>
        </div>
        <button onClick={() => { localStorage.clear(); router.push('/'); }} className="p-4 rounded-2xl bg-white border border-zinc-100 text-zinc-400 hover:text-rose-500 transition-all shadow-sm">
           <LogOut size={20} />
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
        {/* Left: Skill Identity Card */}
        <div className="lg:col-span-2 glass-card p-12 rounded-[4rem] bg-white border-white shadow-2xl shadow-zinc-200/50">
          <div className="flex justify-between items-start mb-10">
             <div className="w-16 h-16 rounded-[2rem] bg-indigo-50 flex items-center justify-center border border-indigo-100">
               <Github className="text-indigo-600" size={32} />
             </div>
             {!profile && <span className="px-4 py-2 rounded-xl bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest border border-orange-100">Not Connected</span>}
          </div>
          
          <h2 className="text-3xl font-[900] mb-2 tracking-tight">Technical Identity.</h2>
          
          {!profile ? (
            <div className="mt-8">
              <p className="text-zinc-500 mb-8 max-w-md font-medium leading-relaxed">Connect your GitHub to let our AI build your professional Skill DNA and start your journey.</p>
              <div className="flex flex-col md:flex-row gap-3">
                <input 
                  type="text" 
                  placeholder="github-username"
                  className="bg-zinc-50 border-zinc-100 rounded-[2rem] px-8 py-5 outline-none focus:ring-4 focus:ring-indigo-100/50 transition-all font-bold text-lg flex-1"
                  value={ghUser} onChange={(e) => setGhUser(e.target.value)}
                />
                <button 
                  onClick={connectGitHub} disabled={analyzing}
                  className="px-10 py-5 rounded-[2rem] bg-zinc-900 text-white font-[1000] text-xl hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-50"
                >
                  {analyzing ? 'Analyzing...' : 'Begin Analysis'}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-12 space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <IdentityStat icon={<ShieldCheck className="text-indigo-500" />} label="Overall Index" value={profile.skillScore} />
                 <IdentityStat icon={<Target className="text-rose-500" />} label="Market Fit" value={profile.jobFitScore} />
                 <IdentityStat icon={<TrendingUp className="text-emerald-500" />} label="Momentum" value={profile.growthScore} />
               </div>

               <div className="flex flex-col md:flex-row gap-12">
                 <div className="flex-1 space-y-4">
                    <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">Professional Story</h3>
                    <div className="p-8 rounded-[3rem] bg-indigo-50/50 border border-indigo-100/50 italic text-indigo-900 font-medium text-lg leading-relaxed relative">
                       <Sparkles className="absolute -top-3 -right-3 text-indigo-400" />
                       "{profile.summary || 'Your repositories indicate a strong grasp of modern engineering principles.'}"
                    </div>
                 </div>

                 <div className="w-full md:w-64 space-y-6">
                    <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1">Genetic Markup</h3>
                    <div className="space-y-4">
                       {Object.entries(JSON.parse(profile.skillDna || '{}')).slice(0, 5).map(([skill, pct]: any) => (
                         <div key={skill} className="space-y-2">
                           <div className="flex justify-between text-[10px] font-black uppercase text-zinc-600 px-1">
                             <span>{skill}</span>
                             <span className="text-indigo-600">{pct}%</span>
                           </div>
                           <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                             <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full bg-zinc-900 rounded-full" />
                           </div>
                         </div>
                       ))}
                    </div>
                 </div>
               </div>
            </div>
          )}
        </div>

        {/* Right: Personal Viva Card */}
        <div className="glass-card p-12 rounded-[4rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-200 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
             <Trophy size={200} strokeWidth={1} />
          </div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-[2rem] bg-white/10 flex items-center justify-center mb-10 shadow-inner backdrop-blur-md">
              <Play className="text-white fill-current w-6 h-6" />
            </div>
            <h2 className="text-4xl font-[1000] mb-4 tracking-tighter leading-none">Verify your depth.</h2>
            <p className="text-white/80 text-lg font-medium leading-relaxed mb-12">
              Ready for a friendly technical conversation? Let the AI explore your knowledge.
            </p>
          </div>
          
          <button 
            onClick={() => router.push('/candidate/viva/new')}
            className="w-full py-6 rounded-3xl bg-white text-indigo-600 font-[1000] text-xl hover:scale-[1.03] active:scale-95 transition-all shadow-2xl shadow-black/10 relative z-10"
          >
            Start Fresh Session
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-10 px-4">
        <h2 className="text-3xl font-[1000] tracking-tighter">Timeline</h2>
        <div className="h-[2px] flex-1 bg-zinc-100" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
        {vivas.length > 0 ? vivas.map((v) => (
          <div key={v.id} className="glass-card p-10 rounded-[3.5rem] bg-white border-zinc-100 hover:border-indigo-100 transition-all hover:shadow-2xl hover:shadow-indigo-100/50">
            <div className="flex justify-between items-center mb-8">
              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${v.status === 'COMPLETED' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}>
                {v.status}
              </span>
              <span className="text-sm font-black text-zinc-300">#{v.id}</span>
            </div>
            <h3 className="text-2xl font-black mb-1 hover:text-indigo-600 transition-colors pointer-events-none">{v.topic}</h3>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mb-10">{new Date(v.createdAt).toLocaleDateString()}</p>
            
            <div className="flex justify-between items-end">
              <div>
                <span className="text-4xl font-black tracking-tighter text-zinc-900">{v.score || '---'}</span>
                <span className="text-[10px] text-zinc-400 uppercase block font-black pt-1">Proficiency Index</span>
              </div>
              <button className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )) : (
          <div className="md:col-span-3 py-32 text-center glass-card rounded-[4rem] border-dashed bg-white/50 border-zinc-200">
             <Smile size={60} className="text-zinc-200 mx-auto mb-6" />
             <p className="text-zinc-400 font-bold text-xl tracking-tight">Your timeline is ready for its first story.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function IdentityStat({ icon, label, value }: any) {
  return (
    <div className="bg-zinc-50/50 border border-zinc-100/80 p-8 rounded-[2.5rem] hover:bg-white transition-all shadow-sm">
      <div className="mb-6">{icon}</div>
      <div className="text-4xl font-[1000] mb-1 tracking-tighter text-zinc-800">{value ? Math.round(value) : '--'}</div>
      <div className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">{label}</div>
    </div>
  );
}
