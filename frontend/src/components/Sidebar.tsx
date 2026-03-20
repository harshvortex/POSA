'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Play, History, Target, Users,
  Settings, LogOut, ShieldCheck, ChevronLeft, ChevronRight,
  Menu, X, Wifi
} from 'lucide-react';

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

  const isCandidate = user?.role !== 'RECRUITER';

  const navItems = isCandidate
    ? [
        { name: 'Dashboard', path: '/candidate/dashboard', icon: LayoutDashboard },
        { name: 'Technical Viva', path: '/candidate/viva/new', icon: Play },
        { name: 'Session History', path: '/candidate/viva/history', icon: History },
        { name: 'Skill Profile', path: '/candidate/profile', icon: Target },
      ]
    : [
        { name: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
        { name: 'Talent Network', path: '/recruiter/candidates', icon: Users },
      ];

  const publicRoutes = ['/', '/login', '/register'];
  if (publicRoutes.includes(pathname)) return <>{children}</>;

  const initials = user?.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || '??';

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed h-full z-40 bg-white border-r border-gray-100 transition-all duration-300 ease-out ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center h-16 border-b border-gray-100 px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <ShieldCheck size={14} strokeWidth={2.5} className="text-white" />
              </div>
              <span className="font-bold text-base tracking-tight">PoSA</span>
            </div>
          )}
          {collapsed && (
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <ShieldCheck size={14} strokeWidth={2.5} className="text-white" />
            </div>
          )}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="w-6 h-6 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
          )}
        </div>

        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="mx-auto mt-2 mb-1 w-6 h-6 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        )}

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-hidden">
          {!collapsed && <div className="label-xs text-gray-400 px-3 mb-3">{isCandidate ? 'Candidate Hub' : 'Recruiter Hub'}</div>}

          {navItems.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`sidebar-item ${active ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
                title={collapsed ? item.name : undefined}
              >
                <item.icon size={16} className={`sidebar-icon flex-shrink-0 ${active ? 'text-indigo-600' : ''}`} strokeWidth={active ? 2.5 : 2} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}

          <div className={`mt-4 pt-4 border-t border-gray-100 space-y-0.5`}>
            {!collapsed && <div className="label-xs text-gray-400 px-3 mb-3">Account</div>}

            <Link href="/settings" className={`sidebar-item ${pathname === '/settings' ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}>
              <Settings size={16} className="flex-shrink-0" strokeWidth={2} />
              {!collapsed && <span>Settings</span>}
            </Link>

            <button
              onClick={() => { localStorage.clear(); router.push('/'); }}
              className={`sidebar-item w-full hover:bg-red-50 hover:text-red-500 ${collapsed ? 'justify-center px-2' : ''}`}
            >
              <LogOut size={16} className="flex-shrink-0" strokeWidth={2} />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </div>
        </nav>

        {/* User Profile Footer */}
        {!collapsed && (
          <div className="p-3 border-t border-gray-100">
            <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold truncate">{user?.name || 'Developer'}</div>
                <div className="flex items-center gap-1.5">
                  <Wifi size={9} className="text-emerald-500" />
                  <span className="text-[10px] text-gray-400">Demo Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-white/90 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <ShieldCheck size={14} strokeWidth={2.5} className="text-white" />
          </div>
          <span className="font-bold text-base tracking-tight">PoSA</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Mobile Nav Sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="h-14 flex items-center px-5 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <ShieldCheck size={14} strokeWidth={2.5} className="text-white" />
                  </div>
                  <span className="font-bold text-base tracking-tight">PoSA</span>
                </div>
              </div>

              <nav className="flex-1 px-4 py-5 space-y-1">
                {navItems.map((item) => {
                  const active = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`sidebar-item ${active ? 'active' : ''}`}
                    >
                      <item.icon size={17} strokeWidth={active ? 2.5 : 2} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={() => { localStorage.clear(); router.push('/'); }}
                  className="sidebar-item w-full hover:bg-red-50 hover:text-red-500"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? 'lg:pl-16' : 'lg:pl-60'} pt-14 lg:pt-0`}>
        {children}
      </main>
    </div>
  );
}
