import { CivicIssue, HotspotCluster } from '../types';

// High-fidelity SVG Data URIs representing real civic hazards for instant testing
export const SAMPLE_HAZARD_PHOTOS = [
  {
    id: 'sample-pothole',
    label: 'Deep Asphalt Road Crater',
    category: 'Pothole & Road Hazard' as const,
    title: 'Severe Rim-Busting Pothole near School Crossing',
    description: 'Deep 8-inch asphalt hole with exposed gravel sub-base directly in the crosswalk lane. Cars are swerving dangerously into oncoming traffic.',
    location: '412 Maplewood Ave, North Central (45m from Lincoln Elementary)',
    nearSensitiveZone: 'Lincoln Elementary School Crossing',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%232b2d42"/><path d="M0,280 Q300,290 600,280 L600,400 L0,400 Z" fill="%231e1f29"/><ellipse cx="300" cy="240" rx="160" ry="80" fill="%230f1016"/><ellipse cx="300" cy="245" rx="140" ry="65" fill="%23050508"/><path d="M220,230 L250,260 L240,280 L290,265 L330,285 L380,240" stroke="%23555b6e" stroke-width="6" fill="none"/><circle cx="270" cy="250" r="12" fill="%238d99ae"/><circle cx="340" cy="260" r="16" fill="%238d99ae"/><rect x="180" y="80" width="240" height="30" fill="%23ffd166" rx="4"/><text x="300" y="102" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23000" text-anchor="middle">SCHOOL PEDESTRIAN ZONE</text><rect x="50" y="320" width="100" height="15" fill="%23ffffff" opacity="0.8"/><rect x="250" y="320" width="100" height="15" fill="%23ffffff" opacity="0.8"/><rect x="450" y="320" width="100" height="15" fill="%23ffffff" opacity="0.8"/></svg>`
  },
  {
    id: 'sample-water',
    label: 'Burst Water Sub-Main',
    category: 'Water & Drainage' as const,
    title: 'High Pressure Water Main Gushing Across Transit Lane',
    description: 'Water bubbling forcefully through fractured street pavement. Sidewalk curb undermined, creating localized sinkhole hazard.',
    location: '88 Oakridge Blvd, Downtown Core',
    nearSensitiveZone: 'Metro Bus Terminal & Transit Hub',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%233a3d40"/><ellipse cx="300" cy="260" rx="180" ry="70" fill="%230077b6" opacity="0.7"/><ellipse cx="300" cy="260" rx="120" ry="45" fill="%230096c7" opacity="0.9"/><path d="M290,260 Q270,140 280,90 Q300,60 320,90 Q330,150 310,260 Z" fill="%2390e0ef" opacity="0.85"/><circle cx="300" cy="110" r="25" fill="%23caf0f8" opacity="0.7"/><path d="M120,290 C200,320 400,310 490,290" stroke="%23023e8a" stroke-width="12" fill="none" opacity="0.5"/><text x="300" y="50" font-family="sans-serif" font-size="18" font-weight="bold" fill="%2300b4d8" text-anchor="middle">ACTIVE MAIN PRESSURE LEAK</text></svg>`
  },
  {
    id: 'sample-electrical',
    label: 'Damaged Electrical Box & Wire',
    category: 'Electrical & Lighting' as const,
    title: 'Exposed Streetlight Base Wire with Intermittent Sparking',
    description: 'Streetlight inspection hatch kicked open, loose high-voltage 240V wire dangling 2 inches from wet sidewalk. Immediate shock hazard.',
    location: '1540 Highland Ave, West Valley',
    nearSensitiveZone: 'Senior Living Center Gateway',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%231a1a24"/><rect x="250" y="80" width="100" height="280" fill="%234a4e69" rx="8"/><rect x="270" y="160" width="60" height="100" fill="%231a1a1a"/><path d="M280,210 Q240,240 230,290" stroke="%23ffbe0b" stroke-width="8" fill="none"/><path d="M310,220 Q330,270 290,310" stroke="%23e63946" stroke-width="8" fill="none"/><polygon points="230,285 220,270 240,275 235,260 255,280 240,285 245,300" fill="%23ffee32"/><polygon points="295,305 285,290 305,295 300,280 320,300 305,305 310,320" fill="%23ffee32"/><text x="300" y="50" font-family="sans-serif" font-size="18" font-weight="bold" fill="%23ff0054" text-anchor="middle">HIGH VOLTAGE EXPOSURE HAZARD</text></svg>`
  },
  {
    id: 'sample-sanitation',
    label: 'Illegal Commercial Dump Site',
    category: 'Waste & Sanitation' as const,
    title: 'Commercial Construction Debris Blocking Sidewalk',
    description: 'Pile of broken drywall, insulation, and timber dumped overnight. Fully blocks wheelchair access and pushes pedestrians into traffic.',
    location: '722 Industrial Parkway, South Waterfront',
    nearSensitiveZone: 'ADA Pedestrian Route',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%233d405b"/><rect x="200" y="120" width="200" height="160" fill="%232b9348" rx="6"/><text x="300" y="150" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23fff" text-anchor="middle">MUNICIPAL BIN</text><path d="M120,280 L480,280 L440,360 L160,360 Z" fill="%2381b29a"/><path d="M140,260 L240,190 L310,270 L390,200 L470,270 Z" fill="%23e07a5f"/><rect x="210" y="270" width="90" height="40" fill="%23f4f1de" transform="rotate(-15 210 270)"/><rect x="330" y="260" width="110" height="30" fill="%23f4f1de" transform="rotate(20 330 260)"/><text x="300" y="60" font-family="sans-serif" font-size="18" font-weight="bold" fill="%23e07a5f" text-anchor="middle">ADA SIDEWALK OBSTRUCTION</text></svg>`
  }
];

export const INITIAL_CIVIC_ISSUES: CivicIssue[] = [
  {
    id: 'CP-2026-8841',
    title: 'Deep Rim-Busting Pothole directly in School Crosswalk',
    description: 'Severe 8-inch deep asphalt crater on Maplewood Ave. School buses and parents dropping off students at Lincoln Elementary are swerving into the opposing bike lane.',
    category: 'Pothole & Road Hazard',
    status: 'AI Triaged',
    urgency: 'Critical',
    priorityScore: 94,
    safetyRisk: true,
    photoUrl: SAMPLE_HAZARD_PHOTOS[0].dataUrl,
    photoSource: 'sample',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '412 Maplewood Ave, North Central',
      district: 'District 3 - Education Hub',
      nearSensitiveZone: 'Lincoln Elementary School (45m)'
    },
    submittedAt: '2026-10-29 08:14 AM',
    updatedAt: '2026-10-29 08:15 AM',
    reporter: {
      name: 'Sarah Jenkins',
      isAnonymous: false,
      contact: 's.jenkins@metrocitizen.org'
    },
    upvotes: 28,
    aiAnalysis: {
      category: 'Pothole & Road Hazard',
      priorityScore: 94,
      urgency: 'Critical',
      safetyRisk: true,
      safetyRiskReason: 'Located directly within designated school crosswalk. High risk of pedestrian tripping and vehicle tire blowouts during morning school rush.',
      department: 'Department of Transportation',
      suggestedCrew: 'Rapid Asphalt Patch Squad #3',
      estimatedResolutionHours: 8,
      detectedObjects: ['deep asphalt cavity', 'gravel aggregate', 'school zone road markings'],
      confidence: 0.96,
      aiSummary: 'Critical priority road hazard inside active school safety buffer. Multi-factor triage triggered an automatic priority bump due to vulnerable student transit.',
      recommendedEquipment: ['Cold Patch Polymer Mix', 'Vibratory Plate Compactor', 'Hi-Vis Traffic Cones', 'School Zone Warning Flasher'],
      duplicateClusterId: 'cluster-alpha',
      duplicateSimilarity: 0.88
    },
    timeline: [
      {
        id: 't-1',
        status: 'Reported',
        timestamp: '08:14 AM',
        title: 'Issue Lodged via Citizen Camera',
        description: 'Citizen snapped photo of crater with live GPS lock verified at Maplewood Ave.',
        actor: 'Citizen Mobile App'
      },
      {
        id: 't-2',
        status: 'AI Triaged',
        timestamp: '08:15 AM',
        title: 'Gemini 3.8 Flash Multimodal Triage',
        description: 'Evaluated image & proximity to school. Priority escalated to 94/100 (Critical). Correlated to Hotspot Cluster Alpha.',
        actor: 'CivicPulse AI Engine',
        badge: 'AI Priority Score: 94'
      }
    ]
  },
  {
    id: 'CP-2026-8839',
    title: 'Sunken Road & Asphalt Depression adjacent to Storm Drain',
    description: 'Road surface is sinking around the sewer grate. Pavement has dropped ~5 inches. Cars bottoming out when turning onto Maplewood.',
    category: 'Pothole & Road Hazard',
    status: 'Reported',
    urgency: 'High',
    priorityScore: 86,
    safetyRisk: true,
    photoUrl: SAMPLE_HAZARD_PHOTOS[0].dataUrl,
    photoSource: 'sample',
    location: {
      lat: 37.7753,
      lng: -122.4188,
      address: '428 Maplewood Ave (near 5th St)',
      district: 'District 3 - Education Hub',
      nearSensitiveZone: 'Lincoln Elementary School (80m)'
    },
    submittedAt: '2026-10-29 07:55 AM',
    updatedAt: '2026-10-29 07:55 AM',
    reporter: {
      name: 'Marcus Vance',
      isAnonymous: true
    },
    upvotes: 14,
    aiAnalysis: {
      category: 'Pothole & Road Hazard',
      priorityScore: 86,
      urgency: 'High',
      safetyRisk: true,
      safetyRiskReason: 'Subsurface erosion near storm drainage intake. Potential early sinkhole formation.',
      department: 'Department of Transportation',
      suggestedCrew: 'Rapid Asphalt Patch Squad #3',
      estimatedResolutionHours: 12,
      detectedObjects: ['catch basin curb', 'asphalt subsidence', 'shear cracks'],
      confidence: 0.92,
      aiSummary: 'Correlated with Report CP-2026-8841 within 65 meters. Deduplication & cluster algorithm tagged as Cluster Alpha.',
      recommendedEquipment: ['Subsurface Ground Radar', 'Polymer Fill', 'Barricades'],
      duplicateClusterId: 'cluster-alpha',
      duplicateSimilarity: 0.81
    },
    timeline: [
      {
        id: 't-3',
        status: 'Reported',
        timestamp: '07:55 AM',
        title: 'Report Logged',
        description: 'Citizen submitted report with photo.',
        actor: 'Citizen Mobile App'
      }
    ]
  },
  {
    id: 'CP-2026-8835',
    title: 'High Pressure Water Main Gushing Across Transit Lane',
    description: 'Clean water is forcefully erupting through cracked street paving. Curb undermined, ponding 4 inches deep across 2 lanes.',
    category: 'Water & Drainage',
    status: 'Dispatched',
    urgency: 'Critical',
    priorityScore: 98,
    safetyRisk: true,
    photoUrl: SAMPLE_HAZARD_PHOTOS[1].dataUrl,
    photoSource: 'sample',
    location: {
      lat: 37.7810,
      lng: -122.4112,
      address: '88 Oakridge Blvd, Downtown Core',
      district: 'District 1 - Civic Center',
      nearSensitiveZone: 'Metro Bus Terminal & Transit Hub'
    },
    submittedAt: '2026-10-29 06:40 AM',
    updatedAt: '2026-10-29 07:10 AM',
    reporter: {
      name: 'Transit Officer Rivera',
      isAnonymous: false,
      contact: 'd.rivera@metrotransit.gov'
    },
    upvotes: 42,
    aiAnalysis: {
      category: 'Water & Drainage',
      priorityScore: 98,
      urgency: 'Critical',
      safetyRisk: true,
      safetyRiskReason: 'Massive hydraulic pressure undermining roadway structural sub-base. Risk of catastrophic sinkhole swallow and transit line disruption.',
      department: 'Water & Sewer Utility Division',
      suggestedCrew: 'Emergency Water Valve Crew #1',
      estimatedResolutionHours: 6,
      detectedObjects: ['geyser flow', 'pavement buckling', 'flooded transit lane'],
      confidence: 0.98,
      aiSummary: 'Critical infrastructure rupture. Urgent valve isolation required to prevent commercial district basement flooding.',
      recommendedEquipment: ['Hydraulic Valve Actuator', 'High-Capacity Trash Pump', 'Trench Shoring Cage', 'Traffic Diverters']
    },
    assignedCrew: {
      crewName: 'Water & Sewer Emergency Unit 1',
      leadTechnician: 'Chief Engineer K. Miller',
      dispatchedAt: '07:10 AM',
      etaHours: 0.4,
      equipment: ['Valve Truck 14', 'Vacuum Excavator', 'Trench Plates']
    },
    timeline: [
      {
        id: 't-4',
        status: 'Reported',
        timestamp: '06:40 AM',
        title: 'Urgent Issue Received',
        description: 'Logged by Transit Police with high priority tag.',
        actor: 'Transit Police Feed'
      },
      {
        id: 't-5',
        status: 'AI Triaged',
        timestamp: '06:41 AM',
        title: 'Emergency Priority 98/100',
        description: 'AI automated immediate notification to Water Authority on-call engineer.',
        actor: 'CivicPulse AI Core'
      },
      {
        id: 't-6',
        status: 'Dispatched',
        timestamp: '07:10 AM',
        title: 'Crew Dispatched En Route',
        description: 'Unit 1 en route with vacuum excavator. ETA 15 minutes.',
        actor: 'Municipal Dispatch Desk'
      }
    ]
  },
  {
    id: 'CP-2026-8828',
    title: 'Exposed High-Voltage Streetlight Base Wire Sparking',
    description: 'Access panel at the base of the light pole is missing. Live bare electrical wires are exposed at toddler height on wet sidewalk.',
    category: 'Electrical & Lighting',
    status: 'In Progress',
    urgency: 'Critical',
    priorityScore: 95,
    safetyRisk: true,
    photoUrl: SAMPLE_HAZARD_PHOTOS[2].dataUrl,
    photoSource: 'sample',
    location: {
      lat: 37.7690,
      lng: -122.4410,
      address: '1540 Highland Ave, West Valley',
      district: 'District 4 - West Valley',
      nearSensitiveZone: 'Golden Age Senior Living Gateway (20m)'
    },
    submittedAt: '2026-10-28 09:20 PM',
    updatedAt: '2026-10-29 07:30 AM',
    reporter: {
      name: 'Elena Rostova',
      isAnonymous: false
    },
    upvotes: 31,
    aiAnalysis: {
      category: 'Electrical & Lighting',
      priorityScore: 95,
      urgency: 'Critical',
      safetyRisk: true,
      safetyRiskReason: 'Live 240V AC electrical conductors exposed within 18 inches of sidewalk. Severe risk of fatal electrocution, especially with forecast morning rain.',
      department: 'City Electrical Services',
      suggestedCrew: 'Electrical Hazard Squad #2',
      estimatedResolutionHours: 4,
      detectedObjects: ['open luminaire handhole', 'loose insulated conductor', 'arcing risk'],
      confidence: 0.97,
      aiSummary: 'Direct life-safety hazard near senior housing. Circuit isolated remotely via SCADA; repair technician currently securing panel enclosure.',
      recommendedEquipment: ['Insulated 1000V Tools', 'Replacement Handhole Cover', 'Lockout/Tagout Kit']
    },
    assignedCrew: {
      crewName: 'City Power & Light Emergency 2',
      leadTechnician: 'Journeyman Lineman T. Bradley',
      dispatchedAt: '07:00 AM',
      etaHours: 0.1,
      equipment: ['Bucket Truck 08', 'Multimeter', 'Waterproof Terminal Blocks']
    },
    timeline: [
      {
        id: 't-7',
        status: 'Reported',
        timestamp: '10/28 09:20 PM',
        title: 'Report Received',
        description: 'Citizen uploaded nighttime photo of sparking wire.',
        actor: 'Citizen App'
      },
      {
        id: 't-8',
        status: 'AI Triaged',
        timestamp: '10/28 09:22 PM',
        title: 'Critical Electrical Classification',
        description: 'Auto-routed to Electrical Emergency Queue. SCADA circuit kill signal triggered.',
        actor: 'CivicPulse AI Core'
      },
      {
        id: 't-9',
        status: 'In Progress',
        timestamp: '07:30 AM',
        title: 'Technician On-Site',
        description: 'Bradley on site. Handhole secured with temporary blanking plate.',
        actor: 'Field Crew'
      }
    ]
  },
  {
    id: 'CP-2026-8819',
    title: 'Commercial Construction Waste Blocking Sidewalk Ramp',
    description: 'Drywall slabs, insulation, and timber dumped directly across the ADA ramp at the corner. Wheelchair users cannot cross.',
    category: 'Waste & Sanitation',
    status: 'AI Triaged',
    urgency: 'Medium',
    priorityScore: 68,
    safetyRisk: false,
    photoUrl: SAMPLE_HAZARD_PHOTOS[3].dataUrl,
    photoSource: 'sample',
    location: {
      lat: 37.7600,
      lng: -122.4080,
      address: '722 Industrial Parkway, South Waterfront',
      district: 'District 5 - Industrial Waterfront',
      nearSensitiveZone: 'ADA Access Corridor'
    },
    submittedAt: '2026-10-29 05:15 AM',
    updatedAt: '2026-10-29 05:20 AM',
    reporter: {
      name: 'David Chen',
      isAnonymous: true
    },
    upvotes: 9,
    aiAnalysis: {
      category: 'Waste & Sanitation',
      priorityScore: 68,
      urgency: 'Medium',
      safetyRisk: false,
      safetyRiskReason: 'ADA ramp blocked; forces mobility impaired persons into vehicular roadway.',
      department: 'Sanitation & Resource Recovery',
      suggestedCrew: 'Heavy Bulk Waste Crew #4',
      estimatedResolutionHours: 24,
      detectedObjects: ['drywall fragments', 'wooden pallets', 'blocked tactile curb ramp'],
      confidence: 0.91,
      aiSummary: 'Illegal fly-tipping violation. Code enforcement notification dispatched for contractor permit tracking.',
      recommendedEquipment: ['Flatbed Grapple Truck', 'Street Broom Sweep Unit']
    },
    timeline: [
      {
        id: 't-10',
        status: 'Reported',
        timestamp: '05:15 AM',
        title: 'Fly-tipping Reported',
        description: 'Photo submitted with GPS coordinates.',
        actor: 'Citizen App'
      },
      {
        id: 't-11',
        status: 'AI Triaged',
        timestamp: '05:20 AM',
        title: 'Sanitation Routing',
        description: 'Scheduled for next municipal bulk sweeper cycle.',
        actor: 'CivicPulse AI Core'
      }
    ]
  },
  {
    id: 'CP-2026-8804',
    title: 'Traffic Signal Stuck on Flashing Red at High-Volume Arterial',
    description: 'Both Eastbound and Westbound signal heads at 8th & Grand are flashing red. Backing up traffic 6 blocks toward freeway on-ramp.',
    category: 'Traffic & Signals',
    status: 'Resolved',
    urgency: 'High',
    priorityScore: 84,
    safetyRisk: true,
    photoUrl: SAMPLE_HAZARD_PHOTOS[2].dataUrl,
    photoSource: 'sample',
    location: {
      lat: 37.7850,
      lng: -122.4250,
      address: '8th Ave & Grand Blvd, Downtown Core',
      district: 'District 1 - Civic Center',
      nearSensitiveZone: 'Highway 101 Access Ramp'
    },
    submittedAt: '2026-10-28 03:00 PM',
    updatedAt: '2026-10-28 05:45 PM',
    reporter: {
      name: 'Dispatch Automated',
      isAnonymous: false
    },
    upvotes: 55,
    aiAnalysis: {
      category: 'Traffic & Signals',
      priorityScore: 84,
      urgency: 'High',
      safetyRisk: true,
      safetyRiskReason: 'Uncontrolled 4-way arterial intersection during evening peak hour. Significant collision risk.',
      department: 'Traffic Engineering Division',
      suggestedCrew: 'Signal Operations Rapid Team',
      estimatedResolutionHours: 3,
      detectedObjects: ['malfunctioning optical head', 'traffic queue buildup'],
      confidence: 0.99,
      aiSummary: 'Conflict monitor tripped in cabinet #412. Field technician reset micro-controller and replaced failed optical isolator.',
      recommendedEquipment: ['Signal Controller Diagnostic Unit', 'Replacement Conflict Monitor Card']
    },
    timeline: [
      {
        id: 't-12',
        status: 'Reported',
        timestamp: '10/28 03:00 PM',
        title: 'Signal Fault Detected',
        description: 'Citizen report matched with automated loop detector anomaly.',
        actor: 'CivicPulse Sensor Bridge'
      },
      {
        id: 't-13',
        status: 'Dispatched',
        timestamp: '10/28 03:15 PM',
        title: 'Technician Assigned',
        description: 'Tech Wu dispatched to signal cabinet.',
        actor: 'Traffic Operations Center'
      },
      {
        id: 't-14',
        status: 'Resolved',
        timestamp: '10/28 05:45 PM',
        title: 'Conflict Monitor Replaced',
        description: 'Signal controller back in normal synchronized timing cycle.',
        actor: 'Lead Tech Wu',
        badge: 'Verified & Closed'
      }
    ]
  }
];

export const MOCK_HOTSPOT_CLUSTERS: HotspotCluster[] = [
  {
    id: 'cluster-alpha',
    name: 'Cluster Alpha: Maplewood Corridor Subsidence',
    district: 'District 3 - Education Hub',
    center: { lat: 37.7751, lng: -122.4191 },
    radiusMeters: 140,
    issueIds: ['CP-2026-8841', 'CP-2026-8839'],
    issueCount: 4,
    dominantCategory: 'Pothole & Road Hazard',
    riskLevel: 'Severe',
    synthesisTitle: 'Correlated Pavement Failure & Water Main Leak near Lincoln Elementary',
    aiRootCauseHypothesis: 'Multiple correlated asphalt failures and sunken sewer grates within 140m point to an undetected subterranean water main fracture eroding the subgrade beneath Maplewood Ave.',
    recommendedImmediateAction: 'Deploy Ground Penetrating Radar (GPR) unit and execute emergency lane closure during morning school transit window.'
  },
  {
    id: 'cluster-beta',
    name: 'Cluster Beta: West Valley Electrical Grid Stress',
    district: 'District 4 - West Valley',
    center: { lat: 37.7690, lng: -122.4410 },
    radiusMeters: 220,
    issueIds: ['CP-2026-8828'],
    issueCount: 3,
    dominantCategory: 'Electrical & Lighting',
    riskLevel: 'Elevated',
    synthesisTitle: 'Streetlight Cable Tampering & Conduit Corrosion',
    aiRootCauseHypothesis: 'Multiple open base handholes and arcing wires along Highland Ave suggest copper wiring theft attempts combined with moisture intrusion.',
    recommendedImmediateAction: 'Dispatch electrical security patrol and replace covers with tamper-proof security bolts.'
  }
];

export const DEMO_STEPS = [
  {
    step: 1,
    title: 'Citizen Quick-Report & Real Camera Snap',
    subtitle: 'Citizen captures live damage photo in under 60 seconds or selects a high-fidelity sample.',
    view: 'citizen' as const,
    actionPrompt: 'Click "Open Live Camera" to test real camera stream or click one of the quick sample hazard presets below.',
    highlightTarget: 'camera-button'
  },
  {
    step: 2,
    title: 'Instant AI Multimodal Triage & Safety Scoring',
    subtitle: 'AI analyzes damage severity, extracts entities, calculates priority score (0-100), and flags school zones.',
    view: 'citizen' as const,
    actionPrompt: 'Observe the real-time AI Analysis Card, duplicate detection match, and school zone safety factor multiplier.',
    highlightTarget: 'ai-triage-card'
  },
  {
    step: 3,
    title: 'Command Center: Map Visualization & Hotspot Clusters',
    subtitle: 'City administrators visualize citywide failure density and auto-detected multi-report failure clusters.',
    view: 'admin' as const,
    actionPrompt: 'Inspect the interactive map, toggle the Heatmap overlay, and click "Cluster Alpha" to view correlated infrastructure failure.',
    highlightTarget: 'cluster-card'
  },
  {
    step: 4,
    title: 'One-Click Crew Dispatch & AI Action Brief',
    subtitle: 'Dispatch municipal rapid response crew and generate ready-to-sign emergency action briefs for the City Council.',
    view: 'admin' as const,
    actionPrompt: 'Click "Dispatch Crew" or "Generate AI Action Brief" to trigger field work orders and citizen SMS advisories.',
    highlightTarget: 'dispatch-button'
  },
  {
    step: 5,
    title: 'Explainable AI Logic & Honesty Dashboard',
    subtitle: 'Inspect the mathematical prioritization formula, cosine vector deduplication slider, and transparent limitations.',
    view: 'pipeline' as const,
    actionPrompt: 'Drag the Deduplication Threshold or Multi-Factor weights to see real-time re-ranking of municipal work queues.',
    highlightTarget: 'algorithm-sliders'
  }
];
