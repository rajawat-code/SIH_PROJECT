const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'sih26046_aiia_ayurvedic_ctmms_secret_key_2026';

app.use(cors());
app.use(express.json());

// ==========================================
// DEMO USERS (Multiple per role)
// ==========================================
const users = [
  { id: 'usr-1', email: 'researcher@aiia.gov.in', password: 'password123', name: 'Dr. Rajesh Sharma', role: 'Researcher', institution: 'AIIA New Delhi', avatar: 'RS' },
  { id: 'usr-2', email: 'researcher2@aiia.gov.in', password: 'password123', name: 'Dr. Sunita Varma', role: 'Researcher', institution: 'BHU Faculty of Ayurveda', avatar: 'SV' },
  { id: 'usr-3', email: 'ethics@aiia.gov.in', password: 'password123', name: 'Prof. Vaidya B.K. Nambiar', role: 'Ethics Committee', institution: 'Institutional Ethics Committee', avatar: 'BN' },
  { id: 'usr-4', email: 'ethics2@aiia.gov.in', password: 'password123', name: 'Dr. Meera Kulkarni', role: 'Ethics Committee', institution: 'AIIA Ethics Board', avatar: 'MK' },
  { id: 'usr-5', email: 'safety@aiia.gov.in', password: 'password123', name: 'Dr. Amit Tripathi', role: 'Safety Officer', institution: 'Pharmacovigilance Cell - AIIA', avatar: 'AT' },
  { id: 'usr-6', email: 'safety2@aiia.gov.in', password: 'password123', name: 'Dr. Ananya Joshi', role: 'Safety Officer', institution: 'National Ayurvedic Safety Unit', avatar: 'AJ' },
  { id: 'usr-7', email: 'admin@aiia.gov.in', password: 'password123', name: 'Admin - AIIA Research Secretariat', role: 'Administrator', institution: 'Ministry of Ayush / AIIA', avatar: 'AD' }
];

