'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { History, Play, ShieldCheck, Trophy, Target, TrendingUp, Calendar, ExternalLink, Sparkles, Smile, LogOut, ArrowRight, ChevronRight, Activity, Terminal, Shield } from 'lucide-react';
import api from '@/lib/api';

export default function HistoryPage() {
  const [vivas, setVivas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await api.get('/candidate/viva/history');
      setVivas(data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center p-20 font-[1000] text-blue-500 animate-pulse text-4xl uppercase tracking-[0.4em]">Querying Archive Logs...</div>;

  return (
    <div className="p-12 lg:p-20 max-w-7xl mx-auto space-y-16 pb-48 relative z-20">
       <header className="space-y-4 mb-20 relative">
          <div className="absolute top-0 right-0 p-12 opacity-5"><Activity size={200} strokeWidth={0.5} /></div>
          <div className="flex items-center gap-3 text-emerald-500 font-extrabold text-[10px] uppercase tracking-[0.6em] pl-1 relative">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse absolute -left-4" />
             Archived Knowledge Strings
          </div>
          <h1 className="text-7xl font-[1000] tracking-tighter leading-none glow-text">Identity Logs.</h1>
          <p className="text-slate-500 font-bold text-xl tracking-tight">Your historical technical footprint across all verification cycles.</p>
      </header>

      {vivas.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {vivas.map((v) => (
            <motion.div 
               key={v.id} 
               initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
               className="cyber-card p-14 group transition-all relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 shadow-[0_0_15px_blue] opacity-50 group-hover:opacity-100 transition-opacity" />
               <div className="flex gap-10 items-center flex-1">
                 <div className="w-24 h-24 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex flex-col items-center justify-center text-center shadow-inner group-hover:scale-110 group-hover:border-blue-500 transition-all">
                   <div className="text-3xl font-[1000] text-blue-400 group-hover:glow-text leading-none">{new Date(v.createdAt).getDate()}</div>
                   <div className="text-[10px] font-black uppercase text-blue-500 tracking-widest mt-1">{new Date(v.createdAt).toLocaleString('default', { month: 'short' })}</div>
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-4xl font-[1000] tracking-tighter glow-text uppercase leading-none">{v.topic}</h3>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{v.status === 'COMPLETED' ? 'Validated Cycle' : 'Incomplete Process'}</p>
                 </div>
               </div>

               <div className="flex items-center gap-12 w-full md:w-auto border-t border-white/5 pt-12 mt-12 md:mt-16 group-hover:bg-white/[0.02] transition-colors rounded-3xl p-6">
                  <div className="text-center flex-1 group-hover:scale-105 transition-transform">
                     <div className="text-7xl font-[1000] tracking-tighter text-white glow-text">{v.score || '---'}</div>
                     <div className="text-[9px] font-black uppercase text-emerald-500 tracking-[0.4em] mt-2">Verification Index</div>
                  </div>
                  <button className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/20 active:scale-90 transition-all group-hover:translate-x-3">
                    <ChevronRight size={32} strokeWidth={3} />
                  </button>
               </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-64 text-center cyber-card border-dashed border-white/5 group">
           <Shield size={100} className="text-slate-800 mx-auto mb-10 group-hover:text-blue-500 transition-all duration-1000" strokeWidth={0.5} />
           <p className="text-slate-600 font-black text-3xl tracking-tight uppercase opacity-50 mb-12">Historical Archive Uninitialized.</p>
           <button onClick={() => router.push('/candidate/viva/new')} className="px-12 py-6 rounded-2xl bg-white text-black font-[1000] text-2xl hover:bg-blue-600 hover:text-white transition-all shadow-4xl active:scale-95 uppercase tracking-widest">Start Verification Flow</button>
        </div>
      )}
    </div>
  );
}
