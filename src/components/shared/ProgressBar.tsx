'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentLevel: { id: number };
  currentLevelIndex: number;
  levels: { id: number }[];
}

export default function ProgressBar({ currentLevel, currentLevelIndex, levels }: ProgressBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-transparent rounded-xl p-4 sm:p-6 w-full max-w-2xl"
    >
      <p className="azosans-bold text-white text-center text-sm sm:text-base md:text-lg mb-4 sm:mb-6 drop-shadow-lg">
        Level {currentLevel.id} of {levels.length}
      </p>

      <div className="w-full bg-gray-600 rounded-full h-3 sm:h-4 overflow-hidden shadow-lg">
        <motion.div
          className="bg-white h-full rounded-full shadow-inner"
          initial={{ width: 0 }}
          animate={{ width: `${(currentLevelIndex / levels.length) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {levels.map((level, index) => (
          <div
            key={level.id}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
              index < currentLevelIndex
                ? 'bg-white shadow-md'
                : index === currentLevelIndex
                  ? 'bg-white shadow-lg scale-125'
                  : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