// ==========================================
// PRE-POPULATED AYURVEDIC CLINICAL TRIALS (8 Trials)
// ==========================================
let trials = [
  {
    id: 'AYU-001',
    title: 'Effect of Ashwagandha (Withania somnifera) Formulation on Chronic Stress & Cortisol Levels',
    intervention: 'Ashwagandha Churna (500mg BD)',
    pi: 'Dr. Rajesh Sharma',
    piEmail: 'researcher@aiia.gov.in',
    institution: 'All India Institute of Ayurveda (AIIA), New Delhi',
    phase: 'Phase II',
    participants: 120,
    enrolledParticipants: 115,
    startDate: '2026-01-15',
    endDate: '2026-11-30',
    status: 'Ongoing',
    riskLevel: 'Low',
    lifecycleStage: 'Treatment',
    description: 'Double-blind placebo-controlled study assessing standardized Ashwagandha extract on physiological stress markers and sleep parameters in working professionals.',
    milestones: [
      { id: 'm1', title: 'Protocol Approval', status: 'Completed', date: '2026-01-10' },
      { id: 'm2', title: 'Ethics Approval', status: 'Completed', date: '2026-01-12' },
      { id: 'm3', title: 'Subject Recruitment (120)', status: 'Completed', date: '2026-03-01' },
      { id: 'm4', title: 'Mid-term Blood & Biomarker Evaluation', status: 'In Progress', date: '2026-09-20' },
      { id: 'm5', title: 'Final Data Lock & Biostatistics', status: 'Pending', date: '2026-11-15' }
    ]
  },
  {
    id: 'AYU-002',
    title: 'Evaluation of Nisha-Amalaki & Guduchi Hydro-alcoholic Extract in Type-2 Diabetes Mellitus',
    intervention: 'Nisha-Amalaki Tab (1g TID)',
    pi: 'Dr. Sunita Varma',
    piEmail: 'researcher2@aiia.gov.in',
    institution: 'BHU Faculty of Ayurveda, Varanasi',
    phase: 'Phase III',
    participants: 180,
    enrolledParticipants: 165,
    startDate: '2025-08-01',
    endDate: '2026-10-15',
    status: 'Under Review',
    riskLevel: 'Medium',
    lifecycleStage: 'Monitoring',
    description: 'Multi-center randomized trial comparing glycemic control, HbA1c reduction, and lipid parameters against baseline standard Ayurvedic care.',
    milestones: [
      { id: 'm1', title: 'Multi-center Protocol Approval', status: 'Completed', date: '2025-07-15' },
      { id: 'm2', title: 'Patient Enrollment', status: 'Completed', date: '2025-11-30' },
      { id: 'm3', title: 'Interim Safety Audit', status: 'Completed', date: '2026-04-10' },
      { id: 'm4', title: 'Annual Regulatory Submission', status: 'In Progress', date: '2026-09-15' }
    ]
  },
  {
    id: 'AYU-003',
    title: 'Clinical Evaluation of Shallaki & Guggulu Herbal Formulations in Osteoarthritis Joint Pain',
    intervention: 'Shallaki-Guggulu Extract (750mg BD)',
    pi: 'Dr. Rajesh Sharma',
    piEmail: 'researcher@aiia.gov.in',
    institution: 'AIIA Peripheral Centre, Jaipur',
    phase: 'Phase II',
    participants: 90,
    enrolledParticipants: 88,
    startDate: '2026-03-01',
    endDate: '2026-12-20',
    status: 'Ongoing',
    riskLevel: 'Medium',
    lifecycleStage: 'Treatment',
    description: 'Evaluating WOMAC stiffness scores and inflammatory biomarker reduction (TNF-alpha, IL-6) following 16 weeks of standardized herbal administration.',
    milestones: [
      { id: 'm1', title: 'Ethics Approval', status: 'Completed', date: '2026-02-20' },
      { id: 'm2', title: 'Recruitment & Screening', status: 'Completed', date: '2026-04-15' },
      { id: 'm3', title: 'Week 12 Clinical Assessment', status: 'In Progress', date: '2026-09-30' }
    ]
  },
  {
    id: 'AYU-004',
    title: 'Brahmi (Bacopa monnieri) Nootropic Efficacy on Cognitive Impairment & Memory Retention',
    intervention: 'Brahmi Ghrita / Syrup',
    pi: 'Dr. Sunita Varma',
    piEmail: 'researcher2@aiia.gov.in',
    institution: 'National Institute of Ayurveda (NIA), Jaipur',
    phase: 'Phase I/II',
    participants: 60,
    enrolledParticipants: 60,
    startDate: '2026-05-10',
    endDate: '2027-01-15',
    status: 'Planning',
    riskLevel: 'Low',
    lifecycleStage: 'Ethics Approval',
    description: 'Open-label exploratory pilot trial analyzing EEG brainwave synchronization and neuro-cognitive test batteries in elderly subjects with mild memory loss.',
    milestones: [
      { id: 'm1', title: 'Dossier Submission', status: 'Completed', date: '2026-05-01' },
      { id: 'm2', title: 'Ethics Review Committee Meeting', status: 'In Progress', date: '2026-09-25' },
      { id: 'm3', title: 'Volunteer Recruitment Launch', status: 'Pending', date: '2026-10-10' }
    ]
  },
  {
    id: 'AYU-005',
    title: 'Triphala & Yashtimadhu Decoction for Gastro-Intestinal Mucosal Healing in Dyspepsia',
    intervention: 'Triphala-Yashtimadhu Kwatha',
    pi: 'Dr. Rajesh Sharma',
    piEmail: 'researcher@aiia.gov.in',
    institution: 'AIIA Department of Kayachikitsa',
    phase: 'Phase IV',
    participants: 250,
    enrolledParticipants: 250,
    startDate: '2025-01-10',
    endDate: '2026-06-30',
    status: 'Completed',
    riskLevel: 'Low',
    lifecycleStage: 'Final Report',
    description: 'Post-marketing surveillance and comparative effectiveness study across 4 government hospitals validating mucosal healing rates.',
    milestones: [
      { id: 'm1', title: 'Patient Completion (250)', status: 'Completed', date: '2026-05-15' },
      { id: 'm2', title: 'Statistical Analysis', status: 'Completed', date: '2026-06-10' },
      { id: 'm3', title: 'Final Peer-Reviewed Publication', status: 'Completed', date: '2026-06-28' }
    ]
  },
  {
    id: 'AYU-006',
    title: 'Curcumin-Piperine Nano-formulation Efficacy in Post-Viral Fatigue Syndrome',
    intervention: 'Curcuminoid Complex Capsules',
    pi: 'Dr. Sunita Varma',
    piEmail: 'researcher2@aiia.gov.in',
    institution: 'State Ayurvedic College, Lucknow',
    phase: 'Phase III',
    participants: 140,
    enrolledParticipants: 105,
    startDate: '2026-02-01',
    endDate: '2026-12-10',
    status: 'Ongoing',
    riskLevel: 'Medium',
    lifecycleStage: 'Recruitment',
    description: 'Randomized controlled clinical trial assessing oxidative stress parameters, mitochondrial markers, and fatigue visual analog scales.',
    milestones: [
      { id: 'm1', title: 'Ethics Approval', status: 'Completed', date: '2026-01-25' },
      { id: 'm2', title: 'Cohort Screening', status: 'In Progress', date: '2026-09-18' }
    ]
  },
  {
    id: 'AYU-007',
    title: 'Shatavari (Asparagus racemosus) Granules in Post-Menopausal Osteopenia Density Retention',
    intervention: 'Standardized Shatavari Granules (10g BD)',
    pi: 'Dr. Rajesh Sharma',
    piEmail: 'researcher@aiia.gov.in',
    institution: 'AIIA Department of Prasuti Tantra & Stri Roga',
    phase: 'Phase II',
    participants: 100,
    enrolledParticipants: 45,
    startDate: '2026-04-15',
    endDate: '2027-04-30',
    status: 'Ongoing',
    riskLevel: 'Low',
    lifecycleStage: 'Treatment',
    description: 'DEXA scan bone mineral density tracking over 12 months in post-menopausal women receiving herbal mineral supplements.',
    milestones: [
      { id: 'm1', title: 'Institutional Protocol Clearance', status: 'Completed', date: '2026-03-30' },
      { id: 'm2', title: 'Baseline DEXA Assessments', status: 'In Progress', date: '2026-09-22' }
    ]
  },
  {
    id: 'AYU-008',
    title: 'Neem Extract (Azadirachta indica) Topical Gel in Chronic Plaque Psoriasis',
    intervention: 'Neem Leaf Extract Gel 5% w/w',
    pi: 'Dr. Sunita Varma',
    piEmail: 'researcher2@aiia.gov.in',
    institution: 'Government Ayurveda College, Trivandrum',
    phase: 'Phase II',
    participants: 75,
    enrolledParticipants: 75,
    startDate: '2025-10-01',
    endDate: '2026-08-30',
    status: 'Suspended',
    riskLevel: 'High',
    lifecycleStage: 'Monitoring',
    description: 'Temporarily suspended due to unexpected localized contact dermatitis events flagged during routine safety monitoring.',
    milestones: [
      { id: 'm1', title: 'Trial Launch', status: 'Completed', date: '2025-10-01' },
      { id: 'm2', title: 'Safety Cell Review Hearing', status: 'In Progress', date: '2026-09-12' }
    ]
  }
];

