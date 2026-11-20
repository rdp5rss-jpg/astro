import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Star, 
  X,
  ShieldCheck
} from 'lucide-react';
import { astrologers as initialAstrologers } from '../data/astrologers';

export default function AdminAstrologers() {
  const [astros, setAstros] = useState(initialAstrologers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'online' | 'celebrity'
  const [showAddModal, setShowAddModal] = useState(false);

  const [newAstro, setNewAstro] = useState({
    name: '',
    title: 'Vedic Astrologer',
    ratePerMin: 35,
    experienceYears: 10,
    languages: 'Hindi, English',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300'
  });

  const filtered = astros.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (a.title && a.title.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;
    if (filterMode === 'online') return a.isOnline;
    if (filterMode === 'celebrity') return a.isCelebrity;
    return true;
  });

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
        name: newAstro.name,
        title: newAstro.title,
        ratePerMin: Number(newAstro.ratePerMin),
        experienceYears: Number(newAstro.experienceYears),
        languages: newAstro.languages.split(',').map(s => s.trim()),
        rating: 5.0,
        consultations: '1.2k',
        avatar: newAstro.avatar,
        isOnline: true,
        isCelebrity: false,
      },
      ...prev
    ]);
    setShowAddModal(false);
    setNewAstro({ name: '', title: 'Vedic Astrologer', ratePerMin: 35, experienceYears: 10, languages: 'Hindi, English', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' });
  };

  const handleUpdateRate = (id, newRate) => {
    setAstros(prev => prev.map(a => a.id === id ? { ...a, ratePerMin: Number(newRate) } : a));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Search Bar & Add Button */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '0 12px',
            gap: '8px',
          }}
        >
          <Search size={15} color="#94A3B8" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search astrologers..."
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              width: '100%',
              padding: '10px 0',
              fontSize: '13px',
              color: '#0F172A',
            }}
          />
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '0 14px',
            borderRadius: '12px',
            backgroundColor: '#C85A32',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
          }}
        >
          <Plus size={15} />
          <span>Add Guru</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {[
          { id: 'all', label: `All (${astros.length})` },
          { id: 'online', label: `Online (${astros.filter(a => a.isOnline).length})` },
          { id: 'celebrity', label: 'VIP Gurus' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterMode(tab.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: filterMode === tab.id ? '1px solid #C85A32' : '1px solid #E2E8F0',
              backgroundColor: filterMode === tab.id ? '#FFF7ED' : '#FFFFFF',
              color: filterMode === tab.id ? '#C85A32' : '#64748B',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Astrologers List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map(astro => (
          <div
            key={astro.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              padding: '12px 14px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {/* Main Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={astro.avatar}
                  alt={astro.name}
                  style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{astro.name}</span>
                    {astro.isCelebrity && (
                      <span style={{ fontSize: '9px', fontWeight: '600', color: '#D97706', backgroundColor: '#FEF3C7', padding: '1px 5px', borderRadius: '4px' }}>
                        VIP
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>{astro.title}</div>
                </div>
              </div>

              {/* Online Toggle */}
              <button
                onClick={() => toggleOnline(astro.id)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  border: astro.isOnline ? '1px solid #BBF7D0' : '1px solid #E2E8F0',
                  backgroundColor: astro.isOnline ? '#F0FDF4' : '#F8FAFC',
                  color: astro.isOnline ? '#15803D' : '#64748B',
                  fontSize: '10px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                {astro.isOnline ? 'Online' : 'Offline'}
              </button>
            </div>

            {/* Bottom Row: Specs & Rate Adjust */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '8px', fontSize: '11px', color: '#64748B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#0F172A', fontWeight: '600' }}>₹{astro.ratePerMin || 35}/min</span>
                <span>• {astro.experienceYears || 10}y exp</span>
                <span>• ★ {astro.rating || 5.0}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => toggleCelebrity(astro.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '11px',
                    color: astro.isCelebrity ? '#D97706' : '#94A3B8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    padding: 0,
                  }}
                >
                  <Star size={12} fill={astro.isCelebrity ? '#D97706' : 'none'} />
                  <span>VIP</span>
                </button>

                <select
                  value={astro.ratePerMin || 35}
                  onChange={(e) => handleUpdateRate(astro.id, e.target.value)}
                  style={{
                    padding: '2px 6px',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    backgroundColor: '#F8FAFC',
                    fontSize: '11px',
                    color: '#0F172A',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value={20}>₹20</option>
                  <option value={25}>₹25</option>
                  <option value={30}>₹30</option>
                  <option value={35}>₹35</option>
                  <option value={45}>₹45</option>
                  <option value={60}>₹60</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Guru Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 90,
            backgroundColor: 'rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '400px',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '20px',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                Add New Astrologer
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ padding: '4px', borderRadius: '50%', backgroundColor: '#F1F5F9', border: 'none', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '3px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newAstro.name}
                  onChange={(e) => setNewAstro({ ...newAstro, name: e.target.value })}
                  placeholder="e.g. Acharya Govind Shastri"
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '3px' }}>
                  Title / Specialty
                </label>
                <input
                  type="text"
                  required
                  value={newAstro.title}
                  onChange={(e) => setNewAstro({ ...newAstro, title: e.target.value })}
                  placeholder="e.g. Vedic Kundli Specialist"
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '3px' }}>
                    Rate (₹/min)
                  </label>
                  <input
                    type="number"
                    required
                    value={newAstro.ratePerMin}
                    onChange={(e) => setNewAstro({ ...newAstro, ratePerMin: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '3px' }}>
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    required
                    value={newAstro.experienceYears}
                    onChange={(e) => setNewAstro({ ...newAstro, experienceYears: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '6px',
                  padding: '10px',
                  borderRadius: '12px',
                  backgroundColor: '#C85A32',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Save Astrologer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
