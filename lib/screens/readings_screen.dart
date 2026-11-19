import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';
import '../widgets/glass_container.dart';
import '../models/astrologer.dart';
import 'chat_screen.dart';

class ReadingsScreen extends StatefulWidget {
  final VoidCallback onFindAstrologer;

  const ReadingsScreen({super.key, required this.onFindAstrologer});

  @override
  State<ReadingsScreen> createState() => _ReadingsScreenState();
}

class _ReadingsScreenState extends State<ReadingsScreen> {
  int _selectedTab = 0; // 0 = Chat, 1 = Call
  String _activeFilter = 'All';

  final List<String> _filters = ['All', 'Vedic', 'Tarot', 'Career', 'Marriage', 'Love'];

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.only(bottom: 100),
      children: [
        // Chat vs Call Segmented Glass Control
        _buildSegmentedControl(),

        // Filter Pills
        _buildFilterBar(),

        if (_selectedTab == 0) ...[
          // Active Consultation Banner
          _buildActiveConsultationCard(),

          const SizedBox(height: 16),

          // Available Astrologers Ready to Chat
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Top Astrologers Online',
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 17,
                    fontWeight: FontWeight.w800,
                    color: AppTheme.textDark,
                  ),
                ),
                Text(
                  '18 Available Now',
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.emeraldGreen,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          ...Astrologer.sampleAstrologers.map((astro) => _buildConsultListItem(astro, isCall: false)),
        ] else ...[
          // Voice Call Tab
          _buildVoiceCallSection(),
        ],
      ],
    );
  }

  Widget _buildSegmentedControl() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.85),
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: Colors.white.withOpacity(0.95)),
        boxShadow: AppTheme.softShadow,
      ),
      child: Row(
        children: [
          Expanded(
            child: GestureDetector(
              onTap: () => setState(() => _selectedTab = 0),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                padding: const EdgeInsets.symmetric(vertical: 12),
                decoration: BoxDecoration(
                  gradient: _selectedTab == 0
                      ? const LinearGradient(
                          colors: [Color(0xFF8D72E1), Color(0xFF6C4AB6)],
                        )
                      : null,
                  borderRadius: BorderRadius.circular(26),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.chat_bubble_outline_rounded,
                      size: 18,
                      color: _selectedTab == 0 ? Colors.white : AppTheme.textMedium,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      'Live Chat',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                        color: _selectedTab == 0 ? Colors.white : AppTheme.textDark,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          Expanded(
            child: GestureDetector(
              onTap: () => setState(() => _selectedTab = 1),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                padding: const EdgeInsets.symmetric(vertical: 12),
                decoration: BoxDecoration(
                  gradient: _selectedTab == 1
                      ? const LinearGradient(
                          colors: [Color(0xFF8D72E1), Color(0xFF6C4AB6)],
                        )
                      : null,
                  borderRadius: BorderRadius.circular(26),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.phone_in_talk_rounded,
                      size: 18,
                      color: _selectedTab == 1 ? Colors.white : AppTheme.textMedium,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      'Voice Call',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                        color: _selectedTab == 1 ? Colors.white : AppTheme.textDark,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterBar() {
    return SizedBox(
      height: 48,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: _filters.length,
        itemBuilder: (context, index) {
          final f = _filters[index];
          final isSel = _activeFilter == f;

          return Padding(
            padding: const EdgeInsets.only(right: 8, top: 4, bottom: 4),
            child: ChoiceChip(
              label: Text(f),
              selected: isSel,
              selectedColor: AppTheme.primaryPurple,
              backgroundColor: Colors.white.withOpacity(0.85),
              labelStyle: GoogleFonts.plusJakartaSans(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: isSel ? Colors.white : AppTheme.textDark,
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(18),
                side: BorderSide(
                  color: isSel ? AppTheme.primaryPurple : const Color(0xFFE2E8F0),
                ),
              ),
              onSelected: (val) {
                if (val) setState(() => _activeFilter = f);
              },
            ),
          );
        },
      ),
    );
  }

  Widget _buildActiveConsultationCard() {
    final rudra = Astrologer.sampleAstrologers.first;

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: GlassContainer(
        onTap: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_) => ChatScreen(astrologer: rudra),
            ),
          );
        },
        borderRadius: BorderRadius.circular(24),
        color: const Color(0xFFEBF7F2),
        borderColor: AppTheme.emeraldGreen.withOpacity(0.5),
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            Stack(
              children: [
                CircleAvatar(
                  radius: 26,
                  backgroundColor: AppTheme.emeraldGreen.withOpacity(0.2),
                  child: const Text('R', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18)),
                ),
                Positioned(
                  bottom: 0,
                  right: 0,
                  child: Container(
                    width: 14,
                    height: 14,
                    decoration: BoxDecoration(
                      color: AppTheme.emeraldGreen,
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 2),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        'Acharya Rudranand',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 15,
                          fontWeight: FontWeight.w800,
                          color: AppTheme.textDark,
                        ),
                      ),
                      const SizedBox(width: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: AppTheme.emeraldGreen,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Text(
                          'LIVE SESSION',
                          style: TextStyle(
                            fontSize: 9,
                            fontWeight: FontWeight.w900,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Mahi ji what do you want to know about your marriage?',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 12,
                      color: AppTheme.textMedium,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward_ios_rounded, size: 16, color: AppTheme.emeraldGreen),
          ],
        ),
      ),
    );
  }

  Widget _buildConsultListItem(Astrologer astro, {required bool isCall}) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: GlassContainer(
        onTap: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_) => ChatScreen(astrologer: astro),
            ),
          );
        },
        borderRadius: BorderRadius.circular(22),
        padding: const EdgeInsets.all(14),
        child: Row(
          children: [
            // Avatar
            Stack(
              children: [
                CircleAvatar(
                  radius: 28,
                  backgroundColor: AppTheme.pastelLavender,
                  child: Text(
                    astro.name[0],
                    style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 20, color: AppTheme.primaryPurple),
                  ),
                ),
                Positioned(
                  bottom: 2,
                  right: 2,
                  child: Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      color: astro.isOnline ? AppTheme.emeraldGreen : Colors.grey,
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 2),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(width: 14),
            // Info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Flexible(
                        child: Text(
                          astro.name,
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 14.5,
                            fontWeight: FontWeight.w800,
                            color: AppTheme.textDark,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const SizedBox(width: 4),
                      const Icon(Icons.verified, size: 14, color: AppTheme.emeraldGreen),
                    ],
                  ),
                  const SizedBox(height: 2),
                  Text(
                    astro.skills.take(2).join(', '),
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 11.5,
                      color: AppTheme.textMedium,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      const Icon(Icons.star_rounded, size: 14, color: AppTheme.vedicGold),
                      Text(
                        ' ${astro.rating}',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        '${astro.experienceYears} yrs',
                        style: GoogleFonts.plusJakartaSans(fontSize: 11, color: AppTheme.textMuted),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        '${(astro.reviewsCount / 1000).toStringAsFixed(1)}k reviews',
                        style: GoogleFonts.plusJakartaSans(fontSize: 11, color: AppTheme.textMuted),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(width: 8),
            // CTA Button
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Row(
                  children: [
                    Text(
                      '₹${astro.ratePerMin}',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 14,
                        fontWeight: FontWeight.w900,
                        color: AppTheme.textDark,
                      ),
                    ),
                    const Text('/m', style: TextStyle(fontSize: 10, color: Colors.grey)),
                  ],
                ),
                const SizedBox(height: 6),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFF8D72E1), Color(0xFF6C4AB6)],
                    ),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        isCall ? Icons.phone_rounded : Icons.chat_bubble_rounded,
                        size: 12,
                        color: Colors.white,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        isCall ? 'Call' : 'Chat',
                        style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildVoiceCallSection() {
    return Column(
      children: [
        // Voice Call Empty/Promo State
        Container(
          margin: const EdgeInsets.all(24),
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.9),
            borderRadius: BorderRadius.circular(26),
            border: Border.all(color: Colors.white),
            boxShadow: AppTheme.softShadow,
          ),
          child: Column(
            children: [
              Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  color: AppTheme.pastelLavender.withOpacity(0.5),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.phone_in_talk_rounded, color: AppTheme.primaryPurple, size: 30),
              ),
              const SizedBox(height: 16),
              Text(
                'Instant Voice Readings',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                  color: AppTheme.textDark,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'Speak directly in private, secure 1-on-1 audio calls with India\'s top Vedic Gurus.',
                style: GoogleFonts.plusJakartaSans(fontSize: 13, color: AppTheme.textMedium),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              Material(
                color: Colors.transparent,
                child: InkWell(
                  onTap: () {
                    final astro = Astrologer.sampleAstrologers[1];
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (_) => ChatScreen(astrologer: astro),
                      ),
                    );
                  },
                  borderRadius: BorderRadius.circular(24),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFF8D72E1), Color(0xFF6C4AB6)],
                      ),
                      borderRadius: BorderRadius.circular(24),
                    ),
                    child: Text(
                      'Connect with Live Astrologer',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 13,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        // List of Call Gurus
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            children: [
              Text(
                'Verified Astrologers for Voice Call',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 16,
                  fontWeight: FontWeight.w800,
                  color: AppTheme.textDark,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 10),
        ...Astrologer.sampleAstrologers.map((astro) => _buildConsultListItem(astro, isCall: true)),
      ],
    );
  }
}
