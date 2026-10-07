export type QuestionType = 'single-choice' | 'multi-choice' | 'scale';

export interface QuizOption {
  id: string;
  label: string;
  description?: string;
  badge?: string;
  // Associated scoring impact
  traitImpact?: {
    readingMaturity?: string;
    pace?: string;
    proseComplexity?: string;
    philosophicalDepth?: string;
    spirituality?: string;
    emotionalTones?: string[];
    genres?: string[];
    worldviews?: string[];
    readingAmbition?: string;
    languages?: string[];
  };
}

export interface QuizQuestion {
  id: string;
  category: 
    | 'language' 
    | 'experience' 
    | 'narrative' 
    | 'prose' 
    | 'emotion' 
    | 'philosophy' 
    | 'spirituality' 
    | 'worldview' 
    | 'ambition' 
    | 'history';
  title: string;
  subtitle: string;
  type: QuestionType;
  options: QuizOption[];
  minSelections?: number;
  maxSelections?: number;
  allowSkip?: boolean;
}

export interface QuizResponseMap {
  [questionId: string]: string[]; // array of option IDs
}

export interface QuizSessionState {
  currentQuestionIndex: number;
  answers: QuizResponseMap;
  isCompleted: boolean;
  startedAt: string;
  completedAt?: string;
  version: string;
}
