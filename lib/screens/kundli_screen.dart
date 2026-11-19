import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';
import '../widgets/glass_container.dart';
import '../models/astrologer.dart';
import 'chat_screen.dart';

class KundliScreen extends StatefulWidget {
  const KundliScreen({super.key});

  @override
  State<KundliScreen> createState() => _KundliScreenState();
}

class _KundliScreenState extends State<KundliScreen> {
  int _selectedKundliView = 0; // 0 = Lagna Chart, 1 = Navamsha (D9), 2 = Moon Chart

  final List<Map<String, String>> _planets = [
    {'planet': 'Ascendant (Lagna)', 'rashi': 'Scorpio', 'deg': '14°28\'', 'nakshatra': 'Anuradha', 'status': 'Stable'},
    {'planet': 'Sun (Surya)', 'rashi': 'Leo', 'deg': '27°12\'', 'nakshatra': 'Uttara Phalguni', 'status': 'Own Sign 👑'},
    {'planet': 'Moon (Chandra)', 'rashi': 'Cancer', 'deg': '08°45\'', 'nakshatra': 'Pushya', 'status': 'Exalted ✨'},
    {'planet': 'Mars (Mangal)', 'rashi': 'Virgo', 'deg': '19°34\'', 'nakshatra': 'Hasta', 'status': 'Friendly'},
    {'planet': 'Mercury (Budha)', 'rashi': 'Leo', 'deg': '22°08\'', 'nakshatra': 'Purva Phalguni', 'status': 'Budhaditya Yoga'},
    {'planet': 'Jupiter (Guru)', 'rashi': 'Pisces', 'deg': '11°50\'', 'nakshatra': 'Uttara Bhadrapada', 'status': 'Own Sign 👑'},
    {'planet': 'Venus (Shukra)', 'rashi': 'Libra', 'deg': '05°18\'', 'nakshatra': 'Chitra', 'status': 'Malavya Yoga'},
    {'planet': 'Saturn (Shani)', 'rashi': 'Aquarius', 'deg': '16°42\'', 'nakshatra': 'Shatabhisha', 'status': 'Own Sign (Shash Yoga)'},
    {'planet': 'Rahu', 'rashi': 'Taurus', 'deg': '02°11\'', 'nakshatra': 'Krittika', 'status': 'Exalted'},
    {'planet': 'Ketu', 'rashi': 'Scorpio', 'deg': '02°11\'', 'nakshatra': 'Vishakha', 'status': 'Exalted'},
  ];

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.only(bottom: 100),
      children: [
        // User Profile Summary Card
        _buildUserSummaryCard(),

        // Chart View Toggle (Lagna / Navamsha / Moon)
        _buildChartToggle(),

        // North Indian Diamond Vedic Kundli Chart Visualizer
        _buildNorthIndianChart(),

        const SizedBox(height: 16),

        // Current Dasha Period Timeline
        _buildDashaTimeline(),

        const SizedBox(height: 16),

        // Dosha & Yoga Highlights (Manglik, Sade Sati, Raj Yoga)
        _buildDoshaAndYogaGrid(),

        const SizedBox(height: 16),

        // Lucky Auspicious Elements
        _buildLuckyFactors(),

        const SizedBox(height: 16),

        // Detailed Planetary Positions Table
        _buildPlanetsTable(),

        const SizedBox(height: 20),

        // CTA to consult about Kundli
        _buildConsultCTA(),
      ],
    );
  }

  Widget _buildUserSummaryCard() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: GlassContainer(
        borderRadius: BorderRadius.circular(24),
        color: const Color(0xFFF3EEFC),
        padding: const EdgeInsets.all(18),
        child: Row(
          children: [
            Container(
              width: 52,
              height: 52,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF8D72E1), Color(0xFF6C4AB6)],
                ),
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.primaryPurple.withOpacity(0.3),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: const Center(
                child: Icon(Icons.auto_awesome, color: Colors.white, size: 26),
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        'Mahi Sharma',
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 16,
                          fontWeight: FontWeight.w800,
                          color: AppTheme.textDark,
                        ),
                      ),
                      const SizedBox(width: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: AppTheme.primaryPurple.withOpacity(0.12),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          'Scorpio Lagna',
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 10,
                            fontWeight: FontWeight.w700,
                            color: AppTheme.primaryPurple,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 2),
                  Text(
                    '14 Oct 1998 · 08:30 AM · Visakhapatnam',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 11.5,
                      color: AppTheme.textMedium,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Moon Sign: Cancer · Nakshatra: Pushya (पुष्य)',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 11.5,
                      fontWeight: FontWeight.w600,
                      color: AppTheme.vedicGoldDark,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildChartToggle() {
    final titles = ['Lagna (D1)', 'Navamsha (D9)', 'Chandra (Moon)'];

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.85),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white),
      ),
      child: Row(
        children: titles.asMap().entries.map((entry) {
          final isSel = _selectedKundliView == entry.key;
          return Expanded(
            child: GestureDetector(
              onTap: () => setState(() => _selectedKundliView = entry.key),
              child: Container(
                padding: const EdgeInsets.symmetric(vertical: 8),
                decoration: BoxDecoration(
                  color: isSel ? AppTheme.primaryPurple : Colors.transparent,
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Center(
                  child: Text(
                    entry.value,
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 12,
                      fontWeight: isSel ? FontWeight.w700 : FontWeight.w600,
                      color: isSel ? Colors.white : AppTheme.textDark,
                    ),
                  ),
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildNorthIndianChart() {
    return Container(
      margin: const EdgeInsets.all(16),
      child: GlassContainer(
        borderRadius: BorderRadius.circular(26),
        color: Colors.white.withOpacity(0.92),
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Vedic Janam Kundli',
                  style: GoogleFonts.cinzel(
                    fontSize: 16,
                    fontWeight: FontWeight.w800,
                    color: AppTheme.textDark,
                  ),
                ),
                Row(
                  children: [
                    Container(
                      width: 8,
                      height: 8,
                      decoration: const BoxDecoration(
                        color: AppTheme.emeraldGreen,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 4),
                    Text(
                      '3 Raj Yogas Active',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        color: AppTheme.emeraldGreen,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 12),
            // Custom Painter for North Indian Vedic Diamond Kundli Chart
            SizedBox(
              height: 260,
              width: double.infinity,
              child: CustomPaint(
                painter: VedicKundliChartPainter(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDashaTimeline() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      child: GlassContainer(
        borderRadius: BorderRadius.circular(22),
        color: const Color(0xFFFFF9EC),
        borderColor: AppTheme.vedicGold.withOpacity(0.3),
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Icon(Icons.timelapse_rounded, size: 18, color: AppTheme.vedicGoldDark),
                    const SizedBox(width: 8),
                    Text(
                      'Current Maha Dasha',
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 14,
                        fontWeight: FontWeight.w800,
                        color: const Color(0xFF663800),
                      ),
                    ),
                  ],
                ),
                Text(
                  'Until May 2029',
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 11.5,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.vedicGoldDark,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              'Brihaspati (Jupiter) Maha Dasha  ➔  Budha (Mercury) Antardasha',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 13,
                fontWeight: FontWeight.w700,
                color: AppTheme.textDark,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'A highly transformative period favoring wisdom, career expansion, spiritual travels, and marital settlement.',
              style: GoogleFonts.plusJakartaSans(fontSize: 12, color: AppTheme.textMedium),
            ),
            const SizedBox(height: 10),
            ClipRRect(
              borderRadius: BorderRadius.circular(6),
              child: const LinearProgressIndicator(
                value: 0.65,
                minHeight: 6,
                backgroundColor: Color(0xFFF0E0C0),
                valueColor: AlwaysStoppedAnimation<Color>(AppTheme.vedicGold),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDoshaAndYogaGrid() {
    final doshas = [
      {
        'title': 'Manglik Status',
        'status': 'Anshik (Mild)',
        'color': AppTheme.pastelMint,
        'textColor': AppTheme.emeraldGreen,
        'desc': 'Neutralized by Jupiter\'s 9th aspect on 7th house.',
      },
      {
        'title': 'Sade Sati Phase',
        'status': 'Rising Phase',
        'color': AppTheme.pastelLavender,
        'textColor': AppTheme.primaryPurple,
        'desc': 'Chanting Hanuman Chalisa on Saturdays brings immense grace.',
      },
      {
        'title': 'Budhaditya Yoga',
        'status': 'Highly Powerful',
        'color': const Color(0xFFFEF3C7),
        'textColor': const Color(0xFFB45309),
        'desc': 'Sun + Mercury conjunction in 10th house gives executive intellect.',
      },
      {
        'title': 'Kaal Sarp Dosh',
        'status': 'Not Present',
        'color': AppTheme.pastelMint,
        'textColor': AppTheme.emeraldGreen,
        'desc': 'Planets are free from Rahu-Ketu nodal trap.',
      },
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Dosha & Yoga Analysis',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 17,
              fontWeight: FontWeight.w800,
              color: AppTheme.textDark,
            ),
          ),
          const SizedBox(height: 10),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              childAspectRatio: 1.35,
              crossAxisSpacing: 10,
              mainAxisSpacing: 10,
            ),
            itemCount: doshas.length,
            itemBuilder: (context, index) {
              final d = doshas[index];
              return GlassContainer(
                borderRadius: BorderRadius.circular(18),
                color: d['color'] as Color,
                padding: const EdgeInsets.all(12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          d['title'] as String,
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                            color: AppTheme.textDark,
                          ),
                        ),
                      ],
                    ),
                    Text(
                      d['status'] as String,
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 13,
                        fontWeight: FontWeight.w800,
                        color: d['textColor'] as Color,
                      ),
                    ),
                    Text(
                      d['desc'] as String,
                      style: GoogleFonts.plusJakartaSans(
                        fontSize: 10,
                        color: AppTheme.textMedium,
                        height: 1.25,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
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

  Widget _buildLuckyFactors() {
    final factors = [
      {'label': 'Lucky Gemstone', 'value': 'Yellow Sapphire (Pukhraj)'},
      {'label': 'Lucky Numbers', 'value': '3, 7, 9'},
      {'label': 'Lucky Colors', 'value': 'Golden Amber & Saffron'},
      {'label': 'Favorable Day', 'value': 'Thursday (Guruvaar)'},
    ];

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      child: GlassContainer(
        borderRadius: BorderRadius.circular(22),
        color: Colors.white.withOpacity(0.9),
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(Icons.stars_rounded, color: AppTheme.vedicGold, size: 20),
                const SizedBox(width: 8),
                Text(
                  'Auspicious Life Catalysts',
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 15,
                    fontWeight: FontWeight.w800,
                    color: AppTheme.textDark,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: factors.map((f) {
                return Expanded(
                  child: Container(
                    margin: const EdgeInsets.symmetric(horizontal: 3),
                    padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF8FAFC),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      children: [
                        Text(
                          f['label']!,
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 9,
                            fontWeight: FontWeight.w600,
                            color: AppTheme.textMuted,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 4),
                        Text(
                          f['value']!,
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                            color: AppTheme.textDark,
                          ),
                          textAlign: TextAlign.center,
                          maxLines: 2,
                        ),
                      ],
                    ),
                  ),
                );
              }).toList(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPlanetsTable() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      child: GlassContainer(
        borderRadius: BorderRadius.circular(22),
        color: Colors.white.withOpacity(0.92),
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Planetary Degrees & Nakshatras',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 15,
                fontWeight: FontWeight.w800,
                color: AppTheme.textDark,
              ),
            ),
            const SizedBox(height: 10),
            Table(
              columnWidths: const {
                0: FlexColumnWidth(2.2),
                1: FlexColumnWidth(1.4),
                2: FlexColumnWidth(1.2),
                3: FlexColumnWidth(2.0),
              },
              children: [
                TableRow(
                  decoration: const BoxDecoration(
                    border: Border(bottom: BorderSide(color: Color(0xFFE2E8F0))),
                  ),
                  children: [
                    _tableHeader('Graha'),
                    _tableHeader('Sign'),
                    _tableHeader('Deg'),
                    _tableHeader('Nakshatra'),
                  ],
                ),
                ..._planets.map((p) {
                  return TableRow(
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 6),
                        child: Text(
                          p['planet']!,
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: AppTheme.textDark,
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 6),
                        child: Text(
                          p['rashi']!,
                          style: GoogleFonts.plusJakartaSans(fontSize: 11.5, color: AppTheme.textMedium),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 6),
                        child: Text(
                          p['deg']!,
                          style: GoogleFonts.plusJakartaSans(fontSize: 11, color: AppTheme.textMuted),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 6),
                        child: Text(
                          p['nakshatra']!,
                          style: GoogleFonts.plusJakartaSans(
                            fontSize: 11.5,
                            fontWeight: FontWeight.w600,
                            color: AppTheme.primaryPurple,
                          ),
                        ),
                      ),
                    ],
                  );
                }),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _tableHeader(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Text(
        text,
        style: GoogleFonts.plusJakartaSans(
          fontSize: 11,
          fontWeight: FontWeight.w800,
          color: AppTheme.textMuted,
        ),
      ),
    );
  }

  Widget _buildConsultCTA() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () {
            final astro = Astrologer.sampleAstrologers.first;
            Navigator.of(context).push(
              MaterialPageRoute(builder: (_) => ChatScreen(astrologer: astro)),
            );
          },
          borderRadius: BorderRadius.circular(24),
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF8D72E1), Color(0xFF6C4AB6)],
              ),
              borderRadius: BorderRadius.circular(24),
              boxShadow: AppTheme.cardGlow,
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.chat_bubble_rounded, color: Colors.white, size: 18),
                const SizedBox(width: 8),
                Text(
                  'Discuss My Kundli with Acharya Rudranand',
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// Vedic North Indian Diamond Chart Painter
class VedicKundliChartPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;

    final paintLine = Paint()
      ..color = const Color(0xFF8D72E1)
      ..strokeWidth = 1.8
      ..style = PaintingStyle.stroke;

    final paintFill = Paint()
      ..color = const Color(0xFFFAF8FF)
      ..style = PaintingStyle.fill;

    // Background rect
    canvas.drawRRect(
      RRect.fromRectAndRadius(Rect.fromLTWH(0, 0, w, h), const Radius.circular(16)),
      paintFill,
    );

    // Outer boundary
    canvas.drawRect(Rect.fromLTWH(0, 0, w, h), paintLine);

    // Diagonals (X)
    canvas.drawLine(Offset.zero, Offset(w, h), paintLine);
    canvas.drawLine(Offset(0, h), Offset(w, 0), paintLine);

    // Central diamond
    final pathDiamond = Path()
      ..moveTo(w / 2, 0)
      ..lineTo(w, h / 2)
      ..lineTo(w / 2, h)
      ..lineTo(0, h / 2)
      ..close();
    canvas.drawPath(pathDiamond, paintLine);

    // Paint Houses text & Planets
    _drawText(canvas, '1 (Lagna)', Offset(w / 2, h * 0.22), isCenter: true, isLagna: true);
    _drawText(canvas, 'Ke', Offset(w / 2, h * 0.32), isCenter: true, isPlanet: true);

    _drawText(canvas, '4', Offset(w * 0.22, h / 2), isCenter: true);
    _drawText(canvas, 'Ju (Guru)', Offset(w * 0.22, h * 0.60), isCenter: true, isPlanet: true);

    _drawText(canvas, '7', Offset(w / 2, h * 0.78), isCenter: true);
    _drawText(canvas, 'Ra (Rahu)', Offset(w / 2, h * 0.68), isCenter: true, isPlanet: true);

    _drawText(canvas, '10 (Karma)', Offset(w * 0.78, h / 2), isCenter: true);
    _drawText(canvas, 'Su  Me', Offset(w * 0.78, h * 0.60), isCenter: true, isPlanet: true);

    _drawText(canvas, '9 Mo', Offset(w * 0.85, h * 0.2), isCenter: true, isPlanet: true);
    _drawText(canvas, '11 Ve Ma', Offset(w * 0.85, h * 0.82), isCenter: true, isPlanet: true);
    _drawText(canvas, '5 Sa', Offset(w * 0.15, h * 0.82), isCenter: true, isPlanet: true);
  }

  void _drawText(Canvas canvas, String text, Offset offset,
      {bool isCenter = false, bool isLagna = false, bool isPlanet = false}) {
    final textSpan = TextSpan(
      text: text,
      style: TextStyle(
        fontSize: isLagna ? 12 : isPlanet ? 11 : 10,
        fontWeight: isLagna || isPlanet ? FontWeight.w800 : FontWeight.w500,
        color: isLagna
            ? const Color(0xFF6C4AB6)
            : isPlanet
                ? const Color(0xFFD97706)
                : const Color(0xFF64748B),
      ),
    );
    final textPainter = TextPainter(
      text: textSpan,
      textDirection: TextDirection.ltr,
    );
    textPainter.layout();

    final paintOffset = isCenter
        ? Offset(offset.dx - textPainter.width / 2, offset.dy - textPainter.height / 2)
        : offset;
    textPainter.paint(canvas, paintOffset);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
