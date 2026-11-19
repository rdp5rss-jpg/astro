import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Ultra-luxurious Soft White & Pastel Ethereal Palette
  static const Color background = Color(0xFFF7F8FD);
  static const Color surfaceWhite = Color(0xFFFFFFFF);
  static const Color glassWhite = Color(0xCCFFFFFF);
  static const Color glassBorder = Color(0xE6FFFFFF);

  // Soft Mystical Accents
  static const Color primaryPurple = Color(0xFF6C4AB6);
  static const Color primaryPurpleLight = Color(0xFF8D72E1);
  static const Color pastelLavender = Color(0xFFEADBFF);
  static const Color celestialIndigo = Color(0xFF4D47C3);

  // Soft Vedic Gold & Saffron Amber
  static const Color vedicGold = Color(0xFFE59400);
  static const Color vedicGoldLight = Color(0xFFFFF3DB);
  static const Color vedicGoldDark = Color(0xFFC77700);

  // Soft Jewel tones
  static const Color emeraldGreen = Color(0xFF10B981);
  static const Color softRose = Color(0xFFF43F5E);
  static const Color pastelMint = Color(0xFFE6F9F3);
  static const Color pastelPink = Color(0xFFFFEEF3);
  static const Color pastelBlue = Color(0xFFE8F1FF);

  // Typography Colors
  static const Color textDark = Color(0xFF1E1B4B);
  static const Color textMedium = Color(0xFF475569);
  static const Color textMuted = Color(0xFF94A3B8);

  // Box Shadows for Glass and Depth
  static List<BoxShadow> get softShadow => [
        BoxShadow(
          color: const Color(0xFF4A3E72).withValues(alpha: 0.06),
          blurRadius: 24,
          offset: const Offset(0, 10),
          spreadRadius: -2,
        ),
        BoxShadow(
          color: const Color(0xFF6C4AB6).withValues(alpha: 0.04),
          blurRadius: 8,
          offset: const Offset(0, 2),
        ),
      ];

  static List<BoxShadow> get cardGlow => [
        BoxShadow(
          color: const Color(0xFF8D72E1).withValues(alpha: 0.12),
          blurRadius: 28,
          offset: const Offset(0, 8),
        ),
      ];

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: background,
      primaryColor: primaryPurple,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryPurple,
        surface: surfaceWhite,
        primary: primaryPurple,
        secondary: vedicGold,
      ),
      fontFamilyFallback: const ['Roboto', 'sans-serif'],
      textTheme: TextTheme(
        displayLarge: GoogleFonts.plusJakartaSans(
          fontSize: 32,
          fontWeight: FontWeight.w800,
          color: textDark,
          letterSpacing: -0.5,
        ),
        displayMedium: GoogleFonts.plusJakartaSans(
          fontSize: 26,
          fontWeight: FontWeight.w700,
          color: textDark,
          letterSpacing: -0.3,
        ),
        titleLarge: GoogleFonts.plusJakartaSans(
          fontSize: 20,
          fontWeight: FontWeight.w700,
          color: textDark,
        ),
        titleMedium: GoogleFonts.plusJakartaSans(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: textDark,
        ),
        bodyLarge: GoogleFonts.plusJakartaSans(
          fontSize: 15,
          fontWeight: FontWeight.w500,
          color: textDark,
        ),
        bodyMedium: GoogleFonts.plusJakartaSans(
          fontSize: 13,
          fontWeight: FontWeight.w400,
          color: textMedium,
        ),
        labelSmall: GoogleFonts.plusJakartaSans(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: textMuted,
        ),
      ),
    );
  }
}
