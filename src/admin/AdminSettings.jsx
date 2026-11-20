import React, { useState } from 'react';
import { 
  Percent, 
  Coins, 
  Save, 
  CheckCircle, 
  Bell, 
  Send
} from 'lucide-react';

export default function AdminSettings() {
  const [platformCommission, setPlatformCommission] = useState(20);
  const [minPayoutAmount, setMinPayoutAmount] = useState(500);

  const [packages, setPackages] = useState([
    { amount: 100, bonus: 20 },
    { amount: 250, bonus: 65 },
    { amount: 500, bonus: 150 },
    { amount: 1000, bonus: 350 },
  ]);

  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastBody, setBroadcastBody] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastBody) return;
    setBroadcastTitle('');
    setBroadcastBody('');
    alert('📢 Push notification sent to seekers.');
  };

  const handleBonusChange = (index, newBonus) => {
    setPackages(prev => {
      const copy = [...prev];
      copy[index].bonus = Number(newBonus);
      return copy;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {saved && (
        <div
          style={{
            padding: '10px 12px',
            borderRadius: '10px',
            backgroundColor: '#F0FDF4',
            border: '1px solid #BBF7D0',
            color: '#15803D',
            fontSize: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <CheckCircle size={14} />
          <span>Settings saved successfully.</span>
        </div>
      )}

      {/* Main Parameters */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div
          style={{
            borderRadius: '14px',
            padding: '14px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A', marginBottom: '12px' }}>
            Commission & Payout Rules
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '3px' }}>
                HQ Commission (%)
              </label>
              <input
                type="number"
                min={5}
                max={50}
                value={platformCommission}
                onChange={(e) => setPlatformCommission(Number(e.target.value))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '3px' }}>
                Min Payout (₹)
              </label>
              <input
                type="number"
                min={100}
                step={50}
                value={minPayoutAmount}
                onChange={(e) => setMinPayoutAmount(Number(e.target.value))}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
              />
            </div>
          </div>
        </div>

        {/* Bonus Slabs */}
        <div
          style={{
            borderRadius: '14px',
            padding: '14px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A', marginBottom: '10px' }}>
            Wallet Recharge Bonus Slabs
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {packages.map((pkg, idx) => (
              <div
                key={pkg.amount}
                style={{
                  padding: '8px 10px',
                  borderRadius: '10px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '12px', color: '#0F172A' }}>₹{pkg.amount}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>+₹</span>
                  <input
                    type="number"
                    value={pkg.bonus}
                    onChange={(e) => handleBonusChange(idx, e.target.value)}
                    style={{
                      width: '45px',
                      padding: '2px 4px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '11px',
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
            padding: '10px',
            borderRadius: '12px',
            backgroundColor: '#1E1B4B',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Save Configuration
        </button>
      </form>

      {/* Broadcast Push */}
      <div
        style={{
          borderRadius: '14px',
          padding: '14px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
          Broadcast Push Notification
        </div>

        <form onSubmit={handleBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input
            type="text"
            required
            value={broadcastTitle}
            onChange={(e) => setBroadcastTitle(e.target.value)}
            placeholder="Notification Title"
            style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
          />

          <textarea
            required
            rows={2}
            value={broadcastBody}
            onChange={(e) => setBroadcastBody(e.target.value)}
            placeholder="Notification message..."
            style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', resize: 'none' }}
          />

          <button
            type="submit"
            style={{
              padding: '9px',
              borderRadius: '10px',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Send Push to All Seekers
          </button>
        </form>
      </div>
    </div>
  );
}
