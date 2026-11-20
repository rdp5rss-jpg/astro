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
  Gem
} from 'lucide-react';
import { astrologers } from '../data/astrologers';

export default function AdminDashboard({ onNavigateTab }) {
  const liveSessions = [
    { id: 'sess-1', astro: 'Acharya Rudranand Shastri', seeker: 'Mahi Sharma', type: 'Chat', duration: '04:12', amount: '₹147', status: 'Live' },
    { id: 'sess-2', astro: 'Mehak Sharma', seeker: 'Ankit Verma', type: 'Call', duration: '08:45', amount: '₹255', status: 'Live' },
    { id: 'sess-3', astro: 'Dr. Preeti Ganguly', seeker: 'Sneha Patel', type: 'Chat', duration: '02:00', amount: '₹52', status: 'Live' },
  ];

  const recentRecharges = [
    { id: 'rech-1', user: 'Mahi Sharma', amount: '₹250', bonus: '+₹65', total: '₹315', time: '12 mins ago', method: 'UPI' },
    { id: 'rech-2', user: 'Vikram Joshi', amount: '₹500', bonus: '+₹150', total: '₹650', time: '28 mins ago', method: 'GPay' },
    { id: 'rech-3', user: 'Pooja Hegde', amount: '₹1000', bonus: '+₹350', total: '₹1350', time: '1 hour ago', method: 'NetBanking' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Platform Health Status Strip */}
      <div
        className="glass-card"
        style={{
          borderRadius: '20px',
          padding: '14px 18px',
          backgroundColor: 'rgba(236, 253, 245, 0.95)',
          border: '1.5px solid #A7F3D0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block', boxShadow: '0 0 8px #10B981' }} />
          <span style={{ fontSize: '13px', fontWeight: '800', color: '#065F46' }}>
            BHAVISHYAA Core Engine: All Systems Operational
          </span>
        </div>
        <span style={{ fontSize: '11px', color: '#047857', fontWeight: '700' }}>
          Realtime Sync
        </span>
      </div>

      {/* 4 Executive KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Total GMV */}
        <div
          className="glass-card"
          style={{
            padding: '16px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.9) 0%, rgba(253, 230, 138, 0.65) 100%)',
            border: '1.5px solid rgba(245, 158, 11, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#92400E', textTransform: 'uppercase' }}>Gross Volume</span>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#15803D', backgroundColor: '#DCFCE7', padding: '2px 6px', borderRadius: '6px' }}>+34%</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#78350F', marginTop: '8px' }}>
            ₹3,42,850
          </div>
          <div style={{ fontSize: '11px', color: '#92400E', marginTop: '4px' }}>
            Recharge & Consultations
          </div>
        </div>

        {/* Platform Net Commission */}
        <div
          className="glass-card"
          style={{
            padding: '16px',
            borderRadius: '22px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1.5px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Platform Share (20%)</span>
            <Sparkles size={14} color="#C85A32" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#C85A32', marginTop: '8px' }}>
            ₹68,570
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
            Net Revenue
          </div>
        </div>

        {/* Total Seekers */}
        <div
          className="glass-card"
          style={{
            padding: '16px',
            borderRadius: '22px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1.5px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Total Seekers</span>
            <Users size={14} color="#3B82F6" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#1E1B4B', marginTop: '8px' }}>
            18,420
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
            +412 registered today
          </div>
        </div>

        {/* Active Astrologers */}
        <div
          className="glass-card"
          style={{
            padding: '16px',
            borderRadius: '22px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1.5px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>Vedic Gurus</span>
            <ShieldCheck size={14} color="#10B981" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#1E1B4B', marginTop: '8px' }}>
            48 Onboarded
          </div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '700', marginTop: '4px' }}>
            ● 14 Gurus Live Now
          </div>
        </div>
      </div>

      {/* Live Consultations Feed */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Live Consultations in Progress</span>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
          </h3>
          <span style={{ fontSize: '11px', color: '#64748B' }}>3 Active</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {liveSessions.map((sess) => (
            <div
              key={sess.id}
              className="glass-card"
              style={{
                borderRadius: '16px',
                padding: '12px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>{sess.astro}</span>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>↔</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#C85A32' }}>{sess.seeker}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  {sess.type === 'Call' ? '📞 Voice Call' : '💬 Chat'} • Active for {sess.duration}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', fontWeight: '900', color: '#15803D' }}>{sess.amount}</div>
                <span style={{ fontSize: '9px', fontWeight: '800', color: '#10B981', backgroundColor: '#DCFCE7', padding: '1px 6px', borderRadius: '4px' }}>
                  {sess.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Recharge Orders */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1E1B4B' }}>
            Recent Wallet Recharges
          </h3>
          <button
            onClick={() => onNavigateTab('users')}
            style={{ fontSize: '11px', color: '#C85A32', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            View All Users →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {recentRecharges.map((rech) => (
            <div
              key={rech.id}
              className="glass-card"
              style={{
                borderRadius: '16px',
                padding: '12px 14px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>{rech.user}</div>
                <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>
                  {rech.time} • via {rech.method}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '14px', fontWeight: '900', color: '#C85A32' }}>{rech.amount}</span>
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#15803D', marginLeft: '4px' }}>({rech.bonus})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
