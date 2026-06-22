import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { flowers } from '../../data/flowers';

// 1. SVG Fern/Ash Leaf Greenery Component (from user reference image)
const FernLeaf = ({ x, y, rotation, scale }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`} opacity="0.95">
    {/* Central Stem */}
    <path d="M 0 100 Q -5 20 0 -80" fill="none" stroke="#223E1E" strokeWidth="2.5" strokeLinecap="round" />
    {/* Multi-lobes (serrated watercolor leaflets) */}
    {[
      { ly: -65, w: 22, h: 9, rot: -30 },
      { ly: -40, w: 28, h: 11, rot: 25 },
      { ly: -15, w: 32, h: 13, rot: -20 },
      { ly: 10, w: 34, h: 13, rot: 30 },
      { ly: 35, w: 30, h: 12, rot: -15 },
      { ly: 60, w: 24, h: 10, rot: 20 },
    ].map((leaf, idx) => (
      <g key={idx} transform={`translate(0, ${leaf.ly})`}>
        {/* Left Leaflet */}
        <path
          d={`M 0 0 C -${leaf.w * 0.4} -${leaf.h * 0.6}, -${leaf.w * 0.8} -${leaf.h * 0.2}, -${leaf.w} 0 C -${leaf.w * 0.6} ${leaf.h * 0.4}, -${leaf.w * 0.3} ${leaf.h * 0.2}, 0 0 Z`}
          fill="url(#watercolorGreen)"
          stroke="#1D3619"
          strokeWidth="0.8"
          transform={`rotate(${leaf.rot - 15})`}
        />
        {/* Right Leaflet */}
        <path
          d={`M 0 0 C ${leaf.w * 0.4} -${leaf.h * 0.6}, ${leaf.w * 0.8} -${leaf.h * 0.2}, ${leaf.w} 0 C ${leaf.w * 0.6} ${leaf.h * 0.4}, ${leaf.w * 0.3} ${leaf.h * 0.2}, 0 0 Z`}
          fill="url(#watercolorGreen)"
          stroke="#1D3619"
          strokeWidth="0.8"
          transform={`rotate(${-leaf.rot + 15})`}
        />
      </g>
    ))}
  </g>
);

// 2. Curved Grass Blades Component (from user reference image)
const GrassBlade = ({ x, y, rotation, scale, side }) => (
  <path
    d={`M ${x} ${y} Q ${x + side * 90 * scale} ${y - 120 * scale} ${x + side * 150 * scale} ${y - 180 * scale}`}
    fill="none"
    stroke="#3A6037"
    strokeWidth="2.5"
    strokeLinecap="round"
    opacity="0.85"
    transform={`rotate(${rotation} ${x} ${y})`}
  />
);

// 3. Stems Bundle at the bottom of the bouquet (visible behind front wrapper folds)
const StemsBundle = () => (
  <g id="stems-bundle" opacity="0.95">
    <path d="M 0 60 Q -12 130 -35 220" fill="none" stroke="#223E1E" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M -8 60 Q 5 140 30 220" fill="none" stroke="#3A6037" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M 8 60 Q -8 145 -15 220" fill="none" stroke="#1D3619" strokeWidth="4" strokeLinecap="round" />
    <path d="M -12 60 Q -2 135 15 220" fill="none" stroke="#3A6037" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M 12 60 Q 12 130 -5 220" fill="none" stroke="#1D3619" strokeWidth="4" strokeLinecap="round" />
  </g>
);

// 4. Rose Flower Component (classic pink swirl center, dark red outlines)
const RoseFlower = ({ x, y, scale, rotation }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    {/* Outer petals */}
    <path d="M-40-10 C-60-20 -50-60 -20-50 C-10-60 30-60 40-30 C60-20 60 20 30 40 C10 60 -40 50 -40 -10 Z" fill="url(#roseDarkGrad)" stroke="#5B1E28" strokeWidth="1" />
    {/* Middle petals */}
    <path d="M-30-20 C-45-35 -15-50 10-40 C35-30 40-10 30 15 C20 35 -20 30 -30 -20 Z" fill="url(#roseMediumGrad)" stroke="#5B1E28" strokeWidth="1" />
    {/* Inner core petals */}
    <circle cx={0} cy={0} r={22} fill="url(#roseLightGrad)" stroke="#5B1E28" strokeWidth="1" />
    {/* Swirl center line */}
    <path d="M -12 -5 Q 0 -22 12 -12 Q 22 2 2 16 Q -18 8 -8 -10 Q 0 -5 6 4" fill="none" stroke="#5B1E28" strokeWidth="1.2" strokeLinecap="round" />
  </g>
);

// 5. Ranunculus Flower Component (concentric rings, watercolor gradient center, dark red outlines)
const RanunculusFlower = ({ x, y, scale, rotation }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <circle cx={0} cy={0} r={45} fill="url(#ranunculusGrad)" stroke="#5B1E28" strokeWidth="1.1" />
    {/* Overlapping concentric petal rings */}
    {[36, 28, 20, 12].map((r, idx) => (
      <g key={idx}>
        <circle cx={0} cy={0} r={r} fill={`url(#ranunculusRingGrad-${idx})`} stroke="#5B1E28" strokeWidth="0.8" />
        {/* Inner petal separation arcs */}
        {Array.from({ length: 6 + idx * 3 }).map((_, i) => {
          const angle = (i / (6 + idx * 3)) * 360;
          return (
            <path
              key={i}
              d={`M ${Math.cos(angle * Math.PI / 180) * r} ${Math.sin(angle * Math.PI / 180) * r} A ${r} ${r} 0 0 1 ${Math.cos((angle + 30) * Math.PI / 180) * r} ${Math.sin((angle + 30) * Math.PI / 180) * r}`}
              fill="none"
              stroke="#5B1E28"
              strokeWidth="0.75"
            />
          );
        })}
      </g>
    ))}
    {/* Bud Core */}
    <circle cx={0} cy={0} r={6} fill="#FDF1F3" stroke="#5B1E28" strokeWidth="1" />
  </g>
);

