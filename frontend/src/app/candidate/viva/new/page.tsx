'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Send, ShieldCheck, Trophy, ArrowRight, Zap, Target, Sparkles, Smile, ArrowLeft, Shield, Activity, Terminal, AlertTriangle, Fingerprint } from 'lucide-react';
import api from '@/lib/api';

export default function NewViva() {
  const [topic, setTopic] = useState('Full Stack Java Development');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [evalResult, setEvalResult] = useState<any>(null);
  const router = useRouter();

  const startViva = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/candidate/viva/start', { topic });
      setSession(data);
      setAnswers(new Array(data.questions.length).fill(''));
    } catch (err) { alert('Failed to start session'); }
    finally { setLoading(false); }
  };

  const submitViva = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/candidate/viva/${session.sessionId}/submit`, { answers });
      setEvalResult(data.evaluation);
    } catch (err) { alert('Failed to submit session'); }
    finally { setLoading(false); }
  };

  if (evalResult) {
    return (
      <div className="min-h-screen py-24 px-8 max-w-5xl mx-auto flex flex-col items-center bg-[#020617] relative z-20">
        <div className="gradient-mesh opacity-20" />
        <div className="scan-line" />
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="cyber-card p-16 md:p-24 w-full bg-[#020617]/50 backdrop-blur-3xl border-emerald-500/20 shadow-[0_0_100px_rgba(16,185,129,0.1)] text-center relative overflow-hidden">
           <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500 shadow-[0_0_20px_emerald]" />
           <div className="w-32 h-32 rounded-full border-4 border-emerald-500/20 flex items-center justify-center mx-auto mb-12 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
              <Trophy size={64} className="text-emerald-500 drop-shadow-[0_0_10px_emerald]" />
           </div>
           
           <h1 className="text-6xl font-[1000] mb-8 tracking-tighter glow-text uppercase">Transcript Validated.</h1>
           <p className="text-slate-500 font-bold mb-16 text-xl tracking-tight uppercase tracking-[0.2em] opacity-50">Genetic proficiency node synchronized with cloud archive.</p>
           
           <div className="flex flex-col md:flex-row gap-12 mb-20">
              <div className="flex-1 p-12 bg-white/5 rounded-3xl border border-white/5 group hover:border-blue-500/30 transition-all">
                 <div className="text-[10px] font-black uppercase text-blue-500 tracking-[0.4em] mb-4">Verification Score</div>
                 <div className="text-8xl font-[1000] tracking-tighter glow-text text-white">{evalResult.score}</div>
              </div>
              <div className="flex-1 p-12 bg-white/5 rounded-3xl border border-white/5 text-left relative group hover:border-emerald-500/30 transition-all">
                 <Sparkles className="absolute -top-4 -right-4 text-emerald-500 opacity-20 group-hover:opacity-40 transition-opacity" size={100} />
                 <h3 className="text-xs font-black uppercase text-emerald-500 tracking-[0.2em] mb-6">AI Feedback Transcript</h3>
                 <p className="text-slate-300 font-bold leading-relaxed text-lg italic">"{evalResult.feedback}"</p>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 text-left">
              <div className="p-10 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                 <h4 className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.3em] mb-6 flex items-center gap-2"><ShieldCheck size={14} /> Core Vector Strengths</h4>
                 <ul className="space-y-4">
                   {evalResult.strengths.map((s: string) => <li key={s} className="flex gap-4 items-center font-bold text-slate-100 text-sm italic"> <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> {s}</li>)}
                 </ul>
              </div>
              <div className="p-10 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-center">
                 <p className="text-blue-400 font-black text-xs uppercase tracking-widest leading-relaxed">System confidence index: 98.4% <br/> High-Intelligence assessment complete.</p>
              </div>
           </div>

           <button onClick={() => router.push('/candidate/dashboard')} className="px-16 py-8 rounded-2xl bg-white text-black font-[1000] text-2xl hover:bg-blue-600 hover:text-white transition-all shadow-4xl active:scale-95 uppercase tracking-widest">
            Commit to DNA
           </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center py-20 px-8 bg-[#020617] text-white selection:bg-blue-600/30 font-sans overflow-hidden">
      <div className="gradient-mesh opacity-20" />
      <div className="scan-line" />
      
      {!session ? (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="cyber-card p-16 md:p-24 w-full max-w-3xl text-center bg-[#020617]/50 backdrop-blur-3xl border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 group-hover:bg-blue-400 transition-all shadow-[0_0_20px_blue]" />
          <div className="w-24 h-24 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-12 mx-auto text-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.1)] group-hover:scale-110 transition-transform">
            <Fingerprint size={42} strokeWidth={2.5} />
          </div>
          <h1 className="text-6xl font-[1000] mb-6 tracking-tighter leading-none glow-text">Initialize <br/> Infiltration.</h1>
          <p className="text-slate-500 mb-16 max-w-sm mx-auto font-bold text-xl tracking-tight leading-relaxed">Select your knowledge domain for technical interrogation. Every response is recorded for genetic indexing.</p>
          
          <div className="text-left mb-16 px-4">
            <label className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-700 pl-6 mb-2 block">Interrogation Domain</label>
            <input 
              type="text" 
              className="w-full bg-slate-900 border-white/5 rounded-2xl px-10 py-8 outline-none focus:border-blue-500/50 transition-all font-[1000] text-3xl tracking-tighter text-blue-400 shadow-inner"
              value={topic} onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <button onClick={startViva} disabled={loading} className="w-full py-8 rounded-2xl bg-white text-black font-[1000] text-3xl hover:bg-blue-600 hover:text-white active:scale-95 transition-all shadow-4xl uppercase tracking-widest flex items-center justify-center gap-6 group">
            {loading ? 'Decrypting...' : 'Begin Protocol'} <ArrowRight size={36} strokeWidth={4} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      ) : (
        <div className="w-full max-w-6xl relative z-20">
          <div className="flex justify-between items-center mb-12 px-8">
            <div className="flex gap-4">
              {session.questions.map((_: any, i: number) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-1000 ${i === currentIdx ? 'w-32 bg-blue-500 shadow-[0_0_15px_blue]' : i < currentIdx ? 'w-10 bg-emerald-500/30' : 'w-10 bg-white/5'}`} />
              ))}
            </div>
            <div className="flex items-center gap-3 px-6 py-2 rounded-xl bg-white/5 border border-white/5 text-blue-400 font-black text-[10px] tracking-[0.4em] uppercase">
               Node Access Point {String(currentIdx + 1).padStart(2, '0')}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
               key={currentIdx}
               initial={{ x: 30, opacity: 0 }} 
               animate={{ x: 0, opacity: 1 }} 
               exit={{ x: -30, opacity: 0 }} 
               className="cyber-card p-16 md:p-24 shadow-4xl bg-[#020617]/50 backdrop-blur-3xl min-h-[650px] flex flex-col justify-between"
            >
              <div className="space-y-16">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                   <div className="text-blue-500 px-1 py-2 rounded-xl w-fit mb-12 font-black text-[10px] tracking-[0.4em] uppercase flex items-center gap-3"><Terminal size={14} /> System Probe Active</div>
                   <h2 className="text-6xl font-[1000] leading-[1] tracking-tighter text-white glow-text">{session.questions[currentIdx]}</h2>
                </motion.div>
                
                <div className="relative group">
                   <div className="absolute top-6 right-8 text-[10px] font-black uppercase text-slate-700 tracking-widest">Buffer Status: Active</div>
                   <textarea 
                      autoFocus
                      className="w-full bg-[#0f172a]/50 border-white/5 rounded-3xl p-12 focus:border-blue-500/50 transition-all outline-none resize-none font-bold text-2xl min-h-[320px] text-slate-300 shadow-inner tracking-tight leading-relaxed placeholder:text-slate-800"
                      placeholder="Input knowledge string here..."
                      value={answers[currentIdx]}
                      onChange={(e) => {
                        const a = [...answers];
                        a[currentIdx] = e.target.value;
                        setAnswers(a);
                      }}
                   />
                </div>
              </div>

              <div className="flex gap-8 mt-16 pt-12 border-t border-white/5">
                {currentIdx < session.questions.length - 1 ? (
                  <button 
                    onClick={() => setCurrentIdx(currentIdx + 1)}
                    disabled={!answers[currentIdx]}
                    className="flex-1 py-8 rounded-2xl bg-white text-black font-[1000] text-3xl hover:bg-blue-600 hover:text-white active:scale-95 transition-all shadow-4xl disabled:opacity-20 disabled:grayscale flex items-center justify-center gap-6 uppercase tracking-widest group"
                  >
                    Commit Response <ArrowRight strokeWidth={4} size={32} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                ) : (
                  <button 
                    onClick={submitViva}
                    disabled={loading || !answers[currentIdx]}
                    className="flex-1 py-8 rounded-2xl bg-white text-emerald-600 font-[1000] text-3xl hover:bg-emerald-600 hover:text-white active:scale-95 transition-all shadow-[0_0_50px_rgba(16,185,129,0.2)] flex items-center justify-center gap-6 uppercase tracking-widest group border-emerald-500/20"
                  >
                    {loading ? 'Analyzing Protocol...' : 'Finalize Interrogation'} <Zap strokeWidth={4} size={32} fill="currentColor" className="group-hover:scale-125 transition-transform" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
