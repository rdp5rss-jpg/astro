import 'dart:async';
import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';
import '../widgets/glass_container.dart';
import '../models/astrologer.dart';
import 'chat_screen.dart';

class MatchScreen extends StatefulWidget {
  final String userName;
  final DateTime birthDate;
  final String birthCity;
  final String concern;
  final List<String> languages;
  final VoidCallback onFinish;

  const MatchScreen({
    super.key,
    required this.userName,
    required this.birthDate,
    required this.birthCity,
    required this.concern,
    required this.languages,
    required this.onFinish,
  });

  @override
  State<MatchScreen> createState() => _MatchScreenState();
}

class _MatchScreenState extends State<MatchScreen> with SingleTickerProviderStateMixin {
  late AnimationController _rotationController;
  int _activeStage = 0; // 0..4
  Timer? _stageTimer;

  final List<Map<String, String>> _matchSteps = [
    {
      'title': 'Reading your birth chart',
      'detail': 'Calculating planetary houses & Nakshatra',
    },
    {
      'title': 'Focusing on what\'s on your mind',
      'detail': 'Cross-referencing Dasha periods & transits',
    },
    {
      'title': 'Shortlisting verified Vedic Gurus',
      'detail': 'Matching your preferred language & tradition',
    },
    {
      'title': 'Checking live astrologer availability',
      'detail': '14 top-rated astrologers online right now',
    },
    {
      'title': 'Selecting your prime match',
      'detail': 'Best match found: Acharya Rudranand Shastri',
    },
  ];

