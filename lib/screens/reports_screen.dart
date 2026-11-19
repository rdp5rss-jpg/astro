import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';
import '../widgets/glass_container.dart';

class ReportsScreen extends StatefulWidget {
  const ReportsScreen({super.key});

  @override
  State<ReportsScreen> createState() => _ReportsScreenState();
}

class _ReportsScreenState extends State<ReportsScreen> {
  final List<Map<String, dynamic>> _reportPages = [
    {
      'pageNum': 'I',
      'title': 'Planetary Blueprint & Janam Kundli',
      'desc': 'Detailed Lagna, Navamsha (D9) and Dashamsha (D10) charts with planetary strength (Shadbala).',
      'icon': Icons.grid_goldenratio_rounded,
      'color': const Color(0xFFF0EBFB),
    },
    {
      'pageNum': 'II',
      'title': 'What should I focus on now?',
      'desc': 'Immediate 12-month career and financial trajectory analyzed against current Jupiter-Saturn transits.',
      'icon': Icons.psychology_rounded,
      'color': const Color(0xFFFFF7ED),
    },
    {
      'pageNum': 'III',
      'title': 'Love, Marriage & Partner Forecast',
      'desc': 'Exact vivah yoga timing, 7th house partner characteristics, and marital compatibility.',
      'icon': Icons.favorite_rounded,
      'color': const Color(0xFFFDF2F8),
    },
    {
      'pageNum': 'IV',
      'title': 'Wealth, Business & Hidden Yogas',
      'desc': 'Dhana Yogas, property investment timings, foreign earnings, and windfall potentials.',
      'icon': Icons.account_balance_wallet_rounded,
      'color': const Color(0xFFFEF3C7),
    },
    {
      'pageNum': 'V',
      'title': 'Health, Energy & Vitality',
      'desc': '6th and 8th house analysis, seasonal vulnerable periods, and Ayurvedic lifestyle remedies.',
      'icon': Icons.spa_rounded,
      'color': const Color(0xFFECFDF5),
    },
    {
      'pageNum': 'VI',
      'title': 'Karmic Debt, Sade Sati & Remedies',
      'desc': 'Shani Sade Sati timeline, Pitra Dosha audit, and no-cost home mantra remedies.',
      'icon': Icons.self_improvement_rounded,
      'color': const Color(0xFFEFF6FF),
    },
    {
      'pageNum': 'VII',
      'title': 'Gemstone & Rudraksha Prescription',
      'desc': 'Custom weight, metal alloy, energization vidhi, and auspicious wearing muhurat.',
      'icon': Icons.diamond_outlined,
      'color': const Color(0xFFFAF5FF),
    },
    {
      'pageNum': 'VIII',
      'title': 'Personal Answers to Your 3 Questions',
      'desc': 'Hand-analyzed personal answers dictated directly by Acharya Sandhya.',
      'icon': Icons.question_answer_rounded,
      'color': const Color(0xFFFFFBEB),
    },
  ];

