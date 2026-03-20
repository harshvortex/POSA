'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Github, Play, ShieldCheck, Target, TrendingUp,
  ArrowRight, Sparkles, Star, Activity, Plus,
  BarChart3, Zap, Clock, CheckCircle2
} from 'lucide-react';
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
    const stored = localStorage.getItem('posa_user');
    if (!stored) { router.push('/login'); return; }
    setUser(JSON.parse(stored));
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get('/candidate/dashboard');
      setProfile(data.profile === 'not created' ? null : data.profile);
      setVivas(data.vivaSessions || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const connectGitHub = async () => {
    if (!ghUser.trim()) return;
    setAnalyzing(true);
    try {
      await api.post('/candidate/github/connect', { githubUsername: ghUser });
      fetchDashboard();
    } catch { alert('Failed to connect. Try again.'); }
    finally { setAnalyzing(false); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-3 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mx-auto" />
        <p className="text-sm text-gray-400 font-medium">Loading Protocol Hub...</p>
      </div>
    </div>
  );

  const skillDna = profile ? JSON.parse(profile.skillDna || '{}') : {};
  const topSkills = Object.entries(skillDna).slice(0, 5);

  return (
    <div className="min-h-screen p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <div className="label-xs text-indigo-500 mb-2">Protocol Dashboard</div>
          <h1 className="text-3xl font-black tracking-tight">
            Good evening, {user?.name?.split(' ')[0] || 'Developer'}.
          </h1>
          <p className="text-gray-400 text-sm mt-1">Here's your technical identity overview.</p>
        </div>
        <button
          onClick={() => router.push('/candidate/viva/new')}
          className="btn-primary self-start sm:self-auto"
        >
          <Play size={15} fill="currentColor" /> Start Viva
        </button>
      </div>

      {!profile ? (
        /* ── ONBOARDING CARD ── */
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="card-hero p-10 noise mb-10"
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-6">
              <Github size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Connect your GitHub</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Our Llama-3 engine will analyze your repositories and generate a verified Skill DNA profile—no résumé needed.
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="github-username"
                value={ghUser}
                onChange={(e) => setGhUser(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && connectGitHub()}
                className="flex-1 h-11 px-4 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm font-medium focus:outline-none focus:border-indigo-400 transition-colors"
              />
              <button
                onClick={connectGitHub}
                disabled={analyzing}
                className="btn-primary h-11 px-6 text-sm"
              >
                {analyzing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  'Analyze'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        /* ── STATS GRID ── */
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Genetic Index', value: Math.round(profile.skillScore), unit: '/100', icon: <Activity size={14} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Market Fit', value: Math.round(profile.jobFitScore), unit: '%', icon: <Target size={14} />, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Growth Score', value: Math.round(profile.growthScore), unit: '', icon: <TrendingUp size={14} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Repositories', value: profile.totalRepos, unit: '', icon: <Github size={14} />, color: 'text-blue-600', bg: 'bg-blue-50' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="card-stat"
            >
              <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center ${s.color} mb-4`}>
                {s.icon}
              </div>
              <div className="text-3xl font-black tracking-tight mb-0.5">
                {s.value}<span className="text-base font-semibold text-gray-300">{s.unit}</span>
              </div>
              <div className="label-xs text-gray-400">{s.label}</div>
            </motion.div>
          ))}
        </div>
      )}

      {profile && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Skill DNA */}
          <div className="lg:col-span-2 surface p-7">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-base tracking-tight">Skill DNA</h3>
                <p className="text-xs text-gray-400 mt-0.5">AI-extracted from your repositories</p>
              </div>
              <div className="chip chip-blue">Llama-3 Verified</div>
            </div>
            <div className="space-y-4">
              {topSkills.map(([skill, pct]: any, i) => (
                <div key={skill}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-semibold text-gray-700">{skill}</span>
                    <span className="text-sm font-bold text-indigo-600">{pct}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="skill-bar-fill"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Summary */}
          <div className="surface p-7 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={14} className="text-indigo-500" />
              <span className="text-sm font-bold">AI Summary</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed flex-1 italic">
              "{profile.summary || 'Connect GitHub and run a Viva to generate your AI-powered technical summary.'}"
            </p>
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span className="text-xs text-gray-400 font-medium">Verified by PoSA Protocol v4</span>
            </div>
          </div>
        </div>
      )}

      {/* Session History */}
      <div className="surface overflow-hidden">
        <div className="px-7 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base tracking-tight">Viva Sessions</h3>
            <p className="text-xs text-gray-400 mt-0.5">{vivas.length} session{vivas.length !== 1 ? 's' : ''} recorded</p>
          </div>
          <button onClick={() => router.push('/candidate/viva/new')} className="btn-ghost text-xs h-8 px-3">
            <Plus size={13} /> New Session
          </button>
        </div>

        {vivas.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {vivas.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="px-7 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Play size={14} className="text-indigo-500" fill="currentColor" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold capitalize">{v.topic}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock size={10} className="text-gray-400" />
                      <span className="text-xs text-gray-400">{new Date(v.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-2xl font-black tracking-tight text-indigo-600">{v.score || '--'}</div>
                    <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Score</div>
                  </div>
                  <div className={`chip ${v.status === 'COMPLETED' ? 'chip-green' : 'chip-blue'}`}>
                    {v.status}
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
              <Play size={20} className="text-indigo-300" />
            </div>
            <p className="text-sm font-semibold text-gray-400 mb-1">No sessions yet</p>
            <p className="text-xs text-gray-300 mb-5">Start your first Technical Viva to begin building your verified identity.</p>
            <button onClick={() => router.push('/candidate/viva/new')} className="btn-primary text-sm h-9 px-5">
              <Zap size={14} /> Start First Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
