import React, { useState } from 'react';
import {
  Camera,
  Map,
  Cpu,
  ShieldCheck,
  Award,
  Box,
  MessageSquare,
  Globe,
  User,
  ChevronDown,
} from 'lucide-react';
import { LanguageCode, SUPPORTED_LANGUAGES, getUIString } from '../utils/i18n';
import { UserProfile } from '../types/auth';
import { UserProfileFlyout } from './UserProfileFlyout';

interface NavbarProps {
  currentView: 'citizen' | 'admin' | 'pipeline' | 'threeCity' | 'honesty';
  onViewChange: (view: 'citizen' | 'admin' | 'pipeline' | 'threeCity' | 'honesty') => void;
  activeCount: number;
  criticalCount: number;
  isJudgeBannerVisible: boolean;
  onToggleJudgeBanner: () => void;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onOpenChatbot?: () => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onSwitchAccount: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  activeCount,
  criticalCount,
  isJudgeBannerVisible,
  onToggleJudgeBanner,
  currentLanguage,
  onLanguageChange,
  onOpenChatbot,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onSwitchAccount,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="w-full bg-neutral-950/85 backdrop-blur-xl border-b border-emerald-500/20 sticky top-0 z-30 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/25 text-neutral-950 font-black text-lg">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-neutral-100 text-lg tracking-tight">
                Dam<span className="text-emerald-400">Go</span>
              </span>
              <span className="text-[11px] text-emerald-400/80 font-medium hidden sm:inline">
                · {currentLanguage === 'kn' ? 'ನಾಗರಿಕ & ಪರಿಸರ ಮಿಷನ್' : 'Civic & Eco Action'}
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 hidden md:block">
              {getUIString(currentLanguage, 'subHeader')}
            </span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <nav className="flex items-center bg-neutral-900/90 p-1 rounded-xl border border-emerald-500/20 text-xs font-medium shadow-inner">
          <button
            onClick={() => onViewChange('citizen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'citizen'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{getUIString(currentLanguage, 'navCitizen')}</span>
            <span className="md:hidden">Report</span>
          </button>

          <button
            onClick={() => onViewChange('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'admin'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{getUIString(currentLanguage, 'navCommand')}</span>
            <span className="md:hidden">Admin</span>
            {criticalCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => onViewChange('threeCity')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'threeCity'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <Box className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">{getUIString(currentLanguage, 'navThreeCity')}</span>
            <span className="md:hidden">3D</span>
          </button>

          <button
            onClick={() => onViewChange('pipeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'pipeline'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{getUIString(currentLanguage, 'navLogic')}</span>
            <span className="md:hidden">Logic</span>
          </button>

          <button
            onClick={() => onViewChange('honesty')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentView === 'honesty'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{getUIString(currentLanguage, 'navHonesty')}</span>
            <span className="md:hidden">Audit</span>
          </button>
        </nav>

        {/* Right Status / Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* AI Chatbot Trigger Button */}
          {onOpenChatbot && (
            <button
              onClick={onOpenChatbot}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold shadow-sm transition"
              title="Open DamGo Civic Assistant"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{getUIString(currentLanguage, 'navDamGoAI')}</span>
            </button>
          )}

          {/* Global Language Selector with Kannada prominent */}
          <div className="flex items-center gap-1.5 bg-neutral-900/90 border border-emerald-500/35 rounded-xl px-2 py-1.5 text-xs ring-1 ring-emerald-500/15 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
              className="bg-transparent text-xs text-emerald-300 font-bold focus:outline-none cursor-pointer"
              title="Change Interface & Location Language"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-neutral-900 text-white">
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </select>
          </div>

          {/* Hackathon Judge Tour Button */}
          <button
            onClick={onToggleJudgeBanner}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
              isJudgeBannerVisible
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/35 hover:bg-amber-500/25'
                : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:text-white'
            }`}
            title="Toggle Judge Demo Tour"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{getUIString(currentLanguage, 'navJudgeTour')}</span>
          </button>

          {/* USER LOGIN / PROFILE BUTTON */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-emerald-500/40 text-xs text-white shadow-sm transition ring-1 ring-emerald-500/20"
                title="View Account Profile"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-sm shadow-inner shrink-0">
                  {currentUser.avatarEmoji}
                </div>
                <div className="text-left hidden lg:block">
                  <div className="font-bold text-[11px] leading-tight text-white truncate max-w-[90px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[9px] text-emerald-400 font-medium leading-none">
                    {currentUser.role === 'citizen'
                      ? 'Citizen'
                      : currentUser.role === 'officer'
                      ? 'BBMP Officer'
                      : 'Commissioner'}
                  </div>
                </div>
                <span className="hidden sm:inline-flex text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/25">
                  🏆 {currentUser.civicScore}
                </span>
                <ChevronDown className="w-3 h-3 text-neutral-400 shrink-0" />
              </button>

              <UserProfileFlyout
                user={currentUser}
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                onLogout={onLogout}
                onSwitchAccount={onSwitchAccount}
                onNavigateView={onViewChange}
                currentLanguage={currentLanguage}
              />
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600/30 to-teal-600/30 hover:from-emerald-600/50 hover:to-teal-600/50 text-white border border-emerald-400/50 text-xs font-bold shadow-md shadow-emerald-950/40 transition transform active:scale-95"
              title="Log In / Sign In"
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>{getUIString(currentLanguage, 'login')}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
