import { flowers, flowerMeanings } from '../../data/flowers';

export default function FlowerSelector({ selectedFlowers, onFlowerToggle, maxFlowers = 20 }) {
  const handleClick = (flowerId) => {
    if (selectedFlowers.length < maxFlowers) {
      onFlowerToggle([...selectedFlowers, flowerId]);
    }
  };

  const handleRemove = (flowerId, e) => {
    e.stopPropagation();
    const index = selectedFlowers.indexOf(flowerId);
    if (index > -1) {
      const newFlowers = [...selectedFlowers];
      newFlowers.splice(index, 1);
      onFlowerToggle(newFlowers);
    }
  };

  const getCount = (flowerId) => {
    return selectedFlowers.filter(id => id === flowerId).length;
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-bold text-charcoal mb-1">
          Pick Your Flowers
        </h2>
        <p className="text-xs text-gray-500 font-light">
          Tap to add. You can add multiples! ({selectedFlowers.length}/{maxFlowers})
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {flowers.map((flower) => {
          const count = getCount(flower.id);
          const isSelected = count > 0;

          const getPath = () => {
            if (flower.type === 'svg') return `/assets/${flower.id}.svg`;
            const pngAssets = ['rose', 'lily', 'peony', 'tulip', 'sunflower', 'orchid', 'lavender', 'camellia', 'hibiscus', 'chrysanthemum', 'magnolia', 'hydrangea'];
            if (pngAssets.includes(flower.id)) return `/${flower.id.charAt(0).toUpperCase() + flower.id.slice(1)}.png`;
            return `/${flower.name.replace(/\s+/g, '')}.png`;
          };

          return (
            <button
              key={flower.id}
              onClick={() => handleClick(flower.id)}
              className={`relative p-2 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col items-center group ${
                isSelected
                  ? 'border-rose-pink bg-[#FFF2F4]'
                  : 'border-stone-100 bg-white hover:border-rose-pink/30'
              }`}
            >
              <div className="w-full aspect-square flex items-center justify-center mb-1 bg-stone-50 rounded-xl overflow-hidden p-1">
                <img
                  src={getPath()}
                  alt={flower.name}
                  className="w-full h-full object-contain transition-transform group-hover:scale-110"
                  onError={(e) => {
                    if (!e.target.src.includes('Rose.png')) e.target.src = '/Rose.png';
                  }}
                />
              </div>

              <div className="text-center w-full px-1">
                <div className="text-[10px] font-bold text-charcoal leading-tight truncate">
                  {flower.name}
                </div>
              </div>

              {isSelected && (
                <>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-pink text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-md z-10">
                    {count}
                  </div>
                  <div
                    onClick={(e) => handleRemove(flower.id, e)}
                    className="absolute -top-1 -left-1 w-5 h-5 bg-gray-400 text-white rounded-full flex items-center justify-center text-[14px] font-bold shadow-md hover:bg-gray-600 z-10"
                  >
                    -
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
