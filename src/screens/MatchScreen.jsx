import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

export default function MatchScreen({ onComplete, seekerName = 'Mahi' }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    { title: 'Reading your birth chart', desc: '14 October 1980 · New Delhi, India' },
    { title: 'Focusing on what\'s on your mind', desc: 'Career & Promotions' },
    { title: 'Shortlisting astrologers who speak', desc: 'English · हिंदी' },
    { title: 'Checking who\'s available right now', desc: '12 online' },
    { title: 'Picking your best match', desc: 'Best fit for you' },
  ];

  useEffect(() => {
    if (currentStepIndex < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 1300);
      return () => clearInterval(finishTimer);
    }
  }, [currentStepIndex]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '30px 20px',
      background: 'radial-gradient(circle at 50% 25%, rgba(254, 240, 138, 0.45) 0%, transparent 45%), radial-gradient(circle at 10% 80%, rgba(244, 114, 182, 0.35) 0%, transparent 45%), radial-gradient(circle at 90% 75%, rgba(147, 197, 253, 0.45) 0%, transparent 50%), radial-gradient(circle at 50% 90%, rgba(167, 243, 208, 0.4) 0%, transparent 40%), #FFFFFF',
      color: '#1E1B4B',
      userSelect: 'none',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Constellation / Orbit Rings */}
      <div style={{
        position: 'absolute',
        top: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        border: '1px dashed rgba(200, 90, 50, 0.25)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '420px',
        height: '420px',
        borderRadius: '50%',
        border: '1px dashed rgba(200, 90, 50, 0.18)',
        pointerEvents: 'none',
      }} />

      {/* Top Header with Close Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex: 10 }}>
        <button
          onClick={onComplete}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Center Animated Solar System / Star Orb */}
      <div style={{
        maxWidth: '460px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Glowing Orange Circle with 4-Pointed Star from reference photo */}
        <div style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          backgroundColor: '#C85A32',
          background: 'linear-gradient(135deg, #D46A43 0%, #B84D28 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(184, 77, 40, 0.4)',
          marginBottom: '24px',
          position: 'relative'
        }}>
          {/* 4-Point Star SVG from WhatsApp Screenshot */}
          <svg width="36" height="36" viewBox="0 0 24 24" fill="#FFFFFF">
            <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
          </svg>
        </div>

        <h1 style={{
          fontSize: '30px',
          fontWeight: '800',
          color: '#1E1B4B',
          textAlign: 'center',
          letterSpacing: '-0.5px',
          marginBottom: '6px'
        }}>
          Finding your<br />perfect match
        </h1>

        <p style={{
          fontSize: '14px',
          color: '#64748B',
          textAlign: 'center',
          marginBottom: '28px',
          fontWeight: '500'
        }}>
          Matching you against our verified astrologers.
        </p>

        {/* 5 Sequential Match Cards matching WhatsApp Image 2026-11-19 at 4.39.07 PM (1).jpeg */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {steps.map((st, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isPending = idx > currentStepIndex;

            return (
              <div
                key={idx}
                style={{
                  padding: '16px 20px',
                  borderRadius: '24px',
                  backgroundColor: isCurrent ? 'rgba(200, 90, 50, 0.08)' : isDone ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.6)',
                  border: isCurrent ? '1.5px solid #C85A32' : '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  opacity: isPending ? 0.35 : 1,
                  transition: 'all 0.3s ease',
                  boxShadow: isCurrent ? '0 4px 15px rgba(200, 90, 50, 0.1)' : '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                {/* Indicator icon */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: isDone ? '#C85A32' : 'transparent',
                  border: isDone ? 'none' : isCurrent ? '2.5px solid #C85A32' : '1.5px solid #CBD5E1',
                  borderTopColor: isCurrent ? 'transparent' : undefined,
                  animation: isCurrent ? 'spinSlow 1s linear infinite' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: '#FFFFFF'
                }}>
                  {isDone && <Check size={16} strokeWidth={3} />}
                </div>

                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    fontSize: '14.5px',
                    fontWeight: '800',
                    color: isCurrent ? '#C85A32' : '#1E1B4B'
                  }}>
                    {st.title}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#64748B',
                    marginTop: '2px',
                    fontWeight: '500'
                  }}>
                    {st.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Horizontal Progress Bar from Reference */}
      <div style={{
        maxWidth: '460px',
        width: '100%',
        margin: '0 auto',
        paddingTop: '20px',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{ width: '100%', height: '4px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            backgroundColor: '#C85A32',
            width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>
    </div>
  );
}
