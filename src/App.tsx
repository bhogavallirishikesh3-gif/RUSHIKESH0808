import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { JudgeDemoBanner } from './components/JudgeDemoBanner';
import { CitizenPortal } from './components/CitizenPortal';
import { CommandCenter } from './components/CommandCenter';
import { LogicVisualizer } from './components/LogicVisualizer';
import { HonestyDashboard } from './components/HonestyDashboard';
import { ThreeCityView } from './components/ThreeCityView';
import { CivicChatbotModal } from './components/CivicChatbotModal';
import { AuthModal } from './components/AuthModal';
import { INITIAL_CIVIC_ISSUES, DEMO_STEPS } from './data/mockData';
import { CivicIssue, IssueStatus } from './types';
import { UserProfile, PRESET_USERS } from './types/auth';
import { LanguageCode } from './utils/i18n';
import { MessageSquare, Leaf, Sparkles } from 'lucide-react';
import ecoBgImage from './assets/images/eco_environment_bg_1793345092234.jpg';

export default function App() {
  const [issues, setIssues] = useState<CivicIssue[]>(INITIAL_CIVIC_ISSUES);
  const [currentView, setCurrentView] = useState<'citizen' | 'admin' | 'pipeline' | 'threeCity' | 'honesty'>('citizen');
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [isJudgeBannerVisible, setIsJudgeBannerVisible] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [demoStepIndex, setDemoStepIndex] = useState(0);
  const [inspectedIssueId, setInspectedIssueId] = useState<string | undefined>(undefined);

  // User Authentication State (Persisted in localStorage with instant default Citizen persona)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('damgo_user_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read user profile from localStorage', e);
    }
    // Default to Ramesh Kumar (Citizen) for seamless hackathon testing
    return PRESET_USERS[0];
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Handle Login or Persona Switch
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('damgo_user_profile', JSON.stringify(user));
    } catch (e) {
      console.warn('Could not save user profile', e);
    }

    // Role-based navigation shortcut
    if (user.role === 'officer' || user.role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('citizen');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('damgo_user_profile');
    } catch (e) {
      console.warn('Could not remove user profile', e);
    }
  };

  // Submit a new issue
  const handleNewIssueSubmitted = (newIssue: CivicIssue) => {
    setIssues((prev) => [newIssue, ...prev]);

    // If logged in as citizen, increment reported count & award +50 civic points
    if (currentUser) {
      setCurrentUser((prev) => {
        if (!prev) return prev;
        const updated = {
          ...prev,
          reportedCount: prev.reportedCount + 1,
          civicScore: prev.civicScore + 50,
        };
        try {
          localStorage.setItem('damgo_user_profile', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
  };

  // Upvote issue
  const handleUpvoteIssue = (issueId: string) => {
    setIssues((prev) =>
      prev.map((iss) => {
        if (iss.id === issueId) {
          return {
            ...iss,
            upvotes: iss.upvotes + 1,
            priorityScore: Math.min(100, iss.priorityScore + 2),
          };
        }
        return iss;
      })
    );
  };

  // Update status (e.g. from Dispatched -> Resolved or Assign Crew)
  const handleUpdateIssueStatus = (
    issueId: string,
    newStatus: IssueStatus,
    crewInfo?: any,
    note?: string
  ) => {
    setIssues((prev) =>
      prev.map((iss) => {
        if (iss.id === issueId) {
          const newTimeline = [...iss.timeline];
          if (newStatus === 'Dispatched') {
            newTimeline.push({
              id: `tl-dispatch-${Date.now()}`,
              status: 'Dispatched',
              timestamp: 'Just now',
              title: `Crew Dispatched: ${crewInfo?.crewName || 'Municipal Response'}`,
              description: note || 'Field crew en route with assigned repair equipment.',
              actor: currentUser ? `${currentUser.name} (${currentUser.roleTitle})` : 'Command Dispatcher',
              badge: `Lead: ${crewInfo?.leadTechnician || 'Staff'}`,
            });
          } else if (newStatus === 'Resolved') {
            newTimeline.push({
              id: `tl-resolve-${Date.now()}`,
              status: 'Resolved',
              timestamp: 'Just now',
              title: 'Incident Resolved & Inspected',
              description: note || 'Physical repairs complete. Work ticket archived.',
              actor: currentUser ? `${currentUser.name} (${currentUser.roleTitle})` : 'Lead Field Technician',
              badge: 'Closed',
            });
          }

          return {
            ...iss,
            status: newStatus,
            assignedCrew: crewInfo || iss.assignedCrew,
            timeline: newTimeline,
            updatedAt: 'Just now',
          };
        }
        return iss;
      })
    );

    // If officer resolved an issue, increase resolved count
    if (newStatus === 'Resolved' && currentUser && currentUser.role !== 'citizen') {
      setCurrentUser((prev) => {
        if (!prev) return prev;
        const updated = {
          ...prev,
          resolvedCount: prev.resolvedCount + 1,
          civicScore: prev.civicScore + 100,
        };
        try {
          localStorage.setItem('damgo_user_profile', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
  };

  const handleSelectIssueForInspection = (id: string) => {
    setInspectedIssueId(id);
    setCurrentView('citizen');
  };

  const activeCount = issues.filter((i) => i.status !== 'Resolved').length;
  const criticalCount = issues.filter((i) => i.urgency === 'Critical' && i.status !== 'Resolved').length;

  return (
    <div className="relative min-h-screen text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-neutral-950 antialiased overflow-x-hidden">
      {/* Dynamic Eco-City Environmental Background Image Layer */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none -z-10 transition-all duration-700"
        style={{
          backgroundImage: `url(${ecoBgImage})`,
        }}
      >
        {/* Soft emerald glass gradient overlay: transparent enough to showcase nature, dark enough for AAA contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/75 via-neutral-950/60 to-neutral-950/80 backdrop-blur-[1.5px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/20 via-emerald-950/25 to-neutral-950/70" />

        {/* Ambient floating nature leaves & ambient light particles */}
        <div className="absolute top-16 left-12 text-emerald-400/35 animate-float-slow pointer-events-none">
          <Leaf className="w-8 h-8 rotate-12 drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]" />
        </div>
        <div className="absolute top-1/3 right-16 text-teal-300/30 animate-float-slow [animation-delay:2s] pointer-events-none">
          <Leaf className="w-7 h-7 -rotate-45 drop-shadow-[0_0_10px_rgba(45,212,191,0.3)]" />
        </div>
        <div className="absolute bottom-28 left-1/4 text-emerald-300/25 animate-float-slow [animation-delay:4s] pointer-events-none">
          <Sparkles className="w-6 h-6 drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
        </div>
        <div className="absolute top-2/3 right-1/4 text-emerald-400/25 animate-float-slow [animation-delay:3s] pointer-events-none">
          <Leaf className="w-8 h-8 rotate-45" />
        </div>
      </div>

      {/* Top Navigation with Login & Profile Capsule */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        activeCount={activeCount}
        criticalCount={criticalCount}
        isJudgeBannerVisible={isJudgeBannerVisible}
        onToggleJudgeBanner={() => setIsJudgeBannerVisible(!isJudgeBannerVisible)}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onOpenChatbot={() => setIsChatbotOpen(true)}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onSwitchAccount={() => setIsAuthModalOpen(true)}
      />

      {/* 5-Minute Guided Tour Banner for Hackathon Judges */}
      {isJudgeBannerVisible && (
        <JudgeDemoBanner
          currentStepIndex={demoStepIndex}
          onStepChange={setDemoStepIndex}
          onNavigateView={setCurrentView}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {currentView === 'citizen' && (
          <CitizenPortal
            issues={issues}
            onNewIssueSubmitted={handleNewIssueSubmitted}
            onUpvoteIssue={handleUpvoteIssue}
            selectedIssueId={inspectedIssueId}
            onSelectIssue={setInspectedIssueId}
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            currentUser={currentUser}
            onOpenLogin={() => setIsAuthModalOpen(true)}
          />
        )}

        {currentView === 'admin' && (
          <CommandCenter
            issues={issues}
            onUpdateIssueStatus={handleUpdateIssueStatus}
            onSelectIssueForInspection={handleSelectIssueForInspection}
            currentLanguage={currentLanguage}
            currentUser={currentUser}
            onOpenLogin={() => setIsAuthModalOpen(true)}
          />
        )}

        {currentView === 'threeCity' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <ThreeCityView />
          </div>
        )}

        {currentView === 'pipeline' && <LogicVisualizer />}

        {currentView === 'honesty' && <HonestyDashboard />}
      </main>

      {/* Floating DamGo AI Chatbot Button */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-2xl border border-emerald-400/30 transition transform hover:scale-105"
          title="Open DamGo Civic Assistant"
        >
          <MessageSquare className="w-4 h-4" />
          <span>DamGo AI Assistant</span>
        </button>
      </div>

      {/* DamGo Multi-Turn Chatbot Modal */}
      <CivicChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        currentLanguage={currentLanguage}
      />

      {/* Authentication & Persona Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        currentLanguage={currentLanguage}
        currentUser={currentUser}
      />

      {/* Global Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-500 text-xs py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-300">DamGo</span>
            <span>•</span>
            <span>AI-Powered Civic Issue Management & Action Platform</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Model: Gemini 3.8 Flash</span>
            <span>•</span>
            <span>Camera: WebRTC Geo-Exif</span>
            <span>•</span>
            <span>Open311 Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
