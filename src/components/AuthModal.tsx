import React, { useState } from 'react';
import {
  X,
  UserCheck,
  Shield,
  Smartphone,
  KeyRound,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Award,
  AlertCircle,
  Briefcase,
  Phone,
} from 'lucide-react';
import { UserProfile, PRESET_USERS, UserRole } from '../types/auth';
import { LanguageCode, getUIString } from '../utils/i18n';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  currentLanguage: LanguageCode;
  currentUser?: UserProfile | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentLanguage,
  currentUser,
}) => {
  const [activeTab, setActiveTab] = useState<'personas' | 'phone' | 'official'>('personas');

  // Phone OTP state
  const [phoneNumber, setPhoneNumber] = useState('9845082190');
  const [otpCode, setOtpCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');

  // Official Login state
  const [officialEmail, setOfficialEmail] = useState('priya.sharma@bbmp.gov.in');
  const [staffId, setStaffId] = useState('BBMP-ENG-2024-884');
  const [department, setDepartment] = useState('BBMP Road Infrastructure & Rapid Asphalt Response');
  const [officialPassword, setOfficialPassword] = useState('bbmp2026');

  if (!isOpen) return null;

  const handleSelectPersona = (user: UserProfile) => {
    onLoginSuccess(user);
    onClose();
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setOtpError(currentLanguage === 'kn' ? 'ದಯವಿಟ್ಟು 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ' : 'Please enter a valid 10-digit mobile number');
      return;
    }
    setOtpError('');
    setIsOtpSent(true);
    setOtpCode('2026'); // Pre-fill convenience for demo judges
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode !== '2026' && otpCode !== '1234') {
      setOtpError(currentLanguage === 'kn' ? 'ತಪ್ಪು OTP. ಡೆಮೊ OTP: 2026' : 'Invalid OTP. Demo OTP is 2026');
      return;
    }

    const citizenUser: UserProfile = {
      id: `user-phone-${Date.now()}`,
      name: `Citizen ${phoneNumber.slice(-4)}`,
      role: 'citizen',
      roleTitle: 'Verified Mobile Resident',
      phone: `+91 ${phoneNumber}`,
      email: `citizen.${phoneNumber.slice(-4)}@digilocker.in`,
      ward: 'Ward 150 - Indiranagar, East Zone',
      avatarEmoji: '👤',
      civicScore: 250,
      reportedCount: 3,
      resolvedCount: 2,
      badges: ['Mobile OTP Verified', 'Civic Contributor'],
      isVerified: true,
      joinedDate: 'Today',
    };

    onLoginSuccess(citizenUser);
    onClose();
  };

  const handleOfficialLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const officerPreset = PRESET_USERS.find((u) => u.role === 'officer') || PRESET_USERS[1];
    const loggedOfficer: UserProfile = {
      ...officerPreset,
      email: officialEmail || officerPreset.email,
      staffId: staffId || officerPreset.staffId,
      department: department || officerPreset.department,
    };
    onLoginSuccess(loggedOfficer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-xl bg-neutral-950/95 border border-emerald-500/30 rounded-2xl shadow-2xl shadow-emerald-950/50 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-neutral-800 bg-gradient-to-r from-neutral-900/90 via-emerald-950/30 to-neutral-900/90 flex items-start justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xl shadow-inner">
              🌱
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{getUIString(currentLanguage, 'loginTitle')}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  DigiGov · Open311
                </span>
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                {getUIString(currentLanguage, 'loginSubtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 pt-3 border-b border-neutral-800/80 bg-neutral-900/40 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('personas')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-t-xl border-b-2 transition whitespace-nowrap ${
              activeTab === 'personas'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-950/30'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{getUIString(currentLanguage, 'quickPersonaLogin')}</span>
          </button>

          <button
            onClick={() => setActiveTab('phone')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-t-xl border-b-2 transition whitespace-nowrap ${
              activeTab === 'phone'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-950/30'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-teal-400" />
            <span>{getUIString(currentLanguage, 'phoneOtpLogin')}</span>
          </button>

          <button
            onClick={() => setActiveTab('official')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-t-xl border-b-2 transition whitespace-nowrap ${
              activeTab === 'official'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-950/30'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{getUIString(currentLanguage, 'officerLogin')}</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* TAB 1: QUICK PERSONAS */}
          {activeTab === 'personas' && (
            <div className="space-y-3">
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center justify-between">
                <span>
                  💡 <strong>Instant Persona Switcher:</strong> Test DamGo as a resident reporter, BBMP road engineer, or city commissioner.
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {PRESET_USERS.map((user) => {
                  const isCurrent = currentUser?.id === user.id;
                  const roleBadgeColor =
                    user.role === 'citizen'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : user.role === 'officer'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-purple-500/20 text-purple-300 border-purple-500/30';

                  return (
                    <div
                      key={user.id}
                      className={`p-3.5 rounded-xl border transition-all text-left flex items-start justify-between gap-3 ${
                        isCurrent
                          ? 'border-emerald-400 bg-emerald-950/30 ring-1 ring-emerald-400/40'
                          : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-850 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-2xl shrink-0 shadow">
                          {user.avatarEmoji}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white text-sm">{user.name}</span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${roleBadgeColor}`}>
                              {user.role === 'citizen'
                                ? getUIString(currentLanguage, 'roleCitizen')
                                : user.role === 'officer'
                                ? getUIString(currentLanguage, 'roleOfficer')
                                : getUIString(currentLanguage, 'roleAdmin')}
                            </span>
                            {user.isVerified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            )}
                          </div>
                          <div className="text-xs text-neutral-400 mt-0.5">{user.roleTitle}</div>
                          <div className="text-[11px] text-neutral-500 mt-1 flex items-center gap-3 flex-wrap">
                            <span>📍 {user.ward}</span>
                            <span>•</span>
                            <span className="text-amber-400 font-semibold">
                              🏆 {user.civicScore} {getUIString(currentLanguage, 'civicPoints')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectPersona(user)}
                        className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                          isCurrent
                            ? 'bg-emerald-500 text-neutral-950 shadow-md font-bold'
                            : 'bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30'
                        }`}
                      >
                        <span>{isCurrent ? 'Active' : getUIString(currentLanguage, 'loginAs')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: MOBILE OTP / DIGILOCKER */}
          {activeTab === 'phone' && (
            <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
              <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-500/20 text-xs text-teal-300 flex items-center gap-2">
                <Smartphone className="w-4 h-4 shrink-0 text-teal-400" />
                <span>
                  {currentLanguage === 'kn'
                    ? 'ಕರ್ನಾಟಕ ಡಿಜಿಲಾಕರ್ / ಆಧಾರ್ ಮೊಬೈಲ್ ಮೂಲಕ ಸುರಕ್ಷಿತ ಲಾಗಿನ್'
                    : 'Fast & Secure Citizen Sign In via DigiLocker / Aadhaar mobile'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  {getUIString(currentLanguage, 'enterPhone')}
                </label>
                <div className="flex items-center rounded-xl border border-neutral-800 bg-neutral-900/90 focus-within:border-teal-500 px-3 py-2 text-sm">
                  <span className="text-neutral-400 font-mono text-xs mr-2 border-r border-neutral-700 pr-2">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="98450 82190"
                    disabled={isOtpSent}
                    className="bg-transparent text-white focus:outline-none w-full font-mono text-sm"
                  />
                  {phoneNumber.length === 10 && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
                  )}
                </div>
              </div>

              {isOtpSent && (
                <div className="space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-neutral-300">
                      {getUIString(currentLanguage, 'enterOtp')}
                    </label>
                    <span className="text-[11px] text-emerald-400 font-mono">
                      {getUIString(currentLanguage, 'demoOtpHint')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="2026"
                      className="rounded-xl border border-teal-500/50 bg-neutral-900/90 px-3 py-2 text-white font-mono tracking-widest text-center text-lg w-32 focus:outline-none focus:border-teal-400"
                    />
                    <button
                      type="button"
                      onClick={() => setOtpCode('2026')}
                      className="text-xs px-2.5 py-1.5 rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 transition border border-teal-500/30"
                    >
                      Auto-fill 2026
                    </button>
                  </div>
                </div>
              )}

              {otpError && (
                <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              <div className="pt-2 flex items-center gap-2">
                {!isOtpSent ? (
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition shadow-lg shadow-teal-900/40 flex items-center justify-center gap-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>{getUIString(currentLanguage, 'sendOtp')}</span>
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>{getUIString(currentLanguage, 'verifyAndLogin')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOtpSent(false)}
                      className="px-3 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 text-xs hover:bg-neutral-700"
                    >
                      Change Number
                    </button>
                  </>
                )}
              </div>
            </form>
          )}

          {/* TAB 3: OFFICIAL BBMP / MUNICIPAL LOGIN */}
          {activeTab === 'official' && (
            <form onSubmit={handleOfficialLogin} className="space-y-3.5">
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
                <Shield className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  {currentLanguage === 'kn'
                    ? 'ಸರ್ಕಾರಿ ಇಲಾಖಾ ಸಿಬ್ಬಂದಿ ಮತ್ತು ಎಂಜಿನಿಯರ್‌ಗಳಿಗಾಗಿ ಅಧಿಕೃತ ಪ್ರವೇಶ'
                    : 'Restricted Portal for BBMP Engineers, Ward Inspectors & Admin Officers'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Official Email / Gov ID
                </label>
                <div className="flex items-center rounded-xl border border-neutral-800 bg-neutral-900/90 focus-within:border-amber-500 px-3 py-2 text-sm">
                  <input
                    type="email"
                    value={officialEmail}
                    onChange={(e) => setOfficialEmail(e.target.value)}
                    placeholder="priya.sharma@bbmp.gov.in"
                    className="bg-transparent text-white focus:outline-none w-full text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Staff ID
                  </label>
                  <input
                    type="text"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    placeholder="BBMP-ENG-2024-884"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Access PIN / Password
                  </label>
                  <input
                    type="password"
                    value={officialPassword}
                    onChange={(e) => setOfficialPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="BBMP Road Infrastructure & Rapid Asphalt Response">
                    BBMP Road Infrastructure & Rapid Asphalt Response
                  </option>
                  <option value="BWSSB Water & Drainage Emergency Service">
                    BWSSB Water & Drainage Emergency Service
                  </option>
                  <option value="BESCOM Electrical & Street Lighting">
                    BESCOM Electrical & Street Lighting
                  </option>
                  <option value="BBMP Solid Waste & Sanitation">
                    BBMP Solid Waste & Sanitation
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold text-xs transition shadow-lg shadow-amber-900/40 flex items-center justify-center gap-2 mt-2"
              >
                <Briefcase className="w-4 h-4 text-neutral-950" />
                <span>Sign In to Municipal Field Console</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-neutral-800/80 bg-neutral-900/60 flex items-center justify-between text-[11px] text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit Encrypted Session</span>
          </div>
          <span>Astra Civic Standards · v2.4</span>
        </div>
      </div>
    </div>
  );
};