  @override
  void initState() {
    super.initState();
    _rotationController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 12),
    )..repeat();

    _startProgressSimulation();
  }

  void _startProgressSimulation() {
    _stageTimer = Timer.periodic(const Duration(milliseconds: 1400), (timer) {
      if (_activeStage < _matchSteps.length - 1) {
        setState(() => _activeStage++);
      } else {
        timer.cancel();
      }
    });
  }

  @override
  void dispose() {
    _rotationController.dispose();
    _stageTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isComplete = _activeStage == _matchSteps.length - 1;

    return Scaffold(
      backgroundColor: AppTheme.background,
      body: Stack(
        children: [
          // Ethereal Soft Gradient Background
          Positioned(
            top: -50,
            left: -50,
            child: Container(
              width: 320,
              height: 320,
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
            bottom: -50,
            right: -50,
            child: Container(
              width: 320,
              height: 320,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    AppTheme.vedicGoldLight.withOpacity(0.6),
                    AppTheme.vedicGoldLight.withOpacity(0.0),
                  ],
                ),
              ),
            ),
          ),

          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'STEP ${_activeStage + 1} OF 5',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 12,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 2.0,
                          color: AppTheme.vedicGoldDark,
                        ),
                      ),
                      IconButton(
                        onPressed: widget.onFinish,
                        icon: const Icon(Icons.close_rounded, color: AppTheme.textDark),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),

                  // Animated Celestial Orbit Visual
                  _buildOrbitVisual(),

                  const SizedBox(height: 20),
                  Text(
                    'Finding your perfect match',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 24,
                      fontWeight: FontWeight.w800,
                      color: AppTheme.textDark,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Matching you against our gold-verified Vedic astrologers',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                      color: AppTheme.textMedium,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),

                  // 5 Progress Steps Checklist
                  Expanded(
                    child: ListView.builder(
                      itemCount: _matchSteps.length,
                      physics: const NeverScrollableScrollPhysics(),
                      itemBuilder: (context, index) {
                        final step = _matchSteps[index];
                        final isDone = index < _activeStage;
                        final isCurrent = index == _activeStage;

                        String subtitle = step['detail']!;
                        if (index == 0) {
                          subtitle =
                              '${widget.birthDate.day} ${_getMonth(widget.birthDate.month)} ${widget.birthDate.year} · ${widget.birthCity}';
                        } else if (index == 1) {
                          subtitle = widget.concern;
                        } else if (index == 2) {
                          subtitle = widget.languages.join(' · ');
                        }

                        return Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: GlassContainer(
                            color: isCurrent
                                ? AppTheme.pastelLavender.withOpacity(0.5)
                                : isDone
                                    ? Colors.white.withOpacity(0.9)
                                    : Colors.white.withOpacity(0.5),
                            borderColor: isCurrent
                                ? AppTheme.primaryPurple
                                : isDone
                                    ? AppTheme.emeraldGreen.withOpacity(0.4)
                                    : null,
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                            child: Row(
                              children: [
                                _buildStatusIndicator(isDone, isCurrent),
                                const SizedBox(width: 14),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        step['title']!,
                                        style: GoogleFonts.plusJakartaSans(
                                          fontSize: 14,
                                          fontWeight: isCurrent || isDone
                                              ? FontWeight.w700
                                              : FontWeight.w500,
                                          color: isCurrent
                                              ? AppTheme.primaryPurple
                                              : isDone
                                                  ? AppTheme.textDark
                                                  : AppTheme.textMuted,
                                        ),
                                      ),
                                      const SizedBox(height: 2),
                                      Text(
                                        subtitle,
                                        style: GoogleFonts.plusJakartaSans(
                                          fontSize: 12,
                                          fontWeight: FontWeight.w500,
                                          color: isCurrent || isDone
                                              ? AppTheme.textMedium
                                              : AppTheme.textMuted.withOpacity(0.7),
                                        ),
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),

                  // Bottom Action CTA
                  if (isComplete)
                    Material(
                      color: Colors.transparent,
                      child: InkWell(
                        onTap: () {
                          // Connect directly with Astrologer in Live Chat!
                          final astro = Astrologer.sampleAstrologers.first;
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (_) => ChatScreen(astrologer: astro),
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
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                            borderRadius: BorderRadius.circular(30),
                            boxShadow: [
                              BoxShadow(
                                color: AppTheme.vedicGold.withOpacity(0.4),
                                blurRadius: 20,
                                offset: const Offset(0, 6),
                              ),
                            ],
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Icon(Icons.chat_bubble_rounded, color: Colors.white, size: 20),
                              const SizedBox(width: 10),
                              Text(
                                'Start Consultation (50% OFF)',
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
                    )
                  else
                    // Progress Bar
                    ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: LinearProgressIndicator(
                        value: (_activeStage + 1) / _matchSteps.length,
                        minHeight: 6,
                        backgroundColor: const Color(0xFFE2E8F0),
                        valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.vedicGold),
                      ),
                    ),
                  const SizedBox(height: 12),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildOrbitVisual() {
    return AnimatedBuilder(
      animation: _rotationController,
      builder: (context, child) {
        return SizedBox(
          width: 150,
          height: 150,
          child: Stack(
            alignment: Alignment.center,
            children: [
              // Outer orbit ring
              Container(
                width: 140,
                height: 140,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: AppTheme.vedicGold.withOpacity(0.25),
                    width: 1.5,
                  ),
                ),
              ),
              // Middle orbit ring
              Container(
                width: 100,
                height: 100,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: AppTheme.primaryPurple.withOpacity(0.3),
                    width: 1.5,
                  ),
                ),
              ),
              // Rotating Planet 1
              Transform.rotate(
                angle: _rotationController.value * 2 * math.pi,
                child: Align(
                  alignment: Alignment.topCenter,
                  child: Container(
                    width: 14,
                    height: 14,
                    decoration: const BoxDecoration(
                      color: AppTheme.primaryPurple,
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
              ),
              // Rotating Planet 2
              Transform.rotate(
                angle: -_rotationController.value * 2 * math.pi * 1.5,
                child: Align(
                  alignment: Alignment.centerRight,
                  child: Container(
                    width: 10,
                    height: 10,
                    decoration: const BoxDecoration(
                      color: AppTheme.vedicGold,
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
              ),
              // Glowing Central Sun / Star
              Container(
                width: 58,
                height: 58,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: const RadialGradient(
                    colors: [Color(0xFFFFD54F), Color(0xFFFFA000)],
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: AppTheme.vedicGold.withOpacity(0.55),
                      blurRadius: 24,
                      spreadRadius: 4,
                    ),
                  ],
                ),
                child: const Center(
                  child: Icon(
                    Icons.auto_awesome,
                    color: Colors.white,
                    size: 28,
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildStatusIndicator(bool isDone, bool isCurrent) {
    if (isDone) {
      return Container(
        width: 24,
        height: 24,
        decoration: const BoxDecoration(
          color: AppTheme.emeraldGreen,
          shape: BoxShape.circle,
        ),
        child: const Icon(Icons.check, size: 16, color: Colors.white),
      );
    } else if (isCurrent) {
      return const SizedBox(
        width: 22,
        height: 22,
        child: CircularProgressIndicator(
          strokeWidth: 2.5,
          valueColor: AlwaysStoppedAnimation<Color>(AppTheme.primaryPurple),
        ),
      );
    } else {
      return Container(
        width: 22,
        height: 22,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(color: const Color(0xFFCBD5E1), width: 2),
        ),
      );
    }
  }

  String _getMonth(int month) {
    const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return m[month - 1];
  }
}
