'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TutorialDialog } from '@/components/arc/CharacterScript';

// Color palette (same as PuzzleGrid)
const COLORS = {
    0: '#E5E7EB', // Empty/White
    1: '#ef3e40', // Red
    2: '#4673b9', // Blue
    3: '#eabb5c', // Yellow
    4: '#a7c839', // Green
    5: '#893f98', // Purple
};

interface DialogScreenProps {
    tutorial: TutorialDialog;
    onNext: () => void;
}

export default function DialogScreen({ tutorial, onNext }: DialogScreenProps) {
    // Calculate responsive cell size based on grid dimensions
    const getExampleCellSize = (gridSize: number) => {
        if (gridSize === 3) {
            return 'w-[min(10vw,50px)] h-[min(10vw,50px)] sm:w-[min(8vw,60px)] sm:h-[min(8vw,60px)] md:w-[min(7vw,70px)] md:h-[min(7vw,70px)]';
        } else {
            // 4x4 grid
            return 'w-[min(8vw,45px)] h-[min(8vw,45px)] sm:w-[min(7vw,55px)] sm:h-[min(7vw,55px)] md:w-[min(6vw,65px)] md:h-[min(6vw,65px)]';
        }
    };

    // Scroll to top when dialog screen appears
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 w-full max-w-7xl"
            >
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="azosans-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-2xl text-center flex-shrink-0"
                >
                    {tutorial.patternName}
                </motion.h1>

                {/* Main Content - Flexbox with proper spacing */}
                <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6">
                    {/* Ninja Character */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex-shrink-0 lg:self-start lg:mt-8"
                    >
                        <img
                            src="/ninja.png"
                            alt="Ninja"
                            className="w-24 sm:w-28 md:w-32 lg:w-32 xl:w-36 h-auto drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Examples Container - constrained width */}
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
                                    {/* Example Number */}
                                    <div className="azosans-bold text-lg sm:text-xl md:text-2xl text-white flex-shrink-0">
                                        {index + 1}
                                    </div>

                                    {/* Input Grid */}
                                    <div className="flex flex-col items-center flex-shrink min-w-0">
                                        <h3 className="azosans-bold text-xs sm:text-sm md:text-base lg:text-lg text-white mb-1 sm:mb-2">
                                            INPUT
                                        </h3>
                                        <div
                                            className="grid gap-1 sm:gap-1.5 md:gap-2 bg-slate-900 p-2 sm:p-2.5 md:p-3 rounded-md sm:rounded-lg border-2 border-slate-600"
                                            style={{
                                                gridTemplateColumns: `repeat(${example.input.length}, 1fr)`,
                                            }}
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

                                    {/* Arrow */}
                                    <div className="azosans-black text-2xl sm:text-3xl md:text-4xl text-white flex-shrink-0">
                                        →
                                    </div>

                                    {/* Output Grid */}
                                    <div className="flex flex-col items-center flex-shrink min-w-0">
                                        <h3 className="azosans-bold text-xs sm:text-sm md:text-base lg:text-lg text-white mb-1 sm:mb-2">
                                            OUTPUT
                                        </h3>
                                        <div
                                            className="grid gap-1 sm:gap-1.5 md:gap-2 bg-slate-900 p-2 sm:p-2.5 md:p-3 rounded-md sm:rounded-lg border-2 border-slate-600"
                                            style={{
                                                gridTemplateColumns: `repeat(${example.output.length}, 1fr)`,
                                            }}
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

                    {/* Spacer to balance ninja on large screens */}
                    <div className="hidden lg:block lg:w-32 xl:w-36 flex-shrink-0"></div>
                </div>

                {/* Next Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    onClick={onNext}
                    className="azosans-black text-lg sm:text-xl md:text-2xl lg:text-3xl px-10 sm:px-12 md:px-16 py-3 sm:py-3.5 md:py-4 bg-[#0db88f] text-white shadow-xl transition-all hover:bg-[#07a881] hover:scale-105 active:scale-95 flex-shrink-0 touch-manipulation w-full sm:w-auto max-w-md"
                    style={{ borderRadius: '6px' }}
                >
                    GOT IT!
                </motion.button>
            </motion.div>
        </div>
    );
}