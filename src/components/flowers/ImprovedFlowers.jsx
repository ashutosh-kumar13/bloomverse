// Ultra-Premium Flower Designs with Enhanced Aesthetics
// More detailed, elegant, and visually stunning flowers

// Rose - Romantic and timeless
export const Rose = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <defs>
      <radialGradient id="rose-center" cx="35%" cy="35%">
        <stop offset="0%" stopColor="#FFDCE8" />
        <stop offset="40%" stopColor="#E85D75" />
        <stop offset="100%" stopColor="#B83E5D" />
      </radialGradient>
      <radialGradient id="rose-glow">
        <stop offset="0%" stopColor="#FFE8F1" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#E85D75" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Outer loose petals (5) */}
    {[0, 72, 144, 216, 288].map((angle) => {
      const radian = (angle * Math.PI) / 180;
      const x1 = Math.cos(radian) * 42;
      const y1 = Math.sin(radian) * 42;
      return (
        <g key={`outer-${angle}`}>
          <path
            d={`M 0,0 Q ${x1 * 0.7},${y1 * 0.7} ${x1},${y1} Q ${x1 * 0.8},${y1 * 1.2} 0,0`}
            fill="#D64E6B"
            opacity="0.85"
          />
        </g>
      );
    })}

    {/* Middle layer petals (5) */}
    {[36, 108, 180, 252, 324].map((angle) => {
      const radian = (angle * Math.PI) / 180;
      const x1 = Math.cos(radian) * 30;
      const y1 = Math.sin(radian) * 30;
      return (
        <g key={`mid-${angle}`}>
          <path
            d={`M 0,0 Q ${x1 * 0.7},${y1 * 0.7} ${x1},${y1} Q ${x1 * 0.8},${y1 * 1.1} 0,0`}
            fill="#E85D75"
            opacity="0.9"
          />
        </g>
      );
    })}

    {/* Inner petals (5) - tighter spirals */}
    {[18, 90, 162, 234, 306].map((angle) => {
      const radian = (angle * Math.PI) / 180;
      const x1 = Math.cos(radian) * 18;
      const y1 = Math.sin(radian) * 18;
      return (
        <g key={`inner-${angle}`}>
          <path
            d={`M 0,0 Q ${x1 * 0.6},${y1 * 0.6} ${x1},${y1} Q ${x1 * 0.7},${y1 * 0.9} 0,0`}
            fill="#FFB6C7"
            opacity="0.95"
          />
        </g>
      );
    })}

    {/* Center core with gradient */}
    <circle cx={0} cy={0} r={14} fill="url(#rose-center)" />
    <circle cx={0} cy={0} r={14} fill="url(#rose-glow)" />

    {/* Deep center shadow */}
    <circle cx={-2} cy={-2} r={8} fill="#A63050" opacity="0.7" />
  </g>
);

// Tulip - Fresh and elegant
export const Tulip = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <defs>
      <linearGradient id="tulip-petal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFB3D9" />
        <stop offset="50%" stopColor="#E85D75" />
        <stop offset="100%" stopColor="#D04E6B" />
      </linearGradient>
      <filter id="tulip-shadow">
        <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Stem */}
    <path d="M 0,28 Q 2,8 0,-8" stroke="#6BA55B" strokeWidth="2.5" fill="none" strokeLinecap="round" />

    {/* Left petal */}
    <path
      d="M -12,28 Q -16,15 -14,-8 Q -12,-20 0,-22 Q -8,0 -12,28"
      fill="url(#tulip-petal)"
      filter="url(#tulip-shadow)"
    />

    {/* Center petal (slightly forward) */}
    <path
      d="M 0,30 Q -8,10 0,-25 Q 8,10 0,30"
      fill="#E85D75"
      opacity="0.95"
      filter="url(#tulip-shadow)"
    />

    {/* Right petal */}
    <path
      d="M 12,28 Q 16,15 14,-8 Q 12,-20 0,-22 Q 8,0 12,28"
      fill="url(#tulip-petal)"
      filter="url(#tulip-shadow)"
    />

    {/* Inner highlight on center petal */}
    <ellipse cx="0" cy="0" rx="4" ry="12" fill="#FFB3D9" opacity="0.5" />

    {/* Leaf detail */}
    <path d="M 8,20 Q 12,18 14,22" stroke="#6BA55B" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
  </g>
);

