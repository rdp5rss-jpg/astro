import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, Search, Star, CheckCircle, ChevronRight, Sparkles } from 'lucide-react';
import { astrologers } from '../data/astrologers';

export default function ReadingsScreen({ onStartChat }) {
  const [activeSegment, setActiveSegment] = useState('chat'); // 'chat' | 'call'
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

  return (
    <div style={{ paddingBottom: '120px' }}>
      {/* Top Banner Offer Bar matching WhatsApp Image 2026-11-19 at 4.39.14 PM.jpeg */}
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
        <span>Festive offer — 50% Off</span>
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px 16px' }}>
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
            <span>Chat</span>
          </button>

          <button
            onClick={() => setActiveSegment('call')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '30px',
              border: 'none',
              backgroundColor: activeSegment === 'call' ? '#C85A32' : 'transparent',
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
            <span>Call</span>
          </button>
        </div>

        {/* Search Icon Button */}
        <button
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1E1B4B',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          }}
        >
          <Search size={18} />
        </button>
      </div>

      {/* Main Empty State from Screenshot */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '74px',
            height: '74px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '2px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
            marginBottom: '16px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
          }}
        >
          {activeSegment === 'call' ? <Phone size={34} /> : <MessageSquare size={34} />}
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1E1B4B', marginBottom: '6px' }}>
          {activeSegment === 'call' ? 'No calls yet' : 'No chats yet'}
        </h3>

        <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
          {activeSegment === 'call' 
            ? 'Your voice readings will show up here.' 
            : 'Your personal chat consultations will show up here.'}
        </p>

        {/* Find Astrologer Button matching reference */}
        <button
          onClick={() => onStartChat(astrologers[0])}
          style={{
            padding: '16px 36px',
            borderRadius: '35px',
            backgroundColor: '#C85A32',
            background: 'linear-gradient(135deg, #D46A43 0%, #B84D28 100%)',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '15px',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(184, 77, 40, 0.35)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          Find Astrologer
        </button>
      </div>

      {/* Available Gurus Carousel */}
      <div style={{ marginTop: '20px', padding: '0 16px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#1E1B4B', marginBottom: '12px' }}>
          Available for instant consultation
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {astrologers.slice(0, 3).map((astro) => (
            <div
              key={astro.id}
              onClick={() => onStartChat(astro)}
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={astro.avatar}
                  alt={astro.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ fontSize: '14.5px', fontWeight: '800', color: '#1E1B4B' }}>{astro.name}</span>
                    <CheckCircle size={14} color="#10B981" />
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{astro.specialty} • {astro.exp}</div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '15px', fontWeight: '900', color: '#C85A32' }}>₹{astro.rate}/min</span>
                <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '700' }}>● Online</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
