import React, { useState } from 'react';
import { ShieldAlert, AlertCircle, AlertTriangle, CheckCircle2, Plus, Filter, User, Calendar, FileText } from 'lucide-react';

export default function SafetyView({ safetyEvents, onOpenReportSafety }) {
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const criticalEvents = safetyEvents.filter(s => s.severity === 'Critical');
  const openEvents = safetyEvents.filter(s => s.status !== 'Resolved');

  const filteredEvents = safetyEvents.filter(s => {
    const matchesSev = severityFilter === 'All' || s.severity === severityFilter;
    const matchesStat = statusFilter === 'All' || s.status === statusFilter;
    return matchesSev && matchesStat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Pharmacovigilance & Adverse Event Monitoring</h1>
            <span className="badge-red">{openEvents.length} Open Safety Reviews</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time adverse drug reaction (ADR) logging, severity triage, and pharmacovigilance intervention.
          </p>
        </div>

        <button
          onClick={onOpenReportSafety}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold text-xs shadow-lg shadow-rose-900/30 flex items-center justify-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Report Adverse Event</span>
        </button>
      </div>

      {/* Critical Event Top Warning Banner (AE-1024 Highlighted) */}
      {criticalEvents.map((evt) => (
        <div key={evt.id} className="p-4 rounded-2xl bg-rose-950/60 border-2 border-rose-500 text-rose-100 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-pulse">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-rose-900/80 border border-rose-400 text-rose-200 shrink-0 mt-0.5">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-extrabold text-sm text-white bg-rose-900 px-2 py-0.5 rounded border border-rose-400">
                  CRITICAL ALERT {evt.id}
                </span>
                <span className="text-xs text-rose-200 font-bold">Trial: {evt.trialId} • Participant: {evt.participantId}</span>
              </div>
              <h3 className="font-bold text-white text-sm mt-1">{evt.eventDescription}</h3>
              <p className="text-xs text-rose-200/90 mt-0.5">Action Taken: {evt.actionTaken}</p>
            </div>
          </div>

          <div className="shrink-0 text-right space-y-1">
            <div className="badge-red text-xs px-3 py-1 font-bold">SEVERITY: CRITICAL</div>
            <div className="text-[11px] text-rose-300">Assigned Safety Officer: <span className="font-bold text-white">{evt.assignedSafetyOfficer}</span></div>
          </div>
        </div>
      ))}

      {/* Toolbar Filters */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-emerald-400" /> Filter Safety Events:
          </span>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="Severe">Severe</option>
            <option value="Moderate">Moderate</option>
            <option value="Mild">Mild</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Statuses</option>
            <option value="Reported">Reported</option>
            <option value="Under Review">Under Review</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <span className="text-xs text-slate-400">
          Showing {filteredEvents.length} pharmacovigilance reports
        </span>
      </div>

      {/* Events Cards / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.map((evt) => {
          let sevBadge = 'badge-green';
          let borderStyle = 'border-slate-800';

          if (evt.severity === 'Critical') {
            sevBadge = 'badge-red';
            borderStyle = 'border-rose-500/50 bg-rose-950/20';
          } else if (evt.severity === 'Severe') {
            sevBadge = 'badge-red';
            borderStyle = 'border-rose-500/40';
          } else if (evt.severity === 'Moderate') {
            sevBadge = 'badge-yellow';
            borderStyle = 'border-amber-500/40';
          }

          return (
            <div key={evt.id} className={`glass-panel p-5 rounded-2xl border ${borderStyle} space-y-3 relative flex flex-col justify-between`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span className="font-mono font-extrabold text-sm text-white">{evt.id}</span>
                    <span className="font-mono text-xs text-emerald-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {evt.trialId}
                    </span>
                  </div>
                  <span className={sevBadge}>{evt.severity}</span>
                </div>

                <h3 className="font-bold text-slate-100 text-sm">{evt.eventDescription}</h3>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                  <div>Participant ID: <span className="text-slate-200 font-mono font-semibold">{evt.participantId}</span></div>
                  <div>Reported Date: <span className="text-slate-200 font-mono">{evt.dateReported}</span></div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px]">
                  <span className="text-emerald-400 font-bold">Intervention / Action: </span>
                  <span className="text-slate-300">{evt.actionTaken}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Officer: <span className="text-slate-200 font-medium">{evt.assignedSafetyOfficer}</span></span>
                <span className="font-semibold text-sky-400">Status: {evt.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
