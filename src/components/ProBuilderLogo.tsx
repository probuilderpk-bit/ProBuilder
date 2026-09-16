import React from 'react';

interface ProBuilderLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'xl';
  showTagline?: boolean;
  onClick?: () => void;
}

export const ProBuilderLogo: React.FC<ProBuilderLogoProps> = ({
  className = '',
  size = 'md',
  onClick
}) => {
  // Dimension scales preserving the 960x540 (16:9) exact banner ratio of probuilder long logo.jfif
  const dimensions = {
    sm: { width: 144, height: 81 },
    md: { width: 180, height: 101 },
    lg: { width: 280, height: 157.5 },
    hero: { width: 440, height: 247.5 },
    xl: { width: 540, height: 303.75 }
  };

  const dim = dimensions[size];
  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none ${
        onClick ? 'cursor-pointer hover:opacity-95' : ''
      } ${className}`}
      title="ProBuilder - DEVELOPMENT • TEACHING • GLOBAL REACH"
      aria-label="ProBuilder Logo"
    >
      {/* Exact ProBuilder Horizontal Banner matching the official graphic */}
      <div className="relative rounded-xl overflow-hidden bg-[#000000] shadow-2xl transition-transform duration-200">
        <svg
          viewBox="0 0 960 540"
          style={{ width: `${dim.width}px`, maxWidth: '100%', height: 'auto', aspectRatio: '16 / 9' }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block max-w-full h-auto"
        >
          <defs>
            {/* Dark Vignette Spotlight Background matching the original logo image */}
            <radialGradient id={`pbVignette-${uniqueId}`} cx="50%" cy="46%" r="58%">
              <stop offset="0%" stopColor="#24242B" stopOpacity="0.95" />
              <stop offset="28%" stopColor="#141418" stopOpacity="0.9" />
              <stop offset="65%" stopColor="#08080A" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#000000" stopOpacity="1" />
            </radialGradient>

            {/* Subtle Red Atmosphere behind the B letter */}
            <radialGradient id={`pbCoreGlow-${uniqueId}`} cx="414" cy="212" r="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B81118" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#B81118" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#B81118" stopOpacity="0" />
            </radialGradient>

            {/* Sparkle Silver Gradient */}
            <radialGradient id={`sparkleGlow-${uniqueId}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#C0C2CC" />
              <stop offset="100%" stopColor="#848694" />
            </radialGradient>
          </defs>

          {/* Base Pitch Black Canvas */}
          <rect width="960" height="540" fill="#000000" />
          
          {/* Vignette Spotlight */}
          <rect width="960" height="540" fill={`url(#pbVignette-${uniqueId})`} />

          {/* Core Red Atmosphere */}
          <circle cx="414" cy="212" r="140" fill={`url(#pbCoreGlow-${uniqueId})`} />

          {/* BACK LAYER OF ORBITAL RING (passes behind the top lobe of letter B) */}
          <g transform="translate(414, 212) rotate(-47)">
            {/* Inner smooth ring (back arc) */}
            <path
              d="M 50.1 -25.2 A 78 33 0 0 1 -50.1 25.2"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeOpacity="0.5"
              strokeLinecap="round"
            />
            {/* Outer segmented tech ring (back arc) */}
            <path
              d="M 60.4 -30.6 A 94 40 0 0 1 -60.4 30.6"
              stroke="#FFFFFF"
              strokeWidth="4.2"
              strokeDasharray="24 10 18 10 28 10"
              strokeOpacity="0.55"
              strokeLinecap="round"
            />
          </g>

          {/* WORDMARK: ProBuilder */}
          <text
            x="480"
            y="258"
            textAnchor="middle"
            fontFamily="'Outfit', 'Montserrat', 'Plus Jakarta Sans', -apple-system, sans-serif"
            fontWeight="900"
            fontSize="138"
            letterSpacing="-2px"
          >
            <tspan fill="#B81118">ProB</tspan>
            <tspan fill="#FFFFFF">uilder</tspan>
          </text>

          {/* FRONT LAYER OF ORBITAL RING (passes in front of lower B with realistic 3D wrapping) */}
          <g transform="translate(414, 212) rotate(-47)">
            {/* Inner smooth ring (front arc) */}
            <path
              d="M -50.1 25.2 A 78 33 0 0 1 50.1 -25.2"
              stroke="#FFFFFF"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Outer segmented tech ring (front arc) */}
            <path
              d="M -60.4 30.6 A 94 40 0 0 1 60.4 -30.6"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeDasharray="28 10 20 9 34 10 22 9"
              strokeLinecap="round"
            />

            {/* Radial connector ticks between inner and outer ring */}
            <line x1="-78" y1="0" x2="-94" y2="0" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="-67.5" y1="16.5" x2="-81.4" y2="20" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="-39" y1="28.5" x2="-47" y2="34.6" stroke="#FFFFFF" strokeWidth="2" />
          </g>

          {/* TAGLINE: DEVELOPMENT • TEACHING • GLOBAL REACH */}
          <text
            x="480"
            y="372"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', 'Outfit', 'Montserrat', -apple-system, sans-serif"
            fontWeight="700"
            fontSize="21"
            fill="#FFFFFF"
            letterSpacing="5.5px"
          >
            DEVELOPMENT • TEACHING • GLOBAL REACH
          </text>

          {/* 4-POINT STAR SPARKLE in bottom right corner */}
          <g transform="translate(876, 442)">
            <path
              d="M 0 -16 Q 0 0 16 0 Q 0 0 0 16 Q 0 0 -16 0 Q 0 0 0 -16 Z"
              fill={`url(#sparkleGlow-${uniqueId})`}
              opacity="0.85"
            />
            <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
          </g>
        </svg>
      </div>
    </div>
  );
};
