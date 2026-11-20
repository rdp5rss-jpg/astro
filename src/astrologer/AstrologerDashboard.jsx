import React, { useState } from 'react';
import { 
  TrendingUp, 
  MessageSquare, 
  Phone, 
  Star, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ChevronRight,
  Flame,
  ArrowUpRight,
  Calendar,
  ShieldCheck,
  Bell
} from 'lucide-react';

export default function AstrologerDashboard({ 
  astrologer, 
  isOnline, 
  onToggleOnline, 
  onOpenConsultation,
  onNavigateTab
}) {
  const [activeRequests, setActiveRequests] = useState([
    {
      id: 'req-1',
      seekerName: 'Mahi Sharma',
      rashi: 'Mithuna (Gemini)',
      nakshatra: 'Punarvasu',
      type: 'chat',
      topic: 'Career Transition & Rahu Dasha',
      waitingTime: '2 mins ago',
      rate: astrologer.ratePerMin || 35,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    {
      id: 'req-2',
      seekerName: 'Rohit Verma',
      rashi: 'Tula (Libra)',
      nakshatra: 'Swati',
      type: 'call',
      topic: 'Kundli Milan / Marriage Compatibility',
      waitingTime: '4 mins ago',
      rate: astrologer.ratePerMin || 35,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    }
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingBottom: '90px' }}>
      {/* Online / Offline Status Banner */}
      <div
        className="glass-card"
        style={{
          borderRadius: '24px',
          padding: '16px 20px',
          backgroundColor: isOnline ? 'rgba(236, 253, 245, 0.95)' : 'rgba(254, 242, 242, 0.95)',
          border: isOnline ? '1.5px solid #A7F3D0' : '1.5px solid #FECACA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: isOnline ? '#10B981' : '#EF4444',
              boxShadow: isOnline ? '0 0 10px #10B981' : '0 0 8px #EF4444',
            }}
          />
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: isOnline ? '#065F46' : '#991B1B' }}>
              {isOnline ? 'You are LIVE on BHAVISHYAA' : 'You are currently OFFLINE'}
            </h4>
            <p style={{ fontSize: '11px', color: isOnline ? '#047857' : '#B91C1C', marginTop: '2px' }}>
              {isOnline ? 'Seekers can see your profile and initiate Chats & Calls' : 'Toggle online to start receiving consultations'}
            </p>
          </div>
        </div>

        <button
          onClick={onToggleOnline}
          style={{
            padding: '8px 18px',
            borderRadius: '999px',
            backgroundColor: isOnline ? '#059669' : '#DC2626',
            color: '#FFFFFF',
            fontWeight: '800',
            fontSize: '12px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          }}
        >
          {isOnline ? 'Go Offline' : 'Go Online'}
        </button>
      </div>

      {/* KPI Performance Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Today's Net Earnings */}
        <div
          className="glass-card"
          style={{
            padding: '16px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.9) 0%, rgba(253, 230, 138, 0.7) 100%)',
            border: '1.5px solid rgba(245, 158, 11, 0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#92400E', textTransform: 'uppercase' }}>
              Today's Net
            </span>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#15803D', backgroundColor: '#DCFCE7', padding: '2px 6px', borderRadius: '6px' }}>
              +28%
            </span>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#78350F', marginTop: '8px', lineHeight: 1 }}>
            ₹4,850
          </div>
          <p style={{ fontSize: '11px', color: '#92400E', marginTop: '6px' }}>
            From 14 consultations
          </p>
        </div>

        {/* Total Month Revenue */}
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
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>
              This Month
            </span>
            <Sparkles size={14} color="#C85A32" />
          </div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#1E1B4B', marginTop: '8px', lineHeight: 1 }}>
            ₹68,420
          </div>
          <p style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>
            Next payout: 25th Nov
          </p>
        </div>
      </div>

      {/* Secondary Stats Strip */}
      <div
        className="glass-card"
        style={{
          borderRadius: '20px',
          padding: '14px 18px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '8px',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          border: '1px solid #E2E8F0',
        }}
      >
        <div>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>⭐ Rating</div>
          <div style={{ fontSize: '16px', fontWeight: '900', color: '#1E1B4B', marginTop: '2px' }}>
            {astrologer.rating || 4.98}
          </div>
        </div>
        <div style={{ borderLeft: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>⏱️ Total Mins</div>
          <div style={{ fontSize: '16px', fontWeight: '900', color: '#1E1B4B', marginTop: '2px' }}>
            218 mins
          </div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>👑 Rate</div>
          <div style={{ fontSize: '16px', fontWeight: '900', color: '#C85A32', marginTop: '2px' }}>
            ₹{astrologer.ratePerMin || 35}/m
          </div>
        </div>
      </div>

      {/* Live Seeker Waiting Queue */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1E1B4B', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Live Seeker Requests</span>
            <span style={{ fontSize: '11px', fontWeight: '900', backgroundColor: '#FEE2E2', color: '#DC2626', padding: '2px 8px', borderRadius: '999px' }}>
              {activeRequests.length} Waiting
            </span>
          </h3>
          <span style={{ fontSize: '11px', color: '#64748B' }}>Auto-refreshing</span>
        </div>

        {activeRequests.length === 0 ? (
          <div
            className="glass-card"
            style={{
              padding: '30px 20px',
              borderRadius: '20px',
              textAlign: 'center',
              color: '#64748B',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <Clock size={28} color="#94A3B8" style={{ margin: '0 auto 8px' }} />
            <p style={{ fontSize: '14px', fontWeight: '700', color: '#1E1B4B' }}>Queue is Clear</p>
            <p style={{ fontSize: '12px' }}>You will receive an audio chime when a seeker requests a reading.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activeRequests.map((req) => (
              <div
                key={req.id}
                className="glass-card"
                style={{
                  padding: '14px 16px',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: '1.5px solid #FDBA74',
                  boxShadow: '0 6px 18px rgba(200, 90, 50, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={req.avatar}
                      alt={req.seekerName}
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FCD34D' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1E1B4B' }}>{req.seekerName}</h4>
                        <span style={{ fontSize: '10px', fontWeight: '800', color: '#C85A32', backgroundColor: '#FFF7ED', padding: '2px 6px', borderRadius: '6px' }}>
                          {req.type === 'call' ? '📞 Call' : '💬 Chat'}
                        </span>
                      </div>
                      <p style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                        {req.rashi} • {req.nakshatra}
                      </p>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '15px', fontWeight: '900', color: '#C85A32' }}>₹{req.rate}/min</span>
                    <div style={{ fontSize: '10px', color: '#94A3B8' }}>{req.waitingTime}</div>
                  </div>
                </div>

                {/* Topic pill */}
                <div style={{ marginTop: '10px', padding: '6px 10px', borderRadius: '10px', backgroundColor: '#F8FAFC', fontSize: '11px', color: '#334155' }}>
                  <strong>Topic:</strong> {req.topic}
                </div>

                {/* Accept / Decline Action Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8px', marginTop: '12px' }}>
                  <button
                    onClick={() => setActiveRequests(prev => prev.filter(r => r.id !== req.id))}
                    style={{
                      padding: '10px',
                      borderRadius: '12px',
                      backgroundColor: '#F1F5F9',
                      border: '1px solid #E2E8F0',
                      color: '#64748B',
                      fontSize: '12px',
                      fontWeight: '800',
                      cursor: 'pointer',
                    }}
                  >
                    Pass
                  </button>

                  <button
                    onClick={() => {
                      setActiveRequests(prev => prev.filter(r => r.id !== req.id));
                      onOpenConsultation(req);
                    }}
                    style={{
                      padding: '10px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      border: 'none',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: '900',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    <CheckCircle2 size={15} />
                    <span>Accept Consultation</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Quicklinks */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <button
          onClick={() => onNavigateTab('earnings')}
          className="glass-card"
          style={{
            padding: '14px',
            borderRadius: '18px',
            textAlign: 'left',
            cursor: 'pointer',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#1E1B4B' }}>Bank Settlement</div>
          <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>Request UPI / NEFT Payout</div>
        </button>

        <button
          onClick={() => onNavigateTab('profile')}
          className="glass-card"
          style={{
            padding: '14px',
            borderRadius: '18px',
            textAlign: 'left',
            cursor: 'pointer',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#1E1B4B' }}>Pricing & Hours</div>
          <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>Set Chat & Call Rate</div>
        </button>
      </div>
    </div>
  );
}
