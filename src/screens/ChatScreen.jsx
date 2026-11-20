import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Info, 
  Square, 
  Send, 
  Check, 
  X, 
  Camera, 
  Image as ImageIcon, 
  FileText, 
  Wallet,
  PhoneOff
} from 'lucide-react';

export default function ChatScreen({ astrologer, onBack }) {
  const [secondsRemaining, setSecondsRemaining] = useState(4 * 60 + 50); // 04:50 left matching screenshot
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [showDetailsSheet, setShowDetailsSheet] = useState(false);
  const [showTypingSheet, setShowTypingSheet] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, type: 'status', text: `${astrologer.name} joined the chat` },
    { 
      id: 2, 
      type: 'astro', 
      text: `Hello Mahi Ji Radhe Radhe kaisi Hain Kya Janna chahti hain aap`, 
      time: '04:37 pm' 
    },
    { 
      id: 3, 
      type: 'user', 
      text: 'Hi', 
      time: '04:37 pm' 
    }
  ]);
  const messagesEndRef = useRef(null);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} left`;
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userText = inputText;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();

    setMessages(prev => [
      ...prev,
      { id: Date.now(), type: 'user', text: userText, time: now }
    ]);
    setInputText('');

    // Trigger typing sheet after short delay
    setTimeout(() => {
      setShowTypingSheet(true);
    }, 600);

    // Astro response after 2.5s
    setTimeout(() => {
      setShowTypingSheet(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'astro',
          text: `Mahi ji, aapki Kundli mein Guru ki dasha bohot shubh hai. October 2026 se career mein naye yoga ban rahe hain.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()
        }
      ]);
    }, 2800);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      {/* Top App Bar - Simple, Premium & Responsive One-Line Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px clamp(10px, 3vw, 16px)',
        borderBottom: '1px solid #F1F5F9',
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
        gap: '8px',
      }}>
        {/* Left: Back button + Avatar + Astrologer Name in ONE single line */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(6px, 2vw, 10px)',
          minWidth: 0,
          flex: 1,
        }}>
          <button
            onClick={onBack}
            style={{
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: '#F8FAFC',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: '#1E1B4B',
            }}
            aria-label="Back"
          >
            <ArrowLeft size={19} color="#1E1B4B" />
          </button>

          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img
              src={astrologer.avatar}
              alt={astrologer.name}
              style={{
                width: 'clamp(36px, 9vw, 40px)',
                height: 'clamp(36px, 9vw, 40px)',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid #FCD34D',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: '0px',
                right: '0px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                border: '1.5px solid #FFFFFF',
              }}
            />
          </div>

          {/* Name & Timer: STRICT ONE LINE FOR NAME */}
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              minWidth: 0,
            }}>
              <span
                style={{
                  fontSize: 'clamp(13px, 3.6vw, 15px)',
                  fontWeight: '800',
                  color: '#1E1B4B',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: 1.2,
                  display: 'block',
                }}
              >
                {astrologer.name}
              </span>
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  fontWeight: '900',
                  flexShrink: 0,
                }}
                title="Verified Astrologer"
              >
                ✓
              </span>
            </div>

            <div style={{
              fontSize: '11px',
              color: '#059669',
              fontWeight: '700',
              lineHeight: 1.2,
              marginTop: '1px',
              whiteSpace: 'nowrap',
            }}>
              {formatTime(secondsRemaining)}
            </div>
          </div>
        </div>

        {/* Right actions: Simple & Premium End pill button + Info circle button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(6px, 1.8vw, 10px)',
          flexShrink: 0,
        }}>
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px clamp(10px, 2.5vw, 14px)',
              borderRadius: '20px',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#DC2626',
              fontSize: 'clamp(11px, 2.8vw, 12.5px)',
              fontWeight: '800',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 1px 3px rgba(220, 38, 38, 0.08)',
              transition: 'all 0.15s ease',
            }}
          >
            <span style={{ width: '6px', height: '6px', backgroundColor: '#DC2626', borderRadius: '1.5px', flexShrink: 0 }} />
            <span>End</span>
          </button>

          <button
            onClick={() => setShowDetailsSheet(true)}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              border: '1px solid #E2E8F0',
              backgroundColor: '#F8FAFC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label="Astrologer Info"
          >
            <Info size={17} />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area matching reference photo */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: '#FFFFFF',
      }}>
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '600' }}>Today</span>
        </div>

        {messages.map((m) => {
          if (m.type === 'status') {
            return (
              <div key={m.id} style={{ textAlign: 'center', margin: '4px 0 10px' }}>
                <span style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  backgroundColor: '#FFF1EE',
                  color: '#C85A32',
                  fontSize: '12.5px',
                  fontWeight: '700',
                }}>
                  {m.text}
                </span>
              </div>
            );
          }

          if (m.type === 'astro') {
            return (
              <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '82%' }}>
                <div style={{
                  padding: '14px 16px',
                  borderRadius: '20px 20px 20px 4px',
                  backgroundColor: '#F1F5F9',
                  color: '#1E1B4B',
                  fontSize: '15px',
                  lineHeight: '1.4',
                  fontWeight: '500',
                }}>
                  {m.text}
                </div>
                <span style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px', marginLeft: '6px' }}>
                  {m.time}
                </span>
              </div>
            );
          }

          if (m.type === 'user') {
            return (
              <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', alignSelf: 'flex-end', maxWidth: '82%' }}>
                <div style={{
                  padding: '14px 18px',
                  borderRadius: '20px 20px 4px 20px',
                  backgroundColor: '#C85A32',
                  color: '#FFFFFF',
                  fontSize: '15px',
                  lineHeight: '1.4',
                  fontWeight: '500',
                }}>
                  {m.text}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px', marginRight: '6px', fontSize: '11px', color: '#94A3B8' }}>
                  <span>{m.time}</span>
                  <Check size={13} color="#C85A32" />
                </div>
              </div>
            );
          }
          return null;
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Message Input Bar matching reference */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px 24px',
        borderTop: '1px solid #F1F5F9',
        backgroundColor: '#FFFFFF',
      }}>
        {/* Plus button -> opens Add to Chat bottom sheet */}
        <button
          onClick={() => setShowAddSheet(true)}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#F8FAFC',
            border: '1.5px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569',
            cursor: 'pointer',
          }}
        >
          <Plus size={22} />
        </button>

        {/* Text Input Capsule */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: '35px',
          padding: '6px 18px',
        }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Write a message..."
            style={{
              flex: 1,
              padding: '8px 0',
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              color: '#1E1B4B',
              backgroundColor: 'transparent',
            }}
          />
          {inputText.trim() && (
            <button onClick={handleSend} style={{ cursor: 'pointer', color: '#C85A32', marginLeft: '6px' }}>
              <Send size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Sheet 1: Add to Chat matching WhatsApp Image 2026-11-19 at 4.39.12 PM (1).jpeg */}
      {showAddSheet && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 80,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '30px 30px 0 0',
            padding: '24px 20px 36px',
            boxShadow: '0 -10px 35px rgba(0, 0, 0, 0.15)',
          }}>
            <div style={{ width: '40px', height: '4px', backgroundColor: '#CBD5E1', borderRadius: '2px', margin: '0 auto 16px' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1E1B4B' }}>Add to chat</h3>
              <button onClick={() => setShowAddSheet(false)} style={{ cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
              <div
                onClick={() => { setShowAddSheet(false); alert('📸 Camera opened'); }}
                style={{
                  padding: '18px 10px',
                  borderRadius: '20px',
                  border: '1.5px solid #E2E8F0',
                  textAlign: 'center',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#FFE4E6', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Camera size={22} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#1E1B4B' }}>Camera</span>
              </div>

              <div
                onClick={() => { setShowAddSheet(false); alert('🖼️ Upload image selected'); }}
                style={{
                  padding: '18px 10px',
                  borderRadius: '20px',
                  border: '1.5px solid #E2E8F0',
                  textAlign: 'center',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ImageIcon size={22} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#1E1B4B' }}>Upload image</span>
              </div>

              <div
                onClick={() => { setShowAddSheet(false); alert('🔮 Janam Kundli shared to chat'); }}
                style={{
                  padding: '18px 10px',
                  borderRadius: '20px',
                  border: '1.5px solid #E2E8F0',
                  textAlign: 'center',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#FFEDD5', color: '#C85A32', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={22} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#1E1B4B' }}>Send a kundli</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sheet 2: Session details matching WhatsApp Image 2026-11-19 at 4.39.12 PM (2).jpeg */}
      {showDetailsSheet && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 80,
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '30px 30px 0 0',
            padding: '24px 20px 36px',
            boxShadow: '0 -10px 35px rgba(0, 0, 0, 0.15)',
          }}>
            <div style={{ width: '40px', height: '4px', backgroundColor: '#CBD5E1', borderRadius: '2px', margin: '0 auto 16px' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1E1B4B' }}>Session details</h3>
              <button onClick={() => setShowDetailsSheet(false)} style={{ cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderBottom: '1px solid #F1F5F9', paddingBottom: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#64748B' }}>Rate</span>
                <span style={{ fontWeight: '800', color: '#1E1B4B' }}>₹{astrologer.rate}.00 / min</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#64748B' }}>Free minutes</span>
                <span style={{ fontWeight: '800', color: '#1E1B4B' }}>1 min · ₹0.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#64748B' }}>Minutes billed</span>
                <span style={{ fontWeight: '800', color: '#1E1B4B' }}>0 min · ₹0.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#64748B' }}>Wallet balance</span>
                <span style={{ fontWeight: '800', color: '#1E1B4B' }}>₹185.00</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => { setShowDetailsSheet(false); alert('💳 Recharge Pack added'); }}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '35px',
                  border: '1.5px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  color: '#1E1B4B',
                  fontSize: '15px',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                <Wallet size={18} />
                <span>Top up wallet</span>
              </button>

              <button
                onClick={onBack}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '35px',
                  backgroundColor: '#FEE2E2',
                  border: 'none',
                  color: '#B91C1C',
                  fontSize: '15px',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                <PhoneOff size={18} />
                <span>End chat</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sheet 3: Astrologer is typing matching WhatsApp Image 2026-11-19 at 4.39.13 PM.jpeg */}
      {showTypingSheet && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 80,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '30px 30px 0 0',
            padding: '24px 20px 36px',
            boxShadow: '0 -10px 35px rgba(0, 0, 0, 0.15)',
            textAlign: 'center',
          }}>
            <div style={{ width: '40px', height: '4px', backgroundColor: '#CBD5E1', borderRadius: '2px', margin: '0 auto 16px' }} />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowTypingSheet(false)} style={{ cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            {/* Avatar with Typing Bubble */}
            <div style={{ position: 'relative', width: '64px', height: '64px', margin: '0 auto 14px' }}>
              <img
                src={astrologer.avatar}
                alt={astrologer.name}
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '-4px',
                right: '-24px',
                backgroundColor: '#F1F5F9',
                borderRadius: '16px',
                padding: '4px 10px',
                display: 'flex',
                gap: '3px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#64748B', animation: 'pulseGlow 1s infinite' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#64748B', animation: 'pulseGlow 1.2s infinite' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#64748B', animation: 'pulseGlow 1.4s infinite' }} />
              </div>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1E1B4B' }}>
              {astrologer.name} is typing an answer
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', marginBottom: '24px' }}>
              Stay a moment to read it.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => setShowTypingSheet(false)}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '35px',
                  backgroundColor: '#C85A32',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: '800',
                  cursor: 'pointer',
                }}
              >
                Keep chatting
              </button>

              <button
                onClick={onBack}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '35px',
                  backgroundColor: '#FEE2E2',
                  border: 'none',
                  color: '#B91C1C',
                  fontSize: '15px',
                  fontWeight: '800',
                  cursor: 'pointer',
                }}
              >
                End chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
