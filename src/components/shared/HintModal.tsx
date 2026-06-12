'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { MODAL_OVERLAY_CLASS } from '@/constants/classNames';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  maxWidth?: string;
  children: React.ReactNode;
}

export default function HintModal({
  isOpen,
  onClose,
  maxWidth = 'max-w-2xl',
  children,
}: HintModalProps) {
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
            className={`bg-slate-800 rounded-2xl p-6 sm:p-8 ${maxWidth} w-full shadow-2xl border-4 border-slate-700 relative max-h-[90vh] overflow-y-auto`}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10 touch-manipulation"
            >
              <X className="w-6 h-6" />
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