// ==========================================
// COMPLIANCE & DEADLINES (10 Deadlines)
// ==========================================
let deadlines = [
  {
    id: 'DL-101',
    trialId: 'AYU-002',
    activity: 'Annual Regulatory Safety Report Submission to Ministry of Ayush',
    deadline: '2026-09-15',
    responsibleRole: 'Safety Officer',
    status: 'Overdue',
    daysRemaining: -1,
    assignedTo: 'Dr. Amit Tripathi',
    urgency: 'high'
  },
  {
    id: 'DL-102',
    trialId: 'AYU-008',
    activity: 'Adverse Event Investigation Report & Suspension Review Dossier',
    deadline: '2026-09-14',
    responsibleRole: 'Safety Officer',
    status: 'Overdue',
    daysRemaining: 0,
    assignedTo: 'Dr. Ananya Joshi',
    urgency: 'high'
  },
  {
    id: 'DL-103',
    trialId: 'AYU-001',
    activity: 'Bi-Annual Institutional Ethics Committee Status Update',
    deadline: '2026-09-18',
    responsibleRole: 'Researcher',
    status: 'Due Soon',
    daysRemaining: 4,
    assignedTo: 'Dr. Rajesh Sharma',
    urgency: 'medium'
  },
  {
    id: 'DL-104',
    trialId: 'AYU-004',
    activity: 'Ethics Protocol Revision & Patient Consent Form Sign-off',
    deadline: '2026-09-22',
    responsibleRole: 'Ethics Committee',
    status: 'Due Soon',
    daysRemaining: 8,
    assignedTo: 'Prof. Vaidya B.K. Nambiar',
    urgency: 'medium'
  },
  {
    id: 'DL-105',
    trialId: 'AYU-003',
    activity: 'WOMAC Score Mid-point Evaluation Data Audit',
    deadline: '2026-09-25',
    responsibleRole: 'Researcher',
    status: 'Due Soon',
    daysRemaining: 11,
    assignedTo: 'Dr. Rajesh Sharma',
    urgency: 'medium'
  },
  {
    id: 'DL-106',
    trialId: 'AYU-006',
    activity: 'Phase III Participant Recruitment Milestones Compliance',
    deadline: '2026-10-05',
    responsibleRole: 'Researcher',
    status: 'On Track',
    daysRemaining: 21,
    assignedTo: 'Dr. Sunita Varma',
    urgency: 'low'
  },
  {
    id: 'DL-107',
    trialId: 'AYU-007',
    activity: 'Baseline DEXA Scan Verification & Quality Certification',
    deadline: '2026-10-12',
    responsibleRole: 'Researcher',
    status: 'On Track',
    daysRemaining: 28,
    assignedTo: 'Dr. Rajesh Sharma',
    urgency: 'low'
  },
  {
    id: 'DL-108',
    trialId: 'AYU-001',
    activity: 'Trial Master File (TMF) Compliance Check by Admin',
    deadline: '2026-10-20',
    responsibleRole: 'Administrator',
    status: 'On Track',
    daysRemaining: 36,
    assignedTo: 'Admin - AIIA Research Secretariat',
    urgency: 'low'
  },
  {
    id: 'DL-109',
    trialId: 'AYU-005',
    activity: 'Archival & Clinical Trial Registry (CTRI) Closeout Filing',
    deadline: '2026-11-01',
    responsibleRole: 'Administrator',
    status: 'On Track',
    daysRemaining: 48,
    assignedTo: 'Admin - AIIA Research Secretariat',
    urgency: 'low'
  },
  {
    id: 'DL-110',
    trialId: 'AYU-004',
    activity: 'Investigator Site Initiation Visit (SIV) Approval',
    deadline: '2026-10-01',
    responsibleRole: 'Ethics Committee',
    status: 'On Track',
    daysRemaining: 17,
    assignedTo: 'Dr. Meera Kulkarni',
    urgency: 'low'
  }
];

