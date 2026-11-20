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
  Sparkles
} from 'lucide-react';

export default function AdminSettings() {
  const [offerActive, setOfferActive] = useState(true);
  const [offerDiscount, setOfferDiscount] = useState(50);
  const [offerTitle, setOfferTitle] = useState('FESTIVE MAHA OFFER');
  const [platformCommission, setPlatformCommission] = useState(20);
  const [packages, setPackages] = useState([
    { amount: 100, bonus: 20 },
    { amount: 250, bonus: 65 },
    { amount: 500, bonus: 150 },
    { amount: 1000, bonus: 350 },
  ]);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
          <span>Platform parameters updated successfully across BHAVISHYAA!</span>
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Festive Maha Offer Banner Settings */}
        <div
          className="glass-card"
          style={{
            borderRadius: '20px',
            padding: '18px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1.5px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                color: offerActive ? '#15803D' : '#64748B',
                border: offerActive ? '1px solid #86EFAC' : '1px solid #CBD5E1',
                cursor: 'pointer',
              }}
            >
              {offerActive ? '● Active Live' : '○ Disabled'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '4px' }}>
                Banner Header Text
              </label>
              <input
                type="text"
                value={offerTitle}
                onChange={(e) => setOfferTitle(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '4px' }}>
                  Discount Percentage (%)
                </label>
                <input
                  type="number"
                  value={offerDiscount}
                  onChange={(e) => setOfferDiscount(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '4px' }}>
                  Platform Commission (%)
                </label>
                <input
                  type="number"
                  value={platformCommission}
                  onChange={(e) => setPlatformCommission(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recharge Packages Bonuses */}
        <div
          className="glass-card"
          style={{
            borderRadius: '20px',
            padding: '18px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1.5px solid #E2E8F0',
          }}
        >
          <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1E1B4B', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Coins size={16} color="#D97706" />
            <span>Seeker Wallet Recharge Packages</span>
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  fontSize: '13px',
                }}
              >
                <div>
                  <strong>₹{pkg.amount}</strong> Package
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>Bonus Coins:</span>
                  <span style={{ fontWeight: '800', color: '#15803D' }}>+₹{pkg.bonus}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Platform Settings Button */}
        <button
          type="submit"
          style={{
            padding: '14px',
            borderRadius: '16px',
            backgroundColor: '#C85A32',
            background: 'linear-gradient(135deg, #D46A43 0%, #C85A32 100%)',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(200, 90, 50, 0.3)',
          }}
        >
          <Save size={16} />
          <span>Save Platform Configuration</span>
        </button>
      </form>
    </div>
  );
}
