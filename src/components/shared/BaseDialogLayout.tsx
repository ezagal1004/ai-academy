'use client';

import { motion } from 'framer-motion';
import { GOT_IT_BUTTON_CLASS } from '@/constants/classNames';

interface BaseDialogLayoutProps {
  patternName: string;
  explanation?: string;
  onNext: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  // ARC uses flex-row layout; Bongard/Winograd use 3-column grid layout
  layoutMode?: 'arc' | 'standard';
}

export default function BaseDialogLayout({
  patternName,
  explanation,
  onNext,
  children,
  maxWidth = 'max-w-6xl',
  layoutMode = 'standard',
}: BaseDialogLayoutProps) {
  const innerLayoutClass =
    layoutMode === 'arc'
      ? 'w-full flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6'
      : 'w-full flex flex-col lg:grid lg:grid-cols-[auto_1fr_auto] items-center lg:items-start gap-4 sm:gap-6';

  const ninjaClass =
    layoutMode === 'arc'
      ? 'flex-shrink-0 lg:self-start lg:mt-8'
      : 'flex-shrink-0 lg:mt-8 lg:mr-8';

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col items-center gap-4 sm:gap-5 md:gap-6 w-full ${maxWidth}`}
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="azosans-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-2xl text-center flex-shrink-0"
        >
          {patternName}
        </motion.h1>

        {explanation && (
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="azosans-bold text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 text-center max-w-3xl leading-relaxed px-4"
          >
            {explanation}
          </motion.p>
        )}

        <div className={innerLayoutClass}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={ninjaClass}
          >
            <img
              src="/ninja.png"
              alt="Ninja"
              className="w-24 sm:w-28 md:w-32 lg:w-32 xl:w-36 h-auto drop-shadow-2xl"
            />
          </motion.div>

          {children}

          <div className="hidden lg:block lg:w-32 xl:w-36 flex-shrink-0" />
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={onNext}
          className={GOT_IT_BUTTON_CLASS}
          style={{ borderRadius: '6px' }}
        >
          GOT IT!
        </motion.button>
      </motion.div>
    </div>
  );
}
