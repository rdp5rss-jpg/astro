import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Compass, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ChevronRight,
  Gem,
  Sun,
  Flame,
  Award
} from 'lucide-react';
import KundliChart from '../components/KundliChart';

export default function KundliScreen({ onConsultClick }) {
  const [activeChart, setActiveChart] = useState('D1'); // 'D1' | 'D9' | 'MOON'
  const [selectedHouse, setSelectedHouse] = useState(1);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('🌟 Your Complete Vedic Kundli Report (42 Pages) has been generated successfully!');
    }, 1200);
  };

  const chartInfo = {
    D1: { title: 'Lagna (Natal) Chart', desc: 'Core soul path, physical body, vitality & karma outline.' },
    D9: { title: 'Navamsha Chart', desc: 'D-9 divisional chart showing marriage, spouse, spiritual destiny & late-life dharma.' },
    MOON: { title: 'Chandra (Moon) Chart', desc: 'Mental stability, perception, emotional wellbeing & emotional response.' },
  };

  const planets = [
    { name: 'Sun (Surya)', sign: 'Aries', deg: '14° 28\'', nakshatra: 'Bharani 1', status: 'Exalted 👑', color: 'text-amber-500' },
    { name: 'Moon (Chandra)', sign: 'Cancer', deg: '22° 10\'', nakshatra: 'Ashlesha 2', status: 'Own Sign 🌙', color: 'text-blue-500' },
    { name: 'Mars (Mangal)', sign: 'Scorpio', deg: '08° 45\'', nakshatra: 'Anuradha 3', status: 'Own Sign ⚔️', color: 'text-rose-500' },
    { name: 'Mercury (Budha)', sign: 'Gemini', deg: '18° 50\'', nakshatra: 'Ardra 4', status: 'Own Sign 🧠', color: 'text-emerald-500' },
    { name: 'Jupiter (Guru)', sign: 'Pisces', deg: '11° 12\'', nakshatra: 'U. Bhadra', status: 'Own Sign 🕉️', color: 'text-amber-600' },
    { name: 'Venus (Shukra)', sign: 'Pisces', deg: '27° 05\'', nakshatra: 'Revati 4', status: 'Exalted 💎', color: 'text-pink-500' },
    { name: 'Saturn (Shani)', sign: 'Aquarius', deg: '04° 30\'', nakshatra: 'Shatabhisha', status: 'Moolatrikona ⚖️', color: 'text-indigo-500' },
    { name: 'Rahu', sign: 'Taurus', deg: '15° 18\'', nakshatra: 'Rohini 2', status: 'Exalted 🐉', color: 'text-purple-500' },
    { name: 'Ketu', sign: 'Scorpio', deg: '15° 18\'', nakshatra: 'Anuradha 4', status: 'Exalted ☄️', color: 'text-slate-500' }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner / Identity */}
      <div className="glass-card-amber p-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-200">
                Verified Vedic Kundli
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-600" /> Lahiri Ayanamsha
              </span>
            </div>
            <h1 className="text-2xl font-bold font-serif text-slate-800">
              Rohan Sharma's Birth Horoscope
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              📅 15 May 1996 • 09:45 AM • New Delhi, India • Ascendant: Gemini (Mithuna)
            </p>
          </div>

          <button 
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-md transition-all self-start md:self-auto cursor-pointer"
          >
            <Download size={14} className={downloading ? 'animate-bounce' : ''} />
            {downloading ? 'Compiling Dossier...' : 'Download Kundli PDF (42 Pages)'}
          </button>
        </div>
      </div>

      {/* Chart Selector Segment */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Compass size={18} className="text-amber-500" />
              Interactive North Indian Vedic Chart
            </h2>
            <p className="text-xs text-slate-500">
              {chartInfo[activeChart].title} — {chartInfo[activeChart].desc}
            </p>
          </div>

          {/* Segmented Controls */}
          <div className="flex p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 self-start sm:self-auto">
            <button
              onClick={() => setActiveChart('D1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeChart === 'D1' 
                  ? 'bg-white text-amber-700 shadow-sm border border-amber-200' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              D-1 Lagna
            </button>
            <button
              onClick={() => setActiveChart('D9')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeChart === 'D9' 
                  ? 'bg-white text-amber-700 shadow-sm border border-amber-200' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              D-9 Navamsha
            </button>
            <button
              onClick={() => setActiveChart('MOON')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeChart === 'MOON' 
                  ? 'bg-white text-amber-700 shadow-sm border border-amber-200' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Chandra (Moon)
            </button>
          </div>
        </div>

        {/* Visual Chart with Diamond Canvas */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 p-2">
          <div className="w-full max-w-md flex justify-center">
            <KundliChart activeChart={activeChart} onSelectHouse={setSelectedHouse} selectedHouse={selectedHouse} />
          </div>

          {/* Selected House Insight */}
          <div className="w-full lg:w-72 bg-gradient-to-br from-amber-50/70 via-white to-slate-50/80 p-4 rounded-2xl border border-amber-200/60 shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-200/40">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                House {selectedHouse} Focus
              </span>
              <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                Active
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-800">
              {selectedHouse === 1 ? '1st House — Tanu Bhava (Self & Identity)' :
               selectedHouse === 7 ? '7th House — Jaya Bhava (Partnerships & Marriage)' :
               selectedHouse === 10 ? '10th House — Karma Bhava (Career & Status)' :
               selectedHouse === 5 ? '5th House — Putra Bhava (Intellect & Speculation)' :
               selectedHouse === 9 ? '9th House — Dharma Bhava (Fortune & Higher Wisdom)' :
               `House ${selectedHouse} Vedic Influences`}
            </h4>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {selectedHouse === 1 ? 'Ascendant in Gemini creates quick wit, adaptability, and intellectual curiosity. Lord Mercury resides strongly in Lagna.' :
               selectedHouse === 7 ? 'Jupiter casts an auspicious 5th aspect here, ensuring a loyal, spiritually grounded spouse with strong ethical bearings.' :
               selectedHouse === 10 ? 'Sun in 10th Digbala produces formidable leadership capabilities and high professional respect in technology or consulting.' :
               selectedHouse === 5 ? 'Strong Venusian rays grant artistic flair, sharp intuition, and prosperous creative endeavors.' :
               'Planetary currents in this quadrant support steady long-term karma.'}
            </p>
            <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-amber-700 font-medium">
              <span>Lord: {selectedHouse % 2 === 0 ? 'Venus / Shukra' : 'Mercury / Budha'}</span>
              <button 
                onClick={() => onConsultClick && onConsultClick()} 
                className="text-[11px] underline font-bold cursor-pointer hover:text-amber-800"
              >
                Deep Consultation →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vimshottari Mahadasha Timeline */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-amber-600" />
            <h3 className="text-sm font-bold text-slate-800">
              Current Vimshottari Mahadasha
            </h3>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Highly Auspicious
          </span>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-300/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Active Period</span>
              <h4 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                Guru Mahadasha (Jupiter) — Shani Antardasha (Saturn)
              </h4>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-xs font-bold text-amber-800">Active until 18 Nov 2031</span>
              <p className="text-[11px] text-slate-500">64% Completed • Turning Point Year 2026</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-200/80 rounded-full h-2.5 mt-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500 h-2.5 rounded-full transition-all duration-1000"
              style={{ width: '64%' }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2">
            <span>Started: March 2015</span>
            <span className="font-medium text-slate-700">Next: Budha Mahadasha (17 Years)</span>
          </div>
        </div>
      </div>

      {/* Vedic Dosha & Raja Yoga Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Yogas */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3">
            <Award size={18} className="text-amber-500" />
            Active Auspicious Yogas (Raj Yogas)
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-700 mt-0.5">
                <Sparkles size={16} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800">Gajakesari Yoga</h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    Strong (92%)
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Jupiter in Kendra from Chandra. Bestows lasting respect, mental clarity, and protection in times of crisis.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70 flex items-start gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-700 mt-0.5">
                <Sun size={16} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800">Budhaditya Yoga</h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    Active (88%)
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Sun and Mercury conjunction in 10th house. Gives administrative prowess, persuasive speech, and high intellect.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Doshas & Remedies */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3">
            <ShieldCheck size={18} className="text-emerald-600" />
            Vedic Dosha Screening & Remedies
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">Kaal Sarp Dosha: Completely Absent</h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Planets are unbound by the Rahu-Ketu axis. No obstruction to karmic growth.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-start gap-3">
              <AlertTriangle size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800">Manglik Dosha: Mild (Anshik - 18%)</h4>
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                    Remedy Available
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Mars aspect is softened by Jupiter's Drishti. Reciting Hanuman Chalisa on Tuesdays neutralizes residual heat.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-800">Sade Sati: Phase Finished</h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Saturn has transitioned into an uplifting trine position. Financial stability returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auspicious Catalysts Matrix */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
          <Gem size={18} className="text-amber-500" />
          Personal Auspicious Catalysts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Lucky Gemstone</span>
            <p className="text-xs font-bold text-amber-700 mt-1">Yellow Sapphire (Pukhraj)</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Auspicious Day</span>
            <p className="text-xs font-bold text-slate-800 mt-1">Thursday & Monday</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Harmonious Color</span>
            <p className="text-xs font-bold text-slate-800 mt-1">Saffron & Pearl White</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Lucky Numbers</span>
            <p className="text-xs font-bold text-slate-800 mt-1">3, 7, 9</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Ruling Deity</span>
            <p className="text-xs font-bold text-amber-700 mt-1">Lord Shiva & Brihaspati</p>
          </div>
        </div>
      </div>

      {/* Planetary Degrees & Nakshatra Breakdown Table */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Planetary Ephemeris & Nakshatra Positions
            </h3>
            <p className="text-xs text-slate-500">Degree-level calculations based on Swiss Ephemeris 2026</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Graha (Planet)</th>
                <th className="py-2.5 px-3">Rashi (Zodiac)</th>
                <th className="py-2.5 px-3">Exact Degree</th>
                <th className="py-2.5 px-3">Nakshatra & Pada</th>
                <th className="py-2.5 px-3 text-right">Dignity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {planets.map((p, idx) => (
                <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                  <td className={`py-2.5 px-3 font-semibold ${p.color}`}>
                    {p.name}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 font-medium">
                    {p.sign}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">
                    {p.deg}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">
                    {p.nakshatra}
                  </td>
                  <td className="py-2.5 px-3 text-right font-medium text-slate-700">
                    {p.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
