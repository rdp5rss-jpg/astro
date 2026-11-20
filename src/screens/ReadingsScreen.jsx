import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Search, 
  Star, 
  CheckCircle, 
  ChevronRight, 
  Sparkles,
  ShieldCheck,
  Flame,
  Award
} from 'lucide-react';
import { astrologers } from '../data/astrologers';

export default function ReadingsScreen({ onStartChat, onStartCall }) {
  const [activeSegment, setActiveSegment] = useState('chat'); // 'chat' | 'call'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [offerSeconds, setOfferSeconds] = useState(9 * 3600 + 22 * 60 + 1);

  useEffect(() => {
    const timer = setInterval(() => {
      setOfferSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSec) => {
    const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    return `${h} : ${m} : ${s}`;
  };

  const categories = ['All', 'Vedic', 'Tarot', 'Love & Marriage', 'Career & Wealth', 'Kundli'];

  const filteredAstrologers = astrologers.filter(astro => {
    const matchesSearch = astro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (astro.title && astro.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (astro.skills && astro.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
    
    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'Vedic') return matchesSearch && (astro.title?.includes('Vedic') || astro.skills?.some(s => s.includes('Vedic')));
    if (selectedCategory === 'Tarot') return matchesSearch && (astro.title?.includes('Tarot') || astro.skills?.some(s => s.includes('Tarot')));
    if (selectedCategory === 'Love & Marriage') return matchesSearch && astro.skills?.some(s => s.includes('Marriage') || s.includes('Love'));
    if (selectedCategory === 'Career & Wealth') return matchesSearch && astro.skills?.some(s => s.includes('Career') || s.includes('Job') || s.includes('Business'));
    if (selectedCategory === 'Kundli') return matchesSearch && astro.skills?.some(s => s.includes('Kundli'));
    return matchesSearch;
  });

  return (
    <div style={{ paddingBottom: '120px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top Banner Offer Bar matching WhatsApp reference */}
      <div
        style={{
          margin: '0 16px 14px',
          padding: '10px 16px',
          borderRadius: '16px',
          backgroundColor: '#B84D28',
          background: 'linear-gradient(90deg, #D46A43 0%, #B84D28 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '13px',
          fontWeight: '700',
          boxShadow: '0 4px 12px rgba(184, 77, 40, 0.2)',
        }}
      >
        <span>Festive offer — 50% Off First Reading</span>
        <div style={{
          backgroundColor: '#FEF3C7',
          color: '#92400E',
          fontWeight: '900',
          fontSize: '12px',
          padding: '4px 10px',
          borderRadius: '8px',
          letterSpacing: '1px'
        }}>
          {formatTime(offerSeconds)}
        </div>
      </div>

      {/* Segmented Control Bar: Chat vs Call + Search Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px 12px' }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '35px',
            padding: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          }}
        >
          <button
            onClick={() => setActiveSegment('chat')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '30px',
              border: 'none',
              backgroundColor: activeSegment === 'chat' ? '#C85A32' : 'transparent',
              color: activeSegment === 'chat' ? '#FFFFFF' : '#64748B',
              fontSize: '14px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <MessageSquare size={16} />
            <span>Chat Consultation</span>
          </button>

          <button
            onClick={() => setActiveSegment('call')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '30px',
              border: 'none',
              backgroundColor: activeSegment === 'call' ? '#15803D' : 'transparent',
              color: activeSegment === 'call' ? '#FFFFFF' : '#64748B',
              fontSize: '14px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Phone size={16} />
            <span>Voice Call</span>
          </button>
        </div>
      </div>

      {/* Search Bar Input */}
      <div style={{ padding: '0 16px 12px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '16px',
            padding: '8px 14px',
            gap: '10px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
          }}
        >
          <Search size={17} color="#94A3B8" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Guru name, Kundli, Tarot, Love..."
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              width: '100%',
              fontSize: '13px',
              color: '#1E1B4B',
              fontWeight: '500',
            }}
          />
        </div>
      </div>

      {/* Specialty Filter Capsules */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          padding: '0 16px 14px',
          scrollbarWidth: 'none',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              border: selectedCategory === cat ? '1px solid #C85A32' : '1px solid #E2E8F0',
              backgroundColor: selectedCategory === cat ? '#FFF7ED' : '#FFFFFF',
              color: selectedCategory === cat ? '#C85A32' : '#64748B',
              fontSize: '12px',
              fontWeight: selectedCategory === cat ? '800' : '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Available Gurus List with Explicit Chat & Call Action Buttons */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1E1B4B' }}>
            Verified Astrologers Online ({filteredAstrologers.length})
          </h3>
          <span style={{ fontSize: '11px', color: '#10B981', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
            Instant Connect
          </span>
        </div>

        {filteredAstrologers.map((astro) => {
          const rate = astro.ratePerMin || astro.rate || 30;
          const origRate = astro.originalRatePerMin || rate * 2;
          const exp = astro.experienceYears ? `${astro.experienceYears} yrs` : (astro.exp || '10+ yrs');
          const consults = astro.consultations || astro.consults || '35k';
          const title = astro.title || astro.specialty || 'Senior Vedic Astrologer';

          return (
            <div
              key={astro.id}
              className="glass-card"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1.5px solid rgba(226, 232, 240, 0.85)',
                borderRadius: '22px',
                padding: '16px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Top Info Row */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                {/* Avatar with verified dot */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img
                    src={astro.avatar}
                    alt={astro.name}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #FCD34D',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      backgroundColor: '#10B981',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      border: '2px solid #FFFFFF',
                    }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', minWidth: 0 }}>
                      <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1E1B4B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {astro.name}
                      </h4>
                      <CheckCircle size={14} color="#10B981" style={{ flexShrink: 0 }} />
                    </div>

                    {astro.isCelebrity && (
                      <span
                        style={{
                          fontSize: '9px',
                          fontWeight: '800',
                          backgroundColor: '#FEF3C7',
                          color: '#B45309',
                          border: '1px solid #FCD34D',
                          padding: '2px 6px',
                          borderRadius: '8px',
                          flexShrink: 0,
                        }}
                      >
                        👑 Celebrity
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {title}
                  </p>

                  {/* Skills tags */}
                  {astro.skills && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                      {astro.skills.slice(0, 2).map((skill, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '10px',
                            fontWeight: '700',
                            backgroundColor: '#F1F5F9',
                            color: '#475569',
                            padding: '2px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Rating, Consultations & Experience */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#D97706', fontWeight: '800' }}>
                      <Star size={12} fill="#D97706" color="#D97706" /> {astro.rating}
                    </span>
                    <span>•</span>
                    <span>{consults} orders</span>
                    <span>•</span>
                    <span>{exp} exp</span>
                  </div>
                </div>
              </div>

              {/* Price & Action Buttons Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid #F1F5F9',
                  gap: '10px',
                }}
              >
                {/* Rate */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '900', color: '#C85A32' }}>
                      ₹{rate}/min
                    </span>
                    <span style={{ fontSize: '12px', color: '#94A3B8', textDecoration: 'line-through' }}>
                      ₹{origRate}
                    </span>
                  </div>
                  <span style={{ fontSize: '10px', color: '#059669', fontWeight: '800' }}>
                    ✨ 50% Festive Off
                  </span>
                </div>

                {/* Explicit Chat & Call Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* Chat Button */}
                  <button
                    onClick={() => onStartChat(astro)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '9px 16px',
                      borderRadius: '16px',
                      backgroundColor: '#FFF7ED',
                      border: '1.5px solid #FDBA74',
                      color: '#C2410C',
                      fontSize: '13px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      boxShadow: '0 3px 8px rgba(194, 65, 12, 0.1)',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    <MessageSquare size={14} color="#C2410C" />
                    <span>Chat</span>
                  </button>

                  {/* Call Button */}
                  <button
                    onClick={() => onStartCall ? onStartCall(astro) : onStartChat(astro)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '9px 16px',
                      borderRadius: '16px',
                      backgroundColor: '#F0FDF4',
                      border: '1.5px solid #86EFAC',
                      color: '#15803D',
                      fontSize: '13px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      boxShadow: '0 3px 8px rgba(21, 128, 61, 0.1)',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    <Phone size={14} color="#15803D" />
                    <span>Call</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
