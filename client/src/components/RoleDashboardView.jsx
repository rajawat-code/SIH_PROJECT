import React from 'react';
import { 
  UserCheck, 
  FlaskConical, 
  FileText, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Users, 
  BarChart3, 
  History, 
  ChevronRight,
  AlertTriangle,
  FileCheck,
  ShieldCheck
} from 'lucide-react';

export default function RoleDashboardView({ activeRole, trials, deadlines, safetyEvents, documents, auditLogs, onNavigate, onSelectTrial }) {
  // RESEARCHER PERSPECTIVE
  if (activeRole === 'Researcher') {
    const myTrials = trials.filter(t => t.pi === 'Dr. Rajesh Sharma' || t.pi === 'Dr. Sunita Varma');
    const myDeadlines = deadlines.filter(d => d.responsibleRole === 'Researcher');
    const pendingDocs = documents.filter(d => d.status === 'Pending Review' || d.status === 'Under Review');

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Researcher Workstation</h1>
              <span className="badge-green">Dr. Rajesh Sharma / Dr. Sunita Varma</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Personalized dashboard for Principal Investigators managing active trials, protocol progress & deadlines.
            </p>
          </div>
        </div>

        {/* 4 Stat Cards for Researcher */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">My Clinical Trials</span>
            <div className="text-3xl font-extrabold text-white mt-1">{myTrials.length}</div>
            <p className="text-[11px] text-emerald-300 mt-1">Active research protocols</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Upcoming Tasks & Deadlines</span>
            <div className="text-3xl font-extrabold text-white mt-1">{myDeadlines.length}</div>
            <p className="text-[11px] text-amber-300 mt-1">Assigned investigator actions</p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/40 text-sky-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Documents</span>
            <div className="text-3xl font-extrabold text-white mt-1">{pendingDocs.length}</div>
            <p className="text-[11px] text-sky-300 mt-1">Awaiting committee review</p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 text-purple-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Participant Enrollment</span>
            <div className="text-3xl font-extrabold text-white mt-1">82%</div>
            <p className="text-[11px] text-purple-300 mt-1">Mean recruitment target</p>
          </div>
        </div>

        {/* Section: My Trials List */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-bold text-white text-sm flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-emerald-400" /> My Assigned Clinical Protocols
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myTrials.map((t) => (
              <div key={t.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-400">{t.id}</span>
                  <span className="badge-green">{t.status}</span>
                </div>
                <h3 className="font-bold text-white text-sm">{t.title}</h3>
                <p className="text-[11px] text-emerald-300">Intervention: {t.intervention}</p>
                <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400 border-t border-slate-900">
                  <span>Enrolled: {t.enrolledParticipants}/{t.participants}</span>
                  <button onClick={() => onSelectTrial(t.id)} className="text-emerald-400 font-bold hover:underline">
                    View Trial Detail →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ETHICS COMMITTEE PERSPECTIVE
  if (activeRole === 'Ethics Committee') {
    const pendingEthicsDeadlines = deadlines.filter(d => d.responsibleRole === 'Ethics Committee');
    const ethicsDocs = documents.filter(d => d.category === 'Ethics Approval' || d.category === 'Consent Form' || d.category === 'Trial Protocol');

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Institutional Ethics Committee (IEC) Portal</h1>
              <span className="badge-blue">Prof. Vaidya B.K. Nambiar</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Review trial protocols, ethical clearances, informed consent forms, and regulatory compliance dossiers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/40 text-sky-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Trials Awaiting Ethics Clearance</span>
            <div className="text-3xl font-extrabold text-white mt-1">2</div>
            <p className="text-[11px] text-sky-300 mt-1">AYU-004 & AYU-002 protocols</p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 text-purple-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Approvals & Sign-offs</span>
            <div className="text-3xl font-extrabold text-white mt-1">{pendingEthicsDeadlines.length}</div>
            <p className="text-[11px] text-purple-300 mt-1">Action items assigned to IEC</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Approved Protocols</span>
            <div className="text-3xl font-extrabold text-white mt-1">6</div>
            <p className="text-[11px] text-emerald-300 mt-1">Cleared for participant enrollment</p>
          </div>
        </div>

        {/* Pending Ethics Reviews List */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-bold text-white text-sm flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-sky-400" /> Pending Ethics Reviews & Regulatory Clearance
          </h2>
          <div className="space-y-3">
            {pendingEthicsDeadlines.map((dl) => (
              <div key={dl.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sky-400">{dl.trialId}</span>
                    <span className="badge-yellow">{dl.status}</span>
                  </div>
                  <h3 className="font-bold text-white text-sm mt-1">{dl.activity}</h3>
                  <p className="text-[11px] text-slate-400">Target Deadline: {dl.deadline}</p>
                </div>
                <button
                  onClick={() => onNavigate('compliance')}
                  className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs"
                >
                  Review Dossier
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // SAFETY OFFICER PERSPECTIVE
  if (activeRole === 'Safety Officer') {
    const criticalSafety = safetyEvents.filter(s => s.severity === 'Critical' || s.severity === 'Severe');

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Pharmacovigilance & Safety Officer Hub</h1>
              <span className="badge-red">Dr. Amit Tripathi</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Safety event monitoring, adverse reaction triage, trial suspension orders, and safety reporting.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Critical Safety Alerts</span>
            <div className="text-3xl font-extrabold text-white mt-1">{criticalSafety.length}</div>
            <p className="text-[11px] text-rose-300 mt-1">AE-1024 Severe Allergic Reaction</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Safety Reviews</span>
            <div className="text-3xl font-extrabold text-white mt-1">3</div>
            <p className="text-[11px] text-amber-300 mt-1">Under investigation</p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/40 text-sky-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Safety Deadlines</span>
            <div className="text-3xl font-extrabold text-white mt-1">2</div>
            <p className="text-[11px] text-sky-300 mt-1">Annual Pharmacovigilance Report</p>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-bold text-white text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-rose-400" /> Active Adverse Event Investigations
          </h2>
          <div className="space-y-3">
            {safetyEvents.slice(0, 3).map((se) => (
              <div key={se.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-rose-400">{se.id}</span>
                    <span className="badge-red">{se.severity}</span>
                  </div>
                  <h3 className="font-bold text-white text-sm mt-1">{se.eventDescription}</h3>
                  <p className="text-[11px] text-slate-400">Trial: {se.trialId} • Participant: {se.participantId}</p>
                </div>
                <button
                  onClick={() => onNavigate('safety')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                >
                  Manage Event
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ADMINISTRATOR PERSPECTIVE (Default)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">System Administrator Dashboard</h1>
            <span className="badge-purple">Ministry of Ayush / AIIA Admin</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Global system analytics, compliance audit oversight, trial management, and access authorization.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 text-purple-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total System Trials</span>
          <div className="text-3xl font-extrabold text-white mt-1">{trials.length}</div>
          <p className="text-[11px] text-purple-300 mt-1">Across 4 AIIA institutions</p>
        </div>

        <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/40 text-sky-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active System Users</span>
          <div className="text-3xl font-extrabold text-white mt-1">7</div>
          <p className="text-[11px] text-sky-300 mt-1">Researchers, Ethics & Safety Officers</p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Compliance Rate</span>
          <div className="text-3xl font-extrabold text-white mt-1">92.4%</div>
          <p className="text-[11px] text-emerald-300 mt-1">On-time regulatory submissions</p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Audit Log Entries</span>
          <div className="text-3xl font-extrabold text-white mt-1">{auditLogs.length}</div>
          <p className="text-[11px] text-amber-300 mt-1">Immutable activity ledger</p>
        </div>
      </div>

      {/* Admin Audit Overview */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-white text-sm flex items-center gap-2">
            <History className="w-4 h-4 text-purple-400" /> Recent System Audit Logs
          </h2>
          <button onClick={() => onNavigate('audit')} className="text-xs text-purple-400 hover:underline">
            View Complete Audit Ledger →
          </button>
        </div>
        <div className="space-y-2">
          {auditLogs.slice(0, 4).map((log) => (
            <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white">{log.user} ({log.role}): </span>
                <span className="text-slate-300">{log.action}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