// ==========================================
// SAFETY / ADVERSE EVENTS (8 Events)
// ==========================================
let safetyEvents = [
  {
    id: 'AE-1024',
    trialId: 'AYU-008',
    participantId: 'P-08-042',
    eventDescription: 'Severe acute allergic contact dermatitis with diffuse erythema after topical gel application.',
    severity: 'Critical',
    dateReported: '2026-09-10',
    status: 'Under Review',
    assignedSafetyOfficer: 'Dr. Amit Tripathi',
    actionTaken: 'Treatment suspended immediately; patch test panel dispatched to dermatology unit.',
    reportedBy: 'Dr. Sunita Varma'
  },
  {
    id: 'AE-1023',
    trialId: 'AYU-002',
    participantId: 'P-02-118',
    eventDescription: 'Moderate epigastric burning & mild hepatic enzyme elevation (ALT 68 U/L).',
    severity: 'Severe',
    dateReported: '2026-09-08',
    status: 'Under Review',
    assignedSafetyOfficer: 'Dr. Ananya Joshi',
    actionTaken: 'Dose reduced by 50%; bi-weekly LFT monitoring instituted.',
    reportedBy: 'Dr. Sunita Varma'
  },
  {
    id: 'AE-1022',
    trialId: 'AYU-003',
    participantId: 'P-03-019',
    eventDescription: 'Mild transient gastric discomfort following morning dose of Shallaki extract.',
    severity: 'Mild',
    dateReported: '2026-09-05',
    status: 'Resolved',
    assignedSafetyOfficer: 'Dr. Amit Tripathi',
    actionTaken: 'Advised administration post-meals with warm milk. Symptoms resolved.',
    reportedBy: 'Dr. Rajesh Sharma'
  },
  {
    id: 'AE-1021',
    trialId: 'AYU-001',
    participantId: 'P-01-088',
    eventDescription: 'Transient mild daytime drowsiness during week 2 of Ashwagandha 500mg therapy.',
    severity: 'Mild',
    dateReported: '2026-08-28',
    status: 'Resolved',
    assignedSafetyOfficer: 'Dr. Ananya Joshi',
    actionTaken: 'Re-timed administration to bedtime. No further issues.',
    reportedBy: 'Dr. Rajesh Sharma'
  },
  {
    id: 'AE-1020',
    trialId: 'AYU-006',
    participantId: 'P-06-033',
    eventDescription: 'Moderate headache and transient facial flushing after high-dose Curcuminoid intake.',
    severity: 'Moderate',
    dateReported: '2026-08-20',
    status: 'Resolved',
    assignedSafetyOfficer: 'Dr. Amit Tripathi',
    actionTaken: 'Monitored blood pressure; symptoms subsided within 4 hours. No dosage change required.',
    reportedBy: 'Dr. Sunita Varma'
  },
  {
    id: 'AE-1019',
    trialId: 'AYU-002',
    participantId: 'P-02-054',
    eventDescription: 'Hypoglycemic tremor episode (Blood Glucose 62 mg/dL) co-administered with diet control.',
    severity: 'Moderate',
    dateReported: '2026-08-14',
    status: 'Resolved',
    assignedSafetyOfficer: 'Dr. Ananya Joshi',
    actionTaken: 'Adjusted dietary snack intervals. Glucose levels stabilized.',
    reportedBy: 'Dr. Sunita Varma'
  },
  {
    id: 'AE-1018',
    trialId: 'AYU-007',
    participantId: 'P-07-012',
    eventDescription: 'Mild nausea following evening Shatavari Granules intake.',
    severity: 'Mild',
    dateReported: '2026-08-01',
    status: 'Resolved',
    assignedSafetyOfficer: 'Dr. Amit Tripathi',
    actionTaken: 'Formulation vehicle changed from water to warm milk.',
    reportedBy: 'Dr. Rajesh Sharma'
  },
  {
    id: 'AE-1017',
    trialId: 'AYU-008',
    participantId: 'P-08-011',
    eventDescription: 'Localized skin itching and mild scaling at application site.',
    severity: 'Moderate',
    dateReported: '2026-07-22',
    status: 'Under Review',
    assignedSafetyOfficer: 'Dr. Ananya Joshi',
    actionTaken: 'Topical gel stopped; subject under observation.',
    reportedBy: 'Dr. Sunita Varma'
  }
];

