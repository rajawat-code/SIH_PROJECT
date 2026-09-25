import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DemoFlowGuide from './components/DemoFlowGuide';
import DashboardView from './components/DashboardView';
import ClinicalTrialsView from './components/ClinicalTrialsView';
import TrialDetailModal from './components/TrialDetailModal';
import ComplianceView from './components/ComplianceView';
import SafetyView from './components/SafetyView';
import RoleDashboardView from './components/RoleDashboardView';
import DocumentsView from './components/DocumentsView';
import AuditLogsView from './components/AuditLogsView';
import AnalyticsView from './components/AnalyticsView';
import CreateTrialModal from './components/CreateTrialModal';
import ReportSafetyModal from './components/ReportSafetyModal';
import UsersView from './components/UsersView';
import SettingsView from './components/SettingsView';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeRole, setActiveRole] = useState('Researcher');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [demoStep, setDemoStep] = useState(1);

  // Modals
  const [selectedTrialId, setSelectedTrialId] = useState(null);
  const [showCreateTrialModal, setShowCreateTrialModal] = useState(false);
  const [showReportSafetyModal, setShowReportSafetyModal] = useState(false);

  // Data States
  const [stats, setStats] = useState(null);
  const [trials, setTrials] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [safetyEvents, setSafetyEvents] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch initial data from backend API
  const fetchData = () => {
    fetch('/api/dashboard/stats').then(r => r.json()).then(setStats).catch(() => {});
    fetch('/api/trials').then(r => r.json()).then(setTrials).catch(() => {});
    fetch('/api/deadlines').then(r => r.json()).then(setDeadlines).catch(() => {});
    fetch('/api/safety-events').then(r => r.json()).then(setSafetyEvents).catch(() => {});
    fetch('/api/documents').then(r => r.json()).then(setDocuments).catch(() => {});
    fetch('/api/notifications').then(r => r.json()).then(setNotifications).catch(() => {});
    fetch('/api/audit-logs').then(r => r.json()).then(setAuditLogs).catch(() => {});
    fetch('/api/users').then(r => r.json()).then(setUsers).catch(() => {});
  };

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setActiveRole(user.role || 'Researcher');
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleRoleChange = (newRole) => {
    setActiveRole(newRole);
  };

  const handleCompleteDeadline = (id) => {
    fetch(`/api/deadlines/${id}/complete`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName: currentUser?.name, userRole: activeRole })
    })
      .then(r => r.json())
      .then(() => fetchData())
      .catch(() => {
        // Fallback state update
        setDeadlines(prev => prev.map(d => d.id === id ? { ...d, status: 'Completed', urgency: 'completed' } : d));
      });
  };

  const handleCreateTrial = (newTrialData) => {
    fetch('/api/trials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTrialData)
    })
      .then(r => r.json())
      .then(() => fetchData())
      .catch(() => {
        // Fallback state update
        setTrials(prev => [
          {
            ...newTrialData,
            enrolledParticipants: 0,
            status: 'Planning',
            lifecycleStage: 'Planning'
          },
          ...prev
        ]);
      });
  };

  const handleReportSafetyEvent = (newSafetyData) => {
    fetch('/api/safety-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSafetyData)
    })
      .then(r => r.json())
      .then(() => fetchData())
      .catch(() => {
        // Fallback state update
        setSafetyEvents(prev => [
          {
            id: `AE-${Math.floor(1000 + Math.random() * 9000)}`,
            ...newSafetyData,
            dateReported: new Date().toISOString().substring(0, 10),
            status: 'Reported',
            actionTaken: 'Safety monitoring unit notified.'
          },
          ...prev
        ]);
      });
  };

  const handleUploadDocument = (newDocData) => {
    fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDocData)
    })
      .then(r => r.json())
      .then(() => fetchData())
      .catch(() => {
        setDocuments(prev => [
          {
            id: `DOC-${Math.floor(100 + Math.random() * 900)}`,
            ...newDocData,
            date: new Date().toISOString().substring(0, 10),
            status: 'Pending Review',
            size: '2.4 MB'
          },
          ...prev
        ]);
      });
  };

  const handleMarkAllNotificationsRead = () => {
    fetch('/api/notifications/read-all', { method: 'PUT' })
      .then(() => fetchData())
      .catch(() => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      });
  };

  const handleAddUser = (newUserData) => {
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserData)
    })
      .then(r => r.json())
      .then(() => fetchData())
      .catch(() => {
        const fallbackUser = {
          id: `usr-${Date.now()}`,
          ...newUserData,
          avatar: newUserData.name.split(' ').map(n=>n[0]).join('').toUpperCase().substring(0, 2)
        };
        setUsers(prev => [...prev, fallbackUser]);
      });
  };

  // If not logged in, show Login Page
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      {/* Hackathon 14-Step Presentation Guide Header */}
      <DemoFlowGuide
        currentStep={demoStep}
        onJumpToStep={(step, targetView) => {
          setDemoStep(step);
          if (targetView) setActiveTab(targetView);
        }}
        activeRole={activeRole}
        onSwitchRole={handleRoleChange}
      />

      {/* Top Application Header */}
      <Header
        user={currentUser}
        activeRole={activeRole}
        onLogout={handleLogout}
        notifications={notifications}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onRoleChange={handleRoleChange}
        onSearchQuery={setSearchQuery}
      />

      {/* Body: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeRole={activeRole}
          stats={stats}
        />

        {/* Main Workspace View Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <DashboardView
              stats={stats}
              trials={trials}
              deadlines={deadlines}
              safetyEvents={safetyEvents}
              onNavigate={setActiveTab}
              onSelectTrial={setSelectedTrialId}
              onOpenCreateTrial={() => setShowCreateTrialModal(true)}
            />
          )}

          {activeTab === 'role-dashboard' && (
            <RoleDashboardView
              activeRole={activeRole}
              trials={trials}
              deadlines={deadlines}
              safetyEvents={safetyEvents}
              documents={documents}
              auditLogs={auditLogs}
              onNavigate={setActiveTab}
              onSelectTrial={setSelectedTrialId}
            />
          )}

          {activeTab === 'trials' && (
            <ClinicalTrialsView
              trials={trials}
              searchQuery={searchQuery}
              onSelectTrial={setSelectedTrialId}
              onOpenCreateTrial={() => setShowCreateTrialModal(true)}
            />
          )}

          {activeTab === 'compliance' && (
            <ComplianceView
              deadlines={deadlines}
              onCompleteDeadline={handleCompleteDeadline}
              activeRole={activeRole}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'safety' && (
            <SafetyView
              safetyEvents={safetyEvents}
              onOpenReportSafety={() => setShowReportSafetyModal(true)}
            />
          )}

          {activeTab === 'documents' && (
            <DocumentsView
              documents={documents}
              onUploadDoc={handleUploadDocument}
            />
          )}

          {activeTab === 'audit' && (
            <AuditLogsView auditLogs={auditLogs} />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              trials={trials}
              deadlines={deadlines}
              safetyEvents={safetyEvents}
            />
          )}

          {activeTab === 'users' && (
            <UsersView
              users={users}
              activeRole={activeRole}
              onAddUser={handleAddUser}
            />
          )}

          {activeTab === 'settings' && <SettingsView />}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-white">System Notification Center</h1>
                <button
                  onClick={handleMarkAllNotificationsRead}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Mark All Read
                </button>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-bold text-white">{n.title}</div>
                      <div className="text-slate-300 mt-0.5">{n.message}</div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{n.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Trial Detail Modal */}
      {selectedTrialId && (
        <TrialDetailModal
          trialId={selectedTrialId}
          trials={trials}
          deadlines={deadlines}
          safetyEvents={safetyEvents}
          documents={documents}
          auditLogs={auditLogs}
          onClose={() => setSelectedTrialId(null)}
        />
      )}

      {/* Create New Trial Modal */}
      {showCreateTrialModal && (
        <CreateTrialModal
          onClose={() => setShowCreateTrialModal(false)}
          onCreateTrial={handleCreateTrial}
        />
      )}

      {/* Report Adverse Safety Event Modal */}
      {showReportSafetyModal && (
        <ReportSafetyModal
          onClose={() => setShowReportSafetyModal(false)}
          onSubmitSafetyEvent={handleReportSafetyEvent}
          trials={trials}
        />
      )}
    </div>
  );
}
