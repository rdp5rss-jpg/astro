import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  CreditCard, 
  User, 
  Sparkles, 
  LogOut,
  Bell,
  Phone,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { astrologers } from '../data/astrologers';
import AstrologerAuth from './AstrologerAuth';
import AstrologerDashboard from './AstrologerDashboard';
import AstrologerConsultations from './AstrologerConsultations';
import AstrologerChatView from './AstrologerChatView';
import AstrologerEarnings from './AstrologerEarnings';
import AstrologerProfile from './AstrologerProfile';
import CallScreen from '../screens/CallScreen';

export default function AstrologerPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentAstro, setCurrentAstro] = useState(astrologers[0]); // Acharya Rudranand Shastri
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'consultations' | 'earnings' | 'profile'
  const [isOnline, setIsOnline] = useState(true);
  const [activeConsultation, setActiveConsultation] = useState(null);
  const [activeCallSession, setActiveCallSession] = useState(null);

  // If Astrologer is not logged in, show Register & Login Page
  if (!isAuthenticated) {
    return (
      <AstrologerAuth
        onLoginSuccess={(astro) => {
          setCurrentAstro(astro);
          setIsAuthenticated(true);
        }}
      />
    );
  }

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
      {/* Top Header - Strictly Astrologer Only (No Seeker Button) */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: '#FFFFFF',
          borderBottom: '1.5px solid #E2E8F0',
          padding: '12px 16px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
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
          {/* Guru Identity + Status Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={currentAstro.avatar}
                alt={currentAstro.name}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #FCD34D',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '-1px',
                  right: '-1px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: isOnline ? '#10B981' : '#94A3B8',
                  border: '2px solid #FFFFFF',
                }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '900', color: '#1E1B4B', lineHeight: 1.2 }}>
                  {currentAstro.name}
                </h2>
                <CheckCircle2 size={14} color="#10B981" />
              </div>
              <p style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
                Verified Astrologer Portal
              </p>
            </div>
          </div>

          {/* Right Header Actions: Online Toggle & Logout Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Online / Offline status badge button */}
            <button
              onClick={() => setIsOnline(prev => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '999px',
                backgroundColor: isOnline ? '#DCFCE7' : '#F1F5F9',
                border: isOnline ? '1.5px solid #86EFAC' : '1.5px solid #CBD5E1',
                color: isOnline ? '#15803D' : '#64748B',
                fontSize: '11.5px',
                fontWeight: '900',
                cursor: 'pointer',
              }}
              title="Toggle Live Availability"
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: isOnline ? '#10B981' : '#94A3B8' }} />
              <span>{isOnline ? 'Online' : 'Offline'}</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={() => setIsAuthenticated(false)}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              title="Sign Out of Guru Console"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '520px', margin: '0 auto', padding: '16px 16px 0' }}>
        {/* Tab 1: Dashboard Console */}
        {activeTab === 'dashboard' && (
          <AstrologerDashboard
            astrologer={currentAstro}
            isOnline={isOnline}
            onToggleOnline={() => setIsOnline(prev => !prev)}
            onOpenConsultation={(req) => setActiveConsultation(req)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* Tab 2: Approved Consultations Hub */}
        {activeTab === 'consultations' && (
          <AstrologerConsultations
            onOpenChatSession={(item) => setActiveConsultation(item)}
            onOpenCallSession={(item) => setActiveCallSession(item)}
          />
        )}

        {/* Tab 3: Earnings & Bank Withdrawal */}
        {activeTab === 'earnings' && (
          <AstrologerEarnings astrologer={currentAstro} />
        )}

        {/* Tab 4: Profile & Rates Settings */}
        {activeTab === 'profile' && (
          <AstrologerProfile
            astrologer={currentAstro}
            onUpdateAstrologer={(updated) => setCurrentAstro(updated)}
          />
        )}
      </main>

      {/* Live Active Chat Consultation Workspace */}
      {activeConsultation && (
        <AstrologerChatView
          consultation={activeConsultation}
          onClose={() => setActiveConsultation(null)}
          astrologerRate={currentAstro.ratePerMin || 35}
        />
      )}

      {/* Live Active Voice Call Consultation Workspace */}
      {activeCallSession && (
        <CallScreen
          astrologer={{
            name: activeCallSession.seekerName,
            avatar: activeCallSession.avatar,
            title: `Seeker Consultation • ${activeCallSession.rashi || 'Kundli Milan'}`,
            ratePerMin: activeCallSession.rate || 35,
          }}
          onEndCall={() => setActiveCallSession(null)}
          onSwitchToChat={() => {
            const s = activeCallSession;
            setActiveCallSession(null);
            setActiveConsultation(s);
          }}
          walletBalance={24850}
        />
      )}

      {/* Bottom Astrologer Navigation Bar */}
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
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            border: '1.5px solid #E2E8F0',
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
