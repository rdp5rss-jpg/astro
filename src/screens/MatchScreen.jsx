import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';

export default function MatchScreen({ onComplete, seekerName = 'Rohan' }) {
  const steps = [
    'Calculating Exact Lahiri Ayanamsha (24° 15\' 12")...',
    'Aligning Vimshottari Mahadasha & Antardasha Matrix...',
    'Scanning 4,200+ Certified Vedic Masters & Gurus...',
    'Harmonizing Astrological Specialty & Linguistic Affinity...',
    'Paired with Acharya Sandhya (32 yrs exp • 99.4% Accuracy)!'
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (currentStepIndex < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 1100);
      return () => clearInterval(timer);
    } else {
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 1400);
      return () => clearInterval(finishTimer);
    }
  }, [currentStepIndex]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-amber-50/95 via-white/95 to-slate-100/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="max-w-md w-full glass-card p-8 border border-amber-200/80 shadow-2xl relative overflow-hidden">
        {/* Glowing aura orb */}
        <div className="absolute -top-12 -left-12 w-44 h-44 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Orbiting Compass Icon */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center shadow-lg">
            <Compass size={32} className="animate-pulse" />
          </div>
        </div>

        <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200">
          Cosmic Astrologer Matchmaker
        </span>

        <h2 className="text-xl font-bold font-serif text-slate-800 mt-3 mb-1">
          Synthesizing {seekerName}'s Destiny Field
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Connecting your planetary coordinates to the ideal Vedic mentor
        </p>

        {/* Progress Checklist */}
        <div className="space-y-3 text-left">
          {steps.map((text, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isPending = idx > currentStepIndex;

            return (
              <div 
                key={idx}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-500 ${
                  isCurrent 
                    ? 'bg-amber-100/70 border border-amber-300 text-slate-900 shadow-xs' 
                    : isDone 
                    ? 'text-slate-700' 
                    : 'text-slate-400 opacity-40'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-amber-600 border-t-transparent animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
                )}
                <span className={`text-xs ${isCurrent ? 'font-bold' : isDone ? 'font-medium' : ''}`}>
                  {text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Reassurance */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>Vedic privacy & sacred data confidentiality guaranteed</span>
        </div>
      </div>
    </div>
  );
}
