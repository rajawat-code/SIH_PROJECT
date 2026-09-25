import React, { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle2, ShieldAlert, Filter, Check, Calendar, ArrowRight } from 'lucide-react';

export default function ComplianceView({ deadlines, onCompleteDeadline, activeRole, currentUser }) {
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const overdueCount = deadlines.filter(d => d.status === 'Overdue').length;
  const dueSoonCount = deadlines.filter(d => d.status === 'Due Soon').length;
  const onTrackCount = deadlines.filter(d => d.status === 'On Track').length;
  const completedCount = deadlines.filter(d => d.status === 'Completed').length;

  const filteredDeadlines = deadlines.filter(d => {
    const matchesRole = filterRole === 'All' || d.responsibleRole === filterRole;
    const matchesStatus = filterStatus === 'All' || d.status === filterStatus;
    return matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Compliance & Deadline Engine</h1>
            <span className="badge-yellow">Core SIH26046 Feature</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Automated compliance calculator tracking regulatory reports, ethics clearance, and pharmacovigilance milestones.
          </p>
        </div>
      </div>

      {/* Overdue & Warning Cards Section (Top Callouts) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/50 text-rose-200 flex items-center justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-2 font-bold text-rose-400 text-sm">
              <AlertTriangle className="w-4 h-4 animate-bounce" /> ⚠ {overdueCount} Deadlines Overdue
            </div>
            <p className="text-[11px] text-slate-300 mt-1">Requires immediate regulatory escalation</p>
          </div>
          <div className="text-3xl font-extrabold text-rose-400">{overdueCount}</div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/50 text-amber-200 flex items-center justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
              <Clock className="w-4 h-4" /> ⚠ {dueSoonCount} Due Within 7 Days
            </div>
            <p className="text-[11px] text-slate-300 mt-1">Approaching scheduled milestone</p>
          </div>
          <div className="text-3xl font-extrabold text-amber-400">{dueSoonCount}</div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 flex items-center justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
              <CheckCircle2 className="w-4 h-4" /> {onTrackCount} On Track
            </div>
            <p className="text-[11px] text-slate-300 mt-1">Compliance milestones on schedule</p>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">{onTrackCount}</div>
        </div>

        <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/50 text-sky-200 flex items-center justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-2 font-bold text-sky-400 text-sm">
              <CheckCircle2 className="w-4 h-4" /> {completedCount} Completed
            </div>
            <p className="text-[11px] text-slate-300 mt-1">Successfully fulfilled tasks</p>
          </div>
          <div className="text-3xl font-extrabold text-sky-400">{completedCount}</div>
        </div>
      </div>

      {/* Toolbar Filters */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-emerald-400" /> Filter Compliance Deadlines:
          </span>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Roles</option>
            <option value="Researcher">Researcher</option>
            <option value="Ethics Committee">Ethics Committee</option>
            <option value="Safety Officer">Safety Officer</option>
            <option value="Administrator">Administrator</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Statuses</option>
            <option value="Overdue">Overdue</option>
            <option value="Due Soon">Due Soon</option>
            <option value="On Track">On Track</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <span className="text-xs text-slate-400">
          Showing {filteredDeadlines.length} compliance entries
        </span>
      </div>

      {/* Table of Deadlines */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Trial ID</th>
                <th className="p-3.5">Activity & Description</th>
                <th className="p-3.5">Target Deadline</th>
                <th className="p-3.5">Responsible Role</th>
                <th className="p-3.5">Assigned Officer</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {filteredDeadlines.map((dl) => {
                let statusBadge = 'badge-green';
                if (dl.status === 'Overdue') statusBadge = 'badge-red';
                else if (dl.status === 'Due Soon') statusBadge = 'badge-yellow';
                else if (dl.status === 'Completed') statusBadge = 'badge-blue';

                return (
                  <tr key={dl.id} className={`hover:bg-slate-800/40 transition-colors ${dl.status === 'Overdue' ? 'bg-rose-950/10' : ''}`}>
                    <td className="p-3.5 font-mono font-extrabold text-emerald-400 whitespace-nowrap">
                      {dl.trialId}
                    </td>
                    <td className="p-3.5 font-bold text-white max-w-sm">
                      {dl.activity}
                    </td>
                    <td className="p-3.5 font-mono text-slate-300 whitespace-nowrap">
                      {dl.deadline}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-200 whitespace-nowrap">
                      {dl.responsibleRole}
                    </td>
                    <td className="p-3.5 text-slate-400 whitespace-nowrap">
                      {dl.assignedTo}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className={statusBadge}>{dl.status}</span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      {dl.status !== 'Completed' ? (
                        <button
                          onClick={() => onCompleteDeadline(dl.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow inline-flex items-center gap-1.5 transition-all"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark Completed</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 justify-end">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Done
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
