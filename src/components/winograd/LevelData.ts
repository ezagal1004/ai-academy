// Level data structure for Winograd Schema puzzles (Story Solver)

export interface WinogradLevel {
  id: number;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  sentence: string;              // The sentence with ambiguous pronoun
  pronoun: string;               // The pronoun to identify (e.g., "it", "they")
  correctAnswer: string;         // What the pronoun refers to
  answerChoices: string[];       // Multiple choice options (2-3 choices)
  hint: string;                  // Hint for the player
}

export const LEVELS: WinogradLevel[] = [
  // LEVEL 1: Easy - Cat chasing
  {
    id: 1,
    name: 'SENTENCE ONE',
    difficulty: 'easy',
    sentence: 'The cat chased the mouse until it got tired.',
    pronoun: 'it',
    correctAnswer: 'the cat',
    answerChoices: [
      'the cat',
      'the mouse',
    ],
    hint: 'Who was doing the chasing and would get tired from running?',
  },

  // LEVEL 2: Easy - Trophy and suitcase
  {
    id: 2,
    name: 'SENTENCE TWO',
    difficulty: 'easy',
    sentence: 'The trophy does not fit in the brown suitcase because it is too large.',
    pronoun: 'it',
    correctAnswer: 'the trophy',
    answerChoices: [
      'the trophy',
      'the brown suitcase',
    ],
    hint: 'What is too large to fit inside?',
  },

  // LEVEL 3: Medium - Garden and flowers
  {
    id: 3,
    name: 'SENTENCE THREE',
    difficulty: 'medium',
    sentence: 'The gardeners planted the flowers in the spring because they bloom beautifully.',
    pronoun: 'they',
    correctAnswer: 'the flowers',
    answerChoices: [
      'the gardeners',
      'the flowers',
    ],
    hint: 'What blooms beautifully in spring?',
  },

  // LEVEL 4: Medium - Baker and cookies
  {
    id: 4,
    name: 'SENTENCE FOUR',
    difficulty: 'medium',
    sentence: 'The baker decorated the cookies with icing because they looked plain.',
    pronoun: 'they',
    correctAnswer: 'the cookies',
    answerChoices: [
      'the baker',
      'the cookies',
    ],
    hint: 'What looked plain and needed decoration?',
  },

  // LEVEL 5: Hard - Piano and room
  {
    id: 5,
    name: 'SENTENCE FIVE',
    difficulty: 'hard',
    sentence: 'The piano does not fit in the music room because it is too small.',
    pronoun: 'it',
    correctAnswer: 'the music room',
    answerChoices: [
      'the piano',
      'the music room',
    ],
    hint: 'This time, what is too small? Think carefully!',
  },

  // LEVEL 6: Hard - Library books
  {
    id: 6,
    name: 'SENTENCE SIX',
    difficulty: 'hard',
    sentence: 'The librarians organized the books by genre because they were scattered everywhere.',
    pronoun: 'they',
    correctAnswer: 'the books',
    answerChoices: [
      'the librarians',
      'the books',
    ],
    hint: 'What was scattered everywhere and needed organizing?',
  },
];