// Sunflower - Joyful and radiant
export const Sunflower = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <defs>
      <radialGradient id="sunflower-center" cx="40%" cy="40%">
        <stop offset="0%" stopColor="#FFE4A0" />
        <stop offset="50%" stopColor="#F4B342" />
        <stop offset="100%" stopColor="#D68C1F" />
      </radialGradient>
    </defs>

    {/* Stem */}
    <path d="M 0,28 Q 1,12 0,0" stroke="#5A8C3D" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* 16 petals */}
    {Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * 22.5);
      const radian = (angle * Math.PI) / 180;
      const x1 = Math.cos(radian) * 40;
      const y1 = Math.sin(radian) * 40;
      const xControl = Math.cos(radian) * 35;
      const yControl = Math.sin(radian) * 35;

      return (
        <g key={`petal-${i}`}>
          <path
            d={`M 0,0 Q ${xControl},${yControl} ${x1},${y1}`}
            stroke="#FFC107"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            opacity="0.95"
          />
          {/* Petal highlight */}
          <path
            d={`M 0,0 Q ${xControl * 0.6},${yControl * 0.6} ${x1 * 0.6},${y1 * 0.6}`}
            stroke="#FFE4A0"
            strokeWidth="2.5"
            fill="none"
            opacity="0.6"
            strokeLinecap="round"
          />
        </g>
      );
    })}

    {/* Center circle with gradient */}
    <circle cx={0} cy={0} r={16} fill="url(#sunflower-center)" />

    {/* Texture dots in center */}
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30);
      const radian = (angle * Math.PI) / 180;
      const x1 = Math.cos(radian) * 8;
      const y1 = Math.sin(radian) * 8;
      return (
        <circle key={`dot-${i}`} cx={x1} cy={y1} r="1.5" fill="#8B5A00" opacity="0.6" />
      );
    })}

    {/* Center shadow for depth */}
    <circle cx={0} cy={0} r={16} fill="#D68C1F" opacity="0.15" />
  </g>
);

// Peony - Luxurious and full
export const Peony = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <defs>
      <radialGradient id="peony-core">
        <stop offset="0%" stopColor="#FFF0F5" />
        <stop offset="60%" stopColor="#E85D75" />
        <stop offset="100%" stopColor="#C73860" />
      </radialGradient>
    </defs>

    {/* Outer ruffled petals layer 1 */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45);
      const radian = (angle * Math.PI) / 180;
      return (
        <circle
          key={`outer-${i}`}
          cx={Math.cos(radian) * 38}
          cy={Math.sin(radian) * 38}
          r="18"
          fill="#D64E6B"
          opacity="0.75"
        />
      );
    })}

    {/* Middle ruffled petals */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45 + 22.5);
      const radian = (angle * Math.PI) / 180;
      return (
        <circle
          key={`mid-${i}`}
          cx={Math.cos(radian) * 28}
          cy={Math.sin(radian) * 28}
          r="16"
          fill="#E85D75"
          opacity="0.85"
        />
      );
    })}

    {/* Inner petals */}
    {Array.from({ length: 6 }).map((_, i) => {
      const angle = (i * 60);
      const radian = (angle * Math.PI) / 180;
      return (
        <circle
          key={`inner-${i}`}
          cx={Math.cos(radian) * 14}
          cy={Math.sin(radian) * 14}
          r="12"
          fill="#FFB6C7"
          opacity="0.9"
        />
      );
    })}

    {/* Luxurious center */}
    <circle cx={0} cy={0} r={12} fill="url(#peony-core)" />
    <circle cx={0} cy={0} r={12} fill="#FFE8F1" opacity="0.3" />

    {/* Center shimmer */}
    <circle cx={-3} cy={-3} r={6} fill="#FFDCE8" opacity="0.6" />
  </g>
);

// Lily - Pure and graceful
export const Lily = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <defs>
      <linearGradient id="lily-petal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F5F0FF" />
        <stop offset="50%" stopColor="#E8E0FF" />
        <stop offset="100%" stopColor="#D4C5FF" />
      </linearGradient>
      <filter id="lily-glow">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
      </filter>
    </defs>

    {/* Stem */}
    <path d="M 0,30 Q 1,10 0,0" stroke="#6BA55B" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Back petals (3) */}
    {[0, 120, 240].map((angle) => {
      const radian = (angle * Math.PI) / 180;
      const x1 = Math.cos(radian) * 35;
      const y1 = Math.sin(radian) * 35 - 8;
      return (
        <path
          key={`back-${angle}`}
          d={`M 0,-5 Q ${x1 * 0.5},${y1 * 0.5} ${x1},${y1}`}
          fill="url(#lily-petal)"
          opacity="0.6"
          filter="url(#lily-glow)"
        />
      );
    })}

    {/* Front petals (3) */}
    {[60, 180, 300].map((angle) => {
      const radian = (angle * Math.PI) / 180;
      const x1 = Math.cos(radian) * 32;
      const y1 = Math.sin(radian) * 32 + 2;
      return (
        <path
          key={`front-${angle}`}
          d={`M 0,0 Q ${x1 * 0.5},${y1 * 0.5} ${x1},${y1}`}
          fill="#E8D4FF"
          opacity="0.9"
          filter="url(#lily-glow)"
        />
      );
    })}

    {/* Center stamens (anthers) */}
    {[0, 120, 240].map((angle, i) => {
      const radian = (angle * Math.PI) / 180;
      const xPos = Math.cos(radian) * 6;
      const yPos = Math.sin(radian) * 6;
      return (
        <g key={`stamen-${i}`}>
          <line x1={xPos} y1={yPos} x2={xPos * 2.5} y2={yPos * 2.5} stroke="#E85D75" strokeWidth="2" />
          <circle cx={xPos * 2.5} cy={yPos * 2.5} r="2.5" fill="#FF6B7F" opacity="0.8" />
        </g>
      );
    })}

    {/* Center pistil */}
    <circle cx={0} cy={0} r={3} fill="#FFD700" opacity="0.7" />
  </g>
);

