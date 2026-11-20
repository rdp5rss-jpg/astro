import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Coins, 
  Calendar, 
  MapPin, 
  Plus, 
  CheckCircle2, 
  MessageSquare,
  Clock
} from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([
    {
      id: 'usr-1',
      name: 'Mahi Sharma',
      phone: '+91 98765 43210',
      rashi: 'Mithuna (Gemini)',
      nakshatra: 'Punarvasu',
      dob: '14 Apr 1994',
      pob: 'New Delhi',
      walletBalance: 185,
      totalReadings: 8,
      joinDate: '12 Nov 2026',
    },
    {
      id: 'usr-2',
      name: 'Rohit Sharma',
      phone: '+91 98220 11984',
      rashi: 'Tula (Libra)',
      nakshatra: 'Swati',
      dob: '22 Aug 1992',
      pob: 'Mumbai',
      walletBalance: 420,
      totalReadings: 5,
      joinDate: '15 Nov 2026',
    },
    {
      id: 'usr-3',
      name: 'Priya Nambiar',
      phone: '+91 99401 22345',
      rashi: 'Meena (Pisces)',
      nakshatra: 'Revati',
      dob: '08 Dec 1996',
      pob: 'Bengaluru',
      walletBalance: 65,
      totalReadings: 12,
      joinDate: '01 Nov 2026',
    },
    {
      id: 'usr-4',
      name: 'Vikram Joshi',
      phone: '+91 97110 55432',
      rashi: 'Simha (Leo)',
      nakshatra: 'Magha',
      dob: '19 Jan 1989',
      pob: 'Pune',
      walletBalance: 510,
      totalReadings: 3,
      joinDate: '18 Nov 2026',
    }
  ]);

  const [search, setSearch] = useState('');

  const addCredit = (id, amount) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, walletBalance: u.walletBalance + amount };
      }
      return u;
    }));
    alert(`🎉 Successfully credited ₹${amount} complimentary astral coins to user's wallet!`);
  };

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search) ||
    u.rashi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: '16px',
          padding: '8px 14px',
          gap: '8px',
        }}
      >
        <Search size={16} color="#94A3B8" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search seekers by name, mobile, or Rashi..."
          style={{
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            width: '100%',
            fontSize: '13px',
            color: '#1E1B4B',
          }}
        />
      </div>

      {/* Users Count Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1E1B4B' }}>
          Registered Kundli Profiles ({filtered.length})
        </h3>
        <span style={{ fontSize: '11px', color: '#64748B' }}>Realtime Astral Sync</span>
      </div>

      {/* Users List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map((usr) => (
          <div
            key={usr.id}
            className="glass-card"
            style={{
              borderRadius: '20px',
              padding: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #E06D3F 0%, #C85A32 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    fontWeight: '900',
                    fontSize: '16px',
                  }}
                >
                  {usr.name.charAt(0)}
                </div>

                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1E1B4B' }}>{usr.name}</h4>
                  <p style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                    {usr.phone} • Joined {usr.joinDate}
                  </p>
                </div>
              </div>

              {/* Wallet Balance Chip */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#B45309', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Coins size={14} color="#D97706" />
                  <span>₹{usr.walletBalance}</span>
                </div>
                <div style={{ fontSize: '10px', color: '#64748B' }}>Astral Balance</div>
              </div>
            </div>

            {/* Birth Kundli Details Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                padding: '10px 12px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                fontSize: '11px',
                color: '#475569',
              }}
            >
              <div><strong>Rashi:</strong> {usr.rashi}</div>
              <div><strong>Nakshatra:</strong> {usr.nakshatra}</div>
              <div><strong>DOB:</strong> {usr.dob}</div>
              <div><strong>POB:</strong> {usr.pob}</div>
            </div>

            {/* Customer Support Wallet Adjustments */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
                {usr.totalReadings} consultations completed
              </span>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => addCredit(usr.id, 50)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '8px',
                    backgroundColor: '#FEF3C7',
                    border: '1px solid #FCD34D',
                    color: '#92400E',
                    fontSize: '10px',
                    fontWeight: '800',
                    cursor: 'pointer',
                  }}
                >
                  +₹50 Support Credit
                </button>

                <button
                  onClick={() => addCredit(usr.id, 100)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '8px',
                    backgroundColor: '#DCFCE7',
                    border: '1px solid #86EFAC',
                    color: '#15803D',
                    fontSize: '10px',
                    fontWeight: '800',
                    cursor: 'pointer',
                  }}
                >
                  +₹100 Credit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
