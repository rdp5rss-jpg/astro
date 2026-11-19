import React from 'react';

export default function KundliChart() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '380px', margin: '0 auto', aspectRatio: '1 / 0.82' }}>
      <svg viewBox="0 0 400 320" style={{ width: '100%', height: '100%', display: 'block' }}>
        {/* Background rounded card */}
        <rect x="2" y="2" width="396" height="316" rx="16" fill="#FAF8FF" stroke="#8D72E1" strokeWidth="2.5" />

        {/* Diagonals */}
        <line x1="2" y1="2" x2="398" y2="318" stroke="#8D72E1" strokeWidth="2" />
        <line x1="2" y1="318" x2="398" y2="2" stroke="#8D72E1" strokeWidth="2" />

        {/* Inner Diamond (Kendra) */}
        <polygon points="200,2 398,160 200,318 2,160" fill="none" stroke="#8D72E1" strokeWidth="2" />

        {/* House 1 (Lagna) */}
        <text x="200" y="75" textAnchor="middle" fill="#6C4AB6" fontWeight="800" fontSize="14" fontFamily="Cinzel">
          1 (Lagna)
        </text>
        <text x="200" y="105" textAnchor="middle" fill="#D97706" fontWeight="700" fontSize="13">
          Ke (Ketu)
        </text>

        {/* House 4 (Sukha / Home) */}
        <text x="90" y="155" textAnchor="middle" fill="#64748B" fontWeight="600" fontSize="13">
          4
        </text>
        <text x="90" y="180" textAnchor="middle" fill="#D97706" fontWeight="700" fontSize="13">
          Ju (Guru)
        </text>

        {/* House 7 (Kalatra / Marriage) */}
        <text x="200" y="245" textAnchor="middle" fill="#64748B" fontWeight="600" fontSize="13">
          7
        </text>
        <text x="200" y="220" textAnchor="middle" fill="#D97706" fontWeight="700" fontSize="13">
          Ra (Rahu)
        </text>

        {/* House 10 (Karma / Career) */}
        <text x="310" y="155" textAnchor="middle" fill="#6C4AB6" fontWeight="700" fontSize="13">
          10 (Karma)
        </text>
        <text x="310" y="180" textAnchor="middle" fill="#D97706" fontWeight="700" fontSize="13">
          Su · Me
        </text>

        {/* House 9 (Bhagya) */}
        <text x="330" y="70" textAnchor="middle" fill="#D97706" fontWeight="700" fontSize="12">
          9 Mo (Pushya)
        </text>

        {/* House 11 (Labha) */}
        <text x="330" y="270" textAnchor="middle" fill="#D97706" fontWeight="700" fontSize="12">
          11 Ve · Ma
        </text>

        {/* House 5 (Putra / Dharma) */}
        <text x="70" y="270" textAnchor="middle" fill="#D97706" fontWeight="700" fontSize="12">
          5 Sa (Shani)
        </text>

        {/* House 2 (Dhana) */}
        <text x="140" y="45" textAnchor="middle" fill="#64748B" fontWeight="600" fontSize="11">
          2
        </text>
        {/* House 12 */}
        <text x="260" y="45" textAnchor="middle" fill="#64748B" fontWeight="600" fontSize="11">
          12
        </text>
      </svg>
    </div>
  );
}
