// Word wrap text helper for Canvas
const drawWrappedText = (ctx, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  
  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY;
};

// Canvas drawing helpers for watercolor outline elements
const drawFernLeaf = (ctx, x, y, rotation, scale) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate(rotation * Math.PI / 180);

  // Central Stem
  ctx.strokeStyle = '#223E1E';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, 100);
  ctx.quadraticCurveTo(-5, 20, 0, -80);
  ctx.stroke();

  // Leaflets
  const leaflets = [
    { ly: -65, w: 22, h: 9, rot: -30 },
    { ly: -40, w: 28, h: 11, rot: 25 },
    { ly: -15, w: 32, h: 13, rot: -20 },
    { ly: 10, w: 34, h: 13, rot: 30 },
    { ly: 35, w: 30, h: 12, rot: -15 },
    { ly: 60, w: 24, h: 10, rot: 20 },
  ];

  leaflets.forEach(lf => {
    ctx.save();
    ctx.translate(0, lf.ly);

    const leafGrad = ctx.createLinearGradient(-lf.w, -lf.h, lf.w, lf.h);
    leafGrad.addColorStop(0, '#82C288');
    leafGrad.addColorStop(0.5, '#4E8553');
    leafGrad.addColorStop(1, '#244B27');
    ctx.fillStyle = leafGrad;
    ctx.strokeStyle = '#1D3619';
    ctx.lineWidth = 0.8;

    // Left Leaflet
    ctx.save();
    ctx.rotate((lf.rot - 15) * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-lf.w * 0.4, -lf.h * 0.6, -lf.w * 0.8, -lf.h * 0.2, -lf.w, 0);
    ctx.bezierCurveTo(-lf.w * 0.6, lf.h * 0.4, -lf.w * 0.3, lf.h * 0.2, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Right Leaflet
    ctx.save();
    ctx.rotate((-lf.rot + 15) * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(lf.w * 0.4, -lf.h * 0.6, lf.w * 0.8, -lf.h * 0.2, lf.w, 0);
    ctx.bezierCurveTo(lf.w * 0.6, lf.h * 0.4, lf.w * 0.3, lf.h * 0.2, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  });

  ctx.restore();
};

const drawGrassBlade = (ctx, x, y, rotation, scale, side) => {
  ctx.save();
  ctx.translate(0, 0); // Grass is absolute relative to bouquet
  ctx.strokeStyle = '#3A6037';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  
  // Custom transform because path uses raw values
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation * Math.PI / 180);
  ctx.translate(-x, -y);
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + side * 90 * scale, y - 120 * scale, x + side * 150 * scale, y - 180 * scale);
  ctx.stroke();
  ctx.restore();
  
  ctx.restore();
};

const drawStemsBundle = (ctx, centerX, centerY, scaleFactor) => {
  ctx.save();
  ctx.translate(centerX, centerY);
  
  ctx.strokeStyle = '#223E1E';
  ctx.lineWidth = 4.5 * scaleFactor;
  ctx.lineCap = 'round';
  
  ctx.beginPath();
  ctx.moveTo(0, 60 * scaleFactor);
  ctx.quadraticCurveTo(-12 * scaleFactor, 130 * scaleFactor, -35 * scaleFactor, 220 * scaleFactor);
  ctx.stroke();
  
  ctx.strokeStyle = '#3A6037';
  ctx.beginPath();
  ctx.moveTo(-8 * scaleFactor, 60 * scaleFactor);
  ctx.quadraticCurveTo(5 * scaleFactor, 140 * scaleFactor, 30 * scaleFactor, 220 * scaleFactor);
  ctx.stroke();
  
  ctx.strokeStyle = '#1D3619';
  ctx.lineWidth = 4 * scaleFactor;
  ctx.beginPath();
  ctx.moveTo(8 * scaleFactor, 60 * scaleFactor);
  ctx.quadraticCurveTo(-8 * scaleFactor, 145 * scaleFactor, -15 * scaleFactor, 220 * scaleFactor);
  ctx.stroke();
  
  ctx.strokeStyle = '#3A6037';
  ctx.lineWidth = 4.5 * scaleFactor;
  ctx.beginPath();
  ctx.moveTo(-12 * scaleFactor, 60 * scaleFactor);
  ctx.quadraticCurveTo(-2 * scaleFactor, 135 * scaleFactor, 15 * scaleFactor, 220 * scaleFactor);
  ctx.stroke();
  
  ctx.strokeStyle = '#1D3619';
  ctx.lineWidth = 4 * scaleFactor;
  ctx.beginPath();
  ctx.moveTo(12 * scaleFactor, 60 * scaleFactor);
  ctx.quadraticCurveTo(12 * scaleFactor, 130 * scaleFactor, -5 * scaleFactor, 220 * scaleFactor);
  ctx.stroke();

  ctx.restore();
};

