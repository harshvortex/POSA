'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { History, Play, ShieldCheck, Trophy, Target, TrendingUp, Calendar, ExternalLink, Sparkles, Smile, LogOut, ArrowRight, ChevronRight } from 'lucide-react';
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

  if (loading) return <div className="p-20 text-center font-black animate-pulse">RECALLING MEMORIES...</div>;

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-12 pb-32">
       <header className="space-y-2 mb-16">
          <div className="flex items-center gap-2 text-indigo-500 font-extrabold text-xs uppercase tracking-widest pl-1 mb-2">
             <History size={14} /> Knowledge Progression
          </div>
          <h1 className="text-5xl font-[1000] tracking-tighter leading-none">Your History.</h1>
          <p className="text-zinc-500 font-medium">Every technical discussion is a step forward.</p>
      </header>

      {vivas.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {vivas.map((v) => (
            <motion.div 
               key={v.id} 
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
               className="glass-card p-12 rounded-[4rem] bg-white border border-zinc-100 shadow-2xl shadow-zinc-200/50 hover:shadow-indigo-100 transition-all flex flex-col md:flex-row justify-between items-center group relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-2 h-full bg-zinc-900 group-hover:bg-indigo-600 transition-all" />
               <div className="flex gap-10 items-center flex-1">
                 <div className="w-20 h-20 rounded-[2.5rem] bg-indigo-50 border border-indigo-100 flex flex-col items-center justify-center text-center shadow-inner group-hover:scale-105 transition-transform">
                   <div className="text-2xl font-[1000] text-indigo-700 leading-none">{new Date(v.createdAt).getDate()}</div>
                   <div className="text-[10px] font-black uppercase text-indigo-400">{new Date(v.createdAt).toLocaleString('default', { month: 'short' })}</div>
                 </div>
                 <div>
                    <h3 className="text-3xl font-[1000] tracking-tight group-hover:text-indigo-600 transition-colors">{v.topic}</h3>
                    <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mt-2">{v.status === 'COMPLETED' ? 'Verified Session' : 'Ongoing'}</p>
                 </div>
               </div>

               <div className="flex items-center gap-12 w-full md:w-auto border-t md:border-t-0 md:border-l border-zinc-50 pt-8 md:pt-0 md:pl-12 mt-8 md:mt-0">
                  <div className="text-center group-hover:scale-110 transition-transform">
                     <div className="text-5xl font-[1000] tracking-tighter text-zinc-900">{v.score || '---'}</div>
                     <div className="text-[10px] font-black uppercase text-indigo-600 tracking-widest mt-1">Index Score</div>
                  </div>
                  <button className="w-16 h-16 rounded-[2rem] bg-zinc-900 text-white flex items-center justify-center hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 group-hover:translate-x-2">
                    <ChevronRight size={24} strokeWidth={3} />
                  </button>
               </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-48 text-center glass-card rounded-[4.5rem] bg-zinc-50 border-dashed border-zinc-200">
           <Smile size={60} className="text-zinc-200 mx-auto mb-6" />
           <p className="text-zinc-400 font-bold text-xl tracking-tight">Your technical story hasn't started yet.</p>
           <button onClick={() => router.push('/candidate/viva/new')} className="mt-8 px-10 py-5 rounded-[2rem] bg-zinc-900 text-white font-[1000] text-lg hover:bg-indigo-600 transition-all shadow-xl">Start Your First Viva</button>
        </div>
      )}
    </div>
  );
}
