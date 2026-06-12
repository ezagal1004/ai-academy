'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TutorialDialog } from '@/components/arc/CharacterScript';
import BaseDialogLayout from '@/components/shared/BaseDialogLayout';
import { ARC_COLORS as COLORS } from '@/utils/colors';

interface DialogScreenProps {
  tutorial: TutorialDialog;
  onNext: () => void;
}

function getExampleCellSize(gridSize: number): string {
  if (gridSize === 3) {
    return 'w-[min(10vw,50px)] h-[min(10vw,50px)] sm:w-[min(8vw,60px)] sm:h-[min(8vw,60px)] md:w-[min(7vw,70px)] md:h-[min(7vw,70px)]';
  }
  return 'w-[min(8vw,45px)] h-[min(8vw,45px)] sm:w-[min(7vw,55px)] sm:h-[min(7vw,55px)] md:w-[min(6vw,65px)] md:h-[min(6vw,65px)]';
}

export default function DialogScreen({ tutorial, onNext }: DialogScreenProps) {
  // ARC-specific: scroll to top when dialog appears
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <BaseDialogLayout
      patternName={tutorial.patternName}
      onNext={onNext}
      maxWidth="max-w-7xl"
      layoutMode="arc"
    >
      {/* ARC grid examples: input → output pairs */}
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 max-w-fit">
        {tutorial.examples.map((example, index) => {
          const cellSizeClass = getExampleCellSize(example.input.length);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
              className="flex flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 bg-slate-800 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border-2 border-slate-700 shadow-xl"
            >
              <div className="azosans-bold text-lg sm:text-xl md:text-2xl text-white flex-shrink-0">
                {index + 1}
              </div>

              <div className="flex flex-col items-center flex-shrink min-w-0">
                <h3 className="azosans-bold text-xs sm:text-sm md:text-base lg:text-lg text-white mb-1 sm:mb-2">
                  INPUT
                </h3>
                <div
                  className="grid gap-1 sm:gap-1.5 md:gap-2 bg-slate-900 p-2 sm:p-2.5 md:p-3 rounded-md sm:rounded-lg border-2 border-slate-600"
                  style={{ gridTemplateColumns: `repeat(${example.input.length}, 1fr)` }}
                >
                  {example.input.map((row, rowIndex) =>
                    row.map((color, colIndex) => (
                      <div
                        key={`input-${index}-${rowIndex}-${colIndex}`}
                        className={`${cellSizeClass} rounded shadow-md border-2 border-white/60`}
                        style={{ backgroundColor: COLORS[color as keyof typeof COLORS] }}
                      />
                    ))
                  )}
                </div>
              </div>

              <div className="azosans-black text-2xl sm:text-3xl md:text-4xl text-white flex-shrink-0">
                →
              </div>

              <div className="flex flex-col items-center flex-shrink min-w-0">
                <h3 className="azosans-bold text-xs sm:text-sm md:text-base lg:text-lg text-white mb-1 sm:mb-2">
                  OUTPUT
                </h3>
                <div
                  className="grid gap-1 sm:gap-1.5 md:gap-2 bg-slate-900 p-2 sm:p-2.5 md:p-3 rounded-md sm:rounded-lg border-2 border-slate-600"
                  style={{ gridTemplateColumns: `repeat(${example.output.length}, 1fr)` }}
                >
                  {example.output.map((row, rowIndex) =>
                    row.map((color, colIndex) => (
                      <div
                        key={`output-${index}-${rowIndex}-${colIndex}`}
                        className={`${cellSizeClass} rounded shadow-md border-2 border-white/60`}
                        style={{ backgroundColor: COLORS[color as keyof typeof COLORS] }}
                      />
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </BaseDialogLayout>
  );
}
