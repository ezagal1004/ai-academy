// Character dialog for tutorial screens (Story Solver)

export interface TutorialDialog {
  patternName: string;
  explanation: string;
  exampleSentence: string;       // Example sentence with pronoun
  examplePronoun: string;        // The pronoun to highlight
  exampleAnswer: string;         // What the pronoun refers to
  exampleWhy: string;            // Why this is the correct answer
}

export const TUTORIAL_SCRIPTS: TutorialDialog[] = [
  // Tutorial 1: Introduction (before Level 1)
  {
    patternName: 'WELCOME, NINJA!',
    explanation: 'Your mission: Figure out what words like "IT" or "THEY" mean in sentences. Read carefully and choose the right answer!',
    exampleSentence: 'The dog chased the ball until it rolled into the bushes.',
    examplePronoun: 'it',
    exampleAnswer: 'the ball',
    exampleWhy: 'The ball is what rolled into the bushes, not the dog!',
  },

  // Tutorial 2: Context clues (before Level 3)
  {
    patternName: 'NEW CHALLENGE UNLOCKED!',
    explanation: 'Now you need to think harder! Read the whole sentence and figure out what makes sense. Ready?',
    exampleSentence: 'The teachers praised the students because they worked so hard.',
    examplePronoun: 'they',
    exampleAnswer: 'the students',
    exampleWhy: 'The students are the ones who worked hard and got praised!',
  },

  // Tutorial 3: Advanced reasoning (before Level 5)
  {
    patternName: 'EXPERT MODE ACTIVATED!',
    explanation: 'These final challenges are tricky! Both answers might seem right. Think carefully about what the sentence means!',
    exampleSentence: 'The vase does not fit on the table because it is too narrow.',
    examplePronoun: 'it',
    exampleAnswer: 'the table',
    exampleWhy: 'The table is too narrow to hold the vase. If the vase was too narrow, it would fit easily!',
  },
];