import React, { useState } from 'react';
import { 
  Coins, 
  Plus, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  HelpCircle, 
  Sparkles, 
  ArrowUpRight, 
  Trash2,
  Lock,
  X
} from 'lucide-react';

export default function WalletScreen({ onClose }) {
  const [balance, setBalance] = useState(185);
  const [selectedPack, setSelectedPack] = useState(250);
  const [profiles, setProfiles] = useState([
    { id: 1, name: 'Mahi Sharma (Self)', rashi: 'Mithuna (Gemini)', relation: 'Primary' },
    { id: 2, name: 'Rohit Sharma (Spouse)', rashi: 'Tula (Libra)', relation: 'Spouse' },
    { id: 3, name: 'Sunita Sharma (Mother)', rashi: 'Karka (Cancer)', relation: 'Family' },
  ]);
  const [recharging, setRecharging] = useState(false);

  const rechargePacks = [
    { amount: 100, bonus: 20, total: 120, badge: null },
    { amount: 250, bonus: 65, total: 315, badge: 'MOST POPULAR' },
    { amount: 500, bonus: 150, total: 650, badge: 'BEST VALUE' },
    { amount: 1000, bonus: 350, total: 1350, badge: 'VIP SEEKER' },
  ];

  const handleRecharge = () => {
    const pack = rechargePacks.find(p => p.amount === selectedPack);
    if (!pack) return;
    setRecharging(true);
    setTimeout(() => {
      setBalance(prev => prev + pack.total);
      setRecharging(false);
      alert(`🎉 Successfully added ₹${pack.amount} (+₹${pack.bonus} Free Bonus) to your BHAVISHYAA wallet! Total credited: ₹${pack.total}`);
    }, 600);
  };

  const handleAddProfile = () => {
    const name = prompt('Enter Member Full Name:');
    if (!name) return;
    const relation = prompt('Enter Relation (e.g. Child, Father, Sibling):') || 'Family';
    setProfiles([...profiles, {
      id: Date.now(),
      name: `${name} (${relation})`,
      rashi: 'Calculated from Kundli',
      relation: relation
    }]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#1E1B4B', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header bar if inside modal */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Coins size={18} color="#D97706" />
          </div>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '900', color: '#1E1B4B', lineHeight: 1.2 }}>
              Cosmic Astral Wallet
            </h2>
            <p style={{ fontSize: '11px', color: '#64748B' }}>
              Instant credits for Live Gurus & Dossiers
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: '#F1F5F9',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Wallet Balance Hero Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.85) 0%, rgba(253, 230, 138, 0.6) 100%)',
          border: '1.5px solid rgba(245, 158, 11, 0.35)',
          borderRadius: '20px',
          padding: '18px 20px',
          boxShadow: '0 8px 24px rgba(217, 119, 6, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                color: '#92400E',
                backgroundColor: 'rgba(254, 243, 199, 0.9)',
                padding: '3px 10px',
                borderRadius: '999px',
                border: '1px solid #FCD34D',
                display: 'inline-block'
              }}
            >
              Cosmic Astral Balance
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
              <span style={{ fontSize: '36px', fontWeight: '900', color: '#78350F', lineHeight: 1 }}>
                ₹{balance}
              </span>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#B45309' }}>
                Available for Chats & Calls
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#78350F', marginTop: '4px', opacity: 0.9 }}>
              ✨ 1 Coin = ₹1 • No expiry • Valid across all verified Vedic Astrologers
            </p>
          </div>

          <button
            onClick={handleRecharge}
            disabled={recharging}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '13px',
              border: 'none',
              boxShadow: '0 4px 12px rgba(180, 83, 9, 0.3)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'transform 0.15s ease'
            }}
          >
            <Plus size={15} />
            {recharging ? 'Recharging...' : `Recharge ₹${selectedPack}`}
          </button>
        </div>
      </div>

      {/* Select Recharge Package Section */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1.5px solid #E2E8F0',
          borderRadius: '20px',
          padding: '18px',
          boxShadow: '0 4px 16px rgba(108, 74, 182, 0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#1E1B4B' }}>
              Select Recharge Package
            </h3>
            <p style={{ fontSize: '11px', color: '#64748B' }}>
              Includes complimentary bonus coins & priority queue
            </p>
          </div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '800',
              color: '#15803D',
              backgroundColor: '#DCFCE7',
              border: '1px solid #86EFAC',
              padding: '3px 10px',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            ⚡ Instant Credit
          </span>
        </div>

        {/* 2x2 Grid of Packages with Robust Inline Flex/Grid Styles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '12px'
          }}
        >
          {rechargePacks.map((pack) => {
            const isSelected = selectedPack === pack.amount;
            return (
              <div
                key={pack.amount}
                onClick={() => setSelectedPack(pack.amount)}
                style={{
                  position: 'relative',
                  padding: '16px 12px 12px',
                  borderRadius: '16px',
                  border: isSelected ? '2px solid #D97706' : '1.5px solid #E2E8F0',
                  backgroundColor: isSelected ? '#FFFBEB' : '#FFFFFF',
                  boxShadow: isSelected ? '0 4px 14px rgba(217, 119, 6, 0.15)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                {pack.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                      color: '#FFFFFF',
                      fontSize: '9px',
                      fontWeight: '900',
                      letterSpacing: '0.5px',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 2px 6px rgba(180, 83, 9, 0.25)'
                    }}
                  >
                    {pack.badge}
                  </span>
                )}

                <div>
                  <div style={{ fontSize: '20px', fontWeight: '900', color: '#1E1B4B' }}>
                    ₹{pack.amount}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#15803D', marginTop: '2px' }}>
                    +₹{pack.bonus} Bonus
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '10px',
                    paddingTop: '8px',
                    borderTop: isSelected ? '1px solid #FCD34D' : '1px solid #F1F5F9',
                    fontSize: '12px',
                    fontWeight: '900',
                    color: isSelected ? '#92400E' : '#475569'
                  }}
                >
                  Get ₹{pack.total}
                </div>
              </div>
            );
          })}
        </div>

        {/* Security / Trust reassurance badge */}
        <div
          style={{
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
            fontSize: '11px',
            color: '#64748B'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ShieldCheck size={14} color="#16A34A" />
            <span>256-bit Bank Grade Encryption • UPI, Cards & NetBanking</span>
          </div>
          <span style={{ color: '#94A3B8' }}>100% Refund Guarantee</span>
        </div>
      </div>

      {/* Saved Family Kundli Profiles */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1.5px solid #E2E8F0',
          borderRadius: '20px',
          padding: '18px',
          boxShadow: '0 4px 16px rgba(108, 74, 182, 0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'space-between', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={16} color="#D97706" />
              Saved Family Kundli Profiles
            </h3>
            <p style={{ fontSize: '11px', color: '#64748B' }}>
              Quickly consult for loved ones without re-entering birth coordinates
            </p>
          </div>
          <button
            onClick={handleAddProfile}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: '10px',
              backgroundColor: '#FEF3C7',
              border: '1px solid #FCD34D',
              color: '#92400E',
              fontSize: '11px',
              fontWeight: '800',
              cursor: 'pointer'
            }}
          >
            <Plus size={13} /> Add
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {profiles.map((p) => (
            <div
              key={p.id}
              style={{
                padding: '10px 14px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#FEF3C7',
                    border: '1px solid #FCD34D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#B45309',
                    fontSize: '12px',
                    fontWeight: '900'
                  }}
                >
                  {p.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>{p.name}</h4>
                  <p style={{ fontSize: '11px', color: '#64748B' }}>Moon Sign: {p.rashi}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '800',
                    color: '#64748B',
                    backgroundColor: '#E2E8F0',
                    padding: '2px 8px',
                    borderRadius: '999px'
                  }}
                >
                  {p.relation}
                </span>
                {p.id !== 1 && (
                  <button
                    onClick={() => setProfiles(profiles.filter(x => x.id !== p.id))}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                    title="Remove member"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
