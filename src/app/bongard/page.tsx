'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BongardPuzzle from '@/components/bongard/BongardPuzzle';
import DialogScreen from '@/components/bongard/DialogScreen';
import { LEVELS } from '@/components/bongard/LevelData';
import { TUTORIAL_SCRIPTS } from '@/components/bongard/CharacterScript';
import { Home, X, Info } from 'lucide-react';

// Game phases
type GamePhase = 'welcome' | 'dialog' | 'playing' | 'victory';

export default function PatternMatcherGame() {
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

        // Move to next level after delay (reduced to match puzzle animation)
        setTimeout(() => {
            if (currentLevelIndex < LEVELS.length - 1) {
                setCurrentLevelIndex(currentLevelIndex + 1);
                setAttempts(0);

                // Show dialog before Level 3 (index 2) and Level 5 (index 4)
                if (currentLevelIndex + 1 === 2 || currentLevelIndex + 1 === 4) {
                    setCurrentTutorialIndex(currentTutorialIndex + 1);
                    setGamePhase('dialog');
                }
            } else {
                // Game completed!
                setGamePhase('victory');
            }
        }, 800);
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
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6">
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
                        className="fixed top-4 left-4 z-50"
                    >
                        <button
                            onClick={() => setShowExitModal(true)}
                            className="azosans-black text-sm sm:text-base md:text-lg px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-[#187abf] text-white shadow-xl transition-all hover:bg-[#0067be] hover:scale-105 active:scale-95 flex items-center gap-2 touch-manipulation"
                            style={{ borderRadius: '6px' }}
                        >
                            <Home className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                            <span className="hidden xs:inline">HOME</span>
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
                                    className="bg-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-slate-700 relative"
                                    onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                                >
                                    {/* Close button */}
                                    <button
                                        onClick={() => setShowExitModal(false)}
                                        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors touch-manipulation"
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
                                    <h2 className="azosans-black text-2xl sm:text-3xl md:text-4xl text-white text-center mb-3">
                                        RETURN HOME?
                                    </h2>

                                    {/* Message */}
                                    <p className="azosans-bold text-base sm:text-lg md:text-xl text-white/90 text-center mb-6 leading-relaxed">
                                        All your progress will be lost. Are you sure you want to leave?
                                    </p>

                                    {/* Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setShowExitModal(false)}
                                            className="flex-1 azosans-black text-lg sm:text-xl px-6 py-3 bg-slate-600 text-white shadow-xl transition-all hover:bg-slate-500 touch-manipulation"
                                            style={{ borderRadius: '6px' }}
                                        >
                                            CANCEL
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => window.location.href = '/'}
                                            className="flex-1 azosans-black text-lg sm:text-xl px-6 py-3 bg-[#ef3e40] text-white shadow-xl transition-all hover:bg-[#d63234] touch-manipulation"
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
                        className="fixed top-4 right-4 z-50"
                    >
                        <button
                            onClick={() => setShowHintModal(true)}
                            className="azosans-black w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#eabb5c] text-white shadow-xl transition-all hover:bg-[#d9a944] hover:scale-110 active:scale-95 flex items-center justify-center touch-manipulation"
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
                                    className="bg-slate-800 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border-4 border-slate-700 relative"
                                    onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                                >
                                    {/* Close button */}
                                    <button
                                        onClick={() => setShowHintModal(false)}
                                        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10 touch-manipulation"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>

                                    {/* Hint Icon */}
                                    <div className="flex justify-center mb-4">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#eabb5c]/20 rounded-full flex items-center justify-center">
                                            <span className="text-4xl sm:text-5xl">💡</span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="azosans-black text-2xl sm:text-3xl md:text-4xl text-white text-center mb-4">
                                        HINT
                                    </h2>

                                    {/* Hint Text */}
                                    <p className="azosans-bold text-lg sm:text-xl md:text-2xl text-white/90 text-center mb-6 leading-relaxed">
                                        {currentLevel.hint}
                                    </p>

                                    {/* Close Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowHintModal(false)}
                                        className="w-full azosans-black text-lg sm:text-xl md:text-2xl px-6 py-3 bg-[#eabb5c] text-slate-900 shadow-xl transition-all hover:bg-[#d9a944] touch-manipulation"
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
                        className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 max-w-3xl w-full"
                    >
                        {/* Logo */}
                        <motion.img
                            src="/logo.svg"
                            alt="Logo"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto drop-shadow-2xl"
                        />

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="azosans-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl text-center leading-tight"
                        >
                            PATTERN MATCHER
                        </motion.h1>

                        {/* Start Button */}
                        <button
                            onClick={handleStartGame}
                            className="azosans-black text-xl sm:text-2xl md:text-3xl px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 bg-[#0db88f] text-white shadow-2xl transition-all hover:bg-[#07a881] hover:scale-105 active:scale-95 touch-manipulation"
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
                        className="w-full flex flex-col items-center justify-center gap-4 sm:gap-6 max-w-[1800px] mx-auto pt-20 sm:pt-6"
                    >
                        {/* Progress Bar */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-transparent rounded-xl p-4 sm:p-6 w-full max-w-2xl"
                        >
                            <p className="azosans-bold text-white text-center text-sm sm:text-base md:text-lg mb-4 sm:mb-6 drop-shadow-lg">
                                Level {currentLevel.id} of {LEVELS.length}
                            </p>

                            {/* Progress bar */}
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

                            {/* Level indicator dots */}
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
                        </motion.div>

                        {/* Puzzle */}
                        <BongardPuzzle
                            level={currentLevel}
                            onSuccess={handleSuccess}
                            onFailure={handleFailure}
                        />
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
                        className="flex flex-col items-center justify-center gap-4 sm:gap-6 max-w-3xl w-full"
                    >
                        {/* Victory Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="azosans-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-2xl text-center leading-tight"
                        >
                            MISSION COMPLETE!
                        </motion.h1>

                        {/* Stars earned */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, type: 'spring' }}
                            className="flex flex-col items-center gap-3 bg-indigo-900 p-6 sm:p-8 rounded-2xl border-4 border-indigo-700 shadow-2xl w-full max-w-2xl"
                        >
                            <h2 className="azosans-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-white text-center">Total Stars Earned</h2>
                            <div className="flex gap-1 flex-wrap justify-center text-2xl sm:text-3xl md:text-4xl max-w-xl">
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
                            className="azosans-bold text-xl sm:text-2xl md:text-3xl px-10 sm:px-12 md:px-14 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl border-4 border-white shadow-2xl hover:from-green-600 hover:to-blue-600 transition-all hover:opacity-90 hover:scale-105 active:scale-95 touch-manipulation"
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