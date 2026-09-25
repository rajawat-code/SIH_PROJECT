import React from 'react';
import { 
  FlaskConical, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldAlert, 
  ArrowUpRight, 
  ChevronRight, 
  Layers, 
  FileText,
  Plus,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function DashboardView({ stats, trials, deadlines, safetyEvents, onNavigate, onSelectTrial, onOpenCreateTrial }) {
  const statCards = [
    {
      title: 'Total Trials',
      value: stats?.totalTrials || 8,
      subtitle: 'Ayurvedic Clinical Studies',
      icon: FlaskConical,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      title: 'Active Trials',
      value: stats?.activeTrials || 5,
      subtitle: 'Currently in Treatment / Recr.',
      icon: Activity,
      color: 'from-sky-500/20 to-blue-500/20 text-sky-400 border-sky-500/30'
    },
    {
      title: 'Completed Trials',
      value: stats?.completedTrials || 2,
      subtitle: 'Final Reports Archived',
      icon: CheckCircle2,
      color: 'from-emerald-600/20 to-green-500/20 text-emerald-300 border-emerald-600/30'
    },
    {
      title: 'Requiring Attention',
      value: stats?.requiringAttention || 3,
      subtitle: 'Under Review / Suspended',
      icon: AlertTriangle,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30'
    },
    {
      title: 'Upcoming Deadlines',
      value: stats?.upcomingDeadlinesCount || 4,
      subtitle: `${stats?.overdueDeadlinesCount || 2} Overdue Deadlines`,
      icon: Clock,
      color: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30'
    },
    {
      title: 'Open Safety Events',
      value: stats?.openSafetyEventsCount || 3,
      subtitle: `${stats?.criticalSafetyEventsCount || 1} Critical Alert`,
      icon: ShieldAlert,
      color: 'from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30'
    }
  ];

  // Status Counts for Overview
  const statusOverview = [
    { label: 'Planning', count: trials.filter(t => t.status === 'Planning').length, color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
    { label: 'Ongoing', count: trials.filter(t => t.status === 'Ongoing').length, color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
    { label: 'Under Review', count: trials.filter(t => t.status === 'Under Review').length, color: 'bg-sky-500/20 text-sky-300 border-sky-500/40' },
    { label: 'Completed', count: trials.filter(t => t.status === 'Completed').length, color: 'bg-green-500/20 text-green-300 border-green-500/40' },
    { label: 'Suspended', count: trials.filter(t => t.status === 'Suspended').length, color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Executive Clinical Trial Dashboard</h1>
            <span className="badge-green">AIIA Real-time Monitoring</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Centralized monitoring engine for Ayurvedic Clinical Trials across All India Institute of Ayurveda campuses.
          </p>
        </div>

        <button
          onClick={onOpenCreateTrial}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Trial</span>
        </button>
      </div>

      {/* Top Statistic Cards (6 Cards Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl glass-card border bg-gradient-to-br ${card.color} flex flex-col justify-between space-y-3 relative overflow-hidden transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">{card.title}</span>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-white/10">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-white">{card.value}</div>
                <p className="text-[10px] text-slate-300 mt-0.5 truncate">{card.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trial Status Overview Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white">Trial Status Overview</h2>
          </div>
          <span className="text-xs text-slate-400">{trials.length} total active & completed protocols</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {statusOverview.map((item, idx) => (
            <div key={idx} className={`p-3 rounded-xl border ${item.color} flex flex-col justify-between`}>
              <div className="text-xs text-slate-300 font-semibold">{item.label}</div>
              <div className="text-2xl font-extrabold text-white mt-1">{item.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Grid: Upcoming Deadlines & Urgent Safety Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Upcoming & Compliance Deadlines Feed */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white">Upcoming & Critical Regulatory Deadlines</h2>
            </div>
            <button
              onClick={() => onNavigate('compliance')}
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
            >
              View Compliance Hub <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5 divide-y divide-slate-800/60">
            {deadlines.slice(0, 5).map((dl) => {
              let badgeClass = 'badge-green';
              if (dl.status === 'Overdue') badgeClass = 'badge-red';
              else if (dl.status === 'Due Soon') badgeClass = 'badge-yellow';
              else if (dl.status === 'Under Review') badgeClass = 'badge-blue';

              return (
                <div key={dl.id} className="pt-2.5 first:pt-0 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[10px] font-bold text-emerald-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                      {dl.trialId}
                    </span>
                    <div>
                      <div className="font-bold text-slate-200">{dl.activity}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Responsible: <span className="text-slate-300 font-medium">{dl.responsibleRole}</span> ({dl.assignedTo})
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={badgeClass}>{dl.status}</span>
                    <div className="text-[10px] text-slate-400 mt-1">Due: {dl.deadline}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Critical Safety Alerts & High Risk Protocols */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <h2 className="text-sm font-bold text-white">Active Safety & Pharmacovigilance</h2>
            </div>
            <button
              onClick={() => onNavigate('safety')}
              className="text-xs text-rose-400 hover:underline flex items-center gap-1 font-semibold"
            >
              Safety Hub <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Highlighted Critical Event Box */}
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/50 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-rose-400 font-bold">AE-1024 • AYU-008</span>
              <span className="badge-red">CRITICAL EVENT</span>
            </div>
            <p className="font-semibold text-rose-200">
              Severe acute allergic contact dermatitis in Psoriasis trial. Dosing suspended.
            </p>
            <div className="text-[11px] text-slate-300 flex items-center justify-between pt-1 border-t border-rose-900/50">
              <span>Officer: Dr. Amit Tripathi</span>
              <span className="text-rose-400 font-bold">Action Required</span>
            </div>
          </div>

          {/* List of Recent Safety Items */}
          <div className="space-y-2">
            {safetyEvents.slice(1, 4).map((event) => (
              <div key={event.id} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-200 truncate max-w-[200px]">{event.eventDescription}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Trial: {event.trialId} • {event.participantId}</div>
                </div>
                <span className={event.severity === 'Critical' || event.severity === 'Severe' ? 'badge-red' : event.severity === 'Moderate' ? 'badge-yellow' : 'badge-green'}>
                  {event.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Clinical Trial Spotlight Table */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white">Active Ayurvedic Research Trials Summary</h2>
          </div>
          <button
            onClick={() => onNavigate('trials')}
            className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
          >
            View All Trials <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3">Trial ID</th>
                <th className="p-3">Title & Intervention</th>
                <th className="p-3">Principal Investigator</th>
                <th className="p-3">Phase</th>
                <th className="p-3">Participants</th>
                <th className="p-3">Status</th>
                <th className="p-3">Risk</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {trials.slice(0, 5).map((trial) => (
                <tr key={trial.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono font-bold text-emerald-400">{trial.id}</td>
                  <td className="p-3">
                    <div className="font-bold text-white max-w-xs truncate">{trial.title}</div>
                    <div className="text-[11px] text-emerald-300 mt-0.5">{trial.intervention}</div>
                  </td>
                  <td className="p-3 font-medium text-slate-200">{trial.pi}</td>
                  <td className="p-3 font-semibold text-slate-300">{trial.phase}</td>
                  <td className="p-3 font-mono text-slate-300">{trial.enrolledParticipants}/{trial.participants}</td>
                  <td className="p-3">
                    <span className={
                      trial.status === 'Ongoing' ? 'badge-green' :
                      trial.status === 'Under Review' ? 'badge-blue' :
                      trial.status === 'Completed' ? 'badge-purple' :
                      trial.status === 'Suspended' ? 'badge-red' : 'badge-yellow'
                    }>
                      {trial.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={trial.riskLevel === 'High' ? 'text-rose-400 font-bold' : trial.riskLevel === 'Medium' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {trial.riskLevel}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onSelectTrial(trial.id)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-[11px] border border-slate-700 inline-flex items-center gap-1"
                    >
                      <span>Overview</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
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