// Flower Draw Functions
const drawRose = (ctx, x, y, scale, rotation) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate(rotation * Math.PI / 180);
  
  ctx.strokeStyle = '#5B1E28';
  ctx.lineWidth = 1;
  
  // Outer layer
  const roseDark = ctx.createRadialGradient(0, 0, 0, 0, 0, 48);
  roseDark.addColorStop(0, '#E85D75');
  roseDark.addColorStop(1, '#C83E55');
  ctx.fillStyle = roseDark;
  ctx.beginPath();
  ctx.moveTo(-40, -10);
  ctx.bezierCurveTo(-60, -20, -50, -60, -20, -50);
  ctx.bezierCurveTo(-10, -60, 30, -60, 40, -30);
  ctx.bezierCurveTo(60, -20, 60, 20, 30, 40);
  ctx.bezierCurveTo(10, 60, -40, 50, -40, -10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Mid layer
  const roseMid = ctx.createRadialGradient(0, 0, 0, 0, 0, 36);
  roseMid.addColorStop(0, '#FFB3C1');
  roseMid.addColorStop(1, '#E85D75');
  ctx.fillStyle = roseMid;
  ctx.beginPath();
  ctx.moveTo(-30, -20);
  ctx.bezierCurveTo(-45, -35, -15, -50, 10, -40);
  ctx.bezierCurveTo(35, -30, 40, -10, 30, 15);
  ctx.bezierCurveTo(20, 35, -20, 30, -30, -20);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Inner core
  const roseLight = ctx.createRadialGradient(0, 0, 0, 0, 0, 22);
  roseLight.addColorStop(0, '#FFF7F8');
  roseLight.addColorStop(1, '#FFA6B9');
  ctx.fillStyle = roseLight;
  ctx.beginPath();
  ctx.arc(0, 0, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Swirl line
  ctx.strokeStyle = '#5B1E28';
  ctx.lineWidth = 1.25;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-12, -5);
  ctx.quadraticCurveTo(0, -22, 12, -12);
  ctx.quadraticCurveTo(22, 2, 2, 16);
  ctx.quadraticCurveTo(-18, 8, -8, -10);
  ctx.quadraticCurveTo(0, -5, 6, 4);
  ctx.stroke();
  
  ctx.restore();
};

const drawRanunculus = (ctx, x, y, scale, rotation) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate(rotation * Math.PI / 180);
  
  ctx.strokeStyle = '#5B1E28';
  ctx.lineWidth = 1.1;
  
  // Main base circle
  const baseGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 45);
  baseGrad.addColorStop(0, '#FFFDFE');
  baseGrad.addColorStop(0.6, '#FFC2D1');
  baseGrad.addColorStop(1, '#E85D75');
  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.arc(0, 0, 45, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Rings
  const rings = [
    { r: 36, stops: ['#FFF3F5', '#FFAEC1'] },
    { r: 28, stops: ['#FFAEC1', '#FF809F'] },
    { r: 20, stops: ['#FF809F', '#E85D75'] },
    { r: 12, stops: ['#E85D75', '#C83E55'] }
  ];
  
  rings.forEach((ring, idx) => {
    const ringGrad = ctx.createLinearGradient(-ring.r, -ring.r, ring.r, ring.r);
    ringGrad.addColorStop(0, ring.stops[0]);
    ringGrad.addColorStop(1, ring.stops[1]);
    ctx.fillStyle = ringGrad;
    ctx.strokeStyle = '#5B1E28';
    ctx.lineWidth = 0.8;
    
    ctx.beginPath();
    ctx.arc(0, 0, ring.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Tiny arcs inside rings to make petals
    const count = 6 + idx * 3;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const angleNext = ((i + 1) / count) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(0, 0, ring.r, angle, angleNext);
      ctx.stroke();
    }
  });
  
  // Center
  ctx.fillStyle = '#FDF1F3';
  ctx.strokeStyle = '#5B1E28';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  ctx.restore();
};

