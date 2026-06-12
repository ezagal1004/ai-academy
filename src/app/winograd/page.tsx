'use client';

import { motion, AnimatePresence } from 'framer-motion';
import SentencePuzzle from '@/components/winograd/SentencePuzzle';
import DialogScreen from '@/components/winograd/DialogScreen';
import { LEVELS } from '@/components/winograd/LevelData';
import { TUTORIAL_SCRIPTS } from '@/components/winograd/CharacterScript';
import { useGameState } from '@/hooks/useGameState';
import HomeButton from '@/components/shared/HomeButton';
import ExitModal from '@/components/shared/ExitModal';
import HintButton from '@/components/shared/HintButton';
import HintModal from '@/components/shared/HintModal';
import WelcomeScreen from '@/components/shared/WelcomeScreen';
import VictoryScreen from '@/components/shared/VictoryScreen';
import ProgressBar from '@/components/shared/ProgressBar';
import { PAGE_CONTAINER_CLASS } from '@/constants/classNames';

export default function StorySolverGame() {
  const {
    gamePhase,
    currentLevelIndex,
    currentTutorialIndex,
    stars,
    showExitModal,
    showHintModal,
    setShowExitModal,
    setShowHintModal,
    handleStartGame,
    handleDialogNext,
    handleSuccess,
    handleFailure,
    handleRestart,
  } = useGameState({
    levelCount: LEVELS.length,
    scrollBehavior: 'instant-then-smooth',
    homeHref: '/winograd',
  });

  const currentLevel = LEVELS[currentLevelIndex];
  const currentTutorial = TUTORIAL_SCRIPTS[currentTutorialIndex];

  return (
    <div className={PAGE_CONTAINER_CLASS}>
      {gamePhase !== 'welcome' && (
        <>
          <HomeButton onClick={() => setShowExitModal(true)} />
          <ExitModal
            isOpen={showExitModal}
            onClose={() => setShowExitModal(false)}
            homeHref="/winograd"
          />
        </>
      )}

      {gamePhase === 'playing' && (
        <>
          <HintButton onClick={() => setShowHintModal(true)} />
          <HintModal
            isOpen={showHintModal}
            onClose={() => setShowHintModal(false)}
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#eabb5c]/20 rounded-full flex items-center justify-center">
                <span className="text-4xl sm:text-5xl">💡</span>
              </div>
            </div>

            <h2 className="azosans-black text-2xl sm:text-3xl md:text-4xl text-white text-center mb-4">
              HINT
            </h2>

            <p className="azosans-bold text-lg sm:text-xl md:text-2xl text-white/90 text-center mb-6 leading-relaxed">
              {currentLevel.hint}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHintModal(false)}
              className="w-full azosans-black text-lg sm:text-xl md:text-2xl px-6 py-3 bg-[#eabb5c] text-slate-900 shadow-xl transition-all hover:bg-[#d9a944] touch-manipulation"
              style={{ borderRadius: '6px' }}
            >
              GOT IT!
            </motion.button>
          </HintModal>
        </>
      )}

      <AnimatePresence mode="wait">
        {gamePhase === 'welcome' && (
          <WelcomeScreen title="STORY SOLVER" onStart={handleStartGame} />
        )}

        {gamePhase === 'dialog' && (
          <DialogScreen
            key={`dialog-${currentTutorialIndex}`}
            tutorial={currentTutorial}
            onNext={handleDialogNext}
          />
        )}

        {gamePhase === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center justify-center gap-4 sm:gap-6 max-w-[1800px] mx-auto pt-20 sm:pt-6"
          >
            <ProgressBar
              currentLevel={currentLevel}
              currentLevelIndex={currentLevelIndex}
              levels={LEVELS}
            />
            <SentencePuzzle
              level={currentLevel}
              onSuccess={handleSuccess}
              onFailure={handleFailure}
            />
          </motion.div>
        )}

        {gamePhase === 'victory' && (
          <VictoryScreen stars={stars} onPlayAgain={handleRestart} />
        )}
      </AnimatePresence>
    </div>
  );
}
