// Character dialog for tutorial screens

export interface TutorialDialog {
  patternName: string;
  examples: {
    input: number[][];
    output: number[][];
  }[];
}

export const TUTORIAL_SCRIPTS: TutorialDialog[] = [
  {
    patternName: 'MIRROR CODE',
    examples: [
      {
        input: [
          [1, 2, 0],
          [0, 3, 0],
          [0, 0, 0],
        ],
        output: [
          [0, 2, 1],
          [0, 3, 0],
          [0, 0, 0],
        ],
      },
      {
        input: [
          [1, 0, 4],
          [0, 2, 0],
          [3, 0, 0],
        ],
        output: [
          [4, 0, 1],
          [0, 2, 0],
          [0, 0, 3],
        ],
      },
    ],
  },
  {
    patternName: 'ROTATION CIPHER',
    examples: [
      {
        input: [
          [1, 1, 0],
          [1, 0, 0],
          [0, 0, 0],
        ],
        output: [
          [0, 1, 1],
          [0, 0, 1],
          [0, 0, 0],
        ],
      },
      {
        input: [
          [2, 0, 0],
          [2, 3, 0],
          [0, 0, 0],
        ],
        output: [
          [0, 2, 2],
          [0, 3, 0],
          [0, 0, 0],
        ],
      },
    ],
  },
  {
    patternName: 'TRANSFORMATION',
    examples: [
      {
        input: [
          [1, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 2, 2],
          [0, 0, 2, 2],
        ],
        output: [
          [2, 2, 0, 0],
          [2, 2, 0, 0],
          [0, 0, 1, 1],
          [0, 0, 1, 1],
        ],
      },
      {
        input: [
          [1, 0, 0, 2],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 0, 0, 1],
        ],
        output: [
          [2, 0, 0, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [1, 0, 0, 2],
        ],
      },
    ],
  },
];