'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Users, Briefcase, Search, Filter, ShieldCheck, TrendingUp, Target, Plus, ChevronRight, LogOut, Heart, Sparkles, Smile, X, MessageCircle, BarChart3, Globe } from 'lucide-react';
import api from '@/lib/api';

export default function RecruiterDashboard() {
  const [user, setUser] = useState<any>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
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
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const filtered = candidates.filter(c => 
    c.user.name.toLowerCase().includes(search.toLowerCase()) || 
    c.techStack?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-20 text-center font-black animate-pulse uppercase tracking-[0.2em] text-zinc-300">Syncing Talent Network...</div>;

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-16 pb-32">
       <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-20 px-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-500 font-black text-xs uppercase tracking-widest pl-1 mb-2">
             <Heart size={14} /> Team Intelligence
          </div>
          <h1 className="text-6xl font-[1000] tracking-tighter leading-none">{user?.company} HQ.</h1>
          <p className="text-zinc-500 font-medium">Verified technical talent with LLM detection.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 px-8 py-4 rounded-[2rem] bg-zinc-900 hover:bg-indigo-600 text-white font-black transition-all shadow-xl shadow-indigo-100 active:scale-95">
            <Plus size={20} /> Build New Team
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
           <div className="glass-card p-10 rounded-[3.5rem] bg-zinc-50 border-zinc-100 sticky top-28">
              <h3 className="text-xl font-black mb-8 underline decoration-indigo-200 decoration-4">Filters</h3>
              <div className="relative mb-10">
                <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Keyword Search..." 
                  className="w-full bg-white border-zinc-100 rounded-[2rem] py-5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-indigo-100/50 font-bold text-sm shadow-sm"
                  value={search} onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="space-y-6">
                 <FilterOption label="Minimum Index" value="85+" />
                 <FilterOption label="AI Verified" value="Yes" />
                 <FilterOption label="Recent Activity" value="3 Days" />
              </div>
           </div>
        </div>

        {/* Talent Cards */}
        <div className="lg:col-span-3 space-y-6">
          {filtered.length > 0 ? filtered.map((c) => (
            <motion.div 
              key={c.id} 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedCandidate(c)}
              className="glass-card p-10 rounded-[4rem] bg-white border border-zinc-50 hover:border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:shadow-zinc-200/50 transition-all flex flex-col md:flex-row justify-between items-center group gap-8 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-zinc-900 group-hover:bg-indigo-600 transition-colors" />
              
              <div className="flex gap-10 items-center flex-1">
                <div className="w-20 h-20 rounded-[2.5rem] bg-indigo-50 border border-indigo-100 flex items-center justify-center font-[1000] text-3xl text-indigo-700 shadow-inner group-hover:scale-110 transition-transform">
                  {c.user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-3xl font-[1000] tracking-tight flex items-center gap-3 decoration-indigo-200 decoration-4 hover:underline">
                    {c.user.name} 
                    {c.isVerified && <div className="text-indigo-600 bg-indigo-50 p-1.5 rounded-lg"><ShieldCheck size={20} /></div>}
                  </h3>
                  <p className="text-sm font-bold text-zinc-400 mb-6 truncate max-w-md uppercase tracking-widest">{JSON.parse(c.techStack || '[]').slice(0, 3).join(' • ')}</p>
                  <div className="flex gap-3">
                    <span className="text-[10px] font-black uppercase px-6 py-2 bg-zinc-50 text-zinc-900 rounded-full border border-zinc-100">Index Score: {Math.round(c.skillScore)}</span>
                    <span className="text-[10px] font-black uppercase px-6 py-2 bg-zinc-50 text-zinc-900 rounded-full border border-zinc-100 shadow-sm">AI Fit: {Math.round(c.jobFitScore)}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-12 w-full md:w-auto border-t md:border-t-0 md:border-l border-zinc-50 pt-8 md:pt-0 md:pl-12">
                <div className="text-center group-hover:scale-110 transition-transform">
                   <div className="text-5xl font-[1000] tracking-tighter text-zinc-900">A+</div>
                   <div className="text-[10px] uppercase font-black text-indigo-600 tracking-widest mt-1">Tier Ranking</div>
                </div>
                <button className="w-16 h-16 rounded-[2rem] bg-zinc-900 text-white flex items-center justify-center hover:bg-rose-500 active:scale-90 transition-all shadow-xl group-hover:translate-x-3">
                   <ChevronRight size={24} strokeWidth={3} />
                </button>
              </div>
            </motion.div>
          )) : (
            <div className="py-48 text-center glass-card rounded-[4rem] bg-zinc-50/50 border-dashed border-zinc-200">
               <Smile size={60} className="text-zinc-200 mx-auto mb-6" />
               <p className="text-zinc-400 font-bold text-xl tracking-tight">Your talent network is quiet today.</p>
            </div>
          )}
        </div>
      </div>

      {/* Candidate Profile Modal (Expended Feature) */}
      <AnimatePresence>
        {selectedCandidate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-zinc-900/60 backdrop-blur-xl flex items-center justify-center p-8 overflow-y-auto">
             <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-5xl rounded-[5rem] shadow-4xl relative overflow-hidden flex flex-col md:flex-row h-full max-h-[850px]">
                <button onClick={() => setSelectedCandidate(null)} className="absolute top-12 right-12 p-5 bg-zinc-50 rounded-[2rem] hover:bg-rose-50 text-rose-500 transition-all z-20">
                   <X size={24} />
                </button>
                
                <div className="w-full md:w-1/3 gradient-bg p-12 text-white flex flex-col justify-between">
                   <div>
                     <div className="w-24 h-24 rounded-[3rem] bg-white/10 backdrop-blur-lg flex items-center justify-center text-5xl font-black mb-8 border border-white/20">
                        {selectedCandidate.user.name.charAt(0)}
                     </div>
                     <h2 className="text-5xl font-[1000] tracking-tighter mb-2 leading-none">{selectedCandidate.user.name}</h2>
                     <p className="text-white/60 font-bold uppercase tracking-widest text-xs">{selectedCandidate.githubUsername}</p>
                   </div>

                   <div className="space-y-6">
                      <div className="p-8 rounded-[3rem] bg-white/10 backdrop-blur-xl border border-white/10 text-center">
                         <div className="text-6xl font-[1000] tracking-tighter mb-1">{Math.round(selectedCandidate.skillScore)}</div>
                         <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Mastery Index</div>
                      </div>
                      <button className="w-full py-6 rounded-[2.5rem] bg-white text-zinc-900 font-[1000] hover:bg-rose-500 hover:text-white transition-all shadow-xl active:scale-95">Shortlist Talent</button>
                   </div>
                </div>

                <div className="flex-1 p-16 md:p-20 overflow-y-auto space-y-12 bg-zinc-50/50">
                   <div className="space-y-4">
                      <div className="flex items-center gap-2 text-indigo-500 font-extrabold text-[10px] uppercase tracking-[0.2em] mb-4">
                        <Sparkles size={14} /> Genetic Summary
                      </div>
                      <p className="text-2xl font-black tracking-tight leading-snug italic text-zinc-800">
                        "{selectedCandidate.summary || 'A highly proficient technical lead with extensive repository history showing maturity and depth.'}"
                      </p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="glass-card p-10 rounded-[3.5rem] bg-white shadow-xl">
                        <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-10">Skill Helix</h4>
                        <div className="space-y-6">
                          {Object.entries(JSON.parse(selectedCandidate.skillDna || '{}')).map(([skill, pct]: any) => (
                            <div key={skill} className="space-y-2">
                               <div className="flex justify-between text-[10px] font-black uppercase px-1">
                                 <span>{skill}</span>
                                 <span className="text-indigo-600">{pct}%</span>
                               </div>
                               <div className="h-1.5 w-full bg-zinc-50 rounded-full overflow-hidden">
                                 <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className="h-full bg-zinc-900 rounded-full" />
                               </div>
                            </div>
                          ))}
                        </div>
                     </div>

                     <div className="space-y-8">
                        <InsightDetail icon={<BarChart3 className="text-indigo-500" />} label="Top Contribution" value="Infrastructure" />
                        <InsightDetail icon={<Target className="text-rose-500" />} label="Market Value" value="$120k - $150k" />
                        <InsightDetail icon={<Globe className="text-emerald-500" />} label="Timezone" value="UTC+5:30" />
                     </div>
                   </div>
                   
                   <div className="flex items-center gap-4">
                      <button className="flex-1 py-5 rounded-[2rem] bg-zinc-900 text-white font-[1000] text-lg hover:bg-indigo-600 transition-all flex items-center justify-center gap-3">
                         <MessageCircle size={20} /> Start Dialogue
                      </button>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ icon, label, value, bg }: any) {
  return (
    <div className="glass-card p-12 rounded-[4rem] bg-zinc-50/50 border-zinc-50 hover:bg-white hover:shadow-3xl hover:shadow-zinc-200/50 transition-all flex items-center gap-10">
      <div className={`w-16 h-16 rounded-[2rem] ${bg} flex items-center justify-center shadow-inner`}>{icon}</div>
      <div>
        <div className="text-6xl font-[1000] mb-1 tracking-tighter text-zinc-900">{value || 0}</div>
        <div className="text-[10px] uppercase font-black text-zinc-400 tracking-widest leading-none">{label}</div>
      </div>
    </div>
  );
}

function FilterOption({ label, value }: any) {
  return (
    <div className="flex justify-between items-center py-6 border-b border-zinc-100/50 group cursor-pointer">
       <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest group-hover:text-zinc-600 transition-colors">{label}</span>
       <span className="text-xs font-[1000] text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">{value}</span>
    </div>
  );
}

function InsightDetail({ icon, label, value }: any) {
  return (
    <div className="glass-card p-8 rounded-[2.5rem] bg-white border border-zinc-50 flex items-center gap-6 shadow-sm hover:shadow-md transition-all">
       <div className="p-3 bg-zinc-50 rounded-2xl">{icon}</div>
       <div>
         <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">{label}</div>
         <div className="text-lg font-[1000] text-zinc-800 tracking-tight">{value}</div>
       </div>
    </div>
  );
}
