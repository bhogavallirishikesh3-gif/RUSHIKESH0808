import React, { useState, useEffect } from 'react';
import {
  Camera,
  MapPin,
  Send,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ThumbsUp,
  Sparkles,
  RefreshCw,
  Info,
  Globe,
  Mic,
  Volume2,
  VolumeX,
  Check,
  HelpCircle,
  Eye,
  ChevronRight,
  Flame,
  Leaf,
  Trees,
  Wind,
  Award,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import cleanCommunityImg from '../assets/images/clean_community_nature_1793345107058.jpg';
import ecoCityImg from '../assets/images/eco_environment_bg_1793345092234.jpg';
import { CivicIssue, IssueCategory, IssueStatus } from '../types';
import { UserProfile } from '../types/auth';
import { CameraCaptureModal } from './CameraCaptureModal';
import { AudioRecorderPlayer } from './AudioRecorderPlayer';
import { SAMPLE_HAZARD_PHOTOS } from '../data/mockData';
import {
  LanguageCode,
  SUPPORTED_LANGUAGES,
  DISTRICT_PRESETS,
  UI_STRINGS,
  getUIString,
  translateCategory,
  translateStatus,
  translateUrgency,
} from '../utils/i18n';

interface CitizenPortalProps {
  issues: CivicIssue[];
  onNewIssueSubmitted: (newIssue: CivicIssue) => void;
  onUpvoteIssue: (issueId: string) => void;
  selectedIssueId?: string;
  onSelectIssue?: (id: string) => void;
  currentLanguage?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
  currentUser?: UserProfile | null;
  onOpenLogin?: () => void;
}


// Visual category cards tailored for non-educated & low-literacy users
const VISUAL_CATEGORIES = [
  {
    id: 'pothole',
    category: 'Pothole & Road Hazard' as IssueCategory,
    emoji: '🕳️',
    colorBorder: 'border-amber-500/60',
    colorBg: 'bg-amber-500/10 hover:bg-amber-500/20',
    colorText: 'text-amber-300',
    label: {
      kn: 'ರಸ್ತೆ ಗುಂಡಿ',
      en: 'Road Pothole',
      hi: 'सड़क का गड्ढा',
      te: 'రోడ్డు గుంత',
      es: 'Bache en Calle',
    },
    defaultTitle: {
      kn: 'ರಸ್ತೆ ಗುಂಡಿ ಬಿದ್ದಿದೆ - ವಾಹನ ಸವಾರರಿಗೆ ತೊಂದರೆ',
      en: 'Dangerous pothole on public street crosswalk',
      hi: 'सड़क पर गहरा गड्ढा है - दुर्घटना का खतरा',
      te: 'రోడ్డుపై పెద్ద గుంత ఉంది - ప్రమాదం',
      es: 'Bache peligroso en la calzada',
    },
    samplePhotoIndex: 0,
  },
  {
    id: 'water',
    category: 'Water & Drainage' as IssueCategory,
    emoji: '💧',
    colorBorder: 'border-cyan-500/60',
    colorBg: 'bg-cyan-500/10 hover:bg-cyan-500/20',
    colorText: 'text-cyan-300',
    label: {
      kn: 'ನೀರು ಸೋರಿಕೆ / ಪೈಪ್',
      en: 'Water Leak / Pipe',
      hi: 'पानी का पाइप रिसाव',
      te: 'నీటి పైపు లీకేజీ',
      es: 'Fuga de Agua / Tubería',
    },
    defaultTitle: {
      kn: 'ಮುಖ್ಯ ನೀರಿನ ಪೈಪ್ ಹೊಡೆದಿದೆ - ನೀರು ಪೋಲಾಗುತ್ತಿದೆ',
      en: 'Water main pipe rupture causing street flooding',
      hi: 'पानी का पाइप फटा - सड़क पर पानी बह रहा है',
      te: 'నీటి పైపు పగిలి రోడ్డుపై నీరు కారుతోంది',
      es: 'Ruptura de tubería de agua en vía pública',
    },
    samplePhotoIndex: 1,
  },
  {
    id: 'light',
    category: 'Electrical & Lighting' as IssueCategory,
    emoji: '💡',
    colorBorder: 'border-yellow-500/60',
    colorBg: 'bg-yellow-500/10 hover:bg-yellow-500/20',
    colorText: 'text-yellow-300',
    label: {
      kn: 'ಕತ್ತಲೆ / ಬೀದಿ ದೀಪ',
      en: 'Broken Streetlight',
      hi: 'खराब स्ट्रीटलाइट / अंधेरा',
      te: 'వీధి దీపం వెలగడం లేదు',
      es: 'Farola Rota / Oscuro',
    },
    defaultTitle: {
      kn: 'ಬೀದಿ ದೀಪ ಕೆಟ್ಟಿದೆ - ರಾತ್ರಿ ವೇಳೆ ಸಂಪೂರ್ಣ ಕತ್ತಲೆ',
      en: 'Streetlight outage creating dark hazardous pedestrian area',
      hi: 'स्ट्रीटलाइट बंद होने से अंधेरा है',
      te: 'వీధి దీపం వెలగడం లేదు - చీకటిగా ఉంది',
      es: 'Farola apagada creando peligro nocturno',
    },
    samplePhotoIndex: 2,
  },
  {
    id: 'garbage',
    category: 'Waste & Sanitation' as IssueCategory,
    emoji: '🗑️',
    colorBorder: 'border-emerald-500/60',
    colorBg: 'bg-emerald-500/10 hover:bg-emerald-500/20',
    colorText: 'text-emerald-300',
    label: {
      kn: 'ಕಸದ ರಾಶಿ / ಗಲೀಜು',
      en: 'Garbage Dump & Waste',
      hi: 'कचरे का ढेर / गंदगी',
      te: 'చెత్త కుప్ప / మురికి',
      es: 'Basura Acumulada',
    },
    defaultTitle: {
      kn: 'ರಸ್ತೆ ಬದಿಯಲ್ಲಿ ಕಸದ ರಾಶಿ ಬಿದ್ದಿದೆ - ದುರ್ನಾತ',
      en: 'Garbage dump accumulation and sanitation concern',
      hi: 'सड़क किनारे भारी कचरा जमा है',
      te: 'రోడ్డు పక్కన చెత్త పేరుకుపోయింది',
      es: 'Acumulación de basura en la vía pública',
    },
    samplePhotoIndex: 0,
  },
  {
    id: 'electric',
    category: 'Electrical & Lighting' as IssueCategory,
    emoji: '⚡',
    colorBorder: 'border-red-500/60',
    colorBg: 'bg-red-500/10 hover:bg-red-500/20',
    colorText: 'text-red-300',
    label: {
      kn: 'ಕರೆಂಟ್ ತಂತಿ ಅಪಾಯ',
      en: 'Electric Wire Hazard',
      hi: 'बिजली का तार खतरा',
      te: 'కరెంట్ తీగల ప్రమాదం',
      es: 'Cables Eléctricos Peligrosos',
    },
    defaultTitle: {
      kn: 'ವಿದ್ಯುತ್ ತಂತಿ ಜೋತುಬಿದ್ದಿದೆ - ತಕ್ಷಣ ರಿಪೇರಿ ಮಾಡಿ',
      en: 'Exposed hanging electric wire hazard',
      hi: 'बिजली का नंगा तार लटका है - बड़ा खतरा',
      te: 'విద్యుత్ తీగ కిందకి వేలాడుతోంది',
      es: 'Cable eléctrico suelto con riesgo inminente',
    },
    samplePhotoIndex: 2,
  },
  {
    id: 'drain',
    category: 'Water & Drainage' as IssueCategory,
    emoji: '🌳',
    colorBorder: 'border-teal-500/60',
    colorBg: 'bg-teal-500/10 hover:bg-teal-500/20',
    colorText: 'text-teal-300',
    label: {
      kn: 'ಚರಂಡಿ ಬ್ಲಾಕ್ / ಮರ',
      en: 'Blocked Drain / Tree',
      hi: 'बंद नाला / गिरा पेड़',
      te: 'కాలువ పూడిక / చెట్టు కూలడం',
      es: 'Drenaje Tapado / Árbol',
    },
    defaultTitle: {
      kn: 'ಚರಂಡಿ ಕಟ್ಟಿಕೊಂಡಿದೆ ಅಥವಾ ಮರ ಬಿದ್ದು ರಸ್ತೆ ಬಂದ್ ಆಗಿದೆ',
      en: 'Blocked drain and road obstruction',
      hi: 'नाला जाम होने से पानी भर गया है',
      te: 'కాలువ మూసుకుపోయి రోడ్డుపై నీరు ఆగింది',
      es: 'Drenaje tapado y ramas caídas en vía',
    },
    samplePhotoIndex: 1,
  },
];

// Visual landmark presets
const VISUAL_LANDMARKS = [
  { id: 'school', emoji: '🏫', labelKey: 'nearSchool', fallback: 'Near School Crossing' },
  { id: 'bus', emoji: '🚌', labelKey: 'nearBusStand', fallback: 'Bus Stand & Terminal' },
  { id: 'hospital', emoji: '🏥', labelKey: 'nearHospital', fallback: 'Near Hospital & Clinic' },
  { id: 'market', emoji: '🛒', labelKey: 'nearMarket', fallback: 'Market & Commercial Area' },
  { id: 'homes', emoji: '🏠', labelKey: 'nearHomes', fallback: 'Residential Neighborhood' },
];

const STEP_ITEMS = [
  {
    step: 1,
    title: { kn: 'ಸಮಸ್ಯೆ ಆಯ್ಕೆ', en: '1. Pick Hazard', hi: '1. समस्या चुनें', te: '1. సమస్య ఎంపిక', es: '1. Problema' },
    icon: '🕳️',
    desc: { kn: 'ಗುಂಡಿ, ನೀರು, ಕಸ, ದೀಪ', en: 'Pothole, Waste, Pipe, Wire', hi: 'गड्ढा, पानी, कचरा', te: 'గుంత, నీరు, చెత్త', es: 'Bache, Agua, Basura' },
  },
  {
    step: 2,
    title: { kn: 'ಫೋಟೋ ಪುರಾವೆ', en: '2. Take Photo', hi: '2. फोटो लें', te: '2. ఫోటో తీయండి', es: '2. Foto' },
    icon: '📸',
    desc: { kn: 'ಕ್ಯಾಮೆರಾ ಅಥವಾ ಚಿತ್ರ', en: 'Live camera or sample', hi: 'कैमरा या तस्वीर', te: 'కెమెరా చిత్రం', es: 'Cámara en vivo' },
  },
  {
    step: 3,
    title: { kn: 'ಧ್ವನಿ / ಸ್ಥಳ', en: '3. Voice & Place', hi: '3. आवाज / स्थान', te: '3. వాయిಸ್ / స్థలం', es: '3. Voz / Lugar' },
    icon: '🎙️',
    desc: { kn: 'ಮಾತನಾಡಿ & ಗುರುತು ಆರಿಸಿ', en: 'Speak & tap landmark', hi: 'बोलें और पहचानें', te: 'మాట్లాడండి', es: 'Grabar audio' },
  },
  {
    step: 4,
    title: { kn: 'AI ಸಲ್ಲಿಕೆ', en: '4. AI Triage', hi: '4. एआई समाधान', te: '4. ఏఐ పరిష్కారం', es: '4. Enviar' },
    icon: '⚡',
    desc: { kn: 'ಪರಿಶೀಲಿಸಿ ಕಳುಹಿಸಿ', en: 'Instant triage & dispatch', hi: 'जांचें और भेजें', te: 'తక్షణ చర్య', es: 'Despacho rápido' },
  },
];

export const CitizenPortal: React.FC<CitizenPortalProps> = ({
  issues,
  onNewIssueSubmitted,
  onUpvoteIssue,
  selectedIssueId,
  onSelectIssue,
  currentLanguage = 'en',
  onLanguageChange,
  currentUser,
  onOpenLogin,
}) => {

  const [activeTab, setActiveTab] = useState<'report' | 'track'>('report');
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Accessible Easy Mode (on by default for maximum inclusivity)
  const [isEasyMode, setIsEasyMode] = useState(true);
  const [isSpeakingGuide, setIsSpeakingGuide] = useState(false);
  const [currentReportingStep, setCurrentReportingStep] = useState<number>(1);
  const [selectedVisualCatId, setSelectedVisualCatId] = useState<string>('pothole');
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string>('school');

  // Language state
  const [localLang, setLocalLang] = useState<LanguageCode>(currentLanguage);
  const activeLang = onLanguageChange ? currentLanguage : localLang;
  const setLang = (lang: LanguageCode) => {
    setLocalLang(lang);
    onLanguageChange?.(lang);
  };
  const strings = UI_STRINGS[activeLang] || UI_STRINGS.en;
  const districtPresets = DISTRICT_PRESETS[activeLang] || DISTRICT_PRESETS.en;

  // Form states
  const [photoUrl, setPhotoUrl] = useState<string | null>(SAMPLE_HAZARD_PHOTOS[0].dataUrl);
  const [photoSource, setPhotoSource] = useState<'camera' | 'upload' | 'sample'>('sample');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [title, setTitle] = useState(
    activeLang === 'kn'
      ? 'ರಸ್ತೆ ಗುಂಡಿ ಬಿದ್ದಿದೆ - ವಾಹನ ಸವಾರರಿಗೆ ತೊಂದರೆ'
      : 'Dangerous pothole on public street crosswalk'
  );
  const [description, setDescription] = useState(
    activeLang === 'kn'
      ? 'ಶಾಲೆಯ ಮುಂಭಾಗದ ರಸ್ತೆಯಲ್ಲಿ ದೊಡ್ಡ ಗುಂಡಿ ಬಿದ್ದಿದ್ದು ದ್ವಿಚಕ್ರ ವಾಹನ ಸವಾರರಿಗೆ ಮತ್ತು ಪಾದಚಾರಿಗಳಿಗೆ ತೊಂದರೆಯಾಗುತ್ತಿದೆ.'
      : 'Deep crater on the crosswalk lane causing severe hazards.'
  );
  const [category, setCategory] = useState<IssueCategory>('Pothole & Road Hazard');
  const [address, setAddress] = useState(districtPresets[0]?.addressSample || '412 Maplewood Ave, North Central');
  const [selectedDistrict, setSelectedDistrict] = useState(districtPresets[0]?.name || 'District 3 - Education Hub');
  const [nearSensitiveZone, setNearSensitiveZone] = useState(districtPresets[0]?.sensitiveZone || 'Lincoln Elementary School (45m)');
  const [reporterName, setReporterName] = useState('Citizen Reporter');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live AI Typing Analysis state
  const [isAnalyzingTyping, setIsAnalyzingTyping] = useState(false);
  const [liveAIPreview, setLiveAIPreview] = useState<{
    detectedCategory: IssueCategory;
    priorityScore: number;
    safetyRisk: boolean;
    safetyReason: string;
    detectedObjects: string[];
    potentialDuplicates: CivicIssue[];
  } | null>(null);

  // Selected issue for timeline tracking
  const [trackingIssue, setTrackingIssue] = useState<CivicIssue | null>(null);

  useEffect(() => {
    if (selectedIssueId) {
      const match = issues.find((i) => i.id === selectedIssueId);
      if (match) {
        setTrackingIssue(match);
        setActiveTab('track');
      }
    } else if (issues.length > 0 && !trackingIssue) {
      setTrackingIssue(issues[0]);
    }
  }, [selectedIssueId, issues]);

  // Sync reporter name when user profile changes
  useEffect(() => {
    if (currentUser?.name) {
      setReporterName(currentUser.name);
    }
  }, [currentUser]);

  // Update default text when active language changes

  useEffect(() => {
    const selectedCat = VISUAL_CATEGORIES.find((c) => c.id === selectedVisualCatId) || VISUAL_CATEGORIES[0];
    const newTitle = (selectedCat.defaultTitle as any)[activeLang] || selectedCat.defaultTitle.en;
    setTitle(newTitle);
  }, [activeLang]);

  // Audio Voice Narrator Guide
  const toggleVoiceGuide = () => {
    if (!window.speechSynthesis) return;
    if (isSpeakingGuide) {
      window.speechSynthesis.cancel();
      setIsSpeakingGuide(false);
      return;
    }

    window.speechSynthesis.cancel();
    const script = getUIString(activeLang, 'voiceGuideScript');
    const utterance = new SpeechSynthesisUtterance(script);
    const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === activeLang) || SUPPORTED_LANGUAGES[0];
    utterance.lang = langObj.speechLang;
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeakingGuide(false);
    utterance.onerror = () => setIsSpeakingGuide(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeakingGuide(true);
  };

  // Speak Current Status Audio
  const playStatusAudio = (issue: CivicIssue) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    let text = '';
    if (activeLang === 'kn') {
      text = `ದೂರು ಸಂಖ್ಯೆ ${issue.id}. ಸಮಸ್ಯೆ: ${translateCategory(issue.category, 'kn')}. ಸ್ಥಿತಿ: ${translateStatus(issue.status, 'kn')}. ${issue.aiAnalysis.aiSummary}`;
    } else {
      text = `Ticket ${issue.id}. Category: ${issue.category}. Status: ${issue.status}. ${issue.aiAnalysis.aiSummary}`;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === activeLang) || SUPPORTED_LANGUAGES[0];
    utterance.lang = langObj.speechLang;
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Select Visual Picture Category
  const handleSelectVisualCategory = (cat: typeof VISUAL_CATEGORIES[0]) => {
    setSelectedVisualCatId(cat.id);
    setCategory(cat.category);
    setCurrentReportingStep(2);
    const localizedTitle = (cat.defaultTitle as any)[activeLang] || cat.defaultTitle.en;
    setTitle(localizedTitle);

    // If user hasn't uploaded custom photo, load appropriate sample photo
    const sample = SAMPLE_HAZARD_PHOTOS[cat.samplePhotoIndex] || SAMPLE_HAZARD_PHOTOS[0];
    if (photoSource === 'sample' || !photoUrl) {
      setPhotoUrl(sample.dataUrl);
      setPhotoSource('sample');
    }

    // Optional audio confirmation
    if (window.speechSynthesis) {
      const speechLabel = (cat.label as any)[activeLang] || cat.label.en;
      const confText = activeLang === 'kn' ? `${speechLabel} ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ.` : `${speechLabel} selected.`;
      const utterance = new SpeechSynthesisUtterance(confText);
      const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === activeLang) || SUPPORTED_LANGUAGES[0];
      utterance.lang = langObj.speechLang;
      utterance.rate = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Select Visual Landmark
  const handleSelectLandmark = (landmark: typeof VISUAL_LANDMARKS[0]) => {
    setSelectedLandmarkId(landmark.id);
    const landmarkLabel = getUIString(activeLang, landmark.labelKey);
    setNearSensitiveZone(`${landmarkLabel} (${landmark.id === 'school' ? '45m' : '30m'})`);
  };

  // Live NLP typing analysis debounce
  useEffect(() => {
    if (title.length < 3 && description.length < 5) {
      setLiveAIPreview(null);
      return;
    }

    const timer = setTimeout(() => {
      setIsAnalyzingTyping(true);
      const text = `${title} ${description}`.toLowerCase();

      // Check duplicates against existing issues
      const matchingDuplicates = issues.filter((iss) => {
        const issText = `${iss.title} ${iss.description}`.toLowerCase();
        const sharedWords = text.split(' ').filter((w) => w.length > 4 && issText.includes(w));
        return sharedWords.length >= 2 || (iss.location.address.includes('Maplewood') && address.includes('Maplewood'));
      });

      let score = 50;
      let detectedCat: IssueCategory = category;
      let safetyRisk = false;
      let reason = 'General municipal infrastructure report.';
      let objects = ['surface wear'];

      if (text.includes('pothole') || text.includes('crater') || text.includes('road') || text.includes('ಗುಂಡಿ')) {
        detectedCat = 'Pothole & Road Hazard';
        score = 65;
        objects = ['asphalt void', 'aggregate displacement'];
      } else if (text.includes('water') || text.includes('burst') || text.includes('pipe') || text.includes('ನೀರು') || text.includes('ಸೋರಿಕೆ')) {
        detectedCat = 'Water & Drainage';
        score = 82;
        objects = ['pressurized fluid', 'pavement buckling'];
      } else if (text.includes('wire') || text.includes('spark') || text.includes('electric') || text.includes('light') || text.includes('ವಿದ್ಯುತ್') || text.includes('ದೀಪ')) {
        detectedCat = 'Electrical & Lighting';
        score = 90;
        objects = ['exposed wiring', 'conduit fracture'];
      }

      if (text.includes('school') || nearSensitiveZone.includes('School') || nearSensitiveZone.includes('ಶಾಲೆ')) {
        score = Math.min(100, score + 28);
        safetyRisk = true;
        reason = activeLang === 'kn' ? 'ಶಾಲಾ ವಲಯದ ಸಾಮೀಪ್ಯದಿಂದಾಗಿ ಪಾದಚಾರಿ ಅಪಾಯ ಹೆಚ್ಚಾಗಿದೆ.' : 'Proximity to school zone elevates pedestrian accident risk.';
      }

      setLiveAIPreview({
        detectedCategory: detectedCat,
        priorityScore: score,
        safetyRisk,
        safetyReason: reason,
        detectedObjects: objects,
        potentialDuplicates: matchingDuplicates,
      });
      setIsAnalyzingTyping(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [title, description, category, address, nearSensitiveZone, issues, activeLang]);

  const handlePhotoCaptured = (dataUrl: string, source: 'camera' | 'upload' | 'sample', meta?: any) => {
    setPhotoUrl(dataUrl);
    setPhotoSource(source);
    setCurrentReportingStep(3);
    if (meta) {
      if (meta.title) setTitle(meta.title);
      if (meta.description) setDescription(meta.description);
      if (meta.category) setCategory(meta.category);
      if (meta.address) setAddress(meta.address);
      if (meta.nearSensitiveZone) setNearSensitiveZone(meta.nearSensitiveZone);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title && !category) return;

    setIsSubmitting(true);

    try {
      // Call server-side /api/analyze-issue
      const res = await fetch('/api/analyze-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || `${category} reported`,
          description: description || 'Visual hazard captured via citizen interface.',
          categoryHint: category,
          location: {
            address,
            district: selectedDistrict,
            nearSensitiveZone,
          },
          photoBase64: photoUrl,
        }),
      });

      const data = await res.json();
      const ai = data.analysis;

      const newId = `DAM-${Math.floor(1000 + Math.random() * 9000)}`;

      const newIssue: CivicIssue = {
        id: newId,
        title: title || `${category} Incident`,
        description: description || 'Citizen reported municipal defect.',
        category: ai.category || category,
        status: 'AI Triaged',
        urgency: ai.urgency || (ai.priorityScore > 80 ? 'Critical' : 'High'),
        priorityScore: ai.priorityScore || 85,
        safetyRisk: ai.safetyRisk !== undefined ? ai.safetyRisk : true,
        photoUrl: photoUrl || SAMPLE_HAZARD_PHOTOS[0].dataUrl,
        photoSource,
        audioUrl: audioUrl || undefined,
        language: activeLang,
        location: {
          lat: 37.7749 + (Math.random() - 0.5) * 0.005,
          lng: -122.4194 + (Math.random() - 0.5) * 0.005,
          address,
          district: selectedDistrict,
          nearSensitiveZone,
        },
        submittedAt: activeLang === 'kn' ? 'ಈಗಷ್ಟೇ' : 'Just now',
        updatedAt: activeLang === 'kn' ? 'ಈಗಷ್ಟೇ' : 'Just now',
        reporter: {
          name: reporterName || 'Citizen Reporter',
          isAnonymous: false,
        },
        upvotes: 1,
        aiAnalysis: {
          category: ai.category || category,
          priorityScore: ai.priorityScore || 85,
          urgency: ai.urgency || 'Critical',
          safetyRisk: ai.safetyRisk || true,
          safetyRiskReason: ai.safetyRiskReason || 'Evaluated for public hazard level.',
          department: ai.department || 'Department of Transportation',
          suggestedCrew: ai.suggestedCrew || 'Rapid Asphalt Unit',
          estimatedResolutionHours: ai.estimatedResolutionHours || 12,
          detectedObjects: ai.detectedObjects || ['infrastructure defect'],
          confidence: ai.confidence || 0.94,
          aiSummary:
            activeLang === 'kn'
              ? 'ದೂರು ಯಶಸ್ವಿಯಾಗಿ ತಲುಪಿದೆ, AI ಪರಿಶೀಲನೆ ನಡೆಸಿದೆ ಮತ್ತು ಸಂಬಂಧಪಟ್ಟ ಇಲಾಖೆಗೆ ರವಾನಿಸಲಾಗಿದೆ.'
              : ai.aiSummary || 'Issue received, triaged by AI, and routed to public works.',
          recommendedEquipment: ai.recommendedEquipment || ['Safety Cones', 'Patch Kit'],
          duplicateClusterId: liveAIPreview?.potentialDuplicates.length ? 'cluster-alpha' : undefined,
          duplicateSimilarity: liveAIPreview?.potentialDuplicates.length ? 0.88 : undefined,
        },
        timeline: [
          {
            id: `tl-${Date.now()}-1`,
            status: 'Reported',
            timestamp: activeLang === 'kn' ? 'ಈಗಷ್ಟೇ' : 'Just now',
            title:
              activeLang === 'kn'
                ? audioUrl
                  ? 'ಫೋಟೋ ಮತ್ತು ಧ್ವನಿ ರೆಕಾರ್ಡಿಂಗ್‌ನೊಂದಿಗೆ ದೂರು ದಾಖಲಾಗಿದೆ'
                  : 'ಕ್ಯಾಮೆರಾ ಫೋಟೋದೊಂದಿಗೆ ದೂರು ದಾಖಲಾಗಿದೆ'
                : audioUrl
                ? 'Issue Lodged with Camera Photo & Voice Note'
                : 'Issue Lodged via Citizen Camera',
            description: `${address} - ${nearSensitiveZone}`,
            actor: activeLang === 'kn' ? 'DamGo ಮೊಬೈಲ್ ಪೋರ್ಟಲ್' : 'Citizen Mobile App',
            badge: audioUrl ? (activeLang === 'kn' ? 'ಧ್ವನಿ ಲಗತ್ತಿಸಲಾಗಿದೆ' : 'Voice Attached') : undefined,
          },
          {
            id: `tl-${Date.now()}-2`,
            status: 'AI Triaged',
            timestamp: activeLang === 'kn' ? 'ಈಗಷ್ಟೇ' : 'Just now',
            title:
              activeLang === 'kn'
                ? `AI ಪರಿಶೀಲನಾ ಸ್ಕೋರ್: ${ai.priorityScore || 85}/100`
                : `AI Multimodal Triage Score: ${ai.priorityScore || 85}/100`,
            description:
              activeLang === 'kn'
                ? 'ಸುರಕ್ಷತಾ ಅಪಾಯವನ್ನು ಗುರುತಿಸಲಾಗಿದೆ. ತುರ್ತು ದುರಸ್ತಿ ತಂಡಕ್ಕೆ ಕಳುಹಿಸಲಾಗಿದೆ.'
                : `${ai.safetyRisk ? 'Safety Risk Confirmed. ' : ''}${ai.aiSummary}`,
            actor: 'DamGo AI Core',
            badge: `Department: ${ai.department || 'Transportation'}`,
          },
        ],
      };

      onNewIssueSubmitted(newIssue);
      setTrackingIssue(newIssue);
      setActiveTab('track');
      setAudioUrl(null);

      // Celebration feedback
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {}

      // Play audio confirmation
      if (window.speechSynthesis) {
        const confSpeech =
          activeLang === 'kn'
            ? 'ನಿಮ್ಮ ದೂರು ಯಶಸ್ವಿಯಾಗಿ ತಲುಪಿದೆ! ಧನ್ಯವಾದಗಳು.'
            : 'Your report was submitted successfully! Help is on the way.';
        const utterance = new SpeechSynthesisUtterance(confSpeech);
        const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === activeLang) || SUPPORTED_LANGUAGES[0];
        utterance.lang = langObj.speechLang;
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.error('Submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* 1. ENVIRONMENTAL HERO BANNER WITH NATURE PICTURE & CREATIVE ANIMATIONS */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-neutral-950/80 backdrop-blur-xl group">
        {/* Background Environmental Picture Layer with gentle zoom on hover */}
        <div
          className="h-48 sm:h-56 w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 relative"
          style={{ backgroundImage: `url(${cleanCommunityImg})` }}
        >
          {/* Green-tinted gradient overlays for text contrast and eco atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/40 to-transparent" />

          {/* Floating animated eco leaf & shimmer */}
          <div className="absolute top-4 right-5 flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-emerald-300 text-xs font-black backdrop-blur-md animate-eco-glow shadow-lg">
              <Leaf className="w-3.5 h-3.5 text-emerald-400 animate-float-slow" />
              <span>{activeLang === 'kn' ? 'ಸ್ವಚ್ಛ & ಹಸಿರು ನಗರ ಮಿಷನ್' : 'Clean & Green City Mission'}</span>
            </span>
          </div>

          <div className="absolute top-4 left-5 flex items-center gap-2 text-xs font-bold text-white/90 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
            <Trees className="w-3.5 h-3.5 text-emerald-400" />
            <span>{activeLang === 'kn' ? 'ಪರಿಸರ ರಕ್ಷಣೆ ನಮ್ಮ ಜವಾಬ್ದಾರಿ' : 'Protecting Our Community & Environment'}</span>
          </div>
        </div>

        {/* Hero Overlay Controls and Title */}
        <div className="p-5 sm:p-6 bg-neutral-950/90 backdrop-blur-md flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-10 relative z-10 mx-3 sm:mx-4 mb-4 rounded-2xl border border-emerald-500/20 shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {getUIString(activeLang, 'citizenPortal')}
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                {activeLang === 'kn' ? 'ಕನ್ನಡದಲ್ಲಿ ತ್ವರಿತ ಪರಿಸರ ಹಾಗೂ ನಾಗರಿಕ ಸೇವೆ' : 'DamGo Rapid Civic & Eco Action'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{getUIString(activeLang, 'reportTitle')}</span>
            </h1>
            <p className="text-xs text-neutral-300 max-w-xl mt-1">
              {activeLang === 'kn'
                ? 'ನಿಮ್ಮ ಪರಿಸರ ಹಾಗೂ ರಸ್ತೆ ಸಮಸ್ಯೆಗಳನ್ನು ಸುಲಭವಾಗಿ ಹಂತ-ಹಂತವಾಗಿ ನೇರವಾಗಿ ನಗರ ಆಡಳಿತಕ್ಕೆ ತಲುಪಿಸಿ.'
                : 'Report potholes, broken streetlights, water leaks, and garbage step-by-step with real photos and voice.'}
            </p>
          </div>

          {/* Mode Switcher & Audio Narration */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Audio Instructions Guide Button */}
            <button
              type="button"
              onClick={toggleVoiceGuide}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition shadow-sm ${
                isSpeakingGuide
                  ? 'bg-amber-500 text-black border-amber-400 animate-pulse'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
              }`}
              title="Listen to step-by-step instructions out loud"
            >
              {isSpeakingGuide ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{getUIString(activeLang, 'voiceGuideButton')}</span>
            </button>

            {/* Easy Mode Toggle Pill */}
            <button
              type="button"
              onClick={() => setIsEasyMode(!isEasyMode)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                isEasyMode
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400/30'
                  : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
              }`}
              title="Toggle Easy Visual & Voice Mode for Non-Educated Citizens"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isEasyMode ? getUIString(activeLang, 'modeSimple') : getUIString(activeLang, 'modeDetailed')}</span>
            </button>

            {/* Tab buttons: Report vs Track */}
            <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800">
              <button
                onClick={() => setActiveTab('report')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  activeTab === 'report' ? 'bg-emerald-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{getUIString(activeLang, 'quickReport')}</span>
              </button>
              <button
                onClick={() => setActiveTab('track')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  activeTab === 'track' ? 'bg-emerald-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {getUIString(activeLang, 'liveTracker')} ({issues.length})
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Citizen Authentication & Civic Rewards Status Capsule */}
      {currentUser ? (
        <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-emerald-500/25 flex flex-wrap items-center justify-between gap-3 shadow-lg shadow-black/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-xl shadow-inner shrink-0">
              {currentUser.avatarEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-white text-xs">{currentUser.name}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {currentUser.ward}
                </span>
                {currentUser.isVerified && (
                  <span className="text-[10px] text-teal-300 flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span className="hidden sm:inline">DigiLocker</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                {activeLang === 'kn'
                  ? 'ಲಾಗಿನ್ ಆಗಿದ್ದೀರಿ · ಪ್ರತಿ ವರದಿಯು 50 ನಾಗರಿಕ ಅಂಕಗಳನ್ನು ನೀಡುತ್ತದೆ'
                  : 'Authenticated · Submitting road hazards awards +50 Civic Impact Points to your ward profile'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-300 font-bold text-xs">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentUser.civicScore} {getUIString(activeLang, 'civicPoints')}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-800 flex flex-wrap items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5 text-xs text-neutral-300">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {activeLang === 'kn'
                ? 'ನಾಗರಿಕ ಅಂಕಗಳನ್ನು ಗಳಿಸಲು, ಬ್ಯಾಡ್ಜ್‌ಗಳನ್ನು ಪಡೆಯಲು ಮತ್ತು ನಿಮ್ಮ ದೂರುಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಲಾಗಿನ್ ಮಾಡಿ'
                : 'Sign in to earn Civic Impact Points, collect community badges, and track your reported road repairs'}
            </span>
          </div>
          {onOpenLogin && (
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600/30 to-teal-600/30 hover:from-emerald-600/50 hover:to-teal-600/50 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-bold transition shadow-sm"
            >
              {getUIString(activeLang, 'login')}
            </button>
          )}
        </div>
      )}

      {/* 2. CREATIVE ANIMATED STEP-BY-STEP PROGRESS STEPPER */}
      {activeTab === 'report' && (

        <div className="eco-glass-card rounded-2xl p-4 sm:p-5 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-emerald-500/20 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-500 text-neutral-950 flex items-center justify-center text-xs font-black shadow-md">
                ✓
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <span>{activeLang === 'kn' ? 'ಹಂತ-ಹಂತದ ಸುಲಭ ಪ್ರಕ್ರಿಯೆ' : 'Step-by-Step Reporting Guide'}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    {activeLang === 'kn' ? '4 ಹಂತಗಳು' : '4 Simple Steps'}
                  </span>
                </h3>
                <p className="text-[11px] text-neutral-400">
                  {activeLang === 'kn' ? 'ಯಾವುದೇ ಹಂತವನ್ನು ಮುಟ್ಟಿ ನೇರವಾಗಿ ಆಯ್ಕೆ ಮಾಡಿ' : 'Tap any step to jump or follow sequentially'}
                </p>
              </div>
            </div>

            {/* Step navigation buttons */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setCurrentReportingStep((prev) => Math.max(1, prev - 1))}
                disabled={currentReportingStep === 1}
                className="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-bold text-neutral-300 disabled:opacity-30 hover:bg-neutral-800 transition flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{activeLang === 'kn' ? 'ಹಿಂದೆ' : 'Back'}</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentReportingStep((prev) => Math.min(4, prev + 1))}
                disabled={currentReportingStep === 4}
                className="px-3 py-1 rounded-lg bg-emerald-600 border border-emerald-500 text-xs font-bold text-white disabled:opacity-30 hover:bg-emerald-500 transition flex items-center gap-1 shadow"
              >
                <span>{activeLang === 'kn' ? 'ಮುಂದೆ' : 'Next'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stepper Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {STEP_ITEMS.map((item) => {
              const isActive = currentReportingStep === item.step;
              const isCompleted = currentReportingStep > item.step;
              const titleText = (item.title as any)[activeLang] || item.title.en;
              const descText = (item.desc as any)[activeLang] || item.desc.en;

              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setCurrentReportingStep(item.step)}
                  className={`p-3 rounded-xl border text-left transition-all duration-300 flex items-center gap-3 relative ${
                    isActive
                      ? 'bg-emerald-500/25 border-emerald-400 shadow-lg ring-2 ring-emerald-400/40 scale-[1.02]'
                      : isCompleted
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-neutral-200 hover:border-emerald-400'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base shrink-0 transition-transform ${
                      isActive
                        ? 'bg-emerald-500 text-neutral-950 shadow-lg shadow-emerald-500/50 scale-110'
                        : isCompleted
                        ? 'bg-emerald-500/30 text-emerald-300'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5 stroke-[3] text-emerald-400" /> : item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-black text-emerald-400">
                        {activeLang === 'kn' ? `ಹಂತ ${item.step}` : `Step ${item.step}`}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      )}
                    </div>
                    <p className="text-xs font-black text-white truncate">{titleText}</p>
                    <p className="text-[10px] text-neutral-400 truncate">{descText}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Connected Glowing Progress Line */}
          <div className="mt-3.5 h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-all duration-500 rounded-full shadow-sm shadow-emerald-400"
              style={{
                width: `${(currentReportingStep / 4) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Camera Capture Modal */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onPhotoCaptured={handlePhotoCaptured}
        currentLanguage={activeLang}
      />

      {/* TAB 1: REPORT VIEW */}
      {activeTab === 'report' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Action Area (7 or 8 cols depending on view) */}
          <div className="lg:col-span-7 space-y-6">
            {/* EASY MODE INCLUSIVE CONTAINER */}
            {isEasyMode && (
              <div className="eco-glass-card rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden border border-emerald-500/30">
                {/* Subtle environmental glow accent */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20 mb-5 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xl font-bold shadow-inner border border-emerald-400/30 animate-float-slow">
                      🌿
                    </span>
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-white">
                        {getUIString(activeLang, 'easyModeTitle')}
                      </h2>
                      <p className="text-xs text-emerald-200/80">
                        {getUIString(activeLang, 'easyModeSubtitle')}
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* STEP 1: PICTURE SELECTION (BIG CARDS) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center text-xs font-bold">
                          1
                        </span>
                        {getUIString(activeLang, 'step2Speak')}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-medium">
                        {activeLang === 'kn' ? 'ಚಿತ್ರವನ್ನು ಮುಟ್ಟಿ ಸಮಸ್ಯೆ ಆರಿಸಿ' : 'Tap to select problem'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {VISUAL_CATEGORIES.map((cat) => {
                        const isSelected = selectedVisualCatId === cat.id;
                        const labelText = (cat.label as any)[activeLang] || cat.label.en;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleSelectVisualCategory(cat)}
                            className={`p-3.5 rounded-2xl border-2 text-left transition transform active:scale-95 flex flex-col items-center justify-center text-center gap-2 relative ${
                              isSelected
                                ? `bg-neutral-850 ${cat.colorBorder} shadow-lg ring-2 ring-emerald-500/30 scale-[1.02]`
                                : `bg-neutral-900/80 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850`
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center text-xs font-bold shadow">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                            <span className="text-3xl filter drop-shadow">{cat.emoji}</span>
                            <span className="text-xs font-bold text-neutral-100 leading-tight">
                              {labelText}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* STEP 2: CAMERA CAPTURE (GIANT FRIENDLY BUTTON + PRESET SAMPLES) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center text-xs font-bold">
                          2
                        </span>
                        {getUIString(activeLang, 'step1Photo')}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {activeLang === 'kn' ? 'ನಿಜವಾದ ಫೋಟೋ ಅಥವಾ ಮಾದರಿ ಆರಿಸಿ' : 'Capture photo or pick sample'}
                      </span>
                    </div>

                    {photoUrl ? (
                      <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-black group max-h-56 flex items-center justify-center shadow-lg">
                        <img src={photoUrl} alt="Captured hazard" className="max-h-56 w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-between p-3.5">
                          <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-bold bg-neutral-950/80 px-2.5 py-1 rounded-lg backdrop-blur">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>
                              {activeLang === 'kn' ? 'ಫೋಟೋ ಲಗತ್ತಿಸಲಾಗಿದೆ' : 'Photo Attached'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsCameraOpen(true)}
                            className="px-3.5 py-1.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-xs font-bold text-white transition border border-neutral-700 flex items-center gap-1.5 shadow cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>{getUIString(activeLang, 'retake')}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={() => setIsCameraOpen(true)}
                          className="w-full p-5 sm:p-6 rounded-2xl border-2 border-dashed border-emerald-500/60 hover:border-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition flex flex-col items-center justify-center text-center group cursor-pointer shadow-inner"
                        >
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-neutral-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-2 group-hover:scale-110 transition">
                            <Camera className="w-8 h-8" />
                          </div>
                          <span className="text-sm font-black text-emerald-300">
                            {getUIString(activeLang, 'takePhotoNow')}
                          </span>
                          <span className="text-[11px] text-neutral-400 mt-0.5">
                            {activeLang === 'kn' ? 'ಲೈವ್ ಕ್ಯಾಮೆರಾ ತೆರೆಯಲು ಇಲ್ಲಿ ಮುಟ್ಟಿ' : 'Tap to open device camera & take live photo'}
                          </span>
                        </button>

                        {/* Preset Sample Photo Quick Selectors */}
                        <div className="bg-neutral-900/60 p-3 rounded-2xl border border-neutral-800/80">
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                            {activeLang === 'kn' ? 'ಅಥವಾ ಮಾದರಿ ಫೋಟೋ ಆರಿಸಿ:' : 'Or tap a sample photo hazard:'}
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {SAMPLE_HAZARD_PHOTOS.map((sample) => (
                              <button
                                key={sample.id}
                                type="button"
                                onClick={() => {
                                  setPhotoUrl(sample.dataUrl);
                                  setPhotoSource('upload');
                                  setTitle(sample.title);
                                  setDescription(sample.description);
                                  setCategory(sample.category);
                                  setAddress(sample.location);
                                  setNearSensitiveZone(sample.nearSensitiveZone);
                                }}
                                className="p-1.5 rounded-xl border border-neutral-800 hover:border-emerald-500/60 bg-neutral-950/70 hover:bg-neutral-900 transition text-left group cursor-pointer"
                              >
                                <img
                                  src={sample.dataUrl}
                                  alt={sample.label}
                                  className="w-full h-12 object-cover rounded-lg mb-1 group-hover:scale-105 transition"
                                />
                                <span className="text-[10px] font-bold text-neutral-300 block truncate group-hover:text-emerald-300">
                                  {sample.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* STEP 3: SPEAK YOUR PROBLEM (VOICE RECORDING / SPEECH-TO-TEXT) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center text-xs font-bold">
                          3
                        </span>
                        {getUIString(activeLang, 'audioOptions')}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {activeLang === 'kn' ? 'ಟೈಪಿಂಗ್ ಬೇಡ - ಮಾತನಾಡಿ ಸಾಕು' : 'No typing needed'}
                      </span>
                    </div>

                    <AudioRecorderPlayer
                      currentLanguage={activeLang}
                      recordedAudioUrl={audioUrl}
                      onAudioRecorded={(audioData) => setAudioUrl(audioData)}
                      onTranscriptReceived={(transcript) => {
                        setDescription((prev) => (prev ? `${prev} ${transcript}` : transcript));
                      }}
                      onClearAudio={() => setAudioUrl(null)}
                      textToRead={title || description}
                      label={getUIString(activeLang, 'tapToSpeak')}
                    />
                  </div>

                  {/* STEP 4: VISUAL LANDMARKS (TAP TO CHOOSE PLACE) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center text-xs font-bold">
                          4
                        </span>
                        {getUIString(activeLang, 'step3Place')}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {activeLang === 'kn' ? 'ಹತ್ತಿರದ ಗುರುತು ಆರಿಸಿ' : 'Tap nearby landmark'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {VISUAL_LANDMARKS.map((lm) => {
                        const isSelected = selectedLandmarkId === lm.id;
                        const labelText = getUIString(activeLang, lm.labelKey) || lm.fallback;
                        return (
                          <button
                            key={lm.id}
                            type="button"
                            onClick={() => handleSelectLandmark(lm)}
                            className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                              isSelected
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-md'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                            }`}
                          >
                            <span className="text-xl">{lm.emoji}</span>
                            <span className="text-[11px] leading-tight block truncate w-full">
                              {labelText}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Quick District Location Preset Dropdown */}
                    <div className="mt-3 flex items-center gap-2 bg-neutral-900 p-2 rounded-xl border border-neutral-800">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                      <select
                        value={selectedDistrict}
                        onChange={(e) => {
                          const dist = districtPresets.find((d) => d.name === e.target.value);
                          if (dist) {
                            setSelectedDistrict(dist.name);
                            setAddress(dist.addressSample);
                            setNearSensitiveZone(dist.sensitiveZone);
                          }
                        }}
                        className="bg-transparent text-xs text-neutral-200 font-semibold focus:outline-none w-full cursor-pointer"
                      >
                        {districtPresets.map((preset) => (
                          <option key={preset.id} value={preset.name} className="bg-neutral-900 text-white">
                            📍 {preset.name} ({preset.addressSample})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* STEP 4: GIANT SEND HELP REQUEST BUTTON WITH CREATIVE SHIMMER */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-50 text-white font-black text-base shadow-2xl shadow-emerald-950/80 transition-all duration-300 transform active:scale-98 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 ring-2 ring-emerald-400/40 animate-shimmer-btn cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>{getUIString(activeLang, 'sendingReport')}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 text-white animate-pulse" />
                          <span>{getUIString(activeLang, 'sendHelpButton')}</span>
                          <Leaf className="w-4 h-4 text-emerald-200 animate-float-slow" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* DETAILED FORM MODE (FOR USERS WHO PREFER TYPING) */}
            {!isEasyMode && (
              <div className="eco-glass-card rounded-2xl p-6 shadow-xl space-y-5 border border-emerald-500/25">
                <h3 className="text-sm font-bold text-neutral-200 border-b border-emerald-500/20 pb-3">
                  {getUIString(activeLang, 'modeDetailed')}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Photo Section */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                      {getUIString(activeLang, 'capturePhoto')}
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setIsCameraOpen(true)}
                        className="flex-1 p-3 rounded-xl border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-emerald-500/20 transition"
                      >
                        <Camera className="w-4 h-4" />
                        {getUIString(activeLang, 'openCamera')}
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                      {getUIString(activeLang, 'whatHazard')}
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={getUIString(activeLang, 'titlePlaceholder')}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-emerald-500 text-sm text-neutral-100 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                      {getUIString(activeLang, 'descContext')}
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={getUIString(activeLang, 'descPlaceholder')}
                      className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-emerald-500 text-sm text-neutral-100 transition resize-none"
                    />
                  </div>

                  {/* Audio component */}
                  <AudioRecorderPlayer
                    currentLanguage={activeLang}
                    recordedAudioUrl={audioUrl}
                    onAudioRecorded={(audioData) => setAudioUrl(audioData)}
                    onTranscriptReceived={(transcript) => {
                      setDescription((prev) => (prev ? `${prev} ${transcript}` : transcript));
                    }}
                    onClearAudio={() => setAudioUrl(null)}
                    textToRead={title || description}
                    label={getUIString(activeLang, 'audioOptions')}
                  />

                  {/* Category Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                      {getUIString(activeLang, 'categoryHint')}
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as IssueCategory)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:border-emerald-500 transition"
                    >
                      <option value="Pothole & Road Hazard">{translateCategory('Pothole & Road Hazard', activeLang)}</option>
                      <option value="Water & Drainage">{translateCategory('Water & Drainage', activeLang)}</option>
                      <option value="Waste & Sanitation">{translateCategory('Waste & Sanitation', activeLang)}</option>
                      <option value="Electrical & Lighting">{translateCategory('Electrical & Lighting', activeLang)}</option>
                      <option value="Public Park & Safety">{translateCategory('Public Park & Safety', activeLang)}</option>
                      <option value="Traffic & Signals">{translateCategory('Traffic & Signals', activeLang)}</option>
                    </select>
                  </div>

                  {/* Address input */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                      {getUIString(activeLang, 'locationGps')}
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 focus:border-emerald-500 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{getUIString(activeLang, 'submitReport')}</span>
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right Live AI Feedback & Duplicate Detection Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Live AI Analysis Preview Card */}
            <div id="ai-triage-card" className="eco-glass-card rounded-2xl p-5 shadow-xl border border-emerald-500/25">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-neutral-200 text-sm">
                    {activeLang === 'kn' ? 'AI ವಿಶ್ಲೇಷಣಾ ಪೂರ್ವವೀಕ್ಷಣೆ' : 'Instant AI Triage Preview'}
                  </h3>
                </div>
                {isAnalyzingTyping && (
                  <span className="text-[10px] font-mono text-emerald-400 animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Analyzing...
                  </span>
                )}
              </div>

              {liveAIPreview ? (
                <div className="mt-4 space-y-4">
                  {/* Category & Score badge */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
                        {activeLang === 'kn' ? 'ಗುರುತಿಸಲಾದ ವರ್ಗ' : 'Detected Category'}
                      </span>
                      <span className="text-sm font-black text-neutral-100">
                        {translateCategory(liveAIPreview.detectedCategory, activeLang)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
                        {activeLang === 'kn' ? 'ತುರ್ತು ಆದ್ಯತೆ' : 'Priority Score'}
                      </span>
                      <span
                        className={`text-sm font-black font-mono ${
                          liveAIPreview.priorityScore > 75
                            ? 'text-red-400'
                            : liveAIPreview.priorityScore > 50
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {liveAIPreview.priorityScore} / 100
                      </span>
                    </div>
                  </div>

                  {/* Safety Risk Alert */}
                  {liveAIPreview.safetyRisk && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-red-300 block">
                          {activeLang === 'kn' ? 'ಸಾರ್ವಜನಿಕ ಸುರಕ್ಷತಾ ಅಪಾಯ!' : 'Public Safety Risk Detected'}
                        </span>
                        <p className="text-[11px] text-neutral-300 leading-relaxed mt-0.5">
                          {liveAIPreview.safetyReason}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Duplicate Detection Alert */}
                  {liveAIPreview.potentialDuplicates.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                        <Info className="w-4 h-4" />
                        <span>
                          {activeLang === 'kn'
                            ? `ಹತ್ತಿರದಲ್ಲಿ ಇದೇ ರೀತಿಯ ${liveAIPreview.potentialDuplicates.length} ದೂರುಗಳು ದಾಖಲಾಗಿವೆ`
                            : `Semantic Duplicate Detected (${liveAIPreview.potentialDuplicates.length} nearby)`}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-300 leading-relaxed">
                        {activeLang === 'kn'
                          ? 'ಈ ಸಮಸ್ಯೆಯನ್ನು ಇತರ ನಾಗರಿಕರೂ ವರದಿ ಮಾಡಿದ್ದಾರೆ. ನಿಮ್ಮ ದೂರು ಆದ್ಯತೆಯನ್ನು ಹೆಚ್ಚಿಸಿ ರಿಪೇರಿ ತಂಡವನ್ನು ತಕ್ಷಣ ಕಳುಹಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.'
                          : 'A matching issue was already reported nearby. Your submission automatically merges into the cluster to accelerate dispatch without duplicate work.'}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center text-neutral-500">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs">
                    {activeLang === 'kn'
                      ? 'ಚಿತ್ರ ಮುಟ್ಟಿ ಅಥವಾ ಫೋಟೋ ತೆಗೆಯುವ ಮೂಲಕ AI ತಕ್ಷಣ ವಿಶ್ಲೇಷಿಸುತ್ತದೆ.'
                      : 'Tap a problem picture or take a photo to see instant AI classification & safety scoring.'}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Municipal Guarantee Card */}
            <div className="eco-glass-card rounded-2xl p-4 text-xs text-neutral-300 border border-emerald-500/20">
              <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{activeLang === 'kn' ? 'ನಾಗರಿಕ ರಕ್ಷಣೆ ಮತ್ತು ಗೌಪ್ಯತೆ' : 'Citizen Protection Guarantee'}</span>
              </h4>
              <p className="text-[11px] leading-relaxed text-emerald-100/70">
                {activeLang === 'kn'
                  ? 'ದಾಖಲಿಸಲಾದ ಎಲ್ಲಾ ದೂರುಗಳನ್ನು ನೇರವಾಗಿ ಸರ್ಕಾರಿ ರಿಪೇರಿ ಘಟಕಕ್ಕೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ. ಖಾಸಗಿ ವಿವರಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸಲಾಗುತ್ತದೆ.'
                  : 'Every photo and voice report is processed exclusively to repair municipal public infrastructure.'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2: LIVE STATUS TRACKER & TIMELINE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Issue Selector List (4 Cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 px-1">
              <span className="font-bold">
                {activeLang === 'kn' ? `ದಾಖಲಾದ ದೂರುಗಳು (${issues.length})` : `Reported Issues (${issues.length})`}
              </span>
              <span className="text-[11px]">{activeLang === 'kn' ? 'ಆದ್ಯತೆಯ ಪ್ರಕಾರ' : 'By Severity'}</span>
            </div>

            <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
              {issues.map((iss) => (
                <button
                  key={iss.id}
                  onClick={() => {
                    setTrackingIssue(iss);
                    onSelectIssue?.(iss.id);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition flex flex-col gap-2 ${
                    trackingIssue?.id === iss.id
                      ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">{iss.id}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        iss.urgency === 'Critical'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : iss.urgency === 'High'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {translateUrgency(iss.urgency, activeLang)}
                    </span>
                  </div>

                  <h4 className="font-bold text-neutral-200 text-xs line-clamp-1">{iss.title}</h4>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="line-clamp-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {iss.location.address}
                    </span>
                    <span className="shrink-0 text-emerald-300 font-semibold">
                      {translateStatus(iss.status, activeLang)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Timeline & Detail View (8 Cols) */}
          <div className="lg:col-span-8 eco-glass-card rounded-3xl p-6 shadow-2xl border border-emerald-500/25">
            {trackingIssue ? (
              <div className="space-y-6">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-neutral-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-neutral-950 px-2.5 py-0.5 rounded-lg border border-neutral-800">
                        {trackingIssue.id}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {translateCategory(trackingIssue.category, activeLang)}
                      </span>
                      <span className="text-xs text-neutral-500">{trackingIssue.submittedAt}</span>
                    </div>
                    <h2 className="text-lg font-black text-neutral-100">{trackingIssue.title}</h2>
                    <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{trackingIssue.location.address}</span>
                      {trackingIssue.location.nearSensitiveZone && (
                        <span className="text-amber-400">({trackingIssue.location.nearSensitiveZone})</span>
                      )}
                    </p>
                  </div>

                  {/* Audio Status Readout & Upvote */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => playStatusAudio(trackingIssue)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition"
                      title="Listen to status readout"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{getUIString(activeLang, 'listenStatus')}</span>
                    </button>

                    <button
                      onClick={() => onUpvoteIssue(trackingIssue.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-neutral-200 border border-neutral-700 transition"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>({trackingIssue.upvotes})</span>
                    </button>
                  </div>
                </div>

                {/* SIMPLE 3-STEP VISUAL PROGRESS BAR FOR NON-EDUCATED USERS */}
                <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
                  <span className="text-xs font-black uppercase tracking-wider text-neutral-400 block mb-3">
                    {activeLang === 'kn' ? 'ದೂರಿನ ಪ್ರಗತಿ (ಹಂತಗಳು)' : 'Complaint Resolution Progress'}
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {/* Step 1 */}
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex flex-col items-center">
                      <span className="text-2xl mb-1">📩</span>
                      <span className="text-xs font-black">{getUIString(activeLang, 'statusReceived')}</span>
                      <span className="text-[10px] text-neutral-400 mt-0.5">Step 1 • Verified</span>
                    </div>

                    {/* Step 2 */}
                    <div
                      className={`p-3 rounded-xl border flex flex-col items-center ${
                        trackingIssue.status === 'Dispatched' || trackingIssue.status === 'Resolved'
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-bold'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                      }`}
                    >
                      <span className="text-2xl mb-1">🚚</span>
                      <span className="text-xs font-black">{getUIString(activeLang, 'statusDispatched')}</span>
                      <span className="text-[10px] mt-0.5">
                        {trackingIssue.status === 'Dispatched' ? 'En Route Now' : 'Step 2'}
                      </span>
                    </div>

                    {/* Step 3 */}
                    <div
                      className={`p-3 rounded-xl border flex flex-col items-center ${
                        trackingIssue.status === 'Resolved'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                      }`}
                    >
                      <span className="text-2xl mb-1">🎉</span>
                      <span className="text-xs font-black">{getUIString(activeLang, 'statusResolved')}</span>
                      <span className="text-[10px] mt-0.5">
                        {trackingIssue.status === 'Resolved' ? 'Completed!' : 'Step 3'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Photo & Details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-5 rounded-2xl overflow-hidden border border-neutral-800 bg-black max-h-48">
                    <img src={trackingIssue.photoUrl} alt="Hazard inspection" className="w-full h-full object-cover" />
                  </div>

                  <div className="md:col-span-7 bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-400">{activeLang === 'kn' ? 'ನಿಯೋಜಿತ ಇಲಾಖೆ:' : 'Target Department:'}</span>
                      <span className="font-bold text-white">{trackingIssue.aiAnalysis.department}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-400">{activeLang === 'kn' ? 'ರಿಪೇರಿ ತಂಡ:' : 'Assigned Crew:'}</span>
                      <span className="font-bold text-emerald-400">{trackingIssue.aiAnalysis.suggestedCrew}</span>
                    </div>
                    <div className="pt-2 border-t border-neutral-800 space-y-2">
                      <span className="text-[11px] font-bold text-neutral-400 block">
                        {activeLang === 'kn' ? 'AI ಸಾರಾಂಶ:' : 'AI Triage Summary:'}
                      </span>
                      <p className="text-xs text-neutral-300 leading-relaxed italic">
                        "{trackingIssue.aiAnalysis.aiSummary}"
                      </p>

                      {/* Text to speech and voice note player */}
                      <AudioRecorderPlayer
                        currentLanguage={activeLang}
                        textToRead={`Issue ${trackingIssue.id}. ${trackingIssue.aiAnalysis.aiSummary}`}
                        recordedAudioUrl={trackingIssue.audioUrl}
                        label={activeLang === 'kn' ? 'ಧ್ವನಿ ಬ್ರೀಫಿಂಗ್' : 'Audio Dispatch Brief'}
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3">
                    {activeLang === 'kn' ? 'ದೂರಿನ ಸಂಪೂರ್ಣ ಇತಿಹಾಸ' : 'Real-Time Resolution Timeline'}
                  </h3>

                  <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-800">
                    {trackingIssue.timeline.map((event, idx) => (
                      <div key={event.id || idx} className="relative">
                        <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-neutral-900 border-2 border-emerald-400 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </div>

                        <div className="bg-neutral-950 p-3.5 rounded-2xl border border-neutral-800">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-bold text-neutral-200">{event.title}</span>
                            <span className="text-neutral-500 font-mono text-[11px]">{event.timestamp}</span>
                          </div>
                          <p className="text-xs text-neutral-400 leading-relaxed">{event.description}</p>
                          {event.badge && (
                            <span className="inline-block mt-2 text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/20 font-mono">
                              {event.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-neutral-500">
                <p>{activeLang === 'kn' ? 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಎಡಭಾಗದಲ್ಲಿ ದೂರನ್ನು ಆರಿಸಿ.' : 'Select an issue from the list to view its real-time resolution timeline.'}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
