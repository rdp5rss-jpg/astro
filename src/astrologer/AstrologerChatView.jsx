import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Square, 
  FileText, 
  Sparkles, 
  Clock, 
  User, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2,
  Compass,
  Coins
} from 'lucide-react';
import KundliChart from '../components/KundliChart';

export default function AstrologerChatView({ 
  consultation, 
  onClose,
  astrologerRate = 35 
}) {
  const seeker = consultation || {
    seekerName: 'Mahi Sharma',
    rashi: 'Mithuna (Gemini)',
    nakshatra: 'Punarvasu',
    topic: 'Career Transition & Rahu Dasha',
    dob: '14 April 1994',
    tob: '04:15 PM',
    pob: 'New Delhi, India',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  };

  const [seconds, setSeconds] = useState(132); // 2m 12s active
  const [showKundliDrawer, setShowKundliDrawer] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'system', text: `Session initiated with ${seeker.seekerName}. Rate: ₹${astrologerRate}/min.` },
    { id: 2, sender: 'seeker', text: 'Pranam Guruji! Radhe Radhe. I want to ask about my career transition.', time: '04:36 pm' },
    { id: 3, sender: 'astro', text: 'Radhe Radhe Mahi Ji. I have opened your Janam Kundli. Let me check your 10th house.', time: '04:37 pm' },
    { id: 4, sender: 'seeker', text: 'Will October 2026 bring the new job opportunity?', time: '04:38 pm' },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const earnedAmount = Math.ceil((seconds / 60) * astrologerRate);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
    setMessages(prev => [...prev, { id: Date.now(), sender: 'astro', text: inputText, time: now }]);
    setInputText('');
  };

  const sendQuickRemedy = (text) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
    setMessages(prev => [...prev, { id: Date.now(), sender: 'astro', text: `✨ Vedic Remedy: ${text}`, time: now }]);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Top Session Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1.5px solid #F1F5F9',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{ padding: '6px', borderRadius: '50%', border: 'none', backgroundColor: '#F8FAFC', cursor: 'pointer' }}
          >
            <ArrowLeft size={18} color="#1E1B4B" />
          </button>

          <img
            src={seeker.avatar}
            alt={seeker.seekerName}
            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #FCD34D' }}
          />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#1E1B4B' }}>{seeker.seekerName}</h4>
              <span style={{ fontSize: '10px', color: '#10B981', fontWeight: '800' }}>● Live</span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>
              {formatTimer(seconds)} • <span style={{ color: '#C85A32', fontWeight: '800' }}>+₹{earnedAmount}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Toggle Kundli Drawer Button */}
          <button
            onClick={() => setShowKundliDrawer(prev => !prev)}
            style={{
              padding: '7px 12px',
              borderRadius: '999px',
              backgroundColor: showKundliDrawer ? '#FFF7ED' : '#F1F5F9',
              border: showKundliDrawer ? '1px solid #FDBA74' : '1px solid #E2E8F0',
              color: showKundliDrawer ? '#C85A32' : '#475569',
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
            {showKundliDrawer ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {/* End Consultation Button */}
          <button
            onClick={onClose}
            style={{
              padding: '7px 14px',
              borderRadius: '999px',
              backgroundColor: '#FEE2E2',
              border: '1px solid #FECACA',
              color: '#DC2626',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
            }}
          >
            End
          </button>
        </div>
      </div>

      {/* Slide-Down Seeker Kundli Drawer */}
      {showKundliDrawer && (
        <div
          style={{
            backgroundColor: '#FAF5FF',
            borderBottom: '2px solid #E9D5FF',
            padding: '14px 16px',
            maxHeight: '40vh',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#6B21A8' }}>
              📜 {seeker.seekerName}'s Natal Kundli Specs
            </span>
            <span style={{ fontSize: '11px', color: '#7E22CE' }}>
              DOB: {seeker.dob || '14-Apr-1994'} ({seeker.tob || '16:15'})
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px', color: '#4C1D95' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '8px', borderRadius: '10px', border: '1px solid #E9D5FF' }}>
              <strong>Lagna:</strong> Mithuna (Gemini)<br />
              <strong>Moon Sign:</strong> Karka (Cancer)
            </div>
            <div style={{ backgroundColor: '#FFFFFF', padding: '8px', borderRadius: '10px', border: '1px solid #E9D5FF' }}>
              <strong>Current Dasha:</strong> Guru / Rahu<br />
              <strong>Manglik:</strong> No (Shubh)
            </div>
          </div>

          {/* Quick Vedic Remedies Shortcuts */}
          <div style={{ marginTop: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#6B21A8', marginBottom: '6px' }}>
              Quick Remedy Prescriptions (Tap to send):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[
                'Offer water to Surya at sunrise',
                'Wear Yellow Sapphire (Pukhraj) on index finger',
                'Chant Gayatri Mantra 108 times on Thursdays',
                'Feed green grass to cows on Wednesdays'
              ].map((rem, idx) => (
                <button
                  key={idx}
                  onClick={() => sendQuickRemedy(rem)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D8B4FE',
                    fontSize: '10px',
                    color: '#6B21A8',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  + {rem}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages Scroll Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          backgroundColor: '#F8FAFC',
        }}
      >
        {messages.map((msg) => {
          if (msg.sender === 'system') {
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  border: '1px solid #FCD34D',
                }}
              >
                {msg.text}
              </div>
            );
          }

          const isAstro = msg.sender === 'astro';
          return (
            <div
              key={msg.id}
              style={{
                alignSelf: isAstro ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isAstro ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: isAstro ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  backgroundColor: isAstro ? '#C85A32' : '#FFFFFF',
                  color: isAstro ? '#FFFFFF' : '#1E1B4B',
                  fontSize: '13.5px',
                  lineHeight: '1.4',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  border: isAstro ? 'none' : '1px solid #E2E8F0',
                }}
              >
                {msg.text}
              </div>
              <span style={{ fontSize: '10px', color: '#94A3B8', marginTop: '3px' }}>
                {msg.time}
              </span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Composer */}
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #F1F5F9',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Type guidance for ${seeker.seekerName}...`}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '24px',
            backgroundColor: '#F1F5F9',
            border: '1.5px solid transparent',
            outline: 'none',
            fontSize: '14px',
            color: '#1E1B4B',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#C85A32')}
          onBlur={(e) => (e.target.style.borderColor = 'transparent')}
        />

        <button
          onClick={handleSend}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: '#C85A32',
            border: 'none',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(200, 90, 50, 0.3)',
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
