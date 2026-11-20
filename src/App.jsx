import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import MatchScreen from './screens/MatchScreen';
import HomeScreen from './screens/HomeScreen';
import ReadingsScreen from './screens/ReadingsScreen';
import FreeScreen from './screens/FreeScreen';
import ReportsScreen from './screens/ReportsScreen';
import ChatScreen from './screens/ChatScreen';
import CallScreen from './screens/CallScreen';
import WalletScreen from './screens/WalletScreen';
import ProfileScreen from './screens/ProfileScreen';
import AstrologerPanel from './astrologer/AstrologerPanel';
import AdminPanel from './admin/AdminPanel';
import PortalSwitcher from './components/PortalSwitcher';
import { astrologers } from './data/astrologers';
import { X, Bell } from 'lucide-react';

export default function App() {
  // Navigation Flow State:
  // 'splash' -> 'login' -> 'welcome' -> 'onboarding' -> 'matchmaker' -> 'main' | 'chat'
  const [activeScreen, setActiveScreen] = useState('splash');
  
  // Tabs for Main Dashboard:
  const TAB_KEYS = ['explore', 'readings', 'free', 'reports'];
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'readings' | 'free' | 'reports'
  
  const [activeAstrologer, setActiveAstrologer] = useState(astrologers[0]);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(185);
  // Portal Perspective: Directly launches Admin Portal by default
  const [activePortal, setActivePortal] = useState('admin');

  const notifications = [
    { id: 1, title: 'Rudranand Live Call', text: 'Acharya Rudranand is available right now for 50% off.', time: '2m ago' },
    { id: 2, title: 'Sandhya Life Dossier', text: 'Your 8-page personalized destiny report is ready to unlock.', time: '1h ago' },
    { id: 3, title: 'Shubh Muhurat Active', text: 'Abhijit Muhurat starts at 11:45 AM today. Auspicious for wealth.', time: '4h ago' },
  ];

  const handleTabChange = (targetTab) => {
    let normalizedTab = targetTab;
    if (typeof targetTab === 'number') {
      normalizedTab = TAB_KEYS[targetTab] || 'explore';
    }
    if (normalizedTab === 'consult') normalizedTab = 'readings';
    setActiveTab(normalizedTab);
    setActiveScreen('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartChat = (astro) => {
    setActiveAstrologer(astro || astrologers[0]);
    setActiveScreen('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCall = (astro) => {
    setActiveAstrologer(astro || astrologers[0]);
    setActiveScreen('call');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 0. Astrologer Portal & Admin Portal Guards
  if (activePortal === 'astrologer') {
    return <AstrologerPanel />;
  }

  if (activePortal === 'admin') {
    return <AdminPanel />;
  }

  // 1. Splash Screen
  if (activeScreen === 'splash') {
    return <SplashScreen onFinish={() => setActiveScreen('login')} />;
  }

  // 2. Login Page
  if (activeScreen === 'login') {
    return <LoginScreen onLoginSuccess={() => setActiveScreen('welcome')} />;
  }

  // 3. Welcome Screen
  if (activeScreen === 'welcome') {
    return (
      <WelcomeScreen 
        onContinue={() => setActiveScreen('onboarding')}
        onSignOut={() => setActiveScreen('login')}
        onSupport={() => alert('🎧 Bhavishyaa Support Concierge active.')}
      />
    );
  }

  // 4. 9-Step Onboarding Setup Flow
  if (activeScreen === 'onboarding') {
    return (
      <OnboardingScreen 
        onFinish={(formData, matchedAstro) => {
          if (matchedAstro) {
            setActiveAstrologer(matchedAstro);
            setActiveScreen('chat');
          } else {
            setActiveScreen('main');
            setActiveTab('explore');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSignOut={() => setActiveScreen('login')}
      />
    );
  }

  // 5. 5-Step Celestial Matchmaker
  if (activeScreen === 'matchmaker') {
    return (
      <MatchScreen 
        seekerName="Mahi" 
        onComplete={(matchedAstro, mode) => {
          if (matchedAstro) {
            setActiveAstrologer(matchedAstro);
            setActiveScreen(mode === 'call' ? 'call' : 'chat');
          } else {
            setActiveScreen('main');
            setActiveTab('explore');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartCall={handleStartCall}
        onExploreAll={() => {
          setActiveScreen('main');
          setActiveTab('explore');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // 6. 1-on-1 Astrologer Chat Screen
  if (activeScreen === 'chat') {
    return (
      <ChatScreen 
        astrologer={activeAstrologer} 
        onBack={() => setActiveScreen('main')} 
      />
    );
  }

  // 6b. Live Voice Consultation Call Screen
  if (activeScreen === 'call') {
    return (
      <CallScreen
        astrologer={activeAstrologer}
        onEndCall={() => setActiveScreen('main')}
        onSwitchToChat={(astro) => {
          setActiveAstrologer(astro || activeAstrologer);
          setActiveScreen('chat');
        }}
        walletBalance={walletBalance}
      />
    );
  }

  // 7. Main App Dashboard (Explore, Readings, Kundli, Reports)
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      background: 'radial-gradient(circle at 10% 10%, rgba(254, 240, 138, 0.4) 0%, transparent 40%), radial-gradient(circle at 90% 15%, rgba(244, 114, 182, 0.3) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(147, 197, 253, 0.35) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(167, 243, 208, 0.35) 0%, transparent 40%), #FFFFFF',
      color: '#1E1B4B',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Floating Header */}
      <Header
        walletBalance={walletBalance}
        onOpenWallet={() => setIsWalletOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, maxWidth: '520px', width: '100%', margin: '0 auto', paddingTop: '10px' }}>
        {activeTab === 'explore' && (
          <HomeScreen 
            onSelectAstrologer={(astro, mode) => {
              if (mode === 'call') handleStartCall(astro);
              else handleStartChat(astro);
            }}
            onNavigateTab={handleTabChange}
            onOpenMatchmaker={() => setActiveScreen('matchmaker')}
          />
        )}

        {activeTab === 'readings' && (
          <ReadingsScreen 
            onStartChat={handleStartChat} 
            onStartCall={handleStartCall}
          />
        )}

        {activeTab === 'free' && (
          <FreeScreen 
            onConsultClick={() => handleTabChange('readings')} 
            onStartMatch={() => setActiveScreen('matchmaker')} 
          />
        )}

        {activeTab === 'reports' && (
          <ReportsScreen seekerName="Mahi" onConsultClick={() => handleTabChange('readings')} />
        )}
      </main>

      {/* Floating Glass Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        onSelectTab={handleTabChange}
        onOpenMatchmaker={() => setActiveScreen('matchmaker')}
      />

      {/* Profile Modal Overlay */}
      {isProfileOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          backgroundColor: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '480px',
            maxHeight: '90vh',
            overflowY: 'auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            padding: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
          }}>
            <ProfileScreen 
              onClose={() => setIsProfileOpen(false)}
              walletBalance={walletBalance}
              seekerName="Mahi Sharma"
              onOpenWallet={() => {
                setIsProfileOpen(false);
                setIsWalletOpen(true);
              }}
              onSignOut={() => {
                setIsProfileOpen(false);
                setActiveScreen('login');
              }}
            />
          </div>
        </div>
      )}

      {/* Wallet Modal Overlay */}
      {isWalletOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          backgroundColor: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '480px',
            maxHeight: '90vh',
            overflowY: 'auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            padding: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
          }}>
            <WalletScreen onClose={() => setIsWalletOpen(false)} />
          </div>
        </div>
      )}

      {/* Notifications Modal Overlay */}
      {isNotificationsOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90,
          backgroundColor: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '420px',
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            padding: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bell size={18} color="#C85A32" />
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1E1B4B' }}>Cosmic Alerts & Muhurat</h3>
              </div>
              <button
                onClick={() => setIsNotificationsOpen(false)}
                style={{ padding: '6px', borderRadius: '50%', backgroundColor: '#F1F5F9', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {notifications.map((n) => (
                <div key={n.id} style={{ padding: '12px 14px', borderRadius: '16px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#1E1B4B' }}>{n.title}</h4>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>{n.time}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>{n.text}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsNotificationsOpen(false)}
              style={{
                width: '100%',
                marginTop: '16px',
                padding: '12px',
                borderRadius: '16px',
                backgroundColor: '#F1F5F9',
                color: '#1E1B4B',
                fontSize: '13px',
                fontWeight: '800',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
