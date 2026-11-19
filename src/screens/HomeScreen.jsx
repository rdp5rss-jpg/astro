import React, { useState, useEffect } from 'react';
import {
  Sun,
  Heart,
  TrendingUp,
  Wallet,
  Flower2,
  Star,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Grid,
  Clock,
  Compass,
} from 'lucide-react';
import { astrologers } from '../data/astrologers';

export default function HomeScreen({ onSelectAstrologer, onNavigateTab, onOpenMatchmaker }) {
  const [offerSeconds, setOfferSeconds] = useState(9 * 3600 + 21 * 60 + 47);

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
    return [h, m, s];
  };

  const timerParts = formatTime(offerSeconds);

  const categories = [
    { title: 'Marriage', icon: Heart, bg: '#FEE2E2', color: '#EF4444' },
    { title: 'Love', icon: Heart, bg: '#FCE7F3', color: '#EC4899' },
    { title: 'Career', icon: TrendingUp, bg: '#E0E7FF', color: '#6366F1' },
    { title: 'Money', icon: Wallet, bg: '#FEF3C7', color: '#D97706' },
    { title: 'Health', icon: Flower2, bg: '#D1FAE5', color: '#10B981' },
  ];

  const actions = [
    { title: 'See my birth chart', desc: 'Lagna, Navamsha & Houses', icon: Grid, bg: '#E8EEFF', tab: 2 },
    { title: 'Check marriage match', desc: '36 Guna Milan & Doshas', icon: Heart, bg: '#FDE8EC', tab: 2 },
    { title: 'Planetary transits', desc: 'Current Gochara effects', icon: Compass, bg: '#E5F9F3', tab: 2 },
    { title: 'Shubh Muhurat timings', desc: 'Choghadiya & Rahu Kaal', icon: Clock, bg: '#FFF6E5', tab: 2 },
  ];

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Daily Panchang Bar */}
      <div
        className="glass-card"
        style={{
          margin: '8px 16px',
          padding: '10px 16px',
          borderRadius: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sun size={16} color="#E59400" />
          <span style={{ fontSize: '11.5px', fontWeight: '600', color: '#1E1B4B' }}>
            Shukla Dashami · Anuradha Nakshatra
          </span>
        </div>
        <span
          style={{
            fontSize: '10px',
            fontWeight: '700',
            backgroundColor: '#E6F9F3',
            color: '#10B981',
            padding: '3px 8px',
            borderRadius: '10px',
          }}
        >
          Shubh Muhurat
        </span>
      </div>

      {/* Astro Categories */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          padding: '8px 16px',
          scrollbarWidth: 'none',
        }}
      >
        {categories.map((cat, i) => {
          const IconComp = cat.icon;
          return (
            <div
              key={i}
              onClick={() => onNavigateTab(1)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '20px',
                  backgroundColor: cat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid #FFFFFF',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)',
                }}
              >
                <IconComp size={24} color={cat.color} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#1E1B4B' }}>
                {cat.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Festive Maha Offer Banner with Live Countdown Timer */}
      <div
        style={{
          margin: '12px 16px',
          padding: '20px',
          borderRadius: '26px',
          background: 'linear-gradient(135deg, #FFF0D4 0%, #FFDFB0 50%, #FFD59E 100%)',
          border: '2px solid #FFFFFF',
          boxShadow: '0 8px 24px rgba(229, 148, 0, 0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: '900',
              backgroundColor: '#C77700',
              color: '#FFFFFF',
              padding: '4px 10px',
              borderRadius: '12px',
              letterSpacing: '1px',
            }}
          >
            FESTIVE MAHA OFFER
          </span>

          {/* Timer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span className="glass-panel" style={{ padding: '3px 6px', borderRadius: '6px', fontWeight: '900', fontSize: '12px', color: '#8C4C00' }}>
              {timerParts[0]}
            </span>
            <span style={{ fontWeight: '900', color: '#7C3D00' }}>:</span>
            <span className="glass-panel" style={{ padding: '3px 6px', borderRadius: '6px', fontWeight: '900', fontSize: '12px', color: '#8C4C00' }}>
              {timerParts[1]}
            </span>
            <span style={{ fontWeight: '900', color: '#7C3D00' }}>:</span>
            <span className="glass-panel" style={{ padding: '3px 6px', borderRadius: '6px', fontWeight: '900', fontSize: '12px', color: '#8C4C00' }}>
              {timerParts[2]}
            </span>
          </div>
        </div>

        <h3
          style={{
            fontSize: '22px',
            fontWeight: '900',
            color: '#5E2E00',
            margin: '12px 0 6px',
            lineHeight: '1.2',
          }}
        >
          Every reading is<br />half price today
        </h3>
        <p style={{ fontSize: '12.5px', fontWeight: '600', color: '#8C4C00' }}>
          First consultation at flat ₹26/min (Was ₹52)
        </p>
      </div>

      {/* Quick Reading Section */}
      <div style={{ margin: '16px 0 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#1E1B4B' }}>
            Quick Reading
          </h2>
          <button
            onClick={() => onNavigateTab(1)}
            style={{ display: 'flex', alignItems: 'center', fontSize: '13px', fontWeight: '700', color: '#6C4AB6' }}
          >
            All Astrologers <ChevronRight size={16} />
          </button>
        </div>

        {/* Horizontal Astrologers Carousel */}
        <div
          style={{
            display: 'flex',
            gap: '14px',
            overflowX: 'auto',
            padding: '0 16px',
            scrollbarWidth: 'none',
          }}
        >
          {astrologers.map((astro) => (
            <div
              key={astro.id}
              className="glass-card"
              onClick={() => onSelectAstrologer(astro)}
              style={{
                width: '185px',
                padding: '12px',
                borderRadius: '22px',
                flexShrink: 0,
                cursor: 'pointer',
              }}
            >
              {/* Image & Badges */}
              <div
                style={{
                  height: '110px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #EADBFF 0%, #D4C3F5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  marginBottom: '10px',
                }}
              >
                <span style={{ fontSize: '36px', fontWeight: '800', color: '#6C4AB6' }}>
                  {astro.initial}
                </span>

                {/* Online Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    padding: '2px 7px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  <span style={{ fontSize: '9.5px', fontWeight: '700', color: '#1E1B4B' }}>Online</span>
                </div>

                {/* Heart */}
                <div
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    padding: '4px',
                    borderRadius: '50%',
                  }}
                >
                  <Heart size={14} color="#F43F5E" fill="#F43F5E" />
                </div>

                {astro.isCelebrity && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '6px',
                      left: '8px',
                      backgroundColor: '#E59400',
                      color: '#FFFFFF',
                      fontSize: '9px',
                      fontWeight: '800',
                      padding: '2px 6px',
                      borderRadius: '8px',
                    }}
                  >
                    👑 Celebrity
                  </span>
                )}
              </div>

              {/* Name & Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#1E1B4B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {astro.name}
                </span>
                <CheckCircle size={13} color="#10B981" fill="#10B981" />
              </div>

              <div style={{ fontSize: '11px', color: '#475569', margin: '2px 0 6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {astro.skills[0]}
              </div>

              {/* Rating & Exp */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#94A3B8', marginBottom: '8px' }}>
                <Star size={13} color="#E59400" fill="#E59400" />
                <span style={{ fontWeight: '700', color: '#1E1B4B' }}>{astro.rating}</span>
                <span>• {astro.experienceYears}y exp</span>
              </div>

              {/* Price & Chat CTA */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '13.5px', fontWeight: '900', color: '#1E1B4B' }}>
                    ₹{astro.ratePerMin}
                  </span>
                  <span style={{ fontSize: '10px', color: '#94A3B8' }}>/m</span>
                  <span style={{ fontSize: '10px', color: '#94A3B8', textDecoration: 'line-through', marginLeft: '4px' }}>
                    ₹{astro.originalRatePerMin}
                  </span>
                </div>
                <button
                  style={{
                    backgroundColor: '#6C4AB6',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '10px',
                    fontSize: '10.5px',
                    fontWeight: '800',
                  }}
                >
                  Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Horoscope Card */}
      <div
        className="glass-card"
        onClick={() => onNavigateTab(2)}
        style={{
          margin: '16px',
          padding: '20px',
          borderRadius: '26px',
          background: '#F0EBFB',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: '800',
                backgroundColor: 'rgba(108, 74, 182, 0.12)',
                color: '#6C4AB6',
                padding: '3px 8px',
                borderRadius: '8px',
                letterSpacing: '1px',
              }}
            >
              TODAY'S HOROSCOPE
            </span>
            <h3
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '19px',
                fontWeight: '800',
                color: '#1E1B4B',
                margin: '6px 0 4px',
              }}
            >
              SCORPIO (वृश्चिक)
            </h3>
            <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: '1.4', marginBottom: '10px' }}>
              The day pulls inward towards deep contemplation and family harmony. Favorable hours for finance.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '700', color: '#6C4AB6' }}>
              Read full forecast <ArrowRight size={14} />
            </div>
          </div>

          <div
            style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FFA726 0%, #E65100 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 18px rgba(230, 81, 0, 0.35)',
              flexShrink: 0,
              marginLeft: '14px',
            }}
          >
            <Sun size={40} color="#FFFFFF" />
          </div>
        </div>
      </div>

      {/* Destiny Action Grid */}
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1E1B4B', marginBottom: '12px' }}>
          What do you want to explore?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {actions.map((act, i) => {
            const IconComp = act.icon;
            return (
              <div
                key={i}
                className="glass-card"
                onClick={() => onNavigateTab(act.tab)}
                style={{
                  backgroundColor: act.bg,
                  padding: '14px',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  minHeight: '94px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <IconComp size={22} color="#1E1B4B" />
                  <ChevronRight size={14} color="#94A3B8" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>{act.title}</div>
                  <div style={{ fontSize: '10.5px', color: '#475569' }}>{act.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Mentors CTA */}
      <div
        style={{
          margin: '20px 16px',
          padding: '22px',
          borderRadius: '26px',
          background: 'linear-gradient(135deg, #8D72E1 0%, #6C4AB6 100%)',
          color: '#FFFFFF',
          boxShadow: '0 8px 24px rgba(108, 74, 182, 0.35)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Sparkles size={20} color="#E59400" />
          <h3 style={{ fontSize: '17px', fontWeight: '800' }}>Featured In-House Mentors</h3>
        </div>
        <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '16px' }}>
          Direct personal guidance with certified Vedic scholars with 15+ years experience.
        </p>
        <button
          onClick={onOpenMatchmaker}
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            color: '#6C4AB6',
            padding: '14px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Sparkles size={18} color="#6C4AB6" />
          Launch Smart Vedic Matchmaker
        </button>
      </div>
    </div>
  );
}