  void _showOrderDossierModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) {
        return GlassContainer(
          borderRadius: const BorderRadius.vertical(top: Radius.circular(32)),
          color: Colors.white.withOpacity(0.96),
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.grey.shade300,
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                'Personalized Life Dossier',
                style: GoogleFonts.cinzel(
                  fontSize: 20,
                  fontWeight: FontWeight.w800,
                  color: AppTheme.textDark,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'Prepared exclusively for Mahi Sharma · 8 Pages PDF + Audio Summary',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 12,
                  color: AppTheme.textMedium,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 20),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppTheme.vedicGoldLight,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: AppTheme.vedicGold.withOpacity(0.4)),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Festive Special Price',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: const Color(0xFF78350F),
                          ),
                        ),
                        Row(
                          children: [
                            Text(
                              '₹299',
                              style: GoogleFonts.plusJakartaSans(
                                fontSize: 24,
                                fontWeight: FontWeight.w900,
                                color: const Color(0xFF78350F),
                              ),
                            ),
                            const SizedBox(width: 8),
                            const Text(
                              '₹799',
                              style: TextStyle(
                                fontSize: 14,
                                color: Colors.grey,
                                decoration: TextDecoration.lineThrough,
                              ),
                            ),
                            const SizedBox(width: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                              decoration: BoxDecoration(
                                color: AppTheme.emeraldGreen,
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: const Text(
                                '62% OFF',
                                style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: Colors.white),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    const Icon(Icons.verified_user_rounded, color: AppTheme.emeraldGreen, size: 28),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              Material(
                color: Colors.transparent,
                child: InkWell(
                  onTap: () {
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Life Report ordered successfully! Preparing PDF dossier...'),
                        backgroundColor: AppTheme.emeraldGreen,
                      ),
                    );
                  },
                  borderRadius: BorderRadius.circular(30),
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFFFFA726), Color(0xFFE59400)],
                      ),
                      borderRadius: BorderRadius.circular(30),
                      boxShadow: [
                        BoxShadow(
                          color: AppTheme.vedicGold.withOpacity(0.35),
                          blurRadius: 16,
                          offset: const Offset(0, 6),
                        ),
                      ],
                    ),
                    child: Center(
                      child: Text(
                        'Unlock & Download My Report',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 15,
                          fontWeight: FontWeight.w800,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 12),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.only(bottom: 110),
      children: [
        // Astrologer Spotlight Hero Card
        _buildSandhyaHeroHeader(),

        const SizedBox(height: 16),

        // Value Proposition
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Mahi, your Full Life Report',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 22,
                  fontWeight: FontWeight.w900,
                  color: AppTheme.textDark,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                '8 comprehensive pages written specifically for your Kundli, page by page.',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 13,
                  color: AppTheme.textMedium,
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 16),

        // 8 Pages Carousel / Breakdown
        ..._reportPages.map((page) => _buildPageCard(page)),

        const SizedBox(height: 16),

        // Bottom CTA
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: _showOrderDossierModal,
              borderRadius: BorderRadius.circular(30),
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 18),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFFFFA726), Color(0xFFE59400)],
                  ),
                  borderRadius: BorderRadius.circular(30),
                  boxShadow: [
                    BoxShadow(
                      color: AppTheme.vedicGold.withOpacity(0.35),
                      blurRadius: 20,
                      offset: const Offset(0, 6),
                    ),
                  ],
                ),
                child: Center(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.download_rounded, color: Colors.white, size: 20),
                      const SizedBox(width: 10),
                      Text(
                        'Get My Full Life Report (₹299)',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 15,
                          fontWeight: FontWeight.w800,
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSandhyaHeroHeader() {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.all(22),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF8D72E1), Color(0xFF6C4AB6), Color(0xFF4D47C3)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(30),
        boxShadow: [
          BoxShadow(
            color: AppTheme.primaryPurple.withOpacity(0.35),
            blurRadius: 24,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'BHAVISHYAA PRESENTS',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 10.5,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 2.0,
                  color: AppTheme.vedicGoldLight,
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.star_rounded, color: AppTheme.vedicGold, size: 14),
                    const SizedBox(width: 4),
                    Text(
                      '5.0 (14k ratings)',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 10.5,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            'ACHARYA SANDHYA',
            style: GoogleFonts.cinzel(
              fontSize: 26,
              fontWeight: FontWeight.w900,
              letterSpacing: 1.5,
              color: Colors.white,
            ),
          ),
          Text(
            'Head of Vedic Research & Senior Kundli Compiler',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 12.5,
              color: Colors.white.withOpacity(0.85),
            ),
          ),
          const SizedBox(height: 16),
          // Sample mini preview card
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.15),
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: Colors.white.withOpacity(0.3)),
            ),
            child: Row(
              children: [
                const Icon(Icons.auto_stories_rounded, color: Colors.white, size: 28),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Full 8-Page Kundli Dossier',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 13.5,
                          fontWeight: FontWeight.w800,
                          color: Colors.white,
                        ),
                      ),
                      Text(
                        'Calculated specifically for Mahi Sharma',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 11,
                          color: Colors.white70,
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    'Preview',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 11,
                      fontWeight: FontWeight.w800,
                      color: AppTheme.primaryPurple,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPageCard(Map<String, dynamic> page) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: GlassContainer(
        onTap: _showOrderDossierModal,
        borderRadius: BorderRadius.circular(22),
        color: page['color'] as Color,
        padding: const EdgeInsets.all(16),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.04),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Center(
                child: Text(
                  page['pageNum'] as String,
                  style: GoogleFonts.cinzel(
                    fontSize: 14,
                    fontWeight: FontWeight.w800,
                    color: AppTheme.primaryPurple,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    page['title'] as String,
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 14,
                      fontWeight: FontWeight.w800,
                      color: AppTheme.textDark,
                    ),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    page['desc'] as String,
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 12,
                      color: AppTheme.textMedium,
                      height: 1.3,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 8),
            const Icon(Icons.lock_outline_rounded, size: 16, color: AppTheme.textMuted),
          ],
        ),
      ),
    );
  }
}
