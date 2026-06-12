'use client';

import { useState, useEffect, useRef } from 'react';

export type GamePhase = 'welcome' | 'dialog' | 'playing' | 'victory';

interface UseGameStateOptions {
  levelCount: number;
  scrollBehavior: 'instant' | 'smooth' | 'instant-then-smooth';
  successDelay?: number;
  homeHref: string;
}

export function useGameState(options: UseGameStateOptions) {
  const { levelCount, scrollBehavior, successDelay = 0 } = options;

  const [gamePhase, setGamePhase] = useState<GamePhase>('welcome');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const currentLevelIndexRef = useRef(0);
  const [currentTutorialIndex, setCurrentTutorialIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);

  // Keep ref in sync so doSuccess can read the latest value without stale closures
  currentLevelIndexRef.current = currentLevelIndex;

  useEffect(() => {
    if (scrollBehavior === 'instant') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else if (scrollBehavior === 'smooth') {
      requestAnimationFrame(() => {
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
      });
    } else {
      // instant-then-smooth (Winograd)
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      requestAnimationFrame(() => {
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
      });
    }
  }, [gamePhase, currentLevelIndex, scrollBehavior]);

  const handleStartGame = (): void => {
    setGamePhase('dialog');
    setCurrentTutorialIndex(0);
  };

  const handleDialogNext = (): void => setGamePhase('playing');

  const handleFailure = (): void => setAttempts(prev => prev + 1);

  const handleRestart = (): void => {
    currentLevelIndexRef.current = 0;
    setGamePhase('welcome');
    setCurrentLevelIndex(0);
    setCurrentTutorialIndex(0);
    setStars(0);
    setAttempts(0);
  };

  const doSuccess = (): void => {
    // Read current level from ref to avoid stale closure (safe for Bongard's setTimeout too)
    const prevIdx = currentLevelIndexRef.current;
    const earnedStars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;

    setStars(prev => prev + earnedStars);

    if (prevIdx >= levelCount - 1) {
      setGamePhase('victory');
      return;
    }

    const nextIdx = prevIdx + 1;
    setCurrentLevelIndex(nextIdx);
    setAttempts(0);

    if (nextIdx === 2 || nextIdx === 4) {
      setCurrentTutorialIndex(prev => prev + 1);
      setGamePhase('dialog');
    }
  };

  const handleSuccess = (): void => {
    if (successDelay > 0) {
      setTimeout(doSuccess, successDelay);
    } else {
      doSuccess();
    }
  };

  return {
    gamePhase,
    currentLevelIndex,
    currentTutorialIndex,
    stars,
    attempts,
    showExitModal,
    showHintModal,
    setShowExitModal,
    setShowHintModal,
    handleStartGame,
    handleDialogNext,
    handleSuccess,
    handleFailure,
    handleRestart,
  };
}
