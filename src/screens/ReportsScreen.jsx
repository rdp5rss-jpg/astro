import React from 'react';
import { ArrowLeft, Star, Sparkles, BookOpen, CheckCircle, ChevronRight } from 'lucide-react';

export default function ReportsScreen({ seekerName = 'Mahi', onConsultClick }) {
  const pagesList = [
    { num: 'I', title: 'What should I focus on now?', desc: 'Discover where your planetary energies demand your awareness today.' },
    { num: 'II', title: 'Your Big Picture: Career & Wealth', desc: 'Detailed 10-year astrological financial & professional forecast.' },
    { num: 'III', title: 'Your Lagna & Navamsha Kundli', desc: 'Full planetary placements, degrees and sacred alignments explained.' },
    { num: 'IV', title: 'Love, Marriage & Soul Connections', desc: 'Timing of partnership, spouse traits and marital harmony remedies.' },
    { num: 'V', title: 'Health, Vitality & Dosha Screening', desc: 'Sade Sati, Manglik and personalized Ayurvedic balance rituals.' },
    { num: 'VI', title: 'Your 3 Burning Life Questions', desc: 'Direct personalized answers formulated by Acharya Sandhya.' },
    { num: 'VII', title: 'Auspicious Gemstones & Catalysts', desc: 'Certified consecrated stones, metals and Beej mantras for you.' },
    { num: 'VIII', title: 'The Next 5 Years: Year by Year', desc: 'Transit timelines from 2026 through 2030 mapped quarter by quarter.' },
  ];

  return (
    <div style={{ paddingBottom: '120px' }}>
      {/* Top Hero Section matching WhatsApp Image 2026-11-19 at 4.39.15 PM.jpeg */}
      <div
        style={{
          position: 'relative',
          padding: '28px 20px 36px',
          borderRadius: '0 0 36px 36px',
          background: 'radial-gradient(circle at 50% 20%, #4A3B32 0%, #2B1810 70%, #170B06 100%)',
          color: '#FFFFFF',
          overflow: 'hidden',
          textAlign: 'center',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.25)',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: '900',
            letterSpacing: '2.5px',
            color: '#E59400',
            textTransform: 'uppercase',
          }}
        >
          BHAVISHYAA PRESENTS
        </span>

        <h1
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '40px',
            fontWeight: '900',
            letterSpacing: '4px',
            color: '#FDE68A',
            marginTop: '4px',
            textShadow: '0 4px 20px rgba(229, 148, 0, 0.4)',
          }}
        >
          SANDHYA
        </h1>

        <div
          style={{
            fontSize: '10.5px',
            fontWeight: '800',
            letterSpacing: '2px',
            color: 'rgba(255, 255, 255, 0.75)',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          BHAVISHYAA'S IN-HOUSE ASTROLOGER
        </div>

        {/* Sandhya Portrait + 5.0 Star Rating Badge */}
        <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 24px' }}>
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
            alt="Acharya Sandhya"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #F59E0B',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
            }}
          />

          {/* Golden Rating Badge from reference */}
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-14px',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FDE68A 0%, #D97706 100%)',
              color: '#451A03',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(217, 119, 6, 0.5)',
              border: '2px solid #FFFFFF',
            }}
          >
            <div style={{ display: 'flex', gap: '1px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={7} fill="#451A03" color="#451A03" />
              ))}
            </div>
            <span style={{ fontSize: '15px', fontWeight: '900', lineHeight: '1.1' }}>5.0</span>
            <span style={{ fontSize: '8px', fontWeight: '800' }}>14k ratings</span>
          </div>
        </div>

        {/* 3 Floating Dossier Pages from Screenshot */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
          {/* Page 1 (Left tilted) */}
          <div
            style={{
              width: '90px',
              height: '120px',
              backgroundColor: '#FFFFFF',
              color: '#1E1B4B',
              borderRadius: '12px',
              padding: '10px 8px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
              transform: 'rotate(-8deg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'left',
            }}
          >
            <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748B' }}>III Your chart</div>
            {/* Mini Kundli graphic */}
            <div style={{ width: '40px', height: '40px', border: '1px solid #C85A32', margin: 'auto', transform: 'rotate(45deg)' }} />
            <div style={{ fontSize: '7.5px', color: '#94A3B8' }}>D1 Lagna</div>
          </div>

          {/* Page 2 (Center Hero) */}
          <div
            style={{
              width: '120px',
              height: '150px',
              backgroundColor: '#FFFFFF',
              color: '#1E1B4B',
              borderRadius: '14px',
              padding: '14px 10px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <div>
              <div style={{ fontSize: '8px', fontWeight: '900', letterSpacing: '1px', color: '#6C4AB6' }}>SANDHYA REPORTS</div>
              <div style={{ fontSize: '9px', color: '#64748B', fontStyle: 'italic', marginTop: '2px' }}>Full Life Report</div>
              <div style={{ fontSize: '17px', fontWeight: '900', color: '#1E1B4B', marginTop: '4px' }}>{seekerName}</div>
              <div style={{ fontSize: '8px', color: '#94A3B8' }}>Prepared for you · 8 pages</div>
            </div>

            {/* Blue seal */}
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#1E1B4B',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              fontSize: '7px',
              fontWeight: 'bold',
            }}>
              for<br/>{seekerName}
            </div>
          </div>

          {/* Page 3 (Right tilted) */}
          <div
            style={{
              width: '90px',
              height: '120px',
              backgroundColor: '#FFFFFF',
              color: '#1E1B4B',
              borderRadius: '12px',
              padding: '10px 8px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
              transform: 'rotate(8deg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'left',
            }}
          >
            <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748B' }}>VI Questions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ height: '3px', backgroundColor: '#E2E8F0', borderRadius: '2px' }} />
              <div style={{ height: '3px', backgroundColor: '#E2E8F0', borderRadius: '2px', width: '80%' }} />
              <div style={{ height: '3px', backgroundColor: '#E2E8F0', borderRadius: '2px', width: '60%' }} />
            </div>
            <div style={{ fontSize: '7.5px', color: '#94A3B8' }}>3 answers</div>
          </div>
        </div>
      </div>

      {/* Main Narrative Headline from reference */}
      <div style={{ padding: '24px 20px 10px', textAlign: 'center' }}>
        <h2 style={{
          fontSize: '26px',
          fontWeight: '900',
          color: '#1E1B4B',
          lineHeight: '1.25',
          letterSpacing: '-0.5px'
        }}>
          {seekerName}, your Full Life Report.<br />
          8 pages, written for you.
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B', marginTop: '6px' }}>
          Read from your own kundli, page by page.
        </p>

        {/* Action Button: Get my Full Life Report */}
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => alert('🌟 Preparing your Complete 8-Page Life Report with Acharya Sandhya!')}
            style={{
              width: '100%',
              padding: '18px 24px',
              borderRadius: '35px',
              backgroundColor: '#F59E0B',
              background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #D97706 100%)',
              border: 'none',
              color: '#451A03',
              fontSize: '16px',
              fontWeight: '900',
              boxShadow: '0 8px 25px rgba(217, 119, 6, 0.35)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
            }}
          >
            <Sparkles size={18} color="#451A03" />
            <span>Get my Full Life Report</span>
          </button>
        </div>
      </div>

      {/* Page by Page Explorer */}
      <div style={{ marginTop: '24px', padding: '0 16px' }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: '900',
            letterSpacing: '2px',
            color: '#6C4AB6',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          YOUR REPORT, PAGE BY PAGE
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {pagesList.map((p, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 16px',
                borderRadius: '20px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  backgroundColor: '#FEF3C7',
                  color: '#B45309',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '900',
                  fontSize: '13px',
                  flexShrink: 0,
                }}
              >
                {p.num}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#1E1B4B' }}>{p.title}</h4>
                <p style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>{p.desc}</p>
              </div>
              <ChevronRight size={16} color="#94A3B8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
