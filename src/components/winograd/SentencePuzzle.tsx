'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WinogradLevel } from './LevelData';

interface SentencePuzzleProps {
    level: WinogradLevel;
    onSuccess: () => void;
    onFailure: () => void;
}

export default function SentencePuzzle({ level, onSuccess, onFailure }: SentencePuzzleProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isShaking, setIsShaking] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

    // Shuffle array helper function
    const shuffleArray = (array: string[]) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // Reset selection and shuffle answers when level changes
    useEffect(() => {
        setSelectedAnswer(null);
        setIsShaking(false);
        setIsSuccess(false);
        setShuffledAnswers(shuffleArray(level.answerChoices));
    }, [level.id]);

    // Handle answer selection
    const handleAnswerSelect = (answer: string) => {
        setSelectedAnswer(answer);
    };

    // Validate answer
    const handleSubmit = () => {
        if (!selectedAnswer) return;

        const isCorrect = selectedAnswer === level.correctAnswer;

        if (isCorrect) {
            setIsSuccess(true);
            onSuccess();
        } else {
            setIsShaking(true);
            setTimeout(() => {
                setIsShaking(false);
                onFailure();
            }, 500);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 w-full max-w-4xl mx-auto">
            {/* Sentence Display Box */}
            <motion.div
                key={`sentence-${level.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                    isShaking
                        ? { x: [-15, 15, -15, 15, 0], transition: { duration: 0.4 } }
                        : isSuccess
                            ? { scale: [1, 1.05, 1.05], transition: { duration: 0.8 } }
                            : { opacity: 1, scale: 1 }
                }
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.2 }}
                className={`w-full bg-slate-800 p-6 sm:p-8 md:p-10 rounded-2xl border-2 border-slate-700 shadow-2xl transition-all duration-300 ${isSuccess ? 'drop-shadow-[0_0_30px_rgba(13,184,143,0.6)]' : ''
                    }`}
            >
                <div className="azosans-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-white text-center leading-relaxed">
                    {level.sentence.split(new RegExp(`\\b(${level.pronoun})\\b`, 'gi')).map((part, index) => (
                        part.toLowerCase() === level.pronoun.toLowerCase() ? (
                            <span
                                key={index}
                                className="px-2 sm:px-3 py-1 rounded-md font-black"
                                style={{ backgroundColor: '#eabb5c', color: '#1e293b' }}
                            >
                                {part.toUpperCase()}
                            </span>
                        ) : (
                            <span key={index}>{part}</span>
                        )
                    ))}
                </div>
            </motion.div>

            {/* Question */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-3 sm:gap-4 w-full"
            >
                <h4 className="azosans-bold text-base sm:text-lg md:text-xl lg:text-2xl text-white drop-shadow-lg text-center">
                    What does "{level.pronoun.toUpperCase()}" refer to?
                </h4>

                {/* Answer Options */}
                <div className="flex flex-col gap-2 sm:gap-3 w-full bg-slate-800 p-4 sm:p-5 md:p-6 rounded-xl border-2 border-slate-700 shadow-2xl">
                    {shuffledAnswers.map((choice, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAnswerSelect(choice)}
                            className={`
                azosans-bold text-sm sm:text-base md:text-lg lg:text-xl
                px-4 sm:px-5 py-3 sm:py-4
                rounded-lg
                transition-all
                text-left
                flex items-center gap-3
                ${selectedAnswer === choice
                                    ? 'bg-[#187abf] text-white border-2 border-white shadow-xl scale-105'
                                    : 'bg-slate-700 text-white border-2 border-slate-600 hover:bg-slate-600'
                                }
              `}
                        >
                            {/* Radio Circle */}
                            <div
                                className={`
                  flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2
                  flex items-center justify-center
                  ${selectedAnswer === choice
                                        ? 'border-white bg-white'
                                        : 'border-slate-400'
                                    }
                `}
                            >
                                {selectedAnswer === choice && (
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#187abf]" />
                                )}
                            </div>

                            {/* Choice Text */}
                            <span className="flex-1">{choice}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full max-w-md"
            >
                <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                    className={`
            w-full azosans-black text-lg sm:text-xl md:text-2xl
            px-8 py-3 sm:py-4
            rounded-lg
            shadow-2xl
            transition-all
            touch-manipulation
            ${selectedAnswer
                            ? 'bg-[#0db88f] text-white hover:bg-[#07a881] cursor-pointer'
                            : 'bg-slate-600 text-slate-400 cursor-not-allowed opacity-50'
                        }
          `}
                >
                    SUBMIT ANSWER
                </motion.button>
            </motion.div>
        </div>
    );
}