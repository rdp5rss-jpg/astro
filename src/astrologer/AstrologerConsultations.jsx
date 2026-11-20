import React, { useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Search, 
  Calendar, 
  FileText, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  Star,
  Users
} from 'lucide-react';

export default function AstrologerConsultations({ onOpenChatSession, onOpenCallSession }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'approved' | 'scheduled' | 'completed'
  const [search, setSearch] = useState('');
  const [selectedKundliSeeker, setSelectedKundliSeeker] = useState(null);

  const [consultations, setConsultations] = useState([
    {
      id: 'con-1',
      seekerName: 'Mahi Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      type: 'chat',
      topic: 'Career Transition to Senior Product Lead & Rahu Mahadasha remedies',
      rashi: 'Mithuna (Gemini)',
      nakshatra: 'Punarvasu',
      dob: '14 Apr 1994, 04:15 PM',
      pob: 'New Delhi, India',
      status: 'approved',
      statusLabel: 'Approved - Ready to Connect',
      rate: 35,
      allocatedMins: 15,
      totalFee: 525,
      scheduledTime: 'Instant / Ready Now',
    },
    {
      id: 'con-2',
      seekerName: 'Rohit Verma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      type: 'call',
      topic: 'Marriage Kundli Milan with prospective partner (32 Gun Milan analysis)',
      rashi: 'Tula (Libra)',
      nakshatra: 'Swati',
      dob: '22 Aug 1992, 10:30 AM',
      pob: 'Mumbai, India',
      status: 'approved',
      statusLabel: 'Approved - Audio Line Ready',
      rate: 35,
      allocatedMins: 20,
      totalFee: 700,
      scheduledTime: 'Instant / Ready Now',
    },
    {
      id: 'con-3',
      seekerName: 'Priya Nambiar',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      type: 'chat',
      topic: 'Financial Prosperity, Business Yoga & Emerald (Panna) gemstone verification',
      rashi: 'Meena (Pisces)',
      nakshatra: 'Revati',
      dob: '08 Dec 1996, 07:45 AM',
      pob: 'Bengaluru, India',
      status: 'scheduled',
      statusLabel: 'Scheduled for Today',
      rate: 35,
      allocatedMins: 15,
      totalFee: 525,
      scheduledTime: 'Today at 06:30 PM',
    },
    {
      id: 'con-4',
      seekerName: 'Vikram Joshi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      type: 'call',
      topic: 'Foreign Relocation Yoga, PR Visa timeline & Shani Sade Sati phase',
      rashi: 'Simha (Leo)',
      nakshatra: 'Magha',
      dob: '19 Jan 1989, 02:20 PM',
      pob: 'Pune, India',
      status: 'completed',
      statusLabel: 'Completed (18 mins)',
      rate: 35,
      allocatedMins: 18,
      totalFee: 630,
      scheduledTime: 'Today at 02:15 PM',
    }
  ]);

  const filtered = consultations.filter(c => {
    const matchSearch = c.seekerName.toLowerCase().includes(search.toLowerCase()) ||
      c.topic.toLowerCase().includes(search.toLowerCase());
    if (filter === 'all') return matchSearch;
    return matchSearch && c.status === filter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header Info Banner */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '18px 20px',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#1E1B4B' }}>
              Approved Consultations Hub
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>
              Direct access to all verified seeker bookings, live chats, and calls
            </p>
          </div>
          <div
            style={{
              padding: '6px 12px',
              borderRadius: '999px',
              backgroundColor: '#DCFCE7',
              border: '1px solid #86EFAC',
              color: '#15803D',
              fontSize: '11px',
              fontWeight: '800',
              whiteSpace: 'nowrap',
            }}
          >
            ● 2 Ready to Connect
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #CBD5E1',
          borderRadius: '16px',
          padding: '10px 14px',
          gap: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        }}
      >
        <Search size={18} color="#64748B" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by seeker name or question..."
          style={{
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            width: '100%',
            fontSize: '13px',
            color: '#1E1B4B',
            fontWeight: '600',
          }}
        />
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {[
          { id: 'all', label: 'All Bookings' },
          { id: 'approved', label: 'Approved & Ready' },
          { id: 'scheduled', label: 'Scheduled' },
          { id: 'completed', label: 'Completed' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              border: filter === tab.id ? '1.5px solid #C85A32' : '1.5px solid #E2E8F0',
              backgroundColor: filter === tab.id ? '#C85A32' : '#FFFFFF',
              color: filter === tab.id ? '#FFFFFF' : '#475569',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: filter === tab.id ? '0 3px 10px rgba(200, 90, 50, 0.25)' : 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Approved Consultations List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.map((item) => {
          const isReady = item.status === 'approved';
          const isCompleted = item.status === 'completed';

          return (
            <div
              key={item.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '22px',
                padding: '18px',
                border: isReady ? '2px solid #FDBA74' : '1.5px solid #E2E8F0',
                boxShadow: isReady ? '0 8px 24px rgba(200, 90, 50, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Top Row: Seeker Avatar, Name, Status, Fee */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={item.avatar}
                    alt={item.seekerName}
                    style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2.5px solid #FCD34D' }}
                  />

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#1E1B4B' }}>{item.seekerName}</h4>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: '800',
                          backgroundColor: item.type === 'call' ? '#DCFCE7' : '#FEF3C7',
                          color: item.type === 'call' ? '#15803D' : '#92400E',
                          padding: '2px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        {item.type === 'call' ? '📞 Voice Call' : '💬 Live Chat'}
                      </span>
                    </div>

                    <p style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', fontWeight: '600' }}>
                      {item.rashi} • {item.nakshatra}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '17px', fontWeight: '900', color: '#C85A32' }}>
                    ₹{item.totalFee}
                  </span>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    ₹{item.rate}/m ({item.allocatedMins}m)
                  </div>
                </div>
              </div>

              {/* Inquiry Topic Box */}
              <div
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  fontSize: '12px',
                  color: '#334155',
                  border: '1px solid #E2E8F0',
                  lineHeight: 1.4,
                }}
              >
                <strong style={{ color: '#1E1B4B' }}>Question / Inquiry:</strong> {item.topic}
              </div>

              {/* Status and Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid #F1F5F9',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                {/* Status Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: isReady ? '#10B981' : isCompleted ? '#94A3B8' : '#3B82F6',
                    }}
                  />
                  <span style={{ fontSize: '11.5px', fontWeight: '800', color: isReady ? '#15803D' : '#475569' }}>
                    {item.statusLabel}
                  </span>
                </div>

                {/* Primary Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {/* View Kundli Button */}
                  <button
                    onClick={() => setSelectedKundliSeeker(item)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '12px',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid #CBD5E1',
                      color: '#475569',
                      fontSize: '12px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Compass size={14} color="#C85A32" />
                    <span>Kundli</span>
                  </button>

                  {/* Connect / Open Button */}
                  {isReady && (
                    <button
                      onClick={() => {
                        if (item.type === 'call' && onOpenCallSession) {
                          onOpenCallSession(item);
                        } else if (onOpenChatSession) {
                          onOpenChatSession(item);
                        }
                      }}
                      style={{
                        padding: '9px 18px',
                        borderRadius: '12px',
                        backgroundColor: item.type === 'call' ? '#15803D' : '#C85A32',
                        background: item.type === 'call' 
                          ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' 
                          : 'linear-gradient(135deg, #D46A43 0%, #C85A32 100%)',
                        border: 'none',
                        color: '#FFFFFF',
                        fontSize: '13px',
                        fontWeight: '900',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      {item.type === 'call' ? <Phone size={14} /> : <MessageSquare size={14} />}
                      <span>{item.type === 'call' ? 'Start Voice Call' : 'Start Live Chat'}</span>
                    </button>
                  )}

                  {isCompleted && (
                    <button
                      onClick={() => onOpenChatSession && onOpenChatSession(item)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '12px',
                        backgroundColor: '#F1F5F9',
                        border: '1px solid #CBD5E1',
                        color: '#334155',
                        fontSize: '12px',
                        fontWeight: '800',
                        cursor: 'pointer',
                      }}
                    >
                      View Transcript
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Kundli Inspection Modal */}
      {selectedKundliSeeker && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 110,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setSelectedKundliSeeker(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px',
              maxWidth: '420px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              border: '2px solid #FCD34D',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#1E1B4B' }}>
                  {selectedKundliSeeker.seekerName}'s Janam Kundli
                </h3>
                <p style={{ fontSize: '11px', color: '#64748B' }}>
                  {selectedKundliSeeker.dob} • {selectedKundliSeeker.pob}
                </p>
              </div>
              <button
                onClick={() => setSelectedKundliSeeker(null)}
                style={{ padding: '6px', borderRadius: '50%', border: 'none', backgroundColor: '#F1F5F9', cursor: 'pointer', color: '#64748B' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: '#334155', marginBottom: '14px' }}>
              <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <strong>Lagna:</strong> {selectedKundliSeeker.rashi}<br />
                <strong>Nakshatra:</strong> {selectedKundliSeeker.nakshatra}
              </div>
              <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <strong>Current Dasha:</strong> Guru / Rahu<br />
                <strong>Manglik Dosh:</strong> No (Shubh)
              </div>
            </div>

            <button
              onClick={() => {
                const s = selectedKundliSeeker;
                setSelectedKundliSeeker(null);
                if (s.type === 'call' && onOpenCallSession) onOpenCallSession(s);
                else if (onOpenChatSession) onOpenChatSession(s);
              }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #D46A43 0%, #C85A32 100%)',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '900',
                cursor: 'pointer',
              }}
            >
              Connect Session Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
