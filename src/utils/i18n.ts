export type LanguageCode =
  | 'en'
  | 'kn'
  | 'es'
  | 'hi'
  | 'te'
  | 'zh'
  | 'fr'
  | 'tl'
  | 'ar'
  | 'de';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
  flag: string;
  speechLang: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇺🇸', speechLang: 'en-US' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', speechLang: 'kn-IN' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechLang: 'hi-IN' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', speechLang: 'te-IN' },
  { code: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸', speechLang: 'es-ES' },
  { code: 'zh', label: 'Chinese', nativeName: '中文 (简体)', flag: '🇨🇳', speechLang: 'zh-CN' },
  { code: 'fr', label: 'French', nativeName: 'Français', flag: '🇫🇷', speechLang: 'fr-FR' },
  { code: 'tl', label: 'Tagalog', nativeName: 'Filipino', flag: '🇵🇭', speechLang: 'fil-PH' },
  { code: 'ar', label: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', speechLang: 'ar-SA' },
  { code: 'de', label: 'German', nativeName: 'Deutsch', flag: '🇩🇪', speechLang: 'de-DE' },
];

export interface DistrictLocationInfo {
  id: string;
  name: string;
  addressSample: string;
  sensitiveZone: string;
}

export const DISTRICT_PRESETS: Record<LanguageCode, DistrictLocationInfo[]> = {
  en: [
    {
      id: 'd3',
      name: 'District 3 - Education Hub',
      addressSample: '412 Maplewood Ave, North Central',
      sensitiveZone: 'Lincoln Elementary School Crossing (45m)',
    },
    {
      id: 'd1',
      name: 'District 1 - Civic Center & Transit Hub',
      addressSample: '88 Oakridge Blvd, Downtown Core',
      sensitiveZone: 'Metro Bus Terminal & Transit Hub',
    },
    {
      id: 'd4',
      name: 'District 4 - West Valley Residential',
      addressSample: '1540 Highland Ave, West Valley',
      sensitiveZone: 'Golden Age Senior Living Gateway (20m)',
    },
    {
      id: 'd5',
      name: 'District 5 - Industrial Waterfront',
      addressSample: '722 Industrial Parkway, South Waterfront',
      sensitiveZone: 'ADA Sidewalk & Wheelchair Ramp',
    },
  ],
  kn: [
    {
      id: 'd3',
      name: 'ವಲಯ 3 - ಶಿಕ್ಷಣ ಕೇಂದ್ರ (Education Hub)',
      addressSample: '412 ಮೇಪಲ್‌ವುಡ್ ರಸ್ತೆ, ಉತ್ತರ ಕೇಂದ್ರ',
      sensitiveZone: 'ಲಿಂಕನ್ ಪ್ರಾಥಮಿಕ ಶಾಲೆ ಕ್ರಾಸಿಂಗ್ (45 ಮೀ)',
    },
    {
      id: 'd1',
      name: 'ವಲಯ 1 - ನಾಗರಿಕ ಕೇಂದ್ರ ಮತ್ತು ಸಾರಿಗೆ ನಿಲ್ದಾಣ',
      addressSample: '88 ಓಕ್‌ರಿಡ್ಜ್ ಬೌಲೆವಾರ್ಡ್, ನಗರ ಕೇಂದ್ರ',
      sensitiveZone: 'ಮೆಟ್ರೋ ಬಸ್ ಟರ್ಮಿನಲ್ ಮತ್ತು ಸಾರಿಗೆ ಹಬ್',
    },
    {
      id: 'd4',
      name: 'ವಲಯ 4 - ವೆಸ್ಟ್ ವ್ಯಾಲಿ ವಸತಿ ಪ್ರದೇಶ',
      addressSample: '1540 ಹೈಲ್ಯಾಂಡ್ ರಸ್ತೆ, ವೆಸ್ಟ್ ವ್ಯಾಲಿ',
      sensitiveZone: 'ಹಿರಿಯ ನಾಗರಿಕರ ಆಶ್ರಮ ದ್ವಾರ (20 ಮೀ)',
    },
    {
      id: 'd5',
      name: 'ವಲಯ 5 - ಕೈಗಾರಿಕಾ ತೀರಪ್ರದೇಶ',
      addressSample: '722 ಇಂಡಸ್ಟ್ರಿಯಲ್ ಪಾರ್ಕ್‌ವೇ, ದಕ್ಷಿಣ ತೀರ',
      sensitiveZone: 'ಅಂಗವಿಕಲರ ಮತ್ತು ಗಾಲಿಕುರ್ಚಿ ನಡಿಗೆ ಮಾರ್ಗ (ADA)',
    },
  ],
  es: [
    {
      id: 'd3',
      name: 'Distrito 3 - Zona Educativa',
      addressSample: '412 Maplewood Ave, Zona Norte',
      sensitiveZone: 'Paso Peatonal Escuela Lincoln (45m)',
    },
    {
      id: 'd1',
      name: 'Distrito 1 - Centro Cívico y Transporte',
      addressSample: '88 Oakridge Blvd, Centro Metropolitano',
      sensitiveZone: 'Terminal Central de Autobuses Metro',
    },
    {
      id: 'd4',
      name: 'Distrito 4 - Valle Oeste Residencial',
      addressSample: '1540 Highland Ave, Valle Oeste',
      sensitiveZone: 'Acceso a Residencia de Ancianos (20m)',
    },
    {
      id: 'd5',
      name: 'Distrito 5 - Zona Industrial Costera',
      addressSample: '722 Industrial Parkway, Costanera Sur',
      sensitiveZone: 'Rampa de Acceso Peatonal Inclusiva ADA',
    },
  ],
  hi: [
    {
      id: 'd3',
      name: 'जिला 3 - शिक्षा केंद्र',
      addressSample: '412 मेपलवुड एवेन्यू, उत्तर मध्य',
      sensitiveZone: 'लिंकन प्राइमरी स्कूल क्रॉसिंग (45 मी)',
    },
    {
      id: 'd1',
      name: 'जिला 1 - नागरिक केंद्र और पारगमन हब',
      addressSample: '88 ओकरिज बुलेवार्ड, डाउनटाउन कोर',
      sensitiveZone: 'मेट्रो बस टर्मिनल और पारगमन स्टेशन',
    },
    {
      id: 'd4',
      name: 'जिला 4 - वेस्ट वैली आवासीय',
      addressSample: '1540 हाइलैंड एवेन्यू, वेस्ट वैली',
      sensitiveZone: 'वरिष्ठ नागरिक आवास द्वार (20 मी)',
    },
    {
      id: 'd5',
      name: 'जिला 5 - औद्योगिक जलक्षेत्र',
      addressSample: '722 इंडस्ट्रियल पार्कवे, दक्षिण तट',
      sensitiveZone: 'व्हीलचेयर और दिव्यांग पैदल मार्ग',
    },
  ],
  zh: [
    {
      id: 'd3',
      name: '第3区 - 教育中心',
      addressSample: '枫木大道412号，中北部',
      sensitiveZone: '林肯小学人行横道 (45米)',
    },
    {
      id: 'd1',
      name: '第1区 - 市政中心与交通枢纽',
      addressSample: '橡树岭大道88号，市中心核心区',
      sensitiveZone: '地铁公交总站及交通换乘枢纽',
    },
    {
      id: 'd4',
      name: '第4区 - 西谷居民区',
      addressSample: '高地大道1540号，西谷',
      sensitiveZone: '金色年华老年公寓入口 (20米)',
    },
    {
      id: 'd5',
      name: '第5区 - 滨水工业区',
      addressSample: '工业公园大道722号，南滨水区',
      sensitiveZone: '无障碍轮椅坡道通行通道',
    },
  ],
  fr: [
    {
      id: 'd3',
      name: 'District 3 - Pôle Éducatif',
      addressSample: '412 Avenue Maplewood, Centre-Nord',
      sensitiveZone: 'Passage Piéton École Primaire Lincoln (45m)',
    },
    {
      id: 'd1',
      name: 'District 1 - Centre Civique et Gare',
      addressSample: '88 Boulevard Oakridge, Centre-Ville',
      sensitiveZone: 'Terminal de Bus et Pôle Multimodal',
    },
    {
      id: 'd4',
      name: 'District 4 - Résidentiel Vallée Ouest',
      addressSample: '1540 Avenue Highland, Vallée Ouest',
      sensitiveZone: 'Entrée Résidence pour Personnes Âgées (20m)',
    },
    {
      id: 'd5',
      name: 'District 5 - Zone Industrielle Fluviale',
      addressSample: '722 Promenade Industrielle, Rive Sud',
      sensitiveZone: 'Rampe d\'Accès Trottoir Handicapés PMR',
    },
  ],
  tl: [
    {
      id: 'd3',
      name: 'Distrito 3 - Sentro ng Edukasyon',
      addressSample: '412 Maplewood Ave, Hilagang Gitna',
      sensitiveZone: 'Tawiran ng Paaralang Elementarya ng Lincoln (45m)',
    },
    {
      id: 'd1',
      name: 'Distrito 1 - Sentro ng Bayan at Sakayan',
      addressSample: '88 Oakridge Blvd, Gitnang Lungsod',
      sensitiveZone: 'Terminal ng Bus at Transit Hub',
    },
    {
      id: 'd4',
      name: 'Distrito 4 - Kanlurang Lambak Pantahanan',
      addressSample: '1540 Highland Ave, Kanlurang Lambak',
      sensitiveZone: 'Pintuan ng Tirahan ng mga Nakatatanda (20m)',
    },
    {
      id: 'd5',
      name: 'Distrito 5 - Industriyal na Baybayin',
      addressSample: '722 Industrial Parkway, Timog Baybayin',
      sensitiveZone: 'Rampa para sa May Kapansanan at Wheelchair',
    },
  ],
  ar: [
    {
      id: 'd3',
      name: 'المنطقة 3 - المجمع التعليمي',
      addressSample: '412 شارع مابل وود، الشمال المركزي',
      sensitiveZone: 'معبر مدرسة لينكولن الابتدائية (45 م)',
    },
    {
      id: 'd1',
      name: 'المنطقة 1 - المركز المدني ومحطة العبور',
      addressSample: '88 جادة أوكريدج، وسط المدينة',
      sensitiveZone: 'محطة الحافلات المركزية وشبكة النقل',
    },
    {
      id: 'd4',
      name: 'المنطقة 4 - وادي الغرب السكني',
      addressSample: '1540 جادة هايلاند، وادي الغرب',
      sensitiveZone: 'مدخل دار رعاية كبار السن (20 م)',
    },
    {
      id: 'd5',
      name: 'المنطقة 5 - الواجهة المائية الصناعية',
      addressSample: '722 المجمع الصناعي، الواجهة الجنوبية',
      sensitiveZone: 'منحدر المشاة لذوي الاحتياجات الخاصة',
    },
  ],
  te: [
    {
      id: 'd3',
      name: 'జిల్లా 3 - విద్యా కేంద్రం',
      addressSample: '412 మేపుల్‌వుడ్ ఏవిన్యూ, ఉత్తర కేంద్రం',
      sensitiveZone: 'లింకన్ ప్రాథమిక పాఠశాల క్రాసింగ్ (45 మీ)',
    },
    {
      id: 'd1',
      name: 'జిల్లా 1 - పౌర కేంద్రం మరియు బస్ టెర్మినల్',
      addressSample: '88 ఓక్‌రిడ్జ్ బౌలేవార్డ్, డౌన్‌టౌన్',
      sensitiveZone: 'మెట్రో బస్ టెర్మినల్ & రవాణా కేంద్రం',
    },
    {
      id: 'd4',
      name: 'జిల్లా 4 - వెస్ట్ వ్యాలీ నివాస ప్రాంతం',
      addressSample: '1540 హైలాండ్ ఏవిన్యూ, వెస్ట్ వ్యాలీ',
      sensitiveZone: 'వయోవృద్ధుల ఆశ్రమ ప్రవేశ ద్వారం (20 మీ)',
    },
    {
      id: 'd5',
      name: 'జిల్లా 5 - పారిశ్రామిక తీరప్రాంతం',
      addressSample: '722 ఇండస్ట్రియల్ పార్క్‌వే, సౌత్ వాటర్‌ఫ్రంట్',
      sensitiveZone: 'వీల్‌చైర్ మరియు వికలాంగుల నడక మార్గం',
    },
  ],
  de: [
    {
      id: 'd3',
      name: 'Bezirk 3 - Bildungszentrum',
      addressSample: '412 Maplewood Ave, Nord-Zentrum',
      sensitiveZone: 'Fußgängerüberweg Lincoln Grundschule (45m)',
    },
    {
      id: 'd1',
      name: 'Bezirk 1 - Bürgerzentrum & Verkehrsknotenpunkt',
      addressSample: '88 Oakridge Blvd, Innenstadt',
      sensitiveZone: 'Zentraler Busbahnhof & Nahverkehrsknoten',
    },
    {
      id: 'd4',
      name: 'Bezirk 4 - West Valley Wohngebiet',
      addressSample: '1540 Highland Ave, West Valley',
      sensitiveZone: 'Eingang Seniorenresidenz (20m)',
    },
    {
      id: 'd5',
      name: 'Bezirk 5 - Industrie-Hafengebiet',
      addressSample: '722 Industrial Parkway, Süd-Ufer',
      sensitiveZone: 'Barrierefreie Gehwegrampe für Rollstuhlfahrer',
    },
  ],
};

export const UI_STRINGS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navigation
    citizenPortal: 'Citizen Portal',
    navCitizen: 'Citizen Portal',
    navCommand: 'Command Center',
    navThreeCity: '3D City Twin',
    navLogic: 'AI Logic Visualizer',
    navHonesty: 'Honesty & Audit',
    navJudgeTour: 'Judge Tour',
    navDamGoAI: 'DamGo AI',
    subHeader: 'DamGo Rapid Civic Action Platform',
    reportTitle: 'Report & Track Civic Issues',
    quickReport: 'Quick Report (<1 min)',
    liveTracker: 'Live Tracker',

    // Easy Mode & Visual UI
    easyModeTitle: 'Easy Visual & Voice Mode (For Everyone)',
    easyModeSubtitle: 'No typing required — tap a picture, speak your issue, or tap camera to report!',
    modeSimple: 'Simple Mode (Pictures & Voice)',
    modeDetailed: 'Detailed Form Mode',
    voiceGuideButton: 'Listen to Audio Instructions',
    voiceGuideScript: 'Welcome! If you see a pothole, water leak, broken light, or garbage dump, tap the big camera button to take a photo. Then tap the microphone to speak, or tap a picture. We will dispatch the repair team immediately!',

    // 1-2-3-4 Steps
    step1Photo: 'Step 1: Take Photo',
    step2Speak: 'Step 2: Tap Picture or Speak',
    step3Place: 'Step 3: Select Landmark Area',
    step4Send: 'Step 4: Send Help Request',

    // Camera & Action
    capturePhoto: '1. Capture Live Hazard Photo',
    openCamera: 'Open Live Camera',
    sampleHazard: 'Load School Pothole Sample',
    retakeChange: 'Retake / Change Photo',
    takePhotoNow: 'Take Live Photo Now',
    useThisPhoto: 'Use This Photo',
    retake: 'Retake Photo',
    samplePhotos: 'Preset Hazard Samples',

    // Speaking & Audio
    whatHazard: '2. What is the hazard?',
    descContext: 'Description & Safety Context',
    categoryHint: 'Category Hint',
    voiceNote: 'Record Voice Note / Speech-to-Text',
    listening: 'Listening... Speak your issue clearly',
    recordingDone: 'Voice note recorded',
    listenReport: 'Listen to AI Triage Report',
    tapToSpeak: 'Tap Mic & Speak (No typing needed)',
    speakingRecorded: 'Voice recorded! Transcribed into report.',
    audioOptions: 'Audio Voice Input & Dictation',
    startRecording: 'Start Recording',
    stopRecording: 'Stop Recording',
    playAudio: 'Play Recording',
    pauseAudio: 'Pause',
    deleteAudio: 'Delete Audio',
    listenSummary: 'Listen to AI Summary',

    // Categories (Visual)
    catPothole: 'Road Pothole',
    catWater: 'Water Leak / Pipe Burst',
    catLight: 'Broken Streetlight',
    catGarbage: 'Garbage Dump & Waste',
    catElectric: 'Electric Wire Hazard',
    catDrain: 'Drain Block / Fallen Tree',

    // Landmarks
    locationGps: 'Location & Geographic Area',
    sensitiveProximity: 'Sensitive Proximity Factor (GIS Detected)',
    selectLocationPreset: 'Select Quick Municipal Location Preset:',
    languageOptions: 'Language / ಭಾಷೆ / भाषा / Idioma',
    nearSchool: 'Near School Crossing',
    nearBusStand: 'Bus Terminal & Stand',
    nearHospital: 'Near Hospital & Clinic',
    nearMarket: 'Market & Commercial Area',
    nearHomes: 'Residential Neighborhood',

    // Submissions & Status
    submitReport: 'Submit Civic Report & Launch AI Triage',
    sendHelpButton: 'Send Help Request Now (Quick Dispatch)',
    sendingReport: 'Submitting & Dispatching Repair Crew...',
    reportSuccess: 'Help Request Sent Successfully!',
    ticketNumber: 'Ticket #',
    statusReceived: 'Complaint Received',
    statusDispatched: 'Repair Team On The Way',
    statusResolved: 'Fixed & Cleaned Up!',
    listenStatus: 'Listen to Current Status',

    // Placeholders
    titlePlaceholder: 'e.g. Deep pothole right on Maplewood school crosswalk',
    descPlaceholder: 'Describe severity, hazards to cars/pedestrians, or exact landmarks...',
    addressPlaceholder: 'e.g. 412 Maplewood Ave, North Central',
    chatPlaceholder: 'Ask DamGo AI a civic or repair question...',

    // Auth & Login
    login: 'Log In',
    logout: 'Log Out',
    loginTitle: 'Sign in to DamGo',
    loginSubtitle: 'Track your reported issues, earn civic impact score & badges, or manage ward triage',
    quickPersonaLogin: '⚡ Quick Demo Personas',
    phoneOtpLogin: '📱 Mobile OTP / DigiLocker',
    officerLogin: '🏛️ Official Staff Portal',
    roleCitizen: 'Citizen Reporter',
    roleOfficer: 'Ward Officer / Engineer',
    roleAdmin: 'Municipal Administrator',
    loginAs: 'Log In as',
    enterPhone: 'Enter 10-digit mobile number',
    enterOtp: 'Enter 4-digit OTP',
    sendOtp: 'Send OTP',
    verifyAndLogin: 'Verify & Sign In',
    demoOtpHint: 'Demo OTP is: 2026',
    civicPoints: 'Civic Points',
    reportsFiled: 'Reports Filed',
    reportsResolved: 'Resolved',
    switchAccount: 'Switch Role / Account',
    myReports: 'My Reports',
    verifiedCitizen: 'DigiLocker Verified Citizen',
    verifiedOfficial: 'BBMP Govt Verified Staff',
    guestUser: 'Guest Citizen',
  },

  kn: {
    // Navigation
    citizenPortal: 'ನಾಗರಿಕ ಪೋರ್ಟಲ್',
    navCitizen: 'ನಾಗರಿಕ ದೂರು (Citizen)',
    navCommand: 'ಕಮಾಂಡ್ ಸೆಂಟರ್ (Admin)',
    navThreeCity: '3D ನಗರ ದೃಶ್ಯ',
    navLogic: 'AI ತರ್ಕ ವೀಕ್ಷಕ',
    navHonesty: 'ಪಾರದರ್ಶಕತೆ ಪರಿಶೀಲನೆ',
    navJudgeTour: 'ಡೆಮೊ ಪ್ರವಾಸ',
    navDamGoAI: 'DamGo AI ಸಹಾಯಕ',
    subHeader: 'DamGo ಕ್ಷಿಪ್ರ ನಾಗರಿಕ ಕ್ರಮ ವೇದಿಕೆ',
    reportTitle: 'ನಾಗರಿಕ ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಿ ಮತ್ತು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    quickReport: 'ತ್ವರಿತ ವರದಿ (<1 ನಿಮಿಷ)',
    liveTracker: 'ಲೈವ್ ಟ್ರ್ಯಾಕರ್',

    // Auth & Login
    login: 'ಲಾಗಿನ್ (Sign In)',
    logout: 'ನಿರ್ಗಮಿಸಿ (Log Out)',
    loginTitle: 'DamGo ಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ',
    loginSubtitle: 'ನಿಮ್ಮ ದೂರುಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ, ನಾಗರಿಕ ಅಂಕಗಳನ್ನು ಪಡೆಯಿರಿ ಅಥವಾ ವಾರ್ಡ್ ನಿರ್ವಹಿಸಿ',
    quickPersonaLogin: '⚡ ತ್ವರಿತ ಡೆಮೊ ಪಾತ್ರಗಳು (Quick Demo)',
    phoneOtpLogin: '📱 ಮೊಬೈಲ್ OTP / ಡಿಜಿಲಾಕರ್',
    officerLogin: '🏛️ ಸರ್ಕಾರಿ ಅಧಿಕಾರಿ ಪೋರ್ಟಲ್',
    roleCitizen: 'ನಾಗರಿಕ ವರದಿಗಾರ (Citizen)',
    roleOfficer: 'ವಾರ್ಡ್ ಎಂಜಿನಿಯರ್ (Officer)',
    roleAdmin: 'ಮುಖ್ಯ ಆಡಳಿತಾಧಿಕಾರಿ (Admin)',
    loginAs: 'ಆಗಿ ಲಾಗಿನ್ ಮಾಡಿ',
    enterPhone: '10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ',
    enterOtp: '4 ಅಂಕಿಯ OTP ನಮೂದಿಸಿ',
    sendOtp: 'OTP ಕಳುಹಿಸಿ',
    verifyAndLogin: 'ಪರಿಶೀಲಿಸಿ ಲಾಗಿನ್ ಮಾಡಿ',
    demoOtpHint: 'ಡೆಮೊ OTP: 2026',
    civicPoints: 'ನಾಗರಿಕ ಅಂಕಗಳು',
    reportsFiled: 'ದಾಖಲಿಸಿದ ದೂರುಗಳು',
    reportsResolved: 'ಪರಿಹಾರವಾದವು',
    switchAccount: 'ಖಾತೆ ಬದಲಾಯಿಸಿ',
    myReports: 'ನನ್ನ ದೂರುಗಳು',
    verifiedCitizen: 'ಡಿಜಿಲಾಕರ್ ದೃಢೀಕೃತ ನಾಗರಿಕ',
    verifiedOfficial: 'ಬಿಬಿಎಂಪಿ ಅಧಿಕೃತ ಸಿಬ್ಬಂದಿ',
    guestUser: 'ಅತಿಥಿ ನಾಗರಿಕ (Guest)',


    // Easy Mode & Visual UI for non-educated users
    easyModeTitle: 'ಸರಳ ಮೋಡ್ (ಚಿತ್ರ ಮತ್ತು ಧ್ವನಿ - ಎಲ್ಲರಿಗೂ)',
    easyModeSubtitle: 'ಯಾವುದೇ ಟೈಪಿಂಗ್ ಬೇಡ — ಚಿತ್ರ ಮುಟ್ಟಿ, ಮಾತನಾಡಿ ಅಥವಾ ಕ್ಯಾಮೆರಾ ಒತ್ತಿ ದೂರು ನೀಡಿ!',
    modeSimple: 'ಸರಳ ಮೋಡ್ (ಚಿತ್ರ ಮತ್ತು ಧ್ವನಿ)',
    modeDetailed: 'ವಿವರವಾದ ನಮೂನೆ',
    voiceGuideButton: 'ಕನ್ನಡದಲ್ಲಿ ಸೂಚನೆ ಕೇಳಿ (ಧ್ವನಿ)',
    voiceGuideScript: 'ಸ್ವಾಗತ! ರಸ್ತೆ ಗುಂಡಿ, ನೀರು ಸೋರಿಕೆ, ಕತ್ತಲೆ ದೀಪ ಅಥವಾ ಕಸದ ರಾಶಿ ಕಂಡರೆ - ಕೆಳಗಿನ ಕ್ಯಾಮೆರಾ ಒತ್ತಿ ಫೋಟೋ ತೆಗೆಯಿರಿ. ನಂತರ ಮೈಕ್ ಒತ್ತಿ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ, ಕಳುಹಿಸಿ ಬಟನ್ ಒತ್ತಿರಿ. ಸರ್ಕಾರಿ ರಿಪೇರಿ ತಂಡ ತಕ್ಷಣ ಬಂದು ಸರಿಪಡಿಸುತ್ತದೆ!',

    // 1-2-3-4 Steps
    step1Photo: 'ಹಂತ 1: ಫೋಟೋ ತೆಗೆಯಿರಿ',
    step2Speak: 'ಹಂತ 2: ಚಿತ್ರ ಮುಟ್ಟಿ ಅಥವಾ ಮಾತನಾಡಿ',
    step3Place: 'ಹಂತ 3: ನಿಮ್ಮ ಹತ್ತಿರದ ಜಾಗ ಆರಿಸಿ',
    step4Send: 'ಹಂತ 4: ಸಹಾಯಕ್ಕಾಗಿ ಕಳುಹಿಸಿ',

    // Camera & Action
    capturePhoto: '1. ಅಪಾಯದ ಲೈವ್ ಫೋಟೋ ಸೆರೆಹಿಡಿಯಿರಿ',
    openCamera: 'ಲೈವ್ ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ',
    sampleHazard: 'ಶಾಲಾ ರಸ್ತೆ ಗುಂಡಿ ಮಾದರಿ ಲೋಡ್ ಮಾಡಿ',
    retakeChange: 'ಮತ್ತೆ ಫೋಟೋ ತೆಗೆಯಿರಿ / ಬದಲಾಯಿಸಿ',
    takePhotoNow: 'ಈಗಲೇ ಲೈವ್ ಫೋಟೋ ತೆಗೆಯಿರಿ',
    useThisPhoto: 'ಈ ಫೋಟೋ ಬಳಸಿ',
    retake: 'ಮತ್ತೆ ಫೋಟೋ ತೆಗೆಯಿರಿ',
    samplePhotos: 'ಸಿದ್ಧ ಮಾದರಿ ಫೋಟೋಗಳು',

    // Speaking & Audio
    whatHazard: '2. ಸಮಸ್ಯೆ ಅಥವಾ ಅಪಾಯ ಏನು?',
    descContext: 'ವಿವರಣೆ ಮತ್ತು ಸುರಕ್ಷತಾ ಮಾಹಿತಿ',
    categoryHint: 'ವರ್ಗ ಸುಳಿವು',
    voiceNote: 'ಧ್ವನಿ ಟಿಪ್ಪಣಿ ರೆಕಾರ್ಡ್ ಮಾಡಿ / ಮಾತನಾಡಿ ಟೈಪ್ ಮಾಡಿ',
    listening: 'ಆಲಿಸುತ್ತಿದೆ... ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ',
    recordingDone: 'ಧ್ವನಿ ಟಿಪ್ಪಣಿ ರೆಕಾರ್ಡ್ ಆಗಿದೆ',
    listenReport: 'AI ವಿಶ್ಲೇಷಣಾ ವರದಿ ಆಲಿಸಿ',
    tapToSpeak: 'ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ (ಟೈಪಿಂಗ್ ಬೇಡ)',
    speakingRecorded: 'ನಿಮ್ಮ ಧ್ವನಿ ರೆಕಾರ್ಡ್ ಆಗಿದೆ! ದೂರಿನಲ್ಲಿ ಸೇರಿಸಲಾಗಿದೆ.',
    audioOptions: 'ಆಡಿಯೋ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಮತ್ತು ಡಿಕ್ಟೇಶನ್',
    startRecording: 'ರೆಕಾರ್ಡಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ',
    stopRecording: 'ನಿಲ್ಲಿಸಿ',
    playAudio: 'ಪ್ಲೇ ಮಾಡಿ (ಕೇಳಿ)',
    pauseAudio: 'ವಿರಾಮ',
    deleteAudio: 'ಅಳಿಸಿ',
    listenSummary: 'AI ಸಾರಾಂಶ ಆಲಿಸಿ',

    // Categories (Visual)
    catPothole: 'ರಸ್ತೆ ಗುಂಡಿ',
    catWater: 'ನೀರು ಸೋರಿಕೆ / ಪೈಪ್ ಹೊಡೆದಿದೆ',
    catLight: 'ಕತ್ತಲೆ / ಬೀದಿ ದೀಪ ಆಫ್ ಆಗಿದೆ',
    catGarbage: 'ಕಸದ ರಾಶಿ / ಗಲೀಜು',
    catElectric: 'ಕರೆಂಟ್ ತಂತಿ ಅಪಾಯ',
    catDrain: 'ಚರಂಡಿ ಬ್ಲಾಕ್ / ಮರ ಬಿದ್ದಿದೆ',

    // Landmarks
    locationGps: 'ಸ್ಥಳ ಮತ್ತು ಭೌಗೋಳಿಕ ಪ್ರದೇಶ',
    sensitiveProximity: 'ಸೂಕ್ಷ್ಮ ಸಾಮೀಪ್ಯ ಅಂಶ (GIS ಗುರುತಿಸಿದೆ)',
    selectLocationPreset: 'ಮುನ್ಸಿಪಲ್ ಸ್ಥಳ ಮಾದರಿ ಆಯ್ಕೆಮಾಡಿ:',
    languageOptions: 'ಭಾಷೆ / Language / Idioma / 语言',
    nearSchool: 'ಶಾಲಾ ಕ್ರಾಸಿಂಗ್ ಹತ್ತಿರ',
    nearBusStand: 'ಬಸ್ ನಿಲ್ದಾಣ / ಟರ್ಮಿನಲ್',
    nearHospital: 'ಆಸ್ಪತ್ರೆ / ಕ್ಲಿನಿಕ್ ಹತ್ತಿರ',
    nearMarket: 'ಮಾರುಕಟ್ಟೆ / ಅಂಗಡಿಗಳ ರಸ್ತೆ',
    nearHomes: 'ಮನೆಗಳ ವಸತಿ ಬಡಾವಣೆ',

    // Submissions & Status
    submitReport: 'ವರದಿ ಸಲ್ಲಿಸಿ ಮತ್ತು AI ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ',
    sendHelpButton: 'ಸಹಾಯಕ್ಕಾಗಿ ದೂರು ಕಳುಹಿಸಿ (ಶೀಘ್ರ ಪರಿಹಾರ)',
    sendingReport: 'ದೂರು ಸಲ್ಲಿಸಿ ತಂಡವನ್ನು ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...',
    reportSuccess: 'ದೂರು ಯಶಸ್ವಿಯಾಗಿ ತಲುಪಿದೆ!',
    ticketNumber: 'ದೂರು ಸಂಖ್ಯೆ',
    statusReceived: 'ದೂರು ಸ್ವೀಕರಿಸಲಾಗಿದೆ',
    statusDispatched: 'ರಿಪೇರಿ ಗಾಡಿ ಹೊರಟಿದೆ',
    statusResolved: 'ಸರಿಪಡಿಸಲಾಗಿದೆ!',
    listenStatus: 'ದೂರಿನ ಸ್ಥಿತಿ ಆಲಿಸಿ',

    // Placeholders
    titlePlaceholder: 'ಉದಾ: ಶಾಲೆಯ ಮುಂಭಾಗ ದೊಡ್ಡ ರಸ್ತೆ ಗುಂಡಿ ಬಿದ್ದಿದೆ',
    descPlaceholder: 'ಸಮಸ್ಯೆಯ ವಿವರ, ಅಪಾಯ ಅಥವಾ ವಾಹನಗಳ ತೊಂದರೆ ತಿಳಿಸಿ...',
    addressPlaceholder: 'ಉದಾ: 412 ಮೇಪಲ್‌ವುಡ್ ರಸ್ತೆ, ಉತ್ತರ ಕೇಂದ್ರ',
    chatPlaceholder: 'DamGo AI ಸಹಾಯಕರನ್ನು ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ...',
  },

  es: {
    citizenPortal: 'Portal Ciudadano',
    navCitizen: 'Portal Ciudadano',
    navCommand: 'Centro de Mando',
    navThreeCity: 'Ciudad Digital 3D',
    navLogic: 'Visualizador de IA',
    navHonesty: 'Transparencia y Auditoría',
    navJudgeTour: 'Paseo de Jurado',
    navDamGoAI: 'DamGo IA',
    subHeader: 'Plataforma de Acción Cívica Rápida DamGo',
    reportTitle: 'Reportar y Rastrear Incidencias Cívicas',
    quickReport: 'Reporte Rápido (<1 min)',
    liveTracker: 'Rastreador en Vivo',
    easyModeTitle: 'Modo Fácil Visual y de Voz (Para Todos)',
    easyModeSubtitle: 'Sin necesidad de escribir: toque fotos, hable o capture con cámara.',
    modeSimple: 'Modo Fácil (Fotos y Voz)',
    modeDetailed: 'Formulario Detallado',
    voiceGuideButton: 'Escuchar Instrucciones en Audio',
    voiceGuideScript: 'Bienvenido. Si ve un bache, fuga de agua, luz rota o basura, toque la cámara para tomar una foto. Luego hable al micrófono o toque una imagen. Enviaremos al equipo de reparación de inmediato.',
    step1Photo: 'Paso 1: Tomar Foto',
    step2Speak: 'Paso 2: Toque Imagen o Hable',
    step3Place: 'Paso 3: Seleccione Zona',
    step4Send: 'Paso 4: Enviar Solicitud',
    capturePhoto: '1. Capturar Foto en Vivo del Peligro',
    openCamera: 'Abrir Cámara en Vivo',
    sampleHazard: 'Cargar Ejemplo de Bache Escolar',
    retakeChange: 'Retomar / Cambiar Foto',
    takePhotoNow: 'Tomar Foto Ahora',
    useThisPhoto: 'Usar Esta Foto',
    retake: 'Repetir Foto',
    samplePhotos: 'Fotos de Muestra',
    whatHazard: '2. ¿Cuál es el peligro?',
    descContext: 'Descripción y Contexto de Seguridad',
    categoryHint: 'Sugerencia de Categoría',
    locationGps: 'Ubicación y Área Geográfica',
    sensitiveProximity: 'Factor de Proximidad Sensible (Detectado por SIG)',
    submitReport: 'Enviar Reporte Cívico e Iniciar Triaje IA',
    voiceNote: 'Grabar Nota de Voz / Dictado por Voz',
    listening: 'Escuchando... Describa el problema claramente',
    recordingDone: 'Nota de voz grabada',
    listenReport: 'Escuchar Reporte de Triaje IA',
    selectLocationPreset: 'Seleccionar Preajuste de Ubicación Municipal:',
    languageOptions: 'Idioma / Language / Idioma / 语言',
    audioOptions: 'Entrada de Voz y Dictado de Audio',
    tapToSpeak: 'Toque el micrófono y hable',
    speakingRecorded: '¡Voz grabada y agregada al reporte!',
    startRecording: 'Iniciar Grabación',
    stopRecording: 'Detener',
    playAudio: 'Reproducir',
    pauseAudio: 'Pausar',
    deleteAudio: 'Eliminar Audio',
    listenSummary: 'Escuchar Resumen de IA',
    catPothole: 'Bache en Calle',
    catWater: 'Fuga de Agua / Tubería Rota',
    catLight: 'Farola Rota u Oscura',
    catGarbage: 'Acumulación de Basura',
    catElectric: 'Peligro de Cables Eléctricos',
    catDrain: 'Drenaje Tapado / Árbol Caído',
    nearSchool: 'Cerca de Escuela',
    nearBusStand: 'Terminal de Autobús',
    nearHospital: 'Cerca de Hospital',
    nearMarket: 'Zona Comercial',
    nearHomes: 'Barrio Residencial',
    sendHelpButton: 'Enviar Solicitud de Ayuda',
    sendingReport: 'Enviando y Despachando...',
    reportSuccess: '¡Reporte Enviado con Éxito!',
    ticketNumber: 'Boleto #',
    statusReceived: 'Reporte Recibido',
    statusDispatched: 'Equipo en Camino',
    statusResolved: '¡Reparado y Solucionado!',
    listenStatus: 'Escuchar Estado Actual',
    titlePlaceholder: 'ej. Gran bache frente a la escuela',
    descPlaceholder: 'Describa el peligro y detalles de la vía...',
    addressPlaceholder: 'ej. 412 Maplewood Ave',
    chatPlaceholder: 'Pregunte a DamGo IA...',
  },

  hi: {
    citizenPortal: 'नागरिक पोर्टल',
    navCitizen: 'नागरिक रिपोर्ट (Citizen)',
    navCommand: 'कमांड सेंटर (Admin)',
    navThreeCity: '3D शहर दृश्य',
    navLogic: 'AI लॉजिक',
    navHonesty: 'पारदर्शिता ऑडिट',
    navJudgeTour: 'जज टूर',
    navDamGoAI: 'DamGo AI सहायक',
    subHeader: 'DamGo त्वरित नागरिक प्रतिक्रिया मंच',
    reportTitle: 'नागरिक समस्याओं की रिपोर्ट और ट्रैकिंग करें',
    quickReport: 'त्वरित रिपोर्ट (<1 मिनट)',
    liveTracker: 'लाइव ट्रैकर',
    easyModeTitle: 'आसान विज़ुअल और वॉइस मोड (सभी के लिए)',
    easyModeSubtitle: 'टाइपिंग की ज़रूरत नहीं — फोटो छुएं, बोलें या कैमरा दबाएं!',
    modeSimple: 'सरल मोड (चित्र और आवाज़)',
    modeDetailed: 'विस्तृत फॉर्म',
    voiceGuideButton: 'निर्देश ऑडियो में सुनें',
    voiceGuideScript: 'नमस्ते! सड़क पर गड्ढा, पानी रिसाव, खराब लाइट या कचरा दिखने पर नीचे कैमरा दबाकर फोटो लें। फिर माइक दबाकर बोलें और भेजें। सरकारी टीम आकर तुरंत ठीक करेगी।',
    step1Photo: 'चरण 1: फोटो लें',
    step2Speak: 'चरण 2: चित्र छुएं या बोलें',
    step3Place: 'चरण 3: अपनी जगह चुनें',
    step4Send: 'चरण 4: मदद के लिए भेजें',
    capturePhoto: '1. खतरे की लाइव फोटो लें',
    openCamera: 'लाइव कैमरा खोलें',
    sampleHazard: 'स्कूल गड्ढे का नमूना लोड करें',
    retakeChange: 'फिर से फोटो लें / बदलें',
    takePhotoNow: 'अभी लाइव फोटो खींचें',
    useThisPhoto: 'यह फोटो इस्तेमाल करें',
    retake: 'दोबारा फोटो लें',
    samplePhotos: 'नमूना फोटो',
    whatHazard: '2. खतरा क्या है?',
    descContext: 'विवरण और सुरक्षा संदर्भ',
    categoryHint: 'श्रेणी संकेत',
    locationGps: 'स्थान और भौगोलिक क्षेत्र',
    sensitiveProximity: 'संवेदनशील निकटता कारक (GIS द्वारा पता लगाया गया)',
    submitReport: 'रिपोर्ट सबमिट करें और AI ट्राइएज शुरू करें',
    voiceNote: 'वॉयस नोट रिकॉर्ड करें / बोलकर लिखें',
    listening: 'सुन रहा हूँ... कृपया अपनी समस्या स्पष्ट रूप से बोलें',
    recordingDone: 'वॉयस नोट रिकॉर्ड हो गया',
    listenReport: 'AI ट्राइएज रिपोर्ट सुनें',
    selectLocationPreset: 'त्वरित नगर पालिका स्थान पूर्व निर्धारित चुनें:',
    languageOptions: 'भाषा / Language / Idioma / 语言',
    audioOptions: 'ऑडियो वॉयस इनपुट और डिक्टेशन',
    tapToSpeak: 'माइक दबाकर बोलें (टाइपिंग की ज़रूरत नहीं)',
    speakingRecorded: 'आपकी आवाज़ रिकॉर्ड हो गई!',
    startRecording: 'रिकॉर्डिंग शुरू करें',
    stopRecording: 'रोकें',
    playAudio: 'चलाएं',
    pauseAudio: 'रोकें',
    deleteAudio: 'ऑडियो हटाएं',
    listenSummary: 'AI सारांश सुनें',
    catPothole: 'सड़क का गड्ढा',
    catWater: 'पानी का रिसाव / फूटा पाइप',
    catLight: 'खराब स्ट्रीटलाइट / अंधेरा',
    catGarbage: 'कचरे का ढेर / गंदगी',
    catElectric: 'बिजली के तार का खतरा',
    catDrain: 'बंद नाला / गिरा पेड़',
    nearSchool: 'स्कूल के पास',
    nearBusStand: 'बस स्टैंड',
    nearHospital: 'अस्पताल के पास',
    nearMarket: 'बाज़ार / दुकान',
    nearHomes: 'आवासीय कॉलोनी',
    sendHelpButton: 'मदद के लिए शिकायत भेजें (तुरंत मरम्मत)',
    sendingReport: 'शिकायत भेजी जा रही है...',
    reportSuccess: 'शिकायत सफलतापूर्वक दर्ज हो गई!',
    ticketNumber: 'टिकट संख्या',
    statusReceived: 'शिकायत प्राप्त हुई',
    statusDispatched: 'मरम्मत टीम रवाना हो गई',
    statusResolved: 'ठीक कर दिया गया!',
    listenStatus: 'वर्तमान स्थिति सुनें',
    titlePlaceholder: 'जैसे: स्कूल के सामने सड़क पर गहरा गड्ढा',
    descPlaceholder: 'समस्या का विवरण और स्थान बताएं...',
    addressPlaceholder: 'जैसे: 412 मेपलवुड रोड',
    chatPlaceholder: 'DamGo AI से सवाल पूछें...',
  },

  te: {
    citizenPortal: 'పౌర పోర్టల్',
    navCitizen: 'పౌర ఫిర్యాదు (Citizen)',
    navCommand: 'కమాండ్ సెంటర్ (Admin)',
    navThreeCity: '3D నగర దృశ్యం',
    navLogic: 'AI లాజిక్',
    navHonesty: 'పారదర్శకత ఆడిట్',
    navJudgeTour: 'డెమో టూర్',
    navDamGoAI: 'DamGo AI సహాయకుడు',
    subHeader: 'DamGo తక్షణ పౌర స్పందన వేదిక',
    reportTitle: 'పౌర సమస్యలను నివేదించండి & ట్రాక్ చేయండి',
    quickReport: 'త్వరిత నివేదిక (<1 నిమిషం)',
    liveTracker: 'ప్రత్యక్ష ట్రాకర్',
    easyModeTitle: 'సులభ దృశ్య & వాయిస్ మోడ్ (అందరి కోసం)',
    easyModeSubtitle: 'రాయాల్సిన పనిలేదు — ఫోటోను తాకండి, మాట్లాడండి లేదా కెమెరాతో ఫోటో తీయండి!',
    modeSimple: 'సులభ మోడ్ (చిత్రాలు & వాయిస్)',
    modeDetailed: 'వివరమైన ఫారం',
    voiceGuideButton: 'సూచనలను వినండి (ఆడియో)',
    voiceGuideScript: 'స్వాగతం! రోడ్డు గుంత, నీటి లీకేజీ, వీధి దీపం పాడవడం లేదా చెత్త కనిపిస్తే కింద కెమెరా నొక్కి ఫోటో తీయండి. మైక్ నొక్కి మాట్లాడండి, పంపండి. రిపేర్ బృందం వచ్చి బాగుచేస్తుంది.',
    step1Photo: 'దశ 1: ఫోటో తీయండి',
    step2Speak: 'దశ 2: చిత్రాన్ని తాకండి లేదా మాట్లాడండి',
    step3Place: 'దశ 3: మీ సమీప ప్రాంతం ఎంచుకోండి',
    step4Send: 'దశ 4: సహాయం కోసం పంపండి',
    capturePhoto: '1. ప్రమాద స్థలాన్ని ప్రత్యక్షంగా ఫోటో తీయండి',
    openCamera: 'లైవ్ కెమెరాను తెరవండి',
    sampleHazard: 'పాఠశాల గుంత నమూనాను లోడ్ చేయండి',
    retakeChange: 'మళ్లీ ఫోటో తీయండి / మార్చండి',
    takePhotoNow: 'ఇప్పుడే ఫోటో తీయండి',
    useThisPhoto: 'ఈ ఫోటోను వాడండి',
    retake: 'మళ్లీ తీయండి',
    samplePhotos: 'నమూనా ఫోటోలు',
    whatHazard: '2. సమస్య లేదా ప్రమాదం ఏమిటి?',
    descContext: 'సమస్య వివరణ మరియు భద్రతా సమాచారం',
    categoryHint: 'వర్గం సూచన',
    locationGps: 'స్థానం మరియు భౌగోళిక ప్రాంతం',
    sensitiveProximity: 'సున్నితమైన ప్రాంతం (GIS ద్వారా గుర్తించబడింది)',
    submitReport: 'సమస్యను సమర్పించండి & AI విశ్లేషణ ప్రారంభించండి',
    voiceNote: 'వాయిస్ నోట్ రికార్డ్ చేయండి / మాట్లాడి టైప్ చేయండి',
    listening: 'వింటున్నాను... మీ సమస్యను స్పష్టంగా మాట్లాడండి',
    recordingDone: 'వాయిస్ నోట్ రికార్డ్ చేయబడింది',
    listenReport: 'AI విశ్లేషణ నివేదికను వినండి',
    selectLocationPreset: 'మునిసిపల్ ప్రాంత నమూనాను ఎంచుకోండి:',
    languageOptions: 'భాష / Language / Idioma / 语言',
    audioOptions: 'ఆడియో వాయిస్ ఇన్‌పుట్ మరియు డిక్టేషన్',
    tapToSpeak: 'మైక్ నొక్కి మాట్లాడండి (రాయాల్సిన పనిలేదు)',
    speakingRecorded: 'మీ వాయిస్ రికార్డ్ అయింది!',
    startRecording: 'రికార్డింగ్ ప్రారంభించండి',
    stopRecording: 'ఆపండి',
    playAudio: 'వినండి',
    pauseAudio: 'పాజ్',
    deleteAudio: 'ఆడియో తొలగించండి',
    listenSummary: 'AI సారాంశం వినండి',
    catPothole: 'రోడ్డు గుంత',
    catWater: 'నీటి లీకేజీ / పైపు పగలడం',
    catLight: 'వీధి దీపం వెలగడం లేదు',
    catGarbage: 'చెత్త కుప్ప / మురికి',
    catElectric: 'కరెంట్ తీగల ప్రమాదం',
    catDrain: 'కాలువ మూసుకుపోవడం / చెట్టు కూలడం',
    nearSchool: 'పాఠశాల దగ్గర',
    nearBusStand: 'బస్ స్టాండ్',
    nearHospital: 'ఆసుపత్రి దగ్గర',
    nearMarket: 'మార్కెట్ / దుకాణాలు',
    nearHomes: 'ఇళ్ల కాలనీ',
    sendHelpButton: 'సహాయం కోసం పంపండి (త్వరిత మరమ్మతు)',
    sendingReport: 'ఫిర్యాదు సమర్పించబడుతోంది...',
    reportSuccess: 'ఫిర్యాదు విజయవంతంగా అందింది!',
    ticketNumber: 'ఫిర్యాదు సంఖ్య',
    statusReceived: 'ఫిర్యాదు అందింది',
    statusDispatched: 'మరమ్మతు బృందం బయలుదేరింది',
    statusResolved: 'బాగుచేయబడింది!',
    listenStatus: 'ప్రస్తుత స్థితిని వినండి',
    titlePlaceholder: 'ఉదా: పాఠశాల ముందు రోడ్డుపై పెద్ద గుంత',
    descPlaceholder: 'సమస్య వివరాలు చెప్పండి...',
    addressPlaceholder: 'ఉదా: 412 మేపుల్‌వుడ్ రోడ్',
    chatPlaceholder: 'DamGo AI ని అడగండి...',
  },

  zh: {
    citizenPortal: '市民门户',
    navCitizen: '市民门户',
    navCommand: '指挥中心',
    navThreeCity: '3D数字孪生',
    navLogic: 'AI算法分析',
    navHonesty: '透明审计',
    navJudgeTour: '评委演示',
    navDamGoAI: 'DamGo AI助手',
    subHeader: '都会港湾快速市政响应平台',
    reportTitle: '报告并追踪城市市政缺陷',
    quickReport: '快速报告 (<1分钟)',
    liveTracker: '实时跟踪器',
    easyModeTitle: '无障碍图文语音模式（所有人适用）',
    easyModeSubtitle: '无需文字输入，点击图片、说出问题或打开相机即可！',
    modeSimple: '极简图文模式',
    modeDetailed: '详细报表模式',
    voiceGuideButton: '收听语音指南',
    voiceGuideScript: '您好！如遇道路破损、水管漏水、路灯故障或垃圾堆积，请点击大相机拍照，按住麦克风说话或点击图标。维修队将立即赶赴现场处理。',
    step1Photo: '第1步：拍照取证',
    step2Speak: '第2步：点击图标或说话',
    step3Place: '第3步：选择地标区域',
    step4Send: '第4步：一键报修',
    capturePhoto: '1. 现场拍摄危险照片',
    openCamera: '打开实时相机',
    sampleHazard: '加载学校坑洼测试样本',
    retakeChange: '重新拍照 / 更换照片',
    takePhotoNow: '立即拍照',
    useThisPhoto: '使用此照片',
    retake: '重拍',
    samplePhotos: '预设样本',
    whatHazard: '2. 存在什么危险情况？',
    descContext: '详细描述与安全背景',
    categoryHint: '故障类别参考',
    locationGps: '具体位置与地理区域',
    sensitiveProximity: '敏感区域邻近因子 (GIS地理信息系统自动识别)',
    submitReport: '提交市政报告并启动AI分流',
    voiceNote: '录制语音备忘录 / 语音转文字输入',
    listening: '正在聆听... 请清晰描述现场缺陷',
    recordingDone: '语音备忘录录制完成',
    listenReport: '听取AI分流评估报告',
    selectLocationPreset: '选择市政重点管辖区域预设：',
    languageOptions: '语言 / Language / Idioma / 语言',
    audioOptions: '音频语音输入与朗读',
    tapToSpeak: '点击麦克风说话（免打字）',
    speakingRecorded: '语音已成功录入报修单！',
    startRecording: '开始录音',
    stopRecording: '停止录音',
    playAudio: '播放',
    pauseAudio: '暂停',
    deleteAudio: '删除音频',
    listenSummary: '听取AI摘要',
    catPothole: '道路坑洼',
    catWater: '水管破裂 / 漏水',
    catLight: '路灯熄灭 / 损坏',
    catGarbage: '垃圾堆积 / 环卫',
    catElectric: '电线裸露火花',
    catDrain: '排水管堵塞 / 倒伏树木',
    nearSchool: '学校路口附近',
    nearBusStand: '公交车站枢纽',
    nearHospital: '医院诊所附近',
    nearMarket: '集市商圈',
    nearHomes: '居民小区',
    sendHelpButton: '立即报修 (快速派工)',
    sendingReport: '正在分流派单中...',
    reportSuccess: '工单已成功送达！',
    ticketNumber: '工单号',
    statusReceived: '已受理',
    statusDispatched: '抢修队已出发',
    statusResolved: '已完成修复！',
    listenStatus: '语音播报当前进度',
    titlePlaceholder: '例如：学校人行横道处路面大坑',
    descPlaceholder: '描述具体情况或标志性建筑物...',
    addressPlaceholder: '例如：枫木大道412号',
    chatPlaceholder: '向DamGo AI提问...',
  },

  fr: {
    citizenPortal: 'Portail Citoyen',
    navCitizen: 'Portail Citoyen',
    navCommand: 'Centre de Commandement',
    navThreeCity: 'Jumeau 3D Urbain',
    navLogic: 'Analyse IA',
    navHonesty: 'Audit & Intégrité',
    navJudgeTour: 'Visite Démo',
    navDamGoAI: 'DamGo IA',
    subHeader: 'Intervention Civique Rapide de Metro Haven',
    reportTitle: 'Signaler et Suivre les Incidents Urbains',
    quickReport: 'Signalement Rapide (<1 min)',
    liveTracker: 'Suivi en Direct',
    easyModeTitle: 'Mode Visuel et Vocal Simple (Pour Tous)',
    easyModeSubtitle: 'Aucune saisie requise : touchez une image, parlez ou prenez une photo !',
    modeSimple: 'Mode Simple (Images & Voix)',
    modeDetailed: 'Formulaire Détaillé',
    voiceGuideButton: 'Écouter les Instructions Audio',
    voiceGuideScript: 'Bienvenue. En cas de nid-de-poule, fuite d\'eau ou déchet, prenez une photo ou appuyez sur le micro pour parler. Une équipe municipale interviendra rapidement.',
    step1Photo: 'Étape 1 : Prendre une Photo',
    step2Speak: 'Étape 2 : Touchez ou Parlez',
    step3Place: 'Étape 3 : Choisissez la Zone',
    step4Send: 'Étape 4 : Envoyer l\'Alerte',
    capturePhoto: '1. Prendre une Photo en Direct du Danger',
    openCamera: 'Ouvrir la Caméra en Direct',
    sampleHazard: 'Charger un Exemple de Nid-de-Poule Scolaire',
    retakeChange: 'Reprendre / Changer la Photo',
    takePhotoNow: 'Prendre Photo Maintenant',
    useThisPhoto: 'Utiliser cette Photo',
    retake: 'Reprendre',
    samplePhotos: 'Photos d\'Exemples',
    whatHazard: '2. Quel est le danger identifié ?',
    descContext: 'Description et Contexte de Sécurité',
    categoryHint: 'Indication de Catégorie',
    locationGps: 'Localisation et Zone Géographique',
    sensitiveProximity: 'Facteur de Proximité Sensible (Détecté par SIG)',
    submitReport: 'Soumettre le Rapport et Lancer le Triage IA',
    voiceNote: 'Enregistrer une Note Vocale / Dictée',
    listening: 'Écoute en cours... Parlez clairement',
    recordingDone: 'Note vocale enregistrée',
    listenReport: 'Écouter le Rapport de Triage IA',
    selectLocationPreset: 'Sélectionner un Emplacement Municipal Prédéfini :',
    languageOptions: 'Langue / Language / Idioma / 语言',
    audioOptions: 'Saisie Vocale Audio et Lecture',
    tapToSpeak: 'Appuyez sur le micro et parlez',
    speakingRecorded: 'Voix enregistrée !',
    startRecording: 'Démarrer l\'Enregistrement',
    stopRecording: 'Arrêter',
    playAudio: 'Écouter',
    pauseAudio: 'Pause',
    deleteAudio: 'Supprimer',
    listenSummary: 'Écouter le Résumé IA',
    catPothole: 'Nid-de-poule',
    catWater: 'Fuite d\'eau / Rupture de canalisation',
    catLight: 'Éclairage public en panne',
    catGarbage: 'Dépôt sauvage de déchets',
    catElectric: 'Câble électrique dangereux',
    catDrain: 'Égout bouché / Arbre tombé',
    nearSchool: 'Près d\'une École',
    nearBusStand: 'Gare / Arrêt de Bus',
    nearHospital: 'Près d\'un Hôpital',
    nearMarket: 'Zone Commerciale',
    nearHomes: 'Quartier Résidentiel',
    sendHelpButton: 'Envoyer la Demande de Réparation',
    sendingReport: 'Envoi en cours...',
    reportSuccess: 'Signalement envoyé avec succès !',
    ticketNumber: 'Ticket N°',
    statusReceived: 'Reçu par les services',
    statusDispatched: 'Équipe en route',
    statusResolved: 'Réparé et nettoyé !',
    listenStatus: 'Écouter le statut actuel',
    titlePlaceholder: 'ex: Gros nid-de-poule devant l\'école',
    descPlaceholder: 'Décrivez le danger ou repères...',
    addressPlaceholder: 'ex: 412 Avenue Maplewood',
    chatPlaceholder: 'Poser une question à DamGo IA...',
  },

  tl: {
    citizenPortal: 'Portal ng Mamamayan',
    navCitizen: 'Ulat Mamamayan',
    navCommand: 'Sentro ng Operasyon',
    navThreeCity: '3D Lungsod',
    navLogic: 'AI Lohika',
    navHonesty: 'Pagsusuri at Katapatan',
    navJudgeTour: 'Tour ng Hurado',
    navDamGoAI: 'DamGo AI Gabay',
    subHeader: 'Mabilis na Tugon ng Lungsod',
    reportTitle: 'Iulat at Subaybayan ang mga Isyu sa Komunidad',
    quickReport: 'Mabilis na Ulat (<1 min)',
    liveTracker: 'Live na Tagasubaybay',
    easyModeTitle: 'Madaling Visual at Boses na Mode (Para sa Lahat)',
    easyModeSubtitle: 'Hindi kailangang mag-type — pindutin ang larawan, magsalita, o kumuha ng litrato!',
    modeSimple: 'Simpleng Mode (Larawan at Boses)',
    modeDetailed: 'Detalyadong Form',
    voiceGuideButton: 'Pakinggan ang Tagubilin',
    voiceGuideScript: 'Maligayang pagdating. Kung may lubak, tagas ng tubig, sirang ilaw o basura, pindutin ang camera para kumuha ng litrato o pindutin ang mic para magsalita. Darating agad ang rescue team.',
    step1Photo: 'Hakbang 1: Kumuha ng Litrato',
    step2Speak: 'Hakbang 2: Pindutin ang Larawan o Magsalita',
    step3Place: 'Hakbang 3: Piliin ang Lugar',
    step4Send: 'Hakbang 4: Ipadala ang Kahilingan',
    capturePhoto: '1. Kumuha ng Live na Larawan ng Panganib',
    openCamera: 'Buksan ang Live Camera',
    sampleHazard: 'I-load ang Halimbawa ng Lubak sa Paaralan',
    retakeChange: 'Kumuha Muli / Palitan ang Larawan',
    takePhotoNow: 'Kumuha ng Litrato Ngayon',
    useThisPhoto: 'Gamitin ang Larawang Ito',
    retake: 'Ulitin',
    samplePhotos: 'Mga Halimbawang Larawan',
    whatHazard: '2. Ano ang panganib?',
    descContext: 'Paglalarawan at Konteksto ng Kaligtasan',
    categoryHint: 'Kategorya',
    locationGps: 'Lokasyon at Heograpikong Lugar',
    sensitiveProximity: 'Sensitibong Lugar (Natukoy ng GIS)',
    submitReport: 'Isumite ang Ulat at Simulan ang AI Triage',
    voiceNote: 'Mag-record ng Boses / Voice Dictation',
    listening: 'Nakikinig... Sabihin nang malinaw ang isyu',
    recordingDone: 'Na-record na ang boses',
    listenReport: 'Pakinggan ang Ulat ng AI Triage',
    selectLocationPreset: 'Pumili ng Preset na Lokasyon sa Lungsod:',
    languageOptions: 'Wika / Language / Idioma / 语言',
    audioOptions: 'Audio Voice Input at Dictation',
    tapToSpeak: 'Pindutin ang Mic at Magsalita (Walang typing)',
    speakingRecorded: 'Naitala ang iyong boses!',
    startRecording: 'Simulan ang Pag-record',
    stopRecording: 'Ihinto',
    playAudio: 'Pakinggan',
    pauseAudio: 'I-pause',
    deleteAudio: 'Burahin',
    listenSummary: 'Pakinggan ang Buod ng AI',
    catPothole: 'Lubak sa Kalsada',
    catWater: 'Tagas ng Tubig / Putok na Tubo',
    catLight: 'Sirang Ilaw sa Daan',
    catGarbage: 'Tambak ng Basura',
    catElectric: 'Panganib sa Kable ng Kuryente',
    catDrain: 'Baradong Kanal / Nabuwal na Puno',
    nearSchool: 'Malapit sa Paaralan',
    nearBusStand: 'Sakayan ng Bus',
    nearHospital: 'Malapit sa Ospital',
    nearMarket: 'Palengke o Pamilihan',
    nearHomes: 'Lugar ng Tirahan',
    sendHelpButton: 'Ipadala ang Ulat (Mabilisang Ayos)',
    sendingReport: 'Ipinapadala ang ulat...',
    reportSuccess: 'Matagumpay na naipadala ang ulat!',
    ticketNumber: 'Ticket Blg.',
    statusReceived: 'Natanggap ang Ulat',
    statusDispatched: 'Papunta na ang Repair Team',
    statusResolved: 'Naayos at Nalinis Na!',
    listenStatus: 'Pakinggan ang Katayuan',
    titlePlaceholder: 'Hal: Malaking lubak sa tawiran ng paaralan',
    descPlaceholder: 'Ilarawan ang problema at landmark...',
    addressPlaceholder: 'Hal: 412 Maplewood Ave',
    chatPlaceholder: 'Magtanong kay DamGo AI...',
  },

  ar: {
    citizenPortal: 'بوابة المواطن',
    navCitizen: 'بوابة المواطن',
    navCommand: 'مركز العمليات',
    navThreeCity: 'توأم المدينة ثلاثي الأبعاد',
    navLogic: 'تحليل الذكاء الاصطناعي',
    navHonesty: 'الشفافية والتدقيق',
    navJudgeTour: 'جولة الحكام',
    navDamGoAI: 'مساعد DamGo الذكي',
    subHeader: 'الاستجابة المدنية السريعة لمترو هافن',
    reportTitle: 'الإبلاغ عن المشكلات المدنية ومتابعتها',
    quickReport: 'تقرير سريع (أقل من دقيقة)',
    liveTracker: 'المتابعة المباشرة',
    easyModeTitle: 'الوضع البصري والصوتي السهل (للجميع)',
    easyModeSubtitle: 'لا حاجة للكتابة — المس الصورة أو تحدث بصوتك للإبلاغ الفوري!',
    modeSimple: 'الوضع البسيط (صور وصوت)',
    modeDetailed: 'النموذج التفصيلي',
    voiceGuideButton: 'الاستماع للإرشادات الصوتية',
    voiceGuideScript: 'أهلاً بكم. إذا رأيت حفرة في الطريق أو تسرب مياه أو إنارة معطلة، اضغط زر الكاميرا لالتقاط صورة، ثم اضغط الميكروفون للتحدث وسيقوم فريق الصيانة بالإصلاح فوراً.',
    step1Photo: 'الخطوة 1: التقاط صورة',
    step2Speak: 'الخطوة 2: المس الصورة أو تحدث',
    step3Place: 'الخطوة 3: اختر الموقع القريب',
    step4Send: 'الخطوة 4: إرسال طلب المساعدة',
    capturePhoto: '1. التقاط صورة حية للخطر',
    openCamera: 'فتح الكاميرا المباشرة',
    sampleHazard: 'تحميل نموذج حفرة الشارع المدرسي',
    retakeChange: 'إعادة التقاط / تغيير الصورة',
    takePhotoNow: 'التقاط الصورة الآن',
    useThisPhoto: 'استخدام هذه الصورة',
    retake: 'إعادة الالتقاط',
    samplePhotos: 'عينات جاهزة',
    whatHazard: '2. ما هو الخطر الملاحظ؟',
    descContext: 'الوصف وسياق السلامة العامة',
    categoryHint: 'تصنيف المشكلة',
    locationGps: 'الموقع والمنطقة الجغرافية',
    sensitiveProximity: 'عامل القرب الحساس (تم اكتشافه بواسطة نظم المعلومات الجغرافية)',
    submitReport: 'إرسال البلاغ وبدء الفرز بالذكاء الاصطناعي',
    voiceNote: 'تسجيل ملاحظة صوتية / تحويل الصوت إلى نص',
    listening: 'جارٍ الاستماع... يرجى التحدث بوضوح',
    recordingDone: 'تم تسجيل الملاحظة الصوتية',
    listenReport: 'الاستماع لتقرير الفرز الذكي',
    selectLocationPreset: 'اختر موقعاً بلدياً محدداً مسبقاً:',
    languageOptions: 'اللغة / Language / Idioma / 语言',
    audioOptions: 'الإدخال الصوتي والإملاء',
    tapToSpeak: 'اضغط الميكروفون وتحدث (بدون كتابة)',
    speakingRecorded: 'تم تسجيل صوتك بنجاح!',
    startRecording: 'بدء التسجيل',
    stopRecording: 'إيقاف',
    playAudio: 'تشغيل',
    pauseAudio: 'إيقاف مؤقت',
    deleteAudio: 'حذف التسجيل',
    listenSummary: 'سماع ملخص الذكاء الاصطناعي',
    catPothole: 'حفرة في الشارع',
    catWater: 'تسرب مياه / أنبوب مكسور',
    catLight: 'عمود إنارة معطل',
    catGarbage: 'تراكم النفايات',
    catElectric: 'خطر أسلاك كهربائية مكشوفة',
    catDrain: 'انسداد الصرف / شجرة ساقطة',
    nearSchool: 'بالقرب من المدرسة',
    nearBusStand: 'محطة الحافلات',
    nearHospital: 'بالقرب من المستشفى',
    nearMarket: 'السوق والمتاجر',
    nearHomes: 'حي سكني',
    sendHelpButton: 'إرسال طلب الإصلاح فوراً',
    sendingReport: 'جارٍ إرسال البلاغ وتوجيه الفريق...',
    reportSuccess: 'تم إرسال البلاغ بنجاح!',
    ticketNumber: 'رقم التذكرة',
    statusReceived: 'تم استلام البلاغ',
    statusDispatched: 'فريق الصيانة في الطريق',
    statusResolved: 'تم الإصلاح بنجاح!',
    listenStatus: 'الاستماع إلى حالة البلاغ',
    titlePlaceholder: 'مثال: حفرة عميقة أمام المدرسة',
    descPlaceholder: 'صف المشكلة والمعالم القريبة...',
    addressPlaceholder: 'مثال: 412 شارع مابل وود',
    chatPlaceholder: 'اسأل مساعد DamGo...',
  },

  de: {
    citizenPortal: 'Bürgerportal',
    navCitizen: 'Bürgermeldung',
    navCommand: 'Kommandozentrale',
    navThreeCity: '3D-Stadtzwilling',
    navLogic: 'KI-Logik-Visualisierung',
    navHonesty: 'Transparenz & Audit',
    navJudgeTour: 'Jury-Tour',
    navDamGoAI: 'DamGo KI-Assistent',
    subHeader: 'Metro Haven Schnelle Zivilreaktion',
    reportTitle: 'Bürgermeldungen Erfassen & Nachverfolgen',
    quickReport: 'Schnellmeldung (<1 Min.)',
    liveTracker: 'Live-Tracker',
    easyModeTitle: 'Einfacher Bild- & Sprachmodus (Für alle)',
    easyModeSubtitle: 'Kein Tippen nötig: Bild antippen, sprechen oder Foto aufnehmen!',
    modeSimple: 'Einfacher Modus (Bilder & Sprache)',
    modeDetailed: 'Ausführliches Formular',
    voiceGuideButton: 'Sprachanleitung anhören',
    voiceGuideScript: 'Willkommen. Wenn Sie ein Schlagloch, Wasserleck oder Müll sehen, tippen Sie auf die Kamera oder sprechen Sie ins Mikrofon. Wir schicken umgehend ein Reparaturteam.',
    step1Photo: 'Schritt 1: Foto aufnehmen',
    step2Speak: 'Schritt 2: Antippen oder Sprechen',
    step3Place: 'Schritt 3: Standort wählen',
    step4Send: 'Schritt 4: Hilfe anfordern',
    capturePhoto: '1. Live-Foto der Gefahrenstelle aufnehmen',
    openCamera: 'Live-Kamera Öffnen',
    sampleHazard: 'Schul-Schlagloch-Muster Laden',
    retakeChange: 'Erneut Aufnehmen / Foto Ändern',
    takePhotoNow: 'Jetzt Foto aufnehmen',
    useThisPhoto: 'Dieses Foto verwenden',
    retake: 'Wiederholen',
    samplePhotos: 'Beispielfotos',
    whatHazard: '2. Welche Gefahr liegt vor?',
    descContext: 'Beschreibung und Sicherheitskontext',
    categoryHint: 'Kategorie-Hinweis',
    locationGps: 'Standort & Geografisches Gebiet',
    sensitiveProximity: 'Sensibler Näherungsfaktor (GIS-Erkannt)',
    submitReport: 'Meldung Einreichen & KI-Triage Starten',
    voiceNote: 'Sprachnotiz Aufnehmen / Sprache-zu-Text',
    listening: 'Zuhören... Bitte beschreiben Sie den Defekt deutlich',
    recordingDone: 'Sprachnotiz aufgenommen',
    listenReport: 'KI-Triage-Bericht Vorlesen',
    selectLocationPreset: 'Vordefinierten Stadtbezirk Auswählen:',
    languageOptions: 'Sprache / Language / Idioma / 语言',
    audioOptions: 'Audio-Spracheingabe & Diktierfunktion',
    tapToSpeak: 'Mikrofon drücken & sprechen',
    speakingRecorded: 'Stimme aufgezeichnet!',
    startRecording: 'Aufnahme starten',
    stopRecording: 'Stopp',
    playAudio: 'Abspielen',
    pauseAudio: 'Pause',
    deleteAudio: 'Löschen',
    listenSummary: 'KI-Zusammenfassung vorlesen',
    catPothole: 'Schlagloch',
    catWater: 'Wasserleck / Rohrbruch',
    catLight: 'Straßenlaterne defekt',
    catGarbage: 'Müllansammlung',
    catElectric: 'Gefahr durch Stromkabel',
    catDrain: 'Gully verstopft / Baum gefallen',
    nearSchool: 'Nahe Schulüberweg',
    nearBusStand: 'Busbahnhof / Haltestelle',
    nearHospital: 'Nahe Krankenhaus',
    nearMarket: 'Marktplatz / Gewerbe',
    nearHomes: 'Wohnviertel',
    sendHelpButton: 'Hilferuf Senden (Sofortreparatur)',
    sendingReport: 'Meldung wird übermittelt...',
    reportSuccess: 'Erfolgreich gemeldet!',
    ticketNumber: 'Ticket-Nr.',
    statusReceived: 'Meldung eingegangen',
    statusDispatched: 'Reparaturteam unterwegs',
    statusResolved: 'Behoben und repariert!',
    listenStatus: 'Aktuellen Status anhören',
    titlePlaceholder: 'z.B. Tiefes Schlagloch vor der Schule',
    descPlaceholder: 'Gefahrenlage und Details beschreiben...',
    addressPlaceholder: 'z.B. Maplewood Ave 412',
    chatPlaceholder: 'DamGo KI fragen...',
  },
};