// 6. Tulip Flower Component (cup-shaped yellow base to pink tip, dark outlines)
const TulipFlower = ({ x, y, scale, rotation }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    {/* Left Outer Petal */}
    <path
      d="M 0 40 C -45 30, -45 -20, 0 -35 C -25 -10, -25 20, 0 40"
      fill="url(#tulipLeftGrad)"
      stroke="#5B1E28"
      strokeWidth="1"
      strokeLinecap="round"
    />
    {/* Right Outer Petal */}
    <path
      d="M 0 40 C 45 30, 45 -20, 0 -35 C 25 -10, 25 20, 0 40"
      fill="url(#tulipRightGrad)"
      stroke="#5B1E28"
      strokeWidth="1"
      strokeLinecap="round"
    />
    {/* Center Core Petal */}
    <path
      d="M 0 40 C -30 30, -30 -30, 0 -45 C 30 -30, 30 30, 0 40 Z"
      fill="url(#tulipCenterGrad)"
      stroke="#5B1E28"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </g>
);

// 7. Peony Flower Component (ruffled clusters, dark outlines)
const PeonyFlower = ({ x, y, scale, rotation }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    {/* Back ruffled layers */}
    <path
      d="M-30-20 C-40-40 -10-50 10-45 C35-45 45-30 40-5 C35 25 15 45 -15 35 C-35 25 -40 0 -30-20 Z"
      fill="url(#peonyBackGrad)"
      stroke="#5B1E28"
      strokeWidth="1.1"
    />
    {/* Radial ruffled petals */}
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i / 12) * 360;
      return (
        <path
          key={i}
          d="M 0 0 C -10 -20, -15 -35, 0 -40 C 15 -35, 10 -20, 0 0"
          fill="url(#peonyPetalGrad)"
          stroke="#5B1E28"
          strokeWidth="0.8"
          transform={`rotate(${angle}) scale(0.9)`}
        />
      );
    })}
    {/* Center gold stamens */}
    <circle cx={0} cy={0} r={5.5} fill="#FFD700" stroke="#B8860B" strokeWidth="0.8" />
  </g>
);

