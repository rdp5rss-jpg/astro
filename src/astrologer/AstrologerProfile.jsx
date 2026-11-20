import React, { useState } from 'react';
import { 
  User, 
  Save, 
  ShieldCheck, 
  Award, 
  Clock, 
  Sparkles, 
  CheckCircle, 
  Languages,
  BookOpen
} from 'lucide-react';

export default function AstrologerProfile({ astrologer, onUpdateAstrologer }) {
  const [chatRate, setChatRate] = useState(astrologer.ratePerMin || 35);
  const [callRate, setCallRate] = useState(astrologer.ratePerMin || 35);
  const [bio, setBio] = useState(astrologer.bio || '16+ years helping thousands resolve marriage blockages, financial delays, and career transitions.');
  const [availableFrom, setAvailableFrom] = useState('09:00 AM');
  const [availableTo, setAvailableTo] = useState('11:00 PM');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (onUpdateAstrologer) {
      onUpdateAstrologer({
        ...astrologer,
        ratePerMin: Number(chatRate),
        bio: bio
      });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Astrologer Hero Header */}
      <div
        className="glass-card"
        style={{
          borderRadius: '24px',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '1.5px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src={astrologer.avatar}
            alt={astrologer.name}
            style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #FCD34D' }}
          />
          <span
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              border: '2px solid #FFFFFF',
            }}
          >
            ✓
          </span>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#1E1B4B' }}>{astrologer.name}</h3>
          </div>
          <p style={{ fontSize: '12px', color: '#C85A32', fontWeight: '700', marginTop: '2px' }}>
            {astrologer.title || 'Senior Vedic & KP Astrologer'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
            <span>⭐ {astrologer.rating || 4.98}</span>
            <span>•</span>
            <span>{astrologer.consultations || '48k'} readings</span>
            <span>•</span>
            <span>{astrologer.experienceYears || 16}y exp</span>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '16px',
            backgroundColor: '#DCFCE7',
            border: '1px solid #86EFAC',
            color: '#15803D',
            fontSize: '13px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle size={16} />
          <span>Profile & Rates successfully updated across BHAVISHYAA!</span>
        </div>
      )}

      {/* Form Settings */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Pricing Rates Config */}
        <div
          className="glass-card"
          style={{
            borderRadius: '20px',
            padding: '18px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1.5px solid #E2E8F0',
          }}
        >
          <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#1E1B4B', marginBottom: '12px' }}>
            Consultation Rates (₹ / minute)
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '6px' }}>
                Chat Rate / min
              </label>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #CBD5E1', padding: '0 12px' }}>
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#C85A32' }}>₹</span>
                <input
                  type="number"
                  value={chatRate}
                  onChange={(e) => setChatRate(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', padding: '10px 8px', fontSize: '15px', fontWeight: '800', width: '100%', color: '#1E1B4B' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '6px' }}>
                Voice Call Rate / min
              </label>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #CBD5E1', padding: '0 12px' }}>
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#15803D' }}>₹</span>
                <input
                  type="number"
                  value={callRate}
                  onChange={(e) => setCallRate(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', padding: '10px 8px', fontSize: '15px', fontWeight: '800', width: '100%', color: '#1E1B4B' }}
                />
              </div>
            </div>
          </div>
          <p style={{ fontSize: '11px', color: '#64748B', marginTop: '8px' }}>
            You receive 80% (₹{Math.round(chatRate * 0.8)}/min) after platform hosting & payment charges.
          </p>
        </div>

        {/* Operating Hours */}
        <div
          className="glass-card"
          style={{
            borderRadius: '20px',
            padding: '18px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1.5px solid #E2E8F0',
          }}
        >
          <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#1E1B4B', marginBottom: '12px' }}>
            Daily Online Shift
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '6px' }}>
                From
              </label>
              <input
                type="text"
                value={availableFrom}
                onChange={(e) => setAvailableFrom(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', fontSize: '13px', fontWeight: '700', color: '#1E1B4B' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '6px' }}>
                To
              </label>
              <input
                type="text"
                value={availableTo}
                onChange={(e) => setAvailableTo(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', fontSize: '13px', fontWeight: '700', color: '#1E1B4B' }}
              />
            </div>
          </div>
        </div>

        {/* Bio Guidance */}
        <div
          className="glass-card"
          style={{
            borderRadius: '20px',
            padding: '18px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1.5px solid #E2E8F0',
          }}
        >
          <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#1E1B4B', marginBottom: '10px' }}>
            Astrologer Bio & Lineage
          </h4>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '14px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              fontSize: '13px',
              lineHeight: 1.5,
              color: '#1E1B4B',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          style={{
            padding: '14px',
            borderRadius: '16px',
            backgroundColor: '#C85A32',
            background: 'linear-gradient(135deg, #D46A43 0%, #C85A32 100%)',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(200, 90, 50, 0.3)',
          }}
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
}
