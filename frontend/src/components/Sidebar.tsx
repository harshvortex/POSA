'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Play, History, Target, Users, Settings, LogOut, ShieldCheck, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

const CANDIDATE_NAV = [
  { label: 'Dashboard', path: '/candidate/dashboard', icon: LayoutDashboard },
  { label: 'Technical Viva', path: '/candidate/viva/new', icon: Play },
  { label: 'Session History', path: '/candidate/viva/history', icon: History },
  { label: 'Skill Profile', path: '/candidate/profile', icon: Target },
];

const RECRUITER_NAV = [
  { label: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
  { label: 'Talent Network', path: '/recruiter/candidates', icon: Users },
];

const PUBLIC_ROUTES = ['/', '/login', '/register'];

function NavItem({ path, label, icon: Icon, active, collapsed = false }: any) {
  return (
    <Link href={path} className={`nav-item ${active ? 'active' : ''}`}
      style={{ justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? '8px' : '8px 12px' }}
      title={collapsed ? label : undefined}>
      <Icon size={16} strokeWidth={active ? 2.5 : 2} style={{ flexShrink: 0 }} />
      {!collapsed && <span style={{ flexShrink: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>}
    </Link>
  );
}

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const s = localStorage.getItem('posa_user');
      return s ? JSON.parse(s) : null;
    }
    return null;
  });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (PUBLIC_ROUTES.includes(pathname)) return <>{children}</>;

  const isCandidate = user?.role !== 'RECRUITER';
  const navItems = isCandidate ? CANDIDATE_NAV : RECRUITER_NAV;
  const initials = user?.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || '??';
  const sidebarWidth = collapsed ? 64 : 232;

  const sidebarContent = (isMobile = false) => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{
        height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: collapsed && !isMobile ? '0 16px' : '0 16px',
        borderBottom: '1px solid #f1f4f9', flexShrink: 0
      }}>
        {(!collapsed || isMobile) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={13} color="white" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '0.9375rem', letterSpacing: '-0.02em', color: '#0d1117' }}>PoSA</span>
          </div>
        )}
        {collapsed && !isMobile && (
          <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
            <ShieldCheck size={13} color="white" strokeWidth={2.5} />
          </div>
        )}
        {isMobile && (
          <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex', padding: 4 }}>
            <X size={18} />
          </button>
        )}
        {!isMobile && (
          <button onClick={() => setCollapsed(!collapsed)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', padding: 4, borderRadius: 6, transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f3f4f6')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto', overflowX: 'hidden' }}>
        {(!collapsed || isMobile) && (
          <div className="text-label" style={{ padding: '4px 8px 8px', color: '#9ca3af', fontSize: '0.6rem' }}>
            {isCandidate ? 'Candidate Hub' : 'Recruiter Hub'}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(item => (
            <NavItem key={item.path} {...item} active={pathname === item.path} collapsed={collapsed && !isMobile} />
          ))}
        </div>

        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f1f4f9' }}>
          {(!collapsed || isMobile) && (
            <div className="text-label" style={{ padding: '4px 8px 8px', color: '#9ca3af', fontSize: '0.6rem' }}>Account</div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <NavItem path="/settings" label="Settings" icon={Settings} active={pathname === '/settings'} collapsed={collapsed && !isMobile} />
            <button className="nav-item btn-danger" onClick={() => { localStorage.clear(); router.push('/'); }}
              style={{ justifyContent: collapsed && !isMobile ? 'center' : 'flex-start', padding: collapsed && !isMobile ? 8 : '8px 12px' }}>
              <LogOut size={16} strokeWidth={2} style={{ flexShrink: 0 }} />
              {(!collapsed || isMobile) && 'Sign out'}
            </button>
          </div>
        </div>
      </nav>

      {/* User Footer */}
      {(!collapsed || isMobile) && (
        <div style={{ padding: '12px 8px', borderTop: '1px solid #f1f4f9', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px', borderRadius: 10, cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>
              {initials}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0d1117', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.name || 'Developer'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                Demo Mode
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Desktop Sidebar */}
      <aside style={{
        display: 'flex', flexDirection: 'column', position: 'fixed', left: 0, top: 0, bottom: 0,
        width: sidebarWidth, background: 'white', borderRight: '1px solid #e4e7ec',
        transition: 'width 0.25s ease', zIndex: 40, overflow: 'hidden',
      }} className="desktop-sidebar">
        {sidebarContent(false)}
      </aside>

      {/* Mobile Header */}
      <header style={{ display: 'none', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, height: 52, background: 'white', borderBottom: '1px solid #e4e7ec', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }} className="mobile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={13} color="white" strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '0.9375rem', letterSpacing: '-0.02em' }}>PoSA</span>
        </div>
        <button onClick={() => setMobileOpen(true)}
          style={{ width: 36, height: 36, borderRadius: 9, border: '1.5px solid #e4e7ec', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Menu size={17} color="#374151" />
        </button>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)', zIndex: 60 }} />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: 264, background: 'white', zIndex: 70, boxShadow: '4px 0 24px rgba(0,0,0,0.1)' }}>
              {sidebarContent(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main style={{ flex: 1, minWidth: 0, transition: 'padding-left 0.25s ease' }} className="main-content">
        {children}
      </main>

      <style>{`
        @media (min-width: 768px) {
          .desktop-sidebar { display: flex !important; }
          .mobile-header { display: none !important; }
          .main-content { padding-left: ${sidebarWidth}px !important; }
        }
        @media (max-width: 767px) {
          .desktop-sidebar { display: none !important; }
          .mobile-header { display: flex !important; }
          .main-content { padding-left: 0 !important; padding-top: 52px !important; }
        }
      `}</style>
    </div>
  );
}
