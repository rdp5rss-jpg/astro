import React, { useState } from 'react';
import { MessageSquare, Phone, Star, CheckCircle, ChevronRight, PhoneCall } from 'lucide-react';
import { astrologers } from '../data/astrologers';

export default function ReadingsScreen({ onSelectAstrologer, onOpenMatchmaker }) {
  const [selectedTab, setSelectedTab] = useState(0); // 0 = Chat, 1 = Call
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Vedic', 'Tarot', 'Career', 'Marriage', 'Love'];

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Segmented Glass Switch */}
      <div
        className="glass-panel"
        style={{
          margin: '8px 16px',
          padding: '4px',
          borderRadius: '30px',
          display: 'flex',
        }}
      >
        <button
          onClick={() => setSelectedTab(0)}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '26px',
            background: selectedTab === 0 ? 'linear-gradient(135deg, #8D72E1 0%, #6C4AB6 100%)' : 'transparent',
            color: selectedTab === 0 ? '#FFFFFF' : '#475569',
            fontWeight: '700',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
        >
          <MessageSquare size={17} />
          Live Chat
        </button>

        <button
          onClick={() => setSelectedTab(1)}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '26px',
            background: selectedTab === 1 ? 'linear-gradient(135deg, #8D72E1 0%, #6C4AB6 100%)' : 'transparent',
            color: selectedTab === 1 ? '#FFFFFF' : '#475569',
            fontWeight: '700',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
        >
          <Phone size={17} />
          Voice Call
        </button>
      </div>

      {/* Filter Chips */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          padding: '6px 16px',
          scrollbarWidth: 'none',
        }}
      >
        {filters.map((f) => {
          const isSel = activeFilter === f;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '6px 16px',
                borderRadius: '18px',
                fontSize: '12px',
                fontWeight: '600',
                backgroundColor: isSel ? '#6C4AB6' : 'rgba(255, 255, 255, 0.85)',
                color: isSel ? '#FFFFFF' : '#1E1B4B',
                border: isSel ? '1px solid #6C4AB6' : '1px solid #E2E8F0',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {selectedTab === 0 ? (
        <>
          {/* Active Live Session Card */}
          <div
            className="glass-card"
            onClick={() => onSelectAstrologer(astrologers[0])}
            style={{
              margin: '12px 16px',
              padding: '16px',
              borderRadius: '24px',
              backgroundColor: '#EBF7F2',
              borderColor: 'rgba(16, 185, 129, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              cursor: 'pointer',
            }}
          >
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: '800',
                  color: '#10B981',
                }}
              >
                R
              </div>
              <span
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  border: '2px solid #FFFFFF',
                }}
              />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '15px', fontWeight: '800', color: '#1E1B4B' }}>
                  Acharya Rudranand
                </span>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: '900',
                    backgroundColor: '#10B981',
                    color: '#fff',
                    padding: '2px 6px',
                    borderRadius: '8px',
                  }}
                >
                  LIVE SESSION
                </span>
              </div>
              <p
                style={{
                  fontSize: '12px',
                  color: '#475569',
                  marginTop: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Mahi ji what do you want to know about your marriage?
              </p>
            </div>

            <ChevronRight size={18} color="#10B981" />
          </div>

          {/* Online Astrologers Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 20px 6px',
            }}
          >
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#1E1B4B' }}>
              Top Astrologers Online
            </h3>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#10B981' }}>
              18 Available Now
            </span>
          </div>

          {/* List of Astrologers */}
          <div style={{ padding: '0 16px' }}>
            {astrologers.map((astro) => (
              <div
                key={astro.id}
                className="glass-card"
                onClick={() => onSelectAstrologer(astro)}
                style={{
                  padding: '14px',
                  borderRadius: '22px',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  cursor: 'pointer',
                }}
              >
                {/* Avatar */}
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      backgroundColor: '#EADBFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      fontWeight: '800',
                      color: '#6C4AB6',
                    }}
                  >
                    {astro.initial}
                  </div>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      right: '2px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: astro.isOnline ? '#10B981' : '#94A3B8',
                      border: '2px solid #FFFFFF',
                    }}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '14.5px', fontWeight: '800', color: '#1E1B4B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {astro.name}
                    </span>
                    <CheckCircle size={14} color="#10B981" fill="#10B981" />
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#475569', margin: '2px 0' }}>
                    {astro.skills.slice(0, 2).join(', ')}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94A3B8' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#1E1B4B', fontWeight: '700' }}>
                      <Star size={12} color="#E59400" fill="#E59400" />
                      {astro.rating}
                    </div>
                    <span>• {astro.experienceYears} yrs</span>
                    <span>• {astro.consultations} calls</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: '900', color: '#1E1B4B' }}>
                    ₹{astro.ratePerMin}<span style={{ fontSize: '10px', color: '#94A3B8' }}>/m</span>
                  </div>
                  <button
                    style={{
                      marginTop: '6px',
                      padding: '6px 14px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #8D72E1 0%, #6C4AB6 100%)',
                      color: '#fff',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <MessageSquare size={12} /> Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Voice Call Mode */
        <div style={{ padding: '0 16px' }}>
          <div
            className="glass-card"
            style={{
              margin: '16px 0',
              padding: '24px',
              borderRadius: '26px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#EADBFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <PhoneCall size={30} color="#6C4AB6" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1E1B4B' }}>
              Instant Voice Readings
            </h3>
            <p style={{ fontSize: '13px', color: '#475569', margin: '6px 0 16px' }}>
              Speak directly in private, secure 1-on-1 audio calls with India's top Vedic Gurus.
            </p>
            <button
              onClick={() => onSelectAstrologer(astrologers[1])}
              style={{
                padding: '12px 24px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #8D72E1 0%, #6C4AB6 100%)',
                color: '#fff',
                fontSize: '13px',
                fontWeight: '700',
              }}
            >
              Connect with Live Astrologer
            </button>
          </div>

          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1E1B4B', margin: '16px 4px 10px' }}>
            Verified Astrologers for Voice Call
          </h3>

          {astrologers.map((astro) => (
            <div
              key={astro.id}
              className="glass-card"
              onClick={() => onSelectAstrologer(astro)}
              style={{
                padding: '14px',
                borderRadius: '22px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#EADBFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: '800',
                  color: '#6C4AB6',
                  flexShrink: 0,
                }}
              >
                {astro.initial}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#1E1B4B' }}>
                  {astro.name}
                </div>
                <div style={{ fontSize: '11px', color: '#475569' }}>
                  {astro.languages.join(' · ')}
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                  {astro.skills[0]}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: '900', color: '#1E1B4B' }}>
                  ₹{astro.ratePerMin}<span style={{ fontSize: '10px', color: '#94A3B8' }}>/m</span>
                </div>
                <button
                  style={{
                    marginTop: '6px',
                    padding: '6px 14px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: '#fff',
                    fontSize: '11.5px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Phone size={12} /> Call
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
