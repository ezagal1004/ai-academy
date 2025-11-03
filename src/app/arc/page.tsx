'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PuzzleGrid from '@/components/arc/PuzzleGrid';
import DialogScreen from '@/components/arc/DialogScreen';
import { LEVELS } from '@/components/arc/LevelData';
import { TUTORIAL_SCRIPTS } from '@/components/arc/CharacterScript';
import { Home, X, Info } from 'lucide-react';

// Color palette (same as PuzzleGrid and DialogScreen)
const COLORS = {
    0: '#E5E7EB', // Empty/White
    1: '#ef3e40', // Red
    2: '#4673b9', // Blue
    3: '#eabb5c', // Yellow
    4: '#a7c839', // Green
    5: '#893f98', // Purple
};

// Game phases
type GamePhase = 'welcome' | 'dialog' | 'playing' | 'victory';

// Success and failure messages
const SUCCESS_MESSAGES = [
    "Amazing work! You cracked the code!",
    "Excellent! You're a natural code breaker!",
    "Perfect! Your skills are impressive!",
    "Fantastic! You decoded it perfectly!",
    "Brilliant! Nothing can stop you now!",
];
const FAILURE_MESSAGES = [
    "Hmm, not quite right. Try again!",
    "So close! Check the pattern carefully.",
    "Almost there! Take another look.",
    "Don't give up! You can solve this!",
];
const VICTORY_MESSAGE = "You did it! All codes cracked! You're now a Master Code Breaker! 🥷✨";

