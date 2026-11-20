import React, { useState } from 'react';
import { Layers, ShieldCheck, Sparkles, X, ChevronRight } from 'lucide-react';

export default function PortalSwitcher({ currentPortal, onSelectPortal }) {
  const [isOpen, setIsOpen] = useState(false);

  const portals = [
    {
      id: 'seeker',
      title: 'Seeker App',
      subtitle: 'User Kundli & Consultation',
      icon: '🕉️',
      color: '#C85A32',
      bg: '#FFF7ED',
      border: '#FDBA74',
    },
    {
      id: 'astrologer',
      title: 'Astrologer Portal',
      subtitle: 'Guru Console & Live Readings',
      icon: '🔮',
      color: '#78350F',
      bg: '#FEF3C7',
      border: '#FCD34D',
    },
    {
      id: 'admin',
      title: 'Admin Console',
      subtitle: 'Platform Operations & Metrics',
      icon: '⚡',
      color: '#1E1B4B',
      bg: '#EEF2FF',
      border: '#C7D2FE',
    },
  ];

  return (
    <>
      {/* Floating Pill Button on Right Edge */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          top: '72px',
          right: '12px',
          zIndex: 80,
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '6px 10px',
          borderRadius: '999px',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(200, 90, 50, 0.35)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          color: '#1E1B4B',
          fontSize: '11px',
          fontWeight: '800',
          transition: 'transform 0.15s ease',
        }}
        title="Switch Portal (Seeker / Astrologer / Admin)"
      >
        <Layers size={13} color="#C85A32" />
        <span style={{ textTransform: 'capitalize' }}>
          {currentPortal === 'seeker' ? 'Portal' : currentPortal}
        </span>
      </button>

      {/* Switcher Modal / Sheet */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 120,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="glass-card"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '20px',
              maxWidth: '380px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.18)',
              border: '1.5px solid #E2E8F0',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#1E1B4B' }}>
                  BHAVISHYAA Ecosystem
                </h3>
                <p style={{ fontSize: '11px', color: '#64748B' }}>
                  Switch between unified role perspectives
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#F1F5F9',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={16} color="#64748B" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {portals.map((p) => {
                const isCurrent = currentPortal === p.id;

                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPortal(p.id);
                      setIsOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '16px',
                      backgroundColor: isCurrent ? p.bg : '#FFFFFF',
                      border: isCurrent ? `1.5px solid ${p.border}` : '1.5px solid #E2E8F0',
                      cursor: 'pointer',
                      textAlign: 'left',
                      boxShadow: isCurrent ? '0 4px 12px rgba(0, 0, 0, 0.05)' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '22px' }}>{p.icon}</span>
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: '800', color: p.color }}>
                          {p.title}
                        </div>
                        <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '1px' }}>
                          {p.subtitle}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {isCurrent ? (
                        <span style={{ fontSize: '10px', fontWeight: '800', backgroundColor: p.color, color: '#FFFFFF', padding: '2px 8px', borderRadius: '999px' }}>
                          Active
                        </span>
                      ) : (
                        <ChevronRight size={16} color="#94A3B8" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
