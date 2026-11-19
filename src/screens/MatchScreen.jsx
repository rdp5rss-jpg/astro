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
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'radial-gradient(circle at 50% 50%, rgba(254, 243, 199, 0.7) 0%, rgba(248, 249, 254, 0.96) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '460px',
          borderRadius: '32px',
          padding: '36px 28px',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(108, 74, 182, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Animated Compass Orb */}
        <div style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(217, 119, 6, 0.35)',
          marginBottom: '20px',
          position: 'relative'
        }}>
          <Compass size={44} color="#FFFFFF" className="animate-spin-slow" />
        </div>

        <span style={{
          fontSize: '11px',
          fontWeight: '800',
          letterSpacing: '1.5px',
          color: '#B45309',
          backgroundColor: '#FEF3C7',
          padding: '4px 12px',
          borderRadius: '20px',
          border: '1px solid #FCD34D',
          textTransform: 'uppercase'
        }}>
          Cosmic Astrologer Matchmaker
        </span>

        <h2 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '22px',
          fontWeight: '800',
          color: '#1E1B4B',
          marginTop: '10px'
        }}>
          Synthesizing {seekerName}'s Destiny Field
        </h2>

        <p style={{
          fontSize: '12.5px',
          color: '#64748B',
          marginTop: '4px',
          marginBottom: '24px'
        }}>
          Connecting your planetary coordinates to the ideal Vedic mentor
        </p>

        {/* Progress Checklist */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
          {steps.map((text, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '16px',
                  backgroundColor: isCurrent ? '#FFFBEB' : isDone ? '#F8FAFC' : 'transparent',
                  border: isCurrent ? '1.5px solid #FCD34D' : isDone ? '1px solid #E2E8F0' : '1px solid transparent',
                  opacity: isDone || isCurrent ? 1 : 0.35,
                  transition: 'all 0.3s ease'
                }}
              >
                {isDone ? (
                  <CheckCircle2 size={18} color="#059669" style={{ flexShrink: 0 }} />
                ) : isCurrent ? (
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: '2.5px solid #D97706',
                    borderTopColor: 'transparent',
                    animation: 'spinSlow 1s linear infinite',
                    flexShrink: 0
                  }} />
                ) : (
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: '1.5px solid #CBD5E1',
                    flexShrink: 0
                  }} />
                )}
                <span style={{
                  fontSize: '12px',
                  fontWeight: isCurrent ? '800' : '600',
                  color: isCurrent ? '#92400E' : isDone ? '#1E293B' : '#94A3B8'
                }}>
                  {text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Security / Confidentiality */}
        <div style={{
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11.5px',
          color: '#64748B'
        }}>
          <ShieldCheck size={16} color="#059669" />
          <span>Vedic privacy & sacred data confidentiality guaranteed</span>
        </div>
      </div>
    </div>
  );
}
