import React from 'react';

/**
 * Premium Illustrated Greenery Collection
 * Designed to match the vintage, hand-etched style of the Bloomverse flowers.
 */

export const WatercolorFilter = () => (
  <defs>
    <filter id="illustrationEdge" x="-50%" y="-50%" width="200%" height="200%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
      <feGaussianBlur stdDeviation="0.3" />
    </filter>

    <filter id="premiumIllustration" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="0.5" result="blur" />
      <feColorMatrix in="blur" type="saturate" values="1.2" result="saturated" />
      <feComponentTransfer in="saturated" result="enhanced">
        <feFuncR type="gamma" amplitude="1.1" exponent="0.9" />
        <feFuncG type="gamma" amplitude="1.1" exponent="0.9" />
        <feFuncB type="gamma" amplitude="1.1" exponent="0.9" />
      </feComponentTransfer>
      <feDropShadow dx="0" dy="10" stdDeviation="15" floodOpacity="0.15" />
    </filter>
  </defs>
);

const LeafWrapper = ({ children, x = 0, y = 0, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`} filter="url(#illustrationEdge)">
    {children}
  </g>
);

export const PremiumAssets = {
  'eucalyptus': (p) => (
    <LeafWrapper {...p}>
      <path d="M0 60 L0 -60" stroke="#5D6D5D" strokeWidth="2" strokeLinecap="round" />
      {[-40, -10, 20].map(y => (
        <g key={y} transform={`translate(0, ${y})`}>
          <circle cx="-18" r="22" fill="#8FA48F" opacity="0.8" stroke="#5D6D5D" strokeWidth="0.5" />
          <circle cx="18" r="22" fill="#8FA48F" opacity="0.8" stroke="#5D6D5D" strokeWidth="0.5" />
          <path d={`M-18 0 Q-10 -5, 0 0`} fill="none" stroke="#5D6D5D" opacity="0.4" />
          <path d={`M18 0 Q10 -5, 0 0`} fill="none" stroke="#5D6D5D" opacity="0.4" />
        </g>
      ))}
    </LeafWrapper>
  ),
  'fern': (p) => (
    <LeafWrapper {...p}>
      <path d="M0 80 Q-10 0, 0-80" fill="none" stroke="#3A4D39" strokeWidth="2" />
      {Array.from({length: 10}).map((_, i) => (
        <g key={i} transform={`translate(0, ${60 - i * 16})`}>
          <path d="M0 0 Q-30-5, -45-20" fill="none" stroke="#4F6F52" strokeWidth="1.5" />
          <path d="M0 0 Q30-5, 45-20" fill="none" stroke="#4F6F52" strokeWidth="1.5" />
        </g>
      ))}
    </LeafWrapper>
  ),
  'sage-leaves': (p) => (
    <LeafWrapper {...p}>
      <ellipse rx="18" ry="45" fill="#A8BC95" opacity="0.9" stroke="#7D906A" strokeWidth="0.5" />
      <path d="M0 45 L0 -45" stroke="#7D906A" strokeWidth="1" opacity="0.6" />
      {Array.from({length: 4}).map((_, i) => (
        <path key={i} d={`M-15 ${20-i*15} L15 ${10-i*15}`} stroke="#7D906A" strokeWidth="0.5" opacity="0.3" />
      ))}
    </LeafWrapper>
  ),
  'olive-branch': (p) => (
    <LeafWrapper {...p}>
      <path d="M0 70 Q-5 0, 0-70" fill="none" stroke="#556B2F" strokeWidth="1.5" />
      {[-40, -10, 20, 50].map(y => (
        <g key={y} transform={`translate(0, ${y})`}>
          <ellipse cx="-15" rx="20" ry="7" fill="#808000" opacity="0.7" transform="rotate(-25)" stroke="#4A5D23" strokeWidth="0.5" />
          <ellipse cx="15" rx="20" ry="7" fill="#808000" opacity="0.7" transform="rotate(25)" stroke="#4A5D23" strokeWidth="0.5" />
          <circle cy="-10" r="5" fill="#2E4600" />
        </g>
      ))}
    </LeafWrapper>
  ),
  'babys-breath': (p) => (
    <LeafWrapper {...p}>
      <path d="M0 40 Q8 10, -12-10 M0 20 Q12 0, 18-25" fill="none" stroke="#A8BC95" strokeWidth="1" />
      {[[-12,-10], [18,-25], [5,-40], [-5,5]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="white" stroke="#EEE" strokeWidth="0.5" />
      ))}
    </LeafWrapper>
  ),
};
