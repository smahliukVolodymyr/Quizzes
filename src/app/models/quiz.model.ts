import { Question } from './question.model';

export interface Quiz {
  category: string;
  questions: Question[];
}

export interface QuizResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number;
}
