'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Github, Users, Briefcase, Search, Filter, ShieldCheck, TrendingUp, Target, Plus, ChevronRight, LogOut, Heart, Sparkles } from 'lucide-react';
import api from '@/lib/api';

export default function RecruiterDashboard() {
  const [user, setUser] = useState<any>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('posa_user');
    if (!storedUser) router.push('/login');
    else {
      const u = JSON.parse(storedUser);
      if (u.role !== 'RECRUITER') router.push('/candidate/dashboard');
      setUser(u);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const sRes = await api.get('/recruiter/dashboard');
      setStats(sRes.data);
      const cRes = await api.get('/recruiter/candidates');
      setCandidates(cRes.data.candidates || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = candidates.filter(c => 
    c.user.name.toLowerCase().includes(search.toLowerCase()) || 
    c.techStack?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-zinc-50 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300">Searching Talent Network...</div>;

  return (
    <div className="min-h-screen bg-white p-8 max-w-7xl mx-auto pt-28 text-zinc-900 pb-32">
      <div className="hero-glow opacity-10" />
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-20 px-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-500 font-black text-xs uppercase tracking-widest pl-1 mb-2">
             <Heart size={14} /> Team Intelligence
          </div>
          <h1 className="text-5xl font-[1000] tracking-tighter leading-none">{user?.company} Pipeline.</h1>
          <p className="text-zinc-500 font-medium">Verified technical talent with AI detection.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 px-8 py-4 rounded-[2rem] bg-zinc-900 hover:bg-indigo-600 text-white font-black transition-all shadow-xl shadow-indigo-100 active:scale-95">
            <Plus size={20} /> Build New Team
          </button>
          <button onClick={() => { localStorage.clear(); router.push('/'); }} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 text-zinc-400 hover:text-rose-500 transition-all">
             <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 px-4">
        <StatCard icon={<Users className="text-blue-500" />} bg="bg-blue-50" label="Active Pipeline" value={stats?.totalCandidates} />
        <StatCard icon={<ShieldCheck className="text-rose-500" />} bg="bg-rose-50" label="Verified Talent" value={stats?.verifiedCandidates} />
        <StatCard icon={<Sparkles className="text-indigo-500" />} bg="bg-indigo-50" label="Open Roles" value={stats?.activeJobs || 1} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 px-4">
        {/* Modern Sidebar Filter */}
        <div className="lg:col-span-1 space-y-8">
           <div className="glass-card p-10 rounded-[3.5rem] bg-zinc-50/50 border-zinc-100 sticky top-28">
              <h3 className="text-xl font-black mb-8 underline decoration-indigo-200 decoration-4">Pipeline Search</h3>
              <div className="relative mb-10">
                <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Skill, Name, Handle..." 
                  className="w-full bg-white border-zinc-100 rounded-[2rem] py-5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-indigo-100/50 font-bold text-sm shadow-sm"
                  value={search} onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="space-y-6">
                 <FilterOption label="Minimum Proficiency" value="85+" />
                 <FilterOption label="AI Verified" value="Yes" />
                 <FilterOption label="Growth Potential" value="High" />
              </div>

              <div className="mt-12 p-6 rounded-[2.5rem] bg-indigo-600 text-white text-center shadow-2xl shadow-indigo-100">
                 <h4 className="text-xs font-black uppercase tracking-widest mb-3">AI Recommendation</h4>
                 <p className="text-xs font-medium text-white/80">3 new candidates match your "Full Stack Java" requirements today.</p>
              </div>
           </div>
        </div>

        {/* Talent Cards */}
        <div className="lg:col-span-3 space-y-6">
          {filtered.length > 0 ? filtered.map((c) => (
            <motion.div 
              key={c.id} 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 md:p-10 rounded-[4rem] bg-white border-zinc-50 hover:border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.03)] hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] transition-all flex flex-col md:flex-row justify-between items-center group gap-8 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-zinc-900 group-hover:bg-indigo-600 transition-colors" />
              
              <div className="flex gap-10 items-center flex-1">
                <div className="w-20 h-20 rounded-[2.5rem] bg-indigo-50 border border-indigo-100 flex items-center justify-center font-[1000] text-3xl text-indigo-700 shadow-inner group-hover:scale-110 transition-transform">
                  {c.user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-3xl font-[1000] tracking-tight flex items-center gap-3">
                    {c.user.name} 
                    {c.isVerified && <div className="text-indigo-600 bg-indigo-50 p-1 rounded-lg"><ShieldCheck size={20} /></div>}
                  </h3>
                  <p className="text-sm font-bold text-zinc-400 mb-6 truncate max-w-md uppercase tracking-widest">{JSON.parse(c.techStack || '[]').slice(0, 3).join(' • ')}</p>
                  <div className="flex gap-3">
                    <span className="text-[10px] font-black uppercase px-5 py-2 bg-zinc-50 text-zinc-900 rounded-full border border-zinc-100">Skill Score: {Math.round(c.skillScore)}</span>
                    <span className="text-[10px] font-black uppercase px-5 py-2 bg-zinc-50 text-zinc-900 rounded-full border border-zinc-100 shadow-sm">Fit: {Math.round(c.jobFitScore)}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-10 w-full md:w-auto border-t md:border-t-0 md:border-l border-zinc-50 pt-8 md:pt-0 md:pl-12">
                <div className="text-center group-hover:scale-105 transition-transform">
                   <div className="text-4xl font-[1000] tracking-tighter text-zinc-900">A+</div>
                   <div className="text-[10px] uppercase font-black text-indigo-600 tracking-widest mt-1 bg-indigo-50 px-3 py-1 rounded-full">AI Rank</div>
                </div>
                <button className="w-16 h-16 rounded-[2rem] bg-zinc-900 text-white flex items-center justify-center hover:bg-rose-500 active:scale-90 transition-all shadow-xl group-hover:translate-x-2">
                  <ChevronRight size={24} strokeWidth={3} />
                </button>
              </div>
            </motion.div>
          )) : (
            <div className="py-48 text-center glass-card rounded-[4rem] bg-zinc-50/50 border-dashed border-zinc-100">
               <Smile size={60} className="text-zinc-200 mx-auto mb-6" />
               <p className="text-zinc-400 font-bold text-xl tracking-tight">Your talent pool is quiet today.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, bg }: any) {
  return (
    <div className="glass-card p-10 rounded-[4rem] bg-zinc-50/50 border-zinc-50 hover:bg-white hover:shadow-3xl hover:shadow-zinc-100 transition-all flex items-center gap-8">
      <div className={`w-16 h-16 rounded-[2rem] ${bg} flex items-center justify-center shadow-inner`}>{icon}</div>
      <div>
        <div className="text-5xl font-[1000] mb-1 tracking-tighter text-zinc-900">{value || 0}</div>
        <div className="text-[10px] uppercase font-black text-zinc-400 tracking-widest leading-none">{label}</div>
      </div>
    </div>
  );
}

function FilterOption({ label, value }: any) {
  return (
    <div className="flex justify-between items-center py-5 border-b border-zinc-100/50 group cursor-pointer">
       <span className="text-xs text-zinc-400 font-black uppercase tracking-widest group-hover:text-zinc-600 transition-colors">{label}</span>
       <span className="text-xs font-[1000] text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{value}</span>
    </div>
  );
}
