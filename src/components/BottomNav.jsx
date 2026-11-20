import React from 'react';
import { Compass, MessageSquare, Grid, BookOpen, Sparkles } from 'lucide-react';

export default function BottomNav({ 
  activeTab, 
  onTabChange, 
  onSelectTab, 
  onOpenMatchmaker,
}) {
  const handleTab = (id, key) => {
    if (onTabChange) onTabChange(id);
    if (onSelectTab) onSelectTab(key);
  };

  const navItems = [
    { id: 0, key: 'explore', label: 'Explore', icon: Compass },
    { id: 1, key: 'readings', label: 'Readings', icon: MessageSquare, badge: 'LIVE' },
    { id: 'fab', isFab: true },
    { id: 2, key: 'kundli', label: 'Kundli', icon: Grid },
    { id: 3, key: 'reports', label: 'Reports', icon: BookOpen },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: '16px',
        left: 0,
        right: 0,
        maxWidth: '460px',
        margin: '0 auto',
        padding: '0 16px',
        zIndex: 50,
      }}
    >
      <div
        className="glass-panel"
        style={{
          borderRadius: '35px',
          height: '74px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '0 8px',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.12)',
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
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
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #D46A43 0%, #B84D28 100%)',
                  border: '3px solid #FFFFFF',
                  boxShadow: '0 6px 20px rgba(184, 77, 40, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transform: 'translateY(-6px)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(-6px) scale(1)')}
              >
                <Sparkles size={24} color="#FFFFFF" />
              </button>
            );
          }

          const isSelected = activeTab === item.id || activeTab === item.key;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleTab(item.id, item.key)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                padding: '6px 12px',
                borderRadius: '20px',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                outline: 'none',
              }}
            >
              <div
                style={{
                  padding: isSelected ? '6px' : '4px',
                  borderRadius: '50%',
                  backgroundColor: isSelected ? 'rgba(200, 90, 50, 0.12)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
              >
                <IconComponent
                  size={isSelected ? 22 : 20}
                  color={isSelected ? '#C85A32' : '#64748B'}
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
                      padding: '1px 4.5px',
                      borderRadius: '6px',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: isSelected ? '800' : '600',
                  color: isSelected ? '#C85A32' : '#64748B',
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
