import React from 'react';
import { 
  LayoutDashboard, 
  FlaskConical, 
  Clock, 
  ShieldAlert, 
  FileText, 
  Bell, 
  History, 
  BarChart3, 
  Users, 
  Settings, 
  UserCheck, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, activeRole, stats }) {
  const navItems = [
    { id: 'dashboard', label: 'Main Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'role-dashboard', label: `${activeRole} View`, icon: UserCheck, badge: 'Role' },
    { id: 'trials', label: 'Clinical Trials', icon: FlaskConical, badge: stats?.totalTrials ? `${stats.totalTrials}` : null },
    { id: 'compliance', label: 'Compliance & Deadlines', icon: Clock, badge: stats?.overdueDeadlinesCount ? `⚠ ${stats.overdueDeadlinesCount}` : null, badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
    { id: 'safety', label: 'Safety Monitoring', icon: ShieldAlert, badge: stats?.openSafetyEventsCount ? `${stats.openSafetyEventsCount}` : null, badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    { id: 'documents', label: 'Documents Repository', icon: FileText, badge: null },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: stats?.upcomingDeadlinesCount ? `${stats.upcomingDeadlinesCount}` : null },
    { id: 'audit', label: 'Audit Log Ledger', icon: History, badge: null },
    { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3, badge: null },
    { id: 'users', label: 'User Directory', icon: Users, badge: null },
    { id: 'settings', label: 'System Settings', icon: Settings, badge: null }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 hidden md:flex min-h-[calc(100vh-61px)]">
      <div className="p-4 space-y-6">
        {/* AIIA Emblem Header */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md font-bold text-lg">
            🌿
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white tracking-wide leading-none">AIIA CTMMS</h1>
            <p className="text-[10px] text-emerald-400 font-medium mt-1">Ayurvedic Research Platform</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Role Card Banner */}
      <div className="p-4 border-t border-slate-800/80">
        <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs">
          <div className="flex items-center justify-between text-emerald-400 font-bold mb-1">
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> {activeRole}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Role-tailored compliance, safety & workflow actions active.
          </p>
        </div>
      </div>
    </aside>
  );
}
