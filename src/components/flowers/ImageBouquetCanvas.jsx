import { useEffect, useRef } from 'react';
import { flowers as flowerData } from '../../data/flowers';

const ImageBouquetCanvas = ({ selectedFlowers, layout, width = 800, height = 1066 }) => {
  const canvasRef = useRef(null);

  const getFlowerImagePath = (id) => {
    const flower = flowerData.find(f => f.id === id);
    const isFiller = ['eucalyptus', 'floral-sprigs', 'babys-breath', 'floral-filler', 'small-fillers'].includes(id);

    if (isFiller) return `/assets/${id}.svg`;
    if (!flower) return '/Rose.png';
    if (flower.type === 'svg') return `/assets/${id}.svg`;

    const pngMap = {
      'rose': '/Rose.png', 'lily': '/Lily.png', 'peony': '/Peony.png',
      'tulip': '/Tulip.png', 'sunflower': '/Sunflower.png', 'orchid': '/Magnolia.png',
      'lavender': '/Camellia.png', 'hibiscus': '/Hibiscus.png', 'camellia': '/Camellia.png',
      'chrysanthemum': '/Chrysanthemum.png', 'magnolia': '/Magnolia.png', 'hydrangea': '/Hydrangea.png'
    };
    return pngMap[id] || `/${id.charAt(0).toUpperCase() + id.slice(1)}.png`;
  };

  const getPositions = (selectedIds, layoutType) => {
    if (selectedIds.length === 0) return [];

    const elements = [];
    const centerX = width / 2;
    const centerY = height * 0.38;
    const count = selectedIds.length;

    // 1. Arrange Flowers with "Natural Jitter"
    selectedIds.forEach((id, i) => {
      let x, y, scale, rotation;
      const flowerInfo = flowerData.find(f => f.id === id) || { baseScale: 1.0 };
      const baseScale = flowerInfo.baseScale || 1.0;

      if (layoutType === 'classic' || !layoutType) {
        const angle = i * 2.39996 + (Math.random() * 0.15); // Golden angle + jitter
        const radius = Math.sqrt(i + 0.5) * 62;

        x = centerX + Math.cos(angle) * radius * 1.1;
        y = centerY + Math.sin(angle) * radius * 0.85;

        // Depth-based scaling for a more 3D rounded bouquet head
        const distFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        scale = baseScale * (1.15 - (distFromCenter / 550));
        rotation = (Math.random() - 0.5) * 0.9;

      } else if (layoutType === 'cascade') {
        const row = Math.floor(i / 2);
        const col = i % 2;
        x = centerX + (col - 0.5) * 160 + (Math.random() - 0.5) * 40;
        y = (centerY - 50) + (row * 115);
        scale = baseScale * (1.1 - row * 0.08);
        rotation = (col - 0.5) * 0.3;
      } else if (layoutType === 'modern') {
        x = centerX + (i % 2 === 0 ? -110 : 110) + (Math.random() - 0.5) * 30;
        y = centerY + (i * 95) - 120;
        scale = baseScale * 1.1;
        rotation = (Math.random() - 0.5) * 0.4;
      } else if (layoutType === 'heart') {
        const t = (i / count) * Math.PI * 2 - Math.PI / 2;
        const spread = 28;
        x = centerX + spread * (16 * Math.pow(Math.sin(t), 3));
        y = centerY + spread * -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        scale = baseScale * 0.95;
        rotation = t + Math.PI/2;
      }

      elements.push({ id, type: 'flower', x, y, scale, rotation });
    });

    // 2. Interleave Foliage Fillers (Strategically tucked)
    const fillers = ['eucalyptus', 'babys-breath', 'floral-sprigs', 'small-fillers'];
    const fillerCount = Math.max(10, count * 1.8);
    for (let i = 0; i < fillerCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random()) * (65 * Math.sqrt(count + 2)) + 15;
        const id = fillers[Math.floor(Math.random() * fillers.length)];

        elements.push({
            id,
            type: 'filler',
            x: centerX + Math.cos(angle) * radius * 1.15,
            y: centerY + Math.sin(angle) * radius * 0.9 + 15,
            scale: 0.75 + Math.random() * 0.45,
            rotation: Math.random() * Math.PI * 2
        });
    }

    return elements.sort((a, b) => a.y - b.y);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let isCancelled = false;

    const render = async () => {
      // Elegant off-white linen-style backdrop
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#ffffff');
      bgGrad.addColorStop(1, '#fdfbfb');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const positions = getPositions(selectedFlowers, layout);

      const loadImg = (src) => new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => {
          const fallback = new Image();
          fallback.src = '/Rose.png';
          fallback.onload = () => resolve(fallback);
        };
      });

      const uniqueIds = [...new Set(positions.map(p => p.id))];
      const imageCache = {};
      await Promise.all(uniqueIds.map(async id => {
          imageCache[id] = await loadImg(getFlowerImagePath(id));
      }));

      if (isCancelled) return;

      const centerX = width / 2;
      const stemGatherY = height * 0.75;

      // 1. Draw Stems (Bundled tightly into a clean handle)
      ctx.save();
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#2d4a22';

      positions.filter(p => p.type === 'flower').forEach((pos) => {
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y + 15);
        const ctrlX = centerX + (pos.x - centerX) * 0.15;
        const ctrlY = (pos.y + stemGatherY) / 2;
        // Converge with natural overlap at the ribbon
        ctx.quadraticCurveTo(ctrlX, ctrlY, centerX + (Math.random() - 0.5) * 6, stemGatherY + 120);
        ctx.stroke();
      });
      ctx.restore();

      // 2. Draw Elements (Flowers and Fillers perfectly fitted)
      positions.forEach((pos) => {
        const img = imageCache[pos.id];
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(pos.rotation);

        const maxSize = pos.type === 'flower' ? 190 : 135;
        const finalScale = (maxSize / Math.max(img.width, img.height)) * pos.scale;
        const dW = img.width * finalScale;
        const dH = img.height * finalScale;

        // Richer organic shadows for that depth feel
        ctx.shadowColor = 'rgba(28,25,23,0.12)';
        ctx.shadowBlur = pos.type === 'flower' ? 18 : 8;
        ctx.shadowOffsetY = 6;

        ctx.drawImage(img, -dW / 2, -dH / 2, dW, dH);
        ctx.restore();
      });

      // 3. Draw Ribbon Wrap (The final "Touch")
      const ribbonY = stemGatherY + 20;
      const ribbonWidth = 100;

      ctx.save();
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(0,0,0,0.1)';

      // Satin Ribbon with Highlight
      const grad = ctx.createLinearGradient(centerX - ribbonWidth/2, 0, centerX + ribbonWidth/2, 0);
      grad.addColorStop(0, '#f9a8d4');
      grad.addColorStop(0.3, '#fdf2f8');
      grad.addColorStop(0.5, '#f9a8d4');
      grad.addColorStop(1, '#f472b6');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(centerX - ribbonWidth/2, ribbonY, ribbonWidth, 48, 12);
      ctx.fill();
      ctx.strokeStyle = '#db2777';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Premium Bow with inner detail
      ctx.translate(centerX, ribbonY + 24);
      const drawLoop = (s) => {
        ctx.save();
        ctx.scale(s, 1);
        ctx.rotate(-0.3);
        ctx.beginPath();
        ctx.ellipse(42, 0, 44, 28, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Ribbon fold detail
        ctx.beginPath();
        ctx.moveTo(12, 0);
        ctx.bezierCurveTo(20, -10, 30, -10, 35, 0);
        ctx.stroke();
        ctx.restore();
      };
      drawLoop(1);
      drawLoop(-1);

      // Knot
      ctx.beginPath();
      ctx.roundRect(-18, -18, 36, 36, 10);
      ctx.fill();
      ctx.stroke();

      // Ribbon Tails
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-5, 18);
      ctx.quadraticCurveTo(-15, 50, -10, 80);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(5, 18);
      ctx.quadraticCurveTo(15, 50, 10, 80);
      ctx.stroke();

      ctx.restore();
    };

    render();
    return () => { isCancelled = true; };
  }, [selectedFlowers, layout, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-auto block select-none bg-white rounded-3xl"
    />
  );
};

export default ImageBouquetCanvas;
