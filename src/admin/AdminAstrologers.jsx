import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Plus, 
  Star, 
  CheckCircle, 
  XCircle, 
  Edit3, 
  MoreVertical,
  Check,
  X
} from 'lucide-react';
import { astrologers as initialAstrologers } from '../data/astrologers';

export default function AdminAstrologers() {
  const [astros, setAstros] = useState(initialAstrologers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAstro, setNewAstro] = useState({
    name: '',
    title: 'Vedic Astrologer',
    ratePerMin: 30,
    experienceYears: 10,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300'
  });

  const filtered = astros.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (a.title && a.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleCelebrity = (id) => {
    setAstros(prev => prev.map(a => a.id === id ? { ...a, isCelebrity: !a.isCelebrity } : a));
  };

  const toggleOnline = (id) => {
    setAstros(prev => prev.map(a => a.id === id ? { ...a, isOnline: !a.isOnline } : a));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newAstro.name) return;
    setAstros(prev => [
      {
        id: String(Date.now()),
        ...newAstro,
        rating: 5.0,
        consultations: '1.2k',
        isOnline: true,
        isCelebrity: false,
      },
      ...prev
    ]);
    setShowAddModal(false);
    setNewAstro({ name: '', title: 'Vedic Astrologer', ratePerMin: 30, experienceYears: 10, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top Controls: Search + Add Astrologer Button */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '16px',
            padding: '8px 14px',
            gap: '8px',
          }}
        >
          <Search size={16} color="#94A3B8" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search astrologers by name or title..."
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              width: '100%',
              fontSize: '13px',
              color: '#1E1B4B',
            }}
          />
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '8px 16px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #D46A43 0%, #C85A32 100%)',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(200, 90, 50, 0.25)',
            whiteSpace: 'nowrap',
          }}
        >
          <Plus size={16} />
          <span>Onboard</span>
        </button>
      </div>

      {/* Astrologers Roster */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map((astro) => (
          <div
            key={astro.id}
            className="glass-card"
            style={{
              borderRadius: '20px',
              padding: '14px 16px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={astro.avatar}
                    alt={astro.name}
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FCD34D' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: astro.isOnline ? '#10B981' : '#CBD5E1',
                      border: '2px solid #FFFFFF',
                    }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: '#1E1B4B' }}>{astro.name}</h4>
                    <CheckCircle size={14} color="#10B981" />
                  </div>
                  <p style={{ fontSize: '11px', color: '#64748B', marginTop: '1px' }}>
                    {astro.title || 'Vedic Astrologer'} • {astro.experienceYears || 10}y exp
                  </p>
                  <div style={{ fontSize: '11px', color: '#D97706', fontWeight: '800', marginTop: '3px' }}>
                    ⭐ {astro.rating} ({astro.consultations || '30k'} readings)
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '16px', fontWeight: '900', color: '#C85A32' }}>
                  ₹{astro.ratePerMin || 30}/m
                </span>
                <div style={{ fontSize: '10px', color: '#64748B' }}>Net: ₹{Math.round((astro.ratePerMin || 30) * 0.8)}/m</div>
              </div>
            </div>

            {/* Admin Management Pills */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #F1F5F9', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {/* Celebrity Toggle Pill */}
                <button
                  onClick={() => toggleCelebrity(astro.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '800',
                    border: astro.isCelebrity ? '1px solid #FCD34D' : '1px solid #E2E8F0',
                    backgroundColor: astro.isCelebrity ? '#FEF3C7' : '#F8FAFC',
                    color: astro.isCelebrity ? '#B45309' : '#64748B',
                    cursor: 'pointer',
                  }}
                >
                  {astro.isCelebrity ? '👑 Celebrity: Yes' : '☆ Celebrity: No'}
                </button>

                {/* Online Toggle */}
                <button
                  onClick={() => toggleOnline(astro.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '800',
                    border: astro.isOnline ? '1px solid #86EFAC' : '1px solid #E2E8F0',
                    backgroundColor: astro.isOnline ? '#DCFCE7' : '#F1F5F9',
                    color: astro.isOnline ? '#15803D' : '#64748B',
                    cursor: 'pointer',
                  }}
                >
                  {astro.isOnline ? '🟢 Live' : '⚪ Offline'}
                </button>
              </div>

              <span style={{ fontSize: '11px', fontWeight: '800', color: '#059669', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: '6px' }}>
                KYC Approved
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Astrologer Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            className="glass-card"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '22px',
              maxWidth: '420px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#1E1B4B' }}>Onboard New Vedic Guru</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} color="#64748B" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '4px' }}>Guru Full Name</label>
                <input
                  type="text"
                  required
                  value={newAstro.name}
                  onChange={(e) => setNewAstro({ ...newAstro, name: e.target.value })}
                  placeholder="e.g. Acharya Vidyadhar"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '4px' }}>Title & Specialization</label>
                <input
                  type="text"
                  value={newAstro.title}
                  onChange={(e) => setNewAstro({ ...newAstro, title: e.target.value })}
                  placeholder="e.g. Senior Vedic Astrologer & Vastu"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '4px' }}>Base Rate (₹/min)</label>
                  <input
                    type="number"
                    value={newAstro.ratePerMin}
                    onChange={(e) => setNewAstro({ ...newAstro, ratePerMin: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '4px' }}>Years Experience</label>
                  <input
                    type="number"
                    value={newAstro.experienceYears}
                    onChange={(e) => setNewAstro({ ...newAstro, experienceYears: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '10px',
                  padding: '12px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #D46A43 0%, #C85A32 100%)',
                  color: '#FFFFFF',
                  fontWeight: '800',
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Approve & Add to Platform
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
