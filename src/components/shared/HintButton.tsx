'use client';

import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { HINT_BUTTON_CLASS } from '@/constants/classNames';

interface HintButtonProps {
  onClick: () => void;
}

export default function HintButton({ onClick }: HintButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed top-4 right-4 z-50"
    >
      <button onClick={onClick} className={HINT_BUTTON_CLASS}>
        <Info className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>
    </motion.div>
  );
}
