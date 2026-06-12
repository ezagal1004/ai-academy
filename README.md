# Ninja Puzzles: AI Academy: Human vs Machine

Part of the **Code Ninjas AI Academy** curriculum. This module lets kids experience the kinds of reasoning challenges that are notoriously hard for AI, by solving them as a human first.

The theme is Alan Turing's foundational question: *can a machine think?* Each game is built around a real AI benchmark researchers still use today to measure machine intelligence. Playing them gives ninjas genuine intuition for why AI struggles with common sense, visual abstraction, and language, not just a surface-level definition.

## The Three Games

| Game | Benchmark | Core concept |
|---|---|---|
| **Code Breaker** | ARC (Abstraction & Reasoning Corpus) | Recognize a visual rule from examples and apply it to a new grid |
| **Pattern Matcher** | Bongard Problems | Find the rule that separates two groups of shapes |
| **Story Solver** | Winograd Schema | Decide what an ambiguous pronoun refers to using common sense |

Each game has 6 levels (easy → medium → hard), tutorial dialogs introducing each concept, a star-based scoring system (3 stars per level, 18 total), and a hint button.

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Next.js 15** (App Router) · **TypeScript** · **Tailwind CSS** · **Framer Motion**

## Project Structure

```
src/
  app/
    page.tsx              # Home screen
    arc/page.tsx          # Code Breaker
    bongard/page.tsx      # Pattern Matcher
    winograd/page.tsx     # Story Solver
  components/
    shared/               # WelcomeScreen, VictoryScreen, ProgressBar,
    │                     # ExitModal, HintModal, HomeButton, HintButton,
    │                     # BaseDialogLayout
    arc/                  # PuzzleGrid, DialogScreen, LevelData, CharacterScript
    bongard/              # BongardPuzzle, ImageGrid, ShapeRenderer,
    │                     # DialogScreen, LevelData, CharacterScript
    winograd/             # SentencePuzzle, DialogScreen, LevelData, CharacterScript
  hooks/
    useGameState.ts       # Shared state machine (phase, scoring, level progression)
  utils/
    colors.ts             # Shared color palettes
    shuffle.ts            # Generic Fisher-Yates shuffle
  constants/
    classNames.ts         # Shared Tailwind class strings
  types/
    level.ts              # BaseLevel, BaseLevelWithDifficulty
    tutorial.ts           # BaseTutorial
```

### Adding Levels

Each game's levels are in `src/components/<game>/LevelData.ts`. Add a new object to the `LEVELS` array following the existing interface. Tutorial dialogs that appear between level groups are in `CharacterScript.ts` in the same folder.

## Background: The Benchmarks

**ARC** (François Chollet, 2019): A set of visual puzzles designed to require human-like abstract reasoning. State-of-the-art AI models still struggle with ARC tasks that most children solve in seconds.

**Bongard Problems** (Mikhail Bongard, 1970): One hundred visual puzzles where the solver must identify an abstract rule from examples. Used for decades to study concept learning and visual analogy.

**Winograd Schemas** (Terry Winograd, 1972): Sentences with pronouns whose reference is ambiguous without common-sense knowledge. Designed specifically as a harder alternative to the Turing Test.

---

*Code Ninjas: AI, Robotics, Coding & STEM for kids ages 5–14. [codeninjas.com](https://www.codeninjas.com)*
