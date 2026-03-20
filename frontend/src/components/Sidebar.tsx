'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Search, Target, ShieldCheck, Play, History, LogOut, LayoutDashboard, UserCircle, Settings, HelpCircle, ChevronRight, Menu, X, Zap, Cpu, Activity, User, Briefcase, Plus, Star, Box, Sparkles } from 'lucide-react';

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
    <div className="flex min-h-screen bg-[#fbfbfc] text-gray-900 selection:bg-blue-500/10 font-sans">
      <div className="mesh-glow opacity-50" />
      
      {/* Sidebar Desktop - Clean White Floating */}
      <aside className={`fixed h-[calc(100vh-4rem)] top-8 left-8 hidden lg:flex flex-col z-[150] transition-all duration-700 bg-white/80 backdrop-blur-2xl border border-gray-100 rounded-[2rem] shadow-2xl shadow-black/2 ${collapsed ? 'w-24' : 'w-72'}`}>
        <div className="p-8 flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/10 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
             <ShieldCheck size={22} strokeWidth={2.5} />
          </div>
          {!collapsed && <span className="text-xl font-bold tracking-tight">PoSA Professional</span>}
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <div className="mb-10">
            {!collapsed && <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 pl-4 mb-4">Verification Center</div>}
            {navItems.map((item) => {
              const active = pathname === item.path;
              return (
                <Link key={item.path} href={item.path} className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all relative group ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/10' : 'text-gray-400 hover:bg-gray-50 hover:text-black font-semibold'}`}>
                  <item.icon size={20} strokeWidth={active ? 3 : 2} className="relative z-10" />
                  {!collapsed && <span className="text-sm tracking-tight relative z-10">{item.name}</span>}
                  {!collapsed && active && <ChevronRight size={14} className="ml-auto opacity-40 shadow-xl" />}
                </Link>
              );
            })}
          </div>

          <div className="space-y-4 pt-10 border-t border-gray-100">
            {!collapsed && <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 pl-4 mb-4">Management</div>}
            <Link href="/settings" className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-gray-400 hover:text-black hover:bg-gray-50 transition-all font-semibold`}>
                <Settings size={20} />
                {!collapsed && <span className="text-sm tracking-tight">Settings</span>}
            </Link>
            <button onClick={() => { localStorage.clear(); router.push('/'); }} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-gray-400 hover:text-rose-500 hover:bg-rose-50/50 transition-all font-semibold">
                <LogOut size={20} />
                {!collapsed && <span className="text-sm tracking-tight">Sign Out</span>}
            </button>
          </div>
        </nav>

        <div className="p-6 mt-auto">
           {!collapsed && (
              <div className="p-6 rounded-[1.5rem] bg-gray-50 border border-gray-100/50 group hover:shadow-sm transition-all text-center">
                 <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Sync Status</div>
                 <div className="flex justify-center items-center gap-2 text-[10px] font-bold text-blue-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> DEPLOYED (V4.0)
                 </div>
              </div>
           )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-700 relative ${collapsed ? 'lg:ml-32' : 'lg:ml-80'}`}>
        <header className="lg:hidden flex justify-between items-center p-8 bg-white/80 backdrop-blur-3xl border-b border-gray-100 sticky top-0 z-[150]">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-lg">
                <ShieldCheck size={18} strokeWidth={2.5} />
             </div>
             <span className="text-xl font-bold tracking-tight">PoSA</span>
           </div>
           <button onClick={() => setMobileOpen(!mobileOpen)} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
        </header>

        {children}
      </main>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 1, x: -100 }} className="fixed inset-0 z-[300] bg-white p-12 lg:hidden">
             <div className="flex justify-between items-center mb-16 px-4">
               <span className="text-3xl font-bold tracking-tight">Platform Access</span>
               <button onClick={() => setMobileOpen(false)} className="p-4 bg-gray-50 rounded-2xl border border-gray-100"><X size={24} /></button>
             </div>
             <div className="space-y-4 px-4">
               {navItems.map((item) => (
                 <Link key={item.path} href={item.path} onClick={() => setMobileOpen(false)} className={`flex items-center gap-6 p-8 rounded-3xl ${pathname === item.path ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/10' : 'bg-gray-50 text-gray-400 border border-gray-100 font-semibold'}`}>
                    <item.icon size={28} strokeWidth={pathname === item.path ? 3 : 2} />
                    <span className="text-xl font-semibold tracking-tight">{item.name}</span>
                 </Link>
               ))}
             </div>
             <button onClick={() => { localStorage.clear(); router.push('/'); }} className="w-full mt-20 flex items-center justify-center gap-4 p-8 rounded-3xl bg-rose-50 text-rose-500 font-bold text-lg uppercase tracking-widest shadow-lg shadow-rose-100">
                <LogOut size={28} /> Sign Out
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
