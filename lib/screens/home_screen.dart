import 'dart:async';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';
import '../widgets/glass_container.dart';
import '../models/astrologer.dart';
import 'chat_screen.dart';

class HomeScreen extends StatefulWidget {
  final ValueChanged<int> onNavigateTab;
  final VoidCallback onOpenQuickMatch;

  const HomeScreen({
    super.key,
    required this.onNavigateTab,
    required this.onOpenQuickMatch,
  });

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Timer _offerTimer;
  int _offerSeconds = 9 * 3600 + 21 * 60 + 47; // 09:21:47 countdown
  String _selectedCategory = 'All';

  final List<Map<String, dynamic>> _categories = [
    {
      'title': 'Marriage',
      'icon': Icons.favorite_rounded,
      'color': const Color(0xFFFEE2E2),
      'iconColor': const Color(0xFFEF4444),
    },
    {
      'title': 'Love',
      'icon': Icons.favorite_border_rounded,
      'color': const Color(0xFFFCE7F3),
      'iconColor': const Color(0xFFEC4899),
    },
    {
      'title': 'Career',
      'icon': Icons.trending_up_rounded,
      'color': const Color(0xFFE0E7FF),
      'iconColor': const Color(0xFF6366F1),
    },
    {
      'title': 'Money',
      'icon': Icons.account_balance_wallet_rounded,
      'color': const Color(0xFFFEF3C7),
      'iconColor': const Color(0xFFD97706),
    },
    {
      'title': 'Health',
      'icon': Icons.spa_rounded,
      'color': const Color(0xFFD1FAE5),
      'iconColor': const Color(0xFF10B981),
    },
  ];