// ==========================================
// DOCUMENTS MANAGEMENT (10 Documents)
// ==========================================
let documents = [
  { id: 'DOC-101', trialId: 'AYU-001', name: 'Clinical_Trial_Protocol_v2.1_Ashwagandha.pdf', category: 'Trial Protocol', uploadedBy: 'Dr. Rajesh Sharma', role: 'Researcher', date: '2026-01-10', status: 'Approved', size: '2.4 MB' },
  { id: 'DOC-102', trialId: 'AYU-001', name: 'IEC_Ethics_Approval_Certificate_AYU001.pdf', category: 'Ethics Approval', uploadedBy: 'Prof. Vaidya B.K. Nambiar', role: 'Ethics Committee', date: '2026-01-12', status: 'Approved', size: '1.1 MB' },
  { id: 'DOC-103', trialId: 'AYU-002', name: 'Patient_Informed_Consent_Form_Bilingual_v3.pdf', category: 'Consent Form', uploadedBy: 'Dr. Sunita Varma', role: 'Researcher', date: '2025-07-20', status: 'Approved', size: '890 KB' },
  { id: 'DOC-104', trialId: 'AYU-002', name: 'Safety_Audit_Report_Q2_2026_NishaAmalaki.pdf', category: 'Safety Report', uploadedBy: 'Dr. Amit Tripathi', role: 'Safety Officer', date: '2026-06-15', status: 'Pending Review', size: '3.8 MB' },
  { id: 'DOC-105', trialId: 'AYU-008', name: 'Adverse_Event_AE1024_Investigation_Dossier.pdf', category: 'Safety Report', uploadedBy: 'Dr. Ananya Joshi', role: 'Safety Officer', date: '2026-09-11', status: 'Pending Review', size: '4.2 MB' },
  { id: 'DOC-106', trialId: 'AYU-004', name: 'Brahmi_Cognition_Trial_Protocol_Draft_v1.pdf', category: 'Trial Protocol', uploadedBy: 'Dr. Sunita Varma', role: 'Researcher', date: '2026-05-01', status: 'Under Review', size: '1.8 MB' },
  { id: 'DOC-107', trialId: 'AYU-005', name: 'Final_Clinical_Study_Report_CSR_Triphala.pdf', category: 'Final Report', uploadedBy: 'Dr. Rajesh Sharma', role: 'Researcher', date: '2026-06-25', status: 'Approved', size: '7.5 MB' },
  { id: 'DOC-108', trialId: 'AYU-003', name: 'Shallaki_Guggulu_Standardization_Certificate.pdf', category: 'Trial Protocol', uploadedBy: 'Dr. Rajesh Sharma', role: 'Researcher', date: '2026-02-18', status: 'Approved', size: '1.5 MB' },
  { id: 'DOC-109', trialId: 'AYU-006', name: 'Curcumin_Nano_Safety_Data_Sheet.pdf', category: 'Safety Report', uploadedBy: 'Dr. Sunita Varma', role: 'Researcher', date: '2026-01-20', status: 'Approved', size: '2.1 MB' },
  { id: 'DOC-110', trialId: 'AYU-007', name: 'Shatavari_DEXA_Imaging_SOP_Document.pdf', category: 'Trial Protocol', uploadedBy: 'Dr. Rajesh Sharma', role: 'Researcher', date: '2026-04-10', status: 'Approved', size: '3.0 MB' }
];

// ==========================================
// NOTIFICATIONS (10 Notifications)
// ==========================================
let notifications = [
  { id: 'ntf-1', title: 'Overdue Safety Report Alert', message: 'Annual Regulatory Safety Report for trial AYU-002 is overdue by 1 day.', type: 'critical', timestamp: '10 mins ago', read: false, trialId: 'AYU-002' },
  { id: 'ntf-2', title: 'Critical Adverse Event Flagged', message: 'Severe allergic reaction AE-1024 reported in trial AYU-008. Safety audit requested.', type: 'critical', timestamp: '2 hours ago', read: false, trialId: 'AYU-008' },
  { id: 'ntf-3', title: 'Ethics Review Deadline Approaching', message: 'Ethics Status Update for AYU-001 is due in 4 days (18 Sept 2026).', type: 'warning', timestamp: '5 hours ago', read: false, trialId: 'AYU-001' },
  { id: 'ntf-4', title: 'Trial Protocol Pending Ethics Clearance', message: 'Trial AYU-004 protocol dossier awaiting Ethics Board final sign-off.', type: 'warning', timestamp: '1 day ago', read: false, trialId: 'AYU-004' },
  { id: 'ntf-5', title: 'Trial Enrollment Milestone Met', message: 'Trial AYU-005 successfully reached 100% participant recruitment target (250/250).', type: 'completed', timestamp: '2 days ago', read: true, trialId: 'AYU-005' },
  { id: 'ntf-6', title: 'New Safety Document Uploaded', message: 'AE-1024 Investigation Dossier uploaded by Safety Officer Dr. Ananya Joshi.', type: 'info', timestamp: '3 days ago', read: true, trialId: 'AYU-008' },
  { id: 'ntf-7', title: 'WOMAC Evaluation Milestone Active', message: 'Mid-term osteoarthritis evaluation window opened for trial AYU-003.', type: 'info', timestamp: '4 days ago', read: true, trialId: 'AYU-003' },
  { id: 'ntf-8', title: 'Trial Status Updated', message: 'Trial AYU-008 status changed to Suspended by Safety Officer.', type: 'critical', timestamp: '5 days ago', read: true, trialId: 'AYU-008' },
  { id: 'ntf-9', title: 'Audit Verification Completed', message: 'Admin verified TMF dossier completeness for completed trial AYU-005.', type: 'completed', timestamp: '1 week ago', read: true, trialId: 'AYU-005' },
  { id: 'ntf-10', title: 'System Security & Role Audit Passed', message: 'AIIA CTMMS quarterly compliance & access control check executed cleanly.', type: 'info', timestamp: '2 weeks ago', read: true, trialId: null }
];

