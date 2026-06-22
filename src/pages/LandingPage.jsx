import BouquetCanvas from '../components/bouquet/BouquetCanvas';

export default function LandingPage({ onCreateBouquet }) {
  // Pre-load a beautiful default selection for the landing page hero visual
  const demoFlowers = ['rose', 'peony', 'tulip', 'lily'];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#FFF9F5] to-[#FFEBE5]/40 flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full bg-[#FFD6E0]/20 blur-[80px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 rounded-full bg-[#C8B6FF]/15 blur-[90px]" />
      </div>

      <div className="relative w-full max-w-[390px] md:max-w-4xl flex flex-col md:grid md:grid-cols-2 md:gap-12 md:items-center z-10">
        
        {/* Visual Showcase (Hero Bouquet) */}
        <div className="w-full order-1 md:order-2 flex justify-center mb-10 md:mb-0">
          <div className="w-full max-w-[350px] md:max-w-[390px]">
            <BouquetCanvas selectedFlowers={demoFlowers} layout="classic" />
          </div>
        </div>

        {/* Text Details & Call To Action */}
        <div className="text-center md:text-left order-2 md:order-1 flex flex-col items-center md:items-start max-w-sm mx-auto md:mx-0">
          <span className="text-xs tracking-[5px] text-rose-pink font-semibold uppercase block mb-3">
            Digital Florist & Greeting Cards
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-charcoal mb-4 leading-[1.1]">
            Bloomverse
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-light mb-8 leading-relaxed">
            Send luxury digital bouquets that bloom in their hands. A thoughtful, personalized greeting card experience.
          </p>

          {/* CTA Button */}
          <button
            onClick={onCreateBouquet}
            className="w-full md:w-auto bg-rose-pink hover:bg-[#E04D66] hover:shadow-lg hover:shadow-rose-pink/20 active:scale-98 text-white font-semibold py-4 px-12 rounded-full text-lg transition-all duration-200 shadow-md min-h-[48px] flex items-center justify-center cursor-pointer"
          >
            Create Your Bouquet
          </button>

          {/* Features Grid */}
          <div className="mt-12 grid grid-cols-3 gap-4 w-full">
            <div className="text-center md:text-left bg-white/45 p-4 rounded-[20px] border border-white/60">
              <div className="text-2xl mb-1">⚡</div>
              <h3 className="font-display font-semibold text-charcoal text-xs mb-0.5">Instant</h3>
              <p className="text-[10px] text-gray-400 font-light">Created in under 2 minutes</p>
            </div>
            <div className="text-center md:text-left bg-white/45 p-4 rounded-[20px] border border-white/60">
              <div className="text-2xl mb-1">💝</div>
              <h3 className="font-display font-semibold text-charcoal text-xs mb-0.5">Personal</h3>
              <p className="text-[10px] text-gray-400 font-light">Custom message & card</p>
            </div>
            <div className="text-center md:text-left bg-white/45 p-4 rounded-[20px] border border-white/60">
              <div className="text-2xl mb-1">✨</div>
              <h3 className="font-display font-semibold text-charcoal text-xs mb-0.5">Magical</h3>
              <p className="text-[10px] text-gray-400 font-light">Immersive bloom reveal</p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-20 z-10 text-center text-xs text-gray-400">
        <p className="italic">Make someone smile today • No sign-up required</p>
      </footer>
    </div>
  );
}