export default function CodeBreakerGame() {
    const [gamePhase, setGamePhase] = useState<GamePhase>('welcome');
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [currentTutorialIndex, setCurrentTutorialIndex] = useState(0);
    const [stars, setStars] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [showExitModal, setShowExitModal] = useState(false);
    const [showHintModal, setShowHintModal] = useState(false);

    const currentLevel = LEVELS[currentLevelIndex];
    const currentTutorial = TUTORIAL_SCRIPTS[currentTutorialIndex];

    // Start the game - show first tutorial
    const handleStartGame = () => {
        setGamePhase('dialog');
        setCurrentTutorialIndex(0);
    };

    // Handle dialog "GOT IT!" button
    const handleDialogNext = () => {
        setGamePhase('playing');
    };

    // Handle successful puzzle completion
    const handleSuccess = () => {
        // Award stars based on attempts (1-3 stars)
        const earnedStars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
        setStars(stars + earnedStars);

        // Move to next level after delay
        setTimeout(() => {
            if (currentLevelIndex < LEVELS.length - 1) {
                setCurrentLevelIndex(currentLevelIndex + 1);
                setAttempts(0);

                // Check if we need to show a dialog screen (after every 2 puzzles)
                // Puzzle IDs: 1,2 (mirror) -> 3,4 (rotation) -> 5,6 (transformation)
                // Show dialog before puzzle 3 (index 2) and puzzle 5 (index 4)
                if (currentLevelIndex + 1 === 2 || currentLevelIndex + 1 === 4) {
                    setCurrentTutorialIndex(currentTutorialIndex + 1);
                    setGamePhase('dialog');
                }
            } else {
                // Game completed!
                setGamePhase('victory');
            }
        }, 1500);
    };

    // Handle failed attempt
    const handleFailure = () => {
        setAttempts(attempts + 1);
    };

    // Restart game
    const handleRestart = () => {
        setGamePhase('welcome');
        setCurrentLevelIndex(0);
        setCurrentTutorialIndex(0);
        setStars(0);
        setAttempts(0);
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center overflow-hidden p-3 sm:p-4 md:p-6">
            {/* Home Button - Shows on all screens except welcome */}
            {gamePhase !== 'welcome' && (
                <>
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            type: 'spring',
                            stiffness: 260,
                            damping: 20
                        }}
                        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50"
                    >
                        <button
                            onClick={() => setShowExitModal(true)}
                            className="azosans-black text-base sm:text-lg px-4 sm:px-6 py-2.5 sm:py-3 bg-[#187abf] text-white shadow-2xl transition-all hover:bg-[#0067be] hover:scale-105 active:scale-95 flex items-center gap-2"
                            style={{ borderRadius: '6px' }}
                        >
                            <Home className="w-5 h-5 sm:w-6 sm:h-6" />
                            <span className="hidden sm:inline">HOME</span>
                        </button>
                    </motion.div>

                    {/* Exit Confirmation Modal */}
                    <AnimatePresence>
                        {showExitModal && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                                onClick={() => setShowExitModal(false)}
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    className="bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 max-w-md w-full shadow-2xl border-4 border-slate-700 relative"
                                    onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                                >
                                    {/* Close button */}
                                    <button
                                        onClick={() => setShowExitModal(false)}
                                        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>

                                    {/* Warning Icon */}
                                    <div className="flex justify-center mb-4">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-500/20 rounded-full flex items-center justify-center">
                                            <span className="text-4xl sm:text-5xl">⚠️</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="azosans-black text-2xl sm:text-3xl md:text-4xl text-white text-center mb-3 sm:mb-4">
                                        RETURN HOME?
                                    </h2>

                                    {/* Message */}
                                    <p className="azosans-bold text-base sm:text-lg md:text-xl text-white/90 text-center mb-6 sm:mb-8">
                                        All your progress will be lost. Are you sure you want to leave?
                                    </p>

                                    {/* Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setShowExitModal(false)}
                                            className="flex-1 azosans-black text-lg sm:text-xl px-6 py-3 sm:py-4 bg-slate-600 text-white shadow-xl transition-all hover:bg-slate-500"
                                            style={{ borderRadius: '6px' }}
                                        >
                                            CANCEL
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => window.location.href = '/arc'}
                                            className="flex-1 azosans-black text-lg sm:text-xl px-6 py-3 sm:py-4 bg-[#ef3e40] text-white shadow-xl transition-all hover:bg-[#d63234]"
                                            style={{ borderRadius: '6px' }}
                                        >
                                            LEAVE
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}

            {/* Hint Button - Shows only during playing phase */}
            {gamePhase === 'playing' && (
                <>
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            type: 'spring',
                            stiffness: 260,
                            damping: 20
                        }}
                        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50"
                    >
                        <button
                            onClick={() => setShowHintModal(true)}
                            className="azosans-black w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#eabb5c] text-white shadow-2xl transition-all hover:bg-[#d9a944] hover:scale-110 active:scale-95 flex items-center justify-center"
                        >
                            <Info className="w-6 h-6 sm:w-7 sm:h-7" />
                        </button>
                    </motion.div>

                    {/* Hint Modal */}
                    <AnimatePresence>
                        {showHintModal && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                                onClick={() => setShowHintModal(false)}
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    className="bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-4xl w-full shadow-2xl border-4 border-slate-700 relative max-h-[90vh] overflow-y-auto"
                                    onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                                >
                                    {/* Close button */}
                                    <button
                                        onClick={() => setShowHintModal(false)}
                                        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>

                                    {/* Title */}
                                    <h2 className="azosans-black text-2xl sm:text-3xl md:text-4xl text-white text-center mb-6">
                                        {currentTutorial.patternName}
                                    </h2>

                                    {/* Examples Container */}
                                    <div className="flex flex-col gap-4 sm:gap-5">
                                        {currentTutorial.examples.map((example, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-slate-900 p-4 sm:p-5 rounded-xl border-2 border-slate-600 shadow-xl"
                                            >
                                                {/* Example Number */}
                                                <div className="azosans-bold text-xl sm:text-2xl text-white flex-shrink-0">
                                                    {index + 1}
                                                </div>

                                                {/* Input Grid */}
                                                <div className="flex flex-col items-center flex-shrink-0">
                                                    <h3 className="azosans-bold text-sm sm:text-base text-white mb-2">
                                                        INPUT
                                                    </h3>
                                                    <div
                                                        className="grid gap-1 bg-slate-950 p-2 rounded-lg border-2 border-slate-700"
                                                        style={{
                                                            gridTemplateColumns: `repeat(${example.input.length}, 1fr)`,
                                                        }}
                                                    >
                                                        {example.input.map((row, rowIndex) =>
                                                            row.map((color, colIndex) => (
                                                                <div
                                                                    key={`input-${index}-${rowIndex}-${colIndex}`}
                                                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded shadow-lg border border-white/60"
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
                                                    <h3 className="azosans-bold text-sm sm:text-base text-white mb-2">
                                                        OUTPUT
                                                    </h3>
                                                    <div
                                                        className="grid gap-1 bg-slate-950 p-2 rounded-lg border-2 border-slate-700"
                                                        style={{
                                                            gridTemplateColumns: `repeat(${example.output.length}, 1fr)`,
                                                        }}
                                                    >
                                                        {example.output.map((row, rowIndex) =>
                                                            row.map((color, colIndex) => (
                                                                <div
                                                                    key={`output-${index}-${rowIndex}-${colIndex}`}
                                                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded shadow-lg border border-white/60"
                                                                    style={{ backgroundColor: COLORS[color as keyof typeof COLORS] }}
                                                                />
                                                            ))
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Close Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowHintModal(false)}
                                        className="w-full mt-6 azosans-black text-lg sm:text-xl px-6 py-3 sm:py-4 bg-[#eabb5c] text-slate-900 shadow-xl transition-all hover:bg-[#d9a944]"
                                        style={{ borderRadius: '6px' }}
                                    >
                                        GOT IT!
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}

            <AnimatePresence mode="wait">
                {/* Welcome Screen */}
                {gamePhase === 'welcome' && (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 max-w-3xl px-4 w-full"
                    >
                        {/* Logo */}
                        <motion.img
                            src="/logo.svg"
                            alt="Logo"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto drop-shadow-2xl"
                        />

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="azosans-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white drop-shadow-2xl text-center leading-tight"
                        >
                            CODE BREAKER
                        </motion.h1>

                        {/* Start Button */}
                        <button
                            onClick={handleStartGame}
                            className="azosans-black text-xl sm:text-2xl md:text-3xl px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 bg-[#0db88f] text-white shadow-2xl transition-all hover:bg-[#07a881]"
                            style={{ borderRadius: '6px' }}
                        >
                            START MISSION
                        </button>
                    </motion.div>
                )}

                {/* Dialog Screen */}
                {gamePhase === 'dialog' && (
                    <DialogScreen
                        key={`dialog-${currentTutorialIndex}`}
                        tutorial={currentTutorial}
                        onNext={handleDialogNext}
                    />
                )}

                {/* Playing Screen */}
                {gamePhase === 'playing' && (
                    <motion.div
                        key="playing"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="h-full w-full flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 max-w-[1800px] mx-auto"
                    >
                        {/* Center - Progress Bar + Puzzle Grid */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex-1 flex flex-col items-center justify-center gap-4 sm:gap-6 min-w-0 max-w-3xl"
                        >
                            {/* Progress Bar */}
                            <div className="bg-transparent rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 w-full max-w-2xl mx-auto">
                                <p className="azosans-bold text-white text-center text-sm sm:text-base md:text-lg mb-6 drop-shadow-lg">
                                    Level {currentLevel.id} of {LEVELS.length}
                                </p>

                                {/* Simple progress bar */}
                                <div className="w-full bg-gray-600 rounded-full h-3 sm:h-4 overflow-hidden shadow-lg">
                                    <motion.div
                                        className="bg-white h-full rounded-full shadow-inner"
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: `${(currentLevelIndex / LEVELS.length) * 100}%`
                                        }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                    />
                                </div>

                                {/* Level indicator dots below */}
                                <div className="flex justify-center gap-2 mt-4">
                                    {LEVELS.map((level, index) => (
                                        <div
                                            key={level.id}
                                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${index < currentLevelIndex
                                                ? 'bg-white shadow-md'
                                                : index === currentLevelIndex
                                                    ? 'bg-white shadow-lg scale-125'
                                                    : 'bg-gray-600'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Puzzle Grid */}
                            <PuzzleGrid
                                level={currentLevel}
                                onSuccess={handleSuccess}
                                onFailure={handleFailure}
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* Victory Screen */}
                {gamePhase === 'victory' && (
                    <motion.div
                        key="victory"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 max-w-3xl px-4 w-full overflow-y-auto max-h-screen py-4"
                    >
                        {/* Victory Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="azosans-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl text-center leading-tight"
                        >
                            MISSION COMPLETE!
                        </motion.h1>

                        {/* Stars earned */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, type: 'spring' }}
                            className="flex flex-col items-center gap-3 sm:gap-4 bg-indigo-900 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-indigo-700 shadow-2xl w-full"
                        >
                            <h2 className="azosans-bold text-2xl sm:text-3xl md:text-4xl text-white text-center">Total Stars Earned</h2>
                            <div className="flex gap-1 sm:gap-2 flex-wrap justify-center text-3xl sm:text-4xl md:text-5xl max-w-2xl">
                                {Array.from({ length: Math.min(stars, 18) }).map((_, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0, rotate: 0 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 360 }}
                                        transition={{ delay: 0.7 + i * 0.05, type: 'spring' }}
                                    >
                                        ⭐
                                    </motion.span>
                                ))}
                            </div>
                            <p className="azosans-bold text-xl sm:text-2xl md:text-3xl text-white">{stars} / 18 Stars</p>
                        </motion.div>

                        {/* Play Again Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                            className="azosans-bold text-xl sm:text-2xl md:text-3xl px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl sm:rounded-2xl shadow-2xl border-2 sm:border-4 border-white hover:from-green-600 hover:to-blue-600 transition-all hover:opacity-90"
                            onClick={handleRestart}
                        >
                            PLAY AGAIN
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}