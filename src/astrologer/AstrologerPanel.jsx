import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  CreditCard, 
  User, 
  Sparkles, 
  LogOut,
  Bell,
  ArrowLeft
} from 'lucide-react';
import { astrologers } from '../data/astrologers';
import AstrologerDashboard from './AstrologerDashboard';
import AstrologerChatView from './AstrologerChatView';
import AstrologerEarnings from './AstrologerEarnings';
import AstrologerProfile from './AstrologerProfile';

export default function AstrologerPanel({ onExitToUserApp }) {
  const [currentAstro, setCurrentAstro] = useState(astrologers[0]); // Acharya Rudranand Shastri
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'consultations' | 'earnings' | 'profile'
  const [isOnline, setIsOnline] = useState(true);
  const [activeConsultation, setActiveConsultation] = useState(null);

  const tabs = [
    { id: 'dashboard', label: 'Console', icon: LayoutDashboard },
    { id: 'consultations', label: 'Consult', icon: MessageSquare, badge: 2 },
    { id: 'earnings', label: 'Earnings', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        background: 'radial-gradient(circle at 10% 10%, rgba(254, 243, 199, 0.45) 0%, transparent 40%), radial-gradient(circle at 90% 15%, rgba(253, 230, 138, 0.3) 0%, transparent 45%), #F8FAFC',
        color: '#1E1B4B',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Top Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid #E2E8F0',
          padding: '12px 16px',
        }}
      >
        <div
          style={{
            maxWidth: '520px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Guru Identity + Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={currentAstro.avatar}
                alt={currentAstro.name}
                style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FCD34D' }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '-1px',
                  right: '-1px',
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  backgroundColor: isOnline ? '#10B981' : '#94A3B8',
                  border: '2px solid #FFFFFF',
                }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '900', color: '#1E1B4B', lineHeight: 1.2 }}>
                  {currentAstro.name}
                </h2>
              </div>
              <p style={{ fontSize: '11px', color: '#64748B' }}>
                Guru Portal • {isOnline ? '🟢 Live' : '⚪ Offline'}
              </p>
            </div>
          </div>

          {/* Quick Exit to User App button */}
          <button
            onClick={onExitToUserApp}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 12px',
              borderRadius: '999px',
              backgroundColor: '#FFF7ED',
              border: '1px solid #FDBA74',
              color: '#C85A32',
              fontSize: '11px',
              fontWeight: '800',
              cursor: 'pointer',
            }}
          >
            <span>Seeker App</span>
            <ArrowLeft size={13} style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '520px', margin: '0 auto', padding: '16px 16px 0' }}>
        {activeTab === 'dashboard' && (
          <AstrologerDashboard
            astrologer={currentAstro}
            isOnline={isOnline}
            onToggleOnline={() => setIsOnline(prev => !prev)}
            onOpenConsultation={(req) => setActiveConsultation(req)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'consultations' && (
          <AstrologerDashboard
            astrologer={currentAstro}
            isOnline={isOnline}
            onToggleOnline={() => setIsOnline(prev => !prev)}
            onOpenConsultation={(req) => setActiveConsultation(req)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'earnings' && (
          <AstrologerEarnings astrologer={currentAstro} />
        )}

        {activeTab === 'profile' && (
          <AstrologerProfile
            astrologer={currentAstro}
            onUpdateAstrologer={(updated) => setCurrentAstro(updated)}
          />
        )}
      </main>

      {/* Live Active Consultation Overlay */}
      {activeConsultation && (
        <AstrologerChatView
          consultation={activeConsultation}
          onClose={() => setActiveConsultation(null)}
          astrologerRate={currentAstro.ratePerMin || 35}
        />
      )}

      {/* Bottom Astrologer Portal Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          bottom: '14px',
          left: 0,
          right: 0,
          maxWidth: '480px',
          margin: '0 auto',
          padding: '0 16px',
          zIndex: 50,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            borderRadius: '36px',
            height: '66px',
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
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '3px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isSelected ? '#C85A32' : '#94A3B8',
                  padding: '6px 14px',
                  position: 'relative',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={20} color={isSelected ? '#C85A32' : '#94A3B8'} strokeWidth={isSelected ? 2.5 : 2} />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: isSelected ? '800' : '600',
                  }}
                >
                  {tab.label}
                </span>

                {tab.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '10px',
                      backgroundColor: '#EF4444',
                      color: '#FFFFFF',
                      fontSize: '9px',
                      fontWeight: '900',
                      borderRadius: '999px',
                      padding: '1px 5px',
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
