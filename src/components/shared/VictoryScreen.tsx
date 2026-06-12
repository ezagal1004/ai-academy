'use client';

import { motion } from 'framer-motion';
import { PLAY_AGAIN_BUTTON_CLASS } from '@/constants/classNames';

interface VictoryScreenProps {
  stars: number;
  onPlayAgain: () => void;
}

export default function VictoryScreen({ stars, onPlayAgain }: VictoryScreenProps) {
  return (
    <motion.div
      key="victory"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-4 sm:gap-6 max-w-3xl w-full"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="azosans-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-2xl text-center leading-tight"
      >
        MISSION COMPLETE!
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="flex flex-col items-center gap-3 bg-slate-800 p-6 sm:p-8 rounded-2xl border-4 border-slate-700 shadow-2xl w-full max-w-2xl"
      >
        <h2 className="azosans-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-white text-center">
          Total Stars Earned
        </h2>
        <div className="flex gap-1 flex-wrap justify-center text-2xl sm:text-3xl md:text-4xl max-w-xl">
          {Array.from({ length: Math.min(stars, 18) }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              transition={{ delay: 0.7 + i * 0.05, type: 'spring' }}
            >
              ⭐
            </motion.span>
          ))}
        </div>
        <p className="azosans-bold text-xl sm:text-2xl md:text-3xl text-white">{stars} / 18 Stars</p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className={PLAY_AGAIN_BUTTON_CLASS}
        style={{ borderRadius: '6px' }}
        onClick={onPlayAgain}
      >
        PLAY AGAIN
      </motion.button>
    </motion.div>
  );
}
