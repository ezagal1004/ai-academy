'use client';

import { motion } from 'framer-motion';
import { START_MISSION_BUTTON_CLASS } from '@/constants/classNames';

interface WelcomeScreenProps {
  title: string;
  onStart: () => void;
}

export default function WelcomeScreen({ title, onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 max-w-3xl w-full"
    >
      <motion.img
        src="/logo.svg"
        alt="Logo"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto drop-shadow-2xl"
      />

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="azosans-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl text-center leading-tight"
      >
        {title}
      </motion.h1>

      <button
        onClick={onStart}
        className={START_MISSION_BUTTON_CLASS}
        style={{ borderRadius: '6px' }}
      >
        START MISSION
      </button>
    </motion.div>
  );
}
