'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Fingerprint, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

export default function NewViva() {
  const [topic, setTopic] = useState('Full Stack Development');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  const startViva = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const { data } = await api.post('/candidate/viva/start', { topic });
      setSession(data);
      setAnswers(new Array(data.questions.length).fill(''));
    } catch { alert('Failed to start. Try again.'); }
    finally { setLoading(false); }
  };

  const submitViva = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/candidate/viva/${session.sessionId}/submit`, { answers });
      setResult(data.evaluation);
    } catch { alert('Submission failed.'); }
    finally { setLoading(false); }
  };

  const progress = session ? ((currentIdx + 1) / session.questions.length) * 100 : 0;

  if (result) return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8fafc]">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="surface p-10 text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20">
            <CheckCircle size={36} className="text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Session Complete</h1>
          <p className="text-gray-400 text-sm mb-8">Your results have been recorded to your Skill DNA profile.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100">
              <div className="label-xs text-indigo-500 mb-2">Verification Score</div>
              <div className="text-5xl font-black text-indigo-600 tracking-tight">{result.score}</div>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-left">
              <div className="label-xs text-gray-400 mb-3">Strengths Detected</div>
              <ul className="space-y-1.5">
                {result.strengths?.map((s: string) => (
                  <li key={s} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <CheckCircle size={12} className="text-emerald-500 flex-shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 text-left mb-8">
            <div className="label-xs text-gray-400 mb-2">AI Feedback</div>
            <p className="text-sm text-gray-600 leading-relaxed italic">"{result.feedback}"</p>
          </div>

          <button
            onClick={() => router.push('/candidate/dashboard')}
            className="btn-primary w-full h-11 text-sm"
          >
            Back to Dashboard <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8fafc]">
      {!session ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl"
        >
          <div className="surface p-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20">
              <Fingerprint size={22} className="text-white" />
            </div>

            <div className="label-xs text-indigo-500 mb-2">Technical Viva</div>
            <h1 className="display-md mb-2">Start a new session.</h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Choose a topic, and our AI will generate 3 deep technical questions. Your answers are analyzed to update your Skill DNA.
            </p>

            <div className="space-y-3 mb-8">
              <label className="label-xs text-gray-500">Session Topic</label>
              <input
                type="text"
                placeholder="e.g. Python Internals, System Design, React..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && startViva()}
                className="form-input h-12 text-base"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 mb-8">
              {['Python & AI', 'System Design', 'React & Next.js'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    topic === t
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                      : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-indigo-200 hover:text-indigo-500'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={startViva}
              disabled={loading || !topic.trim()}
              className="btn-primary w-full h-12 text-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Questions...
                </span>
              ) : (
                <><Zap size={15} fill="currentColor" /> Begin Interrogation</>
              )}
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="w-full max-w-3xl">
          {/* Progress Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => currentIdx > 0 && setCurrentIdx(currentIdx - 1)}
                disabled={currentIdx === 0}
                className="btn-ghost h-9 w-9 px-0 justify-center disabled:opacity-30"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="text-sm font-bold text-gray-700">Question {currentIdx + 1} / {session.questions.length}</span>
            </div>
            <div className="label-xs text-indigo-500">{session.topic}</div>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 rounded-full bg-gray-100 mb-8 overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="surface p-10"
            >
              <div className="label-xs text-gray-400 mb-5">AI-Generated Question</div>
              <h2 className="text-2xl font-bold tracking-tight leading-snug mb-8">
                {session.questions[currentIdx]}
              </h2>

              <div className="space-y-2 mb-8">
                <label className="label-xs text-gray-500">Your Answer</label>
                <textarea
                  autoFocus
                  rows={7}
                  className="w-full p-4 rounded-xl border-1.5 border-gray-100 bg-gray-50/50 text-sm font-medium text-gray-800 leading-relaxed resize-none focus:outline-none focus:border-indigo-300 focus:bg-white transition-all placeholder:text-gray-300 placeholder:font-normal"
                  placeholder="Explain your understanding clearly and concisely..."
                  value={answers[currentIdx]}
                  onChange={(e) => {
                    const a = [...answers];
                    a[currentIdx] = e.target.value;
                    setAnswers(a);
                  }}
                />
              </div>

              {currentIdx < session.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                  disabled={!answers[currentIdx]?.trim()}
                  className="btn-primary w-full h-11 text-sm disabled:opacity-40"
                >
                  Next Question <ArrowRight size={15} />
                </button>
              ) : (
                <button
                  onClick={submitViva}
                  disabled={loading || !answers[currentIdx]?.trim()}
                  className="btn-primary w-full h-11 text-sm bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/20 disabled:opacity-40"
                >
                  {loading ? (
                    <span className="flex items-center gap-2 justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing Responses...
                    </span>
                  ) : (
                    <><CheckCircle size={15} /> Submit & Finalize</>
                  )}
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
