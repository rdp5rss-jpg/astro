import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Clock, 
  Search, 
  Filter, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  User,
  Sparkles,
  PhoneOff
} from 'lucide-react';

export default function AdminConsultations() {
  const [filter, setFilter] = useState('all'); // 'all' | 'live' | 'completed' | 'refunded'
  const [search, setSearch] = useState('');
  
  const [sessions, setSessions] = useState([
    {
      id: 'sess-801',
      seeker: 'Mahi Sharma',
      seekerPhone: '+91 98765 43210',
      astro: 'Acharya Rudranand Shastri',
      astroAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
      type: 'Call',
      durationMins: 14,
      ratePerMin: 35,
      totalAmount: 490,
      platformShare: 98,
      astroShare: 392,
      topic: 'Career Switch to Tech & Rahu Mahadasha',
      status: 'Live',
      startTime: '8 mins ago',
      rating: null,
    },
    {
      id: 'sess-802',
      seeker: 'Ankit Tiwari',
      seekerPhone: '+91 98220 11984',
      astro: 'Mehak Sharma',
      astroAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300',
      type: 'Chat',
      durationMins: 6,
      ratePerMin: 25,
      totalAmount: 150,
      platformShare: 30,
      astroShare: 120,
      topic: 'Kundli Milan (32 Guna Matching)',
      status: 'Live',
      startTime: '5 mins ago',
      rating: null,
    },
    {
      id: 'sess-803',
      seeker: 'Priya Nambiar',
      seekerPhone: '+91 99401 22345',
      astro: 'Acharya Rudranand Shastri',
      astroAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
      type: 'Call',
      durationMins: 22,
      ratePerMin: 35,
      totalAmount: 770,
      platformShare: 154,
      astroShare: 616,
      topic: 'Shani Sade Sati Phase 2 Remedial Measures',
      status: 'Completed',
      startTime: 'Today, 02:15 PM',
      rating: 5.0,
    },
    {
      id: 'sess-804',
      seeker: 'Karan Mehra',
      seekerPhone: '+91 98112 33445',
      astro: 'Pandit Janardhan',
      astroAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
      type: 'Chat',
      durationMins: 18,
      ratePerMin: 30,
      totalAmount: 540,
      platformShare: 108,
      astroShare: 432,
      topic: 'Property Purchase Auspicious Nakshatra',
      status: 'Completed',
      startTime: 'Today, 11:30 AM',
      rating: 4.8,
    },
    {
      id: 'sess-805',
      seeker: 'Rohan Gupta',
      seekerPhone: '+91 97114 88291',
      astro: 'Dr. Preeti Ganguly',
      astroAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300',
      type: 'Call',
      durationMins: 3,
      ratePerMin: 22,
      totalAmount: 66,
      platformShare: 0,
      astroShare: 0,
      topic: 'Call Disconnection Due to Audio Glitch',
      status: 'Refunded',
      startTime: 'Yesterday, 06:40 PM',
      rating: null,
    },
  ]);

  const [selectedSession, setSelectedSession] = useState(null);

  const handleEndLiveSession = (id) => {
    if (!window.confirm('Are you sure you want to forcibly terminate this live session?')) return;
    setSessions(prev => prev.map(s => s.id === id ? { ...s, status: 'Completed', startTime: 'Just ended' } : s));
  };

  const handleRefundSession = (id) => {
    if (!window.confirm('Issue full refund to seeker wallet for this consultation?')) return;
    setSessions(prev => prev.map(s => s.id === id ? { ...s, status: 'Refunded', platformShare: 0, astroShare: 0 } : s));
    alert('✅ Consultation refunded to seeker wallet successfully.');
  };

  const filteredSessions = sessions.filter(s => {
    const matchesFilter = filter === 'all' ? true : s.status.toLowerCase() === filter;
    const matchesSearch = s.seeker.toLowerCase().includes(search.toLowerCase()) ||
                          s.astro.toLowerCase().includes(search.toLowerCase()) ||
                          s.topic.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const liveCount = sessions.filter(s => s.status === 'Live').length;
  const totalVolume = sessions.reduce((acc, s) => acc + (s.status !== 'Refunded' ? s.totalAmount : 0), 0);
  const totalPlatformCut = sessions.reduce((acc, s) => acc + (s.status !== 'Refunded' ? s.platformShare : 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* KPI Highlights Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        <div style={{ padding: '12px 14px', borderRadius: '18px', backgroundColor: '#FFFFFF', border: '1.5px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B' }}>Live Now</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#166534', marginTop: '4px' }}>
            {liveCount} Sessions
          </div>
        </div>

        <div style={{ padding: '12px 14px', borderRadius: '18px', backgroundColor: '#FFFFFF', border: '1.5px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B' }}>Gross Billed</span>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#1E1B4B', marginTop: '4px' }}>
            ₹{totalVolume.toLocaleString('en-IN')}
          </div>
        </div>

        <div style={{ padding: '12px 14px', borderRadius: '18px', backgroundColor: '#FFFFFF', border: '1.5px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#C85A32' }}>Platform 20%</span>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#C85A32', marginTop: '4px' }}>
            ₹{totalPlatformCut.toLocaleString('en-IN')}
          </div>
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
            placeholder="Search by seeker, guru, or topic..."
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

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
          {[
            { id: 'all', label: `All (${sessions.length})` },
            { id: 'live', label: `🟢 Live Now (${liveCount})` },
            { id: 'completed', label: 'Completed' },
            { id: 'refunded', label: 'Refunded' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              style={{
                padding: '7px 14px',
                borderRadius: '12px',
                border: filter === t.id ? '1.5px solid #C85A32' : '1.5px solid #E2E8F0',
                backgroundColor: filter === t.id ? '#FFF7ED' : '#FFFFFF',
                color: filter === t.id ? '#C85A32' : '#64748B',
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

      {/* Session Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredSessions.map(sess => {
          const isLive = sess.status === 'Live';
          const isRefunded = sess.status === 'Refunded';

          return (
            <div
              key={sess.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '16px',
                border: isLive ? '2px solid #86EFAC' : '1.5px solid #E2E8F0',
                boxShadow: isLive ? '0 4px 18px rgba(34, 197, 94, 0.15)' : '0 2px 8px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Header: Mode + Seeker & Guru + Status */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '14px',
                      backgroundColor: sess.type === 'Call' ? '#EFF6FF' : '#F5F3FF',
                      color: sess.type === 'Call' ? '#2563EB' : '#7C3AED',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {sess.type === 'Call' ? <Phone size={18} /> : <MessageSquare size={18} />}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#1E1B4B' }}>{sess.seeker}</h4>
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>with</span>
                    </div>
                    <p style={{ fontSize: '12px', fontWeight: '700', color: '#C85A32' }}>{sess.astro}</p>
                  </div>
                </div>

                {/* Status Pill */}
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: '800',
                    backgroundColor: isLive ? '#DCFCE7' : isRefunded ? '#FEE2E2' : '#F1F5F9',
                    color: isLive ? '#15803D' : isRefunded ? '#B91C1C' : '#475569',
                    border: isLive ? '1px solid #86EFAC' : 'none',
                  }}
                >
                  {isLive ? '● Live In-Progress' : sess.status}
                </span>
              </div>

              {/* Topic & Metadata */}
              <div style={{ backgroundColor: '#F8FAFC', borderRadius: '12px', padding: '10px 12px' }}>
                <p style={{ fontSize: '12px', color: '#334155', fontWeight: '700' }}>
                  🎯 {sess.topic}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
                  <span>{sess.startTime}</span>
                  <span>Duration: {sess.durationMins} mins @ ₹{sess.ratePerMin}/min</span>
                </div>
              </div>

              {/* Financial Split */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '10px', fontSize: '12px' }}>
                <div>
                  <span style={{ color: '#64748B', fontWeight: '600' }}>Total Fee: </span>
                  <span style={{ fontWeight: '900', color: '#1E1B4B' }}>₹{sess.totalAmount}</span>
                  <span style={{ color: '#94A3B8', fontSize: '11px', marginLeft: '6px' }}>
                    (HQ: ₹{sess.platformShare} | Guru: ₹{sess.astroShare})
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {isLive && (
                    <button
                      onClick={() => handleEndLiveSession(sess.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '10px',
                        backgroundColor: '#FEE2E2',
                        border: '1px solid #FCA5A5',
                        color: '#B91C1C',
                        fontSize: '11px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <PhoneOff size={13} />
                      End Session
                    </button>
                  )}

                  {!isRefunded && (
                    <button
                      onClick={() => handleRefundSession(sess.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '10px',
                        backgroundColor: '#F1F5F9',
                        border: '1px solid #CBD5E1',
                        color: '#475569',
                        fontSize: '11px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <RotateCcw size={13} />
                      Refund
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
