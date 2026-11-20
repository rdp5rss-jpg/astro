import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Coins, 
  MessageSquare, 
  Phone, 
  ArrowUpRight,
  Clock,
  Sliders,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { astrologers } from '../data/astrologers';

export default function AdminDashboard({ onNavigateTab }) {
  const liveSessions = [
    { id: 'sess-1', astro: 'Acharya Rudranand', seeker: 'Mahi Sharma', type: 'Call', duration: '09:14', amount: '₹315' },
    { id: 'sess-2', astro: 'Mehak Sharma', seeker: 'Ankit Tiwari', type: 'Chat', duration: '04:45', amount: '₹125' },
    { id: 'sess-3', astro: 'Dr. Preeti Ganguly', seeker: 'Sneha Patel', type: 'Call', duration: '03:10', amount: '₹70' },
  ];

  const recentRecharges = [
    { id: 'rech-1', user: 'Mahi Sharma', amount: '₹500', time: '12m ago', method: 'UPI' },
    { id: 'rech-2', user: 'Vikram Joshi', amount: '₹1000', time: '28m ago', method: 'GPay' },
    { id: 'rech-3', user: 'Pooja Hegde', amount: '₹250', time: '1h ago', method: 'Card' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* 4 Clean Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {/* Gross Volume */}
        <div
          style={{
            padding: '14px',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748B' }}>Gross Billed</span>
            <span style={{ fontSize: '10px', fontWeight: '600', color: '#16A34A', backgroundColor: '#F0FDF4', padding: '1px 5px', borderRadius: '4px' }}>+34%</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', marginTop: '4px' }}>
            ₹3,42,850
          </div>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>Total consultations</span>
        </div>

        {/* Platform Net Commission */}
        <div
          style={{
            padding: '14px',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748B' }}>Platform (20%)</span>
            <Sparkles size={13} color="#C85A32" />
          </div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#C85A32', marginTop: '4px' }}>
            ₹68,570
          </div>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>Net HQ revenue</span>
        </div>

        {/* Active Calls */}
        <div
          style={{
            padding: '14px',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748B' }}>Live Sessions</span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16A34A' }} />
          </div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#15803D', marginTop: '4px' }}>
            {liveSessions.length} Active
          </div>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>Realtime audio & chat</span>
        </div>

        {/* Active Astrologers */}
        <div
          style={{
            padding: '14px',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748B' }}>Astrologers</span>
            <ShieldCheck size={13} color="#2563EB" />
          </div>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', marginTop: '4px' }}>
            {astrologers.length} Registered
          </div>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>{astrologers.filter(a => a.isOnline).length} online now</span>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        {[
          { label: 'Sessions', tab: 'sessions', icon: Phone, color: '#2563EB' },
          { label: 'Payouts', tab: 'payouts', icon: DollarSign, color: '#15803D' },
          { label: 'Gurus', tab: 'astrologers', icon: ShieldCheck, color: '#C85A32' },
          { label: 'Config', tab: 'settings', icon: Sliders, color: '#7C3AED' },
        ].map(btn => {
          const Icon = btn.icon;
          return (
            <button
              key={btn.tab}
              onClick={() => onNavigateTab && onNavigateTab(btn.tab)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
                padding: '10px 4px',
                borderRadius: '14px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
              }}
            >
              <Icon size={16} color={btn.color} />
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#334155' }}>
                {btn.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Actionable Pending Item */}
      <div
        onClick={() => onNavigateTab && onNavigateTab('payouts')}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          borderRadius: '14px',
          backgroundColor: '#FFFBEB',
          border: '1px solid #FEF3C7',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={15} color="#D97706" />
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#92400E' }}>
            2 payout requests waiting for approval
          </span>
        </div>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#C85A32', display: 'flex', alignItems: 'center', gap: '2px' }}>
          Review <ArrowUpRight size={13} />
        </span>
      </div>

      {/* Live Sessions List */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px', border: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
            Live Consultations
          </h3>
          <button
            onClick={() => onNavigateTab && onNavigateTab('sessions')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '11px',
              fontWeight: '600',
              color: '#C85A32',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            View All →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {liveSessions.map(sess => (
            <div
              key={sess.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #F1F5F9',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: sess.type === 'Call' ? '#2563EB' : '#7C3AED' }}>
                  {sess.type === 'Call' ? '📞' : '💬'}
                </span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>
                    {sess.seeker} ↔ {sess.astro}
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>
                    {sess.duration} elapsed • {sess.amount}
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '10px', fontWeight: '600', color: '#16A34A', backgroundColor: '#F0FDF4', padding: '2px 6px', borderRadius: '4px' }}>
                Live
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Inflows */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px', border: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
            Recent Recharges
          </h3>
          <span style={{ fontSize: '10px', color: '#64748B' }}>Razorpay UPI</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {recentRecharges.map(rech => (
            <div
              key={rech.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: '10px',
                backgroundColor: '#F8FAFC',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>{rech.user}</div>
                <div style={{ fontSize: '10px', color: '#94A3B8' }}>{rech.time} via {rech.method}</div>
              </div>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#15803D' }}>{rech.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
