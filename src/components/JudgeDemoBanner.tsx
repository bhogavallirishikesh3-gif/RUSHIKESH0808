import React, { useState, useEffect } from 'react';
import { Award, ChevronLeft, ChevronRight, Play, Pause, Sparkles, CheckCircle2, Eye, HelpCircle, X } from 'lucide-react';
import { DEMO_STEPS } from '../data/mockData';

interface JudgeDemoBannerProps {
  currentStepIndex: number;
  onStepChange: (stepIndex: number) => void;
  onNavigateView: (view: 'citizen' | 'admin' | 'pipeline' | 'honesty') => void;
}

export const JudgeDemoBanner: React.FC<JudgeDemoBannerProps> = ({
  currentStepIndex,
  onStepChange,
  onNavigateView,
}) => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const currentStep = DEMO_STEPS[currentStepIndex];

  // Auto-drive walkthrough timer
  useEffect(() => {
    let timer: any;
    if (isAutoPlaying) {
      timer = setTimeout(() => {
        if (currentStepIndex < DEMO_STEPS.length - 1) {
          handleGoToStep(currentStepIndex + 1);
        } else {
          setIsAutoPlaying(false);
        }
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentStepIndex]);

  const handleGoToStep = (index: number) => {
    onStepChange(index);
    const target = DEMO_STEPS[index];
    if (target) {
      onNavigateView(target.view);
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-40 animate-in fade-in">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-2xl border border-emerald-400/30 transition transform hover:scale-105"
        >
          <Award className="w-4 h-4 text-amber-300" />
          <span>Resume 5-Min Judge Tour (Step {currentStepIndex + 1}/5)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-neutral-950/85 backdrop-blur-xl border-b border-emerald-500/20 shadow-xl sticky top-16 z-20">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left Title & Current Step */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <Award className="w-5 h-5 text-amber-400" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="empty:hidden text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30"></span>
                <span className="text-xs text-neutral-400 font-mono">
                  Step {currentStep.step} of 5
                </span>
              </div>
              <h2 className="text-sm font-bold text-neutral-100 flex items-center gap-1.5 mt-0.5">
                {currentStep.title}
              </h2>
            </div>
          </div>

          {/* Action Prompt Guide */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-300 max-w-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{currentStep.actionPrompt}</span>
          </div>

          {/* Controls: Prev, Next, Auto-Drive, Minimize */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Step navigation dots */}
            <div className="hidden sm:flex items-center gap-1.5 mr-2">
              {DEMO_STEPS.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => handleGoToStep(idx)}
                  className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold transition flex items-center justify-center ${
                    idx === currentStepIndex
                      ? 'bg-emerald-500 text-neutral-950 shadow-md shadow-emerald-500/20'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                  title={s.title}
                >
                  {s.step}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleGoToStep(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-300 transition"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleGoToStep(Math.min(DEMO_STEPS.length - 1, currentStepIndex + 1))}
              disabled={currentStepIndex === DEMO_STEPS.length - 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-semibold text-xs shadow-sm transition"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                isAutoPlaying
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white'
              }`}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoPlaying ? 'Pause Tour' : 'Auto-Drive'}</span>
            </button>

            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition ml-1"
              title="Minimize Guided Banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