const drawTulip = (ctx, x, y, scale, rotation) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate(rotation * Math.PI / 180);
  
  ctx.strokeStyle = '#5B1E28';
  ctx.lineWidth = 1;
  
  // Left outer petal
  const leftGrad = ctx.createLinearGradient(0, 40, 0, -35);
  leftGrad.addColorStop(0, '#FFF59D');
  leftGrad.addColorStop(0.5, '#FFA6B9');
  leftGrad.addColorStop(1, '#E85D75');
  ctx.fillStyle = leftGrad;
  
  ctx.beginPath();
  ctx.moveTo(0, 40);
  ctx.bezierCurveTo(-45, 30, -45, -20, 0, -35);
  ctx.bezierCurveTo(-25, -10, -25, 20, 0, 40);
  ctx.fill();
  ctx.stroke();
  
  // Right outer petal
  const rightGrad = ctx.createLinearGradient(0, 40, 0, -35);
  rightGrad.addColorStop(0, '#FFF59D');
  rightGrad.addColorStop(0.5, '#FFA6B9');
  rightGrad.addColorStop(1, '#E85D75');
  ctx.fillStyle = rightGrad;
  
  ctx.beginPath();
  ctx.moveTo(0, 40);
  ctx.bezierCurveTo(45, 30, 45, -20, 0, -35);
  ctx.bezierCurveTo(25, -10, 25, 20, 0, 40);
  ctx.fill();
  ctx.stroke();
  
  // Center overlap petal
  const centerGrad = ctx.createLinearGradient(0, 40, 0, -45);
  centerGrad.addColorStop(0, '#FFE082');
  centerGrad.addColorStop(0.5, '#FFA6B9');
  centerGrad.addColorStop(1, '#E85D75');
  ctx.fillStyle = centerGrad;
  ctx.lineWidth = 1.2;
  
  ctx.beginPath();
  ctx.moveTo(0, 40);
  ctx.bezierCurveTo(-30, 30, -30, -30, 0, -45);
  ctx.bezierCurveTo(30, -30, 30, 30, 0, 40);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  ctx.restore();
};

const drawPeony = (ctx, x, y, scale, rotation) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate(rotation * Math.PI / 180);
  
  ctx.strokeStyle = '#5B1E28';
  ctx.lineWidth = 1.1;
  
  // Backing leaf shape
  const backGrad = ctx.createLinearGradient(0, -50, 0, 45);
  backGrad.addColorStop(0, '#FFB6C1');
  backGrad.addColorStop(1, '#D63D56');
  ctx.fillStyle = backGrad;
  
  ctx.beginPath();
  ctx.moveTo(-30, -20);
  ctx.bezierCurveTo(-40, -40, -10, -50, 10, -45);
  ctx.bezierCurveTo(35, -45, 45, -30, 40, -5);
  ctx.bezierCurveTo(35, 25, 15, 45, -15, 35);
  ctx.bezierCurveTo(-35, 25, -40, 0, -30, -20);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Ruffled radial petals
  const petalGrad = ctx.createLinearGradient(0, -40, 0, 0);
  petalGrad.addColorStop(0, '#FFD6E0');
  petalGrad.addColorStop(1, '#E85D75');
  ctx.fillStyle = petalGrad;
  ctx.lineWidth = 0.8;
  
  const count = 12;
  for (let i = 0; i < count; i++) {
    ctx.save();
    ctx.rotate((i / count) * Math.PI * 2);
    ctx.scale(0.9, 0.9);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-10, -20, -15, -35, 0, -40);
    ctx.bezierCurveTo(15, -35, 10, -20, 0, 0);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  
  // Golden center
  ctx.fillStyle = '#FFD700';
  ctx.strokeStyle = '#B8860B';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(0, 0, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  ctx.restore();
};

const drawLily = (ctx, x, y, scale, rotation) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate(rotation * Math.PI / 180);
  
  ctx.strokeStyle = '#5B1E28';
  ctx.lineWidth = 0.85;
  
  const layers = [
    { count: 12, length: 42, width: 10, fillStyle: '#FFD1DC' },
    { count: 10, length: 32, width: 8.5, fillStyle: '#FFB7C5' },
    { count: 8, length: 22, width: 7, fillStyle: '#E85D75' }
  ];
  
  layers.forEach((layer, lIdx) => {
    ctx.fillStyle = layer.fillStyle;
    
    for (let i = 0; i < layer.count; i++) {
      ctx.save();
      ctx.rotate(((i / layer.count) * Math.PI * 2) + (lIdx * 15 * Math.PI / 180));
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-layer.width, -layer.length * 0.4, -layer.width * 0.7, -layer.length, 0, -layer.length);
      ctx.bezierCurveTo(layer.width * 0.7, -layer.length, layer.width, -layer.length * 0.4, 0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  });
  
  // Center
  ctx.fillStyle = '#FFB800';
  ctx.strokeStyle = '#B8860B';
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  ctx.restore();
};