// 8. Lily Flower Component (sharp pointed layered petals, pink waterlily style)
const LilyFlower = ({ x, y, scale, rotation }) => {
  const petalLayers = [
    { count: 12, length: 42, width: 10, fill: 'url(#lilyOuterGrad)' },
    { count: 10, length: 32, width: 8.5, fill: 'url(#lilyMidGrad)' },
    { count: 8, length: 22, width: 7, fill: 'url(#lilyInnerGrad)' },
  ];
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      {petalLayers.map((layer, lIdx) => (
        <g key={lIdx}>
          {Array.from({ length: layer.count }).map((_, i) => {
            const angle = (i / layer.count) * 360 + (lIdx * 15);
            return (
              <path
                key={i}
                d={`M 0 0 C -${layer.width} -${layer.length * 0.4}, -${layer.width * 0.7} -${layer.length}, 0 -${layer.length} C ${layer.width * 0.7} -${layer.length}, ${layer.width} -${layer.length * 0.4}, 0 0 Z`}
                fill={layer.fill}
                stroke="#5B1E28"
                strokeWidth="0.85"
                transform={`rotate(${angle})`}
              />
            );
          })}
        </g>
      ))}
      <circle cx={0} cy={0} r={8} fill="url(#daisyCenterGrad)" stroke="#B8860B" strokeWidth="0.8" />
    </g>
  );
};

// 9. Daisy Flower Component (16 white petals, golden center, dark outlines)
const DaisyFlower = ({ x, y, scale, rotation }) => {
  const petals = 16;
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i / petals) * 360;
        return (
          <path
            key={i}
            d="M 0 0 C -5 -12, -4 -30, 0 -32 C 4 -30, 5 -12, 0 0"
            fill="url(#daisyPetalGrad)"
            stroke="#2D2D2D"
            strokeWidth="0.85"
            transform={`rotate(${angle})`}
          />
        );
      })}
      <circle cx={0} cy={0} r={10} fill="url(#daisyCenterGrad)" stroke="#D48000" strokeWidth="0.85" />
    </g>
  );
};

// 10. Orchid Flower Component (magenta-lavender botanical orchid, dark outlines)
const OrchidFlower = ({ x, y, scale, rotation }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    {/* Back 3 petals */}
    {[0, 120, 240].map((angle, i) => (
      <path
        key={i}
        d="M 0 0 C -22 -15, -15 -42, 0 -45 C 15 -42, 22 -15, 0 0"
        fill="url(#orchidOuterGrad)"
        stroke="#4A154B"
        strokeWidth="0.8"
        transform={`rotate(${angle})`}
      />
    ))}
    {/* Wings */}
    {[-60, 60].map((angle, i) => (
      <path
        key={i}
        d="M 0 0 C -35 0, -35 -30, 0 -35 C 35 -30, 35 0, 0 0 Z"
        fill="url(#orchidWingGrad)"
        stroke="#4A154B"
        strokeWidth="0.8"
        transform={`rotate(${angle})`}
      />
    ))}
    {/* Lip */}
    <path
      d="M 0 0 C -12 10, -18 32, 0 35 C 18 32, 12 10, 0 0 Z"
      fill="#E85D75"
      stroke="#4A154B"
      strokeWidth="0.8"
    />
    <circle cx={0} cy={5} r={3.5} fill="#FFD700" stroke="#B8860B" strokeWidth="0.5" />
  </g>
);

// 11. Lavender Flower Component (sprig of lavender buds, dark outlines)
const LavenderFlower = ({ x, y, scale, rotation }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path d="M 0 80 Q -2 0 0 -80" fill="none" stroke="#3A6037" strokeWidth="2.5" />
    {[-65, -50, -35, -20, -5, 10, 25, 40].map((by) => (
      <g key={by} transform={`translate(0, ${by})`}>
        {[-12, 0, 12].map((bx, i) => (
          <circle
            key={i}
            cx={bx}
            cy={0}
            r={4.5}
            fill="url(#lavenderBudGrad)"
            stroke="#4A154B"
            strokeWidth="0.65"
          />
        ))}
      </g>
    ))}
  </g>
);

// 12. Sunflower Flower Component (botanical outlined watercolor sunflower)
const SunflowerFlower = ({ x, y, scale, rotation }) => {
  const petals = 20;
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      {/* Outer Row */}
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i / petals) * 360;
        return (
          <path
            key={i}
            d="M 0 0 C -6 -12, -7 -38, 0 -42 C 7 -38, 6 -12, 0 0"
            fill="url(#sunflowerPetalGrad)"
            stroke="#5B1E28"
            strokeWidth="0.8"
            transform={`rotate(${angle})`}
          />
        );
      })}
      {/* Inner Row (Staggered) */}
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i / petals) * 360 + 9;
        return (
          <path
            key={i}
            d="M 0 0 C -5 -10, -6 -32, 0 -35 C 6 -32, 5 -10, 0 0"
            fill="url(#sunflowerPetalGrad)"
            stroke="#5B1E28"
            strokeWidth="0.8"
            transform={`rotate(${angle}) scale(0.95)`}
          />
        );
      })}
      {/* Center */}
      <circle cx={0} cy={0} r={17} fill="url(#sunflowerCenterGrad)" stroke="#3A2326" strokeWidth="1" />
      <circle cx={0} cy={0} r={12} fill="none" stroke="#251618" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.6" />
    </g>
  );
};

