import React from 'react';

/**
 * Premium Watercolor Botanical Assets for Bloomverse
 * Designed with soft edges, layered gradients, and realistic botanical details.
 */

export const WatercolorFilter = () => (
  <defs>
    <filter id="watercolorEdge" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
      <feGaussianBlur stdDeviation="0.5" />
    </filter>

    <linearGradient id="sageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#A8BC95" />
      <stop offset="100%" stopColor="#7D906A" />
    </linearGradient>

    <radialGradient id="petalGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="white" stopOpacity="0.3" />
      <stop offset="100%" stopColor="white" stopOpacity="0" />
    </radialGradient>
  </defs>
);

const FlowerWrapper = ({ children, x, y, scale, rotation, filter = true }) => (
  <g
    transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}
    filter={filter ? "url(#watercolorEdge)" : ""}
  >
    {children}
  </g>
);

export const PremiumFlowers = {
  // --- FLOWERS ---

  PinkRose: (props) => (
    <FlowerWrapper {...props}>
      <path d="M-35-15 C-50-40, -10-60, 20-45 C50-35, 60 10, 35 45 C10 65, -45 55, -45-5 Z" fill="#F4A7B9" opacity="0.6" />
      <path d="M-25-10 C-35-30, -5-45, 15-35 C35-25, 40 5, 25 30 C10 45, -30 40, -30 0 Z" fill="#E85D75" opacity="0.7" />
      <circle r="18" fill="#FFC0CB" opacity="0.8" />
      <path d="M-8-4 Q0-15, 8-6 Q15 5, 0 12 Q-12 5, -5-5" fill="none" stroke="#A63050" strokeWidth="1.2" strokeLinecap="round" />
      <circle r="25" fill="url(#petalGlow)" />
    </FlowerWrapper>
  ),

  WhiteRose: (props) => (
    <FlowerWrapper {...props}>
      <path d="M-35-15 C-50-40, -10-60, 20-45 C50-35, 60 10, 35 45 C10 65, -45 55, -45-5 Z" fill="#FDFDFD" opacity="0.8" stroke="#EEE" strokeWidth="0.5" />
      <circle r="15" fill="#F5F5F5" />
      <path d="M-6-3 Q0-10, 6-4 Q10 4, 0 10 Q-8 4, -4-4" fill="none" stroke="#CCC" strokeWidth="1" />
    </FlowerWrapper>
  ),

  BlushPeony: (props) => (
    <FlowerWrapper {...props}>
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse key={i} rx="30" ry="20" fill="#FFD1DC" opacity="0.4" transform={`rotate(${i * 45}) translate(15,0)`} />
      ))}
      <circle r="22" fill="#FFB6C1" opacity="0.8" />
      <circle r="10" fill="#FFF0F5" opacity="0.9" />
      <circle r="4" fill="#FFD700" />
    </FlowerWrapper>
  ),

  WhitePeony: (props) => (
    <FlowerWrapper {...props}>
      {Array.from({ length: 10 }).map((_, i) => (
        <ellipse key={i} rx="32" ry="22" fill="#FFFFFF" opacity="0.5" stroke="#F0F0F0" strokeWidth="0.5" transform={`rotate(${i * 36}) translate(12,0)`} />
      ))}
      <circle r="20" fill="#FAFAFA" />
      <circle r="6" fill="#FFFACD" />
    </FlowerWrapper>
  ),

  PinkTulip: (props) => (
    <FlowerWrapper {...props}>
      <path d="M-15 35 Q-30 0, -20-30 Q0-10, 0 35" fill="#FF91A4" opacity="0.7" />
      <path d="M15 35 Q30 0, 20-30 Q0-10, 0 35" fill="#FF91A4" opacity="0.7" />
      <path d="M0 35 Q-20 15, -15-40 Q0 0, 15-40 Q20 15, 0 35" fill="#FFB6C1" opacity="0.9" />
    </FlowerWrapper>
  ),

  WhiteTulip: (props) => (
    <FlowerWrapper {...props}>
      <path d="M-15 35 Q-30 0, -20-30 Q0-10, 0 35" fill="#FFFFFF" opacity="0.8" stroke="#F0F0F0" />
      <path d="M15 35 Q30 0, 20-30 Q0-10, 0 35" fill="#FFFFFF" opacity="0.8" stroke="#F0F0F0" />
      <path d="M0 35 Q-20 15, -15-40 Q0 0, 15-40 Q20 15, 0 35" fill="#F8F8F8" opacity="0.9" />
    </FlowerWrapper>
  ),

  WhiteLily: (props) => (
    <FlowerWrapper {...props}>
      {Array.from({ length: 6 }).map((_, i) => (
        <path key={i} d="M0 0 Q20-20, 0-50 Q-20-20, 0 0" fill="#FFFFFF" stroke="#EEE" transform={`rotate(${i * 60})`} />
      ))}
      <circle r="5" fill="#FFE4B5" />
      {Array.from({ length: 3 }).map((_, i) => (
        <line key={i} y1="-5" y2="-15" stroke="#D2691E" strokeWidth="1" transform={`rotate(${i * 120})`} />
      ))}
    </FlowerWrapper>
  ),

  Lavender: (props) => (
    <FlowerWrapper {...props}>
      <line y1="50" y2="-50" stroke="#7D906A" strokeWidth="1.5" />
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i} transform={`translate(0, ${20 - i * 15})`}>
          <circle cx="-5" r="4" fill="#C8B6FF" opacity="0.8" />
          <circle cx="5" r="4" fill="#B89FE8" opacity="0.8" />
          <circle cy="-5" r="3.5" fill="#E6E6FA" opacity="0.8" />
        </g>
      ))}
    </FlowerWrapper>
  ),

  Daisy: (props) => (
    <FlowerWrapper {...props}>
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse key={i} rx="6" ry="25" fill="white" stroke="#F0F0F0" transform={`rotate(${i * 30}) translate(0,-10)`} />
      ))}
      <circle r="10" fill="#FFD700" />
      <circle r="7" fill="#FFA500" opacity="0.5" />
    </FlowerWrapper>
  ),

  BabysBreath: (props) => (
    <FlowerWrapper {...props}>
      <path d="M0 40 Q5 10, -10-10 M0 20 Q15 0, 20-20" fill="none" stroke="#9BB080" strokeWidth="1" />
      {[[-10,-10], [20,-20], [5,-30], [-15,10]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="white" opacity="0.9" />
      ))}
    </FlowerWrapper>
  ),

  Hydrangea: (props) => (
    <FlowerWrapper {...props}>
      <circle r="40" fill="#ADD8E6" opacity="0.2" />
      {Array.from({ length: 15 }).map((_, i) => (
        <circle
          key={i}
          cx={Math.cos(i) * 25}
          cy={Math.sin(i) * 25}
          r="8"
          fill={i % 2 ? "#B0C4DE" : "#E6E6FA"}
          opacity="0.7"
        />
      ))}
    </FlowerWrapper>
  ),

  Orchid: (props) => (
    <FlowerWrapper {...props}>
      <ellipse rx="15" ry="25" fill="#DA70D6" opacity="0.5" />
      <ellipse rx="25" ry="12" fill="#EE82EE" opacity="0.6" transform="translate(0, 5)" />
      <path d="M-10 10 Q0 25, 10 10" fill="#BA55D3" />
      <circle cy="5" r="3" fill="#FFD700" />
    </FlowerWrapper>
  ),

  // --- GREENERY ---

  Eucalyptus: (props) => (
    <FlowerWrapper {...props}>
      <line y1="60" y2="-60" stroke="#7D906A" strokeWidth="2" />
      {[-40, -10, 20].map(y => (
        <g key={y} transform={`translate(0, ${y})`}>
          <circle cx="-15" r="18" fill="#A8BC95" opacity="0.7" />
          <circle cx="15" r="18" fill="#A8BC95" opacity="0.7" />
        </g>
      ))}
    </FlowerWrapper>
  ),

  OliveBranch: (props) => (
    <FlowerWrapper {...props}>
      <path d="M0 60 Q-5 0, 0-60" fill="none" stroke="#556B2F" strokeWidth="1.5" />
      {[-30, 0, 30].map(y => (
        <g key={y} transform={`translate(0, ${y})`}>
          <ellipse cx="-12" rx="14" ry="6" fill="#808000" opacity="0.7" transform="rotate(-30, -12, 0)" />
          <ellipse cx="12" rx="14" ry="6" fill="#808000" opacity="0.7" transform="rotate(30, 12, 0)" />
          <circle cy="-10" r="4" fill="#2E4600" />
        </g>
      ))}
    </FlowerWrapper>
  ),

  Fern: (props) => (
    <FlowerWrapper {...props}>
      <path d="M0 80 Q-10 0, 0-80" fill="none" stroke="#4F7942" strokeWidth="2" />
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i} transform={`translate(0, ${60 - i * 18})`}>
          <path d="M0 0 Q-25-5, -35-15" fill="none" stroke="#4F7942" strokeWidth="1.5" />
          <path d="M0 0 Q25-5, 35-15" fill="none" stroke="#4F7942" strokeWidth="1.5" />
        </g>
      ))}
    </FlowerWrapper>
  ),

  SageLeaves: (props) => (
    <FlowerWrapper {...props}>
      <path d="M0 50 Q0 0, 0-50" fill="none" stroke="#9DC183" strokeWidth="2" />
      <ellipse rx="15" ry="35" fill="url(#sageGrad)" opacity="0.8" />
    </FlowerWrapper>
  ),

  FloralFiller: (props) => (
    <FlowerWrapper {...props}>
      <path d="M0 40 L0 -40 M-20-20 L20 20 M-20 20 L20-20" stroke="#228B22" strokeWidth="1" opacity="0.5" />
      <circle r="2" fill="#90EE90" />
    </FlowerWrapper>
  ),

  // --- DECORATIVE ---

  RosePetals: (props) => (
    <FlowerWrapper {...props}>
      <path d="M0 0 C-10-15, 10-15, 0 0 Z" fill="#E85D75" opacity="0.6" transform="rotate(45) scale(2)" />
    </FlowerWrapper>
  ),

  PinkPetals: (props) => (
    <FlowerWrapper {...props}>
      <path d="M0 0 C-8-12, 8-12, 0 0 Z" fill="#FFC0CB" opacity="0.6" transform="rotate(-20) scale(1.8)" />
    </FlowerWrapper>
  ),

  FloralSprigs: (props) => (
    <FlowerWrapper {...props}>
      <path d="M0 30 Q5 0, 0-30" fill="none" stroke="#D8BFD8" strokeWidth="1.5" />
      <circle cy="-30" r="4" fill="#D8BFD8" />
    </FlowerWrapper>
  ),

  SmallFillers: (props) => (
    <FlowerWrapper {...props}>
      <circle r="4" fill="#FFFACD" />
      <circle r="2" fill="#F0E68C" />
    </FlowerWrapper>
  ),
};
