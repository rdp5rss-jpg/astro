import React from 'react';
import { Compass, MessageSquare, BookOpen, Gift } from 'lucide-react';

export default function BottomNav({ 
  activeTab, 
  onTabChange, 
  onSelectTab, 
  onOpenMatchmaker,
}) {
  const handleTab = (key) => {
    if (onSelectTab) onSelectTab(key);
    if (onTabChange) onTabChange(key);
  };

  const navItems = [
    { key: 'explore', label: 'Explore', icon: Compass },
    { key: 'readings', label: 'Readings', icon: MessageSquare, hasLiveDot: true },
    { key: 'free', label: 'Free', icon: Gift, isPill: true },
    { key: 'reports', label: 'Reports', icon: BookOpen },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: '16px',
        left: 0,
        right: 0,
        maxWidth: '480px',
        margin: '0 auto',
        padding: '0 16px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        pointerEvents: 'none',
      }}
    >
      {/* 4-Item Floating Nav Pill matching user screenshot */}
      <div
        style={{
          flex: 1,
          borderRadius: '36px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 8px',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)',
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          pointerEvents: 'auto',
        }}
      >
        {navItems.map((item) => {
          const isSelected = activeTab === item.key;
          const IconComponent = item.icon;

          // Special "Free" Pill Button matching screenshot
          if (item.isPill) {
            return (
              <button
                key={item.key}
                onClick={() => handleTab(item.key)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px',
                  padding: '6px 14px',
                  borderRadius: '26px',
                  backgroundColor: isSelected ? 'rgba(254, 215, 170, 0.95)' : 'rgba(254, 237, 222, 0.85)',
                  border: '1px solid rgba(251, 146, 60, 0.35)',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: isSelected ? '0 3px 10px rgba(200, 90, 50, 0.2)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <IconComponent size={20} color="#C85A32" strokeWidth={2.4} />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '900',
                    color: '#C85A32',
                    letterSpacing: '0.2px',
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          // Regular Tabs (Explore, Readings, Reports)
          return (
            <button
              key={item.key}
              onClick={() => handleTab(item.key)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                padding: '6px 10px',
                borderRadius: '20px',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconComponent
                  size={21}
                  color={isSelected ? '#C85A32' : '#475569'}
                  strokeWidth={isSelected ? 2.5 : 2}
                />

                {/* Green Live Dot for Readings */}
                {item.hasLiveDot && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-3px',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      border: '1.5px solid #FFFFFF',
                    }}
                  />
                )}
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: isSelected ? '800' : '600',
                  color: isSelected ? '#C85A32' : '#475569',
                  letterSpacing: '0.1px',
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating AI Finder Magic Button (FAB) on the FAR RIGHT */}
      <button
        onClick={onOpenMatchmaker}
        title="AI Celestial Finder & Matchmaker"
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #E06D3F 0%, #C85A32 100%)',
          border: '2.5px solid #FFFFFF',
          boxShadow: '0 8px 24px rgba(200, 90, 50, 0.42)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          pointerEvents: 'auto',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 10px 28px rgba(200, 90, 50, 0.52)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(200, 90, 50, 0.42)';
        }}
        aria-label="AI Astrologer Matchmaker"
      >
        {/* Magic Wand with Sparkles SVG matching user's photo */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m14 10 7-7" />
          <path d="M12.5 4.5 15 2l4.5 4.5-2.5 2.5" />
          <path d="M3 21l8.5-8.5" />
          <path d="M9 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
          <path d="M19 13l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
        </svg>
      </button>
    </nav>
  );
}
