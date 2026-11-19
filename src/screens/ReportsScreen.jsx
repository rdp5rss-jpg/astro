import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Download, 
  Clock, 
  Star, 
  ShieldCheck, 
  ChevronRight,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export default function ReportsScreen({ onConsultClick }) {
  const [activeTab, setActiveTab] = useState('dossier'); // 'dossier' | 'saved'
  const [unlocked, setUnlocked] = useState(false);
  const [processing, setProcessing] = useState(false);

  const dossierPages = [
    { page: 1, title: 'Soul Mission & Lagna Blueprint', desc: 'Core personality traits, hidden strengths & soul evolution markers.' },
    { page: 2, title: 'Career Acceleration & Wealth Periods (2026–2035)', desc: 'High-earning windows, favorable job transitions & investment cycles.' },
    { page: 3, title: 'Soulmate Timing, Marriage & Compatibility', desc: 'Detailed partner analysis, auspicious timing for union & marital harmony.' },
    { page: 4, title: 'Hidden Dosha Neutralization Plan', desc: 'Remedies for Sade Sati, Mangal Dosha, and planetary afflictions.' },
    { page: 5, title: 'Vitality, Health & Prana Chakras', desc: 'Seasonal vulnerability analysis and Ayurvedic balancing guidelines.' },
    { page: 6, title: 'Auspicious Gemstones & Sacred Rudraksha', desc: 'Consecrated gemstone recommendation with carat, metal and mantra.' },
    { page: 7, title: '5-Year Year-by-Year Predictions (2026–2030)', desc: 'Quarterly breakdown of transit Saturn, Jupiter and Rahu effects.' },
    { page: 8, title: 'Bespoke Vedic Mantras & Daily Rituals', desc: 'Personalized Beej mantras and morning rituals to invoke divine grace.' }
  ];

  const handleUnlock = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setUnlocked(true);
      alert('🎉 2026 Destiny Dossier Unlocked! Your personalized 8-page dossier is being prepared.');
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Hero Banner */}
      <div className="glass-card-amber p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-200">
                ⭐ Flagship Astro Dossier
              </span>
              <span className="text-xs text-amber-800 flex items-center gap-1 font-medium">
                <Star size={13} className="fill-amber-500 text-amber-500" /> 4.98 (18,400+ seekers)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-800 leading-tight">
              2026 Complete Life & Destiny Dossier
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Hand-computed and consecrated by <span className="font-semibold text-amber-900">Acharya Sandhya (32 yrs exp)</span>. 
              8 deep-dive chapters uncovering your next decade of wealth, marriage, and spiritual elevation.
            </p>
          </div>

          <div className="p-4 bg-white/90 backdrop-blur rounded-2xl border border-amber-200 shadow-md flex flex-col items-center min-w-[200px]">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Limited Offer</span>
            <div className="flex items-baseline gap-2 my-1">
              <span className="text-2xl font-bold text-amber-700">₹299</span>
              <span className="text-xs text-slate-400 line-through">₹1,499</span>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">80% OFF</span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3 text-center">Delivered in 4 Hours on WhatsApp & PDF</p>
            
            <button
              onClick={handleUnlock}
              disabled={processing || unlocked}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                unlocked
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
              }`}
            >
              {unlocked ? (
                <>
                  <CheckCircle2 size={15} /> Unlocked • Ready to View
                </>
              ) : processing ? (
                'Processing...'
              ) : (
                <>
                  <Sparkles size={15} /> Unlock Dossier (₹299)
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200/80 gap-6">
        <button
          onClick={() => setActiveTab('dossier')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer ${
            activeTab === 'dossier'
              ? 'border-amber-600 text-amber-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          📖 8-Page Dossier Blueprint
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer ${
            activeTab === 'saved'
              ? 'border-amber-600 text-amber-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          📂 My Saved Reports (2)
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'dossier' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dossierPages.map((p) => (
              <div 
                key={p.page}
                className="glass-card p-4 hover:shadow-md transition-all flex items-start gap-3.5 group"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-300/40 flex items-center justify-center font-bold text-xs text-amber-700 flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  0{p.page}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                      {p.title}
                    </h3>
                    {unlocked ? (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 size={11} /> Unlocked
                      </span>
                    ) : (
                      <Lock size={13} className="text-slate-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dossier Guarantee Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="glass-card p-4 text-center">
              <ShieldCheck size={24} className="text-emerald-600 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-slate-800">100% Human Astrologer Verified</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                No generic automated printouts. Every transit is scrutinized by certified acharyas.
              </p>
            </div>
            <div className="glass-card p-4 text-center">
              <Clock size={24} className="text-amber-500 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-slate-800">Express 4-Hour Delivery</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Directly sent to your WhatsApp number and archived in your BHAVISHYAA cloud vault.
              </p>
            </div>
            <div className="glass-card p-4 text-center">
              <BookOpen size={24} className="text-indigo-600 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-slate-800">Free 1-on-1 Clarification Chat</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                Includes a 15-minute free follow-up chat session to answer questions about the dossier.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Saved Reports */
        <div className="space-y-4">
          <div className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Janam Kundli Baseline Analysis 2026</h4>
                <p className="text-xs text-slate-500">Generated on 12 Nov 2026 • 24 Pages • PDF (3.4 MB)</p>
              </div>
            </div>
            <button 
              onClick={() => alert('📥 Downloading Janam Kundli Baseline Report...')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all self-start sm:self-auto cursor-pointer"
            >
              <Download size={14} /> Download PDF
            </button>
          </div>

          <div className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-700">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Kundli Milan (Marriage Compatibility) Report</h4>
                <p className="text-xs text-slate-500">Generated on 28 Oct 2026 • Rohan & Priya • 31/36 Gunas</p>
              </div>
            </div>
            <button 
              onClick={() => alert('📥 Downloading Kundli Milan Compatibility Report...')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all self-start sm:self-auto cursor-pointer"
            >
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