// 13. Ribbon Bow Component
const RibbonBow = () => (
  <g id="ribbon-bow">
    <path
      d="M -4 95 C -15 115, -28 145, -32 175 C -22 170, -12 150, -4 120 Z"
      fill="url(#ribbonGrad)"
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}
    />
    <path
      d="M 4 95 C 15 115, 28 145, 32 175 C 22 170, 12 150, 4 120 Z"
      fill="url(#ribbonGrad)"
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}
    />
    <path
      d="M 0 95 C -25 75, -40 95, -12 105 Z"
      fill="url(#ribbonGrad)"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.12))' }}
    />
    <path
      d="M 0 95 C 25 75, 40 95, 12 105 Z"
      fill="url(#ribbonGrad)"
      style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.12))' }}
    />
    <rect
      x="-7"
      y="91"
      width="14"
      height="9"
      rx="3.5"
      fill="url(#ribbonKnotGrad)"
      style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.15))' }}
    />
  </g>
);

const renderSvgFlower = (flowerId, x, y, scale, rotation) => {
  switch (flowerId) {
    case 'rose':
      return <RoseFlower x={x} y={y} scale={scale} rotation={rotation} />;
    case 'tulip':
      return <TulipFlower x={x} y={y} scale={scale} rotation={rotation} />;
    case 'sunflower':
      return <SunflowerFlower x={x} y={y} scale={scale} rotation={rotation} />;
    case 'peony':
      return <PeonyFlower x={x} y={y} scale={scale} rotation={rotation} />;
    case 'lily':
      return <LilyFlower x={x} y={y} scale={scale} rotation={rotation} />;
    case 'daisy':
      return <DaisyFlower x={x} y={y} scale={scale} rotation={rotation} />;
    case 'orchid':
      return <OrchidFlower x={x} y={y} scale={scale} rotation={rotation} />;
    case 'lavender':
      return <LavenderFlower x={x} y={y} scale={scale} rotation={rotation} />;
    default:
      return <RoseFlower x={x} y={y} scale={scale} rotation={rotation} />;
  }
};

