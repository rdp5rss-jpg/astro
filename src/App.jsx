import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import ReadingsScreen from './screens/ReadingsScreen';
import KundliScreen from './screens/KundliScreen';
import ReportsScreen from './screens/ReportsScreen';
import ChatScreen from './screens/ChatScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import MatchScreen from './screens/MatchScreen';
import WalletScreen from './screens/WalletScreen';
import { astrologers } from './data/astrologers';
import { X, Bell, Sparkles } from 'lucide-react';

export default function App() {
  // Tab mapping for both integer indices and string keys
  const TAB_KEYS = ['explore', 'consult', 'kundli', 'reports'];

  // Start directly on onboarding as requested by the user
  const [activeScreen, setActiveScreen] = useState('onboarding'); // 'onboarding' | 'main' | 'chat' | 'matchmaker'
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'consult' | 'kundli' | 'reports'
  const [activeAstrologer, setActiveAstrologer] = useState(astrologers[0]);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(185);

  const notifications = [
    { id: 1, title: 'Guru Mahadasha Milestone', text: 'Jupiter transit aligns with your 10th house on 18 Nov.', time: '2h ago' },
    { id: 2, title: 'Festive Flash Offer', text: 'Acharya Sandhya is offering 50% off on all live voice calls.', time: '5h ago' },
    { id: 3, title: 'New Panchang Active', text: 'Abhijit Muhurat starts at 11:45 AM today. Ideal for new ventures.', time: '1d ago' },
  ];

  const handleTabChange = (targetTab) => {
    let normalizedTab = targetTab;
    if (typeof targetTab === 'number') {
      normalizedTab = TAB_KEYS[targetTab] || 'explore';
    }
    setActiveTab(normalizedTab);
    setActiveScreen('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartChat = (astro) => {
    setActiveAstrologer(astro || astrologers[0]);
    setActiveScreen('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultFromKundli = () => {
    setActiveTab('consult');
    setActiveScreen('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render 9-Step Onboarding Screen
  if (activeScreen === 'onboarding') {
    return (
      <OnboardingScreen 
        onFinish={() => {
          setActiveScreen('main');
          setActiveTab('explore');
        }} 
      />
    );
  }

  // Render 5-Step Celestial Matchmaker
  if (activeScreen === 'matchmaker') {
    return (
      <MatchScreen 
        seekerName="Rohan" 
        onComplete={() => {
          setActiveScreen('main');
          setActiveTab('kundli');
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Glass Floating Header */}
      <Header
        walletBalance={walletBalance}
        onOpenWallet={() => setIsWalletOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsWalletOpen(true)}
        onToggleOnboarding={() => setActiveScreen('onboarding')}
        onStartOnboarding={() => setActiveScreen('onboarding')}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-2 pb-24">
        {activeScreen === 'chat' ? (
          <ChatScreen 
            astrologer={activeAstrologer} 
            onBack={() => setActiveScreen('main')} 
          />
        ) : (
          <>
            {activeTab === 'explore' && (
              <HomeScreen 
                onSelectAstrologer={handleStartChat}
                onNavigateTab={handleTabChange}
                onOpenMatchmaker={() => setActiveScreen('matchmaker')}
              />
            )}

            {activeTab === 'consult' && (
              <ReadingsScreen onStartChat={handleStartChat} />
            )}

            {activeTab === 'kundli' && (
              <KundliScreen onConsultClick={handleConsultFromKundli} />
            )}

            {activeTab === 'reports' && (
              <ReportsScreen onConsultClick={handleConsultFromKundli} />
            )}
          </>
        )}
      </main>

      {/* Bottom Floating Glass Navigation */}
      {activeScreen !== 'chat' && (
        <BottomNav 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
          onSelectTab={handleTabChange}
          onOpenMatchmaker={() => setActiveScreen('matchmaker')}
          onCenterStarClick={() => setActiveScreen('matchmaker')}
        />
      )}

      {/* Wallet Modal Overlay */}
      {isWalletOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto glass-card p-6 shadow-2xl border border-amber-200">
            <button
              onClick={() => setIsWalletOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
            <WalletScreen onClose={() => setIsWalletOpen(false)} />
          </div>
        </div>
      )}

      {/* Notifications Modal Overlay */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-md glass-card p-6 shadow-2xl border border-amber-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-amber-600" />
                <h3 className="text-sm font-bold text-slate-800">Cosmic Alerts & Muhurat</h3>
              </div>
              <button
                onClick={() => setIsNotificationsOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {notifications.map((n) => (
                <div key={n.id} className="p-3 rounded-xl bg-white/80 border border-slate-200/80 hover:bg-amber-50/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800">{n.title}</h4>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{n.text}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="w-full mt-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
