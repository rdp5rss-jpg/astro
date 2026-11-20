import React, { useState, useEffect } from 'react';
import {
  Heart,
  TrendingUp,
  Wallet,
  Flower2,
  Star,
  ChevronRight,
  Sparkles,
  Compass,
  Clock,
  CheckCircle,
  Gem
} from 'lucide-react';
import { astrologers } from '../data/astrologers';

export default function HomeScreen({ onSelectAstrologer, onNavigateTab, onOpenMatchmaker }) {
  const [offerSeconds, setOfferSeconds] = useState(9 * 3600 + 22 * 60 + 8);

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

  // Categories matching WhatsApp Image 2026-11-19 at 4.39.13 PM (1).jpeg
  const categories = [
    { title: 'Marriage', icon: Gem, bg: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)', color: '#FFFFFF' },
    { title: 'Love', icon: Heart, bg: 'linear-gradient(135deg, #F472B6 0%, #DB2777 100%)', color: '#FFFFFF' },
    { title: 'Career', icon: TrendingUp, bg: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)', color: '#FFFFFF' },
    { title: 'Money', icon: Wallet, bg: 'linear-gradient(135deg, #34D399 0%, #059669 100%)', color: '#FFFFFF' },
    { title: 'Health', icon: Flower2, bg: 'linear-gradient(135deg, #2DD4BF 0%, #0D9488 100%)', color: '#FFFFFF' },
  ];

  return (
    <div style={{ paddingBottom: '120px' }}>
      {/* Top 5 Categories with smooth pastel glowing container */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          overflowX: 'auto',
          gap: '12px',
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
                gap: '8px',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '22px',
                  background: cat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) scale(1)')}
              >
                <IconComp size={26} color={cat.color} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#1E1B4B' }}>
                {cat.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Festive Maha Offer Banner with Live Countdown Timer */}
      <div
        style={{
          margin: '14px 16px',
          padding: '22px 20px',
          borderRadius: '28px',
          backgroundColor: '#B84D28',
          background: 'linear-gradient(135deg, #D46A43 0%, #B84D28 60%, #9E3D1B 100%)',
          color: '#FFFFFF',
          boxShadow: '0 12px 30px rgba(184, 77, 40, 0.28)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Background decorative Diwali/Puja glow & Diya */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(254, 240, 138, 0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 10 }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '900',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#FEF3C7',
            }}
          >
            FESTIVE MAHA OFFER
          </span>

          <h2
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '24px',
              fontWeight: '800',
              color: '#FFFFFF',
              marginTop: '4px',
              lineHeight: '1.2',
            }}
          >
            Every reading<br />is half price
          </h2>
        </div>

        {/* Live Countdown Timer Boxes matching reference */}
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 10 }}>
          <div
            style={{
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              fontWeight: '900',
              fontSize: '20px',
              padding: '8px 12px',
              borderRadius: '12px',
              boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
              minWidth: '46px',
              textAlign: 'center',
            }}
          >
            {timerParts[0]}
          </div>
          <span style={{ color: '#FEF3C7', fontWeight: '900', fontSize: '20px' }}>:</span>
          <div
            style={{
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              fontWeight: '900',
              fontSize: '20px',
              padding: '8px 12px',
              borderRadius: '12px',
              boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
              minWidth: '46px',
              textAlign: 'center',
            }}
          >
            {timerParts[1]}
          </div>
          <span style={{ color: '#FEF3C7', fontWeight: '900', fontSize: '20px' }}>:</span>
          <div
            style={{
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              fontWeight: '900',
              fontSize: '20px',
              padding: '8px 12px',
              borderRadius: '12px',
              boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
              minWidth: '46px',
              textAlign: 'center',
            }}
          >
            {timerParts[2]}
          </div>
        </div>
      </div>

      {/* Quick Reading Section matching WhatsApp Image 2026-11-19 at 4.39.13 PM (1).jpeg */}
      <div style={{ marginTop: '18px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px 12px',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1E1B4B' }}>
            Quick Reading
          </h2>
          <button
            onClick={() => onNavigateTab(1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '13.5px',
              fontWeight: '800',
              color: '#C85A32',
              cursor: 'pointer',
              gap: '2px'
            }}
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
                width: '195px',
                padding: '12px',
                borderRadius: '24px',
                flexShrink: 0,
                cursor: 'pointer',
                backgroundColor: 'rgba(255, 255, 255, 0.94)',
                border: '1.5px solid rgba(255, 255, 255, 0.95)',
                boxShadow: '0 8px 24px rgba(108, 74, 182, 0.08)',
              }}
            >
              {/* Image & Badges */}
              <div
                style={{
                  height: '140px',
                  borderRadius: '18px',
                  backgroundImage: `url(${astro.avatar})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  marginBottom: '10px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                }}
              >
                {/* Online Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  <span style={{ fontSize: '10px', fontWeight: '800', color: '#065F46' }}>Online</span>
                </div>

                {/* Heart Button */}
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    padding: '6px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  <Heart size={14} color="#F43F5E" fill="#F43F5E" />
                </div>

                {/* Celebrity Badge */}
                {astro.isCelebrity && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      left: '8px',
                      backgroundColor: '#FEF3C7',
                      color: '#B45309',
                      border: '1px solid #FCD34D',
                      fontSize: '9.5px',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    👑 Celebrity
                  </span>
                )}
              </div>

              {/* Name & Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '14.5px', fontWeight: '800', color: '#1E1B4B' }}>
                  {astro.name}
                </span>
                <CheckCircle size={14} color="#10B981" />
              </div>

              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', fontWeight: '500' }}>
                {astro.specialty}
              </div>

              {/* Stats: Rating & Exp */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#D97706', fontWeight: '800' }}>
                  <Star size={12} fill="#D97706" color="#D97706" /> {astro.rating}
                </span>
                <span>•</span>
                <span>{astro.consults}</span>
                <span>•</span>
                <span>{astro.exp}</span>
              </div>

              {/* Price & Action */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #F1F5F9' }}>
                <span style={{ fontSize: '16px', fontWeight: '900', color: '#C85A32' }}>
                  ₹{astro.rate}/min
                </span>
                <span style={{ fontSize: '12px', color: '#94A3B8', textDecoration: 'line-through' }}>
                  ₹{astro.rate * 2}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Astrologers Section */}
      <div
        style={{
          margin: '20px 16px',
          padding: '24px',
          borderRadius: '28px',
          backgroundColor: '#3B1E54',
          background: 'linear-gradient(135deg, #4A1D96 0%, #3B1E54 100%)',
          color: '#FFFFFF',
          boxShadow: '0 12px 30px rgba(74, 29, 150, 0.25)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Sparkles size={20} color="#F59E0B" />
          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '18px', fontWeight: '800' }}>
            Featured Astrologers
          </h3>
        </div>
        <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '18px' }}>
          Hand-picked by Bhavishyaa for deep Vedic insight and highest accuracy.
        </p>

        <button
          onClick={onOpenMatchmaker}
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            color: '#4A1D96',
            padding: '16px',
            borderRadius: '22px',
            fontSize: '14.5px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <Sparkles size={18} color="#D97706" />
          <span>Launch Smart Vedic Matchmaker</span>
        </button>
      </div>
    </div>
  );
}
