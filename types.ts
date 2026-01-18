
export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export interface CodingQuestion {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  topic: string;
  exampleInput: string;
  exampleOutput: string;
  solution: string;
}

export interface UserSubmission {
  questionId: string;
  date: string; // YYYY-MM-DD
  answer: string;
  feedback?: string;
}

export interface UserStats {
  streak: number;
  totalAttempted: number;
  daysMissed: number;
  lastSubmissionDate: string | null;
  history: string[]; // List of YYYY-MM-DD dates completed
}