// Helper function to safely get string with English fallback
export function getUIString(lang: LanguageCode, key: string): string {
  const langStrings = UI_STRINGS[lang];
  if (langStrings && langStrings[key]) {
    return langStrings[key];
  }
  return UI_STRINGS.en[key] || key;
}

// Translate Issue Category to native language
export function translateCategory(category: string, lang: LanguageCode): string {
  if (lang === 'kn') {
    switch (category) {
      case 'Pothole & Road Hazard':
        return 'ರಸ್ತೆ ಗುಂಡಿ ಮತ್ತು ರಸ್ತೆ ಅಪಾಯ';
      case 'Water & Drainage':
        return 'ನೀರು ಸೋರಿಕೆ ಮತ್ತು ಚರಂಡಿ';
      case 'Waste & Sanitation':
        return 'ಕಸದ ರಾಶಿ ಮತ್ತು ನೈರ್ಮಲ್ಯ';
      case 'Electrical & Lighting':
        return 'ವಿದ್ಯುತ್ ತಂತಿ ಮತ್ತು ಬೀದಿ ದೀಪ';
      case 'Public Park & Safety':
        return 'ಉದ್ಯಾನವನ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಸುರಕ್ಷತೆ';
      case 'Traffic & Signals':
        return 'ಟ್ರಾಫಿಕ್ ಮತ್ತು ಸಿಗ್ನಲ್ ದೋಷ';
      default:
        return category;
    }
  } else if (lang === 'hi') {
    switch (category) {
      case 'Pothole & Road Hazard':
        return 'सड़क गड्ढा व खतरा';
      case 'Water & Drainage':
        return 'जल रिसाव व जल निकासी';
      case 'Waste & Sanitation':
        return 'कचरा व स्वच्छता';
      case 'Electrical & Lighting':
        return 'बिजली व स्ट्रीटलाइट';
      case 'Public Park & Safety':
        return 'सार्वजनिक पार्क व सुरक्षा';
      case 'Traffic & Signals':
        return 'ट्रैफिक व सिग्नल';
      default:
        return category;
    }
  } else if (lang === 'te') {
    switch (category) {
      case 'Pothole & Road Hazard':
        return 'రోడ్డు గుంత & ప్రమాదం';
      case 'Water & Drainage':
        return 'నీరు & డ్రైనేజీ';
      case 'Waste & Sanitation':
        return 'చెత్త & పారిశుధ్యం';
      case 'Electrical & Lighting':
        return 'విద్యుత్ & లైటింగ్';
      case 'Public Park & Safety':
        return 'పార్కు & ప్రజా భద్రత';
      case 'Traffic & Signals':
        return 'ట్రాఫిక్ & సిగ్నల్స్';
      default:
        return category;
    }
  } else if (lang === 'es') {
    switch (category) {
      case 'Pothole & Road Hazard':
        return 'Bache y Peligro Vial';
      case 'Water & Drainage':
        return 'Agua y Drenaje';
      case 'Waste & Sanitation':
        return 'Basura y Saneamiento';
      case 'Electrical & Lighting':
        return 'Electricidad e Iluminación';
      case 'Public Park & Safety':
        return 'Parque y Seguridad Pública';
      case 'Traffic & Signals':
        return 'Tráfico y Señalización';
      default:
        return category;
    }
  }
  return category;
}

