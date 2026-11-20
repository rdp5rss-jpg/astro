import React from 'react';
import { Headphones, Star, ArrowRight } from 'lucide-react';

export default function WelcomeScreen({ onContinue, onSignOut, onSupport }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 20px',
      background: 'radial-gradient(circle at 50% 20%, rgba(254, 240, 138, 0.45) 0%, transparent 40%), radial-gradient(circle at 10% 80%, rgba(244, 114, 182, 0.35) 0%, transparent 45%), radial-gradient(circle at 90% 75%, rgba(147, 197, 253, 0.45) 0%, transparent 50%), radial-gradient(circle at 50% 90%, rgba(167, 243, 208, 0.4) 0%, transparent 40%), #FFFFFF',
      color: '#1E1B4B',
      userSelect: 'none',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Starry Particles / Constellations */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(108, 74, 182, 0.12) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
      }} />

      {/* Top Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Support Pill Button */}
        <button
          onClick={onSupport || (() => alert('🎧 Connecting you to Bhavishyaa Vedic Concierge...'))}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '30px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1.5px solid #E2E8F0',
            color: '#1E1B4B',
            fontSize: '13px',
            fontWeight: '700',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            cursor: 'pointer',
          }}
        >
          <Headphones size={16} color="#6C4AB6" />
          <span>Support</span>
        </button>

        {/* Sign out */}
        <button
          onClick={onSignOut}
          style={{
            fontSize: '13.5px',
            fontWeight: '700',
            color: '#64748B',
            cursor: 'pointer',
            padding: '8px 12px',
          }}
        >
          Sign out
        </button>
      </div>

      {/* Center Hero: Welcome to Bhavishyaa */}
      <div style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '20px 0',
      }}>
        {/* Sun Emblem */}
        <div style={{ marginBottom: '20px', position: 'relative' }}>
          <svg 
            width="110" 
            height="70" 
            viewBox="0 0 130 80" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 70 C 20 28, 110 28, 110 70 Z" fill="#D97706" />
            <circle cx="65" cy="62" r="16" fill="#FFFFFF" />
            <circle cx="22" cy="46" r="4.5" fill="#D97706" />
            <circle cx="42" cy="22" r="5" fill="#D97706" />
            <circle cx="65" cy="10" r="5.5" fill="#D97706" />
            <circle cx="88" cy="22" r="5" fill="#D97706" />
            <circle cx="108" cy="46" r="4.5" fill="#D97706" />
            <path d="M42 35 L 65 14 L 88 35 Z" fill="#D97706" />
            <path d="M18 55 L 42 35 L 50 48 Z" fill="#D97706" />
            <path d="M112 55 L 88 35 L 80 48 Z" fill="#D97706" />
          </svg>
        </div>

        <h1 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '36px',
          fontWeight: '900',
          color: '#1E1B4B',
          lineHeight: '1.2',
          letterSpacing: '1px'
        }}>
          Welcome to<br />Bhavishyaa
        </h1>

        <p style={{
          fontSize: '15px',
          fontWeight: '700',
          color: '#64748B',
          marginTop: '12px',
        }}>
          The <span style={{ color: '#D97706', fontWeight: '900' }}>#1</span> Indian Astrology App
        </p>
      </div>

      {/* Bottom Section: Trustpilot + Continue Button */}
      <div style={{
        width: '100%',
        maxWidth: '460px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Trustpilot Stars */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} color="#F59E0B" fill="#F59E0B" />
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>
            4.9 out of 5 · 1,284 reviews on Trustpilot
          </p>
        </div>

        {/* Big Orange Continue Capsule Button */}
        <button
          onClick={onContinue}
          style={{
            width: '100%',
            padding: '18px 24px',
            borderRadius: '35px',
            backgroundColor: '#C85A32',
            background: 'linear-gradient(135deg, #D46A43 0%, #B84D28 100%)',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '800',
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 8px 25px rgba(184, 77, 40, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(184, 77, 40, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(184, 77, 40, 0.4)';
          }}
        >
          <span>Continue</span>
        </button>
      </div>
    </div>
  );
}
