import React, { useState } from 'react';
import { 
  Settings, 
  Flame, 
  Percent, 
  Coins, 
  Save, 
  CheckCircle, 
  Sliders, 
  Bell,
  Sparkles,
  Send,
  ShieldCheck,
  Building,
  RefreshCw
} from 'lucide-react';

export default function AdminSettings() {
  const [offerActive, setOfferActive] = useState(true);
  const [offerDiscount, setOfferDiscount] = useState(50);
  const [offerTitle, setOfferTitle] = useState('FESTIVE MAHA OFFER');
  const [platformCommission, setPlatformCommission] = useState(20);
  const [minPayoutAmount, setMinPayoutAmount] = useState(500);

  const [packages, setPackages] = useState([
    { amount: 100, bonus: 20 },
    { amount: 250, bonus: 65 },
    { amount: 500, bonus: 150 },
    { amount: 1000, bonus: 350 },
  ]);

  // Broadcast Notification State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastBody) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastTitle('');
      setBroadcastBody('');
      alert('📢 Push notification dispatched to all registered seekers successfully!');
    }, 1500);
  };

  const handleBonusChange = (index, newBonus) => {
    setPackages(prev => {
      const copy = [...prev];
      copy[index].bonus = Number(newBonus);
      return copy;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {saved && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '16px',
            backgroundColor: '#DCFCE7',
            border: '1px solid #86EFAC',
            color: '#15803D',
            fontSize: '13px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle size={16} />
          <span>Platform parameters updated successfully across BHAVISHYAA HQ!</span>
        </div>
      )}

      {/* Main Parameters Form */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Commission & Minimum Payout Card */}
        <div
          style={{
            borderRadius: '20px',
            padding: '18px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            <Percent size={16} color="#C85A32" />
            <span>Revenue Split & Payout Rules</span>
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                HQ Commission Share (%)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1.5px solid #CBD5E1', padding: '0 12px' }}>
                <input
                  type="number"
                  min={5}
                  max={50}
                  value={platformCommission}
                  onChange={(e) => setPlatformCommission(Number(e.target.value))}
                  style={{ border: 'none', background: 'transparent', padding: '10px 0', fontSize: '15px', fontWeight: '800', width: '100%', outline: 'none' }}
                />
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#64748B' }}>%</span>
              </div>
              <span style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px', display: 'block' }}>
                Guru receives {100 - platformCommission}%
              </span>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Min Payout Threshold (₹)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1.5px solid #CBD5E1', padding: '0 12px' }}>
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#64748B' }}>₹</span>
                <input
                  type="number"
                  min={100}
                  step={50}
                  value={minPayoutAmount}
                  onChange={(e) => setMinPayoutAmount(Number(e.target.value))}
                  style={{ border: 'none', background: 'transparent', padding: '10px 6px', fontSize: '15px', fontWeight: '800', width: '100%', outline: 'none' }}
                />
              </div>
              <span style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px', display: 'block' }}>
                Minimum withdrawal allowed
              </span>
            </div>
          </div>
        </div>

        {/* Festive Maha Offer Banner Settings */}
        <div
          style={{
            borderRadius: '20px',
            padding: '18px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Flame size={16} color="#C85A32" />
              <span>Festive Maha Offer Banner Controller</span>
            </h4>

            <button
              type="button"
              onClick={() => setOfferActive(prev => !prev)}
              style={{
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: '800',
                backgroundColor: offerActive ? '#DCFCE7' : '#F1F5F9',
                border: offerActive ? '1px solid #86EFAC' : '1px solid #CBD5E1',
                color: offerActive ? '#15803D' : '#64748B',
                cursor: 'pointer',
              }}
            >
              {offerActive ? '🟢 Live on App' : '⚪ Paused'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Banner Promotional Headline
              </label>
              <input
                type="text"
                value={offerTitle}
                onChange={(e) => setOfferTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1.5px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#1E1B4B',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', color: '#475569', display: 'block', marginBottom: '4px' }}>
                Discount (%)
              </label>
              <input
                type="number"
                value={offerDiscount}
                onChange={(e) => setOfferDiscount(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1.5px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  fontSize: '13px',
                  fontWeight: '800',
                  color: '#C85A32',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Recharge Wallet Bonus Slabs */}
        <div
          style={{
            borderRadius: '20px',
            padding: '18px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            <Coins size={16} color="#D97706" />
            <span>Wallet Recharge Bonus Slabs</span>
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {packages.map((pkg, idx) => (
              <div
                key={pkg.amount}
                style={{
                  padding: '10px 12px',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>
                  Recharge: ₹{pkg.amount}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>Bonus: +₹</span>
                  <input
                    type="number"
                    value={pkg.bonus}
                    onChange={(e) => handleBonusChange(idx, e.target.value)}
                    style={{
                      width: '60px',
                      padding: '4px 6px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '12px',
                      fontWeight: '800',
                      color: '#15803D',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          style={{
            padding: '14px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '900',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(30, 27, 75, 0.25)',
          }}
        >
          <Save size={16} />
          <span>Save Platform Settings</span>
        </button>
      </form>

      {/* Broadcast Push Notifications */}
      <div
        style={{
          borderRadius: '20px',
          padding: '18px',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        }}
      >
        <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Bell size={16} color="#2563EB" />
          <span>Broadcast Push Notification to All Seekers</span>
        </h4>
        <p style={{ fontSize: '11px', color: '#64748B', marginBottom: '12px' }}>
          Sends immediate notification to all active mobile seekers across India
        </p>

        <form onSubmit={handleBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            required
            value={broadcastTitle}
            onChange={(e) => setBroadcastTitle(e.target.value)}
            placeholder="Notification Title (e.g. Shubh Muhurat Active!)"
            style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '13px', fontWeight: '700' }}
          />

          <textarea
            required
            rows={2}
            value={broadcastBody}
            onChange={(e) => setBroadcastBody(e.target.value)}
            placeholder="Notification Message (e.g. Consult Top Acharyas with 50% discount for the next 2 hours)..."
            style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1.5px solid #CBD5E1', fontSize: '12px', fontWeight: '600', resize: 'none' }}
          />

          <button
            type="submit"
            disabled={broadcastSent}
            style={{
              padding: '12px',
              borderRadius: '14px',
              backgroundColor: '#2563EB',
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '800',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <Send size={15} />
            <span>{broadcastSent ? 'Dispatched!' : 'Broadcast to All Seekers'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
