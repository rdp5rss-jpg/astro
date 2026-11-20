import React from 'react';
import { 
  Gift, 
  Sparkles, 
  Clock, 
  Heart, 
  Star, 
  Compass, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  Gem
} from 'lucide-react';

export default function FreeScreen({ onConsultClick, onStartMatch }) {
  const freeItems = [
    {
      id: 1,
      title: 'Daily Horoscope Reading',
      desc: 'Accurate planetary forecasts for your Moon sign today',
      icon: Star,
      color: '#D97706',
      bg: '#FEF3C7',
      action: 'Read Today',
    },
    {
      id: 2,
      title: 'Free Kundli Gun Milan Match',
      desc: 'Check 36 Ashta Kuta marriage compatibility score',
      icon: Heart,
      color: '#E11D48',
      bg: '#FFE4E6',
      action: 'Check Match',
      onClick: onStartMatch,
    },
    {
      id: 3,
      title: 'Today\'s Shubh Muhurat & Choghadiya',
      desc: 'Abhijit Muhurat & Rahu Kaal auspicious timings',
      icon: Clock,
      color: '#2563EB',
      bg: '#EFF6FF',
      action: 'View Muhurat',
    },
    {
      id: 4,
      title: 'Lucky Gemstone & Vedic Remedy',
      desc: 'Personalized gemstone recommendations for career & health',
      icon: Gem,
      color: '#16A34A',
      bg: '#DCFCE7',
      action: 'Find Gemstone',
    },
  ];

  return (
    <div style={{ padding: '10px 16px 90px', color: '#1E1B4B', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Free Perks Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FEF3C7 0%, #FED7AA 50%, #FFEDD5 100%)',
        border: '1.5px solid #FCD34D',
        borderRadius: '24px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 8px 24px rgba(217, 119, 6, 0.12)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#FFFFFF', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '800', color: '#B45309', border: '1px solid #FDE68A', marginBottom: '8px' }}>
            <Gift size={13} color="#D97706" /> 100% Free Cosmic Services
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#78350F', lineHeight: 1.2 }}>
            Daily Free Vedic Insights
          </h2>
          <p style={{ fontSize: '12px', color: '#92400E', marginTop: '4px' }}>
            Complimentary Kundli calculation, daily horoscopes, and auspicious timings.
          </p>
        </div>
      </div>

      {/* Free Services List */}
      <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1E1B4B', marginBottom: '12px' }}>
        Complimentary Services
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {freeItems.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              onClick={item.onClick || onConsultClick}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #E2E8F0',
                borderRadius: '18px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  backgroundColor: item.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <IconComp size={22} color={item.color} />
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#1E1B4B' }}>{item.title}</h4>
                  <p style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{item.desc}</p>
                </div>
              </div>

              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '10px',
                backgroundColor: '#F1F5F9',
                color: '#1E1B4B',
                fontSize: '11px',
                fontWeight: '800',
                flexShrink: 0
              }}>
                {item.action} <ArrowRight size={12} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
