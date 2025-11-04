// Level data structure for Bongard problems (Pattern Matcher)

export interface Shape {
  type: 'circle' | 'square' | 'triangle';
  color: string; // Hex color
  size: number; // 20-60 (small to large)
  position: { x: number; y: number }; // 0-100 (percentage of box)
  rotation?: number; // 0-360 degrees (mainly for triangles)
}

export interface BongardLevel {
  id: number;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  leftImages: Shape[][]; // 6 arrays of shapes (what satisfies the rule)
  rightImages: Shape[][]; // 6 arrays of shapes (what doesn't satisfy the rule)
  correctRule: string; // The correct answer
  answerChoices: string[]; // 3-4 multiple choice options
  hint: string;
}

// Color palette - same as ARC game
const COLORS = {
  RED: '#ef3e40',
  BLUE: '#4673b9',
  YELLOW: '#eabb5c',
  GREEN: '#a7c839',
  PURPLE: '#893f98',
  GRAY: '#94a3b8',
};

export const LEVELS: BongardLevel[] = [
  // LEVEL 1: Shape Type (Easy) - Circles vs Squares
  {
    id: 1,
    name: 'SHAPE BASICS',
    difficulty: 'easy',
    leftImages: [
      // Left side: All circles
      [{ type: 'circle', color: COLORS.RED, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'circle', color: COLORS.BLUE, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'circle', color: COLORS.YELLOW, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'circle', color: COLORS.GREEN, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'circle', color: COLORS.PURPLE, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'circle', color: COLORS.RED, size: 40, position: { x: 50, y: 50 } }],
    ],
    rightImages: [
      // Right side: All squares
      [{ type: 'square', color: COLORS.RED, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'square', color: COLORS.BLUE, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'square', color: COLORS.YELLOW, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'square', color: COLORS.GREEN, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'square', color: COLORS.PURPLE, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'square', color: COLORS.RED, size: 40, position: { x: 50, y: 50 } }],
    ],
    correctRule: 'Left has circles, Right has squares',
    answerChoices: [
      'Left has circles, Right has squares',
      'Left is red, Right is blue',
      'Left is large, Right is small',
      'Left has one shape, Right has many shapes',
    ],
    hint: 'Look at the shape type - what\'s different between the two sides?',
  },

  // LEVEL 2: Color (Easy) - Red vs Blue
  {
    id: 2,
    name: 'COLOR MATCH',
    difficulty: 'easy',
    leftImages: [
      // Left side: All red
      [{ type: 'circle', color: COLORS.RED, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'square', color: COLORS.RED, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'triangle', color: COLORS.RED, size: 40, position: { x: 50, y: 50 }, rotation: 0 }],
      [{ type: 'circle', color: COLORS.RED, size: 50, position: { x: 50, y: 50 } }],
      [{ type: 'square', color: COLORS.RED, size: 35, position: { x: 50, y: 50 } }],
      [{ type: 'triangle', color: COLORS.RED, size: 45, position: { x: 50, y: 50 }, rotation: 180 }],
    ],
    rightImages: [
      // Right side: All blue
      [{ type: 'circle', color: COLORS.BLUE, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'square', color: COLORS.BLUE, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'triangle', color: COLORS.BLUE, size: 40, position: { x: 50, y: 50 }, rotation: 0 }],
      [{ type: 'circle', color: COLORS.BLUE, size: 50, position: { x: 50, y: 50 } }],
      [{ type: 'square', color: COLORS.BLUE, size: 35, position: { x: 50, y: 50 } }],
      [{ type: 'triangle', color: COLORS.BLUE, size: 45, position: { x: 50, y: 50 }, rotation: 180 }],
    ],
    correctRule: 'Left is red, Right is blue',
    answerChoices: [
      'Left is red, Right is blue',
      'Left has circles, Right has triangles',
      'Left is at the top, Right is at the bottom',
      'Left is large, Right is small',
    ],
    hint: 'Ignore the shapes - what color do you see on each side?',
  },

  // LEVEL 3: Size (Medium) - Large vs Small
  {
    id: 3,
    name: 'SIZE MATTERS',
    difficulty: 'medium',
    leftImages: [
      // Left side: Large shapes
      [{ type: 'circle', color: COLORS.RED, size: 55, position: { x: 50, y: 50 } }],
      [{ type: 'square', color: COLORS.BLUE, size: 55, position: { x: 50, y: 50 } }],
      [{ type: 'triangle', color: COLORS.YELLOW, size: 55, position: { x: 50, y: 50 }, rotation: 0 }],
      [{ type: 'circle', color: COLORS.GREEN, size: 60, position: { x: 50, y: 50 } }],
      [{ type: 'square', color: COLORS.PURPLE, size: 58, position: { x: 50, y: 50 } }],
      [{ type: 'triangle', color: COLORS.RED, size: 57, position: { x: 50, y: 50 }, rotation: 180 }],
    ],
    rightImages: [
      // Right side: Small shapes
      [{ type: 'circle', color: COLORS.RED, size: 25, position: { x: 50, y: 50 } }],
      [{ type: 'square', color: COLORS.BLUE, size: 25, position: { x: 50, y: 50 } }],
      [{ type: 'triangle', color: COLORS.YELLOW, size: 25, position: { x: 50, y: 50 }, rotation: 0 }],
      [{ type: 'circle', color: COLORS.GREEN, size: 28, position: { x: 50, y: 50 } }],
      [{ type: 'square', color: COLORS.PURPLE, size: 26, position: { x: 50, y: 50 } }],
      [{ type: 'triangle', color: COLORS.RED, size: 27, position: { x: 50, y: 50 }, rotation: 180 }],
    ],
    correctRule: 'Left shapes are large, Right shapes are small',
    answerChoices: [
      'Left shapes are large, Right shapes are small',
      'Left has circles, Right has squares',
      'Left is red, Right is blue',
      'Left has many shapes, Right has one shape',
    ],
    hint: 'Compare the size of the shapes on each side!',
  },

  // LEVEL 4: Count (Medium) - One vs Many
  {
    id: 4,
    name: 'COUNTING GAME',
    difficulty: 'medium',
    leftImages: [
      // Left side: One shape per box
      [{ type: 'circle', color: COLORS.RED, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'square', color: COLORS.BLUE, size: 40, position: { x: 50, y: 50 } }],
      [{ type: 'triangle', color: COLORS.YELLOW, size: 40, position: { x: 50, y: 50 }, rotation: 0 }],
      [{ type: 'circle', color: COLORS.GREEN, size: 45, position: { x: 50, y: 50 } }],
      [{ type: 'square', color: COLORS.PURPLE, size: 38, position: { x: 50, y: 50 } }],
      [{ type: 'triangle', color: COLORS.RED, size: 42, position: { x: 50, y: 50 }, rotation: 180 }],
    ],
    rightImages: [
      // Right side: Three shapes per box
      [
        { type: 'circle', color: COLORS.RED, size: 25, position: { x: 30, y: 50 } },
        { type: 'circle', color: COLORS.RED, size: 25, position: { x: 50, y: 50 } },
        { type: 'circle', color: COLORS.RED, size: 25, position: { x: 70, y: 50 } },
      ],
      [
        { type: 'square', color: COLORS.BLUE, size: 25, position: { x: 30, y: 50 } },
        { type: 'square', color: COLORS.BLUE, size: 25, position: { x: 50, y: 50 } },
        { type: 'square', color: COLORS.BLUE, size: 25, position: { x: 70, y: 50 } },
      ],
      [
        { type: 'triangle', color: COLORS.YELLOW, size: 25, position: { x: 30, y: 50 }, rotation: 0 },
        { type: 'triangle', color: COLORS.YELLOW, size: 25, position: { x: 50, y: 50 }, rotation: 0 },
        { type: 'triangle', color: COLORS.YELLOW, size: 25, position: { x: 70, y: 50 }, rotation: 0 },
      ],
      [
        { type: 'circle', color: COLORS.GREEN, size: 25, position: { x: 30, y: 50 } },
        { type: 'circle', color: COLORS.GREEN, size: 25, position: { x: 50, y: 50 } },
        { type: 'circle', color: COLORS.GREEN, size: 25, position: { x: 70, y: 50 } },
      ],
      [
        { type: 'square', color: COLORS.PURPLE, size: 25, position: { x: 30, y: 50 } },
        { type: 'square', color: COLORS.PURPLE, size: 25, position: { x: 50, y: 50 } },
        { type: 'square', color: COLORS.PURPLE, size: 25, position: { x: 70, y: 50 } },
      ],
      [
        { type: 'circle', color: COLORS.RED, size: 25, position: { x: 30, y: 50 } },
        { type: 'circle', color: COLORS.RED, size: 25, position: { x: 50, y: 50 } },
        { type: 'circle', color: COLORS.RED, size: 25, position: { x: 70, y: 50 } },
      ],
    ],
    correctRule: 'Left has one shape, Right has many shapes',
    answerChoices: [
      'Left has one shape, Right has many shapes',
      'Left is large, Right is small',
      'Left has circles, Right has squares',
      'Left is at the top, Right is at the bottom',
    ],
    hint: 'Count the number of shapes in each box!',
  },

  // LEVEL 5: Position (Hard) - Top vs Bottom
  {
    id: 5,
    name: 'POSITION CHECK',
    difficulty: 'hard',
    leftImages: [
      // Left side: Shapes at top
      [{ type: 'circle', color: COLORS.RED, size: 35, position: { x: 50, y: 25 } }],
      [{ type: 'square', color: COLORS.BLUE, size: 35, position: { x: 50, y: 30 } }],
      [{ type: 'triangle', color: COLORS.YELLOW, size: 35, position: { x: 50, y: 28 }, rotation: 0 }],
      [{ type: 'circle', color: COLORS.GREEN, size: 38, position: { x: 50, y: 26 } }],
      [{ type: 'square', color: COLORS.PURPLE, size: 36, position: { x: 50, y: 27 } }],
      [{ type: 'triangle', color: COLORS.RED, size: 37, position: { x: 50, y: 29 }, rotation: 180 }],
    ],
    rightImages: [
      // Right side: Shapes at bottom
      [{ type: 'circle', color: COLORS.RED, size: 35, position: { x: 50, y: 75 } }],
      [{ type: 'square', color: COLORS.BLUE, size: 35, position: { x: 50, y: 70 } }],
      [{ type: 'triangle', color: COLORS.YELLOW, size: 35, position: { x: 50, y: 72 }, rotation: 0 }],
      [{ type: 'circle', color: COLORS.GREEN, size: 38, position: { x: 50, y: 74 } }],
      [{ type: 'square', color: COLORS.PURPLE, size: 36, position: { x: 50, y: 73 } }],
      [{ type: 'triangle', color: COLORS.RED, size: 37, position: { x: 50, y: 71 }, rotation: 180 }],
    ],
    correctRule: 'Left shapes are at the top, Right shapes are at the bottom',
    answerChoices: [
      'Left shapes are at the top, Right shapes are at the bottom',
      'Left has circles, Right has triangles',
      'Left is large, Right is small',
      'Left has one shape, Right has many shapes',
    ],
    hint: 'Where are the shapes positioned in each box?',
  },

  // LEVEL 6: Symmetry (Hard) - Symmetric vs Asymmetric
  {
    id: 6,
    name: 'SYMMETRY PUZZLE',
    difficulty: 'hard',
    leftImages: [
      // Left side: Symmetric arrangements
      [
        { type: 'circle', color: COLORS.RED, size: 30, position: { x: 30, y: 50 } },
        { type: 'circle', color: COLORS.RED, size: 30, position: { x: 70, y: 50 } },
      ],
      [
        { type: 'square', color: COLORS.BLUE, size: 30, position: { x: 50, y: 30 } },
        { type: 'square', color: COLORS.BLUE, size: 30, position: { x: 50, y: 70 } },
      ],
      [
        { type: 'triangle', color: COLORS.YELLOW, size: 30, position: { x: 35, y: 50 }, rotation: 90 },
        { type: 'triangle', color: COLORS.YELLOW, size: 30, position: { x: 65, y: 50 }, rotation: 270 },
      ],
      [
        { type: 'circle', color: COLORS.GREEN, size: 28, position: { x: 50, y: 35 } },
        { type: 'circle', color: COLORS.GREEN, size: 28, position: { x: 50, y: 65 } },
      ],
      [
        { type: 'square', color: COLORS.PURPLE, size: 28, position: { x: 32, y: 50 } },
        { type: 'square', color: COLORS.PURPLE, size: 28, position: { x: 68, y: 50 } },
      ],
      [
        { type: 'triangle', color: COLORS.RED, size: 30, position: { x: 50, y: 32 }, rotation: 0 },
        { type: 'triangle', color: COLORS.RED, size: 30, position: { x: 50, y: 68 }, rotation: 180 },
      ],
    ],
    rightImages: [
      // Right side: Asymmetric arrangements
      [
        { type: 'circle', color: COLORS.RED, size: 30, position: { x: 35, y: 40 } },
        { type: 'circle', color: COLORS.RED, size: 25, position: { x: 65, y: 60 } },
      ],
      [
        { type: 'square', color: COLORS.BLUE, size: 32, position: { x: 40, y: 35 } },
        { type: 'square', color: COLORS.BLUE, size: 28, position: { x: 60, y: 70 } },
      ],
      [
        { type: 'triangle', color: COLORS.YELLOW, size: 30, position: { x: 30, y: 45 }, rotation: 45 },
        { type: 'triangle', color: COLORS.YELLOW, size: 26, position: { x: 70, y: 60 }, rotation: 135 },
      ],
      [
        { type: 'circle', color: COLORS.GREEN, size: 28, position: { x: 38, y: 38 } },
        { type: 'circle', color: COLORS.GREEN, size: 32, position: { x: 62, y: 65 } },
      ],
      [
        { type: 'square', color: COLORS.PURPLE, size: 26, position: { x: 42, y: 42 } },
        { type: 'square', color: COLORS.PURPLE, size: 30, position: { x: 58, y: 62 } },
      ],
      [
        { type: 'triangle', color: COLORS.RED, size: 28, position: { x: 35, y: 35 }, rotation: 30 },
        { type: 'triangle', color: COLORS.RED, size: 32, position: { x: 70, y: 68 }, rotation: 200 },
      ],
    ],
    correctRule: 'Left is symmetric, Right is not symmetric',
    answerChoices: [
      'Left is symmetric, Right is not symmetric',
      'Left has two shapes, Right has many shapes',
      'Left is at the top, Right is at the bottom',
      'Left is large, Right is small',
    ],
    hint: 'Look at how the shapes are arranged - are they balanced or unbalanced?',
  },
];