// Translate Issue Status to native language
export function translateStatus(status: string, lang: LanguageCode): string {
  if (lang === 'kn') {
    switch (status) {
      case 'Reported':
        return 'ದೂರು ದಾಖಲಾಗಿದೆ (Received)';
      case 'Triaged':
        return 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ (Verified)';
      case 'Dispatched':
        return 'ರಿಪೇರಿ ತಂಡ ಹೊರಟಿದೆ (On The Way)';
      case 'Resolved':
        return 'ಸರಿಪಡಿಸಲಾಗಿದೆ (Fixed & Clean)';
      default:
        return status;
    }
  } else if (lang === 'hi') {
    switch (status) {
      case 'Reported':
        return 'दर्ज किया गया';
      case 'Triaged':
        return 'सत्यापित';
      case 'Dispatched':
        return 'टीम रवाना';
      case 'Resolved':
        return 'समाधान हो गया';
      default:
        return status;
    }
  } else if (lang === 'te') {
    switch (status) {
      case 'Reported':
        return 'నమోదైంది';
      case 'Triaged':
        return 'పరిశీలించబడింది';
      case 'Dispatched':
        return 'బృందం బయలుదేరింది';
      case 'Resolved':
        return 'పరిష్కరించబడింది';
      default:
        return status;
    }
  }
  return status;
}

