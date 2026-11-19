import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';
import '../widgets/glass_container.dart';
import 'match_screen.dart';

class OnboardingScreen extends StatefulWidget {
  final VoidCallback onComplete;

  const OnboardingScreen({super.key, required this.onComplete});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  int _currentStep = 0; // 0 = Welcome/Auth, 1..9 = onboarding steps
  final int _totalSteps = 9;

  // Collected User Data
  String _name = 'Mahi';
  String _gender = 'Female';
  String _primaryConcern = 'Marriage';
  String _subConcern = 'When will I marry';
  String _experienceWithAstro = 'Yes, once or twice';
  DateTime _birthDate = DateTime(1998, 10, 14);
  TimeOfDay _birthTime = const TimeOfDay(hour: 8, minute: 30);
  bool _unknownBirthTime = false;
  String _birthCity = 'Visakhapatnam, Andhra Pradesh';
  String _currentCity = 'Hyderabad, Telangana';
  final Set<String> _selectedLanguages = {'English', 'हिन्दी', 'తెలుగు'};
  String _foundVia = 'Instagram';

  // Controllers
  final TextEditingController _nameController = TextEditingController(text: 'Mahi');
  final TextEditingController _citySearchController = TextEditingController();

  final List<String> _languages = [
    'English',
    'हिन्दी',
    'தமிழ்',
    'తెలుగు',
    'বাংলা',
    'मराठी',
    'ગુજરાતી',
    'ಕನ್ನಡ',
    'മലയാളം',
    'ਪੰਜਾਬੀ',
    'اردو',
    'ଓଡ଼ିଆ',
  ];

  final Map<String, List<String>> _concernSubOptions = {
    'Money': [
      'Money owed to me',
      'Property or an investment',
      'Money from my business',
      'Debt or a loss',
      'When will money come',
      'My finances in general',
    ],
    'Marriage': [
      'When will I marry',
      'Will this person marry me',
      'Divorce or a second marriage',
      'Trouble in my marriage',
      'Convincing my family',
      'My marriage in general',
    ],
    'Love': [
      'Will they commit to me',
      'Getting my ex back',
      'Does my crush like me',
      'Finding true love',
      'Cheating and trust issues',
      'My love life in general',
    ],
    'Health': [
      'Stress and anxiety relief',
      'A family member\'s health',
      'Pregnancy and childbirth',
      'My physical health',
      'Overall well-being',
    ],
    'Career': [
      'Moving abroad / Visa success',
      'Getting my dream job',
      'A job change or promotion',
      'Competitive exams and studies',
      'My new business venture',
      'My career growth in general',
    ],
    'Something else': [
      'Spiritual path and Kundalini',
      'Family disputes resolution',
      'Black magic / Evil eye removal',
      'Foreign travel & settlement',
      'General life destiny guidance',
    ],
  };

  final List<String> _referralOptions = [
    'Instagram',
    'YouTube',
    'Friend or family',
    'ChatGPT / AI',
    'Google search',
    'Astrologer recommended',
    'Play / App Store',
    'Facebook',
    'Other',
  ];

  @override
  void dispose() {
    _nameController.dispose();
    _citySearchController.dispose();
    super.dispose();
  }

  void _nextStep() {
    if (_currentStep < _totalSteps) {
      setState(() => _currentStep++);
    } else {
      // Completed! Go to Match Screen
      Navigator.of(context).push(
        PageRouteBuilder(
          pageBuilder: (_, __, ___) => MatchScreen(
            userName: _name,
            birthDate: _birthDate,
            birthCity: _birthCity,
            concern: _primaryConcern,
            languages: _selectedLanguages.toList(),
            onFinish: widget.onComplete,
          ),
          transitionsBuilder: (_, animation, __, child) {
            return FadeTransition(opacity: animation, child: child);
          },
        ),
      );
    }
  }

