'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Github, Users, Briefcase, Search, Filter, ShieldCheck, TrendingUp, Target, Plus, ChevronRight } from 'lucide-react';
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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto pt-24">
      <div className="hero-glow" />
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold mb-2 underline decoration-indigo-500 decoration-4">Talent Ecosystem</h1>
          <p className="text-gray-400">Manage {user?.company}&apos;s verified candidates.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all">
            <Plus size={20} /> Post New Job
          </button>
          <button onClick={() => { localStorage.clear(); router.push('/'); }} className="text-sm text-red-400 font-bold hover:underline">Sign Out</button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard icon={<Users className="text-blue-400" />} label="Total Candidates" value={stats?.totalCandidates} />
        <StatCard icon={<ShieldCheck className="text-green-400" />} label="Verified Skills" value={stats?.verifiedCandidates} />
        <StatCard icon={<Briefcase className="text-purple-400" />} label="Active Job Posts" value={stats?.activeJobs} />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Search & Filters */}
        <div className="lg:col-span-1 space-y-6">
           <div className="glass-card p-8 rounded-[2.5rem] sticky top-24">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2 underline decoration-blue-500 decoration-2">Quick Filter</h3>
              <div className="relative mb-6">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search name or skill..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500/30 text-sm font-medium"
                  value={search} onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="space-y-4">
                 <FilterOption label="Minimum Skill Score" value="80+" />
                 <FilterOption label="Viva Completed" value="Yes" />
                 <FilterOption label="Experience" value="3+ Years" />
              </div>
           </div>
        </div>

        {/* Candidate List */}
        <div className="lg:col-span-3 space-y-4">
          {filtered.length > 0 ? filtered.map((c) => (
            <motion.div 
              key={c.id} 
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 md:p-8 rounded-[2.5rem] hover:border-white/20 transition-all flex flex-col md:flex-row justify-between items-center group gap-6 cursor-pointer"
            >
              <div className="flex gap-6 items-center flex-1">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center font-black text-2xl shadow-xl">
                  {c.user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                    {c.user.name} 
                    {c.isVerified && <ShieldCheck size={18} className="text-blue-500" />}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2 truncate max-w-md">{JSON.parse(c.techStack || '[]').join(', ')}</p>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-black uppercase px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">Skill: {c.skillScore}</span>
                    <span className="text-[10px] font-black uppercase px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">Fit: {c.jobFitScore}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10">
                <div className="text-center">
                   <div className="text-2xl font-black gradient-text tracking-tighter">Verified</div>
                   <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mt-1">Viva Proof</div>
                </div>
                <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group-hover:scale-110">
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              </div>
            </motion.div>
          )) : (
            <div className="py-40 text-center glass-card rounded-[3rem] text-gray-500">
               No candidates match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: any) {
  return (
    <div className="glass-card p-8 rounded-[2.5rem] transition-all hover:scale-[1.02]">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 shadow-lg">{icon}</div>
      <div className="text-4xl font-black mb-1 tracking-tighter">{value || 0}</div>
      <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{label}</div>
    </div>
  );
}

function FilterOption({ label, value }: any) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-white/5 hover:bg-white/5 rounded-lg px-2 transition-all">
       <span className="text-xs text-gray-400 font-medium">{label}</span>
       <span className="text-xs font-black text-blue-500">{value}</span>
    </div>
  );
}
