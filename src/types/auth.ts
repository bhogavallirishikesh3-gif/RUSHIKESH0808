export type UserRole = 'citizen' | 'officer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  phone: string;
  email: string;
  ward: string;
  department?: string;
  staffId?: string;
  avatarEmoji: string;
  civicScore: number;
  reportedCount: number;
  resolvedCount: number;
  badges: string[];
  isVerified: boolean;
  joinedDate: string;
}

export const PRESET_USERS: UserProfile[] = [
  {
    id: 'user-citizen-01',
    name: 'Ramesh Kumar',
    role: 'citizen',
    roleTitle: 'Active Citizen & Community Lead',
    phone: '+91 98450 82190',
    email: 'ramesh.k@indiranagar.org',
    ward: 'Ward 150 - Indiranagar, East Zone',
    avatarEmoji: '👨🏽‍💼',
    civicScore: 420,
    reportedCount: 6,
    resolvedCount: 4,
    badges: ['Top 5% Civic Guardian', 'Clean Pavement Crusader', 'DigiLocker Verified'],
    isVerified: true,
    joinedDate: 'March 2024',
  },
  {
    id: 'user-officer-02',
    name: 'Er. Priya Sharma',
    role: 'officer',
    roleTitle: 'Senior Ward Road Engineer (BBMP)',
    phone: '+91 94480 34567',
    email: 'priya.sharma@bbmp.gov.in',
    ward: 'BBMP East Division - Ward 150',
    department: 'BBMP Road Infrastructure & Rapid Asphalt Response',
    staffId: 'BBMP-ENG-2024-884',
    avatarEmoji: '👷‍♀️',
    civicScore: 1850,
    reportedCount: 42,
    resolvedCount: 38,
    badges: ['Rapid Dispatch Star (Avg SLA: 2.1h)', 'Asphalt Triage Specialist', 'Govt Verified Official'],
    isVerified: true,
    joinedDate: 'Jan 2023',
  },
  {
    id: 'user-admin-03',
    name: 'Dr. K. Venkataraman, IAS',
    role: 'admin',
    roleTitle: 'Municipal Chief Commissioner & Administrator',
    phone: '+91 98800 11223',
    email: 'commissioner@bbmp.gov.in',
    ward: 'Bruhat Bengaluru Mahanagara Palike (All Zones)',
    department: 'Urban Development & Smart City Mission',
    staffId: 'BBMP-HQ-COMM-01',
    avatarEmoji: '🏛️',
    civicScore: 3400,
    reportedCount: 120,
    resolvedCount: 116,
    badges: ['Smart City Governance Leader', 'Astra AI Architecture Auditor', 'Apex Authorization'],
    isVerified: true,
    joinedDate: 'Aug 2022',
  },
];
