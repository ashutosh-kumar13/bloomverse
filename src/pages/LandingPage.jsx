import BouquetCanvas from '../components/bouquet/BouquetCanvas';
import { FeatureCard, InstantIcon, PersonalIcon, MagicalIcon } from '../components/FeatureIcons';

export default function LandingPage({ onCreateBouquet }) {
  // Pre-load a beautiful default selection for the landing page hero visual
  const demoFlowers = ['rose', 'peony', 'tulip', 'lily'];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#FFF8F6] via-[#FFF5F0] to-[#FFECE6] flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Decorative blurred background shapes - more subtle and cohesive */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-150px] left-[-100px] w-96 h-96 rounded-full bg-gradient-to-br from-rose-pink/10 to-purple-pink/5 blur-[100px]" />
        <div className="absolute bottom-[-150px] right-[-100px] w-96 h-96 rounded-full bg-gradient-to-tl from-purple-pink/8 to-rose-pink/5 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-[80px]" />
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
          <span className="text-xs tracking-[4px] text-rose-pink font-semibold uppercase block mb-4 letter-spacing-wide">
            ✦ Digital Florist ✦
          </span>
          <h1 className="text-6xl md:text-7xl font-display font-bold bg-gradient-to-r from-rose-pink to-purple-pink bg-clip-text text-transparent mb-5 leading-[1.05]">
            Bloomverse
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-light mb-8 leading-relaxed max-w-md">
            Send luxury digital bouquets that bloom beautifully in their hands. Create personalized, memorable moments with every card.
          </p>

          {/* CTA Button */}
          <button
            onClick={onCreateBouquet}
            className="w-full md:w-auto bg-gradient-to-r from-rose-pink to-[#E04D66] hover:shadow-xl hover:shadow-rose-pink/30 active:scale-95 text-white font-semibold py-4 px-12 rounded-full text-lg transition-all duration-300 shadow-lg min-h-[48px] flex items-center justify-center cursor-pointer font-display"
          >
            Create Your Bouquet
          </button>

          {/* Features Grid */}
          <div className="mt-12 grid grid-cols-3 gap-3 w-full">
            <FeatureCard 
              icon={InstantIcon} 
              title="Instant" 
              description="Created in under 2 minutes"
            />
            <FeatureCard 
              icon={PersonalIcon} 
              title="Personal" 
              description="Custom message & card"
            />
            <FeatureCard 
              icon={MagicalIcon} 
              title="Magical" 
              description="Immersive bloom reveal"
            />
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-20 z-10 text-center text-xs">
        <p className="italic text-gray-400 font-light">Make someone smile today • No sign-up required</p>
      </footer>
    </div>
  );
}
