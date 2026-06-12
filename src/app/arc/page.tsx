'use client';

import { motion, AnimatePresence } from 'framer-motion';
import PuzzleGrid from '@/components/arc/PuzzleGrid';
import DialogScreen from '@/components/arc/DialogScreen';
import { LEVELS } from '@/components/arc/LevelData';
import { TUTORIAL_SCRIPTS } from '@/components/arc/CharacterScript';
import { useGameState } from '@/hooks/useGameState';
import HomeButton from '@/components/shared/HomeButton';
import ExitModal from '@/components/shared/ExitModal';
import HintButton from '@/components/shared/HintButton';
import HintModal from '@/components/shared/HintModal';
import WelcomeScreen from '@/components/shared/WelcomeScreen';
import VictoryScreen from '@/components/shared/VictoryScreen';
import ProgressBar from '@/components/shared/ProgressBar';
import { ARC_COLORS as COLORS } from '@/utils/colors';
import { PAGE_CONTAINER_CLASS } from '@/constants/classNames';

function getHintCellSize(gridSize: number): string {
  if (gridSize === 3) {
    return 'w-[min(9vw,45px)] h-[min(9vw,45px)] sm:w-[min(7vw,55px)] sm:h-[min(7vw,55px)] md:w-[min(6vw,65px)] md:h-[min(6vw,65px)]';
  }
  return 'w-[min(7vw,40px)] h-[min(7vw,40px)] sm:w-[min(6vw,50px)] sm:h-[min(6vw,50px)] md:w-[min(5vw,60px)] md:h-[min(5vw,60px)]';
}

export default function CodeBreakerGame() {
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
  } = useGameState({ levelCount: LEVELS.length, scrollBehavior: 'instant', homeHref: '/arc' });

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
            homeHref="/arc"
          />
        </>
      )}

      {gamePhase === 'playing' && (
        <>
          <HintButton onClick={() => setShowHintModal(true)} />
          <HintModal
            isOpen={showHintModal}
            onClose={() => setShowHintModal(false)}
            maxWidth="max-w-4xl"
          >
            <h2 className="azosans-black text-2xl sm:text-3xl md:text-4xl text-white text-center mb-6 pr-8">
              {currentTutorial.patternName}
            </h2>

            <div className="flex flex-col gap-4 sm:gap-5">
              {currentTutorial.examples.map((example, index) => {
                const cellSizeClass = getHintCellSize(example.input.length);
                return (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 bg-slate-900 p-3 sm:p-4 md:p-5 rounded-xl border-2 border-slate-600 shadow-xl"
                  >
                    <div className="azosans-bold text-lg sm:text-xl md:text-2xl text-white flex-shrink-0">
                      {index + 1}
                    </div>

                    <div className="flex flex-col items-center flex-shrink min-w-0">
                      <h3 className="azosans-bold text-xs sm:text-sm md:text-base text-white mb-1 sm:mb-2">
                        INPUT
                      </h3>
                      <div
                        className="grid gap-1 sm:gap-1.5 md:gap-2 bg-slate-950 p-2 sm:p-2.5 md:p-3 rounded-lg border-2 border-slate-700"
                        style={{ gridTemplateColumns: `repeat(${example.input.length}, 1fr)` }}
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

                    <div className="azosans-black text-2xl sm:text-3xl md:text-4xl text-white flex-shrink-0">
                      →
                    </div>

                    <div className="flex flex-col items-center flex-shrink min-w-0">
                      <h3 className="azosans-bold text-xs sm:text-sm md:text-base text-white mb-1 sm:mb-2">
                        OUTPUT
                      </h3>
                      <div
                        className="grid gap-1 sm:gap-1.5 md:gap-2 bg-slate-950 p-2 sm:p-2.5 md:p-3 rounded-lg border-2 border-slate-700"
                        style={{ gridTemplateColumns: `repeat(${example.output.length}, 1fr)` }}
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
                  </div>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHintModal(false)}
              className="w-full mt-6 azosans-black text-lg sm:text-xl md:text-2xl px-6 py-3 bg-[#eabb5c] text-slate-900 shadow-xl transition-all hover:bg-[#d9a944] touch-manipulation"
              style={{ borderRadius: '6px' }}
            >
              GOT IT!
            </motion.button>
          </HintModal>
        </>
      )}

      <AnimatePresence mode="wait">
        {gamePhase === 'welcome' && (
          <WelcomeScreen title="CODE BREAKER" onStart={handleStartGame} />
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
            <PuzzleGrid
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
