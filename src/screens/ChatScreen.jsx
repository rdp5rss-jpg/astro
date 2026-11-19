import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Clock, 
  Info, 
  PhoneOff, 
  Plus, 
  Sparkles, 
  Paperclip, 
  CheckCheck,
  ShieldCheck,
  X
} from 'lucide-react';

export default function ChatScreen({ astrologer, onBack }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'system',
      text: `🔒 256-bit Encrypted consultation started with ${astrologer.name}. Birth Kundli attached.`
    },
    {
      id: 2,
      sender: 'astrologer',
      time: 'Just now',
      text: `Namaste Rohan ji 🙏. I have opened your D1 Lagna Kundli (Gemini Ascendant) and your current Guru Mahadasha. I see Jupiter transiting strong in your house of fortune. What is the primary question or intention on your mind today?`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60); // 15 mins
  const [showDetails, setShowDetails] = useState(false);
  const messagesEndRef = useRef(null);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickQuestions = [
    'When will my career promote?',
    'Marriage timing & spouse nature?',
    'Which gemstone is auspicious for me?',
    'Any dosha remedies required?'
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate Astrologer reply
    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();
      if (lower.includes('career') || lower.includes('promote') || lower.includes('job')) {
        reply = `Looking at your 10th house of profession (Karma Bhava), Sun is in exalted Digbala. Around November 2026, Jupiter's beneficial aspect triggers a major leap or leadership recognition. Keep wearing Brass or Copper, and recite Aditya Hridaya Stotra on Sundays.`;
      } else if (lower.includes('marriage') || lower.includes('spouse') || lower.includes('love')) {
        reply = `In your D9 Navamsha chart, the 7th Lord Venus is placed in Pisces (Exalted). This points to an empathetic, creative, and spiritually inclined partner. Marriage prospects illuminate brightest between early 2027 and mid-2027.`;
      } else if (lower.includes('gemstone') || lower.includes('stone') || lower.includes('ring')) {
        reply = `Your most beneficial catalyst is a natural unheated Yellow Sapphire (Pukhraj), minimum 4.5 carats set in gold on your right hand index finger on a Thursday morning during Shukla Paksha.`;
      } else {
        reply = `According to your Janam Kundli, your planetary transits are supportive. Focus your intention with a calm mind, and chant 'Om Brihaspataye Namah' 108 times daily during this auspicious transition.`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'astrologer',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: reply
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleAddMinutes = () => {
    setSecondsRemaining(prev => prev + 5 * 60);
    alert('⏱️ Added 5 more minutes to your consultation session.');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-h-[850px] glass-card overflow-hidden relative">
      {/* Top Header */}
      <div className="p-3.5 bg-white/90 backdrop-blur border-b border-slate-200/80 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          
          <div className="relative">
            <img 
              src={astrologer.avatar} 
              alt={astrologer.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-amber-300"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800">{astrologer.name}</h3>
              <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded font-medium">Vedic Guru</span>
            </div>
            <p className="text-[11px] text-slate-500">{astrologer.specialty} • ₹{astrologer.rate}/min</p>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs font-bold">
            <Clock size={13} className="animate-spin" style={{ animationDuration: '6s' }} />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={handleAddMinutes}
            title="Add 5 Minutes"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
          >
            <Plus size={12} /> +5m
          </button>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
          >
            <Info size={17} />
          </button>

          <button
            onClick={onBack}
            title="End Session"
            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
          >
            <PhoneOff size={17} />
          </button>
        </div>
      </div>

      {/* Session Details Drawer */}
      {showDetails && (
        <div className="absolute top-16 right-4 z-30 w-80 glass-card p-4 shadow-xl border border-amber-200 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Session Details</h4>
            <button onClick={() => setShowDetails(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
              <X size={16} />
            </button>
          </div>
          <div className="mt-3 space-y-2 text-xs text-slate-600">
            <p><strong>Astrologer:</strong> {astrologer.name}</p>
            <p><strong>Experience:</strong> {astrologer.exp}</p>
            <p><strong>Rate:</strong> ₹{astrologer.rate}/min</p>
            <p><strong>Seeker:</strong> Rohan Sharma (15 May 1996)</p>
            <p><strong>Attached Kundli:</strong> D1 Lagna, D9 Navamsha, Vimshottari</p>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
              <ShieldCheck size={14} /> End-to-end Vedic Confidentiality
            </div>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
        {messages.map((m) => {
          if (m.sender === 'system') {
            return (
              <div key={m.id} className="text-center my-2">
                <span className="text-[11px] text-slate-500 bg-white/80 border border-slate-200/80 px-3 py-1 rounded-full shadow-2xs">
                  {m.text}
                </span>
              </div>
            );
          }

          const isMe = m.sender === 'user';
          return (
            <div 
              key={m.id} 
              className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end gap-2`}
            >
              {!isMe && (
                <img 
                  src={astrologer.avatar} 
                  alt="" 
                  className="w-7 h-7 rounded-full object-cover border border-amber-300 mb-1 flex-shrink-0"
                />
              )}
              <div 
                className={`max-w-[80%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isMe 
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-br-xs shadow-sm' 
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs shadow-xs'
                }`}
              >
                <p>{m.text}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isMe ? 'text-amber-100' : 'text-slate-400'}`}>
                  <span>{m.time}</span>
                  {isMe && <CheckCheck size={12} />}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-500 text-xs italic pl-9">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            {astrologer.name} is studying your chart transits...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="p-2 bg-white/80 border-t border-slate-200/60 overflow-x-auto flex gap-2 no-scrollbar">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="flex-shrink-0 text-[11px] font-medium text-slate-700 bg-amber-50/70 hover:bg-amber-100/90 border border-amber-200/70 px-3 py-1 rounded-full transition-all cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Bottom Input Area */}
      <div className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2">
        <button 
          onClick={() => alert('📎 Janam Kundli & Ephemeris degree attachments are already synced with this session.')}
          className="p-2 text-slate-400 hover:text-amber-600 transition-colors cursor-pointer"
          title="Attach Kundli Document"
        >
          <Paperclip size={18} />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Ask ${astrologer.name} anything about your destiny...`}
          className="flex-1 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-slate-800"
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-40 text-white shadow-sm transition-all cursor-pointer"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
