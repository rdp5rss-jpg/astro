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
  Calendar,
  AlertTriangle,
  Clock,
  Gem,
  CheckCircle2,
  Bell,
  Sliders,
  DollarSign
} from 'lucide-react';
import { astrologers } from '../data/astrologers';

export default function AdminDashboard({ onNavigateTab }) {
  const liveSessions = [
    { id: 'sess-1', astro: 'Acharya Rudranand Shastri', seeker: 'Mahi Sharma', type: 'Call', duration: '09:14', amount: '₹315', status: 'Live' },
    { id: 'sess-2', astro: 'Mehak Sharma', seeker: 'Ankit Tiwari', type: 'Chat', duration: '04:45', amount: '₹125', status: 'Live' },
    { id: 'sess-3', astro: 'Dr. Preeti Ganguly', seeker: 'Sneha Patel', type: 'Call', duration: '03:10', amount: '₹70', status: 'Live' },
  ];

  const recentRecharges = [
    { id: 'rech-1', user: 'Mahi Sharma', amount: '₹500', bonus: '+₹150', total: '₹650', time: '12 mins ago', method: 'UPI' },
    { id: 'rech-2', user: 'Vikram Joshi', amount: '₹1000', bonus: '+₹350', total: '₹1350', time: '28 mins ago', method: 'GPay' },
    { id: 'rech-3', user: 'Pooja Hegde', amount: '₹250', bonus: '+₹65', total: '₹315', time: '1 hour ago', method: 'NetBanking' },
  ];

  const quickAlerts = [
    { id: 'alt-1', type: 'payout', text: 'Acharya Rudranand requested ₹24,850 bank payout', action: 'payouts' },
    { id: 'alt-2', type: 'guru', text: '2 new astrologer onboarding applications awaiting review', action: 'astrologers' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* System Status Strip */}
      <div
        style={{
          borderRadius: '18px',
          padding: '12px 16px',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #BBF7D0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block', boxShadow: '0 0 8px #10B981' }} />
          <span style={{ fontSize: '13px', fontWeight: '800', color: '#166534' }}>
            BHAVISHYAA Core Engine: All Nodes Live
          </span>
        </div>
        <span style={{ fontSize: '11px', color: '#15803D', fontWeight: '800', backgroundColor: '#DCFCE7', padding: '3px 8px', borderRadius: '999px' }}>
          99.98% Uptime
        </span>
      </div>

      {/* 4 Executive KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Gross Volume */}
        <div
          style={{
            padding: '16px',
            borderRadius: '20px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Gross Volume</span>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#15803D', backgroundColor: '#DCFCE7', padding: '2px 6px', borderRadius: '6px' }}>+34%</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#1E1B4B', marginTop: '6px' }}>
            ₹3,42,850
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
            Total GMV Billed
          </div>
        </div>

        {/* Platform Net Commission */}
        <div
          style={{
            padding: '16px',
            borderRadius: '20px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #FED7AA',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#C85A32', textTransform: 'uppercase' }}>Platform Share (20%)</span>
            <Sparkles size={14} color="#C85A32" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#C85A32', marginTop: '6px' }}>
            ₹68,570
          </div>
          <div style={{ fontSize: '11px', color: '#9A3412', marginTop: '2px' }}>
            Net Platform Revenue
          </div>
        </div>

        {/* Live Active Sessions */}
        <div
          style={{
            padding: '16px',
            borderRadius: '20px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Active Calls & Chats</span>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#166534', marginTop: '6px' }}>
            {liveSessions.length} Live
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
            In-progress consultations
          </div>
        </div>

        {/* Verified Astrologers */}
        <div
          style={{
            padding: '16px',
            borderRadius: '20px',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Vetted Astrologers</span>
            <ShieldCheck size={15} color="#2563EB" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#1E1B4B', marginTop: '6px' }}>
            {astrologers.length} Active
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
            {astrologers.filter(a => a.isOnline).length} currently online
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        {[
          { label: 'Live Sessions', tab: 'sessions', icon: Phone, color: '#2563EB', bg: '#EFF6FF' },
          { label: 'Approve Payouts', tab: 'payouts', icon: DollarSign, color: '#166534', bg: '#DCFCE7' },
          { label: 'Manage Gurus', tab: 'astrologers', icon: ShieldCheck, color: '#C85A32', bg: '#FFF7ED' },
          { label: 'Platform Config', tab: 'settings', icon: Sliders, color: '#7C3AED', bg: '#F5F3FF' },
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
                gap: '6px',
                padding: '12px 6px',
                borderRadius: '16px',
                backgroundColor: btn.bg,
                border: '1px solid rgba(0,0,0,0.04)',
                cursor: 'pointer',
              }}
            >
              <Icon size={18} color={btn.color} />
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#1E1B4B', textAlign: 'center' }}>
                {btn.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Actionable Pending Alerts */}
      <div style={{ backgroundColor: '#FFFBEB', borderRadius: '18px', padding: '14px 16px', border: '1.5px solid #FDE68A' }}>
        <h4 style={{ fontSize: '13px', fontWeight: '900', color: '#92400E', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <AlertTriangle size={15} color="#D97706" />
          <span>Pending Management Actions</span>
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {quickAlerts.map(alt => (
            <div
              key={alt.id}
              onClick={() => onNavigateTab && onNavigateTab(alt.action)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #FCD34D',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#78350F' }}>
                {alt.text}
              </span>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#C85A32', display: 'flex', alignItems: 'center', gap: '2px' }}>
                Resolve <ArrowUpRight size={13} />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Consultations Pulse */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '16px', border: '1.5px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '900', color: '#1E1B4B' }}>
              Live Consultation Pulse
            </h3>
            <p style={{ fontSize: '11px', color: '#64748B' }}>
              Real-time active voice and chat sessions
            </p>
          </div>
          <button
            onClick={() => onNavigateTab && onNavigateTab('sessions')}
            style={{
              padding: '6px 12px',
              borderRadius: '10px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              fontSize: '11px',
              fontWeight: '800',
              color: '#C85A32',
              cursor: 'pointer',
            }}
          >
            View All ({liveSessions.length})
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {liveSessions.map(sess => (
            <div
              key={sess.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '14px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    backgroundColor: sess.type === 'Call' ? '#EFF6FF' : '#F5F3FF',
                    color: sess.type === 'Call' ? '#2563EB' : '#7C3AED',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {sess.type === 'Call' ? <Phone size={15} /> : <MessageSquare size={15} />}
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>
                    {sess.seeker} ↔ {sess.astro}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                    <span style={{ color: '#166534', fontWeight: '800' }}>● {sess.duration}</span>
                    <span>Accrued: {sess.amount}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigateTab && onNavigateTab('sessions')}
                style={{
                  padding: '6px 10px',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  fontSize: '11px',
                  fontWeight: '800',
                  color: '#475569',
                  cursor: 'pointer',
                }}
              >
                Inspect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Seeker Wallet Recharges */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '16px', border: '1.5px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '900', color: '#1E1B4B' }}>
              Recent Wallet Inflows
            </h3>
            <p style={{ fontSize: '11px', color: '#64748B' }}>
              Real-time payment gateway transactions
            </p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#15803D' }}>
            Razorpay UPI Active
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {recentRecharges.map(rech => (
            <div
              key={rech.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #F1F5F9',
              }}
            >
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>{rech.user}</h4>
                <p style={{ fontSize: '11px', color: '#64748B' }}>{rech.time} via {rech.method}</p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '14px', fontWeight: '900', color: '#166534' }}>{rech.amount}</span>
                <span style={{ fontSize: '10px', color: '#C85A32', fontWeight: '800', display: 'block' }}>{rech.bonus} bonus</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
