'use client';

import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { HOME_BUTTON_CLASS } from '@/constants/classNames';

interface HomeButtonProps {
  onClick: () => void;
}

export default function HomeButton({ onClick }: HomeButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed top-4 left-4 z-50"
    >
      <button
        onClick={onClick}
        className={HOME_BUTTON_CLASS}
        style={{ borderRadius: '6px' }}
      >
        <Home className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        <span className="hidden xs:inline">HOME</span>
      </button>
    </motion.div>
  );
}
