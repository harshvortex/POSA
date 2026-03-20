'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Send, ShieldCheck, Trophy, ArrowRight, Zap, Target } from 'lucide-react';
import api from '@/lib/api';

export default function NewViva() {
  const [topic, setTopic] = useState('Spring Boot vs Next.js');
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
      <div className="min-h-screen py-24 px-8 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="w-full glass-card p-12 rounded-[3.5rem] relative overflow-hidden text-center"
        >
          <div className="absolute top-0 inset-x-0 h-1 gradient-bg" />
          <Trophy size={80} className="text-yellow-400 mx-auto mb-8 drop-shadow-lg" />
          <h1 className="text-5xl font-black mb-4">Viva Complete!</h1>
          <div className="text-8xl font-black gradient-text mb-4 tracking-tighter">{evalResult.score}</div>
          <p className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-10">AI-Verified Accuracy Score</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-12">
            <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-3xl">
              <h3 className="text-green-400 font-black uppercase text-xs tracking-widest mb-4">Strengths</h3>
              <ul className="space-y-2 text-sm text-green-200/70">
                {evalResult.strengths.map((s: string) => <li key={s} className="flex gap-2"><span>✔</span> {s}</li>)}
              </ul>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-3xl text-sm">
              <h3 className="text-blue-400 font-black uppercase text-xs tracking-widest mb-4">Next Steps</h3>
              <p className="text-blue-200/70">{evalResult.feedback}</p>
            </div>
          </div>
          
          <button onClick={() => router.push('/candidate/dashboard')} className="px-12 py-5 rounded-2xl gradient-bg text-white font-black hover:scale-105 active:scale-95 transition-all">
            Return to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center py-20 px-8">
      <div className="hero-glow" />
      
      {!session ? (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card p-12 rounded-[3rem] w-full max-w-xl text-center">
          <Cpu size={60} className="text-blue-500 mx-auto mb-8 drop-shadow-xl" />
          <h1 className="text-4xl font-extrabold mb-4">New Viva Session</h1>
          <p className="text-gray-400 mb-10 max-w-sm mx-auto">Prepare for a technical deep-dive. Choose a topic and let the AI verify your proficiency.</p>
          
          <div className="space-y-2 text-left mb-10">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 pl-2">Session Topic</label>
            <input 
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold"
              value={topic} onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <button onClick={startViva} disabled={loading} className="w-full py-5 rounded-2xl gradient-bg text-white font-black text-xl hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-blue-500/30">
            {loading ? 'Initializing LLM...' : 'Start Session'}
          </button>
        </motion.div>
      ) : (
        <div className="w-full max-w-4xl relative">
          <div className="flex justify-between items-center mb-10">
            <div className="flex gap-2">
              {session.questions.map((_: any, i: number) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-500 ${i === currentIdx ? 'w-20 bg-blue-500 shadow-lg' : i < currentIdx ? 'w-4 bg-blue-500/40' : 'w-4 bg-white/10'}`} />
              ))}
            </div>
            <span className="text-[10px] font-black uppercase bg-white/5 px-4 py-2 rounded-full border border-white/10">{currentIdx + 1} / {session.questions.length}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
               key={currentIdx}
               initial={{ x: 20, opacity: 0 }} 
               animate={{ x: 0, opacity: 1 }} 
               exit={{ x: -20, opacity: 0 }} 
               className="glass-card p-12 rounded-[3rem] shadow-2xl min-h-[500px] flex flex-col justify-between"
            >
              <div>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                   <div className="bg-blue-500/10 text-blue-400 p-2 rounded-lg w-fit mb-6"><Target size={20} /></div>
                   <h2 className="text-3xl font-black leading-tight mb-8">{session.questions[currentIdx]}</h2>
                </motion.div>
                
                <textarea 
                   autoFocus
                   className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 focus:ring-2 focus:ring-blue-500/30 transition-all outline-none resize-none font-medium text-lg min-h-[220px]"
                   placeholder="Your detailed technical answer..."
                   value={answers[currentIdx]}
                   onChange={(e) => {
                     const a = [...answers];
                     a[currentIdx] = e.target.value;
                     setAnswers(a);
                   }}
                />
              </div>

              <div className="flex gap-4 mt-12">
                {currentIdx < session.questions.length - 1 ? (
                  <button 
                    onClick={() => setCurrentIdx(currentIdx + 1)}
                    disabled={!answers[currentIdx]}
                    className="flex-1 py-5 rounded-2xl bg-white text-blue-600 font-black text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    Next Question <ArrowRight strokeWidth={3} />
                  </button>
                ) : (
                  <button 
                    onClick={submitViva}
                    disabled={loading || !answers[currentIdx]}
                    className="flex-1 py-5 rounded-2xl gradient-bg text-white font-black text-xl hover:brightness-110 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
                  >
                    {loading ? 'Evaluating...' : 'Finalize Session'} <Zap strokeWidth={3} />
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
