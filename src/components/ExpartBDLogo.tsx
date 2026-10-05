import React from 'react';

interface ExpartBDLogoProps {
  variant?: 'full' | 'icon' | 'compact';
  className?: string;
  iconClassName?: string;
  theme?: 'dark' | 'light';
  subtext?: string;
}

export const ExpartBDLogo: React.FC<ExpartBDLogoProps> = ({
  variant = 'full',
  className = '',
  iconClassName = 'w-10 h-10',
  theme = 'light',
  subtext,
}) => {
  const isDark = theme === 'dark';

  // Crisp Vector Emblem Icon
  const IconEmblem = (
    <svg 
      viewBox="0 0 260 260" 
      className={`${iconClassName} shrink-0 select-none overflow-visible`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-ribbon-blue-comp" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#052866" />
          <stop offset="35%" stopColor="#0a58ca" />
          <stop offset="70%" stopColor="#0d6efd" />
          <stop offset="100%" stopColor="#00a6ff" />
        </linearGradient>

        <linearGradient id="logo-top-cyan-comp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00b4d8" />
          <stop offset="50%" stopColor="#0080ff" />
          <stop offset="100%" stopColor="#0047cc" />
        </linearGradient>

        <linearGradient id="logo-ribbon-shadow-comp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#041b4d" />
          <stop offset="100%" stopColor="#093d9e" />
        </linearGradient>

        <linearGradient id="logo-arrow-green-comp" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="50%" stopColor="#00c853" />
          <stop offset="100%" stopColor="#00e676" />
        </linearGradient>

        <linearGradient id="logo-coin-green-comp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00e676" />
          <stop offset="50%" stopColor="#00c853" />
          <stop offset="100%" stopColor="#008c3a" />
        </linearGradient>

        <linearGradient id="logo-coin-rim-comp" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2fbeb" />
          <stop offset="100%" stopColor="#00a854" />
        </linearGradient>

        <linearGradient id="logo-play-blue-comp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0077ff" />
          <stop offset="100%" stopColor="#00c8ff" />
        </linearGradient>

        <filter id="logo-shadow-comp" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0a2568" floodOpacity="0.2" />
        </filter>
      </defs>

      <g filter="url(#logo-shadow-comp)">
        {/* Inner Fold / Shadow */}
        <path 
          d="M 50 145 C 45 105, 75 55, 125 45 C 160 38, 190 55, 195 75 L 155 90 C 145 75, 125 70, 105 78 C 80 88, 72 115, 75 145 Z" 
          fill="url(#logo-ribbon-shadow-comp)" 
        />

        {/* Outer Ribbon Letter E */}
        <path 
          d="M 60 215 C 25 185, 20 115, 45 65 C 65 25, 120 15, 175 22 C 190 24, 205 32, 215 42 L 180 82 C 160 65, 125 60, 95 72 C 65 85, 55 120, 60 160 C 65 195, 95 218, 135 218 C 160 218, 180 208, 195 192 L 195 218 C 175 235, 145 242, 115 242 C 85 242, 68 230, 60 215 Z" 
          fill="url(#logo-ribbon-blue-comp)" 
        />

        {/* Top Cyan Highlight */}
        <path 
          d="M 120 18 C 160 18, 198 28, 222 45 L 182 82 C 165 70, 145 64, 122 64 C 98 64, 82 72, 75 82 C 68 55, 90 25, 120 18 Z" 
          fill="url(#logo-top-cyan-comp)" 
        />

        {/* Bottom Swoop */}
        <path 
          d="M 38 152 C 34 185, 52 215, 82 232 C 112 248, 150 245, 180 228 L 195 210 C 170 226, 135 230, 105 220 C 75 210, 58 185, 56 155 Z" 
          fill="#052866" 
          opacity="0.65" 
        />

        {/* Play Triangle */}
        <path 
          d="M 122 88 C 122 84, 126 82, 130 84 L 176 112 C 180 114, 180 120, 176 122 L 130 150 C 126 152, 122 150, 122 146 Z" 
          fill="url(#logo-play-blue-comp)" 
        />

        {/* Green Rising Growth Arrow */}
        <path 
          d="M 72 205 C 105 185, 140 155, 182 118 L 192 128 L 222 82 L 165 92 L 175 102 C 135 138, 100 168, 68 188 Z" 
          fill="url(#logo-arrow-green-comp)" 
        />

        {/* Monetization Coins Stack */}
        <ellipse cx="188" cy="222" rx="22" ry="7" fill="#008040" />
        <path d="M 166 222 L 166 226 C 166 230, 210 230, 210 226 L 210 222 Z" fill="#006030" />
        
        <ellipse cx="188" cy="214" rx="22" ry="7" fill="#00a854" />
        <path d="M 166 214 L 166 218 C 166 222, 210 222, 210 218 L 210 214 Z" fill="#007a3d" />

        <ellipse cx="188" cy="206" rx="22" ry="7" fill="url(#logo-coin-rim-comp)" />
        <ellipse cx="188" cy="205" rx="20" ry="6" fill="#00c853" />

        {/* Front Dollar Coin */}
        <circle cx="212" cy="216" r="24" fill="url(#logo-coin-green-comp)" stroke="#ffffff" strokeWidth="2.5" />
        <text 
          x="212" 
          y="224" 
          fontFamily="system-ui, -apple-system, sans-serif" 
          fontSize="24" 
          fontWeight="900" 
          fill="#ffffff" 
          textAnchor="middle"
        >
          $
        </text>
      </g>
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{IconEmblem}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {IconEmblem}
      <div className="flex flex-col text-left">
        <div className="flex items-baseline leading-none font-heading tracking-tight gap-1.5">
          <span className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-[#0a192f]'}`}>
            Expart
          </span>
          <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00b050] via-[#00c853] to-[#10b981] drop-shadow-xs">
            BD
          </span>
        </div>
        <span 
          className={`text-[10px] sm:text-[11px] font-semibold tracking-wider mt-0.5 ${
            isDark ? 'text-slate-300' : 'text-[#0e2752]'
          }`}
        >
          {subtext || 'Facebook Monetization Service'}
        </span>
      </div>
    </div>
  );
};
