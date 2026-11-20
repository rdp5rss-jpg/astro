import React from 'react';
import { Wallet, Bell, Sparkles, SlidersHorizontal, LogIn } from 'lucide-react';

export default function Header({
  walletBalance = 185,
  onOpenWallet,
  onOpenNotifications,
  onOpenProfile,
  onGoToSplash,
  onGoToLogin,
  onGoToWelcome,
  onGoToOnboarding,
}) {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(226, 232, 240, 0.8)' }}>
      {/* Floating Header Bar matching WhatsApp Image 2026-11-19 at 4.39.13 PM (1).jpeg */}
      <div
        style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '520px',
          margin: '0 auto',
        }}
      >
        {/* Logo & Emblem: Sun Icon + BHAVISHYAA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg 
            width="32" 
            height="22" 
            viewBox="0 0 130 80" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 70 C 20 28, 110 28, 110 70 Z" fill="#D97706" />
            <circle cx="65" cy="62" r="16" fill="#FFFFFF" />
            <circle cx="22" cy="46" r="4.5" fill="#D97706" />
            <circle cx="42" cy="22" r="5" fill="#D97706" />
            <circle cx="65" cy="10" r="5.5" fill="#D97706" />
            <circle cx="88" cy="22" r="5" fill="#D97706" />
            <circle cx="108" cy="46" r="4.5" fill="#D97706" />
            <path d="M42 35 L 65 14 L 88 35 Z" fill="#D97706" />
          </svg>

          <div>
            <div
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '18px',
                fontWeight: '900',
                letterSpacing: '1.5px',
                color: '#1E1B4B',
                lineHeight: 1,
              }}
            >
              BHAVISHYAA
            </div>
          </div>
        </div>

        {/* Right Actions matching screenshot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Wallet Chip: ₹185 */}
          <button
            onClick={onOpenWallet}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '25px',
              backgroundColor: '#FEF3C7',
              border: '1px solid #FCD34D',
              boxShadow: '0 2px 6px rgba(217, 119, 6, 0.1)',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: '900', color: '#92400E' }}>
              ₹{walletBalance}
            </span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <Bell size={18} color="#1E1B4B" />
            <span
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#EF4444',
              }}
            />
          </button>

          {/* Profile Circle */}
          <button
            onClick={onOpenProfile}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#C85A32',
              border: '2px solid #FFFFFF',
              boxShadow: '0 2px 8px rgba(200, 90, 50, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px',
              fontWeight: '800',
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            M
          </button>
        </div>
      </div>
    </header>
  );
}
