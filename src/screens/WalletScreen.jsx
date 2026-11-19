import React, { useState } from 'react';
import { 
  Coins, 
  Plus, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Users, 
  HelpCircle, 
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Trash2
} from 'lucide-react';

export default function WalletScreen({ onClose }) {
  const [balance, setBalance] = useState(185);
  const [selectedPack, setSelectedPack] = useState(250);
  const [profiles, setProfiles] = useState([
    { id: 1, name: 'Rohan Sharma (Self)', rashi: 'Mithuna (Gemini)', relation: 'Primary' },
    { id: 2, name: 'Priya Sharma (Spouse)', rashi: 'Tula (Libra)', relation: 'Spouse' },
    { id: 3, name: 'Sunita Sharma (Mother)', rashi: 'Karka (Cancer)', relation: 'Family' },
  ]);
  const [recharging, setRecharging] = useState(false);

  const rechargePacks = [
    { amount: 100, bonus: 20, total: 120, badge: null },
    { amount: 250, bonus: 65, total: 315, badge: 'MOST POPULAR' },
    { amount: 500, bonus: 150, total: 650, badge: 'BEST VALUE' },
    { amount: 1000, bonus: 350, total: 1350, badge: 'VIP SEEKER' },
  ];

  const handleRecharge = () => {
    const pack = rechargePacks.find(p => p.amount === selectedPack);
    if (!pack) return;
    setRecharging(true);
    setTimeout(() => {
      setBalance(prev => prev + pack.total);
      setRecharging(false);
      alert(`🎉 Successfully added ₹${pack.amount} (+₹${pack.bonus} Free Bonus) to your BHAVISHYAA wallet!`);
    }, 800);
  };

  const handleAddProfile = () => {
    const name = prompt('Enter Member Full Name:');
    if (!name) return;
    const relation = prompt('Enter Relation (e.g. Child, Father, Sibling):') || 'Family';
    setProfiles([...profiles, {
      id: Date.now(),
      name: `${name} (${relation})`,
      rashi: 'Calculated from Kundli',
      relation: relation
    }]);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Wallet Balance Card */}
      <div className="glass-card-amber p-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-200">
              Cosmic Astral Balance
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-slate-800">₹{balance}</span>
              <span className="text-xs font-semibold text-slate-500">Available for Chats & Calls</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              ✨ 1 Coin = ₹1 • No expiry • Valid across all certified Vedic Gurus
            </p>
          </div>

          <button
            onClick={handleRecharge}
            disabled={recharging}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus size={16} />
            {recharging ? 'Processing...' : `Quick Recharge ₹${selectedPack}`}
          </button>
        </div>
      </div>

      {/* Select Recharge Pack */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Select Recharge Package
            </h3>
            <p className="text-xs text-slate-500">Includes complimentary bonus coins & priority astrologer queue</p>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Instant Credit
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {rechargePacks.map((pack) => {
            const isSelected = selectedPack === pack.amount;
            return (
              <div
                key={pack.amount}
                onClick={() => setSelectedPack(pack.amount)}
                className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/70 shadow-sm'
                    : 'border-slate-200/80 bg-white/70 hover:border-amber-300'
                }`}
              >
                {pack.badge && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {pack.badge}
                  </span>
                )}
                <div className="text-center pt-1">
                  <span className="text-xl font-bold text-slate-800">₹{pack.amount}</span>
                  <div className="text-xs font-semibold text-emerald-700 mt-1">
                    +₹{pack.bonus} Bonus
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-center">
                  <span className="text-[11px] font-bold text-amber-800">
                    Get ₹{pack.total}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* UPI & Payment reassurance */}
        <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-emerald-600" />
            <span>256-bit Bank Grade Encryption • UPI, Cards & NetBanking</span>
          </div>
          <span className="text-slate-400">100% Refund Guarantee if call drops</span>
        </div>
      </div>

      {/* Saved Kundli Profiles */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Users size={16} className="text-amber-600" />
              Saved Family Kundli Profiles
            </h3>
            <p className="text-xs text-slate-500">Quickly consult for your loved ones without re-entering birth details</p>
          </div>
          <button 
            onClick={handleAddProfile}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold transition-all cursor-pointer"
          >
            <Plus size={14} /> Add Profile
          </button>
        </div>

        <div className="space-y-2.5">
          {profiles.map((p) => (
            <div 
              key={p.id}
              className="p-3.5 rounded-xl bg-white/70 border border-slate-200/80 flex items-center justify-between hover:bg-amber-50/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 font-bold text-xs">
                  {p.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">{p.name}</h4>
                  <p className="text-[11px] text-slate-500">Moon Sign: {p.rashi}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {p.relation}
                </span>
                {p.id !== 1 && (
                  <button 
                    onClick={() => setProfiles(profiles.filter(x => x.id !== p.id))}
                    className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vedic Concierge & Support */}
      <div className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-700">
            <HelpCircle size={20} />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800">Need Vedic Consultation Assistance?</h4>
            <p className="text-[11px] text-slate-500">24x7 Priority Concierge available on WhatsApp & Phone</p>
          </div>
        </div>
        <button 
          onClick={() => alert('💬 Connecting you to BHAVISHYAA Vedic Concierge on WhatsApp...')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all self-start sm:self-auto cursor-pointer"
        >
          Contact Support <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}
