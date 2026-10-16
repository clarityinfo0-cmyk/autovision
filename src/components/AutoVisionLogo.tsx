import React from 'react';

interface AutoVisionLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AutoVisionLogo: React.FC<AutoVisionLogoProps> = ({ className = '', size = 'md' }) => {
  // Dimension scales
  const dimensions = {
    sm: { width: 220, height: 62 },
    md: { width: 290, height: 80 },
    lg: { width: 340, height: 95 }
  }[size];

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Background ambient neon glow */}
      <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/25 via-red-500/20 to-pink-500/25 blur-xl opacity-80 pointer-events-none" />

      {/* High-Fidelity Vector Brand Logo matching original image */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 320 86"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 overflow-visible drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
      >
        <defs>
          {/* Metallic Silver/White for "Auto" */}
          <linearGradient id="autoWhiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#F8FAFC" />
            <stop offset="70%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Intense Race Red for "Visión" */}
          <linearGradient id="visionRedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF4D4D" />
            <stop offset="30%" stopColor="#EF4444" />
            <stop offset="70%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          {/* White rim stroke for Visión */}
          <linearGradient id="visionRimStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Drop shadow filter for 3D badge depth */}
          <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.9" />
          </filter>

          {/* Cyan glow for subtext */}
          <filter id="cyanNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#22d3ee" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Group with slight forward slant for racing speed aesthetic */}
        <g transform="skewX(-9) translate(14, 0)">
          {/* 1. "Auto" Base Shadow Layer */}
          <text
            x="4"
            y="50"
            fontFamily="'Rajdhani', sans-serif"
            fontSize="54"
            fontWeight="900"
            fontStyle="italic"
            letterSpacing="-0.5"
            fill="#030712"
            stroke="#030712"
            strokeWidth="7"
            strokeLinejoin="round"
          >
            Auto
          </text>

          {/* 1. "Auto" Foreground Metallic Badge */}
          <text
            x="4"
            y="50"
            fontFamily="'Rajdhani', sans-serif"
            fontSize="54"
            fontWeight="900"
            fontStyle="italic"
            letterSpacing="-0.5"
            fill="url(#autoWhiteGrad)"
            stroke="#0f172a"
            strokeWidth="2"
            strokeLinejoin="round"
            filter="url(#badgeShadow)"
          >
            Auto
          </text>

          {/* 2. "Visión" Dark Outer Base for 3D extrusion */}
          <text
            x="118"
            y="50"
            fontFamily="'Rajdhani', sans-serif"
            fontSize="54"
            fontWeight="900"
            fontStyle="italic"
            letterSpacing="-0.5"
            fill="#450a0a"
            stroke="#000000"
            strokeWidth="9"
            strokeLinejoin="round"
          >
            Visión
          </text>

          {/* 2. "Visión" White Stroke Outline */}
          <text
            x="118"
            y="50"
            fontFamily="'Rajdhani', sans-serif"
            fontSize="54"
            fontWeight="900"
            fontStyle="italic"
            letterSpacing="-0.5"
            fill="url(#visionRedGrad)"
            stroke="url(#visionRimStroke)"
            strokeWidth="3.2"
            strokeLinejoin="round"
            paintOrder="stroke fill"
          >
            Visión
          </text>

          {/* 2. "Visión" Crisp Inner Red Fill */}
          <text
            x="118"
            y="50"
            fontFamily="'Rajdhani', sans-serif"
            fontSize="54"
            fontWeight="900"
            fontStyle="italic"
            letterSpacing="-0.5"
            fill="url(#visionRedGrad)"
          >
            Visión
          </text>

          {/* 3. SUBTITLE BAR: Racing Checkered flag under "Auto" + Separator + "LED Y POLARIZADOS" */}
          <g transform="translate(4, 57)">
            {/* Checkered flag track bar */}
            <g>
              {/* Dark backing */}
              <rect x="0" y="0" width="104" height="11" rx="2" fill="#030712" stroke="#1e293b" strokeWidth="1" />
              
              {/* Row 1 checks */}
              <rect x="2" y="1.5" width="6" height="3.5" fill="#FFFFFF" rx="0.5" />
              <rect x="16" y="1.5" width="6" height="3.5" fill="#FFFFFF" rx="0.5" />
              <rect x="30" y="1.5" width="6" height="3.5" fill="#FFFFFF" rx="0.5" />
              <rect x="44" y="1.5" width="6" height="3.5" fill="#FFFFFF" rx="0.5" />
              <rect x="58" y="1.5" width="6" height="3.5" fill="#FFFFFF" rx="0.5" />
              <rect x="72" y="1.5" width="6" height="3.5" fill="#FFFFFF" rx="0.5" />
              <rect x="86" y="1.5" width="6" height="3.5" fill="#FFFFFF" rx="0.5" />

              {/* Row 2 checks (offset) */}
              <rect x="9" y="5.5" width="6" height="3.5" fill="#FFFFFF" rx="0.5" />
              <rect x="23" y="5.5" width="6" height="3.5" fill="#FFFFFF" rx="0.5" />
              <rect x="37" y="5.5" width="6" height="3.5" fill="#FFFFFF" rx="0.5" />
              <rect x="51" y="5.5" width="6" height="3.5" fill="#FFFFFF" rx="0.5" />
              <rect x="65" y="5.5" width="6" height="3.5" fill="#FFFFFF" rx="0.5" />
              <rect x="79" y="5.5" width="6" height="3.5" fill="#FFFFFF" rx="0.5" />
              <rect x="93" y="5.5" width="6" height="3.5" fill="#FFFFFF" rx="0.5" />
            </g>

            {/* Glowing Cyan Divider bar "I" */}
            <rect
              x="114"
              y="-1"
              width="3"
              height="14"
              rx="1.5"
              fill="#22d3ee"
              filter="url(#cyanNeonGlow)"
            />

            {/* "LED Y POLARIZADOS" Subtext */}
            <text
              x="124"
              y="10.5"
              fontFamily="'Rajdhani', sans-serif"
              fontSize="12.5"
              fontWeight="900"
              fontStyle="italic"
              letterSpacing="1.2"
              fill="#FFFFFF"
              stroke="#0f172a"
              strokeWidth="0.8"
              paintOrder="stroke fill"
              filter="url(#badgeShadow)"
            >
              LED Y POLARIZADOS
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
