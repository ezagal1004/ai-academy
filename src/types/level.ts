export interface BaseLevel {
  id: number;
  name: string;
  hint: string;
}

export interface BaseLevelWithDifficulty extends BaseLevel {
  difficulty: 'easy' | 'medium' | 'hard';
}
