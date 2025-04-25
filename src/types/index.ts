export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface UserProgress {
  moduleId: string;
  completed: boolean;
  score: number;
  lastAttemptDate: Date;
}

export interface Module {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  unlocked: boolean;
  completed: boolean;
  score: number;
  order: number;
}

export interface ModuleSection {
  titleKey: string;
  contentKey: string;
}

export interface Question {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface PuzzlePiece {
  id: string;
  term: string;
  definition: string;
}

export interface WordGame {
  id: string;
  moduleId: string;
  words: string[];
  clues: string[];
  wordsTranslationKeys?: string[];
  cluesTranslationKeys?: string[];
}

export interface SimulationStep {
  id: string;
  moduleId: string;
  scenario: string;
  options: string[];
  consequences: string[];
  correctOption: number;
  scenarioKey?: string;
  optionsKeys?: string[];
  consequencesKeys?: string[];
}