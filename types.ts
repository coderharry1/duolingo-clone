// Fix: Define the types used throughout the application.
export interface Language {
  name: string;
  code: string;
  flag: string;
}

export interface VocabularyItem {
  word: string;
  translation: string;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Lesson {
  vocabulary: VocabularyItem[];
  questions: Question[];
}

export type FeedbackState = 'none' | 'correct' | 'incorrect';

export type AppState = 'selecting_language' | 'generating_lesson' | 'in_lesson' | 'lesson_complete';
