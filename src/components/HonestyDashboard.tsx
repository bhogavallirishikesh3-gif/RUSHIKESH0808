import React from 'react';
import { ShieldCheck, AlertCircle, CheckCircle, Code2, Lock, ArrowUpRight, Cpu, FileCheck2, Database, EyeOff } from 'lucide-react';

export const HonestyDashboard: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Hackathon Transparency & Audit
          </span>
          <span className="text-xs text-neutral-400">PromptWars x ASTRA Hackathon Evaluation</span>
        </div>
        <h1 className="text-2xl font-bold text-neutral-100 tracking-tight">
          Limitations, Honesty & System Architecture Dashboard
        </h1>
        <p className="text-xs text-neutral-400 mt-1 max-w-3xl leading-relaxed">
          In strict compliance with hackathon judging criteria, this panel provides full technical honesty regarding what is powered by Gemini 3.8 Flash AI, what relies on deterministic algorithms, edge cases, and future production roadmap.
        </p>
      </div>

      {/* Grid: What is Real vs Simulated */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Live AI & Real Engine */}
        <div className="eco-glass-card rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle className="w-5 h-5" />
            <h3 className="font-semibold text-neutral-100 text-sm">Live AI & Algorithmic Capabilities</h3>
          </div>
          <ul className="space-y-3 text-xs text-neutral-300">
            <li className="flex items-start gap-2 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
              <Cpu className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Gemini 3.8 Flash Multimodal Vision:</strong>
                Real-time image inspection, detecting physical surface defects, exposed electrical wiring, water pressure geysers, and safety hazards from user camera snapshots.
              </div>
            </li>
            <li className="flex items-start gap-2 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
              <Cpu className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">WebRTC Real Device Camera Access:</strong>
                Full `navigator.mediaDevices.getUserMedia` video stream with viewfinder HUD, reticle framing, front/rear camera switching, and capture flash.
              </div>
            </li>
            <li className="flex items-start gap-2 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
              <Cpu className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Semantic Deduplication & Cluster Engine:</strong>
                Haversine distance &lt;150m radius calculation combined with cosine vector/token similarity matching to merge duplicate complaints.
              </div>
            </li>
            <li className="flex items-start gap-2 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
              <Cpu className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Multi-Factor Prioritization Formula:</strong>
                Deterministic mathematical scoring matrix dynamically weighted for school zones, elderly transit corridors, and public hazard severity.
              </div>
            </li>
          </ul>
        </div>

        {/* Simulated / Prototype Scope */}
        <div className="eco-glass-card rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertCircle className="w-5 h-5" />
            <h3 className="font-semibold text-neutral-100 text-sm">Simulated Mock Layers (Hackathon Prototype)</h3>
          </div>
          <ul className="space-y-3 text-xs text-neutral-300">
            <li className="flex items-start gap-2 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
              <Database className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Municipal Fleet Telemetry:</strong>
                Crew truck locations and live transit GPS coordinates are simulated for demonstration rather than polling live municipal OBD-II vehicle trackers.
              </div>
            </li>
            <li className="flex items-start gap-2 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
              <Database className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">SCADA Water Valve Remote Actuation:</strong>
                Automated water main shutdown commands are simulated; real-world deployment requires air-gapped critical infrastructure protocols.
              </div>
            </li>
            <li className="flex items-start gap-2 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
              <Database className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">SMS Cellular Citizen Broadcasts:</strong>
                Public notification drafts are generated in real-time, with cellular telco SMS gateway delivery simulated in the UI preview.
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Edge Cases & Failure Handling */}
      <div className="eco-glass-card rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="font-semibold text-neutral-100 text-sm flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-400" />
          Edge Cases & Failure Handling Strategy
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <h4 className="font-bold text-neutral-200 mb-1">Blurry / Night-Time Photography</h4>
            <p className="text-neutral-400 leading-relaxed">
              When visual sharpness drops below model confidence thresholds, the system flags the issue for "Secondary Human Field Verification" instead of hallucinating high severity.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <h4 className="font-bold text-neutral-200 mb-1">Adversarial / Prank Submissions</h4>
            <p className="text-neutral-400 leading-relaxed">
              The vision prompt enforces strict rejection of non-civic objects (e.g., indoor rooms, pets, memes), auto-tagging them as spam with zero municipal dispatch cost.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <h4 className="font-bold text-neutral-200 mb-1">GPS Multi-Path Drift in Canyons</h4>
            <p className="text-neutral-400 leading-relaxed">
              In urban high-rise canyons, GPS can drift up to 30m. The system leverages cross-street landmark extraction from the photo text to snap coordinates to the nearest road vector.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy & Future Roadmap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="eco-glass-card rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <EyeOff className="w-4 h-4" />
            <h3 className="font-semibold text-neutral-100 text-sm">Citizen Privacy Architecture</h3>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            DamGo AI adheres to privacy-by-design standards:
          </p>
          <ul className="text-xs text-neutral-400 space-y-2 list-disc list-inside">
            <li>Zero PII Requirement: Citizens can submit hazards completely anonymously without account signup.</li>
            <li>Client-side face & license plate blurring before transmission to backend repositories.</li>
            <li>Zero persistent storage of user biometrics or camera metadata beyond geographic lat/lng.</li>
          </ul>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <ArrowUpRight className="w-4 h-4" />
            <h3 className="font-semibold text-neutral-100 text-sm">Production Municipal Roadmap</h3>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Integration milestones for city government adoption:
          </p>
          <ul className="text-xs text-neutral-400 space-y-2 list-disc list-inside">
            <li><strong>Open311 Standard API:</strong> Direct bidirectional sync with municipal legacy ticketing portals.</li>
            <li><strong>ESRI ArcGIS Integration:</strong> Overlaying city pipe age and asphalt pavement condition index (PCI).</li>
            <li><strong>Autonomous Drone Dispatch:</strong> Automated site confirmation for high-voltage and bridge crack reports.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
