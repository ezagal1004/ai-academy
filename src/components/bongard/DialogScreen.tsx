'use client';

import { motion } from 'framer-motion';
import { TutorialDialog } from './CharacterScript';
import ShapeRenderer from './ShapeRenderer';
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
      {/* Bongard examples: LEFT (YES) and RIGHT (NO) shape boxes */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full"
      >
        <div className="flex flex-col items-center gap-3">
          <h3 className="azosans-black text-lg sm:text-xl md:text-2xl drop-shadow-lg" style={{ color: '#0db88f' }}>
            LEFT (YES ✓)
          </h3>
          <div className="flex flex-row gap-3 sm:gap-4 bg-slate-800 p-3 sm:p-4 md:p-5 rounded-xl border-2 border-slate-700 shadow-xl">
            {tutorial.exampleLeft.map((shapes, index) => (
              <div
                key={`left-${index}`}
                className="relative w-[min(22vw,110px)] h-[min(22vw,110px)] sm:w-[min(20vw,120px)] sm:h-[min(20vw,120px)] md:w-[min(18vw,130px)] md:h-[min(18vw,130px)] bg-slate-900 rounded-lg border-2 border-slate-600 shadow-lg overflow-hidden"
              >
                <ShapeRenderer shapes={shapes} boxSize={100} />
                <div className="absolute top-1 left-1 text-xs text-slate-500 azosans-bold">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="azosans-black text-3xl sm:text-4xl md:text-5xl text-white drop-shadow-2xl rotate-90 lg:rotate-0">
          ⇔
        </div>

        <div className="flex flex-col items-center gap-3">
          <h3 className="azosans-black text-lg sm:text-xl md:text-2xl drop-shadow-lg" style={{ color: '#ef3e40' }}>
            RIGHT (NO ✗)
          </h3>
          <div className="flex flex-row gap-3 sm:gap-4 bg-slate-800 p-3 sm:p-4 md:p-5 rounded-xl border-2 border-slate-700 shadow-xl">
            {tutorial.exampleRight.map((shapes, index) => (
              <div
                key={`right-${index}`}
                className="relative w-[min(22vw,110px)] h-[min(22vw,110px)] sm:w-[min(20vw,120px)] sm:h-[min(20vw,120px)] md:w-[min(18vw,130px)] md:h-[min(18vw,130px)] bg-slate-900 rounded-lg border-2 border-slate-600 shadow-lg overflow-hidden"
              >
                <ShapeRenderer shapes={shapes} boxSize={100} />
                <div className="absolute top-1 left-1 text-xs text-slate-500 azosans-bold">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </BaseDialogLayout>
  );
}
