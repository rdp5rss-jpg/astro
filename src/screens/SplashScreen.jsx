import React, { useEffect } from 'react';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2400);
    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div 
      onClick={onFinish}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: '#C85A32', // Rich terracotta/vermilion from WhatsApp Image 2026-11-19 at 4.38.50 PM.jpeg
        background: 'radial-gradient(circle at 50% 45%, #D46A43 0%, #B84D28 70%, #9E3D1B 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glowing radial dust */}
      <div style={{
        position: 'absolute',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 237, 213, 0.25) 0%, transparent 70%)',
        animation: 'pulseGlow 2.5s ease-in-out infinite',
      }} />

      {/* Sun Emblem from reference screenshot */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg 
          width="130" 
          height="80" 
          viewBox="0 0 130 80" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginBottom: '8px' }}
        >
          {/* Central Half Sun / Arch */}
          <path 
            d="M20 70 C 20 28, 110 28, 110 70 Z" 
            fill="#FFF0DC" 
          />
          {/* Inner cutout circle */}
          <circle cx="65" cy="62" r="16" fill="#B84D28" />
          
          {/* Corona Rays with Dots */}
          <circle cx="22" cy="46" r="4.5" fill="#FFF0DC" />
          <circle cx="42" cy="22" r="5" fill="#FFF0DC" />
          <circle cx="65" cy="10" r="5.5" fill="#FFF0DC" />
          <circle cx="88" cy="22" r="5" fill="#FFF0DC" />
          <circle cx="108" cy="46" r="4.5" fill="#FFF0DC" />

          {/* Sharp Crown Spikes */}
          <path d="M42 35 L 65 14 L 88 35 Z" fill="#FFF0DC" />
          <path d="M18 55 L 42 35 L 50 48 Z" fill="#FFF0DC" />
          <path d="M112 55 L 88 35 L 80 48 Z" fill="#FFF0DC" />
        </svg>

        {/* Brand Name: BHAVISHYAA */}
        <h1 
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '34px',
            fontWeight: '900',
            letterSpacing: '5px',
            color: '#FFF0DC',
            marginTop: '6px',
            textShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
          }}
        >
          BHAVISHYAA
        </h1>

        <span style={{
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '3px',
          color: 'rgba(255, 240, 220, 0.85)',
          marginTop: '6px',
          textTransform: 'uppercase'
        }}>
          Vedic Destiny & Jyotish
        </span>
      </div>

      {/* Tap hint */}
      <div style={{
        position: 'absolute',
        bottom: '36px',
        color: 'rgba(255, 240, 220, 0.65)',
        fontSize: '12px',
        fontWeight: '600',
        letterSpacing: '1px'
      }}>
        Tap anywhere to continue
      </div>
    </div>
  );
}
