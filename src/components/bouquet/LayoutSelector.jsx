import { layouts } from '../../data/flowers';

export default function LayoutSelector({ selectedLayout, onLayoutChange }) {
  // Description mapper for luxury aesthetics
  const layoutDetails = {
    classic: 'A traditional and compact round dome cluster.',
    cascade: 'A majestic flow cascading downwards.',
    modern: 'An asymmetrical and contemporary clean design.',
    heart: 'A romantic outline celebrating connection.',
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-1">
          Choose Arrangement
        </h2>
        <p className="text-xs text-gray-500 font-light">
          Select a layout pattern to compose your bouquet.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {layouts.map((layout) => {
          const isSelected = selectedLayout === layout.id;
          const details = layoutDetails[layout.id] || layout.description;

          return (
            <button
              key={layout.id}
              onClick={() => onLayoutChange(layout.id)}
              style={{ minHeight: '96px' }}
              className={`p-4 rounded-[20px] border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-rose-pink bg-[#FFF2F4]/80 shadow-[0_4px_12px_rgba(232,93,117,0.06)]'
                  : 'border-[#E85D75]/10 bg-white hover:border-[#E85D75]/30'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-xs font-semibold text-rose-pink uppercase tracking-[1px]">
                  {layout.name.split(' ')[1] || layout.name}
                </span>
                {isSelected && (
                  <span className="text-xs font-bold text-rose-pink bg-[#FFD6E0] w-5 h-5 rounded-full flex items-center justify-center">
                    ✓
                  </span>
                )}
              </div>
              <div>
                <div className="text-sm font-semibold text-charcoal font-body mb-0.5">
                  {layout.name}
                </div>
                <div className="text-[10px] text-gray-400 font-light leading-snug">
                  {details}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
