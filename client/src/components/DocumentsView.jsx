import React, { useState } from 'react';
import { FileText, Download, Eye, Upload, Filter, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function DocumentsView({ documents, onUploadDoc }) {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docName, setDocName] = useState('');
  const [trialId, setTrialId] = useState('AYU-001');
  const [category, setCategory] = useState('Trial Protocol');

  const categories = ['All', 'Trial Protocol', 'Ethics Approval', 'Consent Form', 'Safety Report', 'Final Report'];

  const filteredDocs = categoryFilter === 'All' 
    ? documents 
    : documents.filter(d => d.category === categoryFilter);

  const handleDownload = (doc) => {
    // Generate a simple downloadable Blob text file for prototype demonstration
    const blob = new Blob([
      `==================================================\nALL INDIA INSTITUTE OF AYURVEDA (AIIA)\nCLINICAL TRIAL MANAGEMENT SYSTEM (CTMMS)\n==================================================\nDocument ID: ${doc.id}\nTrial ID: ${doc.trialId}\nDocument Name: ${doc.name}\nCategory: ${doc.category}\nUploaded By: ${doc.uploadedBy} (${doc.role})\nDate: ${doc.date}\nStatus: ${doc.status}\n==================================================\nConfidential AIIA Research Document\n`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!docName) return;
    onUploadDoc({
      trialId,
      name: docName.endsWith('.pdf') ? docName : `${docName}.pdf`,
      category,
      uploadedBy: 'Current User',
      role: 'Researcher'
    });
    setShowUploadModal(false);
    setDocName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Centralized Document Repository <span className="badge-green">{documents.length} Dossiers</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Compliant digital document repository for protocols, ethics approvals, patient consent forms & safety reports.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              categoryFilter === cat
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Document List Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Document Name</th>
                <th className="p-3.5">Trial ID</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Uploaded By</th>
                <th className="p-3.5">Upload Date</th>
                <th className="p-3.5">File Size</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-bold text-white max-w-xs flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">{doc.name}</span>
                  </td>
                  <td className="p-3.5 font-mono font-extrabold text-emerald-400 whitespace-nowrap">
                    {doc.trialId}
                  </td>
                  <td className="p-3.5 font-semibold text-slate-300 whitespace-nowrap">
                    {doc.category}
                  </td>
                  <td className="p-3.5 text-slate-300 whitespace-nowrap">
                    {doc.uploadedBy} <span className="text-[10px] text-slate-500">({doc.role})</span>
                  </td>
                  <td className="p-3.5 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                    {doc.date}
                  </td>
                  <td className="p-3.5 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                    {doc.size || '2.1 MB'}
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <span className={doc.status === 'Approved' ? 'badge-green' : 'badge-yellow'}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleDownload(doc)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-[11px] border border-slate-700 inline-flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-400" /> Upload Trial Document
            </h2>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Select Trial</label>
                <select
                  value={trialId}
                  onChange={(e) => setTrialId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="AYU-001">AYU-001 (Ashwagandha Stress Trial)</option>
                  <option value="AYU-002">AYU-002 (Nisha-Amalaki Diabetes Trial)</option>
                  <option value="AYU-003">AYU-003 (Shallaki Joint Pain Trial)</option>
                  <option value="AYU-004">AYU-004 (Brahmi Cognition Trial)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Document Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Trial Protocol">Trial Protocol</option>
                  <option value="Ethics Approval">Ethics Approval</option>
                  <option value="Consent Form">Consent Form</option>
                  <option value="Safety Report">Safety Report</option>
                  <option value="Final Report">Final Report</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Document Title / File Name</label>
                <input
                  type="text"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. Patient_Consent_Form_v2.0.pdf"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-950 text-center text-xs text-slate-400">
                📁 Click or drag file here for upload simulation (.pdf, .docx up to 25MB)
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                >
                  Upload & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
