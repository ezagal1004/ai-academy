'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { MODAL_OVERLAY_CLASS } from '@/constants/classNames';

interface ExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  homeHref: string;
}

export default function ExitModal({ isOpen, onClose, homeHref }: ExitModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={MODAL_OVERLAY_CLASS}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-slate-700 relative"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors touch-manipulation"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <span className="text-4xl sm:text-5xl">⚠️</span>
              </div>
            </div>

            <h2 className="azosans-black text-2xl sm:text-3xl md:text-4xl text-white text-center mb-3">
              RETURN HOME?
            </h2>

            <p className="azosans-bold text-base sm:text-lg md:text-xl text-white/90 text-center mb-6 leading-relaxed">
              All your progress will be lost. Are you sure you want to leave?
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="flex-1 azosans-black text-lg sm:text-xl px-6 py-3 bg-slate-600 text-white shadow-xl transition-all hover:bg-slate-500 touch-manipulation"
                style={{ borderRadius: '6px' }}
              >
                CANCEL
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = homeHref)}
                className="flex-1 azosans-black text-lg sm:text-xl px-6 py-3 bg-[#ef3e40] text-white shadow-xl transition-all hover:bg-[#d63234] touch-manipulation"
                style={{ borderRadius: '6px' }}
              >
                LEAVE
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
