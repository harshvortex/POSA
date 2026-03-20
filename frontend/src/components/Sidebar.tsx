'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Search, Target, ShieldCheck, Play, History, LogOut, LayoutDashboard, UserCircle, Settings, HelpCircle, ChevronRight, Menu, X, Zap, Cpu, Shield, Box, Sparkles } from 'lucide-react';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('posa_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const isCandidate = user?.role === 'CANDIDATE';
  const navItems = isCandidate ? [
    { name: 'Dashboard', path: '/candidate/dashboard', icon: LayoutDashboard },
    { name: 'Technical Viva', path: '/candidate/viva/new', icon: Play },
    { name: 'Identity History', path: '/candidate/viva/history', icon: History },
    { name: 'Skill DNA Profile', path: '/candidate/profile', icon: Target },
  ] : [
    { name: 'Protocol Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { name: 'Talent Network', path: '/recruiter/candidates', icon: Users },
  ];

  if (pathname === '/' || pathname === '/login' || pathname === '/register') return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-blue-600/30">
      <div className="gradient-mesh" />
      
      {/* Sidebar Desktop - Cyber Navy */}
      <aside className={`fixed h-screen hidden lg:flex flex-col z-50 transition-all duration-700 bg-[#020617]/50 backdrop-blur-3xl border-r border-white/5 shadow-2xl shadow-black ${collapsed ? 'w-24' : 'w-80'}`}>
        <div className="p-12 flex items-center gap-6 mb-8 relative">
          <div className="absolute top-0 right-0 p-12 opacity-5"><Shield size={120} strokeWidth={0.5} /></div>
          <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.1)] group cursor-pointer hover:scale-110 hover:border-blue-400 transition-all">
             <Shield size={32} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
          </div>
          {!collapsed && <span className="text-4xl font-[1000] tracking-tighter leading-none glow-text">PoSA.</span>}
        </div>

        <nav className="flex-1 px-8 space-y-4">
          <div className="mb-12">
            {!collapsed && <div className="text-[10px] uppercase font-black tracking-[0.4em] opacity-20 pl-4 mb-8 text-blue-400">Security Access</div>}
            {navItems.map((item) => {
              const active = pathname === item.path;
              return (
                <Link key={item.path} href={item.path} className={`flex items-center gap-6 px-6 py-6 rounded-2xl transition-all relative group overflow-hidden ${active ? 'bg-blue-600 text-white shadow-[0_0_40px_rgba(59,130,246,0.3)] translate-x-1' : 'text-slate-400 hover:bg-white/5 hover:text-white font-bold'}`}>
                  {active && <div className="absolute top-0 left-0 w-1 h-full bg-white/40" />}
                  <item.icon size={26} strokeWidth={active ? 3 : 2} className="relative z-10" />
                  {!collapsed && <span className="text-xs uppercase font-black tracking-widest relative z-10">{item.name}</span>}
                  {!collapsed && active && <div className="ml-auto w-2 h-2 rounded-full bg-white/40 shadow-xl" />}
                </Link>
              );
            })}
          </div>

          <div className="space-y-4 pt-12 border-t border-white/5">
            {!collapsed && <div className="text-[10px] uppercase font-black tracking-[0.4em] opacity-20 pl-4 mb-8">Management</div>}
            <Link href="/settings" className={`flex items-center gap-6 px-6 py-6 rounded-2xl text-slate-500 hover:text-white transition-all`}>
                <Settings size={26} />
                {!collapsed && <span className="text-xs uppercase font-black tracking-widest">Settings</span>}
            </Link>
            <button onClick={() => { localStorage.clear(); router.push('/'); }} className="w-full flex items-center gap-6 px-6 py-6 rounded-2xl text-slate-500 hover:text-rose-500 transition-all">
                <LogOut size={26} />
                {!collapsed && <span className="text-xs uppercase font-black tracking-widest">Terminate Account</span>}
            </button>
          </div>
        </nav>

        <div className="p-10 border-t border-white/5 mx-4 mb-20 bg-slate-900/10 backdrop-blur-xl rounded-3xl mt-auto">
           {!collapsed && (
              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_emerald]" />
                   <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Protocol Live</div>
                 </div>
                 <div className="text-[9px] font-bold text-slate-500 leading-snug tracking-tight">Syncing Genetic DNA via Llama-3 (Cloud Access A1)</div>
              </div>
           )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-700 relative ${collapsed ? 'lg:ml-24' : 'lg:ml-80'}`}>
        <div className="scan-line" />
        <header className="lg:hidden flex justify-between items-center p-8 bg-[#020617]/50 backdrop-blur-3xl border-b border-white/5 sticky top-0 z-40">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-xl">
                <Shield size={22} strokeWidth={2.5} />
             </div>
             <span className="text-3xl font-black tracking-tighter glow-text">PoSA.</span>
           </div>
           <button onClick={() => setMobileOpen(!mobileOpen)} className="p-4 bg-white/5 rounded-xl border border-white/5">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </header>

        {children}
      </main>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 1, x: -100 }} className="fixed inset-0 z-[300] bg-[#020617] p-12 lg:hidden">
             <div className="flex justify-between items-center mb-16">
               <span className="text-5xl font-black tracking-tighter glow-text leading-none">Access Protocol</span>
               <button onClick={() => setMobileOpen(false)} className="p-6 bg-white/5 rounded-2xl border border-white/5"><X size={32} /></button>
             </div>
             <div className="space-y-6">
               {navItems.map((item) => (
                 <Link key={item.path} href={item.path} onClick={() => setMobileOpen(false)} className={`flex items-center gap-8 p-10 rounded-3xl ${pathname === item.path ? 'bg-blue-600 text-white shadow-3xl shadow-blue-500/30' : 'bg-white/5 text-slate-500 border border-white/5 font-black uppercase tracking-widest'}`}>
                    <item.icon size={36} strokeWidth={pathname === item.path ? 4 : 2} />
                    <span className="text-2xl font-black">{item.name}</span>
                 </Link>
               ))}
             </div>
             <button onClick={() => { localStorage.clear(); router.push('/'); }} className="w-full mt-20 flex items-center justify-center gap-4 p-12 rounded-[3.5rem] bg-rose-500/10 text-rose-500 font-black text-2xl uppercase tracking-[0.2em] shadow-2xl shadow-rose-500/10">
                <LogOut size={32} /> Terminate
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
