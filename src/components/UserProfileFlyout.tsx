import React, { useRef, useEffect } from 'react';
import {
  LogOut,
  UserCheck,
  CheckCircle2,
  Award,
  Sparkles,
  RefreshCw,
  FolderOpen,
  MapPin,
  Building,
  Phone,
  Mail,
  ShieldAlert,
} from 'lucide-react';
import { UserProfile } from '../types/auth';
import { LanguageCode, getUIString } from '../utils/i18n';

interface UserProfileFlyoutProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onSwitchAccount: () => void;
  onNavigateView: (view: 'citizen' | 'admin' | 'pipeline' | 'threeCity' | 'honesty') => void;
  currentLanguage: LanguageCode;
}

export const UserProfileFlyout: React.FC<UserProfileFlyoutProps> = ({
  user,
  isOpen,
  onClose,
  onLogout,
  onSwitchAccount,
  onNavigateView,
  currentLanguage,
}) => {
  const flyoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const roleBadgeStyle =
    user.role === 'citizen'
      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
      : user.role === 'officer'
      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      : 'bg-purple-500/20 text-purple-300 border-purple-500/30';

  const roleText =
    user.role === 'citizen'
      ? getUIString(currentLanguage, 'roleCitizen')
      : user.role === 'officer'
      ? getUIString(currentLanguage, 'roleOfficer')
      : getUIString(currentLanguage, 'roleAdmin');

  return (
    <div
      ref={flyoutRef}
      className="absolute right-0 top-14 w-80 sm:w-96 bg-neutral-950/95 border border-emerald-500/30 rounded-2xl shadow-2xl shadow-black/80 backdrop-blur-xl z-50 p-4 text-neutral-200 animate-fadeIn"
    >
      {/* Header Profile Identity */}
      <div className="flex items-start gap-3 pb-3 border-b border-neutral-800">
        <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-inner shrink-0">
          {user.avatarEmoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-extrabold text-white text-sm truncate">{user.name}</span>
            {user.isVerified && (
              <span title="DigiLocker Verified" className="inline-flex">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </span>
            )}

          </div>
          <div className="text-[11px] text-neutral-400 truncate">{user.roleTitle}</div>
          <div className="mt-1 flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${roleBadgeStyle}`}>
              {roleText}
            </span>
            {user.staffId && (
              <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
                {user.staffId}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Ward / Location Details */}
      <div className="py-2.5 space-y-1.5 text-xs text-neutral-400 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-neutral-300 font-medium truncate">{user.ward}</span>
        </div>
        {user.department && (
          <div className="flex items-center gap-2">
            <Building className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-neutral-400 text-[11px] truncate">{user.department}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-[11px]">
          <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span>{user.phone}</span>
        </div>
      </div>

      {/* Civic Score & Activity Stats */}
      <div className="py-3 border-b border-neutral-800/80">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-neutral-900/80 p-2 rounded-xl border border-neutral-800">
            <div className="text-amber-400 font-bold text-sm">🏆 {user.civicScore}</div>
            <div className="text-[10px] text-neutral-400">{getUIString(currentLanguage, 'civicPoints')}</div>
          </div>
          <div className="bg-neutral-900/80 p-2 rounded-xl border border-neutral-800">
            <div className="text-emerald-400 font-bold text-sm">📋 {user.reportedCount}</div>
            <div className="text-[10px] text-neutral-400">{getUIString(currentLanguage, 'reportsFiled')}</div>
          </div>
          <div className="bg-neutral-900/80 p-2 rounded-xl border border-neutral-800">
            <div className="text-teal-400 font-bold text-sm">✅ {user.resolvedCount}</div>
            <div className="text-[10px] text-neutral-400">{getUIString(currentLanguage, 'reportsResolved')}</div>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
          {user.badges.map((badge, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/25 text-emerald-300 flex items-center gap-1 font-medium"
            >
              <Award className="w-2.5 h-2.5 text-amber-400" />
              <span>{badge}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="pt-3 space-y-1.5">
        {user.role === 'officer' || user.role === 'admin' ? (
          <button
            onClick={() => {
              onNavigateView('admin');
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/25 transition"
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Open Ward Triage Console</span>
            </div>
            <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded">Action Ready</span>
          </button>
        ) : (
          <button
            onClick={() => {
              onNavigateView('citizen');
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/25 transition"
          >
            <div className="flex items-center gap-2">
              <FolderOpen className="w-3.5 h-3.5" />
              <span>{getUIString(currentLanguage, 'myReports')}</span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded">
              {user.reportedCount} Tickets
            </span>
          </button>
        )}

        <button
          onClick={() => {
            onSwitchAccount();
            onClose();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 text-xs font-medium transition"
        >
          <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
          <span>{getUIString(currentLanguage, 'switchAccount')}</span>
        </button>

        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/30 text-xs font-medium transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{getUIString(currentLanguage, 'logout')}</span>
        </button>
      </div>
    </div>
  );
};