  @override
  void initState() {
    super.initState();
    _offerTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_offerSeconds > 0) {
        setState(() => _offerSeconds--);
      } else {
        timer.cancel();
      }
    });
  }

  @override
  void dispose() {
    _offerTimer.cancel();
    super.dispose();
  }

  String _formatTimerUnits(int totalSeconds) {
    final h = (totalSeconds ~/ 3600).toString().padLeft(2, '0');
    final m = ((totalSeconds % 3600) ~/ 60).toString().padLeft(2, '0');
    final s = (totalSeconds % 60).toString().padLeft(2, '0');
    return '$h:$m:$s';
  }

  @override
  Widget build(BuildContext context) {
    final timerParts = _formatTimerUnits(_offerSeconds).split(':');

    return ListView(
      padding: const EdgeInsets.only(bottom: 100),
      children: [
        // Daily Panchang Glass Pill
        _buildPanchangBar(),

        // Astro Category Quick Buttons
        _buildCategoryPills(),

        // Festive Maha Offer Banner with Live Countdown Timer
        _buildOfferBanner(timerParts),

        const SizedBox(height: 16),

        // Quick Reading Carousel
        _buildQuickReadingSection(),

        const SizedBox(height: 20),

        // Today's Horoscope Card
        _buildDailyHoroscopeCard(),

        const SizedBox(height: 20),

        // Vedic Actions Grid (Birth Chart, Matchmaking, Transits, Muhurat)
        _buildDestinyActionCards(),

        const SizedBox(height: 20),

        // Featured Vedic Astrologers
        _buildFeaturedAstrologersSection(),
      ],
    );
  }

  Widget _buildPanchangBar() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.7),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: Colors.white.withOpacity(0.9)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Row(
              children: [
                const Icon(Icons.wb_sunny_rounded, size: 16, color: AppTheme.vedicGold),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Shukla Dashami · Anuradha Nakshatra',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 11.5,
                      fontWeight: FontWeight.w600,
                      color: AppTheme.textDark,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(
              color: AppTheme.pastelMint,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Text(
              'Shubh Muhurat',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 10.5,
                fontWeight: FontWeight.w700,
                color: AppTheme.emeraldGreen,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryPills() {
    return SizedBox(
      height: 94,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 12),
        itemCount: _categories.length,
        itemBuilder: (context, index) {
          final cat = _categories[index];
          final isSel = _selectedCategory == cat['title'];

          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
            child: GestureDetector(
              onTap: () {
                setState(() => _selectedCategory = cat['title']);
                widget.onNavigateTab(1); // Go to consult tab
              },
              child: Column(
                children: [
                  GlassContainer(
                    width: 58,
                    height: 58,
                    borderRadius: BorderRadius.circular(20),
                    color: cat['color'] as Color,
                    borderColor: isSel ? AppTheme.primaryPurple : Colors.white,
                    child: Center(
                      child: Icon(
                        cat['icon'] as IconData,
                        color: cat['iconColor'] as Color,
                        size: 26,
                      ),
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    cat['title'] as String,
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: AppTheme.textDark,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildOfferBanner(List<String> timer) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [
            Color(0xFFFFF0D4),
            Color(0xFFFFDFB0),
            Color(0xFFFFD59E),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(26),
        border: Border.all(color: Colors.white, width: 2),
        boxShadow: [
          BoxShadow(
            color: AppTheme.vedicGold.withOpacity(0.18),
            blurRadius: 20,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Stack(
        children: [
          Positioned(
            right: -10,
            bottom: -10,
            child: Icon(
              Icons.auto_awesome,
              size: 100,
              color: Colors.white.withOpacity(0.25),
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: const Color(0xFFC77700),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      'FESTIVE MAHA OFFER',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 10,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 1.0,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  // Live Timer
                  Row(
                    children: [
                      _buildTimerBox(timer[0]),
                      const Text(' : ', style: TextStyle(fontWeight: FontWeight.w900, color: Color(0xFF7C3D00))),
                      _buildTimerBox(timer[1]),
                      const Text(' : ', style: TextStyle(fontWeight: FontWeight.w900, color: Color(0xFF7C3D00))),
                      _buildTimerBox(timer[2]),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                'Every reading is\nhalf price today',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 22,
                  fontWeight: FontWeight.w900,
                  height: 1.15,
                  color: const Color(0xFF5E2E00),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'First consultation at flat ₹26/min (Was ₹52)',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w600,
                  color: const Color(0xFF8C4C00),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTimerBox(String value) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.9),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: AppTheme.vedicGold),
      ),
      child: Text(
        value,
        style: GoogleFonts.plusJakartaSans(
          fontSize: 12,
          fontWeight: FontWeight.w900,
          color: const Color(0xFF8C4C00),
        ),
      ),
    );
  }

  Widget _buildQuickReadingSection() {
    final astros = Astrologer.sampleAstrologers;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Quick Reading',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 19,
                  fontWeight: FontWeight.w800,
                  color: AppTheme.textDark,
                ),
              ),
              GestureDetector(
                onTap: () => widget.onNavigateTab(1),
                child: Row(
                  children: [
                    Text(
                      'All Astrologers',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        color: AppTheme.primaryPurple,
                      ),
                    ),
                    const Icon(Icons.chevron_right_rounded, size: 18, color: AppTheme.primaryPurple),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 240,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: astros.length,
            itemBuilder: (context, index) {
              final astro = astros[index];
              return _buildAstrologerCard(astro);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildAstrologerCard(Astrologer astro) {
    return Container(
      width: 195,
      margin: const EdgeInsets.only(right: 14),
      child: GlassContainer(
        onTap: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_) => ChatScreen(astrologer: astro),
            ),
          );
        },
        padding: const EdgeInsets.all(12),
        borderRadius: BorderRadius.circular(22),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Top Image with Online badge & Heart
            Stack(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: Container(
                    height: 110,
                    width: double.infinity,
                    color: AppTheme.pastelLavender,
                    child: Center(
                      child: Icon(Icons.person, size: 50, color: AppTheme.primaryPurple.withOpacity(0.5)),
                    ),
                  ),
                ),
                // Online Badge
                Positioned(
                  top: 8,
                  left: 8,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.9),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          width: 6,
                          height: 6,
                          decoration: const BoxDecoration(
                            color: AppTheme.emeraldGreen,
                            shape: BoxShape.circle,
                          ),
                        ),
                        const SizedBox(width: 4),
                        Text(
                          'Online',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 9.5,
                            fontWeight: FontWeight.w700,
                            color: AppTheme.textDark,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                // Favorite Heart
                Positioned(
                  top: 6,
                  right: 6,
                  child: Container(
                    padding: const EdgeInsets.all(4),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.9),
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(Icons.favorite_rounded, color: AppTheme.softRose, size: 14),
                  ),
                ),
                // Celebrity tag
                if (astro.isCelebrity)
                  Positioned(
                    bottom: 6,
                    left: 8,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: AppTheme.vedicGold,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        '👑 Celebrity',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 9,
                          fontWeight: FontWeight.w800,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 8),
            // Name
            Row(
              children: [
                Expanded(
                  child: Text(
                    astro.name,
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 13.5,
                      fontWeight: FontWeight.w800,
                      color: AppTheme.textDark,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                const SizedBox(width: 2),
                const Icon(Icons.verified, size: 13, color: AppTheme.emeraldGreen),
              ],
            ),
            Text(
              astro.skills.first,
              style: GoogleFonts.plusJakartaSans(
                fontSize: 11,
                color: AppTheme.textMedium,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            const Spacer(),
            // Rating & Experience
            Row(
              children: [
                const Icon(Icons.star_rounded, size: 14, color: AppTheme.vedicGold),
                const SizedBox(width: 2),
                Text(
                  '${astro.rating}',
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 11,
                    fontWeight: FontWeight.w700,
                    color: AppTheme.textDark,
                  ),
                ),
                const SizedBox(width: 4),
                Expanded(
                  child: Text(
                    '• ${astro.experienceYears}y exp',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 10.5,
                      color: AppTheme.textMuted,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 6),
            // Pricing & Chat CTA
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      '₹${astro.ratePerMin}',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 13,
                        fontWeight: FontWeight.w900,
                        color: AppTheme.textDark,
                      ),
                    ),
                    Text(
                      '/m',
                      style: GoogleFonts.plusJakartaSans(fontSize: 10, color: AppTheme.textMuted),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      '₹${astro.originalRatePerMin}',
                      style: const TextStyle(
                        fontSize: 10,
                        color: Colors.grey,
                        decoration: TextDecoration.lineThrough,
                      ),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppTheme.primaryPurple,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Text(
                    'Chat',
                    style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: Colors.white),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDailyHoroscopeCard() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      child: GlassContainer(
        onTap: () => widget.onNavigateTab(2), // go to Kundli tab
        borderRadius: BorderRadius.circular(26),
        color: const Color(0xFFF0EBFB),
        borderColor: Colors.white,
        padding: const EdgeInsets.all(20),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: AppTheme.primaryPurple.withOpacity(0.12),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          'TODAY\'S HOROSCOPE',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 10,
                            fontWeight: FontWeight.w800,
                            letterSpacing: 1.2,
                            color: AppTheme.primaryPurple,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'SCORPIO (वृश्चिक)',
                    style: GoogleFonts.cinzel(
                      fontSize: 19,
                      fontWeight: FontWeight.w800,
                      letterSpacing: 1.0,
                      color: AppTheme.textDark,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'The day pulls inward towards deep contemplation and family harmony. Favorable hours for finance.',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 12.5,
                      color: AppTheme.textMedium,
                      height: 1.35,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      Text(
                        'Read full forecast',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: AppTheme.primaryPurple,
                        ),
                      ),
                      const SizedBox(width: 4),
                      const Icon(Icons.arrow_forward_rounded, size: 14, color: AppTheme.primaryPurple),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(width: 14),
            // Glowing Zodiac Emblem
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                gradient: const RadialGradient(
                  colors: [Color(0xFFFFA726), Color(0xFFE65100)],
                ),
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: Colors.orange.withOpacity(0.35),
                    blurRadius: 18,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: const Center(
                child: Icon(Icons.wb_sunny_rounded, color: Colors.white, size: 42),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDestinyActionCards() {
    final actions = [
      {
        'title': 'See my birth chart',
        'subtitle': 'Lagna, Navamsha & Houses',
        'icon': Icons.grid_goldenratio_rounded,
        'color': const Color(0xFFE8EEFF),
        'tab': 2,
      },
      {
        'title': 'Check marriage match',
        'subtitle': '36 Guna Milan & Doshas',
        'icon': Icons.favorite_rounded,
        'color': const Color(0xFFFDE8EC),
        'tab': 2,
      },
      {
        'title': 'Planetary transits',
        'subtitle': 'Current Gochara effects',
        'icon': Icons.explore_rounded,
        'color': const Color(0xFFE5F9F3),
        'tab': 2,
      },
      {
        'title': 'Shubh Muhurat timings',
        'subtitle': 'Choghadiya & Rahu Kaal',
        'icon': Icons.schedule_rounded,
        'color': const Color(0xFFFFF6E5),
        'tab': 2,
      },
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'What do you want to explore?',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 18,
              fontWeight: FontWeight.w800,
              color: AppTheme.textDark,
            ),
          ),
          const SizedBox(height: 12),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              childAspectRatio: 1.45,
            ),
            itemCount: actions.length,
            itemBuilder: (context, index) {
              final act = actions[index];
              return GlassContainer(
                onTap: () => widget.onNavigateTab(act['tab'] as int),
                color: act['color'] as Color,
                padding: const EdgeInsets.all(14),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Icon(act['icon'] as IconData, size: 22, color: AppTheme.textDark),
                        const Icon(Icons.arrow_forward_ios_rounded, size: 12, color: AppTheme.textMuted),
                      ],
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          act['title'] as String,
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 13,
                            fontWeight: FontWeight.w800,
                            color: AppTheme.textDark,
                          ),
                          maxLines: 1,
                        ),
                        Text(
                          act['subtitle'] as String,
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 10.5,
                            color: AppTheme.textMedium,
                          ),
                          maxLines: 1,
                        ),
                      ],
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildFeaturedAstrologersSection() {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF8D72E1), Color(0xFF6C4AB6)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(26),
        boxShadow: [
          BoxShadow(
            color: AppTheme.primaryPurple.withOpacity(0.3),
            blurRadius: 24,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.stars_rounded, color: AppTheme.vedicGold, size: 22),
              const SizedBox(width: 8),
              Text(
                'Featured In-House Mentors',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 17,
                  fontWeight: FontWeight.w800,
                  color: Colors.white,
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            'Direct personal guidance with certified Vedic scholars with 15+ years experience.',
            style: GoogleFonts.plusJakartaSans(fontSize: 12, color: Colors.white70),
          ),
          const SizedBox(height: 16),
          // Instant Quick Match CTA
          Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: widget.onOpenQuickMatch,
              borderRadius: BorderRadius.circular(20),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Center(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.auto_awesome, color: AppTheme.primaryPurple, size: 18),
                      const SizedBox(width: 8),
                      Text(
                        'Launch Smart Vedic Matchmaker',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 14,
                          fontWeight: FontWeight.w800,
                          color: AppTheme.primaryPurple,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
