import React, { useState } from 'react';
import { Map, Layers, AlertTriangle, ShieldCheck, Flame, Send, CheckCircle2, ChevronRight, Sparkles, Filter, Users, Wrench, RefreshCw, Eye, FileText, Check, Navigation, AlertCircle } from 'lucide-react';
import { CivicIssue, HotspotCluster, ActionBrief, IssueStatus, IssueCategory, UrgencyLevel } from '../types';
import { UserProfile } from '../types/auth';
import { MOCK_HOTSPOT_CLUSTERS } from '../data/mockData';
import { LanguageCode, getUIString, translateCategory, translateStatus, translateUrgency } from '../utils/i18n';

interface CommandCenterProps {
  issues: CivicIssue[];
  onUpdateIssueStatus: (issueId: string, newStatus: IssueStatus, crewInfo?: any, note?: string) => void;
  onSelectIssueForInspection?: (id: string) => void;
  currentLanguage?: LanguageCode;
  currentUser?: UserProfile | null;
  onOpenLogin?: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  issues,
  onUpdateIssueStatus,
  onSelectIssueForInspection,
  currentLanguage = 'en',
  currentUser,
  onOpenLogin,
}) => {

  // Map controls
  const [mapStyle, setMapStyle] = useState<'dark' | 'satellite' | 'street'>('dark');
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Dispatch modal
  const [dispatchingIssue, setDispatchingIssue] = useState<CivicIssue | null>(null);
  const [selectedCrew, setSelectedCrew] = useState('Rapid Asphalt Patch Squad #3');
  const [leadTech, setLeadTech] = useState('Chief Technician R. Silva');
  const [dispatchNote, setDispatchNote] = useState('Prioritize pedestrian safety buffer; coordinate with school crossing guard.');

  // AI Action Brief
  const [actionBrief, setActionBrief] = useState<ActionBrief | null>(null);
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false);
  const [showBriefModal, setShowBriefModal] = useState(false);

  // Filtered issues
  const filteredIssues = issues.filter((iss) => {
    if (categoryFilter !== 'All' && iss.category !== categoryFilter) return false;
    if (urgencyFilter !== 'All' && iss.urgency !== urgencyFilter) return false;
    if (statusFilter !== 'All' && iss.status !== statusFilter) return false;
    if (selectedClusterId) {
      const cluster = MOCK_HOTSPOT_CLUSTERS.find((c) => c.id === selectedClusterId);
      if (cluster && !cluster.issueIds.includes(iss.id)) return false;
    }
    return true;
  });

  // Hotspot clusters
  const clusters = MOCK_HOTSPOT_CLUSTERS;

  const handleOpenDispatch = (issue: CivicIssue) => {
    setDispatchingIssue(issue);
    setSelectedCrew(issue.aiAnalysis.suggestedCrew || 'Rapid Municipal Unit');
  };

  const handleConfirmDispatch = () => {
    if (!dispatchingIssue) return;
    onUpdateIssueStatus(
      dispatchingIssue.id,
      'Dispatched',
      {
        crewName: selectedCrew,
        leadTechnician: leadTech,
        dispatchedAt: 'Just now',
        etaHours: 0.5,
        equipment: dispatchingIssue.aiAnalysis.recommendedEquipment || ['Safety Cones', 'Patch Mix'],
      },
      dispatchNote
    );
    setDispatchingIssue(null);
  };

  const handleGenerateAIActionBrief = async (cluster?: HotspotCluster) => {
    setIsGeneratingBrief(true);
    setShowBriefModal(true);

    try {
      const targetIssues = cluster ? issues.filter((i) => cluster.issueIds.includes(i.id)) : filteredIssues.slice(0, 3);
      const res = await fetch('/api/generate-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clusterName: cluster?.name || 'High Density Infrastructure Corridor',
          issues: targetIssues,
        }),
      });

      const data = await res.json();
      if (data.brief) {
        setActionBrief(data.brief);
      }
    } catch (err) {
      console.error('Failed to generate brief', err);
    } finally {
      setIsGeneratingBrief(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Header & Stats Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-neutral-800 gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-red-500/10 text-red-400 border border-red-500/20">
              Operations Center
            </span>
            <span className="text-xs text-neutral-400">DamGo Municipal Operations Control</span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-100 tracking-tight">
            Citywide Incident Map & Dispatch Engine
          </h1>
        </div>

        {/* Global Stats */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleGenerateAIActionBrief()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-emerald-400 border border-neutral-700 shadow-sm transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Generate AI Action Brief
          </button>

          <div className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl text-xs">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-mono">Total Active</span>
              <span className="font-bold text-neutral-100">{issues.length}</span>
            </div>
            <div className="h-6 w-[1px] bg-neutral-800" />
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-mono">Critical SLA</span>
              <span className="font-bold text-red-400">
                {issues.filter((i) => i.urgency === 'Critical').length}
              </span>
            </div>
            <div className="h-6 w-[1px] bg-neutral-800" />
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-mono">AI Clusters</span>
              <span className="font-bold text-amber-400">2 Hotspots</span>
            </div>
          </div>
        </div>
      </div>

      {/* Officer Authority & Role Badge */}
      <div className="mb-6 p-3 rounded-2xl bg-neutral-950/80 border border-emerald-500/20 flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-emerald-500/30 flex items-center justify-center text-base shrink-0">
            {currentUser?.avatarEmoji || '🏛️'}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-white">
                {currentUser ? currentUser.name : 'Municipal Guest Inspector'}
              </span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                currentUser?.role === 'officer'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : currentUser?.role === 'admin'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  : 'bg-neutral-800 text-neutral-300 border-neutral-700'
              }`}>
                {currentUser?.roleTitle || 'Field Read-Only Observer'}
              </span>
              {currentUser?.staffId && (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {currentUser.staffId}
                </span>
              )}
            </div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              {currentUser?.role === 'officer' || currentUser?.role === 'admin'
                ? 'Authorized for live crew dispatching, SLA emergency overrides, and AI action briefs.'
                : 'Viewing public municipal triage queue. Switch to Ward Officer to test dispatching crews.'}
            </div>
          </div>
        </div>

        {onOpenLogin && (!currentUser || currentUser.role === 'citizen') && (
          <button
            onClick={onOpenLogin}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold transition"
          >
            Switch to BBMP Officer Persona
          </button>
        )}
      </div>

      {/* Main Grid: Interactive Map + Cluster Hotspot Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">

        {/* Interactive Map (8 Cols) */}
        <div className="lg:col-span-8 eco-glass-card rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[520px]">
          {/* Map Toolbar */}
          <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-neutral-950/70 border-b border-emerald-500/20 text-xs gap-3">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 font-medium flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Map View:
              </span>
              <div className="flex bg-neutral-900 rounded-lg p-0.5 border border-neutral-800">
                <button
                  onClick={() => setMapStyle('dark')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
                    mapStyle === 'dark' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
                  }`}
                >
                  Dark Ops
                </button>
                <button
                  onClick={() => setMapStyle('satellite')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
                    mapStyle === 'satellite' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
                  }`}
                >
                  Satellite
                </button>
                <button
                  onClick={() => setMapStyle('street')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
                    mapStyle === 'street' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
                  }`}
                >
                  Vector Street
                </button>
              </div>
            </div>

            {/* Heatmap & Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold border transition ${
                  showHeatmap
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                <Flame className="w-3 h-3" />
                {showHeatmap ? 'Heatmap: ACTIVE' : 'Heatmap: OFF'}
              </button>

              <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg text-xs">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
                  className="px-2.5 py-1 text-neutral-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-1 text-[11px] font-mono text-neutral-300">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.2))}
                  className="px-2.5 py-1 text-neutral-400 hover:text-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Map Vector Canvas */}
          <div className="relative flex-1 bg-neutral-950 overflow-hidden flex items-center justify-center p-4 min-h-[440px]">
            {/* SVG Urban Grid Map */}
            <svg
              viewBox="0 0 900 600"
              className="w-full h-full max-h-[500px] transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <defs>
                {/* Heatmap Multi-stop Radial Gradients */}
                <radialGradient id="heatClusterAlpha" cx="35%" cy="40%" r="24%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.65" />
                  <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.35" />
                  <stop offset="85%" stopColor="#10b981" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="heatClusterBeta" cx="68%" cy="65%" r="20%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.55" />
                  <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background Style */}
              <rect
                width="900"
                height="600"
                fill={mapStyle === 'satellite' ? '#14181f' : mapStyle === 'street' ? '#1c1e24' : '#0d0f12'}
              />

              {/* District Borders & Waterway */}
              <path
                d="M 120 0 Q 300 200 450 350 T 800 600"
                stroke={mapStyle === 'satellite' ? '#0f2937' : '#152538'}
                strokeWidth="48"
                fill="none"
              />
              <text x="520" y="420" fill="#2d4a68" fontSize="12" fontFamily="sans-serif" letterSpacing="4">
                METRO HARBOR CHANNEL
              </text>

              {/* Road Grid Lines */}
              <g stroke="#262a34" strokeWidth="2" strokeDasharray="none">
                <line x1="50" y1="120" x2="850" y2="120" strokeWidth="4" stroke="#333846" />
                <line x1="50" y1="240" x2="850" y2="240" strokeWidth="6" stroke="#3d4454" />
                <line x1="50" y1="360" x2="850" y2="360" strokeWidth="4" stroke="#333846" />
                <line x1="50" y1="480" x2="850" y2="480" strokeWidth="3" stroke="#262a34" />

                <line x1="180" y1="40" x2="180" y2="560" strokeWidth="3" />
                <line x1="320" y1="40" x2="320" y2="560" strokeWidth="6" stroke="#3d4454" />
                <line x1="500" y1="40" x2="500" y2="560" strokeWidth="4" stroke="#333846" />
                <line x1="680" y1="40" x2="680" y2="560" strokeWidth="3" />
              </g>

              {/* Zone Annotations */}
              <g fill="#4b5563" fontSize="11" fontFamily="sans-serif" letterSpacing="2">
                <text x="210" y="100">DISTRICT 3 • EDUCATION HUB (LINCOLN ELEM)</text>
                <text x="360" y="220">DISTRICT 1 • CIVIC CENTER & TRANSIT</text>
                <text x="620" y="340">DISTRICT 4 • WEST VALLEY RESIDENTIAL</text>
                <text x="180" y="460">DISTRICT 5 • INDUSTRIAL WATERFRONT</text>
              </g>

              {/* Heatmap Layer */}
              {showHeatmap && (
                <g className="transition-opacity duration-500">
                  <circle cx="310" cy="235" r="140" fill="url(#heatClusterAlpha)" />
                  <circle cx="610" cy="385" r="110" fill="url(#heatClusterBeta)" />
                </g>
              )}

              {/* Cluster Boundary Rings */}
              {clusters.map((cluster) => {
                const cx = cluster.id === 'cluster-alpha' ? 310 : 610;
                const cy = cluster.id === 'cluster-alpha' ? 235 : 385;
                const isSelected = selectedClusterId === cluster.id;

                return (
                  <g key={cluster.id} className="cursor-pointer" onClick={() => setSelectedClusterId(isSelected ? null : cluster.id)}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={cluster.radiusMeters * 0.7}
                      stroke={cluster.riskLevel === 'Severe' ? '#ef4444' : '#f59e0b'}
                      strokeWidth={isSelected ? '3' : '1.5'}
                      strokeDasharray="6 4"
                      fill={isSelected ? '#ef4444' : 'transparent'}
                      fillOpacity={isSelected ? 0.15 : 0}
                    />
                    <rect
                      x={cx - 75}
                      y={cy - 50}
                      width="150"
                      height="22"
                      rx="4"
                      fill="#0f1115"
                      stroke={cluster.riskLevel === 'Severe' ? '#ef4444' : '#f59e0b'}
                      strokeWidth="1"
                    />
                    <text
                      x={cx}
                      y={cy - 35}
                      textAnchor="middle"
                      fill="#f3f4f6"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      HOTSPOT: {cluster.name.split(':')[0]} ({cluster.issueCount}x)
                    </text>
                  </g>
                );
              })}

              {/* Render Issue Pins */}
              {issues.map((iss, index) => {
                // Determine layout coordinates from index / district
                let px = 280;
                let py = 220;

                if (iss.id === 'CP-2026-8841') {
                  px = 300;
                  py = 225;
                } else if (iss.id === 'CP-2026-8839') {
                  px = 330;
                  py = 245;
                } else if (iss.id === 'CP-2026-8835') {
                  px = 440;
                  py = 210;
                } else if (iss.id === 'CP-2026-8828') {
                  px = 620;
                  py = 370;
                } else if (iss.id === 'CP-2026-8819') {
                  px = 240;
                  py = 470;
                } else if (iss.id === 'CP-2026-8804') {
                  px = 510;
                  py = 180;
                } else {
                  px = 200 + (index * 85) % 550;
                  py = 140 + (index * 65) % 360;
                }

                const isSelected = selectedPinId === iss.id;
                const isCritical = iss.urgency === 'Critical';

                return (
                  <g
                    key={iss.id}
                    className="cursor-pointer group"
                    onClick={() => {
                      setSelectedPinId(isSelected ? null : iss.id);
                      onSelectIssueForInspection?.(iss.id);
                    }}
                  >
                    {/* Glowing halo animation for critical alerts */}
                    {isCritical && (
                      <circle cx={px} cy={py} r="18" fill="#ef4444" opacity="0.3">
                        <animate attributeName="r" values="10;24;10" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Pin Head */}
                    <circle
                      cx={px}
                      cy={py}
                      r={isSelected ? 10 : 7}
                      fill={
                        iss.urgency === 'Critical'
                          ? '#ef4444'
                          : iss.urgency === 'High'
                          ? '#f59e0b'
                          : '#10b981'
                      }
                      stroke="#ffffff"
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      className="transition-all"
                    />

                    {/* Hover tooltip / Label */}
                    <text
                      x={px}
                      y={py - 12}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                      className="pointer-events-none drop-shadow"
                    >
                      {iss.id}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Selected Pin Quick Overlay */}
            {selectedPinId && (() => {
              const activeIssue = issues.find((i) => i.id === selectedPinId);
              if (!activeIssue) return null;
              return (
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-neutral-900/95 border border-neutral-700 rounded-xl p-4 shadow-2xl backdrop-blur flex flex-col gap-2 z-20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400">{activeIssue.id}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        activeIssue.urgency === 'Critical'
                          ? 'bg-red-500/10 text-red-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}
                    >
                      {activeIssue.urgency} ({activeIssue.priorityScore}/100)
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-neutral-100">{activeIssue.title}</h4>
                  <p className="text-[11px] text-neutral-400 line-clamp-1">{activeIssue.location.address}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-800 gap-2">
                    <span className="text-[10px] text-neutral-500">Status: {activeIssue.status}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedPinId(null)}
                        className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white"
                      >
                        Dismiss
                      </button>
                      <button
                        onClick={() => handleOpenDispatch(activeIssue)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow transition"
                      >
                        Dispatch Crew
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* AI Hotspot Cluster Detection Drawer (4 Cols) */}
        <div id="cluster-card" className="lg:col-span-4 space-y-4">
          <div className="eco-glass-card rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-200 text-sm">AI Hotspot Clusters</h3>
                  <span className="text-[10px] text-neutral-500">Geospatial Haversine & NLP Grouping</span>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                2 Active
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {clusters.map((cluster) => {
                const isSelected = selectedClusterId === cluster.id;
                return (
                  <div
                    key={cluster.id}
                    onClick={() => setSelectedClusterId(isSelected ? null : cluster.id)}
                    className={`p-4 rounded-xl border transition cursor-pointer flex flex-col gap-2.5 ${
                      isSelected
                        ? 'bg-neutral-850 border-amber-500 shadow-md'
                        : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-200">{cluster.name}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          cluster.riskLevel === 'Severe'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {cluster.riskLevel} Risk
                      </span>
                    </div>

                    <div className="text-[11px] text-neutral-400">
                      <span className="font-medium text-neutral-300 block mb-0.5">
                        {cluster.synthesisTitle}
                      </span>
                      <p className="line-clamp-2 italic leading-relaxed text-neutral-400">
                        "{cluster.aiRootCauseHypothesis}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-2 border-t border-neutral-800/80">
                      <span className="text-neutral-500 font-mono">Radius: {cluster.radiusMeters}m</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGenerateAIActionBrief(cluster);
                        }}
                        className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                      >
                        Action Directive <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Action Info Banner */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 text-xs text-neutral-300">
            <h4 className="font-semibold text-emerald-300 flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              SLA Compliance Guarantee
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Dispatching unified work orders for clusters reduces contractor truck rolls by 42% and prevents duplicate municipal billing tickets.
            </p>
          </div>
        </div>
      </div>

      {/* Municipal Issues & Dispatch Table */}
      <div className="eco-glass-card rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-neutral-950/70 border-b border-emerald-500/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" />
            <h3 className="font-semibold text-neutral-200 text-sm">Actionable Municipal Queue</h3>
            <span className="text-xs text-neutral-500 font-mono">({filteredIssues.length} items)</span>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
            >
              <option value="All">All Categories</option>
              <option value="Pothole & Road Hazard">Potholes</option>
              <option value="Water & Drainage">Water & Drainage</option>
              <option value="Electrical & Lighting">Electrical</option>
              <option value="Waste & Sanitation">Sanitation</option>
            </select>

            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
            >
              <option value="All">All Urgencies</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
            >
              <option value="All">All Statuses</option>
              <option value="Reported">Reported</option>
              <option value="AI Triaged">AI Triaged</option>
              <option value="Dispatched">Dispatched</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950/60 text-neutral-400 font-semibold border-b border-neutral-800">
              <tr>
                <th className="px-4 py-3">ID & Hazard</th>
                <th className="px-4 py-3">Location & Sensitive Zone</th>
                <th className="px-4 py-3">AI Severity</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Target Department</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredIssues.map((iss) => (
                <tr key={iss.id} className="hover:bg-neutral-850/50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <img src={iss.photoUrl} alt="thumbnail" className="w-9 h-9 rounded-lg object-cover border border-neutral-800" />
                      <div>
                        <span className="font-mono text-neutral-500 font-semibold block">{iss.id}</span>
                        <span className="font-medium text-neutral-200 line-clamp-1">{iss.title}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-neutral-300 block">{iss.location.address}</span>
                    {iss.location.nearSensitiveZone && (
                      <span className="text-[10px] text-amber-400 font-medium">
                        Near: {iss.location.nearSensitiveZone}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`font-mono font-bold ${
                          iss.urgency === 'Critical'
                            ? 'text-red-400'
                            : iss.urgency === 'High'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {iss.priorityScore}
                      </span>
                      <span className="text-[10px] text-neutral-500">/100</span>
                      <span className="text-[10px] text-neutral-400 ml-1">
                        ({translateUrgency(iss.urgency, currentLanguage)})
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        iss.status === 'Resolved'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : iss.status === 'Dispatched' || iss.status === 'In Progress'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {translateStatus(iss.status, currentLanguage)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-300">
                    <span className="block font-medium">{translateCategory(iss.category, currentLanguage)}</span>
                    <span className="text-[10px] text-neutral-500">{iss.aiAnalysis.department}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {iss.status !== 'Resolved' && (
                        <button
                          id="dispatch-button"
                          onClick={() => handleOpenDispatch(iss)}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition shadow-sm"
                        >
                          Dispatch Crew
                        </button>
                      )}
                      {iss.status === 'Dispatched' && (
                        <button
                          onClick={() => onUpdateIssueStatus(iss.id, 'Resolved', undefined, 'Repairs inspected and verified completed.')}
                          className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: DISPATCH WORK ORDER CREW MODAL */}
      {dispatchingIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-100 text-sm">Dispatch Municipal Crew</h3>
                  <span className="text-xs text-neutral-400">Work Ticket #{dispatchingIssue.id}</span>
                </div>
              </div>
              <button
                onClick={() => setDispatchingIssue(null)}
                className="text-neutral-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 font-medium block mb-1">Target Incident</label>
                <p className="font-semibold text-neutral-200">{dispatchingIssue.title}</p>
                <p className="text-neutral-400 mt-0.5">{dispatchingIssue.location.address}</p>
              </div>

              <div>
                <label className="text-neutral-400 font-medium block mb-1">Select Response Crew Unit</label>
                <select
                  value={selectedCrew}
                  onChange={(e) => setSelectedCrew(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200"
                >
                  <option value="Rapid Asphalt Patch Squad #3">Rapid Asphalt Patch Squad #3 (ETA: 25 mins)</option>
                  <option value="Water & Sewer Emergency Unit 1">Water & Sewer Emergency Unit 1 (ETA: 15 mins)</option>
                  <option value="City Power & Light Emergency 2">City Power & Light Emergency 2 (ETA: 20 mins)</option>
                  <option value="Traffic Signal Rapid Tech Team">Traffic Signal Rapid Tech Team (ETA: 30 mins)</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 font-medium block mb-1">Lead Field Technician</label>
                <input
                  type="text"
                  value={leadTech}
                  onChange={(e) => setLeadTech(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-medium block mb-1">Dispatcher Operational Directives</label>
                <textarea
                  rows={2}
                  value={dispatchNote}
                  onChange={(e) => setDispatchNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 resize-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setDispatchingIssue(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDispatch}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-900/30"
              >
                Authorize & Broadcast Work Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: AI ACTION BRIEF (MAYOR / CITY MANAGER BRIEF) */}
      {showBriefModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-100 text-base">Executive Municipal Action Brief</h3>
                  <span className="text-xs text-neutral-400">Synthesized by DamGo AI Core (Gemini 3.8 Flash)</span>
                </div>
              </div>
              <button
                onClick={() => setShowBriefModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {isGeneratingBrief ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mb-3" />
                <p className="text-sm font-semibold text-neutral-200">Synthesizing Incident Cluster Directives...</p>
                <p className="text-xs text-neutral-500 mt-1">Cross-referencing municipal GIS datasets and SLA budgetary ceilings</p>
              </div>
            ) : actionBrief ? (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <h4 className="font-bold text-sm text-neutral-100 mb-1">{actionBrief.title}</h4>
                  <p className="text-neutral-300 leading-relaxed">{actionBrief.executiveSummary}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-500 block uppercase font-mono text-[10px]">Estimated Municipal Cost</span>
                    <span className="font-bold text-emerald-400 text-sm mt-0.5 block">{actionBrief.estimatedCost}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-neutral-500 block uppercase font-mono text-[10px]">Recommended SLA Ceiling</span>
                    <span className="font-bold text-amber-400 text-sm mt-0.5 block">{actionBrief.slaTargetHours} Hours</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold uppercase tracking-wider text-neutral-400 mb-2">Tactical Crew Directives:</h5>
                  <ul className="space-y-1.5">
                    {actionBrief.recommendedActions.map((act, i) => (
                      <li key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">Automated Citizen SMS Advisory Draft:</h5>
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200 font-mono text-[11px] leading-relaxed">
                    "{actionBrief.publicNoticeDraft}"
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setShowBriefModal(false)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow transition"
                  >
                    Confirm & Send to City Council Desk
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
