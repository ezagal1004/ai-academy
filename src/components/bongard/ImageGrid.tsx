'use client';

import { motion } from 'framer-motion';
import { Shape } from './LevelData';
import ShapeRenderer from './ShapeRenderer';

interface ImageGridProps {
  images: Shape[][]; // 6 arrays of shapes
  title: string; // "YES ✓" or "NO ✗"
  titleColor: string; // Color for the title
}

export default function ImageGrid({ images, title, titleColor }: ImageGridProps) {
  // Animation variants for staggered appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const boxVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="azosans-black text-lg sm:text-xl md:text-2xl lg:text-3xl drop-shadow-lg"
        style={{ color: titleColor }}
      >
        {title}
      </motion.h3>

      {/* Grid Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 bg-slate-800 p-3 sm:p-4 md:p-5 rounded-xl border-2 border-slate-700 shadow-2xl"
      >
        {images.map((shapes, index) => (
          <motion.div
            key={`box-${index}`}
            variants={boxVariants}
            className="relative w-[min(20vw,100px)] h-[min(20vw,100px)] sm:w-[min(18vw,110px)] sm:h-[min(18vw,110px)] md:w-[min(15vw,120px)] md:h-[min(15vw,120px)] bg-slate-900 rounded-lg border-2 border-slate-600 shadow-lg overflow-hidden"
          >
            {/* Shape Renderer */}
            <ShapeRenderer shapes={shapes} boxSize={100} />
            
            {/* Box Number (subtle) */}
            <div className="absolute top-1 left-1 text-xs text-slate-500 azosans-bold">
              {index + 1}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}