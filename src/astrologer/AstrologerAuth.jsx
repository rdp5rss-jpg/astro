import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Phone, 
  Mail, 
  User, 
  Award, 
  BookOpen, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { astrologers } from '../data/astrologers';

export default function AstrologerAuth({ onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  
  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('rudranand@bhavishyaa.com');
  const [loginPassword, setLoginPassword] = useState('vedic1234');
  
  // Register Form State
  const [regName, setRegName] = useState('');
  const [regSpecialty, setRegSpecialty] = useState('Vedic Kundli & KP');
  const [regExp, setRegExp] = useState('12');
  const [regRate, setRegRate] = useState('35');
  const [regPhone, setRegPhone] = useState('');
  const [regLanguages, setRegLanguages] = useState('Hindi, English');
  const [regBio, setRegBio] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Default to first astrologer (Acharya Rudranand Shastri) or matched
    const matched = astrologers.find(a => 
      a.name.toLowerCase().includes(loginIdentifier.toLowerCase())
    ) || astrologers[0];
    onLoginSuccess(matched);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName.trim()) return;
    const newAstro = {
      id: String(Date.now()),
      name: regName,
      title: regSpecialty,
      experienceYears: Number(regExp),
      ratePerMin: Number(regRate),
      languages: regLanguages.split(',').map(s => s.trim()),
      bio: regBio || 'Certified Jyotish Acharya dedicated to authentic Vedic remedies and destiny alignment.',
      rating: 5.0,
      consultations: '0',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      isOnline: true,
      isCelebrity: false,
    };
    onLoginSuccess(newAstro);
  };

  const handleQuickLogin = (astro) => {
    onLoginSuccess(astro);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0F172A',
        background: 'radial-gradient(circle at 50% 10%, #1E1B4B 0%, #0F172A 70%, #020617 100%)',
        color: '#FFFFFF',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px 16px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          padding: '28px 24px',
          color: '#1E1B4B',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
          border: '1px solid #E2E8F0',
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #E06D3F 0%, #C85A32 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              margin: '0 auto 12px',
              boxShadow: '0 8px 20px rgba(200, 90, 50, 0.35)',
            }}
          >
            🕉️
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: '900', color: '#1E1B4B', letterSpacing: '-0.3px' }}>
            BHAVISHYAA GURU
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', fontWeight: '600' }}>
            Certified Vedic Astrologer Portal
          </p>
        </div>

        {/* Auth Mode Toggle Pill */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#F1F5F9',
            borderRadius: '16px',
            padding: '4px',
            marginBottom: '22px',
          }}
        >
          <button
            onClick={() => setMode('login')}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: mode === 'login' ? '#FFFFFF' : 'transparent',
              color: mode === 'login' ? '#C85A32' : '#64748B',
              fontWeight: '800',
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: mode === 'login' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Sign In to Console
          </button>

          <button
            onClick={() => setMode('register')}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: mode === 'register' ? '#FFFFFF' : 'transparent',
              color: mode === 'register' ? '#C85A32' : '#64748B',
              fontWeight: '800',
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: mode === 'register' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Register as Guru
          </button>
        </div>

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                Astrologer Mobile or Registered Email
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '14px',
                  border: '1.5px solid #E2E8F0',
                  padding: '0 14px',
                }}
              >
                <Mail size={16} color="#94A3B8" />
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="rudranand@bhavishyaa.com"
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    padding: '13px 10px',
                    fontSize: '14px',
                    color: '#1E1B4B',
                    width: '100%',
                    fontWeight: '600',
                  }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>
                  Secret Password / Security PIN
                </label>
                <span style={{ fontSize: '11px', color: '#C85A32', fontWeight: '700', cursor: 'pointer' }}>
                  Forgot PIN?
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '14px',
                  border: '1.5px solid #E2E8F0',
                  padding: '0 14px',
                }}
              >
                <Lock size={16} color="#94A3B8" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    padding: '13px 10px',
                    fontSize: '14px',
                    color: '#1E1B4B',
                    width: '100%',
                    fontWeight: '600',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '14px',
                borderRadius: '16px',
                backgroundColor: '#C85A32',
                background: 'linear-gradient(135deg, #D46A43 0%, #C85A32 100%)',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: '900',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(200, 90, 50, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'transform 0.15s ease',
              }}
            >
              <span>Access Guru Console</span>
              <ArrowRight size={17} />
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Full Name with Title (e.g. Acharya / Pandit / Dr.)
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Acharya Govind Shastri"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #E2E8F0',
                  backgroundColor: '#F8FAFC',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#1E1B4B',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Primary Lineage
                </label>
                <select
                  value={regSpecialty}
                  onChange={(e) => setRegSpecialty(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 10px',
                    borderRadius: '12px',
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#F8FAFC',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#1E1B4B',
                    outline: 'none',
                  }}
                >
                  <option value="Vedic Kundli & KP">Vedic Kundli & KP</option>
                  <option value="Celebrity Tarot">Celebrity Tarot</option>
                  <option value="Vastu & Dasha Remedies">Vastu & Dasha</option>
                  <option value="Nadi & Palmistry">Nadi & Palmistry</option>
                  <option value="Numerology Guidance">Numerology</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Years Experience
                </label>
                <input
                  type="number"
                  required
                  value={regExp}
                  onChange={(e) => setRegExp(e.target.value)}
                  placeholder="12"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#F8FAFC',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#1E1B4B',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Rate (₹ / minute)
                </label>
                <input
                  type="number"
                  required
                  value={regRate}
                  onChange={(e) => setRegRate(e.target.value)}
                  placeholder="35"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#F8FAFC',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#1E1B4B',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+91 98765 00000"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#F8FAFC',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#1E1B4B',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Languages Spoken
              </label>
              <input
                type="text"
                value={regLanguages}
                onChange={(e) => setRegLanguages(e.target.value)}
                placeholder="Hindi, English, Sanskrit"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1.5px solid #E2E8F0',
                  backgroundColor: '#F8FAFC',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#1E1B4B',
                  outline: 'none',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '14px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '900',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(16, 185, 129, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <CheckCircle2 size={16} />
              <span>Submit KYC & Enter Console</span>
            </button>
          </form>
        )}

        {/* Quick Demo Logins Bar */}
        <div style={{ marginTop: '22px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
          <p style={{ fontSize: '11px', color: '#64748B', fontWeight: '800', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
            Instant Demo Sign-in:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {astrologers.slice(0, 2).map((astro) => (
              <button
                key={astro.id}
                type="button"
                onClick={() => handleQuickLogin(astro)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img
                    src={astro.avatar}
                    alt={astro.name}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#1E1B4B' }}>{astro.name}</div>
                    <div style={{ fontSize: '10px', color: '#64748B' }}>{astro.title} • ₹{astro.ratePerMin}/m</div>
                  </div>
                </div>
                <ChevronRight size={14} color="#94A3B8" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
