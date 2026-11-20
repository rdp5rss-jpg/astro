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
  Clock,
  Sparkles,
  Phone,
  Gift
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
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'high_balance' | 'active'

  const addCredit = (id, amount) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, walletBalance: u.walletBalance + amount };
      }
      return u;
    }));
    alert(`🎉 Credited ₹${amount} complimentary bonus coins to user's wallet!`);
  };

  const filtered = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                          u.phone.includes(search) ||
                          u.rashi.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filterMode === 'high_balance') return u.walletBalance >= 200;
    if (filterMode === 'active') return u.totalReadings >= 5;
    return true;
  });

  const totalUserBalance = users.reduce((acc, u) => acc + u.walletBalance, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Seeker Metrics Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ padding: '16px', borderRadius: '20px', backgroundColor: '#FFFFFF', border: '1.5px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Total Seekers</span>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#1E1B4B', marginTop: '6px' }}>
            {users.length} Registered
          </div>
          <span style={{ fontSize: '11px', color: '#15803D', fontWeight: '700' }}>● 100% Verified Profiles</span>
        </div>

        <div style={{ padding: '16px', borderRadius: '20px', backgroundColor: '#FFFFFF', border: '1.5px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#C85A32', textTransform: 'uppercase' }}>Seeker Wallets Float</span>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#C85A32', marginTop: '6px' }}>
            ₹{totalUserBalance.toLocaleString('en-IN')}
          </div>
          <span style={{ fontSize: '11px', color: '#64748B' }}>Total Pre-funded Balance</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '16px', padding: '0 14px' }}>
          <Search size={16} color="#94A3B8" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search seekers by name, phone, or Rashi..."
            style={{
              width: '100%',
              padding: '12px 10px',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1E1B4B',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'all', label: `All Seekers (${users.length})` },
            { id: 'high_balance', label: 'Wallet > ₹200' },
            { id: 'active', label: 'Frequent Seekers (5+ calls)' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setFilterMode(t.id)}
              style={{
                flex: 1,
                padding: '8px 10px',
                borderRadius: '12px',
                border: filterMode === t.id ? '1.5px solid #C85A32' : '1.5px solid #E2E8F0',
                backgroundColor: filterMode === t.id ? '#FFF7ED' : '#FFFFFF',
                color: filterMode === t.id ? '#C85A32' : '#64748B',
                fontSize: '12px',
                fontWeight: '800',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Seeker List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map(u => (
          <div
            key={u.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '16px',
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#1E1B4B' }}>{u.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <Phone size={12} color="#64748B" />
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>{u.phone}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Wallet Balance</span>
                <div style={{ fontSize: '18px', fontWeight: '900', color: '#166534' }}>
                  ₹{u.walletBalance}
                </div>
              </div>
            </div>

            {/* Natal Specs Box */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', backgroundColor: '#F8FAFC', borderRadius: '14px', padding: '10px 12px', fontSize: '11px' }}>
              <div>
                <span style={{ color: '#94A3B8' }}>Rashi: </span>
                <span style={{ fontWeight: '800', color: '#1E1B4B' }}>{u.rashi}</span>
              </div>
              <div>
                <span style={{ color: '#94A3B8' }}>Nakshatra: </span>
                <span style={{ fontWeight: '800', color: '#1E1B4B' }}>{u.nakshatra}</span>
              </div>
              <div>
                <span style={{ color: '#94A3B8' }}>Birth Date: </span>
                <span style={{ fontWeight: '800', color: '#1E1B4B' }}>{u.dob}</span>
              </div>
              <div>
                <span style={{ color: '#94A3B8' }}>Location: </span>
                <span style={{ fontWeight: '800', color: '#1E1B4B' }}>{u.pob}</span>
              </div>
            </div>

            {/* Actions: Add Bonus Astral Coins */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
                Consultations: <strong>{u.totalReadings} completed</strong>
              </span>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => addCredit(u.id, 50)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    backgroundColor: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    color: '#2563EB',
                    fontSize: '11px',
                    fontWeight: '800',
                    cursor: 'pointer',
                  }}
                >
                  +₹50 Bonus
                </button>
                <button
                  onClick={() => addCredit(u.id, 100)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    backgroundColor: '#DCFCE7',
                    border: '1px solid #86EFAC',
                    color: '#15803D',
                    fontSize: '11px',
                    fontWeight: '800',
                    cursor: 'pointer',
                  }}
                >
                  +₹100 Bonus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
