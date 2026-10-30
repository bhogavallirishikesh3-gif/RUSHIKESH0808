export type IssueCategory =
  | 'Pothole & Road Hazard'
  | 'Water & Drainage'
  | 'Waste & Sanitation'
  | 'Electrical & Lighting'
  | 'Public Park & Safety'
  | 'Traffic & Signals';

export type IssueStatus =
  | 'Reported'
  | 'AI Triaged'
  | 'Dispatched'
  | 'In Progress'
  | 'Resolved';

export type UrgencyLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export interface TimelineEvent {
  id: string;
  status: IssueStatus;
  timestamp: string;
  title: string;
  description: string;
  actor: string;
  badge?: string;
}

export interface AIAnalysis {
  category: IssueCategory;
  priorityScore: number; // 0-100
  urgency: UrgencyLevel;
  safetyRisk: boolean;
  safetyRiskReason: string;
  department: string;
  suggestedCrew: string;
  estimatedResolutionHours: number;
  detectedObjects: string[];
  confidence: number;
  aiSummary: string;
  recommendedEquipment: string[];
  duplicateClusterId?: string;
  duplicateSimilarity?: number;
  duplicateOfId?: string;
}

export interface CivicIssue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  urgency: UrgencyLevel;
  priorityScore: number;
  safetyRisk: boolean;
  photoUrl: string;
  photoSource: 'camera' | 'upload' | 'sample';
  audioUrl?: string;
  language?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    district: string;
    nearSensitiveZone?: string; // e.g. "30m from Lincoln Elementary"
  };
  submittedAt: string;
  updatedAt: string;
  reporter: {
    name: string;
    isAnonymous: boolean;
    contact?: string;
  };
  upvotes: number;
  aiAnalysis: AIAnalysis;
  timeline: TimelineEvent[];
  assignedCrew?: {
    crewName: string;
    leadTechnician: string;
    dispatchedAt: string;
    etaHours: number;
    equipment: string[];
  };
}

export interface HotspotCluster {
  id: string;
  name: string;
  district: string;
  center: { lat: number; lng: number };
  radiusMeters: number;
  issueIds: string[];
  issueCount: number;
  dominantCategory: IssueCategory;
  riskLevel: 'Severe' | 'Elevated' | 'Moderate';
  synthesisTitle: string;
  aiRootCauseHypothesis: string;
  recommendedImmediateAction: string;
}

export interface ActionBrief {
  title: string;
  executiveSummary: string;
  recommendedActions: string[];
  estimatedCost: string;
  slaTargetHours: number;
  publicNoticeDraft: string;
}

export interface DemoStep {
  step: number;
  title: string;
  subtitle: string;
  view: 'citizen' | 'admin' | 'pipeline' | 'honesty';
  actionPrompt: string;
  highlightTarget?: string;
}

export * from './auth';

