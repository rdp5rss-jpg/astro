import React, { useState } from 'react';
import { 
  BarChart3, 
  ShieldCheck, 
  Users, 
  Settings, 
  ArrowLeft,
  Sparkles,
  Phone,
  Building,
  DollarSign
} from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminConsultations from './AdminConsultations';
import AdminAstrologers from './AdminAstrologers';
import AdminPayouts from './AdminPayouts';
import AdminUsers from './AdminUsers';
import AdminSettings from './AdminSettings';

export default function AdminPanel({ onExitToUserApp }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'sessions' | 'astrologers' | 'payouts' | 'users' | 'settings'

  const tabs = [
    { id: 'overview', label: 'Metrics', icon: BarChart3 },
    { id: 'sessions', label: 'Sessions', icon: Phone, badge: 'Live 3' },
    { id: 'astrologers', label: 'Gurus', icon: ShieldCheck },
    { id: 'payouts', label: 'Payouts', icon: Building, badge: '2' },
    { id: 'users', label: 'Seekers', icon: Users },
    { id: 'settings', label: 'Config', icon: Settings },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        color: '#1E1B4B',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Admin Top Sticky Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}
      >
        <div
          style={{
            maxWidth: '520px',
            margin: '0 auto',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Platform Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                fontSize: '16px',
                boxShadow: '0 2px 8px rgba(30, 27, 75, 0.25)',
              }}
            >
              ⚡
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '900', color: '#1E1B4B', letterSpacing: '-0.3px', margin: 0 }}>
                  BHAVISHYAA HQ
                </h2>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: '900',
                    backgroundColor: '#1E1B4B',
                    color: '#FFFFFF',
                    padding: '2px 5px',
                    borderRadius: '4px',
                    letterSpacing: '0.5px',
                  }}
                >
                  ADMIN
                </span>
              </div>
              <p style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', margin: 0 }}>
                Enterprise Platform Console
              </p>
            </div>
          </div>

          {/* Platform Status Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: '999px',
                backgroundColor: '#DCFCE7',
                border: '1px solid #86EFAC',
                color: '#15803D',
                fontSize: '11px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16A34A', display: 'inline-block' }} />
              Live HQ
            </span>
          </div>
        </div>

        {/* Horizontal Scrolling Pill Sub-Navigation */}
        <div
          style={{
            maxWidth: '520px',
            margin: '0 auto',
            padding: '0 12px 10px',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
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
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: '12px',
                  border: isSelected ? '1.5px solid #1E1B4B' : '1.5px solid #E2E8F0',
                  backgroundColor: isSelected ? '#1E1B4B' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#64748B',
                  fontSize: '12px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                }}
              >
                <Icon size={14} color={isSelected ? '#FFFFFF' : '#64748B'} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: '900',
                      padding: '1px 5px',
                      borderRadius: '999px',
                      backgroundColor: isSelected ? '#C85A32' : tab.badge.startsWith('Live') ? '#DCFCE7' : '#FEF3C7',
                      color: isSelected ? '#FFFFFF' : tab.badge.startsWith('Live') ? '#15803D' : '#92400E',
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Viewport */}
      <main style={{ maxWidth: '520px', margin: '0 auto', padding: '16px 16px 20px' }}>
        {activeTab === 'overview' && (
          <AdminDashboard onNavigateTab={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'sessions' && (
          <AdminConsultations />
        )}

        {activeTab === 'astrologers' && (
          <AdminAstrologers />
        )}

        {activeTab === 'payouts' && (
          <AdminPayouts />
        )}

        {activeTab === 'users' && (
          <AdminUsers />
        )}

        {activeTab === 'settings' && (
          <AdminSettings />
        )}
      </main>

      {/* Bottom Floating Navigation Dock */}
      <nav
        style={{
          position: 'fixed',
          bottom: '12px',
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
            borderRadius: '28px',
            height: '62px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '0 8px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
            backgroundColor: '#FFFFFF',
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
                  gap: '2px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isSelected ? '#C85A32' : '#94A3B8',
                  padding: '6px 8px',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                }}
              >
                <Icon size={18} color={isSelected ? '#C85A32' : '#94A3B8'} strokeWidth={isSelected ? 2.5 : 2} />
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: isSelected ? '900' : '600',
                  }}
                >
                  {tab.label}
                </span>
                {isSelected && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#C85A32',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