// ==========================================
// AUDIT LOG (10 Logs)
// ==========================================
let auditLogs = [
  { id: 'log-101', user: 'Dr. Amit Tripathi', role: 'Safety Officer', action: 'Flagged Critical Adverse Event AE-1024 & Suspended Trial Dosing', trialId: 'AYU-008', timestamp: '2026-09-10 14:32:05', severity: 'Critical' },
  { id: 'log-102', user: 'Dr. Sunita Varma', role: 'Researcher', action: 'Updated trial AYU-002 status to Under Review during regulatory dossier prep', trialId: 'AYU-002', timestamp: '2026-09-08 11:15:40', severity: 'Warning' },
  { id: 'log-103', user: 'Prof. Vaidya B.K. Nambiar', role: 'Ethics Committee', action: 'Issued conditional protocol approval for trial AYU-004', trialId: 'AYU-004', timestamp: '2026-09-05 16:45:12', severity: 'Info' },
  { id: 'log-104', user: 'Dr. Rajesh Sharma', role: 'Researcher', action: 'Uploaded mid-term blood biomarker dataset for trial AYU-001', trialId: 'AYU-001', timestamp: '2026-09-01 09:20:00', severity: 'Info' },
  { id: 'log-105', user: 'Admin - AIIA Secretariat', role: 'Administrator', action: 'Created new trial dossier AYU-007 (Shatavari Osteopenia Trial)', trialId: 'AYU-007', timestamp: '2026-04-15 10:00:22', severity: 'Info' },
  { id: 'log-106', user: 'Dr. Ananya Joshi', role: 'Safety Officer', action: 'Assigned as Primary Monitor for Adverse Event AE-1023 (AYU-002)', trialId: 'AYU-002', timestamp: '2026-09-08 15:10:00', severity: 'Warning' },
  { id: 'log-107', user: 'Dr. Rajesh Sharma', role: 'Researcher', action: 'Closed Out Trial AYU-005 & Archival Dossier Submitted', trialId: 'AYU-005', timestamp: '2026-06-30 17:00:00', severity: 'Success' },
  { id: 'log-108', user: 'Prof. Vaidya B.K. Nambiar', role: 'Ethics Committee', action: 'Reviewed and approved Informed Consent Form v3 for AYU-002', trialId: 'AYU-002', timestamp: '2025-07-21 12:30:15', severity: 'Info' },
  { id: 'log-109', user: 'Dr. Sunita Varma', role: 'Researcher', action: 'Logged patient enrollment milestone (105/140) for trial AYU-006', trialId: 'AYU-006', timestamp: '2026-08-18 14:05:55', severity: 'Info' },
  { id: 'log-110', user: 'Admin - AIIA Secretariat', role: 'Administrator', action: 'Executed system-wide compliance role access validation', trialId: 'ALL', timestamp: '2026-09-01 08:00:00', severity: 'Info' }
];

// ==========================================
// REST API ENDPOINTS
// ==========================================

// 1. AUTHENTICATION
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role, institution } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
  }

  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
  }

  const avatar = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'US';
  const newUserRole = role || 'Researcher';
  const newUser = {
    id: `usr-${Date.now()}`,
    email: email.trim(),
    password: password,
    name: name.trim(),
    role: newUserRole,
    institution: institution || 'All India Institute of Ayurveda (AIIA)',
    avatar: avatar
  };

  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '24h' });

  // Audit log
  auditLogs.unshift({
    id: `log-${Date.now()}`,
    user: newUser.name,
    role: newUser.role,
    action: `New user registered as ${newUser.role}: ${newUser.name} (${newUser.email})`,
    trialId: 'N/A',
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    severity: 'Info'
  });

  res.status(201).json({
    success: true,
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      institution: newUser.institution,
      avatar: newUser.avatar
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid credentials. Please check your email and password.' });
  }

  // Strictly enforce user's authentic role stored in database
  const userRole = user.role;
  const token = jwt.sign({ id: user.id, email: user.email, role: userRole }, JWT_SECRET, { expiresIn: '24h' });

  // Add audit log
  auditLogs.unshift({
    id: `log-${Date.now()}`,
    user: user.name,
    role: userRole,
    action: `User logged into CTMMS dashboard as ${userRole}`,
    trialId: 'N/A',
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    severity: 'Info'
  });

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: userRole,
      institution: user.institution,
      avatar: user.avatar
    }
  });
});

// 2. GET DASHBOARD SUMMARY STATS
app.get('/api/dashboard/stats', (req, res) => {
  const totalTrials = trials.length;
  const activeTrials = trials.filter(t => t.status === 'Ongoing').length;
  const completedTrials = trials.filter(t => t.status === 'Completed').length;
  const underReviewTrials = trials.filter(t => t.status === 'Under Review').length;
  const suspendedTrials = trials.filter(t => t.status === 'Suspended').length;
  const planningTrials = trials.filter(t => t.status === 'Planning').length;
  
  const requiringAttention = trials.filter(t => t.status === 'Under Review' || t.status === 'Suspended' || t.riskLevel === 'High').length;
  const upcomingDeadlinesCount = deadlines.filter(d => d.status !== 'Completed').length;
  const overdueDeadlinesCount = deadlines.filter(d => d.status === 'Overdue').length;
  const dueSoonDeadlinesCount = deadlines.filter(d => d.status === 'Due Soon').length;
  const openSafetyEventsCount = safetyEvents.filter(s => s.status !== 'Resolved').length;
  const criticalSafetyEventsCount = safetyEvents.filter(s => s.severity === 'Critical' && s.status !== 'Resolved').length;

  res.json({
    totalTrials,
    activeTrials,
    completedTrials,
    underReviewTrials,
    suspendedTrials,
    planningTrials,
    requiringAttention,
    upcomingDeadlinesCount,
    overdueDeadlinesCount,
    dueSoonDeadlinesCount,
    openSafetyEventsCount,
    criticalSafetyEventsCount
  });
});

