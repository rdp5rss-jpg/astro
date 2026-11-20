import React, { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  Sparkles, 
  MessageSquare, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  Flame,
  Clock,
  Compass
} from 'lucide-react';
import { astrologers } from '../data/astrologers';

export default function MatchScreen({ 
  onComplete, 
  onExploreAll,
  seekerName = 'Seeker', 
  seekerData 
}) {
  const [phase, setPhase] = useState('searching'); // 'searching' | 'matched'
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [autoChatCountdown, setAutoChatCountdown] = useState(4);

  // Pick top matched astrologer
  const matchedAstrologer = astrologers[0]; // Acharya Rudranand Shastri (Top Vedic & KP Guru)

  const birthDesc = seekerData?.birthDay && seekerData?.birthMonth && seekerData?.birthYear
    ? `${seekerData.birthDay} ${seekerData.birthMonth} ${seekerData.birthYear} · ${seekerData.birthCity || 'New Delhi'}`
    : 'Aligning planetary birth coordinates...';

  const topicDesc = seekerData?.subTopic || seekerData?.topic || 'Marriage, Career & Financial Destiny';

  const langDesc = seekerData?.languages && seekerData.languages.length > 0
    ? seekerData.languages.join(' · ')
    : 'Hindi, English & Sanskrit';

  const steps = [
    { title: 'Reading your birth chart', desc: birthDesc },
    { title: "Focusing on what's on your mind", desc: topicDesc },
    { title: 'Shortlisting astrologers who speak', desc: langDesc },
    { title: "Checking who's available right now", desc: '12 online Gurus' },
    { title: 'Picking your best match', desc: 'Acharya Rudranand (98% Match)' },
  ];

  // Step sequencer for searching phase
  useEffect(() => {
    if (phase === 'searching') {
      if (currentStepIndex < steps.length - 1) {
        const timer = setTimeout(() => {
          setCurrentStepIndex(prev => prev + 1);
        }, 900);
        return () => clearTimeout(timer);
      } else {
        const matchFoundTimer = setTimeout(() => {
          setPhase('matched');
        }, 1100);
        return () => clearTimeout(matchFoundTimer);
      }
    }
  }, [phase, currentStepIndex]);

  // Auto-connect timer in matched phase
  useEffect(() => {
    if (phase === 'matched') {
      if (autoChatCountdown > 0) {
        const timer = setTimeout(() => {
          setAutoChatCountdown(prev => prev - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        // Auto open chat when countdown finishes
        handleStartChat();
      }
    }
  }, [phase, autoChatCountdown]);

  const handleStartChat = () => {
    if (onComplete) {
      onComplete(matchedAstrologer);
    }
  };

  const handleDismiss = () => {
    if (onExploreAll) {
      onExploreAll();
    } else if (onComplete) {
      onComplete(null);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 20px',
      background: 'radial-gradient(circle at 50% 25%, rgba(254, 240, 138, 0.45) 0%, transparent 45%), radial-gradient(circle at 10% 80%, rgba(244, 114, 182, 0.35) 0%, transparent 45%), radial-gradient(circle at 90% 75%, rgba(147, 197, 253, 0.45) 0%, transparent 50%), radial-gradient(circle at 50% 90%, rgba(167, 243, 208, 0.4) 0%, transparent 40%), #FFFFFF',
      color: '#1E1B4B',
      userSelect: 'none',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Background Orbit Rings */}
      <div style={{
        position: 'absolute',
        top: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        border: '1px dashed rgba(200, 90, 50, 0.22)',
        pointerEvents: 'none',
      }} />

      {/* Top Header with Close Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex: 10 }}>
        <button
          onClick={handleDismiss}
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
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>

      {/* PHASE 1: SEARCHING & MATCHING */}
      {phase === 'searching' && (
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
          {/* Glowing Orange Circle with 4-Point Star */}
          <div style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            backgroundColor: '#C85A32',
            background: 'linear-gradient(135deg, #D46A43 0%, #B84D28 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(184, 77, 40, 0.4)',
            marginBottom: '20px',
            position: 'relative'
          }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
            </svg>
          </div>

          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#1E1B4B',
            textAlign: 'center',
            letterSpacing: '-0.5px',
            marginBottom: '6px'
          }}>
            Finding your<br />perfect match
          </h1>

          <p style={{
            fontSize: '13px',
            color: '#64748B',
            textAlign: 'center',
            marginBottom: '24px',
            fontWeight: '500'
          }}>
            Synthesizing birth charts against verified Vedic astrologers.
          </p>

          {/* 5 Sequential Match Cards */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {steps.map((st, idx) => {
              const isDone = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const isPending = idx > currentStepIndex;

              return (
                <div
                  key={idx}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '20px',
                    backgroundColor: isCurrent ? 'rgba(200, 90, 50, 0.08)' : isDone ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.6)',
                    border: isCurrent ? '1.5px solid #C85A32' : '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    opacity: isPending ? 0.35 : 1,
                    transition: 'all 0.3s ease',
                    boxShadow: isCurrent ? '0 4px 15px rgba(200, 90, 50, 0.1)' : '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{
                    width: '26px',
                    height: '26px',
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
                    {isDone && <Check size={14} strokeWidth={3} />}
                  </div>

                  <div style={{ textAlign: 'left' }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '800',
                      color: isCurrent ? '#C85A32' : '#1E1B4B'
                    }}>
                      {st.title}
                    </div>
                    <div style={{
                      fontSize: '11.5px',
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
      )}

      {/* PHASE 2: PERCENT MATCH FOUND ASTRO PAGE */}
      {phase === 'matched' && (
        <div style={{
          maxWidth: '460px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
          animation: 'fadeIn 0.4s ease'
        }}>
          {/* Match Percent Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
            border: '1.5px solid #F59E0B',
            boxShadow: '0 4px 14px rgba(217, 119, 6, 0.18)',
            marginBottom: '14px'
          }}>
            <Sparkles size={14} color="#B45309" />
            <span style={{ fontSize: '12px', fontWeight: '900', color: '#92400E', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
              98% Celestial Match Found!
            </span>
          </div>

          <h1 style={{
            fontSize: '26px',
            fontWeight: '900',
            color: '#1E1B4B',
            textAlign: 'center',
            letterSpacing: '-0.5px',
            marginBottom: '6px',
            lineHeight: 1.2
          }}>
            Your Best Matched Acharya
          </h1>

          <p style={{
            fontSize: '12px',
            color: '#64748B',
            textAlign: 'center',
            marginBottom: '20px',
            maxWidth: '340px'
          }}>
            Highest alignment with your Janam Kundli and spiritual inquiry for {seekerName}.
          </p>

          {/* Matched Astrologer Card */}
          <div style={{
            width: '100%',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(254, 243, 199, 0.5) 100%)',
            border: '2px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '24px',
            padding: '20px',
            boxShadow: '0 12px 36px rgba(200, 90, 50, 0.14)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Top row: Avatar & Core Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={matchedAstrologer.avatar}
                  alt={matchedAstrologer.name}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #F59E0B',
                    boxShadow: '0 4px 12px rgba(217, 119, 6, 0.25)'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#16A34A',
                  border: '2px solid #FFFFFF'
                }} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#1E1B4B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {matchedAstrologer.name}
                  </h3>
                  <ShieldCheck size={16} color="#D97706" style={{ flexShrink: 0 }} />
                </div>
                <p style={{ fontSize: '12px', fontWeight: '700', color: '#C85A32', marginTop: '1px' }}>
                  {matchedAstrologer.title}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '11px', color: '#64748B' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#D97706', fontWeight: '800' }}>
                    <Star size={12} fill="#D97706" /> {matchedAstrologer.rating}
                  </span>
                  <span>•</span>
                  <span>{matchedAstrologer.experienceYears}+ yrs exp</span>
                  <span>•</span>
                  <span style={{ color: '#16A34A', fontWeight: '800' }}>Active Now</span>
                </div>
              </div>
            </div>

            {/* Match breakdown highlights */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px 14px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '11.5px',
              color: '#334155'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🔮 <strong>Planetary Harmony:</strong>
                </span>
                <strong style={{ color: '#15803D' }}>99% Alignment</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🗣️ <strong>Language Match:</strong>
                </span>
                <strong style={{ color: '#1E1B4B' }}>Hindi, English, Sanskrit</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🎯 <strong>Specialization:</strong>
                </span>
                <strong style={{ color: '#C85A32' }}>Vedic Kundli & Marriage</strong>
              </div>
            </div>

            {/* Special Offer Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '14px',
              backgroundColor: '#FEF3C7',
              border: '1px solid #FCD34D'
            }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#92400E', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                  Festive Maha Rate
                </span>
                <div style={{ fontSize: '14px', fontWeight: '900', color: '#78350F' }}>
                  ₹{matchedAstrologer.ratePerMin}/min{' '}
                  <span style={{ fontSize: '11px', textDecoration: 'line-through', color: '#B45309', fontWeight: '600' }}>
                    ₹{matchedAstrologer.originalRatePerMin}/min
                  </span>
                </div>
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: '900',
                color: '#15803D',
                backgroundColor: '#DCFCE7',
                padding: '3px 8px',
                borderRadius: '8px'
              }}>
                50% OFF
              </span>
            </div>

            {/* Start Chat Button */}
            <button
              onClick={handleStartChat}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #D46A43 0%, #C85A32 60%, #B84D28 100%)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '900',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: 'none',
                boxShadow: '0 6px 20px rgba(200, 90, 50, 0.35)',
                cursor: 'pointer',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <MessageSquare size={18} />
              Start 1-on-1 Astro Chat Now
              <ArrowRight size={16} />
            </button>

            {/* Countdown notice */}
            <div style={{ textAlign: 'center', fontSize: '11px', color: '#64748B' }}>
              Auto-connecting in <strong style={{ color: '#C85A32' }}>{autoChatCountdown}s</strong> • Or tap above to connect now
            </div>
          </div>
        </div>
      )}

      {/* Bottom Progress Bar in Searching Phase */}
      {phase === 'searching' && (
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
      )}

      {/* Secondary Browse Link in Matched Phase */}
      {phase === 'matched' && (
        <div style={{ maxWidth: '460px', width: '100%', margin: '0 auto', textAlign: 'center', paddingTop: '10px', position: 'relative', zIndex: 10 }}>
          <button
            onClick={handleDismiss}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '12px',
              color: '#64748B',
              fontWeight: '700',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Or browse all 12 online astrologers
          </button>
        </div>
      )}
    </div>
  );
}
