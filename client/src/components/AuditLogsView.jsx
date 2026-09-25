import React, { useState } from 'react';
import { History, Shield, Filter, Search, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export default function AuditLogsView({ auditLogs }) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.trialId.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === 'All' || log.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">System Audit & Traceability Ledger</h1>
            <span className="badge-purple">Immutable Chain of Custody</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete chronological ledger tracking every protocol edit, safety event, ethics approval, and deadline state change.
          </p>
        </div>
      </div>

      {/* Toolbar Filters */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail by user, action, trial ID..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Role Filter:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Roles</option>
            <option value="Researcher">Researcher</option>
            <option value="Ethics Committee">Ethics Committee</option>
            <option value="Safety Officer">Safety Officer</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Log Entry ID</th>
                <th className="p-3.5">User Name & Role</th>
                <th className="p-3.5">System Action Executed</th>
                <th className="p-3.5">Trial ID</th>
                <th className="p-3.5">Date & Time</th>
                <th className="p-3.5 text-right">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                    {log.id}
                  </td>
                  <td className="p-3.5 font-bold text-white whitespace-nowrap">
                    {log.user}
                    <div className="text-[10px] text-emerald-400 font-normal">{log.role}</div>
                  </td>
                  <td className="p-3.5 font-medium text-slate-200 leading-snug">
                    {log.action}
                  </td>
                  <td className="p-3.5 font-mono font-extrabold text-emerald-400 whitespace-nowrap">
                    {log.trialId}
                  </td>
                  <td className="p-3.5 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <span className={
                      log.severity === 'Critical' ? 'badge-red' :
                      log.severity === 'Warning' ? 'badge-yellow' :
                      log.severity === 'Success' ? 'badge-green' : 'badge-blue'
                    }>
                      {log.severity || 'Info'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
