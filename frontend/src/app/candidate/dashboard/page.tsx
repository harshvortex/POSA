'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Github, Play, ShieldCheck, Trophy, Target, TrendingUp, Calendar, ExternalLink } from 'lucide-react';
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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto pt-24">
      <div className="hero-glow" />
      
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-extrabold mb-2 underline decoration-blue-500 decoration-4">Welcome, {user?.name}</h1>
          <p className="text-gray-400">Manage your Skill DNA and Technical Interviews.</p>
        </div>
        <button onClick={() => { localStorage.clear(); router.push('/'); }} className="text-sm text-red-400 font-bold hover:underline">Sign Out</button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left: Skill DNA Card */}
        <div className="lg:col-span-2 glass-card p-10 rounded-[3rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-blue-500/10 group-hover:text-blue-500/20 transition-colors">
            <Github size={200} strokeWidth={1} />
          </div>
          
          <h2 className="text-2xl font-black mb-1 flex items-center gap-3">
            <Github className="text-blue-500" /> GitHub Skill Analysis
          </h2>
          
          {!profile ? (
            <div className="mt-8 relative z-10">
              <p className="text-gray-400 mb-6 max-w-sm">Connect your GitHub to analyze repositories, verify stars, and generate your technical DNA.</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="github-username"
                  className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-medium text-sm flex-1"
                  value={ghUser} onChange={(e) => setGhUser(e.target.value)}
                />
                <button 
                  onClick={connectGitHub} disabled={analyzing}
                  className="px-8 py-4 rounded-2xl gradient-bg text-white font-bold hover:brightness-110 disabled:opacity-50"
                >
                  {analyzing ? 'Analyzing...' : 'Connect'}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <Stat icon={<ShieldCheck className="text-green-400" />} label="Skill Score" value={profile.skillScore} />
              <Stat icon={<Target className="text-blue-400" />} label="Job Fit" value={profile.jobFitScore} />
              <Stat icon={<TrendingUp className="text-purple-400" />} label="Growth" value={profile.growthScore} />
              
              <div className="md:col-span-3 mt-4 space-y-4">
                 <h3 className="text-xs font-bold uppercase text-gray-500 tracking-widest pl-1">Tech Stack</h3>
                 <div className="flex flex-wrap gap-2">
                   {JSON.parse(profile.techStack || '[]').map((s: string) => (
                     <span key={s} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium">{s}</span>
                   ))}
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Viva Entry Card */}
        <div className="glass-card p-10 rounded-[3rem] gradient-bg text-white shadow-2xl shadow-blue-500/20 flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-10 shadow-lg">
              <Trophy className="text-white w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black mb-4">Master your Viva.</h2>
            <p className="text-white/70 text-sm leading-relaxed mb-10">
              Conduct an AI-managed viva with Llama-3 to verify your technical depth.
            </p>
          </div>
          <button 
            onClick={() => router.push('/candidate/viva/new')}
            className="w-full py-5 rounded-2xl bg-white text-blue-600 font-black text-lg hover:scale-[1.02] transition-all shadow-xl shadow-black/10"
          >
            Start New Session
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
        <Calendar className="text-indigo-400" /> Recent Viva Sessions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vivas.length > 0 ? vivas.map((v) => (
          <div key={v.id} className="glass-card p-8 rounded-[2rem] hover:border-white/20 transition-all border-dashed">
            <div className="flex justify-between mb-6">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${v.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                {v.status}
              </span>
              <span className="text-xl font-bold text-gray-300">#{v.id}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{v.topic}</h3>
            <p className="text-xs text-gray-500 mb-6">Conducted on {new Date(v.createdAt).toLocaleDateString()}</p>
            
            <div className="flex justify-between items-end">
              <div>
                <span className="text-3xl font-black gradient-text">{v.score || '---'}</span>
                <span className="text-[10px] text-gray-500 uppercase block font-bold">Accuracy Score</span>
              </div>
              <button className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                <ExternalLink size={20} className="text-gray-400" />
              </button>
            </div>
          </div>
        )) : (
          <div className="md:col-span-3 py-20 text-center glass-card rounded-[3rem] border-dashed">
             <p className="text-gray-500 font-medium">No sessions found. Start your first Viva today!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: any) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-all">
      <div className="mb-4">{icon}</div>
      <div className="text-3xl font-black mb-1 tracking-tight">{value || '--'}</div>
      <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{label}</div>
    </div>
  );
}