// Daisy - Cheerful and innocent
export const Daisy = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <defs>
      <radialGradient id="daisy-center">
        <stop offset="0%" stopColor="#FFE4A0" />
        <stop offset="100%" stopColor="#F4B342" />
      </radialGradient>
    </defs>

    {/* Stem */}
    <path d="M 0,26 Q 0,10 0,0" stroke="#6BA55B" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* 12 white petals */}
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30);
      const radian = (angle * Math.PI) / 180;
      const x1 = Math.cos(radian) * 32;
      const y1 = Math.sin(radian) * 32;
      return (
        <ellipse
          key={`petal-${i}`}
          cx={x1}
          cy={y1}
          rx="8"
          ry="14"
          fill="white"
          opacity="0.95"
          transform={`rotate(${angle})`}
        />
      );
    })}

    {/* Golden center */}
    <circle cx={0} cy={0} r={12} fill="url(#daisy-center)" />

    {/* Center texture */}
    {Array.from({ length: 9 }).map((_, i) => {
      const angle = (i * 40);
      const radian = (angle * Math.PI) / 180;
      const xPos = Math.cos(radian) * 5;
      const yPos = Math.sin(radian) * 5;
      return (
        <circle key={`dot-${i}`} cx={xPos} cy={yPos} r="1" fill="#D68C1F" opacity="0.7" />
      );
    })}
  </g>
);

// Orchid - Exotic and refined
export const Orchid = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <defs>
      <linearGradient id="orchid-petal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#E8C8FF" />
        <stop offset="100%" stopColor="#C98FFF" />
      </linearGradient>
    </defs>

    {/* Stem */}
    <path d="M 0,32 Q 2,15 1,0" stroke="#6BA55B" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Top sepal */}
    <ellipse cx={0} cy={-22} rx="6" ry="16" fill="url(#orchid-petal)" opacity="0.8" />

    {/* Side sepals */}
    <ellipse cx={-14} cy={-8} rx="8" ry="12" fill="#D4B5FF" opacity="0.7" transform="rotate(-35)" />
    <ellipse cx={14} cy={-8} rx="8" ry="12" fill="#D4B5FF" opacity="0.7" transform="rotate(35)" />

    {/* Upper petals */}
    <ellipse cx={-12} cy={2} rx="7" ry="11" fill="#E8C8FF" opacity="0.9" transform="rotate(-45)" />
    <ellipse cx={12} cy={2} rx="7" ry="11" fill="#E8C8FF" opacity="0.9" transform="rotate(45)" />

    {/* Lip (labellum) - prominent lower petal */}
    <path
      d="M -8,12 Q 0,22 8,12 Q 6,16 0,18 Q -6,16 -8,12"
      fill="#C98FFF"
      opacity="0.95"
    />

    {/* Lip texture/pattern */}
    <ellipse cx={0} cy={14} rx="5" ry="3" fill="#8B5C99" opacity="0.3" />

    {/* Center column */}
    <circle cx={0} cy={6} r={3} fill="#8B5C99" opacity="0.6" />
  </g>
);

// Lavender - Calm and aromatic
export const Lavender = ({ x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    {/* Stem */}
    <path d="M 0,35 Q 0,20 0,0" stroke="#6BA55B" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* 6 sprig segments with florets */}
    {Array.from({ length: 6 }).map((_, segmentIndex) => {
      const segmentY = 35 - segmentIndex * 7;
      return (
        <g key={`segment-${segmentIndex}`}>
          {/* 4 tiny florets per segment */}
          {[0, 90, 180, 270].map((angle) => {
            const radian = (angle * Math.PI) / 180;
            const offsetX = Math.cos(radian) * (5 + segmentIndex * 0.5);
            const offsetY = Math.sin(radian) * (5 + segmentIndex * 0.5);
            return (
              <circle
                key={`floret-${segmentIndex}-${angle}`}
                cx={offsetX}
                cy={segmentY + offsetY}
                r={2}
                fill="#B88FD9"
                opacity={0.8 + segmentIndex * 0.02}
              />
            );
          })}
        </g>
      );
    })}

    {/* Decorative leaf at bottom */}
    <path
      d="M -8,32 Q -6,28 -2,30"
      stroke="#6BA55B"
      strokeWidth="1.5"
      fill="none"
      opacity="0.7"
      strokeLinecap="round"
    />
    <path
      d="M 8,32 Q 6,28 2,30"
      stroke="#6BA55B"
      strokeWidth="1.5"
      fill="none"
      opacity="0.7"
      strokeLinecap="round"
    />

    {/* Top buds cluster */}
    {[0, 120, 240].map((angle) => {
      const radian = (angle * Math.PI) / 180;
      const xPos = Math.cos(radian) * 4;
      const yPos = Math.sin(radian) * 4 - 4;
      return (
        <circle
          key={`bud-${angle}`}
          cx={xPos}
          cy={yPos}
          r="2.5"
          fill="#C9A8E8"
          opacity="0.9"
        />
      );
    })}
  </g>
);
