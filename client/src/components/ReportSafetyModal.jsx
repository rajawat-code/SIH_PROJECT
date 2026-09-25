import React, { useState } from 'react';
import { X, ShieldAlert, AlertTriangle } from 'lucide-react';

export default function ReportSafetyModal({ onClose, onSubmitSafetyEvent, trials }) {
  const [trialId, setTrialId] = useState(trials[0]?.id || 'AYU-001');
  const [participantId, setParticipantId] = useState('P-01-099');
  const [eventDescription, setEventDescription] = useState('');
  const [severity, setSeverity] = useState('Moderate');
  const [assignedOfficer, setAssignedOfficer] = useState('Dr. Amit Tripathi');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventDescription) return;
    onSubmitSafetyEvent({
      trialId,
      participantId,
      eventDescription,
      severity,
      assignedSafetyOfficer: assignedOfficer,
      reportedBy: 'Current Staff'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-bold text-white">Report Adverse Safety Event</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Select Affected Trial</label>
            <select
              value={trialId}
              onChange={(e) => setTrialId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-mono font-bold"
            >
              {trials.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.id} - {t.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Participant Subject ID</label>
              <input
                type="text"
                value={participantId}
                onChange={(e) => setParticipantId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Event Severity Triage</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
              >
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Adverse Symptom / Event Description</label>
            <textarea
              rows="3"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              placeholder="Describe clinical symptoms, onset time, and physiological changes observed..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Assign Safety Officer</label>
            <select
              value={assignedOfficer}
              onChange={(e) => setAssignedOfficer(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
            >
              <option value="Dr. Amit Tripathi">Dr. Amit Tripathi (Lead Safety Cell)</option>
              <option value="Dr. Ananya Joshi">Dr. Ananya Joshi (Pharmacovigilance Unit)</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg"
            >
              Submit Safety Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
