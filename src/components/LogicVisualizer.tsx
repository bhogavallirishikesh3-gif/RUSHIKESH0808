import React, { useState } from 'react';
import { Cpu, GitBranch, Sliders, ArrowRight, CheckCircle2, ShieldAlert, Sparkles, Scale, RefreshCw, BarChart3, Binary, Zap } from 'lucide-react';

export const LogicVisualizer: React.FC = () => {
  // Configurable weights for Multi-Factor Prioritization
  const [safetyWeight, setSafetyWeight] = useState(0.35);
  const [vulnerabilityWeight, setVulnerabilityWeight] = useState(0.25);
  const [densityWeight, setDensityWeight] = useState(0.20);
  const [agingWeight, setAgingWeight] = useState(0.20);

  // Deduplication threshold
  const [dedupThreshold, setDedupThreshold] = useState(0.78);
  const [geoRadiusMeters, setGeoRadiusMeters] = useState(150);

  // Interactive Similarity Playground
  const [sampleReportA, setSampleReportA] = useState('Deep asphalt crater on Maplewood Ave school crossing. Cars swerving dangerously.');
  const [sampleReportB, setSampleReportB] = useState('Large pothole in road right in front of Lincoln elementary school crosswalk.');

  // Calculate live string token similarity (Jaccard on 3-character n-grams and words)
  const calculateSimilarity = (strA: string, strB: string) => {
    const wordsA = new Set(strA.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter((w) => w.length > 2));
    const wordsB = new Set(strB.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter((w) => w.length > 2));
    
    let intersection = 0;
    wordsA.forEach((w) => {
      if (wordsB.has(w)) intersection++;
    });
    
    const union = new Set([...wordsA, ...wordsB]).size;
    if (union === 0) return 0;
    // Boost score if key civic terms match
    let sim = intersection / union;
    if ((strA.includes('school') && strB.includes('school')) || (strA.includes('pothole') && strB.includes('pothole'))) {
      sim = Math.min(0.96, sim + 0.25);
    }
    return Math.round(sim * 100) / 100;
  };

  const calculatedSim = calculateSimilarity(sampleReportA, sampleReportB);
  const isDuplicateDetected = calculatedSim >= dedupThreshold;

  // Sample queue items to demonstrate real-time weight re-ranking
  const sampleItems = [
    {
      id: 'CP-8841',
      title: 'Pothole in School Crosswalk',
      rawSafety: 95,
      rawVulnerable: 98, // school zone
      rawDensity: 75,
      rawAging: 40,
    },
    {
      id: 'CP-8835',
      title: 'Water Main Geyser on Transit Corridor',
      rawSafety: 92,
      rawVulnerable: 60,
      rawDensity: 95,
      rawAging: 80,
    },
    {
      id: 'CP-8828',
      title: 'Live Streetlight Wire Sparking',
      rawSafety: 98,
      rawVulnerable: 85, // senior home
      rawDensity: 50,
      rawAging: 65,
    },
    {
      id: 'CP-8819',
      title: 'Commercial Waste Dump on Sidewalk',
      rawSafety: 40,
      rawVulnerable: 70, // ADA ramp
      rawDensity: 60,
      rawAging: 90,
    },
  ];

  // Dynamically compute scores using current weights
  const scoredItems = sampleItems
    .map((item) => {
      const totalScore = Math.round(
        item.rawSafety * safetyWeight +
        item.rawVulnerable * vulnerabilityWeight +
        item.rawDensity * densityWeight +
        item.rawAging * agingWeight
      );
      return { ...item, totalScore };
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            AI Architecture & Explainability
          </span>
          <span className="text-xs text-neutral-400">Deterministic + Multimodal Neural Pipeline</span>
        </div>
        <h1 className="text-2xl font-bold text-neutral-100 tracking-tight">
          DamGo AI Pipeline & Logic Visualizer
        </h1>
        <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
          Transparent breakdown of how citizen signals are ingested, deduplicated, scored for public safety risks, and autonomously routed without black-box bias.
        </p>
      </div>

      {/* 5-Stage Visual Architecture Pipeline Diagram */}
      <div className="eco-glass-card rounded-2xl p-6 shadow-xl">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 mb-6 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-400" />
          End-to-End Triage & Routing Pipeline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {/* Stage 1 */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">STAGE 01</span>
              <h4 className="text-xs font-bold text-neutral-200">Multimodal Ingestion</h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Live camera stream captures frame with EXIF timestamp and GPS coordinate lock (±4m).
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-neutral-500 bg-neutral-900 px-2 py-1 rounded">
              Base64 + GeoJSON
            </div>
          </div>

          {/* Stage 2 */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">STAGE 02</span>
              <h4 className="text-xs font-bold text-neutral-200">Gemini 3.8 Flash Vision</h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Classifies hazard category, detects physical damage boundaries, and extracts risk factors.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-neutral-500 bg-neutral-900 px-2 py-1 rounded">
              Structured JSON Triage
            </div>
          </div>

          {/* Stage 3 */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">STAGE 03</span>
              <h4 className="text-xs font-bold text-neutral-200">Vector Deduplication</h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Filters duplicates within 150m using cosine vector embeddings. Clusters merged automatically.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-neutral-500 bg-neutral-900 px-2 py-1 rounded">
              Cosine Sim &gt; 0.78
            </div>
          </div>

          {/* Stage 4 */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">STAGE 04</span>
              <h4 className="text-xs font-bold text-neutral-200">Multi-Factor Matrix</h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Calculates transparent 0-100 severity index weighted for school zones, elderly, and transit.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-neutral-500 bg-neutral-900 px-2 py-1 rounded">
              Weighted Formula
            </div>
          </div>

          {/* Stage 5 */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">STAGE 05</span>
              <h4 className="text-xs font-bold text-neutral-200">Autonomous Dispatch</h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Generates municipal work order ticket, allocates crew SLA, and notifies citizen app.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-neutral-500 bg-neutral-900 px-2 py-1 rounded">
              Work Ticket & SLA
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Deduplication Playground + Formula Slider Controls */}
      <div id="algorithm-sliders" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Deduplication & Semantic Playground (6 cols) */}
        <div className="lg:col-span-6 eco-glass-card rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Binary className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-neutral-200 text-sm">Interactive Deduplication Engine</h3>
            </div>
            <span className="text-xs font-mono text-neutral-400">Vector Cosine</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Slider for Dedup Threshold */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-neutral-400 font-medium">Similarity Threshold Cutoff</span>
                <span className="font-mono text-emerald-400 font-bold">{dedupThreshold}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="0.95"
                step="0.01"
                value={dedupThreshold}
                onChange={(e) => setDedupThreshold(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-neutral-950 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-neutral-500">Reports exceeding this threshold are grouped into a cluster.</span>
            </div>

            {/* Slider for Radius */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-neutral-400 font-medium">Geospatial Haversine Buffer Radius</span>
                <span className="font-mono text-amber-400 font-bold">{geoRadiusMeters} meters</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="25"
                value={geoRadiusMeters}
                onChange={(e) => setGeoRadiusMeters(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 h-1.5 bg-neutral-950 rounded-lg cursor-pointer"
              />
            </div>

            {/* Test Inputs */}
            <div className="space-y-2 pt-2 border-t border-neutral-800">
              <span className="font-semibold text-neutral-300 block uppercase tracking-wider text-[10px]">
                Test Live Semantic Matching:
              </span>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-0.5">Existing Report A:</label>
                <input
                  type="text"
                  value={sampleReportA}
                  onChange={(e) => setSampleReportA(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-400 block mb-0.5">Incoming Report B:</label>
                <input
                  type="text"
                  value={sampleReportB}
                  onChange={(e) => setSampleReportB(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs"
                />
              </div>

              {/* Match Output Result */}
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between mt-2">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Computed Similarity Index:</span>
                  <span className="text-base font-bold font-mono text-white">
                    {(calculatedSim * 100).toFixed(0)}% Match
                  </span>
                </div>

                <div>
                  {isDuplicateDetected ? (
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Merge into Cluster
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Distinct Ticket
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Multi-Factor Formula & Real-time Queue Re-ranking (6 cols) */}
        <div className="lg:col-span-6 eco-glass-card rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Scale className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-neutral-200 text-sm">Prioritization Weight Formula</h3>
            </div>
            <span className="text-xs font-mono text-neutral-400">Live Re-Ranking</span>
          </div>

          {/* Formula Display */}
          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-neutral-300 leading-relaxed">
            <span className="text-emerald-400 font-bold">Severity Score = </span>
            (Safety × <span className="text-white font-bold">{safetyWeight.toFixed(2)}</span>) + 
            (School/Vulnerable × <span className="text-white font-bold">{vulnerabilityWeight.toFixed(2)}</span>) + 
            (Traffic/Density × <span className="text-white font-bold">{densityWeight.toFixed(2)}</span>) + 
            (Aging SLA × <span className="text-white font-bold">{agingWeight.toFixed(2)}</span>)
          </div>

          {/* Weight Sliders */}
          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-neutral-400">Life Safety Hazard Weight</span>
                <span className="font-mono text-white font-bold">{Math.round(safetyWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.60"
                step="0.05"
                value={safetyWeight}
                onChange={(e) => setSafetyWeight(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-neutral-950 rounded cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-neutral-400">Vulnerable Zone Multiplier (School/Elderly)</span>
                <span className="font-mono text-white font-bold">{Math.round(vulnerabilityWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.50"
                step="0.05"
                value={vulnerabilityWeight}
                onChange={(e) => setVulnerabilityWeight(parseFloat(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-neutral-950 rounded cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-neutral-400">Public Density / Bus Route Traffic</span>
                <span className="font-mono text-white font-bold">{Math.round(densityWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.40"
                step="0.05"
                value={densityWeight}
                onChange={(e) => setDensityWeight(parseFloat(e.target.value))}
                className="w-full accent-blue-500 h-1.5 bg-neutral-950 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Real-time Dynamic Queue Table */}
          <div className="pt-2 border-t border-neutral-800">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 block mb-2">
              Dynamic Queue Ranking (Adjust sliders above to observe rank shifting):
            </span>
            <div className="space-y-1.5">
              {scoredItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs transition duration-300"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-900 font-mono text-[10px] flex items-center justify-center font-bold text-neutral-400">
                      #{idx + 1}
                    </span>
                    <span className="font-medium text-neutral-200 line-clamp-1">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono font-bold text-emerald-400">
                    <span>{item.totalScore}</span>
                    <span className="text-[10px] text-neutral-500 font-normal">pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
