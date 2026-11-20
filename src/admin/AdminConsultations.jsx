import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Search, 
  RotateCcw, 
  PhoneOff
} from 'lucide-react';

export default function AdminConsultations() {
  const [filter, setFilter] = useState('all'); // 'all' | 'live' | 'completed' | 'refunded'
  const [search, setSearch] = useState('');
  
  const [sessions, setSessions] = useState([
    {
      id: 'sess-801',
      seeker: 'Mahi Sharma',
      astro: 'Acharya Rudranand',
      type: 'Call',
      durationMins: 14,
      ratePerMin: 35,
      totalAmount: 490,
      platformShare: 98,
      astroShare: 392,
      topic: 'Career Switch to Tech & Rahu Dasha',
      status: 'Live',
      startTime: '8m ago',
    },
    {
      id: 'sess-802',
      seeker: 'Ankit Tiwari',
      astro: 'Mehak Sharma',
      type: 'Chat',
      durationMins: 6,
      ratePerMin: 25,
      totalAmount: 150,
      platformShare: 30,
      astroShare: 120,
      topic: 'Kundli Milan (32 Guna Matching)',
      status: 'Live',
      startTime: '5m ago',
    },
    {
      id: 'sess-803',
      seeker: 'Priya Nambiar',
      astro: 'Acharya Rudranand',
      type: 'Call',
      durationMins: 22,
      ratePerMin: 35,
      totalAmount: 770,
      platformShare: 154,
      astroShare: 616,
      topic: 'Shani Sade Sati Remedies',
      status: 'Completed',
      startTime: 'Today, 2:15 PM',
    },
    {
      id: 'sess-804',
      seeker: 'Karan Mehra',
      astro: 'Pandit Janardhan',
      type: 'Chat',
      durationMins: 18,
      ratePerMin: 30,
      totalAmount: 540,
      platformShare: 108,
      astroShare: 432,
      topic: 'Property Purchase Muhurat',
      status: 'Completed',
      startTime: 'Today, 11:30 AM',
    },
    {
      id: 'sess-805',
      seeker: 'Rohan Gupta',
      astro: 'Dr. Preeti Ganguly',
      type: 'Call',
      durationMins: 3,
      ratePerMin: 22,
      totalAmount: 66,
      platformShare: 0,
      astroShare: 0,
      topic: 'Call Disconnection Due to Audio Glitch',
      status: 'Refunded',
      startTime: 'Yesterday, 6:40 PM',
    },
  ]);

  const handleEndLiveSession = (id) => {
    if (!window.confirm('Terminate this live session?')) return;
    setSessions(prev => prev.map(s => s.id === id ? { ...s, status: 'Completed', startTime: 'Just ended' } : s));
  };

  const handleRefundSession = (id) => {
    if (!window.confirm('Issue full refund to seeker wallet?')) return;
    setSessions(prev => prev.map(s => s.id === id ? { ...s, status: 'Refunded', platformShare: 0, astroShare: 0 } : s));
  };

  const filteredSessions = sessions.filter(s => {
    const matchesFilter = filter === 'all' ? true : s.status.toLowerCase() === filter;
    const matchesSearch = s.seeker.toLowerCase().includes(search.toLowerCase()) ||
                          s.astro.toLowerCase().includes(search.toLowerCase()) ||
                          s.topic.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const liveCount = sessions.filter(s => s.status === 'Live').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Search Input */}
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '0 12px' }}>
        <Search size={15} color="#94A3B8" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search consultations..."
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

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
        {[
          { id: 'all', label: `All (${sessions.length})` },
          { id: 'live', label: `Live (${liveCount})` },
          { id: 'completed', label: 'Completed' },
          { id: 'refunded', label: 'Refunded' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: filter === t.id ? '1px solid #C85A32' : '1px solid #E2E8F0',
              backgroundColor: filter === t.id ? '#FFF7ED' : '#FFFFFF',
              color: filter === t.id ? '#C85A32' : '#64748B',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Session Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredSessions.map(sess => {
          const isLive = sess.status === 'Live';
          const isRefunded = sess.status === 'Refunded';

          return (
            <div
              key={sess.id}
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
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px' }}>
                    {sess.type === 'Call' ? '📞' : '💬'}
                  </span>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{sess.seeker}</span>
                    <span style={{ fontSize: '11px', color: '#64748B' }}> with {sess.astro}</span>
                  </div>
                </div>

                <span
                  style={{
                    padding: '2px 7px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: '600',
                    backgroundColor: isLive ? '#F0FDF4' : isRefunded ? '#FEF2F2' : '#F1F5F9',
                    color: isLive ? '#15803D' : isRefunded ? '#B91C1C' : '#475569',
                  }}
                >
                  {isLive ? '● Live' : sess.status}
                </span>
              </div>

              {/* Topic */}
              <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.3 }}>
                {sess.topic}
              </div>

              {/* Meta & Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '8px', fontSize: '11px', color: '#64748B' }}>
                <div>
                  <span style={{ fontWeight: '700', color: '#0F172A' }}>₹{sess.totalAmount}</span>
                  <span> • {sess.durationMins}m • {sess.startTime}</span>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  {isLive && (
                    <button
                      onClick={() => handleEndLiveSession(sess.id)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        backgroundColor: '#FEF2F2',
                        border: '1px solid #FECACA',
                        color: '#B91C1C',
                        fontSize: '11px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      End
                    </button>
                  )}
                  {!isRefunded && (
                    <button
                      onClick={() => handleRefundSession(sess.id)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        color: '#475569',
                        fontSize: '11px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
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
