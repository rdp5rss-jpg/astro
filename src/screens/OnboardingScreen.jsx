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
  Eye, 
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
    { id: 'Career & Wealth', label: 'Career & Financial Wealth', icon: Briefcase, color: 'text-amber-600' },
    { id: 'Marriage & Relationships', label: 'Marriage, Love & Soulmate Timing', icon: Heart, color: 'text-rose-500' },
    { id: 'Health & Vitality', label: 'Health, Doshas & Wellness', icon: Activity, color: 'text-emerald-600' },
    { id: 'Spiritual Dharma', label: 'Higher Dharma & Spiritual Path', icon: Sparkles, color: 'text-purple-600' },
    { id: 'Foreign Settlement', label: 'Foreign Travel & PR Prospects', icon: Globe, color: 'text-blue-500' },
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 max-w-xl mx-auto animate-fade-in">
      {/* Top Header & Progress */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`p-2 rounded-xl text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer ${
              step === 1 ? 'opacity-0 pointer-events-none' : ''
            }`}
          >
            <ArrowLeft size={18} />
          </button>

          <div className="text-center">
            <span className="text-[11px] font-bold text-amber-700 tracking-wider uppercase">
              Step {step} of {totalSteps}
            </span>
            <h4 className="text-xs font-semibold text-slate-800">Sacred Janam Setup</h4>
          </div>

          <button
            onClick={onFinish}
            className="text-xs text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-colors"
          >
            Skip to App →
          </button>
        </div>

        {/* Linear Progress */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Question Body */}
      <div className="my-8">
        {/* Step 1: Name */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Welcome to BHAVISHYAA</span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-800 mt-1">What is your Sacred Name?</h2>
              <p className="text-xs text-slate-500 mt-1">Your name aligns the primordial vibration for your Vedic horoscope.</p>
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              className="w-full text-base sm:text-lg font-medium p-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500 shadow-sm text-slate-800 text-center"
              autoFocus
            />
          </div>
        )}

        {/* Step 2: Gender */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-800">Select Gender Energy</h2>
              <p className="text-xs text-slate-500 mt-1">Vedic astrology considers solar and lunar biorhythms.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['Male', 'Female', 'Non-Binary', 'Prefer not to say'].map((g) => (
                <button
                  key={g}
                  onClick={() => setFormData({ ...formData, gender: g })}
                  className={`p-4 rounded-2xl border text-sm font-semibold transition-all cursor-pointer ${
                    formData.gender === g
                      ? 'bg-amber-50 border-amber-500 text-amber-800 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Concerns */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-800">What brings you to the stars?</h2>
              <p className="text-xs text-slate-500 mt-1">Select all areas where you seek planetary clarity and remedies.</p>
            </div>
            <div className="space-y-2.5">
              {concernOptions.map((c) => {
                const isSelected = formData.concerns.includes(c.id);
                const Icon = c.icon;
                return (
                  <div
                    key={c.id}
                    onClick={() => toggleConcern(c.id)}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50/80 border-amber-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-slate-100 ${c.color}`}>
                        <Icon size={18} />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-800">{c.label}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                      isSelected ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <Check size={13} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Experience */}
        {step === 4 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-800">Your Astrology Experience</h2>
              <p className="text-xs text-slate-500 mt-1">This helps us calibrate how deeply technical your readings should be.</p>
            </div>
            <div className="space-y-3">
              {experienceOptions.map((e) => (
                <div
                  key={e.id}
                  onClick={() => setFormData({ ...formData, experience: e.id })}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    formData.experience === e.id
                      ? 'bg-amber-50/80 border-amber-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">{e.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Birth Date */}
        {step === 5 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-800">Date of Birth</h2>
              <p className="text-xs text-slate-500 mt-1">Crucial for planetary degree and solar transits.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center">
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="text-base font-semibold text-slate-800 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 6: Birth Time */}
        {step === 6 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-800">Time of Birth</h2>
              <p className="text-xs text-slate-500 mt-1">Determines your exact Lagna (Ascendant) and house cusps.</p>
            </div>
            {!formData.unknownTime && (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center">
                <input
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                  className="text-base font-semibold text-slate-800 focus:outline-none"
                />
              </div>
            )}
            <label className="flex items-center justify-center gap-2 text-xs text-slate-600 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={formData.unknownTime}
                onChange={(e) => setFormData({ ...formData, unknownTime: e.target.checked })}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
              />
              <span>I don't know my exact birth time (use Surya Lagna)</span>
            </label>
          </div>
        )}

        {/* Step 7: Birth City */}
        {step === 7 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-800">Place of Birth</h2>
              <p className="text-xs text-slate-500 mt-1">Used to pinpoint precise latitude, longitude and Ayanamsha.</p>
            </div>
            <div className="relative">
              <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={formData.birthCity}
                onChange={(e) => setFormData({ ...formData, birthCity: e.target.value })}
                placeholder="e.g. New Delhi, Mumbai, Varanasi..."
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800 text-sm shadow-sm"
              />
            </div>
          </div>
        )}

        {/* Step 8: Current City */}
        {step === 8 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-800">Current Residence City</h2>
              <p className="text-xs text-slate-500 mt-1">Powers local sunrise, Rahu Kaal, and localized transit horoscopes.</p>
            </div>
            <div className="relative">
              <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={formData.currentCity}
                onChange={(e) => setFormData({ ...formData, currentCity: e.target.value })}
                placeholder="e.g. Bangalore, London, New York..."
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500 text-slate-800 text-sm shadow-sm"
              />
            </div>
          </div>
        )}

        {/* Step 9: Language */}
        {step === 9 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-800">Preferred Consultation Languages</h2>
              <p className="text-xs text-slate-500 mt-1">We pair you with acharyas fluent in your native tongue.</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {languageOptions.map((lang) => {
                const isSelected = formData.languages.includes(lang);
                return (
                  <button
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Button */}
      <div className="pt-4 border-t border-slate-200">
        <button
          onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{step === totalSteps ? 'Synthesize My Destiny Chart' : 'Continue'}</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
