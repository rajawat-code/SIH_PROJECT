import React, { useState } from 'react';
import { Search, Filter, Plus, ArrowUpRight, Shield, Activity, Users, Calendar, AlertCircle } from 'lucide-react';

export default function ClinicalTrialsView({ trials, searchQuery, onSelectTrial, onOpenCreateTrial }) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [phaseFilter, setPhaseFilter] = useState('All');
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = (searchQuery || localSearch).toLowerCase();

  const filteredTrials = trials.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(effectiveSearch) ||
      t.title.toLowerCase().includes(effectiveSearch) ||
      t.pi.toLowerCase().includes(effectiveSearch) ||
      t.intervention.toLowerCase().includes(effectiveSearch);

    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesRisk = riskFilter === 'All' || t.riskLevel === riskFilter;
    const matchesPhase = phaseFilter === 'All' || t.phase === phaseFilter;

    return matchesSearch && matchesStatus && matchesRisk && matchesPhase;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Clinical Trials Management <span className="badge-green">{trials.length} Active Protocols</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Search, filter, and monitor all Ayurvedic research clinical trials across AIIA departments.
          </p>
        </div>

        <button
          onClick={onOpenCreateTrial}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Trial</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search trial ID, title, intervention, researcher..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none text-xs font-medium cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Statuses</option>
              <option value="Ongoing" className="bg-slate-900">Ongoing</option>
              <option value="Under Review" className="bg-slate-900">Under Review</option>
              <option value="Planning" className="bg-slate-900">Planning</option>
              <option value="Completed" className="bg-slate-900">Completed</option>
              <option value="Suspended" className="bg-slate-900">Suspended</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none text-xs font-medium cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Risk Levels</option>
              <option value="Low" className="bg-slate-900">Low Risk</option>
              <option value="Medium" className="bg-slate-900">Medium Risk</option>
              <option value="High" className="bg-slate-900">High Risk</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Activity className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={phaseFilter}
              onChange={(e) => setPhaseFilter(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none text-xs font-medium cursor-pointer"
            >
              <option value="All" className="bg-slate-900">All Phases</option>
              <option value="Phase I" className="bg-slate-900">Phase I</option>
              <option value="Phase I/II" className="bg-slate-900">Phase I/II</option>
              <option value="Phase II" className="bg-slate-900">Phase II</option>
              <option value="Phase III" className="bg-slate-900">Phase III</option>
              <option value="Phase IV" className="bg-slate-900">Phase IV</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Trial ID</th>
                <th className="p-3.5">Trial Title & Description</th>
                <th className="p-3.5">Ayurvedic Intervention</th>
                <th className="p-3.5">Researcher (PI)</th>
                <th className="p-3.5">Phase</th>
                <th className="p-3.5">Participants</th>
                <th className="p-3.5">Start Date</th>
                <th className="p-3.5">End Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Risk Level</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {filteredTrials.length === 0 ? (
                <tr>
                  <td colSpan="11" className="p-8 text-center text-slate-400 text-xs">
                    No clinical trials match the specified search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredTrials.map((trial) => (
                  <tr key={trial.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-mono font-extrabold text-emerald-400 whitespace-nowrap">
                      {trial.id}
                    </td>
                    <td className="p-3.5 max-w-xs">
                      <div className="font-bold text-white leading-snug">{trial.title}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{trial.institution}</div>
                    </td>
                    <td className="p-3.5 font-semibold text-emerald-300">
                      {trial.intervention}
                    </td>
                    <td className="p-3.5 font-medium text-slate-200 whitespace-nowrap">
                      {trial.pi}
                    </td>
                    <td className="p-3.5 font-semibold text-slate-300 whitespace-nowrap">
                      {trial.phase}
                    </td>
                    <td className="p-3.5 font-mono text-slate-200 whitespace-nowrap">
                      {trial.enrolledParticipants}/{trial.participants}
                    </td>
                    <td className="p-3.5 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {trial.startDate}
                    </td>
                    <td className="p-3.5 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {trial.endDate}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className={
                        trial.status === 'Ongoing' ? 'badge-green' :
                        trial.status === 'Under Review' ? 'badge-blue' :
                        trial.status === 'Completed' ? 'badge-purple' :
                        trial.status === 'Suspended' ? 'badge-red' : 'badge-yellow'
                      }>
                        {trial.status}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className={
                        trial.riskLevel === 'High' ? 'text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30' :
                        trial.riskLevel === 'Medium' ? 'text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30' :
                        'text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30'
                      }>
                        {trial.riskLevel}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => onSelectTrial(trial.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow inline-flex items-center gap-1 transition-all"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