export default function BouquetCanvas({ selectedFlowers, layout }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Re-trigger animations when flowers or layout changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [selectedFlowers, layout]);

  // Create list of flowers with layout coordinates
  const bouquetElements = useMemo(() => {
    if (!selectedFlowers || selectedFlowers.length === 0) return [];

    const elements = [];
    const layoutType = layout || 'classic';

    // A. Outer Fern Leaves (from reference image)
    const greeneryCount = 7;
    for (let i = 0; i < greeneryCount; i++) {
      const angle = -Math.PI + (i / (greeneryCount - 1)) * Math.PI; // Sem-circle spread on back top
      const radius = layoutType === 'cascade' ? 125 : 110;
      elements.push({
        id: `greenery-${i}`,
        type: 'greenery',
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * (radius - 15) - (layoutType === 'cascade' ? -15 : 20),
        scale: 0.95 + (i % 2) * 0.1,
        rotation: (angle * 180) / Math.PI + 90 + (i % 2 === 0 ? 5 : -5),
        delay: 0.3 + i * 0.05,
        zIndex: 5,
      });
    }

    // B. Grass blades sweeping left & right (from reference image)
    elements.push(
      { id: 'grass-left-1', type: 'grass', x: -20, y: 70, rotation: 10, scale: 0.9, side: -1, delay: 0.4, zIndex: 6 },
      { id: 'grass-right-1', type: 'grass', x: 20, y: 70, rotation: -10, scale: 0.9, side: 1, delay: 0.4, zIndex: 6 },
      { id: 'grass-left-2', type: 'grass', x: -10, y: 80, rotation: 25, scale: 1.0, side: -1, delay: 0.5, zIndex: 7 },
      { id: 'grass-right-2', type: 'grass', x: 10, y: 80, rotation: -25, scale: 1.0, side: 1, delay: 0.5, zIndex: 7 }
    );

    // C. Lavender background stems (always added for romantic fullness)
    const lavenderCount = selectedFlowers.includes('lavender') ? 5 : 3;
    for (let i = 0; i < lavenderCount; i++) {
      const angle = (i / lavenderCount) * Math.PI * 2 + Math.PI / 4;
      const radius = 115;
      elements.push({
        id: `lavender-bg-${i}`,
        type: 'flower',
        flowerId: 'lavender',
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * (radius - 20) - 25,
        scale: 0.85 + (i % 2) * 0.1,
        rotation: (angle * 180) / Math.PI + (i % 2 === 0 ? 15 : -15),
        delay: 0.4 + i * 0.08,
        zIndex: 8,
      });
    }

    // D. Selection processing
    const pool = selectedFlowers.filter((f) => f !== 'lavender');
    const flowersToUse = pool.length > 0 ? pool : ['rose'];
    const primary = flowersToUse[0];

    // Total count of flowers to render
    const supportingCount = layoutType === 'cascade' ? 7 : layoutType === 'heart' ? 8 : 6;

    // Center flower (Ranunculus styled center flower, largest)
    elements.push({
      id: 'flower-center',
      type: 'flower',
      flowerId: primary,
      isCenter: true,
      x: 0,
      y: layoutType === 'cascade' ? -25 : -15,
      scale: 1.3,
      rotation: -5 + Math.random() * 10,
      delay: 0.9,
      zIndex: 35,
    });

    // Supporting flowers positioning
    if (layoutType === 'classic') {
      for (let i = 0; i < supportingCount; i++) {
        const angle = (i / supportingCount) * Math.PI * 2 + 0.3;
        const radius = 70;
        const flowerId = flowersToUse[i % flowersToUse.length];
        elements.push({
          id: `flower-support-${i}`,
          type: 'flower',
          flowerId,
          isCenter: false,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * (radius - 10) - 15,
          scale: 0.95 + (i % 3) * 0.08,
          rotation: (Math.random() - 0.5) * 35,
          delay: 0.5 + i * 0.08,
          zIndex: 25,
        });
      }
    } else if (layoutType === 'cascade') {
      const cascadeOffsets = [
        { x: -45, y: -55, scale: 0.95 },
        { x: 45, y: -55, scale: 0.95 },
        { x: -55, y: 15, scale: 0.9 },
        { x: 55, y: 15, scale: 0.9 },
        { x: 0, y: 35, scale: 1.0 },
        { x: -25, y: 85, scale: 0.85 },
        { x: 15, y: 125, scale: 0.8 },
      ];
      for (let i = 0; i < Math.min(supportingCount, cascadeOffsets.length); i++) {
        const offset = cascadeOffsets[i];
        const flowerId = flowersToUse[i % flowersToUse.length];
        elements.push({
          id: `flower-support-${i}`,
          type: 'flower',
          flowerId,
          isCenter: false,
          x: offset.x,
          y: offset.y,
          scale: offset.scale,
          rotation: (Math.random() - 0.5) * 30,
          delay: 0.5 + i * 0.07,
          zIndex: 30 - Math.floor(offset.y / 10),
        });
      }
    } else if (layoutType === 'modern') {
      const modernOffsets = [
        { x: -35, y: -30, scale: 0.95 },
        { x: 35, y: -25, scale: 1.0 },
        { x: -20, y: 25, scale: 1.0 },
        { x: 25, y: 20, scale: 0.9 },
        { x: -45, y: 15, scale: 0.85 },
        { x: 8, y: -45, scale: 0.95 },
      ];
      for (let i = 0; i < Math.min(supportingCount, modernOffsets.length); i++) {
        const offset = modernOffsets[i];
        const flowerId = flowersToUse[i % flowersToUse.length];
        elements.push({
          id: `flower-support-${i}`,
          type: 'flower',
          flowerId,
          isCenter: false,
          x: offset.x,
          y: offset.y,
          scale: offset.scale,
          rotation: (Math.random() - 0.5) * 40,
          delay: 0.5 + i * 0.08,
          zIndex: 25,
        });
      }
    } else if (layoutType === 'heart') {
      const heartOffsets = [
        { x: -50, y: -45 },
        { x: 50, y: -45 },
        { x: -70, y: -15 },
        { x: 70, y: -15 },
        { x: -45, y: 25 },
        { x: 45, y: 25 },
        { x: -20, y: 55 },
        { x: 20, y: 55 },
      ];
      for (let i = 0; i < Math.min(supportingCount, heartOffsets.length); i++) {
        const offset = heartOffsets[i];
        const flowerId = flowersToUse[i % flowersToUse.length];
        elements.push({
          id: `flower-support-${i}`,
          type: 'flower',
          flowerId,
          isCenter: false,
          x: offset.x,
          y: offset.y,
          scale: 0.9,
          rotation: (Math.random() - 0.5) * 20,
          delay: 0.5 + i * 0.07,
          zIndex: 25,
        });
      }
    }

    return elements.sort((a, b) => a.zIndex - b.zIndex);
  }, [selectedFlowers, layout]);

  // Particle effects
  const sparkles = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: -160 + Math.random() * 320,
      y: -160 + Math.random() * 280,
      size: 0.6 + Math.random() * 0.5,
      delay: Math.random() * 2,
    }));
  }, [animationKey]);

  const driftingPetals = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: -200 + Math.random() * 400,
      y: -250 + Math.random() * 150,
      size: 0.7 + Math.random() * 0.6,
      delay: i * 0.8,
      rotation: Math.random() * 360,
    }));
  }, [animationKey]);

  // Framer Motion Animation Variants
  const wrapperVariants = {
    hidden: { scale: 0.85, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const flowerVariants = {
    hidden: { scale: 0, opacity: 0, y: 140, rotate: -25 },
    visible: (custom) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        y: { type: 'spring', stiffness: 45, damping: 10, delay: custom },
        scale: { duration: 0.9, ease: 'easeOut', delay: custom },
        opacity: { duration: 0.6, delay: custom },
        rotate: { duration: 1.1, ease: 'easeOut', delay: custom },
      },
    }),
  };

  const backgroundFloat = {
    animate: {
      y: [0, -6, 0],
      rotate: [-0.8, 0.8, -0.8],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const ribbonVariants = {
    hidden: { scale: 0.6, opacity: 0, y: 40 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { delay: 1.2, duration: 0.8, ease: 'backOut' },
    },
  };

  const petalDriftVariants = {
    animate: (custom) => ({
      x: [0, 80, 160],
      y: [0, 180, 360],
      rotate: [0, 180, 360],
      opacity: [0, 0.75, 0.75, 0],
      transition: {
        duration: 5.5,
        delay: custom.delay,
        repeat: Infinity,
        ease: 'linear',
      },
    }),
  };

  const flowerMap = useMemo(() => {
    return Object.fromEntries(flowers.map((f) => [f.id, f]));
  }, []);

  return (
    <div className="w-full flex justify-center py-4 select-none">
      <div className="relative w-full max-w-[390px] aspect-[4/5] bg-gradient-to-tr from-[#FFF7F2] via-[#FFFDFB] to-[#FFF5F7] rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden border border-[#FFEBE5]/60 flex items-center justify-center">
        {/* Soft Background Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,214,224,0.18)_0%,rgba(255,255,255,0)_70%)] pointer-events-none" />

        <svg
          key={animationKey}
          className="w-full h-full"
          viewBox="-200 -220 400 450"
          style={{ overflow: 'visible' }}
        >
          {/* DEFINITIONS */}
          <defs>
            {/* Watercolor Green Gradient */}
            <linearGradient id="watercolorGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#82C288" />
              <stop offset="50%" stopColor="#4E8553" />
              <stop offset="100%" stopColor="#244B27" />
            </linearGradient>

            {/* Pink Paper Gradient for Wrapping */}
            <linearGradient id="pinkPaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2F4" />
              <stop offset="40%" stopColor="#FFD6E0" />
              <stop offset="100%" stopColor="#FFA6B9" />
            </linearGradient>

            <linearGradient id="pinkPaperFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF2F4" />
              <stop offset="60%" stopColor="#FFC2D1" />
              <stop offset="100%" stopColor="#E85D75" stopOpacity="0.85" />
            </linearGradient>

            {/* Satin Ribbon Gradients */}
            <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E85D75" />
              <stop offset="50%" stopColor="#FF8E9F" />
              <stop offset="100%" stopColor="#D23B55" />
            </linearGradient>

            <linearGradient id="ribbonKnotGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF8E9F" />
              <stop offset="100%" stopColor="#D23B55" />
            </linearGradient>

            {/* Flower Gradients */}
            {/* 1. Rose */}
            <radialGradient id="roseLightGrad" cx="40%" cy="40%">
              <stop offset="0%" stopColor="#FFF7F8" />
              <stop offset="100%" stopColor="#FFA6B9" />
            </radialGradient>
            <radialGradient id="roseMediumGrad" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#FFB3C1" />
              <stop offset="100%" stopColor="#E85D75" />
            </radialGradient>
            <radialGradient id="roseDarkGrad" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#E85D75" />
              <stop offset="100%" stopColor="#C83E55" />
            </radialGradient>

            {/* 2. Ranunculus rings */}
            <radialGradient id="ranunculusGrad" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#FFFDFE" />
              <stop offset="60%" stopColor="#FFC2D1" />
              <stop offset="100%" stopColor="#E85D75" />
            </radialGradient>
            <linearGradient id="ranunculusRingGrad-0" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF3F5" />
              <stop offset="100%" stopColor="#FFAEC1" />
            </linearGradient>
            <linearGradient id="ranunculusRingGrad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFAEC1" />
              <stop offset="100%" stopColor="#FF809F" />
            </linearGradient>
            <linearGradient id="ranunculusRingGrad-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF809F" />
              <stop offset="100%" stopColor="#E85D75" />
            </linearGradient>
            <linearGradient id="ranunculusRingGrad-3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E85D75" />
              <stop offset="100%" stopColor="#C83E55" />
            </linearGradient>

            {/* 3. Tulip */}
            <linearGradient id="tulipLeftGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFF59D" />
              <stop offset="50%" stopColor="#FFA6B9" />
              <stop offset="100%" stopColor="#E85D75" />
            </linearGradient>
            <linearGradient id="tulipRightGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFF59D" />
              <stop offset="50%" stopColor="#FFA6B9" />
              <stop offset="100%" stopColor="#E85D75" />
            </linearGradient>
            <linearGradient id="tulipCenterGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="50%" stopColor="#FFA6B9" />
              <stop offset="100%" stopColor="#E85D75" />
            </linearGradient>

            {/* 4. Peony */}
            <linearGradient id="peonyPetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD6E0" />
              <stop offset="100%" stopColor="#E85D75" />
            </linearGradient>
            <linearGradient id="peonyBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFB6C1" />
              <stop offset="100%" stopColor="#D63D56" />
            </linearGradient>

            {/* 5. Lily */}
            <linearGradient id="lilyOuterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF5F8" />
              <stop offset="100%" stopColor="#FFD1DC" />
            </linearGradient>
            <linearGradient id="lilyMidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF5F8" />
              <stop offset="100%" stopColor="#FFB7C5" />
            </linearGradient>
            <linearGradient id="lilyInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF5F8" />
              <stop offset="100%" stopColor="#E85D75" />
            </linearGradient>

            {/* 6. Orchid */}
            <linearGradient id="orchidOuterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE6FF" />
              <stop offset="100%" stopColor="#DA70D6" />
            </linearGradient>
            <linearGradient id="orchidWingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD9FA" />
              <stop offset="100%" stopColor="#C71585" />
            </linearGradient>

            {/* 7. Lavender */}
            <radialGradient id="lavenderBudGrad" cx="40%" cy="40%">
              <stop offset="0%" stopColor="#E6E6FA" />
              <stop offset="65%" stopColor="#C8B6FF" />
              <stop offset="100%" stopColor="#9370DB" />
            </radialGradient>

            {/* 8. Sunflower */}
            <linearGradient id="sunflowerPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFEB3B" />
              <stop offset="100%" stopColor="#FFC107" />
            </linearGradient>
            <radialGradient id="sunflowerCenterGrad" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#4E2A2F" />
              <stop offset="100%" stopColor="#1D0B0E" />
            </radialGradient>

            {/* Daisy */}
            <linearGradient id="daisyPetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="75%" stopColor="#FFFDFB" />
              <stop offset="100%" stopColor="#ECE4E0" />
            </linearGradient>
            <radialGradient id="daisyCenterGrad" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#FFE033" />
              <stop offset="65%" stopColor="#FFB800" />
              <stop offset="100%" stopColor="#D48000" />
            </radialGradient>

            {/* Particles */}
            <radialGradient id="sparkleGrad" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#FFF" stopOpacity="1" />
              <stop offset="35%" stopColor="#FFECA6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFECA6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="petalColorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD6E0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#E85D75" stopOpacity="0.4" />
            </linearGradient>

            {/* Shadow Filter */}
            <filter id="bouquetShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="15" floodOpacity="0.06" floodColor="#2D2D2D" />
            </filter>
          </defs>

          {/* SPARKLES (Light Particles) */}
          {!reducedMotion && (
            <g id="sparkle-particles">
              {sparkles.map((sp) => (
                <motion.circle
                  key={sp.id}
                  cx={sp.x}
                  cy={sp.y}
                  r={3.5 * sp.size}
                  fill="url(#sparkleGrad)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.9, 0.4, 0.9, 0],
                    scale: [0.2, 1.2, 0.8, 1.2, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    delay: sp.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </g>
          )}

          {/* MAIN BOUQUET GROUP */}
          <motion.g
            filter="url(#bouquetShadow)"
            initial={reducedMotion ? {} : 'hidden'}
            animate={reducedMotion ? {} : ['visible', 'animate']}
            variants={backgroundFloat}
            style={{ transformOrigin: '0px 100px' }}
          >
            {/* 1. WRAPPING PAPER BACK */}
            <motion.path
              id="wrapping-back"
              d="M -110 110 C -170 -40, -145 -140, -100 -160 C -55 -125, 0 -125, 0 -125 C 0 -125, 55 -125, 100 -160 C 145 -140, 170 -40, 110 110 Z"
              fill="url(#pinkPaperGrad)"
              variants={wrapperVariants}
              initial="hidden"
              animate="visible"
              style={{ transformOrigin: '0px 100px' }}
            />

            {/* 2. LAYERED FLOWERS & GREENERY */}
            <g id="bouquet-flowers">
              {bouquetElements.map((el) => {
                const config = flowerMap[el.flowerId];
                
                return (
                  <motion.g
                    key={el.id}
                    custom={reducedMotion ? 0 : el.delay}
                    variants={flowerVariants}
                    style={{ transformOrigin: `${el.x}px ${el.y}px` }}
                  >
                    {el.type === 'greenery' ? (
                      <FernLeaf x={el.x} y={el.y} rotation={el.rotation} scale={el.scale} />
                    ) : el.type === 'grass' ? (
                      <GrassBlade x={el.x} y={el.y} rotation={el.rotation} scale={el.scale} side={el.side} />
                    ) : (
                      // Render watercolor outline SVG flower
                      renderSvgFlower(el.flowerId, el.x, el.y, el.scale * (config?.baseScale || 1), el.rotation)
                    )}
                  </motion.g>
                );
              })}
            </g>

            {/* 3. STEMS BUNDLE (Visible behind front wrapper wraps) */}
            <motion.g
              id="stems-bundle-container"
              variants={wrapperVariants}
              initial="hidden"
              animate="visible"
              style={{ transformOrigin: '0px 100px' }}
            >
              <StemsBundle />
            </motion.g>

            {/* 4. WRAPPING PAPER FRONT */}
            <motion.g
              id="wrapping-front"
              variants={wrapperVariants}
              initial="hidden"
              animate="visible"
              style={{ transformOrigin: '0px 100px' }}
            >
              <path
                d="M -90 40 C -70 60, 0 90, 30 160 C 10 180, -25 190, -40 180 C -75 140, -100 80, -90 40 Z"
                fill="url(#pinkPaperFrontGrad)"
                style={{ filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.08))' }}
              />
              <path
                d="M 90 40 C 70 60, 0 90, -30 160 C -10 180, 25 190, 40 180 C 75 140, 100 80, 90 40 Z"
                fill="url(#pinkPaperFrontGrad)"
                style={{ filter: 'drop-shadow(-3px 3px 6px rgba(0,0,0,0.08))' }}
              />
            </motion.g>

            {/* 5. SILK RIBBON ACCENT */}
            <motion.g
              variants={ribbonVariants}
              initial="hidden"
              animate="visible"
              style={{ transformOrigin: '0px 95px' }}
            >
              <RibbonBow />
            </motion.g>
          </motion.g>

          {/* FLOATING PETALS (Drifting overlay) */}
          {!reducedMotion && (
            <g id="floating-petals" style={{ pointerEvents: 'none' }}>
              {driftingPetals.map((petal) => (
                <motion.g
                  key={petal.id}
                  transform={`translate(${petal.x}, ${petal.y}) scale(${petal.size})`}
                  custom={{ delay: petal.delay }}
                  variants={petalDriftVariants}
                  initial={{ opacity: 0 }}
                  animate="animate"
                >
                  <path
                    d="M 0 0 C 8 -12, 16 -12, 16 0 C 16 12, 8 16, 0 0 Z"
                    fill="url(#petalColorGrad)"
                    transform={`rotate(${petal.rotation})`}
                  />
                </motion.g>
              ))}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
