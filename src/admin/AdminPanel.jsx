import React, { useState } from 'react';
import { 
  BarChart3, 
  ShieldCheck, 
  Users, 
  Settings, 
  Phone, 
  Building
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

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        color: '#0F172A',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Clean & Light Top Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #E2E8F0',
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
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                backgroundColor: '#C85A32',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '14px',
              }}
            >
              🕉️
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h1 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: 0, letterSpacing: '-0.2px' }}>
                  BHAVISHYAA HQ
                </h1>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    backgroundColor: '#F1F5F9',
                    color: '#475569',
                    padding: '1px 6px',
                    borderRadius: '4px',
                  }}
                >
                  Admin
                </span>
              </div>
              <p style={{ fontSize: '11px', color: '#64748B', margin: 0, fontWeight: '400' }}>
                {currentTab?.label || 'Console'} Management
              </p>
            </div>
          </div>

          {/* Simple Light Status Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 9px', borderRadius: '999px', backgroundColor: '#F0FDF4', border: '1px solid #DCFCE7' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16A34A', display: 'inline-block' }} />
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#15803D' }}>Live HQ</span>
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main style={{ maxWidth: '520px', margin: '0 auto', padding: '16px 16px 90px' }}>
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

      {/* Light & Clean Bottom Navigation Dock */}
      <nav
        style={{
          position: 'fixed',
          bottom: '12px',
          left: 0,
          right: 0,
          maxWidth: '460px',
          margin: '0 auto',
          padding: '0 16px',
          zIndex: 50,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            borderRadius: '24px',
            height: '58px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '0 6px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.07)',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
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
                  color: isSelected ? '#C85A32' : '#64748B',
                  padding: '6px 8px',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <Icon size={18} color={isSelected ? '#C85A32' : '#64748B'} strokeWidth={isSelected ? 2.2 : 1.7} />
                  {tab.badge && !isSelected && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-3px',
                        right: '-5px',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: tab.id === 'sessions' ? '#16A34A' : '#D97706',
                      }}
                    />
                  )}
                </div>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: isSelected ? '700' : '500',
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
