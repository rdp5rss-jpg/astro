import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';
import '../widgets/glass_container.dart';

class WalletScreen extends StatefulWidget {
  final int balance;
  final ValueChanged<int> onBalanceUpdated;

  const WalletScreen({
    super.key,
    required this.balance,
    required this.onBalanceUpdated,
  });

  @override
  State<WalletScreen> createState() => _WalletScreenState();
}

class _WalletScreenState extends State<WalletScreen> {
  final List<Map<String, dynamic>> _rechargePacks = [
    {
      'amount': 99,
      'bonus': 0,
      'popular': false,
      'tag': 'Trial Pack',
    },
    {
      'amount': 299,
      'bonus': 50,
      'popular': true,
      'tag': 'Most Popular 🔥',
    },
    {
      'amount': 499,
      'bonus': 100,
      'popular': false,
      'tag': 'Value Pack (20% Extra)',
    },
    {
      'amount': 999,
      'bonus': 300,
      'popular': false,
      'tag': 'Mega Pack (30% Extra)',
    },
  ];

  void _recharge(int amount, int bonus) {
    widget.onBalanceUpdated(widget.balance + amount + bonus);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Recharge successful! Added ₹${amount + bonus} to your Bhavishyaa wallet.'),
        backgroundColor: AppTheme.emeraldGreen,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.only(bottom: 100),
      children: [
        // Main Balance Card
        Container(
          margin: const EdgeInsets.all(16),
          padding: const EdgeInsets.all(22),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              colors: [Color(0xFF8D72E1), Color(0xFF6C4AB6)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(28),
            boxShadow: [
              BoxShadow(
                color: AppTheme.primaryPurple.withOpacity(0.35),
                blurRadius: 24,
                offset: const Offset(0, 8),
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
                    'BHAVISHYAA WALLET',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 11,
                      fontWeight: FontWeight.w800,
                      letterSpacing: 1.5,
                      color: Colors.white70,
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      '100% Refund Guarantee',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 10.5,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),
              Text(
                '₹${widget.balance}.00',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 36,
                  fontWeight: FontWeight.w900,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'Usable across all verified Astrologers, Tarot readers & Life Dossiers.',
                style: GoogleFonts.plusJakartaSans(fontSize: 12, color: Colors.white70),
              ),
            ],
          ),
        ),

        // Recharge Packs Header
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Text(
            'Select Recharge Pack',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 18,
              fontWeight: FontWeight.w800,
              color: AppTheme.textDark,
            ),
          ),
        ),
        const SizedBox(height: 12),

        // Packs Grid
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          padding: const EdgeInsets.symmetric(horizontal: 16),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 12,
            mainAxisSpacing: 12,
            childAspectRatio: 1.35,
          ),
          itemCount: _rechargePacks.length,
          itemBuilder: (context, index) {
            final pack = _rechargePacks[index];
            final isPop = pack['popular'] as bool;

            return GlassContainer(
              onTap: () => _recharge(pack['amount'] as int, pack['bonus'] as int),
              color: isPop ? AppTheme.vedicGoldLight : Colors.white.withOpacity(0.9),
              borderColor: isPop ? AppTheme.vedicGold : null,
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: isPop ? AppTheme.vedicGoldDark : AppTheme.primaryPurple.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      pack['tag'] as String,
                      style: TextStyle(
                        fontSize: 9.5,
                        fontWeight: FontWeight.w800,
                        color: isPop ? Colors.white : AppTheme.primaryPurple,
                      ),
                    ),
                  ),
                  Row(
                    children: [
                      Text(
                        '₹${pack['amount']}',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 22,
                          fontWeight: FontWeight.w900,
                          color: AppTheme.textDark,
                        ),
                      ),
                      if (pack['bonus'] > 0) ...[
                        const SizedBox(width: 4),
                        Text(
                          '+₹${pack['bonus']} Free',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 11,
                            fontWeight: FontWeight.w800,
                            color: AppTheme.emeraldGreen,
                          ),
                        ),
                      ],
                    ],
                  ),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(vertical: 6),
                    decoration: BoxDecoration(
                      color: isPop ? AppTheme.vedicGoldDark : AppTheme.primaryPurple,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Center(
                      child: Text(
                        'Add Money',
                        style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: Colors.white),
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        ),

        const SizedBox(height: 24),

        // User Profile & Family Profiles
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Text(
            'Saved Kundli Profiles',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 18,
              fontWeight: FontWeight.w800,
              color: AppTheme.textDark,
            ),
          ),
        ),
        const SizedBox(height: 12),

        Container(
          margin: const EdgeInsets.symmetric(horizontal: 16),
          child: GlassContainer(
            borderRadius: BorderRadius.circular(22),
            color: Colors.white.withOpacity(0.9),
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                _buildProfileRow('Mahi Sharma (You)', '14 Oct 1998 · Scorpio Lagna', isSelected: true),
                const Divider(),
                _buildProfileRow('Rohan Sharma (Brother)', '02 Feb 2002 · Taurus Lagna'),
                const Divider(),
                _buildProfileRow('Sita Sharma (Mother)', '19 Aug 1974 · Leo Lagna'),
                const SizedBox(height: 10),
                Material(
                  color: Colors.transparent,
                  child: InkWell(
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Add family member modal opened')),
                      );
                    },
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.add_circle_outline_rounded, color: AppTheme.primaryPurple, size: 18),
                        const SizedBox(width: 8),
                        Text(
                          'Add Family Member Kundli',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 13,
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
        ),

        const SizedBox(height: 24),

        // Settings & Support links
        Container(
          margin: const EdgeInsets.symmetric(horizontal: 16),
          child: GlassContainer(
            borderRadius: BorderRadius.circular(22),
            color: Colors.white.withOpacity(0.9),
            padding: const EdgeInsets.all(8),
            child: Column(
              children: [
                _buildSettingTile(Icons.support_agent_rounded, '24/7 Astrologer Customer Care'),
                _buildSettingTile(Icons.lock_outline_rounded, 'Privacy & Confidentiality Guarantee'),
                _buildSettingTile(Icons.rule_rounded, 'Terms of Astrological Services'),
                _buildSettingTile(Icons.star_outline_rounded, 'Rate Bhavishyaa on Play Store'),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildProfileRow(String name, String details, {bool isSelected = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              CircleAvatar(
                radius: 18,
                backgroundColor: isSelected ? AppTheme.primaryPurple : const Color(0xFFE2E8F0),
                child: Text(
                  name[0],
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w800,
                    color: isSelected ? Colors.white : AppTheme.textDark,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 13.5,
                      fontWeight: FontWeight.w700,
                      color: AppTheme.textDark,
                    ),
                  ),
                  Text(
                    details,
                    style: GoogleFonts.plusJakartaSans(fontSize: 11, color: AppTheme.textMedium),
                  ),
                ],
              ),
            ],
          ),
          if (isSelected)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: AppTheme.pastelLavender,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text(
                'Active',
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: AppTheme.primaryPurple),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildSettingTile(IconData icon, String title) {
    return ListTile(
      leading: Icon(icon, color: AppTheme.primaryPurple, size: 20),
      title: Text(
        title,
        style: GoogleFonts.plusJakartaSans(
          fontSize: 13.5,
          fontWeight: FontWeight.w600,
          color: AppTheme.textDark,
        ),
      ),
      trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 14, color: AppTheme.textMuted),
      onTap: () {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Opened $title')),
        );
      },
    );
  }
}
