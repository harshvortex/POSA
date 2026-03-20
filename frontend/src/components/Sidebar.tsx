import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Search, Target, ShieldCheck, Play, History, LogOut, LayoutDashboard, UserCircle, Settings, HelpCircle, ChevronRight, Menu, X } from 'lucide-react';

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
    { name: 'My History', path: '/candidate/viva/history', icon: History },
    { name: 'Skill DNA', path: '/candidate/profile', icon: Target },
  ] : [
    { name: 'Recruiter Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { name: 'Talent Network', path: '/recruiter/candidates', icon: Users },
    { name: 'Job Matching', path: '/recruiter/matching', icon: Target },
    { name: 'Hiring Insights', path: '/recruiter/insights', icon: ShieldCheck },
  ];

  if (pathname === '/' || pathname === '/login' || pathname === '/register') return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-zinc-50/50">
      {/* Sidebar Desktop */}
      <aside className={`fixed h-screen hidden lg:flex flex-col z-50 transition-all duration-500 ${collapsed ? 'w-24' : 'w-72'} glass-card rounded-none border-r border-zinc-100 bg-white shadow-2xl shadow-zinc-200/50`}>
        <div className="p-8 flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center text-white shadow-lg shadow-indigo-100">
             <ShieldCheck size={24} />
          </div>
          {!collapsed && <span className="text-2xl font-[1000] tracking-tighter">PoSA</span>}
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} className={`flex items-center gap-4 px-5 py-4 rounded-3xl transition-all ${active ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-200 translate-x-1' : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-900'}`}>
                <item.icon size={22} strokeWidth={active ? 3 : 2} />
                {!collapsed && <span className="font-bold text-sm tracking-tight">{item.name}</span>}
                {!collapsed && active && <ChevronRight className="ml-auto opacity-40" size={16} />}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto space-y-2">
           <Link href="/settings" className={`flex items-center gap-4 px-5 py-4 rounded-3xl text-zinc-400 hover:bg-zinc-50 hover:text-zinc-900 transition-all`}>
              <Settings size={22} />
              {!collapsed && <span className="font-bold text-sm tracking-tight">Settings</span>}
           </Link>
           <button onClick={() => { localStorage.clear(); router.push('/'); }} className="w-full flex items-center gap-4 px-5 py-4 rounded-3xl text-zinc-400 hover:text-rose-500 transition-all">
              <LogOut size={22} />
              {!collapsed && <span className="font-bold text-sm tracking-tight">Log Out</span>}
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-500 ${collapsed ? 'lg:ml-24' : 'lg:ml-72'}`}>
        {/* Mobile Header */}
        <header className="lg:hidden flex justify-between items-center p-6 bg-white border-b border-zinc-100 sticky top-0 z-40">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center text-white shadow-lg">
                <ShieldCheck size={18} />
             </div>
             <span className="text-xl font-black tracking-tighter">PoSA</span>
           </div>
           <button onClick={() => setMobileOpen(!mobileOpen)} className="p-3 bg-zinc-50 rounded-2xl">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
        </header>

        {children}
      </main>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} className="fixed inset-0 z-50 bg-white p-8 lg:hidden">
             <div className="flex justify-between items-center mb-12">
               <span className="text-2xl font-black tracking-tighter">Menu</span>
               <button onClick={() => setMobileOpen(false)} className="p-4 bg-zinc-50 rounded-2xl"><X size={24} /></button>
             </div>
             <div className="space-y-4">
               {navItems.map((item) => (
                 <Link key={item.path} href={item.path} onClick={() => setMobileOpen(false)} className={`flex items-center gap-4 p-6 rounded-[2.5rem] ${pathname === item.path ? 'bg-zinc-900 text-white shadow-2xl' : 'bg-zinc-50 text-zinc-500'}`}>
                    <item.icon size={28} />
                    <span className="text-xl font-black">{item.name}</span>
                 </Link>
               ))}
             </div>
             <button onClick={() => { localStorage.clear(); router.push('/'); }} className="w-full mt-12 flex items-center justify-center gap-4 p-6 rounded-[2.5rem] bg-rose-50 text-rose-500 font-bold text-xl">
                <LogOut size={24} /> Log Out
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
