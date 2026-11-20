import React, { useState } from 'react';
import { 
  Headphones, 
  Wallet, 
  Gem, 
  Heart, 
  Activity, 
  Briefcase, 
  Check, 
  Repeat, 
  MessageCircle, 
  Search, 
  Eye, 
  Calendar, 
  Clock, 
  MapPin, 
  Compass,
  ArrowRight,
  X
} from 'lucide-react';
import MatchScreen from './MatchScreen';

export default function OnboardingScreen({ onFinish, onSignOut }) {
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(null); // for category drills (e.g. 'money', 'marriage', 'health', 'career')
  const [showMatch, setShowMatch] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: 'Mahi',
    gender: 'Female',
    topic: 'Career',
    subTopic: 'A job change or promotion',
    experience: 'Yes, once or twice',
    birthDay: '14',
    birthMonth: 'October',
    birthYear: '1980',
    birthHour: '12',
    birthMinute: '00',
    birthAmPm: 'AM',
    unknownTime: false,
    birthCity: 'New Delhi, India',
    currentCity: 'Bangalore, India',
    languages: ['English', 'हिंदी'],
    referral: 'Instagram',
  });

  const totalSteps = 9;

  const topics = [
    { id: 'Money', label: 'Money', icon: Wallet, hasSub: true },
    { id: 'Marriage', label: 'Marriage', icon: Gem, hasSub: true },
    { id: 'Love', label: 'Love', icon: Heart, hasSub: false },
    { id: 'Health', label: 'Health', icon: Activity, hasSub: true },
    { id: 'Career', label: 'Career', icon: Briefcase, hasSub: true },
    { id: 'Something else', label: 'Something else', icon: Check, hasSub: false },
  ];

  const subOptionsMap = {
    Money: {
      title: 'What about money?',
      options: [
        'Money owed to me',
        'Property or an investment',
        'Money from my business',
        'Debt or a loss',
        'When will money come',
        'My finances in general',
      ]
    },
    Marriage: {
      title: 'What about marriage?',
      options: [
        'When will I marry',
        'Will this person marry me',
        'Divorce or a second marriage',
        'Trouble in my marriage',
        'Convincing my family',
        'My marriage in general',
      ]
    },
    Health: {
      title: 'Whose health, and what?',
      options: [
        'Stress and anxiety',
        'A family member\'s health',
        'Pregnancy and children',
        'My physical health',
        'My health in general',
      ]
    },
    Career: {
      title: 'What about your career?',
      options: [
        'Moving abroad',
        'Getting a job',
        'A job change or promotion',
        'Exams and studies',
        'My business',
        'My career in general',
      ]
    }
  };

  const astrologerExp = [
    { id: 'Yes, regularly', label: 'Yes, regularly', icon: Repeat },
    { id: 'Yes, once or twice', label: 'Yes, once or twice', icon: MessageCircle },
    { id: 'No, but I need answers', label: 'No, but I need answers', icon: Search },
    { id: 'No, just curious', label: 'No, just curious', icon: Eye },
  ];

  const languagesList = [
    'English', 'हिंदी', 'தமிழ்', 'తెలుగు', 'বাংলা', 'मराठी', 'ગુજરાતી', 'ಕನ್ನಡ', 'മലയാളം', 'ਪੰਜਾਬੀ', 'اردو', 'ଓଡ଼ିଆ'
  ];

  const referralSources = [
    { id: 'Instagram', label: 'Instagram' },
    { id: 'YouTube', label: 'YouTube' },
    { id: 'Friend or family', label: 'Friend or family' },
    { id: 'ChatGPT / AI', label: 'ChatGPT / AI' },
    { id: 'Google search', label: 'Google search' },
    { id: 'Astrologer told me', label: 'Astrologer told me' },
    { id: 'TikTok', label: 'TikTok' },
    { id: 'Play / App store', label: 'Play / App store' },
    { id: 'Facebook', label: 'Facebook' },
    { id: 'Other', label: 'Other' },
  ];

  const handleNext = () => {
    // If on topic selection step and user picked an expandable topic without drilldown
    if (step === 3 && !subStep && subOptionsMap[formData.topic]) {
      setSubStep(formData.topic);
      return;
    }

    if (step === 3 && subStep) {
      setSubStep(null);
    }

    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      setShowMatch(true);
    }
  };

  const handleBack = () => {
    if (step === 3 && subStep) {
      setSubStep(null);
      return;
    }
    if (step > 1) {
      setStep(prev => prev - 1);
    }
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
    return <MatchScreen seekerName={formData.name || 'Mahi'} onComplete={onFinish} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 20px',
      background: 'radial-gradient(circle at 10% 10%, rgba(254, 240, 138, 0.45) 0%, transparent 40%), radial-gradient(circle at 90% 15%, rgba(244, 114, 182, 0.35) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(147, 197, 253, 0.4) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(167, 243, 208, 0.4) 0%, transparent 40%), #FFFFFF',
      color: '#1E1B4B',
      userSelect: 'none',
      position: 'relative',
      overflowX: 'hidden',
    }}>
      {/* Background Subtle Constellation Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(108, 74, 182, 0.08) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '480px', width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        {/* Top Header: Support & Sign out */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <button
              onClick={() => alert('🎧 Connecting to Bhavishyaa Vedic Support...')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '30px',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                border: '1.5px solid #E2E8F0',
                color: '#1E1B4B',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}
            >
              <Headphones size={15} color="#D97706" />
              <span>Support</span>
            </button>

            <button
              onClick={onSignOut}
              style={{
                fontSize: '13.5px',
                fontWeight: '700',
                color: '#64748B',
                cursor: 'pointer',
                padding: '6px 10px',
              }}
            >
              Sign out
            </button>
          </div>

          {/* Progress Indicator: e.g. 1 of 9 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748B' }}>
              {step} of {totalSteps}
            </span>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '5px', borderRadius: '10px', backgroundColor: '#E2E8F0', overflow: 'hidden' }}>
            <div 
              style={{
                height: '100%',
                borderRadius: '10px',
                backgroundColor: '#C85A32',
                background: 'linear-gradient(90deg, #F59E0B 0%, #C85A32 100%)',
                width: `${(step / totalSteps) * 100}%`,
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Step Body */}
        <div style={{ margin: '32px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* Step 1: What should we call you? */}
          {step === 1 && (
            <div>
              <h1 style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '28px',
                fontWeight: '800',
                color: '#1E1B4B',
                marginBottom: '24px',
                letterSpacing: '-0.5px'
              }}>
                What should we call you?
              </h1>

              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  borderRadius: '35px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1E1B4B',
                  outline: 'none',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#C85A32')}
                onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                autoFocus
              />
            </div>
          )}

          {/* Step 2: What is your gender? */}
          {step === 2 && (
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#1E1B4B',
                marginBottom: '24px',
                letterSpacing: '-0.5px'
              }}>
                What is your gender?
              </h1>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {[
                  { id: 'Male', label: '♂ Male' },
                  { id: 'Female', label: '♀ Female' }
                ].map((g) => {
                  const isSelected = formData.gender === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setFormData({ ...formData, gender: g.id })}
                      style={{
                        padding: '18px',
                        borderRadius: '35px',
                        border: isSelected ? '2px solid #C85A32' : '1.5px solid #E2E8F0',
                        backgroundColor: isSelected ? 'rgba(200, 90, 50, 0.1)' : 'rgba(255, 255, 255, 0.9)',
                        color: isSelected ? '#C85A32' : '#334155',
                        fontSize: '16px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 4px 15px rgba(200, 90, 50, 0.15)' : 'none'
                      }}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: What's on your mind? / Sub-options */}
          {step === 3 && !subStep && (
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#1E1B4B',
                marginBottom: '20px',
                letterSpacing: '-0.5px'
              }}>
                What's on your mind?
              </h1>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {topics.map((t) => {
                  const isSelected = formData.topic === t.id;
                  const Icon = t.icon;
                  return (
                    <div
                      key={t.id}
                      onClick={() => {
                        setFormData({ ...formData, topic: t.id });
                        if (t.hasSub) {
                          setSubStep(t.id);
                        }
                      }}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '35px',
                        border: isSelected ? '2px solid #C85A32' : '1.5px solid #E2E8F0',
                        backgroundColor: isSelected ? 'rgba(200, 90, 50, 0.08)' : 'rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: isSelected ? '#C85A32' : 'rgba(241, 245, 249, 0.9)',
                        color: isSelected ? '#FFFFFF' : '#475569',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Icon size={18} />
                      </div>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#1E1B4B' }}>
                        {t.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3 Drilldown: e.g. What about your career? / What about money? */}
          {step === 3 && subStep && (
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#1E1B4B',
                marginBottom: '20px',
                letterSpacing: '-0.5px'
              }}>
                {subOptionsMap[subStep]?.title}
              </h1>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {subOptionsMap[subStep]?.options.map((opt, i) => {
                  const isSelected = formData.subTopic === opt;
                  return (
                    <div
                      key={i}
                      onClick={() => setFormData({ ...formData, subTopic: opt })}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '35px',
                        border: isSelected ? '2px solid #C85A32' : '1.5px solid #E2E8F0',
                        backgroundColor: isSelected ? 'rgba(200, 90, 50, 0.08)' : 'rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: isSelected ? '#C85A32' : '#F1F5F9',
                        color: isSelected ? '#FFFFFF' : '#64748B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isSelected ? <Check size={16} /> : <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CBD5E1' }} />}
                      </div>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#1E1B4B' }}>
                        {opt}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Have you talked to an astrologer before? */}
          {step === 4 && (
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#1E1B4B',
                marginBottom: '20px',
                letterSpacing: '-0.5px'
              }}>
                Have you talked to an astrologer before?
              </h1>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {astrologerExp.map((exp) => {
                  const isSelected = formData.experience === exp.id;
                  const Icon = exp.icon;
                  return (
                    <div
                      key={exp.id}
                      onClick={() => setFormData({ ...formData, experience: exp.id })}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '35px',
                        border: isSelected ? '2px solid #C85A32' : '1.5px solid #E2E8F0',
                        backgroundColor: isSelected ? 'rgba(200, 90, 50, 0.08)' : 'rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: isSelected ? '#C85A32' : '#F1F5F9',
                        color: isSelected ? '#FFFFFF' : '#64748B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon size={18} />
                      </div>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#1E1B4B' }}>
                        {exp.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: When were you born? (Date of birth & Time of birth wheel) */}
          {step === 5 && (
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#1E1B4B',
                marginBottom: '20px',
                letterSpacing: '-0.5px'
              }}>
                When were you born?
              </h1>

              {/* Date of birth wheel capsule */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748B', marginBottom: '8px', display: 'block' }}>
                  Date of birth
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: '16px',
                  borderRadius: '35px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                }}>
                  <select
                    value={formData.birthDay}
                    onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                    style={{ fontSize: '16px', fontWeight: '800', color: '#1E1B4B', border: 'none', background: 'none', outline: 'none', cursor: 'pointer' }}
                  >
                    {[...Array(31)].map((_, i) => (
                      <option key={i+1} value={String(i+1)}>{i+1}</option>
                    ))}
                  </select>

                  <select
                    value={formData.birthMonth}
                    onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                    style={{ fontSize: '16px', fontWeight: '800', color: '#1E1B4B', border: 'none', background: 'none', outline: 'none', cursor: 'pointer' }}
                  >
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>

                  <select
                    value={formData.birthYear}
                    onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                    style={{ fontSize: '16px', fontWeight: '800', color: '#1E1B4B', border: 'none', background: 'none', outline: 'none', cursor: 'pointer' }}
                  >
                    {[...Array(70)].map((_, i) => {
                      const yr = 2010 - i;
                      return <option key={yr} value={String(yr)}>{yr}</option>;
                    })}
                  </select>
                </div>
              </div>

              {/* Time of birth wheel capsule */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748B', marginBottom: '8px', display: 'block' }}>
                  Time of birth
                </label>
                {!formData.unknownTime && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: '16px',
                    borderRadius: '35px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1.5px solid #E2E8F0',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                  }}>
                    <select
                      value={formData.birthHour}
                      onChange={(e) => setFormData({ ...formData, birthHour: e.target.value })}
                      style={{ fontSize: '16px', fontWeight: '800', color: '#1E1B4B', border: 'none', background: 'none', outline: 'none', cursor: 'pointer' }}
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i+1} value={String(i+1).padStart(2, '0')}>{String(i+1).padStart(2, '0')}</option>
                      ))}
                    </select>
                    <span>:</span>
                    <select
                      value={formData.birthMinute}
                      onChange={(e) => setFormData({ ...formData, birthMinute: e.target.value })}
                      style={{ fontSize: '16px', fontWeight: '800', color: '#1E1B4B', border: 'none', background: 'none', outline: 'none', cursor: 'pointer' }}
                    >
                      {['00', '15', '30', '45'].map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>

                    <select
                      value={formData.birthAmPm}
                      onChange={(e) => setFormData({ ...formData, birthAmPm: e.target.value })}
                      style={{ fontSize: '16px', fontWeight: '800', color: '#1E1B4B', border: 'none', background: 'none', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Checkbox: I don't know my exact time of birth */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginTop: '10px' }}>
                <input
                  type="checkbox"
                  checked={formData.unknownTime}
                  onChange={(e) => setFormData({ ...formData, unknownTime: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: '#C85A32', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '13.5px', fontWeight: '600', color: '#475569' }}>
                  I don't know my exact time of birth
                </span>
              </label>
            </div>
          )}

          {/* Step 6: Where were you born? */}
          {step === 6 && (
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#1E1B4B',
                marginBottom: '20px',
                letterSpacing: '-0.5px'
              }}>
                Where were you born?
              </h1>

              {/* Search city capsule */}
              <div style={{ position: 'relative', marginBottom: '14px' }}>
                <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '20px', top: '18px' }} />
                <input
                  type="text"
                  value={formData.birthCity}
                  onChange={(e) => setFormData({ ...formData, birthCity: e.target.value })}
                  placeholder="Start typing a city..."
                  style={{
                    width: '100%',
                    padding: '16px 20px 16px 50px',
                    borderRadius: '35px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1.5px solid #E2E8F0',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#1E1B4B',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#C85A32')}
                  onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>

              <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '600', marginBottom: '10px' }}>
                Pick your city from the list
              </div>

              {/* Location pill */}
              <button
                onClick={() => setFormData({ ...formData, birthCity: 'Hyderabad, Telangana, India' })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '30px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1.5px solid #E2E8F0',
                  color: '#1E1B4B',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginBottom: '16px'
                }}
              >
                <MapPin size={15} color="#C85A32" />
                <span>Search near Hyderabad</span>
              </button>
            </div>
          )}

          {/* Step 7: Where do you live now? */}
          {step === 7 && (
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#1E1B4B',
                marginBottom: '6px',
                letterSpacing: '-0.5px'
              }}>
                Where do you live now?
              </h1>
              <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '20px' }}>
                Helps astrologers understand where you're from.
              </p>

              <div style={{ position: 'relative', marginBottom: '14px' }}>
                <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '20px', top: '18px' }} />
                <input
                  type="text"
                  value={formData.currentCity}
                  onChange={(e) => setFormData({ ...formData, currentCity: e.target.value })}
                  placeholder="Search your city"
                  style={{
                    width: '100%',
                    padding: '16px 20px 16px 50px',
                    borderRadius: '35px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1.5px solid #E2E8F0',
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#1E1B4B',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#C85A32')}
                  onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>

              {/* Use my location pill */}
              <button
                onClick={() => setFormData({ ...formData, currentCity: 'Bengaluru, Karnataka, India' })}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '16px',
                  borderRadius: '35px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1.5px solid #E2E8F0',
                  color: '#1E1B4B',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                <Compass size={16} color="#6C4AB6" />
                <span>Use my location</span>
              </button>
            </div>
          )}

          {/* Step 8: Which languages should your astrologer speak? */}
          {step === 8 && (
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#1E1B4B',
                marginBottom: '6px',
                letterSpacing: '-0.5px'
              }}>
                Which languages should your astrologer speak?
              </h1>
              <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '20px' }}>
                Pick as many as you are comfortable in.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {languagesList.map((lang) => {
                  const isSelected = formData.languages.includes(lang);
                  return (
                    <button
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      style={{
                        padding: '12px 20px',
                        borderRadius: '30px',
                        border: isSelected ? '2px solid #C85A32' : '1.5px solid #E2E8F0',
                        backgroundColor: isSelected ? '#C85A32' : 'rgba(255, 255, 255, 0.9)',
                        color: isSelected ? '#FFFFFF' : '#1E1B4B',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 4px 12px rgba(200, 90, 50, 0.25)' : 'none'
                      }}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 9: How did you find Bhavishyaa? */}
          {step === 9 && (
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#1E1B4B',
                marginBottom: '20px',
                letterSpacing: '-0.5px'
              }}>
                How did you find Bhavishyaa?
              </h1>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {referralSources.map((ref) => {
                  const isSelected = formData.referral === ref.id;
                  return (
                    <button
                      key={ref.id}
                      onClick={() => setFormData({ ...formData, referral: ref.id })}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '30px',
                        border: isSelected ? '2px solid #C85A32' : '1.5px solid #E2E8F0',
                        backgroundColor: isSelected ? 'rgba(200, 90, 50, 0.1)' : 'rgba(255, 255, 255, 0.9)',
                        color: isSelected ? '#C85A32' : '#334155',
                        fontSize: '13.5px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {ref.label}
                    </button>
                  );
                })}
              </div>

              <p style={{
                fontSize: '11.5px',
                color: '#64748B',
                textAlign: 'center',
                marginTop: '20px',
                fontWeight: '500'
              }}>
                By continuing, you agree to the <span style={{ textDecoration: 'underline' }}>Terms</span> and <span style={{ textDecoration: 'underline' }}>Privacy Policy</span>.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Navigation Buttons: Back & Continue */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: step > 1 ? '1fr 1.3fr' : '1fr',
          gap: '12px',
          paddingTop: '16px',
        }}>
          {step > 1 && (
            <button
              onClick={handleBack}
              style={{
                padding: '16px 20px',
                borderRadius: '35px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1.5px solid #CBD5E1',
                color: '#1E1B4B',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              Back
            </button>
          )}

          <button
            onClick={handleNext}
            style={{
              padding: '16px 24px',
              borderRadius: '35px',
              backgroundColor: '#C85A32',
              background: 'linear-gradient(135deg, #D46A43 0%, #B84D28 100%)',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(184, 77, 40, 0.35)',
            }}
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  );
}
