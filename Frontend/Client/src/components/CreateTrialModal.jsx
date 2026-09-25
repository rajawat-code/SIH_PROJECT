import React, { useState } from 'react';
import { X, Plus, FlaskConical, Calendar, User, Shield, Layers, FileText } from 'lucide-react';

export default function CreateTrialModal({ onClose, onCreateTrial }) {
  const [formData, setFormData] = useState({
    id: `AYU-00${Math.floor(9 + Math.random() * 90)}`,
    title: '',
    pi: 'Dr. Rajesh Sharma',
    institution: 'All India Institute of Ayurveda (AIIA), New Delhi',
    intervention: '',
    phase: 'Phase II',
    participants: 100,
    startDate: new Date().toISOString().substring(0, 10),
    endDate: '2027-06-30',
    riskLevel: 'Low',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.intervention) return;
    onCreateTrial(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl p-6 shadow-2xl space-y-4 my-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Register New Ayurvedic Clinical Trial</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Trial ID Code</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-mono font-bold"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Trial Phase</label>
              <select
                value={formData.phase}
                onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
              >
                <option value="Phase I">Phase I</option>
                <option value="Phase I/II">Phase I/II</option>
                <option value="Phase II">Phase II</option>
                <option value="Phase III">Phase III</option>
                <option value="Phase IV">Phase IV</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Trial Protocol Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Clinical Evaluation of Haridra Extract in Inflammatory Conditions"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Ayurvedic Intervention Formulation</label>
              <input
                type="text"
                value={formData.intervention}
                onChange={(e) => setFormData({ ...formData, intervention: e.target.value })}
                placeholder="e.g. Haridra Capsule (500mg BD)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-300"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Principal Investigator (PI)</label>
              <input
                type="text"
                value={formData.pi}
                onChange={(e) => setFormData({ ...formData, pi: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Target Participants</label>
              <input
                type="number"
                value={formData.participants}
                onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Expected Completion</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Initial Risk Assessment</label>
            <select
              value={formData.riskLevel}
              onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
            >
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Protocol Brief & Objectives</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Outline study objectives, primary endpoints, and dosing schedule..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-lg"
            >
              Submit & Register Protocol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