// 3. TRIALS CRUD & SEARCH
app.get('/api/trials', (req, res) => {
  const { search, status, risk, phase } = req.query;
  let result = [...trials];

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(t => 
      t.id.toLowerCase().includes(q) ||
      t.title.toLowerCase().includes(q) ||
      t.pi.toLowerCase().includes(q) ||
      t.intervention.toLowerCase().includes(q)
    );
  }

  if (status && status !== 'All') {
    result = result.filter(t => t.status === status);
  }

  if (risk && risk !== 'All') {
    result = result.filter(t => t.riskLevel === risk);
  }

  if (phase && phase !== 'All') {
    result = result.filter(t => t.phase === phase);
  }

  res.json(result);
});

app.get('/api/trials/:id', (req, res) => {
  const trial = trials.find(t => t.id.toUpperCase() === req.params.id.toUpperCase());
  if (!trial) return res.status(404).json({ message: 'Trial not found' });
  
  const trialDeadlines = deadlines.filter(d => d.trialId.toUpperCase() === trial.id.toUpperCase());
  const trialSafety = safetyEvents.filter(s => s.trialId.toUpperCase() === trial.id.toUpperCase());
  const trialDocs = documents.filter(doc => doc.trialId.toUpperCase() === trial.id.toUpperCase());
  const trialLogs = auditLogs.filter(l => l.trialId.toUpperCase() === trial.id.toUpperCase());

  res.json({
    ...trial,
    deadlinesList: trialDeadlines,
    safetyEventsList: trialSafety,
    documentsList: trialDocs,
    auditLogsList: trialLogs
  });
});

app.post('/api/trials', (req, res) => {
  const { id, title, pi, institution, intervention, phase, participants, startDate, endDate, riskLevel, description } = req.body;

  const newId = id || `AYU-00${trials.length + 1}`;
  const newTrial = {
    id: newId,
    title: title || 'New Ayurvedic Clinical Protocol',
    pi: pi || 'Dr. Principal Investigator',
    piEmail: 'researcher@aiia.gov.in',
    institution: institution || 'All India Institute of Ayurveda (AIIA)',
    intervention: intervention || 'Herbal Formulation',
    phase: phase || 'Phase I',
    participants: parseInt(participants) || 50,
    enrolledParticipants: 0,
    startDate: startDate || new Date().toISOString().substring(0, 10),
    endDate: endDate || '2027-12-31',
    status: 'Planning',
    riskLevel: riskLevel || 'Low',
    lifecycleStage: 'Planning',
    description: description || 'Newly registered clinical trial protocol in Ayurvedic research.',
    milestones: [
      { id: 'm1', title: 'Protocol Creation & Registration', status: 'Completed', date: new Date().toISOString().substring(0, 10) },
      { id: 'm2', title: 'Institutional Ethics Approval Request', status: 'In Progress', date: new Date(Date.now() + 86400000 * 7).toISOString().substring(0, 10) },
      { id: 'm3', title: 'Subject Recruitment Launch', status: 'Pending', date: new Date(Date.now() + 86400000 * 30).toISOString().substring(0, 10) }
    ]
  };

  trials.unshift(newTrial);

  // Auto generate initial deadline
  deadlines.unshift({
    id: `DL-${Date.now().toString().slice(-3)}`,
    trialId: newId,
    activity: 'Institutional Ethics Committee Clearance Sign-off',
    deadline: new Date(Date.now() + 86400000 * 14).toISOString().substring(0, 10),
    responsibleRole: 'Ethics Committee',
    status: 'Due Soon',
    daysRemaining: 14,
    assignedTo: 'Prof. Vaidya B.K. Nambiar',
    urgency: 'medium'
  });

  // Audit log
  auditLogs.unshift({
    id: `log-${Date.now()}`,
    user: pi || 'System User',
    role: 'Researcher',
    action: `Created & Initialized new Clinical Trial ${newId}: ${title}`,
    trialId: newId,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    severity: 'Info'
  });

  // Notification
  notifications.unshift({
    id: `ntf-${Date.now()}`,
    title: 'New Clinical Trial Registered',
    message: `Trial ${newId} (${title}) has been initialized in Planning stage.`,
    type: 'info',
    timestamp: 'Just now',
    read: false,
    trialId: newId
  });

  res.status(201).json({ success: true, trial: newTrial });
});

// 4. COMPLIANCE & DEADLINES
app.get('/api/deadlines', (req, res) => {
  res.json(deadlines);
});

app.put('/api/deadlines/:id/complete', (req, res) => {
  const dl = deadlines.find(d => d.id === req.params.id);
  if (!dl) return res.status(404).json({ message: 'Deadline not found' });

  dl.status = 'Completed';
  dl.daysRemaining = 0;
  dl.urgency = 'completed';

  // Audit log
  auditLogs.unshift({
    id: `log-${Date.now()}`,
    user: req.body.userName || 'Assigned User',
    role: req.body.userRole || 'Researcher',
    action: `Marked Deadline ${dl.id} (${dl.activity}) as COMPLETED`,
    trialId: dl.trialId,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    severity: 'Success'
  });

  // Notification
  notifications.unshift({
    id: `ntf-${Date.now()}`,
    title: 'Deadline Marked Completed',
    message: `${dl.activity} for trial ${dl.trialId} marked as completed.`,
    type: 'completed',
    timestamp: 'Just now',
    read: false,
    trialId: dl.trialId
  });

  res.json({ success: true, deadline: dl });
});

