'use client';

import { motion } from 'framer-motion';
import { TutorialDialog } from './CharacterScript';
import BaseDialogLayout from '@/components/shared/BaseDialogLayout';

interface DialogScreenProps {
  tutorial: TutorialDialog;
  onNext: () => void;
}

export default function DialogScreen({ tutorial, onNext }: DialogScreenProps) {
  return (
    <BaseDialogLayout
      patternName={tutorial.patternName}
      explanation={tutorial.explanation}
      onNext={onNext}
    >
      {/* Winograd example: sentence with highlighted pronoun + reasoning */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-col items-center justify-center gap-3 sm:gap-4 w-full bg-slate-800 p-4 sm:p-5 md:p-6 rounded-xl border-2 border-slate-700 shadow-xl max-w-3xl"
      >
        <h3 className="azosans-bold text-sm sm:text-base md:text-lg text-white/70">
          EXAMPLE
        </h3>

        <div className="azosans-bold text-base sm:text-lg md:text-xl lg:text-2xl text-white text-center leading-relaxed">
          {tutorial.exampleSentence
            .split(new RegExp(`\\b(${tutorial.examplePronoun})\\b`, 'gi'))
            .map((part, index) =>
              part.toLowerCase() === tutorial.examplePronoun.toLowerCase() ? (
                <span
                  key={index}
                  className="px-2 py-1 rounded"
                  style={{ backgroundColor: '#eabb5c', color: '#1e293b' }}
                >
                  {part}
                </span>
              ) : (
                <span key={index}>{part}</span>
              )
            )}
        </div>

        <div className="azosans-black text-3xl sm:text-4xl text-white">↓</div>

        <div className="flex flex-col items-center gap-2">
          <p className="azosans-bold text-sm sm:text-base text-white/70">
            "{tutorial.examplePronoun}" refers to:
          </p>
          <div
            className="azosans-black text-lg sm:text-xl md:text-2xl px-4 py-2 rounded-lg"
            style={{ backgroundColor: '#0db88f', color: 'white' }}
          >
            {tutorial.exampleAnswer}
          </div>
        </div>

        <div className="bg-slate-900 p-3 sm:p-4 rounded-lg border-2 border-slate-600 w-full">
          <p className="azosans-bold text-sm sm:text-base md:text-lg text-white/90 text-center">
            💡 {tutorial.exampleWhy}
          </p>
        </div>
      </motion.div>
    </BaseDialogLayout>
  );
}
