import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Calendar, 
  Clock, 
  MapPin, 
  Globe, 
  Heart, 
  Briefcase, 
  Coins, 
  Activity, 
  ShieldCheck 
} from 'lucide-react';
import MatchScreen from './MatchScreen';

export default function OnboardingScreen({ onFinish }) {
  const [step, setStep] = useState(1);
  const [showMatch, setShowMatch] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: 'Rohan Sharma',
    gender: 'Male',
    concerns: ['Career & Wealth', 'Marriage & Relationships'],
    experience: 'Enthusiast (Know my Sun/Moon)',
    birthDate: '1996-05-15',
    birthTime: '09:45',
    unknownTime: false,
    birthCity: 'New Delhi, India',
    currentCity: 'Bangalore, India',
    languages: ['English', 'Hindi']
  });

  const totalSteps = 9;

  const concernOptions = [
    { id: 'Career & Wealth', label: 'Career & Financial Wealth', icon: Briefcase, color: '#D97706', bg: '#FEF3C7' },
    { id: 'Marriage & Relationships', label: 'Marriage, Love & Soulmate Timing', icon: Heart, color: '#E11D48', bg: '#FFE4E6' },
    { id: 'Health & Vitality', label: 'Health, Doshas & Wellness', icon: Activity, color: '#059669', bg: '#D1FAE5' },
    { id: 'Spiritual Dharma', label: 'Higher Dharma & Spiritual Path', icon: Sparkles, color: '#7C3AED', bg: '#EDE9FE' },
    { id: 'Foreign Settlement', label: 'Foreign Travel & PR Prospects', icon: Globe, color: '#2563EB', bg: '#DBEAFE' },
  ];

  const experienceOptions = [
    { id: 'Beginner', title: 'Beginner', desc: 'Curious about what the stars hold for me' },
    { id: 'Enthusiast (Know my Sun/Moon)', title: 'Astro Enthusiast', desc: 'Familiar with my Zodiac sign and Moon nakshatra' },
    { id: 'Deep Seeker', title: 'Deep Vedic Seeker', desc: 'Regularly follow planetary transits, Dashas & Kundli' },
  ];

  const languageOptions = [
    'Hindi', 'English', 'Gujarati', 'Marathi', 'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Punjabi'
  ];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      setShowMatch(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const toggleConcern = (id) => {
    setFormData(prev => ({
      ...prev,
      concerns: prev.concerns.includes(id)
        ? prev.concerns.filter(c => c !== id)
        : [...prev.concerns, id]
    }));
  };

  const toggleLanguage = (lang) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  if (showMatch) {
    return <MatchScreen seekerName={formData.name.split(' ')[0]} onComplete={onFinish} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 16px',
      background: 'radial-gradient(circle at 10% 10%, rgba(254, 243, 199, 0.6) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(234, 219, 255, 0.5) 0%, transparent 45%), #F8F9FE'
    }}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '520px',
          borderRadius: '32px',
          padding: '28px 24px',
          boxShadow: '0 20px 45px rgba(108, 74, 182, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        {/* Top Header & Progress */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <button
              onClick={handleBack}
              disabled={step === 1}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                backgroundColor: step === 1 ? 'transparent' : 'rgba(255, 255, 255, 0.9)',
                border: step === 1 ? 'none' : '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569',
                cursor: step === 1 ? 'default' : 'pointer',
                opacity: step === 1 ? 0 : 1,
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowLeft size={18} />
            </button>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontFamily: 'Cinzel, serif', 
                fontSize: '11px', 
                fontWeight: '800', 
                letterSpacing: '1.5px', 
                color: '#B45309', 
                textTransform: 'uppercase' 
              }}>
                Step {step} of {totalSteps}
              </div>
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B', marginTop: '2px' }}>
                Sacred Janam Setup
              </h4>
            </div>

            <button
              onClick={onFinish}
              style={{
                padding: '6px 12px',
                borderRadius: '12px',
                backgroundColor: '#FEF3C7',
                border: '1px solid #FCD34D',
                color: '#B45309',
                fontSize: '11.5px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Skip to App →
            </button>
          </div>

          {/* Linear Progress Bar */}
          <div style={{ width: '100%', height: '6px', borderRadius: '10px', backgroundColor: '#E2E8F0', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                borderRadius: '10px',
                background: 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)',
                width: `${(step / totalSteps) * 100}%`,
                transition: 'width 0.35s ease'
              }}
            />
          </div>
        </div>

        {/* Dynamic Question Body */}
        <div>
          {/* Step 1: Name */}
          {step === 1 && (
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#D97706', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Welcome to BHAVISHYAA
                </span>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '24px', fontWeight: '800', color: '#1E1B4B', marginTop: '6px' }}>
                  What is your Sacred Name?
                </h2>
                <p style={{ fontSize: '12.5px', color: '#64748B', marginTop: '4px' }}>
                  Your name aligns the primordial vibration for your Vedic horoscope.
                </p>
              </div>

              <div style={{ marginTop: '8px' }}>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '20px',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #FDE68A',
                    fontSize: '17px',
                    fontWeight: '700',
                    color: '#1E1B4B',
                    textAlign: 'center',
                    outline: 'none',
                    boxShadow: '0 4px 15px rgba(229, 148, 0, 0.1)'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#D97706')}
                  onBlur={(e) => (e.target.style.borderColor = '#FDE68A')}
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Step 2: Gender */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '22px', fontWeight: '800', color: '#1E1B4B' }}>
                  Select Gender Energy
                </h2>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  Vedic astrology considers solar and lunar biorhythms.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '4px' }}>
                {['Male', 'Female', 'Non-Binary', 'Prefer not to say'].map((g) => {
                  const isSelected = formData.gender === g;
                  return (
                    <button
                      key={g}
                      onClick={() => setFormData({ ...formData, gender: g })}
                      style={{
                        padding: '16px 12px',
                        borderRadius: '20px',
                        border: isSelected ? '2px solid #D97706' : '1.5px solid #E2E8F0',
                        backgroundColor: isSelected ? '#FFFBEB' : '#FFFFFF',
                        color: isSelected ? '#B45309' : '#334155',
                        fontSize: '14px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 4px 12px rgba(217, 119, 6, 0.15)' : 'none'
                      }}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Concerns */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '22px', fontWeight: '800', color: '#1E1B4B' }}>
                  What brings you to the stars?
                </h2>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  Select all areas where you seek planetary clarity and remedies.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {concernOptions.map((c) => {
                  const isSelected = formData.concerns.includes(c.id);
                  const Icon = c.icon;
                  return (
                    <div
                      key={c.id}
                      onClick={() => toggleConcern(c.id)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '20px',
                        border: isSelected ? '2px solid #D97706' : '1.5px solid #E2E8F0',
                        backgroundColor: isSelected ? '#FFFBEB' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '12px',
                          backgroundColor: c.bg,
                          color: c.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Icon size={20} />
                        </div>
                        <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#1E1B4B' }}>
                          {c.label}
                        </span>
                      </div>

                      <div style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '6px',
                        border: isSelected ? 'none' : '2px solid #CBD5E1',
                        backgroundColor: isSelected ? '#D97706' : 'transparent',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isSelected && <Check size={14} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Experience */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '22px', fontWeight: '800', color: '#1E1B4B' }}>
                  Your Astrology Experience
                </h2>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  Helps us calibrate how deeply technical your readings should be.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {experienceOptions.map((e) => {
                  const isSelected = formData.experience === e.id;
                  return (
                    <div
                      key={e.id}
                      onClick={() => setFormData({ ...formData, experience: e.id })}
                      style={{
                        padding: '16px',
                        borderRadius: '20px',
                        border: isSelected ? '2px solid #D97706' : '1.5px solid #E2E8F0',
                        backgroundColor: isSelected ? '#FFFBEB' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#1E1B4B' }}>{e.title}</h4>
                      <p style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>{e.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Birth Date */}
          {step === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
              <div>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '22px', fontWeight: '800', color: '#1E1B4B' }}>
                  Date of Birth
                </h2>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  Crucial for planetary degree and solar transits.
                </p>
              </div>

              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '20px',
                borderRadius: '22px',
                border: '1.5px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
              }}>
                <Calendar size={22} color="#D97706" />
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  style={{
                    fontSize: '17px',
                    fontWeight: '700',
                    color: '#1E1B4B',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
            </div>
          )}

          {/* Step 6: Birth Time */}
          {step === 6 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
              <div>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '22px', fontWeight: '800', color: '#1E1B4B' }}>
                  Time of Birth
                </h2>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  Determines your exact Lagna (Ascendant) and house cusps.
                </p>
              </div>

              {!formData.unknownTime && (
                <div style={{
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  borderRadius: '22px',
                  border: '1.5px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                }}>
                  <Clock size={22} color="#D97706" />
                  <input
                    type="time"
                    value={formData.birthTime}
                    onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                    style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#1E1B4B',
                      border: 'none',
                      outline: 'none',
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>
              )}

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: '#64748B' }}>
                <input
                  type="checkbox"
                  checked={formData.unknownTime}
                  onChange={(e) => setFormData({ ...formData, unknownTime: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#D97706', cursor: 'pointer' }}
                />
                <span>I don't know my exact birth time (use Surya Lagna)</span>
              </label>
            </div>
          )}

          {/* Step 7: Birth City */}
          {step === 7 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
              <div>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '22px', fontWeight: '800', color: '#1E1B4B' }}>
                  Place of Birth
                </h2>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  Used to pinpoint precise latitude, longitude and Ayanamsha.
                </p>
              </div>

              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <MapPin size={20} color="#94A3B8" style={{ position: 'absolute', left: '16px' }} />
                <input
                  type="text"
                  value={formData.birthCity}
                  onChange={(e) => setFormData({ ...formData, birthCity: e.target.value })}
                  placeholder="e.g. New Delhi, Mumbai, Varanasi..."
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 48px',
                    borderRadius: '20px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #E2E8F0',
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#1E1B4B',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#D97706')}
                  onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>
            </div>
          )}

          {/* Step 8: Current City */}
          {step === 8 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
              <div>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '22px', fontWeight: '800', color: '#1E1B4B' }}>
                  Current Residence City
                </h2>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  Powers local sunrise, Rahu Kaal, and localized transit horoscopes.
                </p>
              </div>

              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <MapPin size={20} color="#94A3B8" style={{ position: 'absolute', left: '16px' }} />
                <input
                  type="text"
                  value={formData.currentCity}
                  onChange={(e) => setFormData({ ...formData, currentCity: e.target.value })}
                  placeholder="e.g. Bangalore, London, New York..."
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 48px',
                    borderRadius: '20px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #E2E8F0',
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#1E1B4B',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#D97706')}
                  onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>
            </div>
          )}

          {/* Step 9: Language */}
          {step === 9 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
              <div>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '22px', fontWeight: '800', color: '#1E1B4B' }}>
                  Consultation Languages
                </h2>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  We pair you with certified acharyas fluent in your native tongue.
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {languageOptions.map((lang) => {
                  const isSelected = formData.languages.includes(lang);
                  return (
                    <button
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      style={{
                        padding: '10px 18px',
                        borderRadius: '16px',
                        border: isSelected ? '2px solid #D97706' : '1.5px solid #E2E8F0',
                        backgroundColor: isSelected ? '#D97706' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : '#334155',
                        fontSize: '13px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 4px 12px rgba(217, 119, 6, 0.25)' : 'none'
                      }}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Continue Action */}
        <div style={{ paddingTop: '10px', borderTop: '1px solid #E2E8F0' }}>
          <button
            onClick={handleNext}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: '800',
              boxShadow: '0 8px 24px rgba(217, 119, 6, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(217, 119, 6, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(217, 119, 6, 0.35)';
            }}
          >
            <span>{step === totalSteps ? '✨ Synthesize My Destiny Chart' : 'Continue'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
