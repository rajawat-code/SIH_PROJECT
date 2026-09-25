import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { BarChart3, TrendingUp, ShieldAlert, Clock, Layers } from 'lucide-react';

export default function AnalyticsView({ trials, deadlines, safetyEvents }) {
  // Chart 1: Trials by Status
  const statusCounts = {
    Ongoing: trials.filter(t => t.status === 'Ongoing').length,
    'Under Review': trials.filter(t => t.status === 'Under Review').length,
    Planning: trials.filter(t => t.status === 'Planning').length,
    Completed: trials.filter(t => t.status === 'Completed').length,
    Suspended: trials.filter(t => t.status === 'Suspended').length,
  };

  const statusData = Object.keys(statusCounts).map(key => ({
    name: key,
    value: statusCounts[key]
  }));

  const STATUS_COLORS = ['#10b981', '#38bdf8', '#a855f7', '#34d399', '#f43f5e'];

  // Chart 2: Trials by Phase
  const phaseCounts = {
    'Phase I': trials.filter(t => t.phase.includes('I') && !t.phase.includes('II') && !t.phase.includes('III')).length,
    'Phase I/II': trials.filter(t => t.phase === 'Phase I/II').length,
    'Phase II': trials.filter(t => t.phase === 'Phase II').length,
    'Phase III': trials.filter(t => t.phase === 'Phase III').length,
    'Phase IV': trials.filter(t => t.phase === 'Phase IV').length,
  };

  const phaseData = Object.keys(phaseCounts).map(key => ({
    phase: key,
    count: phaseCounts[key]
  }));

  // Chart 3: Deadlines Health Status
  const deadlineHealthData = [
    { name: 'On Track', count: deadlines.filter(d => d.status === 'On Track').length, color: '#10b981' },
    { name: 'Due Soon', count: deadlines.filter(d => d.status === 'Due Soon').length, color: '#f59e0b' },
    { name: 'Overdue', count: deadlines.filter(d => d.status === 'Overdue').length, color: '#f43f5e' },
    { name: 'Completed', count: deadlines.filter(d => d.status === 'Completed').length, color: '#38bdf8' }
  ];

  // Chart 4: Safety Events by Severity
  const severityData = [
    { severity: 'Mild', count: safetyEvents.filter(s => s.severity === 'Mild').length, fill: '#34d399' },
    { severity: 'Moderate', count: safetyEvents.filter(s => s.severity === 'Moderate').length, fill: '#f59e0b' },
    { severity: 'Severe', count: safetyEvents.filter(s => s.severity === 'Severe').length, fill: '#f97316' },
    { severity: 'Critical', count: safetyEvents.filter(s => s.severity === 'Critical').length, fill: '#f43f5e' }
  ];

  // Chart 5: Trial Participant Enrollment Rates
  const enrollmentData = trials.slice(0, 6).map(t => ({
    id: t.id,
    Target: t.participants,
    Enrolled: t.enrolledParticipants
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Clinical Research & Compliance Analytics</h1>
            <span className="badge-green">Live Visual Metrics</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time visual breakdown of trial distribution, regulatory health, safety severity, and enrollment progress.
          </p>
        </div>
      </div>

      {/* Grid Row 1: Status Donut & Phase Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trials by Status */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-bold text-white text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" /> Clinical Trials Distribution by Status
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trials by Phase */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-bold text-white text-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" /> Trial Breakdown by Clinical Phase
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={phaseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="phase" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#38bdf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid Row 2: Compliance Deadlines & Safety Severity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Compliance Status Breakdown */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-bold text-white text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" /> Compliance Deadline Health (On Track vs Overdue)
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deadlineHealthData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#f59e0b" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Safety Events by Severity */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-bold text-white text-sm flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" /> Adverse Safety Events by Severity Classification
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="severity" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#f43f5e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid Row 3: Target vs Actual Enrollment Progress */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="font-bold text-white text-sm flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" /> Participant Target vs Actual Enrolled Progress
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="id" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Target" fill="#334155" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Enrolled" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
