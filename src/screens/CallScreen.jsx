import React, { useState, useEffect } from 'react';
import { 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown,
  Clock,
  Coins
} from 'lucide-react';

export default function CallScreen({ astrologer, onEndCall, onSwitchToChat, walletBalance = 185 }) {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [callState, setCallState] = useState('connected'); // 'ringing' | 'connected'
  const [currentBalance, setCurrentBalance] = useState(walletBalance);

  const rate = astrologer.ratePerMin || astrologer.rate || 35;

  // Call timer & balance deduction per minute
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        const next = prev + 1;
        // Deduct 1 min rate every 60 seconds
        if (next % 60 === 0) {
          setCurrentBalance(bal => Math.max(0, bal - rate));
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [rate]);

  const formatCallTime = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: '#0F172A',
        background: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0F172A 70%, #020617 100%)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 20px 36px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Top Header Bar */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={onEndCall}
            style={{
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Minimize"
          >
            <ChevronDown size={22} />
          </button>

          {/* Secure Encryption Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              fontSize: '11px',
              fontWeight: '800',
              color: '#6EE7B7',
            }}
          >
            <ShieldCheck size={14} />
            <span>256-bit Encrypted Voice</span>
          </div>

          {/* Astral Balance Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(245, 158, 11, 0.18)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              fontSize: '12px',
              fontWeight: '900',
              color: '#FCD34D',
            }}
          >
            <Coins size={13} color="#FBBF24" />
            <span>₹{currentBalance}</span>
          </div>
        </div>

        {/* Live Call Duration */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              fontSize: '13px',
              fontWeight: '700',
              color: '#94A3B8',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block', boxShadow: '0 0 8px #10B981' }} />
            <span>Connected • {formatCallTime(seconds)}</span>
          </div>
        </div>
      </div>

      {/* Center Astrologer Avatar & Soundwaves */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: 'auto 0' }}>
        {/* Pulsing Avatar Container */}
        <div style={{ position: 'relative', marginBottom: '22px' }}>
          {/* Subtle cosmic energy rings */}
          <div
            style={{
              position: 'absolute',
              inset: '-20px',
              borderRadius: '50%',
              border: '1.5px solid rgba(217, 119, 6, 0.35)',
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              border: '1.5px solid rgba(251, 191, 36, 0.5)',
            }}
          />

          <img
            src={astrologer.avatar}
            alt={astrologer.name}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #FCD34D',
              boxShadow: '0 12px 32px rgba(217, 119, 6, 0.4)',
              position: 'relative',
              zIndex: 2,
            }}
          />
        </div>

        {/* Astrologer Name & Designation */}
        <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#FFFFFF', marginBottom: '6px' }}>
          {astrologer.name}
        </h2>
        <p style={{ fontSize: '13px', color: '#FCD34D', fontWeight: '700', marginBottom: '4px' }}>
          {astrologer.title || astrologer.specialty || 'Senior Vedic Astrologer'}
        </p>
        <span style={{ fontSize: '12px', color: '#94A3B8' }}>
          ₹{rate}/min • Voice Consultation
        </span>

        {/* Live Audio Equalizer Waveform Bars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '24px', marginTop: '20px' }}>
          {[14, 22, 18, 24, 12, 20, 16, 24, 10, 18, 22, 14].map((h, i) => (
            <div
              key={i}
              style={{
                width: '3.5px',
                height: `${h}px`,
                backgroundColor: '#F59E0B',
                borderRadius: '999px',
                opacity: 0.85,
              }}
            />
          ))}
        </div>

        <p style={{ fontSize: '12px', color: '#CBD5E1', marginTop: '14px', maxWidth: '280px', fontStyle: 'italic' }}>
          "Shubh Muhurat active. Guru is listening to your queries..."
        </p>
      </div>

      {/* Bottom Action Controls */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            maxWidth: '340px',
            margin: '0 auto 24px',
            gap: '16px',
          }}
        >
          {/* Mute Button */}
          <button
            onClick={() => setIsMuted(prev => !prev)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: isMuted ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.1)',
              border: isMuted ? '1px solid #EF4444' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              color: isMuted ? '#EF4444' : '#FFFFFF',
              cursor: 'pointer',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
          >
            {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
          </button>

          {/* Speaker Button */}
          <button
            onClick={() => setIsSpeaker(prev => !prev)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: isSpeaker ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.1)',
              border: isSpeaker ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              color: isSpeaker ? '#FCD34D' : '#FFFFFF',
              cursor: 'pointer',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
          >
            {isSpeaker ? <Volume2 size={22} /> : <VolumeX size={22} />}
          </button>

          {/* Switch to Chat Button */}
          <button
            onClick={() => onSwitchToChat(astrologer)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              color: '#FFFFFF',
              cursor: 'pointer',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
            title="Switch to Chat"
          >
            <MessageSquare size={22} color="#60A5FA" />
          </button>
        </div>

        {/* End Call Button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={onEndCall}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: '100%',
              maxWidth: '300px',
              padding: '16px',
              borderRadius: '35px',
              backgroundColor: '#DC2626',
              background: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(220, 38, 38, 0.4)',
              transition: 'transform 0.15s ease',
            }}
          >
            <PhoneOff size={20} />
            <span>End Consultation Call</span>
          </button>
        </div>
      </div>
    </div>
  );
}
