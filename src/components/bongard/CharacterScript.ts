// Character dialog for tutorial screens (Pattern Matcher)

import { Shape } from './LevelData';

export interface TutorialDialog {
  patternName: string;
  explanation: string;
  exampleLeft: Shape[][]; // 2 example boxes for LEFT (YES)
  exampleRight: Shape[][]; // 2 example boxes for RIGHT (NO)
}

// Color palette - same as level data
const COLORS = {
  RED: '#ef3e40',
  BLUE: '#4673b9',
  YELLOW: '#eabb5c',
  GREEN: '#a7c839',
  PURPLE: '#893f98',
};

export const TUTORIAL_SCRIPTS: TutorialDialog[] = [
  // Tutorial 1: Introduction to Bongard Problems (before Level 1)
  {
    patternName: 'WELCOME, NINJA!',
    explanation: 'Your mission: Find the rule that makes these two groups different. On the LEFT are examples that follow the rule. On the RIGHT are examples that DON\'T follow the rule. Ready?',
    exampleLeft: [
      // Example 1: Circle
      [{ type: 'circle', color: COLORS.RED, size: 45, position: { x: 50, y: 50 } }],
      // Example 2: Circle
      [{ type: 'circle', color: COLORS.BLUE, size: 45, position: { x: 50, y: 50 } }],
    ],
    exampleRight: [
      // Example 1: Square
      [{ type: 'square', color: COLORS.RED, size: 45, position: { x: 50, y: 50 } }],
      // Example 2: Square
      [{ type: 'square', color: COLORS.BLUE, size: 45, position: { x: 50, y: 50 } }],
    ],
  },

  // Tutorial 2: Size and Position (before Level 3)
  {
    patternName: 'NEW CHALLENGE UNLOCKED!',
    explanation: 'Now you\'ll need to look beyond just shapes and colors. Pay attention to SIZE and how shapes are POSITIONED. The patterns are getting trickier!',
    exampleLeft: [
      // Example 1: Large circle
      [{ type: 'circle', color: COLORS.YELLOW, size: 58, position: { x: 50, y: 50 } }],
      // Example 2: Large square
      [{ type: 'square', color: COLORS.GREEN, size: 58, position: { x: 50, y: 50 } }],
    ],
    exampleRight: [
      // Example 1: Small circle
      [{ type: 'circle', color: COLORS.YELLOW, size: 26, position: { x: 50, y: 50 } }],
      // Example 2: Small square
      [{ type: 'square', color: COLORS.GREEN, size: 26, position: { x: 50, y: 50 } }],
    ],
  },

  // Tutorial 3: Advanced Patterns (before Level 5)
  {
    patternName: 'EXPERT MODE ACTIVATED!',
    explanation: 'These final challenges require sharp observation skills! Look for patterns in ARRANGEMENT, POSITION, and SYMMETRY. You\'ve got this, detective!',
    exampleLeft: [
      // Example 1: Two shapes (symmetric)
      [
        { type: 'circle', color: COLORS.PURPLE, size: 32, position: { x: 30, y: 50 } },
        { type: 'circle', color: COLORS.PURPLE, size: 32, position: { x: 70, y: 50 } },
      ],
      // Example 2: Two shapes (symmetric)
      [
        { type: 'square', color: COLORS.RED, size: 32, position: { x: 50, y: 30 } },
        { type: 'square', color: COLORS.RED, size: 32, position: { x: 50, y: 70 } },
      ],
    ],
    exampleRight: [
      // Example 1: Two shapes (asymmetric)
      [
        { type: 'circle', color: COLORS.PURPLE, size: 28, position: { x: 35, y: 40 } },
        { type: 'circle', color: COLORS.PURPLE, size: 35, position: { x: 68, y: 65 } },
      ],
      // Example 2: Two shapes (asymmetric)
      [
        { type: 'square', color: COLORS.RED, size: 30, position: { x: 38, y: 35 } },
        { type: 'square', color: COLORS.RED, size: 33, position: { x: 65, y: 68 } },
      ],
    ],
  },
];