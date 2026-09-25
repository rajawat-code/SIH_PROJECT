import React, { useState } from 'react';
import { Bell, Search, User, LogOut, Shield, ChevronDown, CheckCheck, AlertCircle, AlertTriangle, Info, CheckCircle, RefreshCw, Lock } from 'lucide-react';

export default function Header({ user, onLogout, notifications, onMarkAllNotificationsRead, onRoleChange, onSearchQuery, activeRole }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [search, setSearch] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;
  const isAdmin = user?.role === 'Administrator';

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    onSearchQuery(e.target.value);
  };

  const roleOptions = [
    { role: 'Researcher', name: 'Dr. Rajesh Sharma' },
    { role: 'Ethics Committee', name: 'Prof. Vaidya B.K. Nambiar' },
    { role: 'Safety Officer', name: 'Dr. Amit Tripathi' },
    { role: 'Administrator', name: 'Admin Secretariat' }
  ];

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 md:px-6 py-3 flex items-center justify-between gap-4">
      {/* Search Input */}
      <div className="flex-1 max-w-md relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Global search trials (e.g. AYU-001, Ashwagandha, Dr. Sharma)..."
          className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs md:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Role Access Security Pill */}
        <div className="relative">
          {isAdmin ? (
            /* Admin can switch audit view context */
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 bg-slate-950/80 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-purple-500/40 text-xs font-semibold text-purple-300 transition-all"
              title="Admin Audit View Switcher"
            >
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Admin Audit Context: {activeRole}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          ) : (
            /* Non-Admin users are locked to their assigned role */
            <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/40 text-xs font-semibold text-emerald-300 cursor-default">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Role: {user?.role || activeRole}</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800/60 hidden md:inline">Assigned</span>
            </div>
          )}

          {isAdmin && showRoleMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
              <div className="px-3 py-2 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Admin Audit View Switcher
              </div>
              {roleOptions.map((opt) => (
                <button
                  key={opt.role}
                  onClick={() => {
                    onRoleChange(opt.role);
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 ${activeRole === opt.role ? 'text-purple-400 font-bold bg-purple-950/30' : 'text-slate-300'}`}
                >
                  <div>
                    <div>{opt.role}</div>
                    <div className="text-[10px] text-slate-400">{opt.name}</div>
                  </div>
                  {activeRole === opt.role && <span className="w-2 h-2 rounded-full bg-purple-400"></span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Bell Drawer */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 relative text-slate-300 hover:text-white transition-all"
            title="Notification Center"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-xs text-white">Notifications ({notifications.length})</span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllNotificationsRead}
                    className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/80">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 text-xs flex items-start gap-3 transition-colors ${!n.read ? 'bg-slate-800/50' : 'bg-transparent hover:bg-slate-800/20'}`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {n.type === 'critical' && <AlertCircle className="w-4 h-4 text-rose-400" />}
                        {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                        {n.type === 'completed' && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                        {n.type === 'info' && <Info className="w-4 h-4 text-sky-400" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold ${n.type === 'critical' ? 'text-rose-300' : 'text-slate-200'}`}>{n.title}</span>
                          <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">{n.message}</p>
                        {n.trialId && (
                          <span className="inline-block mt-1 text-[10px] font-mono px-1.5 py-0.5 bg-slate-950 text-emerald-400 rounded border border-slate-800">
                            {n.trialId}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Info */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 font-bold text-xs text-white flex items-center justify-center shadow">
            {user?.avatar || 'US'}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-slate-200 leading-none">{user?.name || 'User'}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{activeRole}</div>
          </div>
          <button
            onClick={onLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-all ml-1"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
