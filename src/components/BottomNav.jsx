import React from 'react';
import { Compass, MessageSquare, Grid, BookOpen, Sparkles } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange, onOpenMatchmaker }) {
  const navItems = [
    { id: 0, label: 'Explore', icon: Compass },
    { id: 1, label: 'Consult', icon: MessageSquare, badge: 'LIVE' },
    { id: 'fab', isFab: true },
    { id: 2, label: 'Kundli', icon: Grid },
    { id: 3, label: 'Reports', icon: BookOpen },
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
      }}
    >
      <div
        className="glass-panel"
        style={{
          borderRadius: '32px',
          height: '74px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 10px',
          boxShadow: '0 12px 30px rgba(108, 74, 182, 0.15)',
        }}
      >
        {navItems.map((item) => {
          if (item.isFab) {
            return (
              <button
                key="fab"
                onClick={onOpenMatchmaker}
                title="Smart Cosmic Matchmaker"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFA726 0%, #E59400 50%, #D97706 100%)',
                  border: '2.5px solid #FFFFFF',
                  boxShadow: '0 6px 18px rgba(229, 148, 0, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s',
                }}
              >
                <Sparkles size={24} color="#FFFFFF" />
              </button>
            );
          }

          const isSelected = activeTab === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                padding: '6px 14px',
                borderRadius: '20px',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <div
                style={{
                  padding: isSelected ? '6px' : '4px',
                  borderRadius: '50%',
                  backgroundColor: isSelected ? 'rgba(108, 74, 182, 0.12)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
              >
                <IconComponent
                  size={isSelected ? 22 : 20}
                  color={isSelected ? '#6C4AB6' : '#94A3B8'}
                />

                {item.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-8px',
                      fontSize: '7.5px',
                      fontWeight: '900',
                      backgroundColor: '#10B981',
                      color: '#FFFFFF',
                      padding: '1.5px 4.5px',
                      borderRadius: '6px',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: isSelected ? '700' : '500',
                  color: isSelected ? '#6C4AB6' : '#94A3B8',
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
