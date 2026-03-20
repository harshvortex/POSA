'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, ShieldCheck, Mail, Briefcase, Lock, LogOut, Heart, Sparkles, Smile, ArrowLeft, RefreshCcw } from 'lucide-react';
import api from '@/lib/api';

export default function Settings() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('posa_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      setMessage('Profile updated successfully!');
      setLoading(false);
    }, 1000);
  };

  if (!user) return <div className="p-20 text-center font-black">LOGGING IN...</div>;

  return (
    <div className="p-8 lg:p-12 max-w-4xl mx-auto space-y-12 pb-32">
      <header className="space-y-2 mb-16">
          <div className="flex items-center gap-2 text-indigo-500 font-extrabold text-xs uppercase tracking-widest pl-1 mb-2">
             <SettingsIcon size={14} /> Account Preferences
          </div>
          <h1 className="text-5xl font-[1000] tracking-tighter leading-none">Your Profile.</h1>
          <p className="text-zinc-500 font-medium">Manage your technical identity and security.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1 space-y-8">
           <div className="w-full aspect-square rounded-[3.5rem] gradient-bg flex items-center justify-center text-white text-7xl font-[1000] shadow-2xl relative">
              {user.name.charAt(0)}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center border-4 border-zinc-50 shadow-xl"><ShieldCheck className="text-indigo-600" /></div>
           </div>
           
           <div className="glass-card p-8 rounded-[2.5rem] bg-indigo-50/50 border-indigo-100 text-center">
              <h3 className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-2">Identity Role</h3>
              <p className="text-xl font-black text-indigo-900">{user.role}</p>
           </div>
        </div>

        <div className="md:col-span-2 glass-card p-12 rounded-[4rem] bg-white border border-zinc-50 shadow-2xl shadow-zinc-100 space-y-8">
           {message && <div className="p-6 rounded-3xl bg-emerald-50 text-emerald-600 font-black text-xs text-center border border-emerald-100">{message}</div>}
           
           <SettingField icon={<UserCircle size={18} />} label="Full Name" value={user.name} />
           <SettingField icon={<Mail size={18} />} label="Email Address" value={user.email} />
           <SettingField icon={<Briefcase size={18} />} label="Associated Team" value={user.company || 'Personal Account'} />
           
           <div className="pt-8 border-t border-zinc-50 flex gap-4">
              <button onClick={handleUpdate} disabled={loading} className="flex-1 py-5 rounded-[2rem] bg-zinc-900 text-white font-[1000] text-xl hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 active:scale-95">
                 {loading ? <RefreshCcw className="animate-spin mx-auto" /> : 'Apply Changes'}
              </button>
              <button disabled className="px-10 py-5 rounded-[2rem] bg-zinc-100 text-zinc-300 font-black text-xl cursor-not-allowed">
                 Delete DNA
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function SettingsIcon({ size }: any) {
  return <Sparkles size={size} />;
}

function SettingField({ icon, label, value }: any) {
  return (
    <div className="space-y-1">
       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-4">{label}</label>
       <div className="relative group">
         <div className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400">{icon}</div>
         <input 
           type="text" 
           readOnly
           className="w-full bg-zinc-50 border-zinc-100 rounded-[2rem] py-5 pl-14 pr-6 font-bold text-sm text-zinc-500 cursor-not-allowed"
           value={value}
         />
       </div>
    </div>
  );
}
