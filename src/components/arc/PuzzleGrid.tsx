'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
            },
        },
    };

    const cellVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20,
            },
        },
    };

    return (
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5 w-full max-w-6xl">
            {/* Grids Container */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 lg:gap-6">
                {/* Input Grid (Display Only) */}
                <div className="flex flex-col items-center">
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="azosans-bold text-xl sm:text-2xl lg:text-3xl text-white mb-2 sm:mb-3 drop-shadow-lg"
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
                        className="bg-slate-800 p-2.5 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl shadow-2xl border-2 sm:border-3 border-slate-700"
                    >
                        <div
                            className="grid gap-1.5 sm:gap-2 lg:gap-2.5"
                            style={{
                                gridTemplateColumns: `repeat(${level.gridSize}, 1fr)`,
                            }}
                        >
                            {level.inputPattern.map((row, rowIndex) =>
                                row.map((color, colIndex) => (
                                    <motion.div
                                        key={`input-${rowIndex}-${colIndex}`}
                                        variants={cellVariants}
                                        className="w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl shadow-lg border-2 sm:border-3 border-white/60"
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
                    className="azosans-black text-4xl sm:text-5xl lg:text-6xl text-white drop-shadow-2xl rotate-90 sm:rotate-0"
                >
                    ⇒
                </motion.div>

                {/* Output Grid (Interactive) */}
                <div className="flex flex-col items-center">
                    <motion.h3
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="azosans-bold text-xl sm:text-2xl lg:text-3xl text-white mb-2 sm:mb-3 drop-shadow-lg"
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
                        className="bg-slate-800 p-2.5 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl shadow-2xl border-2 sm:border-3 border-slate-700"
                    >
                        <motion.div
                            variants={containerVariants}
                            className="grid gap-1.5 sm:gap-2 lg:gap-2.5"
                            style={{
                                gridTemplateColumns: `repeat(${level.gridSize}, 1fr)`,
                            }}
                        >
                            {outputGrid.map((row, rowIndex) =>
                                row.map((color, colIndex) => (
                                    <button
                                        key={`output-${rowIndex}-${colIndex}`}
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                        className="w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl shadow-lg border-2 sm:border-3 border-white/60 cursor-pointer transition-all hover:opacity-80 hover:border-white hover:shadow-2xl active:opacity-60 active:scale-95"
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
                className="flex flex-col items-center gap-2 sm:gap-2.5"
            >
                <h4 className="azosans-bold text-lg sm:text-xl lg:text-2xl text-white drop-shadow-lg">
                    SELECT COLOR
                </h4>
                <div className="flex gap-1.5 sm:gap-2">
                    {/* Eraser (White) - Separated */}
                    <div className="bg-slate-800 p-2.5 sm:p-3 rounded-xl sm:rounded-xl border-2 sm:border-3 border-slate-700 shadow-2xl">
                        <button
                            onClick={() => setSelectedColor(0)}
                            className={`w-9 h-9 sm:w-11 sm:h-11 lg:w-13 lg:h-13 rounded-lg sm:rounded-xl shadow-lg transition-all hover:opacity-80 active:opacity-60 flex items-center justify-center ${selectedColor === 0
                                ? 'border-2 sm:border-3 border-white scale-110 shadow-2xl'
                                : 'border-2 sm:border-3 border-white/60'
                                }`}
                            style={{ backgroundColor: COLORS[0] }}
                            title="Eraser"
                        >
                            <Eraser className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-slate-700" />
                        </button>
                    </div>

                    {/* Color Palette */}
                    <div className="flex gap-2 sm:gap-2.5 bg-slate-800 p-2.5 sm:p-3 rounded-xl sm:rounded-xl border-2 sm:border-3 border-slate-700 shadow-2xl">
                        {Object.entries(COLORS)
                            .filter(([index]) => index !== '0') // Exclude white/eraser
                            .map(([index, color]) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedColor(Number(index))}
                                    className={`w-9 h-9 sm:w-11 sm:h-11 lg:w-13 lg:h-13 rounded-lg sm:rounded-xl shadow-lg transition-all hover:opacity-80 active:opacity-60 ${selectedColor === Number(index)
                                        ? 'border-2 sm:border-3 border-white scale-110 shadow-2xl'
                                        : 'border-2 sm:border-3 border-white/60'
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
                className="flex flex-wrap justify-center gap-2.5 sm:gap-3"
            >
                <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="azosans-black text-xl sm:text-2xl md:text-2xl px-8 sm:px-12 md:px-14 py-3 sm:py-3.5 md:py-4 bg-[#187abf] text-white shadow-2xl transition-all hover:bg-[#0067be]"
                    style={{ borderRadius: '6px' }}
                >
                    RESET
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="azosans-black text-xl sm:text-2xl md:text-2xl px-8 sm:px-12 md:px-14 py-3 sm:py-3.5 md:py-4 bg-[#0db88f] text-white shadow-2xl transition-all hover:bg-[#07a881]"
                    style={{ borderRadius: '6px' }}
                >
                    SUBMIT
                </motion.button>
            </motion.div>
        </div>
    );
}