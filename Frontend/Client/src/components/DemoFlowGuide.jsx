import React, { useState } from 'react';
import { Play, ChevronRight, ChevronLeft, Check, Sparkles, X } from 'lucide-react';

export default function DemoFlowGuide({ currentStep, onJumpToStep, activeRole, onSwitchRole }) {
  const [collapsed, setCollapsed] = useState(false);

  const demoSteps = [
    { step: 1, title: 'Login as Researcher', role: 'Researcher', view: 'dashboard', desc: 'Log in as Dr. Rajesh Sharma (Researcher).' },
    { step: 2, title: 'Researcher Dashboard', role: 'Researcher', view: 'dashboard', desc: 'Inspect active trials, status breakdown, and upcoming deadlines.' },
    { step: 3, title: 'Open Clinical Trial', role: 'Researcher', view: 'trials', desc: 'View AYU-001 or AYU-002 detailed overview modal.' },
    { step: 4, title: 'Visual Lifecycle & Tabs', role: 'Researcher', view: 'trials', desc: 'Examine 8-stage trial lifecycle timeline (Planning → Final Report).' },
    { step: 5, title: 'Compliance & Deadlines', role: 'Researcher', view: 'compliance', desc: 'Navigate to Compliance & Deadlines tracking engine.' },
    { step: 6, title: 'Overdue Compliance Warning', role: 'Researcher', view: 'compliance', desc: 'Observe auto-calculated Overdue & Due Soon status cards.' },
    { step: 7, title: 'Safety Monitoring', role: 'Researcher', view: 'safety', desc: 'Open Safety Monitoring module.' },
    { step: 8, title: 'Critical Adverse Event', role: 'Researcher', view: 'safety', desc: 'Highlight AE-1024 Critical Severe Allergic Reaction alert.' },
    { step: 9, title: 'Login as Ethics Committee', role: 'Ethics Committee', view: 'role-dashboard', desc: 'Switch role to Ethics Committee (Prof. Vaidya B.K. Nambiar).' },
    { step: 10, title: 'Ethics Approvals View', role: 'Ethics Committee', view: 'role-dashboard', desc: 'Show pending protocol reviews, approval deadlines, and consent forms.' },
    { step: 11, title: 'Login as Safety Officer', role: 'Safety Officer', view: 'role-dashboard', desc: 'Switch role to Safety Officer (Dr. Amit Tripathi).' },
    { step: 12, title: 'Safety Alerts & Reviews', role: 'Safety Officer', view: 'role-dashboard', desc: 'Show critical safety alerts, open adverse events, and pharmacovigilance.' },
    { step: 13, title: 'Login as Administrator', role: 'Administrator', view: 'role-dashboard', desc: 'Switch role to Administrator.' },
    { step: 14, title: 'System Analytics & Audit Logs', role: 'Administrator', view: 'analytics', desc: 'View overall system metrics, charts, and complete audit trail ledger.' }
  ];

  const current = demoSteps[currentStep - 1] || demoSteps[0];

  const handleNext = () => {
    if (currentStep < demoSteps.length) {
      const nextStepObj = demoSteps[currentStep];
      if (nextStepObj.role !== activeRole) {
        onSwitchRole(nextStepObj.role);
      }
      onJumpToStep(currentStep + 1, nextStepObj.view);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prevStepObj = demoSteps[currentStep - 2];
      if (prevStepObj.role !== activeRole) {
        onSwitchRole(prevStepObj.role);
      }
      onJumpToStep(currentStep - 1, prevStepObj.view);
    }
  };

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-4 right-4 z-50 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-2 rounded-full shadow-xl flex items-center gap-1.5 border border-emerald-400/40"
      >
        <Sparkles className="w-4 h-4 animate-spin" />
        <span>Hackathon Demo Guide ({currentStep}/14)</span>
      </button>
    );
  }

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-b border-emerald-500/30 text-xs px-4 py-2 text-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg relative">
      <div className="flex items-center gap-3 w-full md:w-auto">
        <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1 shrink-0">
          <Play className="w-3 h-3 fill-current" /> Demo Step {currentStep}/14
        </span>
        <div className="truncate">
          <span className="font-bold text-white mr-2">{current.title}:</span>
          <span className="text-slate-300">{current.desc}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
        <div className="hidden lg:flex items-center gap-1 mr-2">
          {demoSteps.slice(0, 7).map(s => (
            <button
              key={s.step}
              onClick={() => {
                if (s.role !== activeRole) onSwitchRole(s.role);
                onJumpToStep(s.step, s.view);
              }}
              title={s.title}
              className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all ${currentStep === s.step ? 'bg-emerald-400 text-slate-950 scale-110 ring-2 ring-emerald-300' : currentStep > s.step ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50' : 'bg-slate-800 text-slate-400'}`}
            >
              {s.step}
            </button>
          ))}
          <span className="text-slate-500 text-[10px]">..</span>
          {demoSteps.slice(7).map(s => (
            <button
              key={s.step}
              onClick={() => {
                if (s.role !== activeRole) onSwitchRole(s.role);
                onJumpToStep(s.step, s.view);
              }}
              title={s.title}
              className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all ${currentStep === s.step ? 'bg-emerald-400 text-slate-950 scale-110 ring-2 ring-emerald-300' : currentStep > s.step ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50' : 'bg-slate-800 text-slate-400'}`}
            >
              {s.step}
            </button>
          ))}
        </div>

        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === 14}
          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 shadow"
        >
          <span>Next Step</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setCollapsed(true)}
          className="p-1 rounded text-slate-400 hover:text-white"
          title="Minimize Demo Helper"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
