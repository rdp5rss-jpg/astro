import React from 'react';
import { Wallet, Bell } from 'lucide-react';

export default function Header({
  walletBalance = 185,
  onOpenWallet,
  onOpenNotifications,
  onOpenProfile,
}) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.78)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.85)',
        boxShadow: '0 4px 24px -2px rgba(108, 74, 182, 0.07), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
      }}
    >
      <div
        style={{
          padding: '10px clamp(12px, 3.5vw, 18px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '520px',
          margin: '0 auto',
          gap: '8px',
        }}
      >
        {/* Brand & Sun Emblem */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(6px, 1.8vw, 10px)',
            minWidth: 0,
            flexShrink: 1,
          }}
        >
          <svg
            style={{
              width: 'clamp(26px, 6vw, 32px)',
              height: 'auto',
              flexShrink: 0,
              filter: 'drop-shadow(0 2px 4px rgba(217, 119, 6, 0.2))',
            }}
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

          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span
              style={{
                display: 'block',
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(14px, 4.2vw, 18px)',
                fontWeight: '900',
                letterSpacing: 'clamp(0.6px, 0.3vw, 1.5px)',
                color: '#1E1B4B',
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              BHAVISHYAA
            </span>
          </div>
        </div>

        {/* Right Actions: Wallet + Bell + Profile */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(6px, 1.8vw, 10px)',
            flexShrink: 0,
          }}
        >
          {/* Frosted Amber Glass Wallet Chip */}
          <button
            onClick={onOpenWallet}
            aria-label="Open Wallet"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(4px, 1vw, 6px)',
              padding: 'clamp(5px, 1.3vw, 7px) clamp(8px, 2.2vw, 13px)',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.88) 0%, rgba(253, 230, 138, 0.72) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 2px 8px rgba(217, 119, 6, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(217, 119, 6, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(217, 119, 6, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.7)';
            }}
          >
            <Wallet size={13} color="#B45309" strokeWidth={2.4} style={{ flexShrink: 0 }} />
            <span
              style={{
                fontSize: 'clamp(11px, 2.7vw, 13px)',
                fontWeight: '900',
                color: '#92400E',
                letterSpacing: '0.2px',
                whiteSpace: 'nowrap',
              }}
            >
              ₹{walletBalance}
            </span>
          </button>

          {/* Frosted Glass Notification Bell */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            style={{
              width: 'clamp(34px, 8.5vw, 38px)',
              height: 'clamp(34px, 8.5vw, 38px)',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(248, 250, 252, 0.75) 100%)',
              border: '1.2px solid rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 2px 10px rgba(30, 27, 75, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <Bell size={17} color="#1E1B4B" strokeWidth={2} />
            <span
              style={{
                position: 'absolute',
                top: '7px',
                right: '7px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#EF4444',
                border: '1.5px solid #FFFFFF',
                boxShadow: '0 0 6px rgba(239, 68, 68, 0.6)',
              }}
            />
          </button>

          {/* Frosted Glass Ring Profile Circle */}
          <button
            onClick={onOpenProfile}
            aria-label="Profile"
            style={{
              width: 'clamp(34px, 8.5vw, 38px)',
              height: 'clamp(34px, 8.5vw, 38px)',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #E06D3F 0%, #C85A32 100%)',
              border: '2px solid rgba(255, 255, 255, 0.95)',
              boxShadow: '0 3px 12px rgba(200, 90, 50, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(13px, 3.2vw, 15px)',
              fontWeight: '800',
              color: '#FFFFFF',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            M
          </button>
        </div>
      </div>
    </header>
  );
}
