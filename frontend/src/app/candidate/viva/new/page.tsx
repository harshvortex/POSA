'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Send, ShieldCheck, Trophy, ArrowRight, Zap, Target, Sparkles, Smile, ArrowLeft } from 'lucide-react';
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
    } catch (err) {
      alert('Failed to start session');
    } finally {
      setLoading(false);
    }
  };

  const submitViva = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/candidate/viva/${session.sessionId}/submit`, { answers });
      setEvalResult(data.evaluation);
    } catch (err) {
      alert('Failed to submit session');
    } finally {
      setLoading(false);
    }
  };

  if (evalResult) {
    return (
      <div className="min-h-screen py-24 px-8 max-w-5xl mx-auto flex flex-col items-center bg-zinc-50/50">
        <motion.div 
            initial={{ scale: 0.98, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="w-full glass-card p-16 rounded-[4rem] relative overflow-hidden text-center bg-white shadow-3xl shadow-zinc-200"
        >
          <div className="absolute top-0 inset-x-0 h-2 bg-indigo-600 shadow-md" />
          <Trophy size={100} className="text-rose-500 mx-auto mb-8 drop-shadow-xl" />
          <h1 className="text-5xl font-[1000] mb-2 tracking-tighter">Evaluation Complete.</h1>
          <p className="text-zinc-500 font-medium mb-12">Your proficiency index has been updated.</p>
          
          <div className="text-9xl font-[1000] tracking-tighter text-zinc-900 mb-4">{evalResult.score}</div>
          <div className="text-[10px] uppercase font-[1000] tracking-[0.2em] text-indigo-600 mb-16">Verified Score</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-16">
            <div className="bg-emerald-50 border border-emerald-100 p-10 rounded-[3.5rem] relative overflow-hidden">
              <Smile className="absolute -top-6 -right-6 text-emerald-100" size={120} />
              <h3 className="text-emerald-600 font-black uppercase text-xs tracking-widest mb-6 relative">Core Strengths</h3>
              <ul className="space-y-4 text-emerald-900 font-bold relative">
                {evalResult.strengths.map((s: string) => <li key={s} className="flex gap-4"><span>✨</span> {s}</li>)}
              </ul>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 p-10 rounded-[3.5rem] text-sm relative overflow-hidden">
               <Sparkles className="absolute -bottom-6 -right-6 text-indigo-100" size={120} />
              <h3 className="text-indigo-600 font-black uppercase text-xs tracking-widest mb-6 relative">AI Feedback</h3>
              <p className="text-indigo-900 font-bold leading-relaxed text-lg relative">{evalResult.feedback}</p>
            </div>
          </div>
          
          <button onClick={() => router.push('/candidate/dashboard')} className="px-16 py-6 rounded-3xl bg-zinc-900 text-white font-[1000] text-xl hover:bg-indigo-600 hover:scale-[1.03] active:scale-95 transition-all shadow-2xl shadow-indigo-100">
            Finalize & Return
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center py-20 px-8 bg-zinc-50/20">
      <div className="hero-glow opacity-10" />
      
      {!session ? (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card p-16 rounded-[4.5rem] w-full max-w-2xl text-center bg-white shadow-3xl shadow-zinc-200">
          <div className="w-20 h-20 rounded-[2.5rem] bg-indigo-50 flex items-center justify-center mb-10 mx-auto border border-indigo-100">
            <Cpu size={40} className="text-indigo-600" />
          </div>
          <h1 className="text-5xl font-[1000] mb-4 tracking-tighter leading-none">The Viva.</h1>
          <p className="text-zinc-500 mb-12 max-w-sm mx-auto font-medium text-lg leading-relaxed">Let&apos;s talk about your technical journey. Choose a topic and we&apos;ll start a friendly discussion.</p>
          
          <div className="space-y-1 text-left mb-12 pl-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-4">Focus Area</label>
            <input 
              type="text" 
              className="w-full bg-zinc-50 border-zinc-100 rounded-[2.5rem] px-8 py-6 outline-none focus:ring-4 focus:ring-indigo-100/50 transition-all font-black text-xl tracking-tight"
              value={topic} onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <button onClick={startViva} disabled={loading} className="w-full py-6 rounded-[2.5rem] bg-zinc-900 text-white font-[1000] text-2xl hover:bg-rose-500 active:scale-95 transition-all shadow-2xl shadow-rose-100">
            {loading ? 'Booting AI Brain...' : 'Begin Discussion'}
          </button>
        </motion.div>
      ) : (
        <div className="w-full max-w-5xl relative">
          <div className="flex justify-between items-center mb-10 px-8">
            <div className="flex gap-3">
              {session.questions.map((_: any, i: number) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-700 ${i === currentIdx ? 'w-24 bg-zinc-800 shadow-lg' : i < currentIdx ? 'w-6 bg-zinc-400' : 'w-6 bg-zinc-200'}`} />
              ))}
            </div>
            <div className="flex items-center gap-1.5 px-6 py-2 rounded-full bg-white border border-zinc-100 text-zinc-400 font-black text-[10px] tracking-widest uppercase">
               Question {currentIdx + 1}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
               key={currentIdx}
               initial={{ x: 30, opacity: 0 }} 
               animate={{ x: 0, opacity: 1 }} 
               exit={{ x: -30, opacity: 0 }} 
               className="glass-card p-16 rounded-[4.5rem] shadow-3xl bg-white border-white min-h-[600px] flex flex-col justify-between"
            >
              <div className="space-y-12">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                   <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl w-fit mb-8 font-black text-[10px] tracking-widest uppercase border border-indigo-100 flex items-center gap-2"><Target size={14} /> Knowledge Probe</div>
                   <h2 className="text-4xl font-[1000] leading-[1.1] tracking-tight text-zinc-900">{session.questions[currentIdx]}</h2>
                </motion.div>
                
                <textarea 
                   autoFocus
                   className="w-full bg-zinc-50 border-zinc-100 rounded-[3rem] p-10 focus:ring-4 focus:ring-indigo-100/50 transition-all outline-none resize-none font-bold text-xl min-h-[280px] text-zinc-700"
                   placeholder="Share your thoughts..."
                   value={answers[currentIdx]}
                   onChange={(e) => {
                     const a = [...answers];
                     a[currentIdx] = e.target.value;
                     setAnswers(a);
                   }}
                />
              </div>

              <div className="flex gap-6 mt-16">
                {currentIdx < session.questions.length - 1 ? (
                  <button 
                    onClick={() => setCurrentIdx(currentIdx + 1)}
                    disabled={!answers[currentIdx]}
                    className="flex-1 py-6 rounded-[2.5rem] bg-zinc-900 text-white font-[1000] text-2xl hover:bg-indigo-600 active:scale-95 transition-all shadow-2xl shadow-indigo-100 disabled:opacity-30 disabled:hover:bg-zinc-900 flex items-center justify-center gap-4"
                  >
                    Next Question <ArrowRight strokeWidth={4} size={24} />
                  </button>
                ) : (
                  <button 
                    onClick={submitViva}
                    disabled={loading || !answers[currentIdx]}
                    className="flex-1 py-6 rounded-[2.5rem] bg-zinc-900 text-white font-[1000] text-2xl hover:bg-rose-500 active:scale-95 transition-all shadow-2xl shadow-rose-100 flex items-center justify-center gap-4"
                  >
                    {loading ? 'AI Reviewing...' : 'Finalize Session'} <Zap strokeWidth={4} size={24} />
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
