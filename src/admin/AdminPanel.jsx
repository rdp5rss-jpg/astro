import React, { useState } from 'react';
import { 
  BarChart3, 
  ShieldCheck, 
  Users, 
  Settings, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import AdminAstrologers from './AdminAstrologers';
import AdminUsers from './AdminUsers';
import AdminSettings from './AdminSettings';

export default function AdminPanel({ onExitToUserApp }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'astrologers' | 'users' | 'settings'

  const tabs = [
    { id: 'overview', label: 'Metrics', icon: BarChart3 },
    { id: 'astrologers', label: 'Gurus', icon: ShieldCheck },
    { id: 'users', label: 'Seekers', icon: Users },
    { id: 'settings', label: 'Config', icon: Settings },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        background: 'radial-gradient(circle at 10% 10%, rgba(254, 243, 199, 0.45) 0%, transparent 40%), radial-gradient(circle at 90% 15%, rgba(219, 234, 254, 0.35) 0%, transparent 45%), #F8FAFC',
        color: '#1E1B4B',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Admin Top Header */}
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
          {/* Platform Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                fontSize: '15px',
                boxShadow: '0 2px 8px rgba(30, 27, 75, 0.25)',
              }}
            >
              ⚡
            </div>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '900', color: '#1E1B4B', lineHeight: 1.1 }}>
                BHAVISHYAA HQ
              </h2>
              <p style={{ fontSize: '10px', color: '#64748B', fontWeight: '700' }}>
                Platform Admin Console
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
              backgroundColor: '#F1F5F9',
              border: '1px solid #CBD5E1',
              color: '#334155',
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

      {/* Main Content Area */}
      <main style={{ maxWidth: '520px', margin: '0 auto', padding: '16px 16px 0' }}>
        {activeTab === 'overview' && (
          <AdminDashboard onNavigateTab={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'astrologers' && (
          <AdminAstrologers />
        )}

        {activeTab === 'users' && (
          <AdminUsers />
        )}

        {activeTab === 'settings' && (
          <AdminSettings />
        )}
      </main>

      {/* Bottom Admin Navigation Bar */}
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
                  color: isSelected ? '#1E1B4B' : '#94A3B8',
                  padding: '6px 14px',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={20} color={isSelected ? '#1E1B4B' : '#94A3B8'} strokeWidth={isSelected ? 2.5 : 2} />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: isSelected ? '800' : '600',
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
