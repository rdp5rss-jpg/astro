import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Phone
} from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([
    {
      id: 'usr-1',
      name: 'Mahi Sharma',
      phone: '+91 98765 43210',
      rashi: 'Gemini',
      nakshatra: 'Punarvasu',
      walletBalance: 185,
      totalReadings: 8,
    },
    {
      id: 'usr-2',
      name: 'Rohit Sharma',
      phone: '+91 98220 11984',
      rashi: 'Libra',
      nakshatra: 'Swati',
      walletBalance: 420,
      totalReadings: 5,
    },
    {
      id: 'usr-3',
      name: 'Priya Nambiar',
      phone: '+91 99401 22345',
      rashi: 'Pisces',
      nakshatra: 'Revati',
      walletBalance: 65,
      totalReadings: 12,
    },
    {
      id: 'usr-4',
      name: 'Vikram Joshi',
      phone: '+91 97110 55432',
      rashi: 'Leo',
      nakshatra: 'Magha',
      walletBalance: 510,
      totalReadings: 3,
    }
  ]);

  const [search, setSearch] = useState('');

  const addCredit = (id, amount) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, walletBalance: u.walletBalance + amount } : u));
  };

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search) ||
    u.rashi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Search Input */}
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '0 12px' }}>
        <Search size={15} color="#94A3B8" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search seekers by name, phone, or rashi..."
          style={{
            width: '100%',
            padding: '10px 8px',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '13px',
            color: '#0F172A',
          }}
        />
      </div>

      {/* Seeker List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map(u => (
          <div
            key={u.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              padding: '12px 14px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{u.name}</span>
                <span style={{ fontSize: '11px', color: '#64748B' }}> • {u.phone}</span>
              </div>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#15803D' }}>
                ₹{u.walletBalance}
              </span>
            </div>

            {/* Natal info */}
            <div style={{ fontSize: '11px', color: '#64748B' }}>
              Rashi: <strong style={{ color: '#0F172A' }}>{u.rashi}</strong> • Nakshatra: <strong style={{ color: '#0F172A' }}>{u.nakshatra}</strong> • {u.totalReadings} calls
            </div>

            {/* Bonus action buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', borderTop: '1px solid #F1F5F9', paddingTop: '6px' }}>
              <button
                onClick={() => addCredit(u.id, 50)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  color: '#2563EB',
                  fontSize: '10px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                +₹50 Bonus
              </button>
              <button
                onClick={() => addCredit(u.id, 100)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  color: '#15803D',
                  fontSize: '10px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                +₹100 Bonus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
