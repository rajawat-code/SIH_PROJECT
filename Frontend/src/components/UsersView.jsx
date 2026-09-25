import React, { useState } from 'react';
import { Users, Shield, Mail, Building2, CheckCircle2, UserPlus, X, Lock, Key } from 'lucide-react';

export default function UsersView({ users = [], activeRole = 'Researcher', onAddUser }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('Researcher');
  const [institution, setInstitution] = useState('All India Institute of Ayurveda (AIIA)');

  const defaultUsers = [
    { id: 'usr-1', name: 'Dr. Rajesh Sharma', email: 'researcher@aiia.gov.in', role: 'Researcher', institution: 'AIIA New Delhi', avatar: 'RS' },
    { id: 'usr-2', name: 'Dr. Sunita Varma', email: 'researcher2@aiia.gov.in', role: 'Researcher', institution: 'BHU Faculty of Ayurveda', avatar: 'SV' },
    { id: 'usr-3', name: 'Prof. Vaidya B.K. Nambiar', email: 'ethics@aiia.gov.in', role: 'Ethics Committee', institution: 'Institutional Ethics Committee', avatar: 'BN' },
    { id: 'usr-4', name: 'Dr. Meera Kulkarni', email: 'ethics2@aiia.gov.in', role: 'Ethics Committee', institution: 'AIIA Ethics Board', avatar: 'MK' },
    { id: 'usr-5', name: 'Dr. Amit Tripathi', email: 'safety@aiia.gov.in', role: 'Safety Officer', institution: 'Pharmacovigilance Cell - AIIA', avatar: 'AT' },
    { id: 'usr-6', name: 'Dr. Ananya Joshi', email: 'safety2@aiia.gov.in', role: 'Safety Officer', institution: 'National Ayurvedic Safety Unit', avatar: 'AJ' },
    { id: 'usr-7', name: 'Admin Secretariat', email: 'admin@aiia.gov.in', role: 'Administrator', institution: 'Ministry of Ayush / AIIA', avatar: 'AD' }
  ];

  const displayUsers = users && users.length > 0 ? users : defaultUsers;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    if (onAddUser) {
      onAddUser({ name, email, password, role, institution });
    }

    setName('');
    setEmail('');
    setPassword('password123');
    setRole('Researcher');
    setInstitution('All India Institute of Ayurveda (AIIA)');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            System User Directory <span className="badge-purple">RBAC Enforced</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Registered investigators, ethics committee reviewers, safety officers, and system administrators.
          </p>
        </div>

        {activeRole === 'Administrator' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-900/30 flex items-center gap-2 transition-all"
          >
            <UserPlus className="w-4 h-4" /> Register New Researcher / User
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayUsers.map((usr) => (
          <div key={usr.id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 relative group hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 font-bold text-white flex items-center justify-center text-sm shadow">
                {usr.avatar || (usr.name ? usr.name.split(' ').map(n=>n[0]).join('').substring(0, 2) : 'US')}
              </div>
              <span className={
                usr.role === 'Researcher' ? 'badge-green' :
                usr.role === 'Ethics Committee' ? 'badge-blue' :
                usr.role === 'Safety Officer' ? 'badge-red' : 'badge-purple'
              }>
                {usr.role}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-white text-sm">{usr.name}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> {usr.email}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1 truncate max-w-[200px]" title={usr.institution}>
                <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {usr.institution}
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-1 shrink-0">
                <CheckCircle2 className="w-3 h-3" /> Active
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Register New Researcher / User</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name & Title</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Anand V. Patel"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="apatel@aiia.gov.in"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Initial Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Institution</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Assigned Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Researcher">Researcher</option>
                  <option value="Ethics Committee">Ethics Committee</option>
                  <option value="Safety Officer">Safety Officer</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs rounded-xl hover:from-emerald-600 hover:to-teal-700 shadow"
                >
                  Register Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
