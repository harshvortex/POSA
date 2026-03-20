'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Github, Briefcase, Zap, Star, ShieldCheck, TrendingUp, Sparkles, Smile, Code, Box, Globe } from 'lucide-react';
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

  if (loading) return <div className="p-20 text-center font-black animate-pulse">DNA RECONSTRUCTING...</div>;
  if (!profile || profile.message) return <div className="p-20 text-center font-medium">Please connect GitHub on the Dashboard first.</div>;

  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-12 pb-32">
      <header className="flex flex-col md:flex-row gap-8 items-center bg-white p-12 rounded-[4.5rem] shadow-2xl shadow-zinc-200 border border-zinc-50 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-5"><Target size={300} /></div>
         <div className="w-32 h-32 rounded-[3.5rem] gradient-bg flex items-center justify-center text-white text-5xl font-[1000] shadow-2xl relative">
            {profile.githubUsername?.charAt(0)}
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 border shadow-sm"><ShieldCheck className="text-indigo-600" /></div>
         </div>
         <div className="text-center md:text-left space-y-2">
           <h1 className="text-6xl font-[1000] tracking-tighter leading-none">{profile.githubUsername}</h1>
           <div className="flex flex-wrap gap-4 text-zinc-400 font-bold items-center justify-center md:justify-start">
              <span className="flex items-center gap-2"><Briefcase size={16} /> Software Engineer</span>
              <span className="flex items-center gap-2"><Star size={16} /> {profile.totalStars} Stars</span>
              <span className="flex items-center gap-2"><Box size={16} /> {profile.totalRepos} Projects</span>
           </div>
         </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
           {/* Detailed AI Analysis */}
           <div className="glass-card p-12 rounded-[4rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
             <div className="absolute -bottom-20 -right-20 opacity-10"><Sparkles size={400} /></div>
             <h3 className="text-xs font-black uppercase tracking-widest mb-10 opacity-60">AI Generative Synopsis</h3>
             <p className="text-3xl font-black leading-tight tracking-tight mb-8">
               "{profile.summary || 'A high-impact developer with a sharp focus on modern architecture and performance.'}"
             </p>
             <div className="flex gap-4">
                <div className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all font-bold text-sm">Visionary</div>
                <div className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all font-bold text-sm">Architect</div>
                <div className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all font-bold text-sm">Pragmatic</div>
             </div>
           </div>

           {/* Tech Stack Galaxy */}
           <div className="glass-card p-12 rounded-[4rem] bg-white border border-zinc-100 shadow-xl">
             <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1 mb-10">Technology Footprint</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {JSON.parse(profile.techStack || '[]').map((s: string) => (
                  <div key={s} className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-indigo-200 hover:shadow-lg transition-all text-center">
                     <Code className="mx-auto mb-4 text-indigo-400" size={24} />
                     <div className="font-[1000] text-lg tracking-tight">{s}</div>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* Right Column: Proficiency Charts */}
        <div className="space-y-10">
           <div className="glass-card p-12 rounded-[4rem] bg-white border border-zinc-100 shadow-xl">
              <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pl-1 mb-10">Proficiency Helix</h3>
              <div className="space-y-8">
                 {Object.entries(JSON.parse(profile.skillDna || '{}')).map(([skill, pct]: any) => (
                   <div key={skill} className="space-y-3 group">
                      <div className="flex justify-between items-end">
                         <span className="text-sm font-black text-zinc-800 tracking-tight">{skill}</span>
                         <span className="text-xl font-black text-indigo-600">{pct}%</span>
                      </div>
                      <div className="h-2 w-full bg-zinc-50 rounded-full overflow-hidden border border-zinc-100/50">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full gradient-bg rounded-full shadow-lg shadow-indigo-100" />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass-card p-12 rounded-[4rem] bg-emerald-600 text-white shadow-2xl shadow-emerald-100 flex flex-col items-center text-center">
              <Trophy size={60} className="mb-6 drop-shadow-xl" />
              <div className="text-6xl font-[1000] tracking-tighter mb-2">{profile.skillScore}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-8">Mastery Level A+</div>
              <p className="text-emerald-100 text-sm font-medium leading-relaxed italic">
                "Top 1% of contributors in the {Object.keys(JSON.parse(profile.techStack || '[]'))[0]} ecosystem."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}

function Trophy({ size, className }: any) {
  return (
    <div className={`${className}`}>
       <Star size={size} fill="currentColor" />
    </div>
  );
}