const drawDaisy = (ctx, x, y, scale, rotation) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate(rotation * Math.PI / 180);
  
  ctx.strokeStyle = '#2D2D2D';
  ctx.lineWidth = 0.85;
  ctx.fillStyle = '#FFFDFB';
  
  const petals = 16;
  for (let i = 0; i < petals; i++) {
    ctx.save();
    ctx.rotate((i / petals) * Math.PI * 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-5, -12, -4, -30, 0, -32);
    ctx.bezierCurveTo(4, -30, 5, -12, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  
  // Golden yellow center
  const centerGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, 10);
  centerGrad.addColorStop(0, '#FFE033');
  centerGrad.addColorStop(0.65, '#FFB800');
  centerGrad.addColorStop(1, '#D48000');
  ctx.fillStyle = centerGrad;
  ctx.strokeStyle = '#D48000';
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  ctx.restore();
};

const drawOrchid = (ctx, x, y, scale, rotation) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate(rotation * Math.PI / 180);
  
  ctx.strokeStyle = '#4A154B';
  ctx.lineWidth = 0.8;
  
  // 3 outer petals
  ctx.fillStyle = '#DA70D6';
  for (let i = 0; i < 3; i++) {
    ctx.save();
    ctx.rotate((i * 120) * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-22, -15, -15, -42, 0, -45);
    ctx.bezierCurveTo(15, -42, 22, -15, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  
  // Wings
  ctx.fillStyle = '#C71585';
  [-60, 60].forEach(angle => {
    ctx.save();
    ctx.rotate(angle * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-35, 0, -35, -30, 0, -35);
    ctx.bezierCurveTo(35, -30, 35, 0, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  });
  
  // Lip
  ctx.fillStyle = '#E85D75';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-12, 10, -18, 32, 0, 35);
  ctx.bezierCurveTo(18, 32, 12, 10, 0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Center dot
  ctx.fillStyle = '#FFD700';
  ctx.strokeStyle = '#B8860B';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(0, 5, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  ctx.restore();
};

const drawLavender = (ctx, x, y, scale, rotation) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate(rotation * Math.PI / 180);
  
  // Stem
  ctx.strokeStyle = '#3A6037';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, 80);
  ctx.quadraticCurveTo(-2, 0, 0, -80);
  ctx.stroke();
  
  // Buds
  ctx.strokeStyle = '#4A154B';
  ctx.lineWidth = 0.65;
  ctx.fillStyle = '#C8B6FF';
  
  const budY = [-65, -50, -35, -20, -5, 10, 25, 40];
  budY.forEach(by => {
    [-12, 0, 12].forEach(bx => {
      ctx.beginPath();
      ctx.arc(bx, by, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
  });
  
  ctx.restore();
};

const drawSunflower = (ctx, x, y, scale, rotation) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate(rotation * Math.PI / 180);
  
  ctx.strokeStyle = '#5B1E28';
  ctx.lineWidth = 0.8;
  ctx.fillStyle = '#FFC107';
  
  const petals = 20;
  // Outer
  for (let i = 0; i < petals; i++) {
    ctx.save();
    ctx.rotate((i / petals) * Math.PI * 2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-6, -12, -7, -38, 0, -42);
    ctx.bezierCurveTo(7, -38, 6, -12, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  // Inner
  for (let i = 0; i < petals; i++) {
    ctx.save();
    ctx.rotate(((i / petals) * Math.PI * 2) + (9 * Math.PI / 180));
    ctx.scale(0.95, 0.95);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-5, -10, -6, -32, 0, -35);
    ctx.bezierCurveTo(6, -32, 5, -10, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  
  // Center
  ctx.fillStyle = '#4E2A2F';
  ctx.strokeStyle = '#1D0B0E';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 17, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  ctx.restore();
};

const renderCanvasFlower = (ctx, id, x, y, scale, rotation) => {
  switch (id) {
    case 'rose':
      drawRose(ctx, x, y, scale, rotation);
      break;
    case 'tulip':
      drawTulip(ctx, x, y, scale, rotation);
      break;
    case 'sunflower':
      drawSunflower(ctx, x, y, scale, rotation);
      break;
    case 'peony':
      drawPeony(ctx, x, y, scale, rotation);
      break;
    case 'lily':
      drawLily(ctx, x, y, scale, rotation);
      break;
    case 'daisy':
      drawDaisy(ctx, x, y, scale, rotation);
      break;
    case 'orchid':
      drawOrchid(ctx, x, y, scale, rotation);
      break;
    case 'lavender':
      drawLavender(ctx, x, y, scale, rotation);
      break;
    default:
      drawRose(ctx, x, y, scale, rotation);
  }
};

// Helper function to capture the animated bouquet SVG
export const captureBouquetSvg = () => {
  return new Promise((resolve) => {
    // Wait for animations to complete (2.5-3 seconds is typical)
    const maxWait = 3500;
    const startTime = Date.now();
    
    const checkAndCapture = () => {
      const svgElement = document.querySelector('[class*="bouquet"]') || 
                         document.querySelector('svg[viewBox]');
      
      if (svgElement) {
        // Found SVG, serialize it
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        resolve(svgString);
      } else if (Date.now() - startTime < maxWait) {
        // Keep checking until SVG is found or timeout
        setTimeout(checkAndCapture, 100);
      } else {
        resolve(null);
      }
    };
    
    // Start checking
    setTimeout(checkAndCapture, 500);
  });
};

// Main download exporter function
export const downloadBouquetCard = async (bouquetData) => {
  const width = 1080;
  const height = 1350;
  
  // 1. Create off-screen canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Enable smooth rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // 2. Draw Background
  // Soft cream white background
  ctx.fillStyle = '#FFF9F5';
  ctx.fillRect(0, 0, width, height);
  
  // Soft pink radial glow under the bouquet
  const bgGlow = ctx.createRadialGradient(width / 2, 450, 50, width / 2, 450, 450);
  bgGlow.addColorStop(0, 'rgba(255, 214, 224, 0.28)');
  bgGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = bgGlow;
  ctx.fillRect(0, 0, width, height);
  
  // 3. Generate positions matching composition engine (BouquetCanvas.jsx)
  const layoutType = bouquetData.layout || 'classic';
  const elements = [];
  const scaleFactor = 2.5;
  const centerX = width / 2;
  const centerY = 450;
  
  // A. Outer Fern Leaves
  const greeneryCount = 7;
  for (let i = 0; i < greeneryCount; i++) {
    const angle = -Math.PI + (i / (greeneryCount - 1)) * Math.PI;
    const radius = layoutType === 'cascade' ? 125 : 110;
    elements.push({
      type: 'greenery',
      x: centerX + Math.cos(angle) * radius * scaleFactor,
      y: centerY + (Math.sin(angle) * (radius - 15) - (layoutType === 'cascade' ? -15 : 20)) * scaleFactor,
      scale: (0.95 + (i % 2) * 0.1) * scaleFactor,
      rotation: (angle * 180 / Math.PI) + 90 + (i % 2 === 0 ? 5 : -5),
      zIndex: 5,
    });
  }

  // B. Grass blades sweeping left & right
  elements.push(
    { type: 'grass', x: centerX - 20 * scaleFactor, y: centerY + 70 * scaleFactor, rotation: 10, scale: 0.9, side: -1, zIndex: 6 },
    { type: 'grass', x: centerX + 20 * scaleFactor, y: centerY + 70 * scaleFactor, rotation: -10, scale: 0.9, side: 1, zIndex: 6 },
    { type: 'grass', x: centerX - 10 * scaleFactor, y: centerY + 80 * scaleFactor, rotation: 25, scale: 1.0, side: -1, zIndex: 7 },
    { type: 'grass', x: centerX + 10 * scaleFactor, y: centerY + 80 * scaleFactor, rotation: -25, scale: 1.0, side: 1, zIndex: 7 }
  );

  // C. Lavender background stems
  const lavenderCount = bouquetData.flowers.includes('lavender') ? 5 : 3;
  for (let i = 0; i < lavenderCount; i++) {
    const angle = (i / lavenderCount) * Math.PI * 2 + Math.PI / 4;
    const radius = 115;
    elements.push({
      type: 'flower',
      flowerId: 'lavender',
      x: centerX + Math.cos(angle) * radius * scaleFactor,
      y: centerY + (Math.sin(angle) * (radius - 20) - 25) * scaleFactor,
      scale: (0.85 + (i % 2) * 0.1) * scaleFactor,
      rotation: (angle * 180 / Math.PI) + (i % 2 === 0 ? 15 : -15),
      zIndex: 8,
    });
  }

  // D. Selection processing
  const pool = bouquetData.flowers.filter(f => f !== 'lavender');
  const flowersToUse = pool.length > 0 ? pool : ['rose'];
  const primary = flowersToUse[0];
  const supportingCount = layoutType === 'cascade' ? 7 : (layoutType === 'heart' ? 8 : 6);

  // Center Flower
  elements.push({
    type: 'flower',
    flowerId: primary,
    x: centerX,
    y: centerY + (layoutType === 'cascade' ? -25 : -15) * scaleFactor,
    scale: 1.3 * scaleFactor,
    rotation: -5 + Math.random() * 10,
    zIndex: 35,
  });

  // Supporting Flowers
  if (layoutType === 'classic') {
    for (let i = 0; i < supportingCount; i++) {
      const angle = (i / supportingCount) * Math.PI * 2 + 0.3;
      const radius = 70;
      elements.push({
        type: 'flower',
        flowerId: flowersToUse[i % flowersToUse.length],
        x: centerX + Math.cos(angle) * radius * scaleFactor,
        y: centerY + (Math.sin(angle) * (radius - 10) - 15) * scaleFactor,
        scale: (0.95 + (i % 3) * 0.08) * scaleFactor,
        rotation: -20 + Math.random() * 40,
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
      elements.push({
        type: 'flower',
        flowerId: flowersToUse[i % flowersToUse.length],
        x: centerX + offset.x * scaleFactor,
        y: centerY + offset.y * scaleFactor,
        scale: offset.scale * scaleFactor,
        rotation: -15 + Math.random() * 30,
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
      elements.push({
        type: 'flower',
        flowerId: flowersToUse[i % flowersToUse.length],
        x: centerX + offset.x * scaleFactor,
        y: centerY + offset.y * scaleFactor,
        scale: offset.scale * scaleFactor,
        rotation: -20 + Math.random() * 40,
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
      elements.push({
        type: 'flower',
        flowerId: flowersToUse[i % flowersToUse.length],
        x: centerX + offset.x * scaleFactor,
        y: centerY + offset.y * scaleFactor,
        scale: 0.9 * scaleFactor,
        rotation: -10 + Math.random() * 20,
        zIndex: 25,
      });
    }
  }

  // Sort elements by zIndex
  elements.sort((a, b) => a.zIndex - b.zIndex);

  // 4. Draw WRAPPING PAPER BACK
  ctx.save();
  ctx.translate(centerX, centerY + 100 * scaleFactor);
  
  const pinkPaperGrad = ctx.createLinearGradient(-150 * scaleFactor, -150 * scaleFactor, 150 * scaleFactor, 150 * scaleFactor);
  pinkPaperGrad.addColorStop(0, '#FFF2F4');
  pinkPaperGrad.addColorStop(0.4, '#FFD6E0');
  pinkPaperGrad.addColorStop(1, '#FFA6B9');
  
  ctx.fillStyle = pinkPaperGrad;
  
  // Shadow under back wrap
  ctx.shadowColor = 'rgba(45, 45, 45, 0.05)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 15;
  
  ctx.beginPath();
  ctx.moveTo(-110 * scaleFactor, 10 * scaleFactor);
  ctx.bezierCurveTo(-170 * scaleFactor, -140 * scaleFactor, -145 * scaleFactor, -240 * scaleFactor, -100 * scaleFactor, -260 * scaleFactor);
  ctx.bezierCurveTo(-55 * scaleFactor, -225 * scaleFactor, 0 * scaleFactor, -225 * scaleFactor, 0 * scaleFactor, -225 * scaleFactor);
  ctx.bezierCurveTo(0 * scaleFactor, -225 * scaleFactor, 55 * scaleFactor, -225 * scaleFactor, 100 * scaleFactor, -260 * scaleFactor);
  ctx.bezierCurveTo(145 * scaleFactor, -240 * scaleFactor, 170 * scaleFactor, -140 * scaleFactor, 110 * scaleFactor, 10 * scaleFactor);
  ctx.closePath();
  ctx.fill();
  
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  
  // Fold lines on back wrap
  ctx.strokeStyle = '#F3A3B4';
  ctx.lineWidth = 2 * scaleFactor;
  ctx.beginPath();
  ctx.moveTo(-100 * scaleFactor, -260 * scaleFactor);
  ctx.bezierCurveTo(-135 * scaleFactor, -160 * scaleFactor, -115 * scaleFactor, -60 * scaleFactor, -35 * scaleFactor, 0 * scaleFactor);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(100 * scaleFactor, -260 * scaleFactor);
  ctx.bezierCurveTo(135 * scaleFactor, -160 * scaleFactor, 115 * scaleFactor, -60 * scaleFactor, 35 * scaleFactor, 0 * scaleFactor);
  ctx.stroke();
  
  ctx.restore();

  // 5. Draw FLOWERS & GREENERY (Fern Leaves + Grass Blades + Outlined Flowers)
  elements.forEach((el) => {
    if (el.type === 'greenery') {
      drawFernLeaf(ctx, el.x, el.y, el.rotation, el.scale / scaleFactor);
    } else if (el.type === 'grass') {
      drawGrassBlade(ctx, el.x, el.y, el.rotation, el.scale, el.side);
    } else {
      renderCanvasFlower(ctx, el.flowerId, el.x, el.y, el.scale / scaleFactor, el.rotation);
    }
  });

  // 6. Draw STEMS BUNDLE
  drawStemsBundle(ctx, centerX, centerY, scaleFactor);

  // 7. Draw WRAPPING PAPER FRONT
  ctx.save();
  ctx.translate(centerX, centerY + 100 * scaleFactor);
  
  const pinkPaperFrontGrad = ctx.createLinearGradient(0, -60 * scaleFactor, 0, 90 * scaleFactor);
  pinkPaperFrontGrad.addColorStop(0, '#FFF2F4');
  pinkPaperFrontGrad.addColorStop(0.6, '#FFC2D1');
  pinkPaperFrontGrad.addColorStop(1, '#E85D75');
  
  ctx.fillStyle = pinkPaperFrontGrad;
  
  // Left flap shadow
  ctx.shadowColor = 'rgba(0,0,0,0.07)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 4;
  ctx.beginPath();
  ctx.moveTo(-90 * scaleFactor, -60 * scaleFactor);
  ctx.bezierCurveTo(-70 * scaleFactor, -40 * scaleFactor, 0 * scaleFactor, -10 * scaleFactor, 30 * scaleFactor, 60 * scaleFactor);
  ctx.bezierCurveTo(10 * scaleFactor, 80 * scaleFactor, -25 * scaleFactor, 90 * scaleFactor, -40 * scaleFactor, 80 * scaleFactor);
  ctx.bezierCurveTo(-75 * scaleFactor, 40 * scaleFactor, -100 * scaleFactor, -20 * scaleFactor, -90 * scaleFactor, -60 * scaleFactor);
  ctx.closePath();
  ctx.fill();
  
  // Right flap overlapping
  ctx.beginPath();
  ctx.moveTo(90 * scaleFactor, -60 * scaleFactor);
  ctx.bezierCurveTo(70 * scaleFactor, -40 * scaleFactor, 0 * scaleFactor, -10 * scaleFactor, -30 * scaleFactor, 60 * scaleFactor);
  ctx.bezierCurveTo(-10 * scaleFactor, 80 * scaleFactor, 25 * scaleFactor, 90 * scaleFactor, 40 * scaleFactor, 80 * scaleFactor);
  ctx.bezierCurveTo(75 * scaleFactor, 40 * scaleFactor, 100 * scaleFactor, -20 * scaleFactor, 90 * scaleFactor, -60 * scaleFactor);
  ctx.closePath();
  ctx.fill();
  
  ctx.restore();

  // 8. Draw SILK RIBBON BOW
  ctx.save();
  ctx.translate(centerX, centerY + 95 * scaleFactor);
  
  const ribbonGrad = ctx.createLinearGradient(-30 * scaleFactor, 0, 30 * scaleFactor, 0);
  ribbonGrad.addColorStop(0, '#E85D75');
  ribbonGrad.addColorStop(0.5, '#FF8E9F');
  ribbonGrad.addColorStop(1, '#D23B55');
  ctx.fillStyle = ribbonGrad;
  
  ctx.shadowColor = 'rgba(0,0,0,0.12)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 4;
  
  // Left tail
  ctx.beginPath();
  ctx.moveTo(-4 * scaleFactor, 0);
  ctx.bezierCurveTo(-15 * scaleFactor, 20 * scaleFactor, -28 * scaleFactor, 50 * scaleFactor, -32 * scaleFactor, 80 * scaleFactor);
  ctx.bezierCurveTo(-22 * scaleFactor, 75 * scaleFactor, -12 * scaleFactor, 55 * scaleFactor, -4 * scaleFactor, 25 * scaleFactor);
  ctx.closePath();
  ctx.fill();
  
  // Right tail
  ctx.beginPath();
  ctx.moveTo(4 * scaleFactor, 0);
  ctx.bezierCurveTo(15 * scaleFactor, 20 * scaleFactor, 28 * scaleFactor, 50 * scaleFactor, 32 * scaleFactor, 80 * scaleFactor);
  ctx.bezierCurveTo(22 * scaleFactor, 75 * scaleFactor, 12 * scaleFactor, 55 * scaleFactor, 4 * scaleFactor, 25 * scaleFactor);
  ctx.closePath();
  ctx.fill();
  
  // Left loop
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-25 * scaleFactor, -20 * scaleFactor, -40 * scaleFactor, 0, -12 * scaleFactor, 10 * scaleFactor);
  ctx.closePath();
  ctx.fill();
  
  // Right loop
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(25 * scaleFactor, -20 * scaleFactor, 40 * scaleFactor, 0, 12 * scaleFactor, 10 * scaleFactor);
  ctx.closePath();
  ctx.fill();
  
  // Knot
  const knotGrad = ctx.createLinearGradient(0, -4 * scaleFactor, 0, 5 * scaleFactor);
  knotGrad.addColorStop(0, '#FF8E9F');
  knotGrad.addColorStop(1, '#D23B55');
  ctx.fillStyle = knotGrad;
  ctx.shadowOffsetY = 2;
  
  ctx.beginPath();
  ctx.roundRect(-7 * scaleFactor, -4 * scaleFactor, 14 * scaleFactor, 9 * scaleFactor, 3.5 * scaleFactor);
  ctx.fill();
  
  ctx.restore();

  // 9. Draw GREETING CARD PANEL (Glassmorphism card)
  const cardWidth = 900;
  const cardHeight = 350;
  const cardX = (width - cardWidth) / 2;
  const cardY = 900;
  
  ctx.shadowColor = 'rgba(0,0,0,0.06)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 12;
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 24);
  ctx.fill();
  
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  
  ctx.strokeStyle = 'rgba(232, 93, 117, 0.15)';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  
  // Recipient Title Text
  ctx.textAlign = 'center';
  ctx.fillStyle = '#E85D75';
  ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
  ctx.fillText(`For ${bouquetData.recipientName}`, width / 2, cardY + 70);
  
  // Decorative separator
  ctx.fillStyle = '#C8B6FF';
  ctx.font = '22px Arial';
  ctx.fillText('❦  •  ❀  •  ❦', width / 2, cardY + 110);
  
  // Custom message
  ctx.fillStyle = '#2D2D2D';
  ctx.font = '400 28px "Inter", Arial, sans-serif';
  const maxTextWidth = cardWidth - 100;
  drawWrappedText(ctx, bouquetData.message, width / 2, cardY + 175, maxTextWidth, 42);
  
  // Sender name
  ctx.fillStyle = '#777777';
  ctx.font = 'italic 26px "Playfair Display", Georgia, serif';
  ctx.fillText(`With love from  ${bouquetData.senderName}`, width / 2, cardY + 295);
  
  // 10. Draw BRANDING (Footer)
  ctx.fillStyle = '#E85D75';
  ctx.font = 'bold 28px "Playfair Display", Georgia, serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('B L O O M V E R S E', width / 2, height - 55);
  
  ctx.fillStyle = '#888888';
  ctx.font = '400 16px "Inter", Arial, sans-serif';
  ctx.letterSpacing = '0.5px';
  ctx.fillText('Create your own digital bouquet at bloomverse.com', width / 2, height - 30);
  
  // 11. Trigger Download
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `Bloomverse_Gift_to_${bouquetData.recipientName.replace(/\s+/g, '_')}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
