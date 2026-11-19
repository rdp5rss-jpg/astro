import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'theme/app_theme.dart';
import 'widgets/glass_header.dart';
import 'widgets/glass_bottom_nav.dart';
import 'widgets/glass_container.dart';
import 'screens/onboarding_screen.dart';
import 'screens/home_screen.dart';
import 'screens/readings_screen.dart';
import 'screens/kundli_screen.dart';
import 'screens/reports_screen.dart';
import 'screens/wallet_screen.dart';
import 'screens/match_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
    ),
  );
  runApp(const BhavishyaaApp());
}

class BhavishyaaApp extends StatelessWidget {
  const BhavishyaaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BHAVISHYAA',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const RootController(),
    );
  }
}

class RootController extends StatefulWidget {
  const RootController({super.key});

  @override
  State<RootController> createState() => _RootControllerState();
}

class _RootControllerState extends State<RootController> {
  bool _showOnboarding = false; // Start on main app, button to test Onboarding flow anytime!
  int _currentTabIndex = 0;
  int _walletBalance = 150;

  void _openQuickMatchModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        return Container(
          height: MediaQuery.of(context).size.height * 0.85,
          decoration: const BoxDecoration(
            color: Colors.transparent,
          ),
          child: ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(32)),
            child: MatchScreen(
              userName: 'Mahi',
              birthDate: DateTime(1998, 10, 14),
              birthCity: 'Visakhapatnam',
              concern: 'Marriage & Love Destiny',
              languages: const ['English', 'हिन्दी', 'తెలుగు'],
              onFinish: () => Navigator.pop(context),
            ),
          ),
        );
      },
    );
  }

  void _openNotificationsModal() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) {
        return GlassContainer(
          borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
          color: Colors.white.withOpacity(0.96),
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Notifications',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close),
                    onPressed: () => Navigator.pop(context),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              _buildNotificationItem(
                'Chhath Puja Mahurat is live!',
                'Special planetary grace active till 6:40 PM. 50% discount applied.',
                '10m ago',
              ),
              const Divider(),
              _buildNotificationItem(
                'Acharya Rudranand sent advice',
                'Check recommended gemstones for Jupiter transits.',
                '1h ago',
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildNotificationItem(String title, String body, String time) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: AppTheme.pastelLavender.withOpacity(0.6),
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.notifications_active_rounded, size: 18, color: AppTheme.primaryPurple),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13.5),
                ),
                Text(
                  body,
                  style: const TextStyle(fontSize: 12, color: AppTheme.textMedium),
                ),
              ],
            ),
          ),
          Text(
            time,
            style: const TextStyle(fontSize: 11, color: AppTheme.textMuted),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_showOnboarding) {
      return OnboardingScreen(
        onComplete: () {
          setState(() => _showOnboarding = false);
        },
      );
    }

    return Scaffold(
      backgroundColor: AppTheme.background,
      body: Stack(
        children: [
          // Background Glow Orbs for Soft White Aesthetic
          Positioned(
            top: -60,
            right: -60,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    AppTheme.pastelLavender.withOpacity(0.6),
                    AppTheme.pastelLavender.withOpacity(0.0),
                  ],
                ),
              ),
            ),
          ),
          Positioned(
            top: 250,
            left: -80,
            child: Container(
              width: 320,
              height: 320,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    AppTheme.vedicGoldLight.withOpacity(0.5),
                    AppTheme.vedicGoldLight.withOpacity(0.0),
                  ],
                ),
              ),
            ),
          ),
          Positioned(
            bottom: 100,
            right: -80,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    AppTheme.pastelMint.withOpacity(0.6),
                    AppTheme.pastelMint.withOpacity(0.0),
                  ],
                ),
              ),
            ),
          ),

          // Main Screen Body with Glass Header and Content
          SafeArea(
            bottom: false,
            child: Column(
              children: [
                // Glassy Floating Header
                GlassHeader(
                  walletBalance: _walletBalance,
                  onWalletTap: () {
                    // Switch to Wallet page
                    setState(() => _currentTabIndex = 4);
                  },
                  onNotificationTap: _openNotificationsModal,
                  onProfileTap: () {
                    // Switch to Wallet/Profile page
                    setState(() => _currentTabIndex = 4);
                  },
                ),

                // Top mode switcher banner (allows user to easily jump into the 9-step onboarding / match flow anytime!)
                Container(
                  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 2),
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 5),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.7),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: Colors.white.withOpacity(0.9)),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Container(
                            width: 6,
                            height: 6,
                            decoration: const BoxDecoration(
                              color: AppTheme.emeraldGreen,
                              shape: BoxShape.circle,
                            ),
                          ),
                          const SizedBox(width: 6),
                          const Text(
                            'BHAVISHYAA Premium Suite',
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                              color: AppTheme.primaryPurple,
                            ),
                          ),
                        ],
                      ),
                      GestureDetector(
                        onTap: () => setState(() => _showOnboarding = true),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: AppTheme.pastelLavender,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Row(
                            children: [
                              Icon(Icons.tune_rounded, size: 12, color: AppTheme.primaryPurple),
                              SizedBox(width: 4),
                              Text(
                                'View 9-Step Onboarding Flow',
                                style: TextStyle(
                                  fontSize: 10.5,
                                  fontWeight: FontWeight.w700,
                                  color: AppTheme.primaryPurple,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                // Tab View
                Expanded(
                  child: IndexedStack(
                    index: _currentTabIndex,
                    children: [
                      HomeScreen(
                        onNavigateTab: (idx) => setState(() => _currentTabIndex = idx),
                        onOpenQuickMatch: _openQuickMatchModal,
                      ),
                      ReadingsScreen(
                        onFindAstrologer: _openQuickMatchModal,
                      ),
                      const KundliScreen(),
                      const ReportsScreen(),
                      WalletScreen(
                        balance: _walletBalance,
                        onBalanceUpdated: (newBal) => setState(() => _walletBalance = newBal),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Floating Glass Bottom Navigation Bar (NO "Free" Tab!)
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: GlassBottomNav(
              currentIndex: _currentTabIndex > 3 ? 0 : _currentTabIndex,
              onIndexChanged: (index) {
                setState(() => _currentTabIndex = index);
              },
              onQuickMatchTap: _openQuickMatchModal,
            ),
          ),
        ],
      ),
    );
  }
}
