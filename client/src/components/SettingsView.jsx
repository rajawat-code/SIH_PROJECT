import React from 'react';
import { Settings, Shield, Bell, Database, Lock, Server } from 'lucide-react';

export default function SettingsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            System Configuration & Settings <span className="badge-green">AIIA Enterprise</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global compliance rules, automated deadline thresholds, pharmacovigilance severity algorithms, and system integrations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Compliance Settings */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-bold text-white text-sm flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" /> Compliance & Deadline Thresholds
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium">Overdue Deadline Escalation Window</span>
              <span className="font-mono text-emerald-400 font-bold bg-slate-950 px-2 py-1 rounded">7 Days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium">Automatic Email Alerts to PIs</span>
              <span className="badge-green">Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium">Ethics Clearance Expiry Warning</span>
              <span className="font-mono text-amber-400 font-bold bg-slate-950 px-2 py-1 rounded">30 Days</span>
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-bold text-white text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 text-sky-400" /> Security & Role Governance
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium">JWT Token Expiration</span>
              <span className="font-mono text-sky-400 font-bold bg-slate-950 px-2 py-1 rounded">24 Hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium">Role-Based Access Control (RBAC)</span>
              <span className="badge-purple">Strict Enforced</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium">Audit Trail Logging Level</span>
              <span className="badge-green">Full Verbose</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
