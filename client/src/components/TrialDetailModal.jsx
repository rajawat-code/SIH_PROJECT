import React, { useState } from 'react';
import { 
  X, 
  FlaskConical, 
  User, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  FileText, 
  History, 
  Layers, 
  Users, 
  Check, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export default function TrialDetailModal({ trialId, trials, deadlines, safetyEvents, documents, auditLogs, onClose }) {
  const [activeTab, setActiveTab] = useState('Overview');

  const trial = trials.find(t => t.id.toUpperCase() === (trialId || '').toUpperCase()) || trials[0];

  const lifecycleStages = [
    'Planning',
    'Registration',
    'Ethics Approval',
    'Recruitment',
    'Treatment',
    'Monitoring',
    'Completion',
    'Final Report'
  ];

  const currentStageIndex = lifecycleStages.indexOf(trial.lifecycleStage) >= 0 
    ? lifecycleStages.indexOf(trial.lifecycleStage) 
    : 4; // Default to Treatment if not exact

  const trialDeadlines = deadlines.filter(d => d.trialId.toUpperCase() === trial.id.toUpperCase());
  const trialSafety = safetyEvents.filter(s => s.trialId.toUpperCase() === trial.id.toUpperCase());
  const trialDocs = documents.filter(doc => doc.trialId.toUpperCase() === trial.id.toUpperCase());
  const trialLogs = auditLogs.filter(l => l.trialId.toUpperCase() === trial.id.toUpperCase());

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-base font-extrabold text-emerald-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                {trial.id}
              </span>
              <span className={
                trial.status === 'Ongoing' ? 'badge-green' :
                trial.status === 'Under Review' ? 'badge-blue' :
                trial.status === 'Completed' ? 'badge-purple' :
                trial.status === 'Suspended' ? 'badge-red' : 'badge-yellow'
              }>
                {trial.status}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{trial.phase}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white leading-tight mt-2">
              {trial.title}
            </h2>
            <p className="text-xs text-emerald-400 font-medium">Intervention: {trial.intervention}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-all shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Lifecycle / Stage Timeline */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 overflow-x-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-400" /> Trial Lifecycle Stage Progression
          </div>
          <div className="flex items-center justify-between min-w-[700px] gap-1">
            {lifecycleStages.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div key={stage} className="flex-1 flex flex-col items-center relative">
                  <div className="flex items-center w-full">
                    <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center border transition-all z-10 ${
                      isCurrent ? 'bg-emerald-400 text-slate-950 border-emerald-300 ring-4 ring-emerald-500/20 scale-110' :
                      isPast ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50' : 'bg-slate-950 text-slate-500 border-slate-800'
                    }`}>
                      {isPast ? <Check className="w-4 h-4" /> : idx + 1}
                    </div>
                    {idx < lifecycleStages.length - 1 && (
                      <div className={`h-1 flex-1 ${idx < currentStageIndex ? 'bg-emerald-500' : 'bg-slate-800'}`}></div>
                    )}
                  </div>
                  <span className={`text-[10px] font-semibold mt-1.5 text-center ${
                    isCurrent ? 'text-emerald-300 font-bold' : isPast ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-2 px-6 pt-3 bg-slate-950 border-b border-slate-800 overflow-x-auto">
          {['Overview', 'Participants', 'Milestones', 'Safety Events', 'Documents', 'Audit History'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'border-emerald-400 text-emerald-400 bg-slate-900/50 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab} {tab === 'Safety Events' && trialSafety.length > 0 && <span className="badge-red ml-1">{trialSafety.length}</span>}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {activeTab === 'Overview' && (
            <div className="space-y-6">
              {/* Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Principal Investigator</span>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <User className="w-4 h-4 text-emerald-400" /> {trial.pi}
                  </div>
                  <p className="text-[11px] text-slate-400">{trial.piEmail}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Research Institution</span>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-sky-400" /> {trial.institution}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Trial Schedule & Risk</span>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400" /> {trial.startDate} → {trial.endDate}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Risk Level: <span className="font-bold text-rose-400">{trial.riskLevel}</span>
                  </div>
                </div>
              </div>

              {/* Protocol Description */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h3 className="font-bold text-white text-sm">Clinical Protocol Description</h3>
                <p className="text-slate-300 leading-relaxed">{trial.description}</p>
              </div>

              {/* Deadlines Breakdown for this trial */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" /> Trial Specific Compliance Deadlines
                </h3>
                <div className="space-y-2">
                  {trialDeadlines.length === 0 ? (
                    <p className="text-slate-400">No active deadlines registered for this protocol.</p>
                  ) : (
                    trialDeadlines.map((dl) => (
                      <div key={dl.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-200">{dl.activity}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">Role: {dl.responsibleRole} ({dl.assignedTo})</div>
                        </div>
                        <div className="text-right">
                          <span className={dl.status === 'Overdue' ? 'badge-red' : dl.status === 'Due Soon' ? 'badge-yellow' : 'badge-green'}>{dl.status}</span>
                          <div className="text-[10px] text-slate-400 mt-1">Due: {dl.deadline}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Participants' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">Participant Recruitment Stats</h3>
                  <p className="text-slate-400">Target Cohort Size: {trial.participants} subjects</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-emerald-400">{trial.enrolledParticipants} / {trial.participants}</div>
                  <p className="text-slate-400 text-[10px]">{Math.round((trial.enrolledParticipants / trial.participants) * 100)}% Enrolled</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, Math.round((trial.enrolledParticipants / trial.participants) * 100))}%` }}
                ></div>
              </div>
            </div>
          )}

          {activeTab === 'Milestones' && (
            <div className="space-y-3">
              {(trial.milestones || []).map((m) => (
                <div key={m.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      m.status === 'Completed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' :
                      m.status === 'In Progress' ? 'bg-amber-950 text-amber-400 border border-amber-500/40' :
                      'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}>
                      {m.status === 'Completed' ? <Check className="w-4 h-4" /> : '•'}
                    </div>
                    <div>
                      <div className="font-bold text-white">{m.title}</div>
                      <div className="text-[11px] text-slate-400">Target Date: {m.date}</div>
                    </div>
                  </div>
                  <span className={m.status === 'Completed' ? 'badge-green' : m.status === 'In Progress' ? 'badge-yellow' : 'badge-blue'}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Safety Events' && (
            <div className="space-y-3">
              {trialSafety.length === 0 ? (
                <div className="p-8 text-center text-slate-400">No adverse events recorded for this trial protocol.</div>
              ) : (
                trialSafety.map((se) => (
                  <div key={se.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-rose-400" />
                        <span className="font-mono font-bold text-rose-300">{se.id}</span>
                        <span className="text-slate-400">• Subject {se.participantId}</span>
                      </div>
                      <span className={se.severity === 'Critical' ? 'badge-red' : se.severity === 'Severe' ? 'badge-red' : 'badge-yellow'}>
                        {se.severity}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-200">{se.eventDescription}</p>
                    <div className="p-2.5 rounded-xl bg-slate-900 text-[11px] text-slate-300">
                      <span className="text-emerald-400 font-bold">Action Taken: </span>
                      {se.actionTaken}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'Documents' && (
            <div className="space-y-3">
              {trialDocs.length === 0 ? (
                <div className="p-8 text-center text-slate-400">No trial documents uploaded yet.</div>
              ) : (
                trialDocs.map((doc) => (
                  <div key={doc.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <div className="font-bold text-white">{doc.name}</div>
                        <div className="text-[11px] text-slate-400">{doc.category} • Uploaded by {doc.uploadedBy} on {doc.date}</div>
                      </div>
                    </div>
                    <span className="badge-green">{doc.status}</span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'Audit History' && (
            <div className="space-y-3">
              {trialLogs.length === 0 ? (
                <div className="p-8 text-center text-slate-400">No audit log entries available for this trial.</div>
              ) : (
                trialLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-200">{log.action}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{log.user} ({log.role})</div>
                    </div>
                    <span className="text-slate-500 font-mono text-[10px]">{log.timestamp}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