// 5. SAFETY & ADVERSE EVENTS
app.get('/api/safety-events', (req, res) => {
  res.json(safetyEvents);
});

app.post('/api/safety-events', (req, res) => {
  const { trialId, participantId, eventDescription, severity, assignedSafetyOfficer, reportedBy } = req.body;

  const newEvent = {
    id: `AE-${Math.floor(1000 + Math.random() * 9000)}`,
    trialId: trialId || 'AYU-001',
    participantId: participantId || `P-${trialId ? trialId.replace('AYU-', '') : '01'}-099`,
    eventDescription: eventDescription || 'Adverse symptom recorded during trial monitoring.',
    severity: severity || 'Moderate',
    dateReported: new Date().toISOString().substring(0, 10),
    status: 'Reported',
    assignedSafetyOfficer: assignedSafetyOfficer || 'Dr. Amit Tripathi',
    actionTaken: 'Safety review pending. Monitoring patient vitals.',
    reportedBy: reportedBy || 'Dr. Rajesh Sharma'
  };

  safetyEvents.unshift(newEvent);

  // If Critical/Severe, raise risk or suspend notice
  if (severity === 'Critical' || severity === 'Severe') {
    const trial = trials.find(t => t.id === trialId);
    if (trial) {
      trial.riskLevel = 'High';
    }
  }

  // Audit log
  auditLogs.unshift({
    id: `log-${Date.now()}`,
    user: reportedBy || 'Clinical Staff',
    role: 'Researcher',
    action: `Reported ${severity} Adverse Event ${newEvent.id} for trial ${trialId}`,
    trialId: trialId,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    severity: severity === 'Critical' ? 'Critical' : 'Warning'
  });

  // Notification
  notifications.unshift({
    id: `ntf-${Date.now()}`,
    title: `New ${severity} Adverse Event Reported`,
    message: `${newEvent.id} recorded in trial ${trialId}: ${eventDescription}`,
    type: severity === 'Critical' ? 'critical' : 'warning',
    timestamp: 'Just now',
    read: false,
    trialId: trialId
  });

  res.status(201).json({ success: true, event: newEvent });
});

// 6. DOCUMENTS
app.get('/api/documents', (req, res) => {
  res.json(documents);
});

app.post('/api/documents', (req, res) => {
  const { trialId, name, category, uploadedBy, role } = req.body;

  const newDoc = {
    id: `DOC-${Math.floor(100 + Math.random() * 900)}`,
    trialId: trialId || 'AYU-001',
    name: name || 'Ayurvedic_Trial_Documentation.pdf',
    category: category || 'Trial Protocol',
    uploadedBy: uploadedBy || 'Dr. Rajesh Sharma',
    role: role || 'Researcher',
    date: new Date().toISOString().substring(0, 10),
    status: 'Pending Review',
    size: '2.1 MB'
  };

  documents.unshift(newDoc);

  // Audit log
  auditLogs.unshift({
    id: `log-${Date.now()}`,
    user: uploadedBy || 'User',
    role: role || 'Researcher',
    action: `Uploaded Document '${newDoc.name}' (${category}) for trial ${trialId}`,
    trialId: trialId,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    severity: 'Info'
  });

  res.status(201).json({ success: true, document: newDoc });
});

// 7. NOTIFICATIONS
app.get('/api/notifications', (req, res) => {
  res.json(notifications);
});

app.put('/api/notifications/read-all', (req, res) => {
  notifications.forEach(n => n.read = true);
  res.json({ success: true, message: 'All notifications marked as read' });
});

// 8. AUDIT LOGS
app.get('/api/audit-logs', (req, res) => {
  res.json(auditLogs);
});

// 9. USERS LIST FOR ADMIN
app.get('/api/users', (req, res) => {
  res.json(users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    institution: u.institution,
    avatar: u.avatar
  })));
});

app.post('/api/users', (req, res) => {
  const { name, email, password, role, institution } = req.body;

  if (!email || !name) {
    return res.status(400).json({ success: false, message: 'Name and email are required.' });
  }

  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User with this email already exists.' });
  }

  const avatar = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'US';
  const newUser = {
    id: `usr-${Date.now()}`,
    email: email.trim(),
    password: password || 'password123',
    name: name.trim(),
    role: role || 'Researcher',
    institution: institution || 'All India Institute of Ayurveda (AIIA)',
    avatar: avatar
  };

  users.push(newUser);

  // Audit log
  auditLogs.unshift({
    id: `log-${Date.now()}`,
    user: 'Administrator',
    role: 'Administrator',
    action: `Created new ${newUser.role} user: ${newUser.name} (${newUser.email})`,
    trialId: 'N/A',
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    severity: 'Info'
  });

  res.status(201).json({ success: true, user: newUser });
});

// START SERVER
// Only listen on a port when run directly (local dev with `node server.js` / `npm run dev`).
// On Vercel, this file is loaded as a serverless function instead, so it must
// export the Express app rather than call app.listen().
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`AIIA CTMMS Backend REST API running on port ${PORT}`);
    console.log(`System ready for SIH26046 Hackathon Demonstration`);
    console.log(`=================================================`);
  });
}

module.exports = app;
