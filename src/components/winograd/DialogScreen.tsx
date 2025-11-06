'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TutorialDialog } from './CharacterScript';

interface DialogScreenProps {
    tutorial: TutorialDialog;
    onNext: () => void;
}

export default function DialogScreen({ tutorial, onNext }: DialogScreenProps) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 w-full max-w-6xl"
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

                {/* Explanation Text */}
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="azosans-bold text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 text-center max-w-3xl leading-relaxed px-4"
                >
                    {tutorial.explanation}
                </motion.p>

                {/* Main Content - Grid layout for perfect centering */}
                <div className="w-full flex flex-col lg:grid lg:grid-cols-[auto_1fr_auto] items-center lg:items-start gap-4 sm:gap-6">
                    {/* Ninja Character */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex-shrink-0 lg:mt-8 lg:mr-8"
                    >
                        <img
                            src="/ninja.png"
                            alt="Ninja"
                            className="w-24 sm:w-28 md:w-32 lg:w-32 xl:w-36 h-auto drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Example Container - Perfectly centered */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex flex-col items-center justify-center gap-3 sm:gap-4 w-full bg-slate-800 p-4 sm:p-5 md:p-6 rounded-xl border-2 border-slate-700 shadow-xl max-w-3xl"
                    >
                        {/* Example Label */}
                        <h3 className="azosans-bold text-sm sm:text-base md:text-lg text-white/70">
                            EXAMPLE
                        </h3>

                        {/* Sentence with highlighted pronoun */}
                        <div className="azosans-bold text-base sm:text-lg md:text-xl lg:text-2xl text-white text-center leading-relaxed">
                            {tutorial.exampleSentence.split(new RegExp(`\\b(${tutorial.examplePronoun})\\b`, 'gi')).map((part, index) => (
                                part.toLowerCase() === tutorial.examplePronoun.toLowerCase() ? (
                                    <span
                                        key={index}
                                        className="px-2 py-1 rounded"
                                        style={{ backgroundColor: '#eabb5c', color: '#1e293b' }}
                                    >
                                        {part}
                                    </span>
                                ) : (
                                    <span key={index}>{part}</span>
                                )
                            ))}
                        </div>

                        {/* Arrow */}
                        <div className="azosans-black text-3xl sm:text-4xl text-white">
                            ↓
                        </div>

                        {/* Answer */}
                        <div className="flex flex-col items-center gap-2">
                            <p className="azosans-bold text-sm sm:text-base text-white/70">
                                "{tutorial.examplePronoun}" refers to:
                            </p>
                            <div
                                className="azosans-black text-lg sm:text-xl md:text-2xl px-4 py-2 rounded-lg"
                                style={{ backgroundColor: '#0db88f', color: 'white' }}
                            >
                                {tutorial.exampleAnswer}
                            </div>
                        </div>

                        {/* Explanation */}
                        <div className="bg-slate-900 p-3 sm:p-4 rounded-lg border-2 border-slate-600 w-full">
                            <p className="azosans-bold text-sm sm:text-base md:text-lg text-white/90 text-center">
                                💡 {tutorial.exampleWhy}
                            </p>
                        </div>
                    </motion.div>

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