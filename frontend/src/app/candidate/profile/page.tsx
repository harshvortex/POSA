'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Github, Briefcase, Zap, Star, ShieldCheck, TrendingUp, Sparkles, Smile, Code, Box, Globe, Shield, Activity, BarChart3, ChevronRight, X } from 'lucide-react';
import api from '@/lib/api';

export default function CandidateProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/candidate/profile');
      setProfile(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  if (loading) return <div className="p-20 text-center font-[1000] text-blue-500 animate-pulse text-4xl uppercase tracking-[0.5em]">Deconstructing DNA...</div>;
  if (!profile || profile.message) return <div className="p-20 text-center font-black text-slate-500 uppercase tracking-widest text-xl cyber-card mx-auto max-w-2xl mt-48">Please sync GitHub from the Protocol Hub first.</div>;

  return (
    <div className="p-12 lg:p-20 max-w-7xl mx-auto space-y-16 pb-48 relative z-20">
      <header className="flex flex-col md:flex-row gap-12 items-center cyber-card p-16 md:p-20 shadow-4xl border-white/5 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:scale-125 transition-transform"><Shield size={400} strokeWidth={0.5} /></div>
         <div className="w-40 h-40 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-7xl font-[1000] shadow-[0_0_50px_rgba(59,130,246,0.2)] relative group-hover:rotate-6 transition-all">
            {profile.githubUsername?.charAt(0)}
            <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-[#020617] rounded-full flex items-center justify-center border-4 border-slate-900 shadow-2xl"><ShieldCheck className="text-emerald-500" size={32} strokeWidth={3} /></div>
         </div>
         <div className="text-center md:text-left space-y-4">
           <h1 className="text-7xl font-[1000] tracking-tighter leading-none glow-text">{profile.githubUsername}</h1>
           <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 items-center justify-center md:justify-start">
              <span className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5"><Briefcase size={16} /> Software Entity</span>
              <span className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5 text-blue-400"><Star size={16} fill="currentColor" /> {profile.totalStars} Gravity</span>
              <span className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5 text-emerald-400"><Box size={16} /> {profile.totalRepos} Clusters</span>
           </div>
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
           {/* Detailed AI Analysis */}
           <div className="cyber-card p-16 bg-blue-600 text-white shadow-[0_0_60px_rgba(37,99,235,0.2)] border-blue-400 group overflow-hidden">
             <div className="absolute -bottom-20 -right-20 opacity-10 group-hover:scale-110 transition-transform"><Sparkles size={400} /></div>
             <h3 className="text-[10px] font-black uppercase tracking-[0.6em] mb-12 opacity-60">Neural Evaluation Bio</h3>
             <p className="text-4xl font-[1000] leading-tight tracking-tight mb-12 italic">
               "{profile.summary || 'Executing real-time analysis on code clusters...'}"
             </p>
             <div className="flex gap-4">
                <Tag label="Visionary" />
                <Tag label="Secure" />
                <Tag label="Linear" />
             </div>
           </div>

           {/* Tech Stack Galaxy */}
           <div className="cyber-card p-16 space-y-12">
             <h3 className="text-[10px] uppercase font-black tracking-[0.6em] text-slate-600 pl-1">Technical Footprint Portfolio</h3>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {JSON.parse(profile.techStack || '[]').map((s: string) => (
                  <div key={s} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all text-center group">
                     <Code className="mx-auto mb-6 text-blue-500 group-hover:scale-110 transition-transform" size={32} />
                     <div className="font-black text-xl uppercase tracking-widest">{s}</div>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* Right Column: Proficiency Charts */}
        <div className="space-y-12">
           <div className="cyber-card p-16 space-y-12">
              <h3 className="text-[10px] uppercase font-black tracking-[0.6em] text-slate-600 pl-1">Genetic Skill Helix</h3>
              <div className="space-y-10">
                 {Object.entries(JSON.parse(profile.skillDna || '{}')).map(([skill, pct]: any) => (
                   <div key={skill} className="space-y-4">
                      <div className="flex justify-between items-end px-1">
                         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{skill}</span>
                         <span className="text-2xl font-[1000] text-blue-500 glow-text">{pct}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-px">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="cyber-card p-16 text-center group bg-slate-900/40">
              <Trophy size={80} className="mb-8 text-blue-500 mx-auto drop-shadow-2xl group-hover:scale-110 transition-transform" />
              <div className="text-7xl font-[1000] tracking-tighter mb-4 glow-text">{profile.skillScore ? Math.round(profile.skillScore) : '---'}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 mb-12">Proficiency Node Index</div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-xs font-black uppercase tracking-widest text-emerald-400">Status: Optimized</div>
           </div>
        </div>
      </div>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return <div className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-black text-[10px] uppercase tracking-widest border border-white/10">{label}</div>;
}

function Trophy({ size, className }: any) {
  return (
    <div className={`${className}`}>
       <Shield size={size} strokeWidth={2.5} />
    </div>
  );
}
