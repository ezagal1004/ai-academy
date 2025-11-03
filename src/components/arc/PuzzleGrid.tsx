'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Eraser } from 'lucide-react';

// Color palette
const COLORS = {
    0: '#E5E7EB', // Empty/White
    1: '#ef3e40', // Red
    2: '#4673b9', // Blue
    3: '#eabb5c', // Yellow
    4: '#a7c839', // Green
    5: '#893f98', // Purple
};

const COLOR_NAMES = {
    0: 'Empty',
    1: 'Red',
    2: 'Blue',
    3: 'Yellow',
    4: 'Green',
    5: 'Purple',
};

type GridPattern = number[][];

interface PuzzleGridProps {
    level: {
        id: number;
        name: string;
        gridSize: number;
        inputPattern: GridPattern;
        solution: GridPattern;
        hint: string;
    };
    onSuccess: () => void;
    onFailure: () => void;
}

export default function PuzzleGrid({ level, onSuccess, onFailure }: PuzzleGridProps) {
    // Initialize output grid with empty cells
    const [outputGrid, setOutputGrid] = useState<GridPattern>(
        Array(level.gridSize).fill(null).map(() => Array(level.gridSize).fill(0))
    );

    const [selectedColor, setSelectedColor] = useState<number>(1); // Default to red
    const [isShaking, setIsShaking] = useState(false);
    const [isPulsing, setIsPulsing] = useState(false);

    // Reset grid when level changes
    useEffect(() => {
        setOutputGrid(
            Array(level.gridSize).fill(null).map(() => Array(level.gridSize).fill(0))
        );
        setSelectedColor(1);
        setIsShaking(false);
        setIsPulsing(false);
        
        // Scroll to top when level changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [level.id, level.gridSize]);

    // Handle cell click - paint with selected color or erase if clicking same color
    const handleCellClick = (row: number, col: number) => {
        const newGrid = outputGrid.map(r => [...r]);

        // If clicking on a cell with the same color as selected, erase it (set to 0)
        if (newGrid[row][col] === selectedColor) {
            newGrid[row][col] = 0;
        } else {
            // Otherwise, paint with selected color
            newGrid[row][col] = selectedColor;
        }

        setOutputGrid(newGrid);
    };

    // Reset the output grid
    const handleReset = () => {
        setOutputGrid(
            Array(level.gridSize).fill(null).map(() => Array(level.gridSize).fill(0))
        );
    };

    // Validate solution
    const handleSubmit = () => {
        const isCorrect = JSON.stringify(outputGrid) === JSON.stringify(level.solution);

        if (isCorrect) {
            setIsPulsing(true);
            setTimeout(() => {
                setIsPulsing(false);
                onSuccess();
            }, 400);
        } else {
            setIsShaking(true);
            setTimeout(() => {
                setIsShaking(false);
                onFailure();
            }, 500);
        }
    };

    // Stagger animation for grid cells
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
            },
        },
    };

    const cellVariants: Variants = {
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

    // Calculate responsive cell size based on grid size
    // For 3x3: larger cells, for 4x4: smaller cells
    const getCellSizeClasses = () => {
        if (level.gridSize === 3) {
            return 'w-[min(12vw,60px)] h-[min(12vw,60px)] sm:w-[min(10vw,70px)] sm:h-[min(10vw,70px)] md:w-[min(8vw,80px)] md:h-[min(8vw,80px)]';
        } else {
            // 4x4 grid - smaller cells
            return 'w-[min(10vw,50px)] h-[min(10vw,50px)] sm:w-[min(8vw,60px)] sm:h-[min(8vw,60px)] md:w-[min(7vw,70px)] md:h-[min(7vw,70px)]';
        }
    };

    const cellSizeClasses = getCellSizeClasses();

    return (
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full max-w-6xl mx-auto">
            {/* Grids Container - Always Side by Side with proper constraints */}
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-full max-w-full overflow-visible">
                {/* Input Grid (Display Only) */}
                <div className="flex flex-col items-center flex-shrink min-w-0">
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="azosans-bold text-xs xs:text-sm sm:text-base md:text-xl lg:text-2xl text-white mb-1 xs:mb-1.5 sm:mb-2 drop-shadow-lg"
                    >
                        INPUT
                    </motion.h3>
                    <motion.div
                        key={`input-grid-${level.id}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate={
                            isPulsing
                                ? { scale: [1, 1.1, 0], opacity: [1, 1, 0], transition: { duration: 0.4 } }
                                : "visible"
                        }
                        className="bg-slate-800 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl border-2 border-slate-700"
                    >
                        <div
                            className="grid gap-1 sm:gap-1.5 md:gap-2"
                            style={{
                                gridTemplateColumns: `repeat(${level.gridSize}, 1fr)`,
                            }}
                        >
                            {level.inputPattern.map((row, rowIndex) =>
                                row.map((color, colIndex) => (
                                    <motion.div
                                        key={`input-${rowIndex}-${colIndex}`}
                                        variants={cellVariants}
                                        className={`${cellSizeClasses} rounded-sm sm:rounded-md md:rounded-lg shadow-md border-2 border-white/60`}
                                        style={{ backgroundColor: COLORS[color as keyof typeof COLORS] }}
                                    />
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Arrow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="azosans-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-2xl flex-shrink-0"
                >
                    ⇒
                </motion.div>

                {/* Output Grid (Interactive) */}
                <div className="flex flex-col items-center flex-shrink min-w-0">
                    <motion.h3
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="azosans-bold text-xs xs:text-sm sm:text-base md:text-xl lg:text-2xl text-white mb-1 xs:mb-1.5 sm:mb-2 drop-shadow-lg"
                    >
                        SOLUTION
                    </motion.h3>
                    <motion.div
                        key={`output-grid-${level.id}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate={
                            isShaking
                                ? { x: [-15, 15, -15, 15, 0], transition: { duration: 0.4 } }
                                : isPulsing
                                    ? { scale: [1, 1.1, 0], opacity: [1, 1, 0], transition: { duration: 0.4 } }
                                    : "visible"
                        }
                        className="bg-slate-800 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl border-2 border-slate-700"
                    >
                        <motion.div
                            variants={containerVariants}
                            className="grid gap-1 sm:gap-1.5 md:gap-2"
                            style={{
                                gridTemplateColumns: `repeat(${level.gridSize}, 1fr)`,
                            }}
                        >
                            {outputGrid.map((row, rowIndex) =>
                                row.map((color, colIndex) => (
                                    <button
                                        key={`output-${rowIndex}-${colIndex}`}
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                        className={`${cellSizeClasses} rounded-sm sm:rounded-md md:rounded-lg shadow-md border-2 border-white/60 cursor-pointer transition-all hover:opacity-80 hover:border-white hover:shadow-2xl active:opacity-60 active:scale-95 touch-manipulation`}
                                        style={{ backgroundColor: COLORS[color as keyof typeof COLORS] }}
                                    />
                                ))
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Color Picker */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-2 w-full max-w-2xl"
            >
                <h4 className="azosans-bold text-xs sm:text-sm md:text-base lg:text-xl text-white drop-shadow-lg">
                    SELECT COLOR
                </h4>
                <div className="flex gap-2 sm:gap-3 flex-wrap justify-center items-center">
                    {/* Eraser (White) - Separated */}
                    <div className="bg-slate-800 p-2 rounded-lg border-2 border-slate-700 shadow-xl">
                        <button
                            onClick={() => setSelectedColor(0)}
                            className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-md shadow-md transition-all hover:opacity-80 active:opacity-60 active:scale-95 flex items-center justify-center touch-manipulation ${selectedColor === 0
                                ? 'border-3 border-white scale-110 shadow-2xl'
                                : 'border-2 border-white/60'
                                }`}
                            style={{ backgroundColor: COLORS[0] }}
                            title="Eraser"
                        >
                            <Eraser className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                        </button>
                    </div>

                    {/* Color Palette */}
                    <div className="flex gap-2 sm:gap-3 bg-slate-800 p-2 rounded-lg border-2 border-slate-700 shadow-xl flex-wrap justify-center">
                        {Object.entries(COLORS)
                            .filter(([index]) => index !== '0') // Exclude white/eraser
                            .map(([index, color]) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedColor(Number(index))}
                                    className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-md shadow-md transition-all hover:opacity-80 active:opacity-60 active:scale-95 touch-manipulation ${selectedColor === Number(index)
                                        ? 'border-3 border-white scale-110 shadow-2xl'
                                        : 'border-2 border-white/60'
                                        }`}
                                    style={{ backgroundColor: color }}
                                    title={COLOR_NAMES[index as unknown as keyof typeof COLOR_NAMES]}
                                />
                            ))}
                    </div>
                </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-row flex-wrap justify-center gap-3 w-full max-w-xl"
            >
                <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="azosans-black text-base sm:text-lg md:text-xl lg:text-2xl px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 bg-[#187abf] text-white shadow-xl transition-all hover:bg-[#0067be] hover:scale-105 active:scale-95 touch-manipulation flex-1 min-w-[120px]"
                    style={{ borderRadius: '6px' }}
                >
                    RESET
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="azosans-black text-base sm:text-lg md:text-xl lg:text-2xl px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 bg-[#0db88f] text-white shadow-xl transition-all hover:bg-[#07a881] hover:scale-105 active:scale-95 touch-manipulation flex-1 min-w-[120px]"
                    style={{ borderRadius: '6px' }}
                >
                    SUBMIT
                </motion.button>
            </motion.div>
        </div>
    );
}