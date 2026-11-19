import React from 'react';
import { Sparkles, Wallet, Bell, SlidersHorizontal } from 'lucide-react';

export default function Header({
  walletBalance,
  onOpenWallet,
  onOpenNotifications,
  onOpenProfile,
  onToggleOnboarding,
  onStartOnboarding,
}) {
  return (
    <header style={{ padding: '10px 16px 6px', position: 'sticky', top: 0, zIndex: 40 }}>
      {/* Floating Glass Header Bar */}
      <div
        className="glass-panel"
        style={{
          borderRadius: '24px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo & Emblem */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #8D72E1 0%, #6C4AB6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(108, 74, 182, 0.35)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'rgba(229, 148, 0, 0.25)',
              }}
            />
            <Sparkles size={22} color="#FFFFFF" />
          </div>

          <div>
            <div
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '18px',
                fontWeight: '800',
                letterSpacing: '1.8px',
                color: '#1E1B4B',
                lineHeight: '1.1',
              }}
            >
              BHAVISHYAA
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#E59400',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontSize: '8.5px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  color: '#C77700',
                }}
              >
                VEDIC DESTINY & JYOTISH
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions: Wallet, Notification, Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Wallet Chip */}
          <button
            onClick={onOpenWallet}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 10px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #FFF9EE 0%, #FFECC4 100%)',
              border: '1px solid rgba(229, 148, 0, 0.4)',
              boxShadow: '0 2px 8px rgba(229, 148, 0, 0.15)',
              cursor: 'pointer',
            }}
          >
            <Wallet size={15} color="#C77700" />
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#8C4C00' }}>
              ₹{walletBalance}
            </span>
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#C77700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 'bold',
                lineHeight: 1,
              }}
            >
              +
            </div>
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <Bell size={19} color="#1E1B4B" />
            <span
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#F43F5E',
              }}
            />
          </button>

          {/* Profile Avatar */}
          <button
            onClick={onOpenProfile}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #EADBFF 0%, #C7B8EA 100%)',
              border: '2px solid #FFFFFF',
              boxShadow: '0 2px 8px rgba(108, 74, 182, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px',
              fontWeight: '800',
              color: '#6C4AB6',
              cursor: 'pointer',
            }}
          >
            M
          </button>
        </div>
      </div>

      {/* Mode Switcher Pill Banner */}
      <div
        style={{
          marginTop: '6px',
          padding: '6px 14px',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              display: 'inline-block',
            }}
          />
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#6C4AB6' }}>
            BHAVISHYAA Premium Suite
          </span>
        </div>

        <button
          onClick={onToggleOnboarding || onStartOnboarding}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '12px',
            backgroundColor: '#F3E8FF',
            border: '1px solid #D8B4FE',
            color: '#6C4AB6',
            fontSize: '11.5px',
            fontWeight: '800',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#6C4AB6';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#F3E8FF';
            e.currentTarget.style.color = '#6C4AB6';
          }}
        >
          <SlidersHorizontal size={13} />
          View 9-Step Onboarding Flow
        </button>
      </div>
    </header>
  );
}