  void _previousStep() {
    if (_currentStep > 0) {
      setState(() => _currentStep--);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      body: Stack(
        children: [
          // Ethereal Soft Gradient Background Orbs
          Positioned(
            top: -100,
            right: -80,
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
            bottom: 50,
            left: -100,
            child: Container(
              width: 350,
              height: 350,
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

          SafeArea(
            child: Column(
              children: [
                if (_currentStep > 0) _buildTopProgressNav(),
                Expanded(
                  child: AnimatedSwitcher(
                    duration: const Duration(milliseconds: 320),
                    transitionBuilder: (child, animation) {
                      return SlideTransition(
                        position: Tween<Offset>(
                          begin: const Offset(0.06, 0),
                          end: Offset.zero,
                        ).animate(animation),
                        child: FadeTransition(opacity: animation, child: child),
                      );
                    },
                    child: _buildCurrentStepWidget(),
                  ),
                ),
                if (_currentStep > 0) _buildBottomButtons(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTopProgressNav() {
    final progress = _currentStep / _totalSteps;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              GlassContainer(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                borderRadius: BorderRadius.circular(20),
                child: Row(
                  children: [
                    const Icon(Icons.headset_mic_outlined, size: 16, color: AppTheme.primaryPurple),
                    const SizedBox(width: 6),
                    Text(
                      'Support',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: AppTheme.textDark,
                      ),
                    ),
                  ],
                ),
              ),
              Text(
                '$_currentStep of $_totalSteps',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 13,
                  fontWeight: FontWeight.w700,
                  color: AppTheme.textMedium,
                ),
              ),
              TextButton(
                onPressed: widget.onComplete,
                child: Text(
                  'Skip to App',
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.primaryPurple,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          // Soft Progress Bar
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: LinearProgressIndicator(
              value: progress,
              minHeight: 5,
              backgroundColor: const Color(0xFFE2E8F0),
              valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.vedicGold),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomButtons() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      child: Row(
        children: [
          Expanded(
            flex: 2,
            child: GlassContainer(
              onTap: _previousStep,
              borderRadius: BorderRadius.circular(30),
              color: Colors.white.withOpacity(0.85),
              padding: const EdgeInsets.symmetric(vertical: 16),
              child: Center(
                child: Text(
                  'Back',
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    color: AppTheme.textDark,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            flex: 3,
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                onTap: _nextStep,
                borderRadius: BorderRadius.circular(30),
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFF8D72E1), Color(0xFF6C4AB6)],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    borderRadius: BorderRadius.circular(30),
                    boxShadow: [
                      BoxShadow(
                        color: AppTheme.primaryPurple.withOpacity(0.35),
                        blurRadius: 18,
                        offset: const Offset(0, 6),
                      ),
                    ],
                  ),
                  child: Center(
                    child: Text(
                      _currentStep == _totalSteps ? 'Find Astrologer' : 'Continue',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 15,
                        fontWeight: FontWeight.w700,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCurrentStepWidget() {
    switch (_currentStep) {
      case 0:
        return _buildWelcomeAuthStep();
      case 1:
        return _buildStep1Name();
      case 2:
        return _buildStep2Gender();
      case 3:
        return _buildStep3Concern();
      case 4:
        return _buildStep4Experience();
      case 5:
        return _buildStep5BirthTime();
      case 6:
        return _buildStep6BirthPlace();
      case 7:
        return _buildStep7CurrentPlace();
      case 8:
        return _buildStep8Languages();
      case 9:
        return _buildStep9Referral();
      default:
        return const SizedBox();
    }
  }

  // STEP 0: Welcome / Login
  Widget _buildWelcomeAuthStep() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Spacer(),
          // Glowing Cosmic Logo
          Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF8D72E1), Color(0xFF6C4AB6)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              shape: BoxShape.circle,
              boxShadow: [
                BoxShadow(
                  color: AppTheme.primaryPurple.withOpacity(0.35),
                  blurRadius: 30,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: const Center(
              child: Icon(Icons.auto_awesome_rounded, color: Colors.white, size: 50),
            ),
          ),
          const SizedBox(height: 24),
          Text(
            'BHAVISHYAA',
            style: GoogleFonts.cinzel(
              fontSize: 34,
              fontWeight: FontWeight.w900,
              letterSpacing: 3,
              color: AppTheme.textDark,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            'India\'s #1 Premium Vedic Astrology App',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: AppTheme.vedicGoldDark,
            ),
          ),
          const SizedBox(height: 14),
          // Trust Rating
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ...List.generate(
                5,
                (i) => const Icon(Icons.star_rounded, color: AppTheme.vedicGold, size: 20),
              ),
              const SizedBox(width: 8),
              Text(
                '4.9 out of 5 · 1,284 reviews on Trustpilot',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                  color: AppTheme.textMedium,
                ),
              ),
            ],
          ),
          const Spacer(),
          Text(
            'Login or Sign Up',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 22,
              fontWeight: FontWeight.w800,
              color: AppTheme.textDark,
            ),
          ),
          const SizedBox(height: 20),
          // Google Button
          _buildAuthButton(
            icon: Icons.g_mobiledata_rounded,
            iconSize: 30,
            label: 'Continue with Google',
            onTap: () => setState(() => _currentStep = 1),
          ),
          const SizedBox(height: 12),
          // WhatsApp Button
          _buildAuthButton(
            icon: Icons.chat_rounded,
            iconColor: const Color(0xFF25D366),
            label: 'Continue with WhatsApp',
            onTap: () => setState(() => _currentStep = 1),
          ),
          const SizedBox(height: 12),
          // Email Button
          _buildAuthButton(
            icon: Icons.mail_outline_rounded,
            label: 'Continue with email',
            isPrimary: true,
            onTap: () => setState(() => _currentStep = 1),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  Widget _buildAuthButton({
    required IconData icon,
    required String label,
    required VoidCallback onTap,
    Color? iconColor,
    double iconSize = 20,
    bool isPrimary = false,
  }) {
    if (isPrimary) {
      return Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(30),
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF8D72E1), Color(0xFF6C4AB6)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(30),
              boxShadow: [
                BoxShadow(
                  color: AppTheme.primaryPurple.withOpacity(0.3),
                  blurRadius: 16,
                  offset: const Offset(0, 6),
                ),
              ],
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(icon, color: Colors.white, size: iconSize),
                const SizedBox(width: 10),
                Text(
                  label,
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    }

    return GlassContainer(
      onTap: onTap,
      borderRadius: BorderRadius.circular(30),
      padding: const EdgeInsets.symmetric(vertical: 15),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: iconColor ?? AppTheme.textDark, size: iconSize),
          const SizedBox(width: 10),
          Text(
            label,
            style: GoogleFonts.plusJakartaSans(
              fontSize: 15,
              fontWeight: FontWeight.w600,
              color: AppTheme.textDark,
            ),
          ),
        ],
      ),
    );
  }

  // STEP 1: Name
  Widget _buildStep1Name() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 16),
          Text(
            'What should we call you?',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 26,
              fontWeight: FontWeight.w800,
              color: AppTheme.textDark,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Your name helps our Vedic Gurus calibrate your personalized predictions.',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 14,
              color: AppTheme.textMedium,
            ),
          ),
          const SizedBox(height: 32),
          GlassContainer(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            child: TextField(
              controller: _nameController,
              onChanged: (val) => _name = val,
              style: GoogleFonts.plusJakartaSans(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: AppTheme.textDark,
              ),
              decoration: InputDecoration(
                hintText: 'Enter your name',
                hintStyle: GoogleFonts.plusJakartaSans(
                  fontSize: 16,
                  color: AppTheme.textMuted,
                ),
                border: InputBorder.none,
                icon: const Icon(Icons.person_outline_rounded, color: AppTheme.primaryPurple),
              ),
            ),
          ),
        ],
      ),
    );
  }

  // STEP 2: Gender
  Widget _buildStep2Gender() {
    final genders = [
      {'title': 'Male', 'icon': Icons.male_rounded},
      {'title': 'Female', 'icon': Icons.female_rounded},
      {'title': 'Other', 'icon': Icons.transgender_rounded},
    ];

    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 16),
          Text(
            'What is your gender?',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 26,
              fontWeight: FontWeight.w800,
              color: AppTheme.textDark,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Planetary energy manifestations differ across masculine and feminine alignments.',
            style: GoogleFonts.plusJakartaSans(fontSize: 14, color: AppTheme.textMedium),
          ),
          const SizedBox(height: 32),
          Row(
            children: genders.map((g) {
              final isSel = _gender == g['title'];
              return Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 6),
                  child: GlassContainer(
                    onTap: () => setState(() => _gender = g['title'] as String),
                    color: isSel ? AppTheme.pastelLavender : Colors.white.withOpacity(0.8),
                    borderColor: isSel ? AppTheme.primaryPurple : null,
                    padding: const EdgeInsets.symmetric(vertical: 24),
                    child: Column(
                      children: [
                        Icon(
                          g['icon'] as IconData,
                          size: 32,
                          color: isSel ? AppTheme.primaryPurple : AppTheme.textMedium,
                        ),
                        const SizedBox(height: 10),
                        Text(
                          g['title'] as String,
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 15,
                            fontWeight: isSel ? FontWeight.w800 : FontWeight.w600,
                            color: isSel ? AppTheme.primaryPurple : AppTheme.textDark,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  // STEP 3: Concern & Sub-Concern
  Widget _buildStep3Concern() {
    final concerns = [
      {'title': 'Marriage', 'icon': Icons.favorite_rounded},
      {'title': 'Love', 'icon': Icons.favorite_border_rounded},
      {'title': 'Career', 'icon': Icons.work_outline_rounded},
      {'title': 'Money', 'icon': Icons.account_balance_wallet_outlined},
      {'title': 'Health', 'icon': Icons.spa_outlined},
      {'title': 'Something else', 'icon': Icons.more_horiz_rounded},
    ];

    final subOptions = _concernSubOptions[_primaryConcern] ?? [];

    return ListView(
      padding: const EdgeInsets.all(24.0),
      children: [
        const SizedBox(height: 8),
        Text(
          'What\'s on your mind?',
          style: GoogleFonts.plusJakartaSans(
            fontSize: 26,
            fontWeight: FontWeight.w800,
            color: AppTheme.textDark,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          'Select your primary life sector to connect with specialist astrologers.',
          style: GoogleFonts.plusJakartaSans(fontSize: 14, color: AppTheme.textMedium),
        ),
        const SizedBox(height: 20),
        // Primary Concern Grid
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children: concerns.map((c) {
            final isSel = _primaryConcern == c['title'];
            return ChoiceChip(
              label: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    c['icon'] as IconData,
                    size: 16,
                    color: isSel ? Colors.white : AppTheme.primaryPurple,
                  ),
                  const SizedBox(width: 8),
                  Text(c['title'] as String),
                ],
              ),
              selected: isSel,
              selectedColor: AppTheme.primaryPurple,
              backgroundColor: Colors.white.withOpacity(0.9),
              labelStyle: GoogleFonts.plusJakartaSans(
                fontWeight: FontWeight.w600,
                color: isSel ? Colors.white : AppTheme.textDark,
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
                side: BorderSide(
                  color: isSel ? AppTheme.primaryPurple : const Color(0xFFE2E8F0),
                ),
              ),
              onSelected: (val) {
                if (val) {
                  setState(() {
                    _primaryConcern = c['title'] as String;
                    _subConcern = _concernSubOptions[_primaryConcern]?.first ?? '';
                  });
                }
              },
            );
          }).toList(),
        ),
        const SizedBox(height: 24),
        Text(
          'Specific question for $_primaryConcern:',
          style: GoogleFonts.plusJakartaSans(
            fontSize: 17,
            fontWeight: FontWeight.w700,
            color: AppTheme.textDark,
          ),
        ),
        const SizedBox(height: 12),
        ...subOptions.map((sub) {
          final isSel = _subConcern == sub;
          return Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: GlassContainer(
              onTap: () => setState(() => _subConcern = sub),
              color: isSel ? AppTheme.vedicGoldLight : Colors.white.withOpacity(0.85),
              borderColor: isSel ? AppTheme.vedicGold : null,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              child: Row(
                children: [
                  Icon(
                    isSel ? Icons.check_circle_rounded : Icons.radio_button_unchecked_rounded,
                    color: isSel ? AppTheme.vedicGoldDark : AppTheme.textMuted,
                    size: 20,
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Text(
                      sub,
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 14,
                        fontWeight: isSel ? FontWeight.w700 : FontWeight.w500,
                        color: isSel ? const Color(0xFF8C4C00) : AppTheme.textDark,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        }),
      ],
    );
  }

  // STEP 4: Astrologer Experience
  Widget _buildStep4Experience() {
    final options = [
      {'title': 'Yes, regularly', 'icon': Icons.repeat_rounded},
      {'title': 'Yes, once or twice', 'icon': Icons.chat_bubble_outline_rounded},
      {'title': 'No, but I need answers', 'icon': Icons.search_rounded},
      {'title': 'No, just curious', 'icon': Icons.visibility_outlined},
    ];

    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 16),
          Text(
            'Have you talked to an astrologer before?',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 26,
              fontWeight: FontWeight.w800,
              color: AppTheme.textDark,
            ),
          ),
          const SizedBox(height: 24),
          ...options.map((opt) {
            final isSel = _experienceWithAstro == opt['title'];
            return Padding(
              padding: const EdgeInsets.only(bottom: 14),
              child: GlassContainer(
                onTap: () => setState(() => _experienceWithAstro = opt['title'] as String),
                color: isSel ? AppTheme.pastelLavender : Colors.white.withOpacity(0.85),
                borderColor: isSel ? AppTheme.primaryPurple : null,
                padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: isSel
                            ? AppTheme.primaryPurple.withOpacity(0.15)
                            : const Color(0xFFF1F5F9),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        opt['icon'] as IconData,
                        size: 20,
                        color: isSel ? AppTheme.primaryPurple : AppTheme.textMedium,
                      ),
                    ),
                    const SizedBox(width: 16),
                    Text(
                      opt['title'] as String,
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 15,
                        fontWeight: isSel ? FontWeight.w700 : FontWeight.w600,
                        color: isSel ? AppTheme.primaryPurple : AppTheme.textDark,
                      ),
                    ),
                  ],
                ),
              ),
            );
          }),
        ],
      ),
    );
  }

  // STEP 5: When were you born?
  Widget _buildStep5BirthTime() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: ListView(
        children: [
          const SizedBox(height: 16),
          Text(
            'When were you born?',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 26,
              fontWeight: FontWeight.w800,
              color: AppTheme.textDark,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Vedic astrology uses your exact planetary alignment at the moment of birth.',
            style: GoogleFonts.plusJakartaSans(fontSize: 14, color: AppTheme.textMedium),
          ),
          const SizedBox(height: 24),
          Text(
            'Date of birth',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 15,
              fontWeight: FontWeight.w700,
              color: AppTheme.textDark,
            ),
          ),
          const SizedBox(height: 8),
          GlassContainer(
            onTap: () async {
              final picked = await showDatePicker(
                context: context,
                initialDate: _birthDate,
                firstDate: DateTime(1940),
                lastDate: DateTime.now(),
              );
              if (picked != null) setState(() => _birthDate = picked);
            },
            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Icon(Icons.calendar_today_rounded, color: AppTheme.vedicGold, size: 20),
                    const SizedBox(width: 12),
                    Text(
                      '${_birthDate.day} ${_getMonthName(_birthDate.month)} ${_birthDate.year}',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: AppTheme.textDark,
                      ),
                    ),
                  ],
                ),
                const Icon(Icons.arrow_drop_down, color: AppTheme.textMuted),
              ],
            ),
          ),
          const SizedBox(height: 24),
          Text(
            'Time of birth',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 15,
              fontWeight: FontWeight.w700,
              color: AppTheme.textDark,
            ),
          ),
          const SizedBox(height: 8),
          Opacity(
            opacity: _unknownBirthTime ? 0.4 : 1.0,
            child: GlassContainer(
              onTap: _unknownBirthTime
                  ? null
                  : () async {
                      final picked = await showTimePicker(
                        context: context,
                        initialTime: _birthTime,
                      );
                      if (picked != null) setState(() => _birthTime = picked);
                    },
              padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.access_time_rounded, color: AppTheme.primaryPurple, size: 20),
                      const SizedBox(width: 12),
                      Text(
                        _birthTime.format(context),
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                          color: AppTheme.textDark,
                        ),
                      ),
                    ],
                  ),
                  const Icon(Icons.arrow_drop_down, color: AppTheme.textMuted),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Checkbox(
                value: _unknownBirthTime,
                activeColor: AppTheme.primaryPurple,
                onChanged: (val) => setState(() => _unknownBirthTime = val ?? false),
              ),
              Text(
                'I don\'t know my exact time of birth',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textDark,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  String _getMonthName(int month) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1];
  }

  // STEP 6: Where were you born?
  Widget _buildStep6BirthPlace() {
    final sampleCities = [
      'Visakhapatnam, Andhra Pradesh',
      'Delhi, National Capital Region',
      'Mumbai, Maharashtra',
      'Bengaluru, Karnataka',
      'Kolkata, West Bengal',
      'Chennai, Tamil Nadu',
      'Hyderabad, Telangana',
      'Jaipur, Rajasthan',
    ];

    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 16),
          Text(
            'Where were you born?',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 26,
              fontWeight: FontWeight.w800,
              color: AppTheme.textDark,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Latitude and longitude are critical for calculating your exact Vedic Lagna (Ascendant).',
            style: GoogleFonts.plusJakartaSans(fontSize: 14, color: AppTheme.textMedium),
          ),
          const SizedBox(height: 24),
          GlassContainer(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            child: TextField(
              controller: _citySearchController,
              decoration: InputDecoration(
                hintText: 'Start typing a city...',
                border: InputBorder.none,
                icon: const Icon(Icons.search, color: AppTheme.primaryPurple),
                suffixIcon: IconButton(
                  icon: const Icon(Icons.clear, size: 18),
                  onPressed: () => _citySearchController.clear(),
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'Popular birth cities:',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 13,
              fontWeight: FontWeight.w700,
              color: AppTheme.textMuted,
            ),
          ),
          const SizedBox(height: 8),
          Expanded(
            child: ListView.builder(
              itemCount: sampleCities.length,
              itemBuilder: (context, index) {
                final city = sampleCities[index];
                final isSel = _birthCity == city;
                return Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: GlassContainer(
                    onTap: () => setState(() => _birthCity = city),
                    color: isSel ? AppTheme.pastelLavender : Colors.white.withOpacity(0.8),
                    borderColor: isSel ? AppTheme.primaryPurple : null,
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Icon(
                              Icons.location_on_outlined,
                              size: 18,
                              color: isSel ? AppTheme.primaryPurple : AppTheme.textMuted,
                            ),
                            const SizedBox(width: 10),
                            Text(
                              city,
                              style: GoogleFonts.plusJakartaSans(
                                fontSize: 14,
                                fontWeight: isSel ? FontWeight.w700 : FontWeight.w500,
                                color: isSel ? AppTheme.primaryPurple : AppTheme.textDark,
                              ),
                            ),
                          ],
                        ),
                        if (isSel)
                          const Icon(Icons.check_circle_rounded, color: AppTheme.primaryPurple, size: 18),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  // STEP 7: Where do you live now?
  Widget _buildStep7CurrentPlace() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 16),
          Text(
            'Where do you live now?',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 26,
              fontWeight: FontWeight.w800,
              color: AppTheme.textDark,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Helps astrologers tune into current transits (Gochara) affecting your current geography.',
            style: GoogleFonts.plusJakartaSans(fontSize: 14, color: AppTheme.textMedium),
          ),
          const SizedBox(height: 24),
          GlassContainer(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            child: TextField(
              decoration: const InputDecoration(
                hintText: 'Search your current city',
                border: InputBorder.none,
                icon: Icon(Icons.search, color: AppTheme.primaryPurple),
              ),
              controller: TextEditingController(text: _currentCity),
              onChanged: (val) => _currentCity = val,
            ),
          ),
          const SizedBox(height: 16),
          GlassContainer(
            onTap: () {
              setState(() => _currentCity = 'Hyderabad, Telangana');
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Location updated to Hyderabad, Telangana')),
              );
            },
            color: AppTheme.pastelLavender.withOpacity(0.5),
            borderColor: AppTheme.primaryPurple.withOpacity(0.5),
            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.my_location_rounded, color: AppTheme.primaryPurple, size: 18),
                const SizedBox(width: 10),
                Text(
                  'Use my current GPS location',
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                    color: AppTheme.primaryPurple,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // STEP 8: Languages
  Widget _buildStep8Languages() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 16),
          Text(
            'Which languages should your astrologer speak?',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 26,
              fontWeight: FontWeight.w800,
              color: AppTheme.textDark,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Pick as many as you are comfortable in.',
            style: GoogleFonts.plusJakartaSans(fontSize: 14, color: AppTheme.textMedium),
          ),
          const SizedBox(height: 24),
          Expanded(
            child: SingleChildScrollView(
              child: Wrap(
                spacing: 12,
                runSpacing: 12,
                children: _languages.map((lang) {
                  final isSel = _selectedLanguages.contains(lang);
                  return ChoiceChip(
                    label: Text(
                      lang,
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 15,
                        fontWeight: FontWeight.w700,
                        color: isSel ? Colors.white : AppTheme.textDark,
                      ),
                    ),
                    selected: isSel,
                    selectedColor: AppTheme.primaryPurple,
                    backgroundColor: Colors.white.withOpacity(0.9),
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(24),
                      side: BorderSide(
                        color: isSel ? AppTheme.primaryPurple : const Color(0xFFE2E8F0),
                        width: 1.2,
                      ),
                    ),
                    onSelected: (selected) {
                      setState(() {
                        if (selected) {
                          _selectedLanguages.add(lang);
                        } else {
                          if (_selectedLanguages.length > 1) {
                            _selectedLanguages.remove(lang);
                          }
                        }
                      });
                    },
                  );
                }).toList(),
              ),
            ),
          ),
        ],
      ),
    );
  }

  // STEP 9: How did you find Bhavishyaa?
  Widget _buildStep9Referral() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 16),
          Text(
            'How did you find Bhavishyaa?',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 26,
              fontWeight: FontWeight.w800,
              color: AppTheme.textDark,
            ),
          ),
          const SizedBox(height: 20),
          Expanded(
            child: GridView.builder(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                childAspectRatio: 2.5,
              ),
              itemCount: _referralOptions.length,
              itemBuilder: (context, index) {
                final ref = _referralOptions[index];
                final isSel = _foundVia == ref;
                return GlassContainer(
                  onTap: () => setState(() => _foundVia = ref),
                  color: isSel ? AppTheme.vedicGoldLight : Colors.white.withOpacity(0.85),
                  borderColor: isSel ? AppTheme.vedicGold : null,
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  child: Center(
                    child: Text(
                      ref,
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 13,
                        fontWeight: isSel ? FontWeight.w800 : FontWeight.w600,
                        color: isSel ? const Color(0xFF8C4C00) : AppTheme.textDark,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                );
              },
            ),
          ),
          Center(
            child: Text(
              'By continuing, you agree to the Terms & Privacy Policy.',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 11,
                color: AppTheme.textMuted,
              ),
            ),
          ),
          const SizedBox(height: 10),
        ],
      ),
    );
  }
}
