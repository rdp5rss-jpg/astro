import React, { useState } from 'react';
import { Star, Mail, ArrowRight, Phone, Sparkles } from 'lucide-react';

export default function LoginScreen({ onLoginSuccess }) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '36px 20px',
      background: 'radial-gradient(circle at 10% 15%, rgba(254, 240, 138, 0.5) 0%, transparent 40%), radial-gradient(circle at 90% 20%, rgba(244, 114, 182, 0.35) 0%, transparent 45%), radial-gradient(circle at 50% 85%, rgba(147, 197, 253, 0.45) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(167, 243, 208, 0.45) 0%, transparent 40%), #FFFFFF',
      color: '#1E1B4B',
      userSelect: 'none',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Pastel Floating Aura Orbs */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 237, 213, 0.5) 0%, rgba(237, 233, 254, 0.4) 60%, transparent 100%)',
        filter: 'blur(30px)',
        pointerEvents: 'none',
      }} />

      {/* Top Section: Logo & Trustpilot Rating */}
      <div style={{ width: '100%', maxWidth: '420px', textAlign: 'center', marginTop: '20px', position: 'relative', zIndex: 10 }}>
        {/* Sun Emblem */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
          <svg 
            width="64" 
            height="40" 
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
          </svg>

          <span style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '24px',
            fontWeight: '900',
            letterSpacing: '3px',
            color: '#1E1B4B',
            marginTop: '4px'
          }}>
            BHAVISHYAA
          </span>
        </div>

        {/* 5-Star Trustpilot Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', marginBottom: '4px' }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={15} color="#F59E0B" fill="#F59E0B" />
          ))}
        </div>
        <p style={{ fontSize: '12.5px', color: '#64748B', fontWeight: '500' }}>
          4.9 out of 5 · 1,284 reviews on Trustpilot
        </p>
      </div>

      {/* Middle Section: Login or Sign Up Heading */}
      <div style={{ width: '100%', maxWidth: '420px', textAlign: 'center', my: 'auto', position: 'relative', zIndex: 10 }}>
        <h1 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '32px',
          fontWeight: '800',
          color: '#1E1B4B',
          marginBottom: '8px'
        }}>
          Login or sign up
        </h1>
        <p style={{ fontSize: '13px', color: '#64748B' }}>
          Your celestial gateway to destiny & Vedic clarity
        </p>
      </div>

      {/* Bottom Section: Action Buttons Card */}
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '420px',
          borderRadius: '32px',
          padding: '24px 20px',
          boxShadow: '0 16px 40px rgba(108, 74, 182, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {!showEmailForm ? (
          <>
            {/* Continue with Google */}
            <button
              onClick={onLoginSuccess}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '30px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1.5px solid #E2E8F0',
                color: '#1E1B4B',
                fontSize: '15px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                cursor: 'pointer',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)')}
            >
              {/* Google G Logo */}
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Continue with WhatsApp */}
            <button
              onClick={onLoginSuccess}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '30px',
                backgroundColor: '#22C55E',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(34, 197, 94, 0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#16A34A')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#22C55E')}
            >
              {/* WhatsApp Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M12.031 0C5.396 0 0 5.397 0 12.036c0 2.12.553 4.19 1.606 6.012L.062 24l6.128-1.608c1.758.96 3.75 1.468 5.841 1.468 6.635 0 12.031-5.397 12.031-12.036C24.062 5.397 18.666 0 12.031 0zm6.974 17.062c-.287.808-1.42 1.543-1.996 1.642-.553.093-1.272.132-2.05-.122-.49-.158-1.121-.368-1.928-.718-3.393-1.472-5.59-4.908-5.76-5.137-.168-.228-1.378-1.838-1.378-3.504 0-1.666.872-2.487 1.182-2.827.31-.34.678-.426.904-.426.226 0 .452.002.65.011.208.01.488-.079.764.582.288.687.978 2.392 1.063 2.568.085.176.142.382.029.61-.113.228-.17.368-.34.568-.17.2-.358.446-.512.6-.17.17-.348.354-.15.694.198.34.88 1.45 1.888 2.35 1.298 1.157 2.393 1.517 2.733 1.687.34.17.538.142.736-.086.198-.228.85-1.006 1.077-1.352.227-.346.453-.29.764-.175.311.115 1.97.93 2.31 1.1.34.17.566.255.651.397.085.142.085.823-.202 1.631z"/>
              </svg>
              <span>Continue with WhatsApp</span>
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '6px 0' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
              <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '600' }}>or</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
            </div>

            {/* Continue with Email */}
            <button
              onClick={() => setShowEmailForm(true)}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '30px',
                backgroundColor: '#C85A32',
                background: 'linear-gradient(135deg, #D46A43 0%, #B84D28 100%)',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(184, 77, 40, 0.35)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.92')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <Mail size={18} />
              <span>Continue with email</span>
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', display: 'block' }}>
                Email Address or Mobile Number
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seeker@bhavishyaa.com or +91 98765 43210"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '20px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '14px',
                  outline: 'none',
                  color: '#1E1B4B'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#D97706')}
                onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                autoFocus
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '30px',
                backgroundColor: '#D97706',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)',
              }}
            >
              <span>Get OTP & Login</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              onClick={() => setShowEmailForm(false)}
              style={{ fontSize: '12.5px', color: '#64748B', fontWeight: '600', cursor: 'pointer', textAlign: 'center' }}
            >
              ← Back to other options
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
