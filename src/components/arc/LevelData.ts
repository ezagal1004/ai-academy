// Level data structure for 6 puzzles (2 per pattern type)

export interface Level {
  id: number;
  name: string;
  patternType: 'mirror' | 'rotation' | 'transformation';
  gridSize: number;
  inputPattern: number[][];
  solution: number[][];
  hint: string;
}

export const LEVELS: Level[] = [
  // MIRROR CODE - Puzzle 1A (Easy)
  {
    id: 1,
    name: 'MIRROR BASICS',
    patternType: 'mirror',
    gridSize: 3,
    inputPattern: [
      [1, 0, 0],
      [0, 2, 0],
      [0, 0, 3],
    ],
    solution: [
      [0, 0, 1],
      [0, 2, 0],
      [3, 0, 0],
    ],
    hint: 'Flip it like a mirror - left becomes right, right becomes left!',
  },
  // MIRROR CODE - Puzzle 1B (Medium)
  {
    id: 2,
    name: 'MIRROR MASTERY',
    patternType: 'mirror',
    gridSize: 3,
    inputPattern: [
      [1, 2, 3],
      [0, 4, 0],
      [5, 0, 0],
    ],
    solution: [
      [3, 2, 1],
      [0, 4, 0],
      [0, 0, 5],
    ],
    hint: 'Remember: everything flips horizontally!',
  },
  // ROTATION CIPHER - Puzzle 2A (Easy)
  {
    id: 3,
    name: 'ROTATION BASICS',
    patternType: 'rotation',
    gridSize: 3,
    inputPattern: [
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ],
    solution: [
      [0, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    hint: 'Turn it 90 degrees clockwise - imagine rotating the grid to the right!',
  },
  // ROTATION CIPHER - Puzzle 2B (Medium)
  {
    id: 4,
    name: 'ROTATION MASTERY',
    patternType: 'rotation',
    gridSize: 3,
    inputPattern: [
      [1, 2, 0],
      [3, 0, 0],
      [0, 0, 4],
    ],
    solution: [
      [0, 3, 1],
      [0, 0, 2],
      [4, 0, 0],
    ],
    hint: 'Rotate clockwise: top → right, right → bottom, bottom → left, left → top!',
  },
  // TRANSFORMATION - Puzzle 3A (Easy)
  {
    id: 5,
    name: 'TRANSFORMATION BASICS',
    patternType: 'transformation',
    gridSize: 4,
    inputPattern: [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 2, 2],
      [0, 0, 2, 2],
    ],
    solution: [
      [2, 2, 0, 0],
      [2, 2, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 1],
    ],
    hint: 'Swap the red and blue blocks - red goes where blue was, blue goes where red was!',
  },
  // TRANSFORMATION - Puzzle 3B (Medium)
  {
    id: 6,
    name: 'TRANSFORMATION MASTERY',
    patternType: 'transformation',
    gridSize: 4,
    inputPattern: [
      [1, 0, 0, 2],
      [0, 3, 3, 0],
      [0, 3, 3, 0],
      [2, 0, 0, 1],
    ],
    solution: [
      [2, 0, 0, 1],
      [0, 3, 3, 0],
      [0, 3, 3, 0],
      [1, 0, 0, 2],
    ],
    hint: 'Swap red and blue positions. The yellow blocks stay where they are!',
  },
];