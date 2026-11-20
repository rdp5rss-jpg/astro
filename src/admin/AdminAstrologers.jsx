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
  X,
  Phone,
  MessageSquare,
  Award,
  Globe,
  Sliders
} from 'lucide-react';
import { astrologers as initialAstrologers } from '../data/astrologers';

export default function AdminAstrologers() {
  const [astros, setAstros] = useState(initialAstrologers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'online' | 'celebrity' | 'vedic'
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAstro, setEditingAstro] = useState(null);

  const [newAstro, setNewAstro] = useState({
    name: '',
    title: 'Vedic Astrologer & Kundli Expert',
    ratePerMin: 35,
    experienceYears: 12,
    languages: 'Hindi, English, Sanskrit',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300'
  });

  const filtered = astros.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (a.title && a.title.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;
    if (filterMode === 'online') return a.isOnline;
    if (filterMode === 'celebrity') return a.isCelebrity;
    if (filterMode === 'vedic') return a.title && a.title.toLowerCase().includes('vedic');
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
    setNewAstro({ name: '', title: 'Vedic Astrologer & Kundli Expert', ratePerMin: 35, experienceYears: 12, languages: 'Hindi, English', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' });
  };

  const handleUpdateRate = (id, newRate) => {
    setAstros(prev => prev.map(a => a.id === id ? { ...a, ratePerMin: Number(newRate) } : a));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Search Bar & Add Button */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '16px',
            padding: '0 14px',
            gap: '8px',
          }}
        >
          <Search size={16} color="#94A3B8" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search astrologers by name or specialty..."
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              width: '100%',
              padding: '12px 0',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1E1B4B',
            }}
          />
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '0 18px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #D46A43 0%, #C85A32 100%)',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 12px rgba(200, 90, 50, 0.25)',
            whiteSpace: 'nowrap',
          }}
        >
          <Plus size={16} />
          <span>Add Guru</span>
        </button>
      </div>

      {/* Quick Filters */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'all', label: `All Gurus (${astros.length})` },
          { id: 'online', label: `🟢 Online (${astros.filter(a => a.isOnline).length})` },
          { id: 'celebrity', label: `⭐ Celebrity (${astros.filter(a => a.isCelebrity).length})` },
          { id: 'vedic', label: 'Vedic Experts' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterMode(tab.id)}
            style={{
              padding: '7px 14px',
              borderRadius: '12px',
              border: filterMode === tab.id ? '1.5px solid #C85A32' : '1.5px solid #E2E8F0',
              backgroundColor: filterMode === tab.id ? '#FFF7ED' : '#FFFFFF',
              color: filterMode === tab.id ? '#C85A32' : '#64748B',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Astrologer Directory Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map(astro => (
          <div
            key={astro.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px',
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Top Row: Avatar, Info, Online Toggle */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={astro.avatar}
                    alt={astro.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '16px',
                      objectFit: 'cover',
                      border: '2px solid #F1F5F9',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: astro.isOnline ? '#10B981' : '#94A3B8',
                      border: '2px solid #FFFFFF',
                    }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#1E1B4B' }}>{astro.name}</h4>
                    {astro.isCelebrity && (
                      <span style={{ fontSize: '10px', fontWeight: '800', color: '#D97706', backgroundColor: '#FEF3C7', padding: '2px 6px', borderRadius: '6px' }}>
                        ⭐ VIP
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>{astro.title}</p>
                </div>
              </div>

              {/* Online / Offline Button */}
              <button
                onClick={() => toggleOnline(astro.id)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '999px',
                  border: astro.isOnline ? '1.5px solid #86EFAC' : '1.5px solid #CBD5E1',
                  backgroundColor: astro.isOnline ? '#DCFCE7' : '#F1F5F9',
                  color: astro.isOnline ? '#15803D' : '#64748B',
                  fontSize: '11px',
                  fontWeight: '800',
                  cursor: 'pointer',
                }}
              >
                {astro.isOnline ? '🟢 Live' : '⚪ Offline'}
              </button>
            </div>

            {/* Chips: Rate, Exp, Rating, Consultations */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#C85A32', backgroundColor: '#FFF7ED', padding: '4px 10px', borderRadius: '8px' }}>
                ₹{astro.ratePerMin || 35} / min
              </span>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#475569', backgroundColor: '#F8FAFC', padding: '4px 10px', borderRadius: '8px' }}>
                ⏳ {astro.experienceYears || 10}+ Yrs
              </span>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#475569', backgroundColor: '#F8FAFC', padding: '4px 10px', borderRadius: '8px' }}>
                ⭐ {astro.rating || 5.0} Rating
              </span>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#475569', backgroundColor: '#F8FAFC', padding: '4px 10px', borderRadius: '8px' }}>
                🕉️ {astro.consultations || '1k'} Calls
              </span>
            </div>

            {/* Bottom Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
              <button
                onClick={() => toggleCelebrity(astro.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: astro.isCelebrity ? '#D97706' : '#94A3B8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Star size={14} fill={astro.isCelebrity ? '#D97706' : 'none'} />
                <span>{astro.isCelebrity ? 'VIP Guru' : 'Make VIP'}</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>Edit Rate:</span>
                <select
                  value={astro.ratePerMin || 35}
                  onChange={(e) => handleUpdateRate(astro.id, e.target.value)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '8px',
                    border: '1.5px solid #CBD5E1',
                    backgroundColor: '#F8FAFC',
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#1E1B4B',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value={20}>₹20/min</option>
                  <option value={25}>₹25/min</option>
                  <option value={30}>₹30/min</option>
                  <option value={35}>₹35/min</option>
                  <option value={45}>₹45/min</option>
                  <option value={60}>₹60/min</option>
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
            backgroundColor: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#1E1B4B' }}>
                Add Verified Guru
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ padding: '6px', borderRadius: '50%', backgroundColor: '#F1F5F9', border: 'none', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Full Name with Title
                </label>
                <input
                  type="text"
                  required
                  value={newAstro.name}
                  onChange={(e) => setNewAstro({ ...newAstro, name: e.target.value })}
                  placeholder="e.g. Acharya Govind Shastri"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px', fontWeight: '600' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Vedic Lineage / Title
                </label>
                <input
                  type="text"
                  required
                  value={newAstro.title}
                  onChange={(e) => setNewAstro({ ...newAstro, title: e.target.value })}
                  placeholder="e.g. Vedic Kundli & KP Astrologer"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px', fontWeight: '600' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Rate (₹ / min)
                  </label>
                  <input
                    type="number"
                    required
                    value={newAstro.ratePerMin}
                    onChange={(e) => setNewAstro({ ...newAstro, ratePerMin: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px', fontWeight: '700' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Years Experience
                  </label>
                  <input
                    type="number"
                    required
                    value={newAstro.experienceYears}
                    onChange={(e) => setNewAstro({ ...newAstro, experienceYears: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px', fontWeight: '700' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Languages Spoken
                </label>
                <input
                  type="text"
                  value={newAstro.languages}
                  onChange={(e) => setNewAstro({ ...newAstro, languages: e.target.value })}
                  placeholder="e.g. Hindi, English, Gujarati"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px', fontWeight: '600' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '8px',
                  padding: '12px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #D46A43 0%, #C85A32 100%)',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '900',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(200, 90, 50, 0.3)',
                }}
              >
                Add Astrologer to Platform
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