// Translate Urgency / Priority to native language
export function translateUrgency(urgency: string, lang: LanguageCode): string {
  if (lang === 'kn') {
    switch (urgency) {
      case 'Critical':
        return 'ಅತ್ಯಂತ ತುರ್ತು (Critical)';
      case 'High':
        return 'ಹೆಚ್ಚಿನ ಆದ್ಯತೆ (High)';
      case 'Medium':
        return 'ಸಾಮಾನ್ಯ (Medium)';
      case 'Low':
        return 'ಕಡಿಮೆ (Low)';
      default:
        return urgency;
    }
  } else if (lang === 'hi') {
    switch (urgency) {
      case 'Critical':
        return 'अति गंभीर (Critical)';
      case 'High':
        return 'उच्च (High)';
      case 'Medium':
        return 'मध्यम (Medium)';
      case 'Low':
        return 'कम (Low)';
      default:
        return urgency;
    }
  } else if (lang === 'te') {
    switch (urgency) {
      case 'Critical':
        return 'అత్యవసరం (Critical)';
      case 'High':
        return 'అధిక (High)';
      case 'Medium':
        return 'మధ్యస్థం (Medium)';
      case 'Low':
        return 'తక్కువ (Low)';
      default:
        return urgency;
    }
  }
  return urgency;
}
