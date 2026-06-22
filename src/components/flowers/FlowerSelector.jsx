import { flowers } from '../../data/flowers';

// Dictionary of flower meanings for emotional depth
const flowerMeanings = {
  rose: 'Love & Romance',
  tulip: 'Deep Affection',
  sunflower: 'Adoration & Loyalty',
  peony: 'Honor & Prosperity',
  lily: 'Purity & Grace',
  daisy: 'Innocence & Hope',
  orchid: 'Refined Beauty',
  lavender: 'Devotion & Calm',
};

export default function FlowerSelector({ selectedFlowers, onFlowerToggle, maxFlowers = 8 }) {
  const handleClick = (flowerId) => {
    if (selectedFlowers.includes(flowerId)) {
      onFlowerToggle(selectedFlowers.filter((id) => id !== flowerId));
    } else if (selectedFlowers.length < maxFlowers) {
      onFlowerToggle([...selectedFlowers, flowerId]);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-1">
          Select Your Flowers
        </h2>
        <p className="text-xs text-gray-500 font-light">
          Choose up to {maxFlowers} flowers to form your hand-crafted arrangement.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {flowers.map((flower) => {
          const isSelected = selectedFlowers.includes(flower.id);
          const meaning = flowerMeanings[flower.id] || '';

          return (
            <button
              key={flower.id}
              onClick={() => handleClick(flower.id)}
              style={{ minHeight: '84px' }}
              className={`relative p-4 rounded-[20px] border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-rose-pink bg-[#FFF2F4]/80 shadow-[0_4px_12px_rgba(232,93,117,0.06)]'
                  : 'border-[#E85D75]/10 bg-white hover:border-[#E85D75]/30'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)] transition-transform duration-250 hover:scale-110">
                  {flower.emoji}
                </span>
                {isSelected && (
                  <span className="text-xs font-bold text-rose-pink bg-[#FFD6E0] w-5 h-5 rounded-full flex items-center justify-center">
                    ✓
                  </span>
                )}
              </div>
              <div>
                <div className="text-sm font-semibold text-charcoal font-body">
                  {flower.name}
                </div>
                {meaning && (
                  <div className="text-[10px] text-gray-400 font-light italic mt-0.5">
                    {meaning}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <p className="text-xs text-gray-400">
          Selected: <span className="font-semibold text-rose-pink">{selectedFlowers.length}</span> / {maxFlowers}
        </p>
      </div>
    </div>
  );
}
