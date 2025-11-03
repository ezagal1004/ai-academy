'use client';

import { motion } from 'motion/react';
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
    return (
        <div className="h-screen w-screen flex items-center justify-center overflow-hidden p-3 sm:p-4 md:p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 max-w-6xl w-full h-full justify-center"
            >
                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="azosans-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-2xl text-center"
                >
                    {tutorial.patternName}
                </motion.h1>

                {/* Main Content Container */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 w-full flex-1 min-h-0">
                    {/* Ninja Character */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex-shrink-0"
                    >
                        <img
                            src="/ninja.png"
                            alt="Ninja"
                            className="w-24 h-auto sm:w-32 md:w-36 lg:w-40 xl:w-48 drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Examples Container */}
                    <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 overflow-y-auto max-h-full">
                        {tutorial.examples.map((example, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                                className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-5 bg-slate-800 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-slate-700 shadow-2xl"
                            >
                                {/* Example Number */}
                                <div className="azosans-bold text-xl sm:text-2xl text-white flex-shrink-0">
                                    {index + 1}
                                </div>

                                {/* Input Grid */}
                                <div className="flex flex-col items-center flex-shrink-0">
                                    <h3 className="azosans-bold text-sm sm:text-base md:text-lg text-white mb-1 sm:mb-2">
                                        INPUT
                                    </h3>
                                    <div
                                        className="grid gap-0.5 sm:gap-1 bg-slate-900 p-1.5 sm:p-2 md:p-2.5 rounded-md sm:rounded-lg border-2 border-slate-600"
                                        style={{
                                            gridTemplateColumns: `repeat(${example.input.length}, 1fr)`,
                                        }}
                                    >
                                        {example.input.map((row, rowIndex) =>
                                            row.map((color, colIndex) => (
                                                <div
                                                    key={`input-${index}-${rowIndex}-${colIndex}`}
                                                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded shadow-lg border border-white/60"
                                                    style={{ backgroundColor: COLORS[color as keyof typeof COLORS] }}
                                                />
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="azosans-black text-2xl sm:text-3xl text-white rotate-90 sm:rotate-0 flex-shrink-0">
                                    →
                                </div>

                                {/* Output Grid */}
                                <div className="flex flex-col items-center flex-shrink-0">
                                    <h3 className="azosans-bold text-sm sm:text-base md:text-lg text-white mb-1 sm:mb-2">
                                        OUTPUT
                                    </h3>
                                    <div
                                        className="grid gap-0.5 sm:gap-1 bg-slate-900 p-1.5 sm:p-2 md:p-2.5 rounded-md sm:rounded-lg border-2 border-slate-600"
                                        style={{
                                            gridTemplateColumns: `repeat(${example.output.length}, 1fr)`,
                                        }}
                                    >
                                        {example.output.map((row, rowIndex) =>
                                            row.map((color, colIndex) => (
                                                <div
                                                    key={`output-${index}-${rowIndex}-${colIndex}`}
                                                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded shadow-lg border border-white/60"
                                                    style={{ backgroundColor: COLORS[color as keyof typeof COLORS] }}
                                                />
                                            ))
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Next Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    onClick={onNext}
                    className="azosans-black text-xl sm:text-2xl md:text-3xl px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 bg-[#0db88f] text-white shadow-2xl transition-all hover:bg-[#07a881]"
                    style={{ borderRadius: '6px' }}
                >
                    GOT IT!
                </motion.button>
            </motion.div>
        </div>
    );
}