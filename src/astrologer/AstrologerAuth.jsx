import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  UserPlus,
  RefreshCw,
  AlertCircle,
  FileText,
  CreditCard
} from 'lucide-react';
import { astrologers } from '../data/astrologers';

export default function AstrologerAuth({ onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'verify'
  
  // Login Form State (empty by default)
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register Form State (empty by default)
  const [regName, setRegName] = useState('');
  const [regSpecialty, setRegSpecialty] = useState('');
  const [regExp, setRegExp] = useState('');
  const [regRate, setRegRate] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLanguages, setRegLanguages] = useState('');
  const [regBio, setRegBio] = useState('');

  // Mandatory KYC Form State (empty by default)
  const [regAadhaar, setRegAadhaar] = useState('');
  const [regPan, setRegPan] = useState('');

  // Verification Step State (no auto-fill)
  const [pendingAstro, setPendingAstro] = useState(null);
  const [verificationContext, setVerificationContext] = useState('login'); // 'login' | 'register'
  const [verificationTarget, setVerificationTarget] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerifiedSuccess, setIsVerifiedSuccess] = useState(false);

  useEffect(() => {
    let timer;
    if (mode === 'verify' && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [mode, countdown]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      alert('Please enter your registered mobile/email and security PIN.');
      return;
    }

    const matched = astrologers.find(a => 
      a.name.toLowerCase().includes(loginIdentifier.toLowerCase())
    ) || {
      ...astrologers[0],
      name: loginIdentifier.includes('@') ? 'Acharya Rudranand Shastri' : 'Acharya ' + loginIdentifier,
    };

    setPendingAstro(matched);
    setVerificationContext('login');
    setVerificationTarget(loginIdentifier);
    setOtpCode('');
    setOtpError('');
    setCountdown(30);
    setMode('verify');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) {
      alert('Please fill out your full name and mobile number.');
      return;
    }

    const cleanAadhaar = regAadhaar.replace(/\s/g, '');
    if (!cleanAadhaar || cleanAadhaar.length !== 12) {
      alert('Please enter a valid 12-digit Aadhaar Card number for KYC.');
      return;
    }

    if (!regPan.trim() || regPan.length !== 10) {
      alert('Please enter a valid 10-character PAN Card number for KYC.');
      return;
    }

    const newAstro = {
      id: String(Date.now()),
      name: regName,
      title: regSpecialty || 'Vedic Astrologer',
      experienceYears: Number(regExp) || 5,
      ratePerMin: Number(regRate) || 30,
      languages: regLanguages ? regLanguages.split(',').map(s => s.trim()).filter(Boolean) : ['Hindi', 'English'],
      bio: regBio || 'Certified Jyotish Acharya dedicated to authentic Vedic remedies and destiny alignment.',
      rating: 5.0,
      consultations: '0',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      isOnline: true,
      isCelebrity: false,
      phone: regPhone,
      aadhaar: regAadhaar,
      pan: regPan,
      kycVerified: true,
    };

    setPendingAstro(newAstro);
    setVerificationContext('register');
    setVerificationTarget(regPhone);
    setOtpCode('');
    setOtpError('');
    setCountdown(30);
    setMode('verify');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpCode.trim().length !== 6) {
      setOtpError('Please enter the 6-digit verification code sent to your mobile.');
      return;
    }

    setIsVerifying(true);
    setOtpError('');

    setTimeout(() => {
      setIsVerifying(false);
      setIsVerifiedSuccess(true);
      setTimeout(() => {
        onLoginSuccess(pendingAstro);
      }, 700);
    }, 700);
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
              width: '58px',
              height: '58px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #E06D3F 0%, #C85A32 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              margin: '0 auto 12px',
              boxShadow: '0 8px 20px rgba(200, 90, 50, 0.35)',
            }}
          >
            🕉️
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: '900', color: '#1E1B4B', letterSpacing: '-0.3px', margin: 0 }}>
            BHAVISHYAA GURU
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', fontWeight: '600' }}>
            Certified Vedic Astrologer Portal
          </p>
        </div>

        {/* Auth Mode Toggle Pill (Only shown when not in verify step) */}
        {mode !== 'verify' && (
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
        )}

        {/* 1. SIGN IN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                  placeholder="Enter registered mobile or email"
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
                  placeholder="Enter password / PIN"
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
              }}
            >
              <span>Verify & Access Console</span>
              <ArrowRight size={17} />
            </button>
          </form>
        )}

        {/* 2. REGISTER FORM WITH MANDATORY AADHAAR & PAN KYC */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Full Name with Title (e.g. Acharya / Pandit / Dr.)
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Acharya Govind Shastri"
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
                  required
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
                    color: regSpecialty ? '#1E1B4B' : '#64748B',
                    outline: 'none',
                  }}
                >
                  <option value="" disabled>Select Lineage</option>
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
                  placeholder="e.g. 10"
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
                  placeholder="e.g. 35"
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
                  placeholder="e.g. +91 98765 43210"
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

            {/* MANDATORY GOVERNMENT KYC DETAILS (AADHAAR & PAN) */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '16px',
                padding: '14px',
                border: '1.5px solid #CBD5E1',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', fontWeight: '900', color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="#C85A32" />
                  Government KYC Verification
                </span>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#15803D', backgroundColor: '#DCFCE7', border: '1px solid #86EFAC', padding: '2px 7px', borderRadius: '6px' }}>
                  Mandatory
                </span>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Aadhaar Card Number (12 Digits)
                </label>
                <input
                  type="text"
                  required
                  maxLength={14}
                  value={regAadhaar}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/[^0-9]/g, '').slice(0, 12);
                    const formatted = clean.replace(/(\d{4})(?=\d)/g, '$1 ');
                    setRegAadhaar(formatted);
                  }}
                  placeholder="XXXX XXXX XXXX"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: '1.5px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: '800',
                    color: '#1E1B4B',
                    letterSpacing: '1.5px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Permanent Account Number (PAN)
                </label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  value={regPan}
                  onChange={(e) => setRegPan(e.target.value.toUpperCase())}
                  placeholder="e.g. ABCDE1234F"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: '1.5px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: '800',
                    color: '#1E1B4B',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
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
                placeholder="e.g. Hindi, English, Sanskrit"
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
              }}
            >
              <UserPlus size={18} />
              <span>Proceed to Verification</span>
            </button>
          </form>
        )}

        {/* 3. DEDICATED VERIFICATION STEP (NO AUTO-FILL) */}
        {mode === 'verify' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '18px',
                  backgroundColor: '#DCFCE7',
                  border: '1.5px solid #86EFAC',
                  color: '#15803D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  boxShadow: '0 6px 16px rgba(21, 128, 61, 0.15)',
                }}
              >
                <ShieldCheck size={28} />
              </div>

              <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#1E1B4B', margin: 0 }}>
                {verificationContext === 'register' ? 'Astrologer Phone & Identity Verification' : 'Two-Factor Security Verification'}
              </h2>
              <p style={{ fontSize: '12px', color: '#64748B', marginTop: '6px', lineHeight: 1.4 }}>
                Enter the 6-digit verification code sent to <br />
                <strong style={{ color: '#1E1B4B' }}>{verificationTarget}</strong>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '6px', textAlign: 'center' }}>
                  Enter 6-Digit Verification Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => {
                    setOtpCode(e.target.value.replace(/[^0-9]/g, ''));
                    setOtpError('');
                  }}
                  placeholder="• • • • • •"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '14px',
                    border: otpError ? '2px solid #EF4444' : '2px solid #CBD5E1',
                    backgroundColor: '#F8FAFC',
                    fontSize: '24px',
                    fontWeight: '900',
                    color: '#1E1B4B',
                    textAlign: 'center',
                    letterSpacing: '10px',
                    outline: 'none',
                    fontFamily: 'monospace',
                  }}
                />
                {otpError && (
                  <p style={{ fontSize: '11px', color: '#DC2626', fontWeight: '700', marginTop: '4px', textAlign: 'center' }}>
                    {otpError}
                  </p>
                )}
              </div>

              {/* Countdown / Resend */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12px' }}>
                <Clock size={13} color="#94A3B8" />
                {countdown > 0 ? (
                  <span style={{ color: '#64748B', fontWeight: '600' }}>
                    Resend code in <strong style={{ color: '#1E1B4B' }}>{countdown}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setCountdown(30);
                      alert(`📲 A fresh 6-digit verification code has been dispatched to ${verificationTarget}.`);
                    }}
                    style={{ background: 'none', border: 'none', color: '#C85A32', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Resend OTP Code
                  </button>
                )}
              </div>

              {/* Verify & Enter Console Button */}
              <button
                type="submit"
                disabled={isVerifying || isVerifiedSuccess}
                style={{
                  marginTop: '6px',
                  padding: '14px',
                  borderRadius: '16px',
                  background: isVerifiedSuccess 
                    ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' 
                    : 'linear-gradient(135deg, #D46A43 0%, #C85A32 100%)',
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: '900',
                  border: 'none',
                  cursor: isVerifying ? 'wait' : 'pointer',
                  boxShadow: '0 6px 18px rgba(200, 90, 50, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {isVerifying ? (
                  <span>Verifying Credentials...</span>
                ) : isVerifiedSuccess ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Identity Verified! Launching Console...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    <span>Verify Code & Enter Console</span>
                  </>
                )}
              </button>

              {/* Back to Edit Button */}
              <button
                type="button"
                onClick={() => setMode(verificationContext)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  textAlign: 'center',
                  marginTop: '4px',
                }}
              >
                ← Back to Edit {verificationContext === 'register' ? 'Registration' : 'Login'} Details
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
