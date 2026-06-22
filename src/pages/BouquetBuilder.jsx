import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowerSelector from '../components/flowers/FlowerSelector';
import LayoutSelector from '../components/bouquet/LayoutSelector';
import MessageEditor from '../components/bouquet/MessageEditor';
import BouquetCanvas from '../components/bouquet/BouquetCanvas';

export default function BouquetBuilder({ onComplete }) {
  const [step, setStep] = useState(1);
  const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [selectedLayout, setSelectedLayout] = useState('classic');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  const stepNames = ['Select Flowers', 'Choose Arrangement', 'Write Message'];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({
        flowers: selectedFlowers,
        layout: selectedLayout,
        recipientName,
        senderName,
        message,
      });
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) return selectedFlowers.length > 0;
    if (step === 2) return true; // arrangement layout is always selected
    if (step === 3) return recipientName.trim() && senderName.trim() && message.trim();
    return false;
  };

  return (
    <div className="relative min-h-screen bg-[#FFF9F5] py-10 px-4 flex flex-col items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-50px] right-[-50px] w-80 h-80 rounded-full bg-[#FFD6E0]/15 blur-[90px]" />
        <div className="absolute bottom-10 left-[-80px] w-96 h-96 rounded-full bg-[#C8B6FF]/10 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-[390px] flex flex-col z-10">
        {/* Progress Tracker */}
        <div className="mb-6 w-full">
          <div className="flex justify-between items-center px-1 mb-3">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center flex-1 relative">
                {/* Stepper Dot */}
                <div
                  className={`w-3 h-3 rounded-full z-10 transition-all duration-300 ${
                    s <= step ? 'bg-rose-pink ring-4 ring-[#FFD6E0]' : 'bg-gray-300'
                  }`}
                />
                
                {/* Connector Line */}
                {s < 3 && (
                  <div
                    className={`absolute top-1.5 left-1/2 w-full h-[2px] z-0 transition-all duration-300 ${
                      s < step ? 'bg-rose-pink' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-[10px] text-rose-pink/70 uppercase tracking-[2px] font-semibold block mb-0.5">
              Step {step} of 3
            </span>
            <p className="text-xs text-gray-500 font-light">{stepNames[step - 1]}</p>
          </div>
        </div>

        {/* Builder Steps Content Panel */}
        <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 p-6 mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              {step === 1 && (
                <FlowerSelector
                  selectedFlowers={selectedFlowers}
                  onFlowerToggle={setSelectedFlowers}
                />
              )}
              {step === 2 && (
                <LayoutSelector
                  selectedLayout={selectedLayout}
                  onLayoutChange={setSelectedLayout}
                />
              )}
              {step === 3 && (
                <MessageEditor
                  recipientName={recipientName}
                  senderName={senderName}
                  message={message}
                  onRecipientNameChange={setRecipientName}
                  onSenderNameChange={setSenderName}
                  onMessageChange={setMessage}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Real-time Bouquet Preview Canvas */}
        {selectedFlowers.length > 0 && (
          <div className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 p-4 mb-6">
            <h3 className="text-center font-display font-semibold text-xs text-gray-400 tracking-[1px] uppercase mb-3">
              Live Bouquet View
            </h3>
            <BouquetCanvas selectedFlowers={selectedFlowers} layout={selectedLayout} />
          </div>
        )}

        {/* Navigation Action Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            style={{ minHeight: '48px' }}
            className="flex-1 px-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-charcoal font-semibold rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center cursor-pointer"
          >
            Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            style={{ minHeight: '48px' }}
            className="flex-[2] px-6 py-3 bg-rose-pink hover:bg-[#E04D66] active:scale-98 text-white font-semibold rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition duration-200 shadow-[0_4px_14px_rgba(232,93,117,0.25)] flex items-center justify-center cursor-pointer"
          >
            {step === 3 ? 'Review Card →' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
}
