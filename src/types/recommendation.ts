import { Book } from './book';

export type RecommendationCategory = 
  | 'Best Match' 
  | 'You May Also Like' 
  | 'Stretch Your Reading' 
  | 'Hidden Gem / Discover';

export interface ScoredRecommendation {
  book: Book;
  score: number;
  category: RecommendationCategory;
  rationale: string;
  resonantDimensions: string[];
  isStretch: boolean;
  scoreBreakdown: {
    genreFit: number;
    themeFit: number;
    languageFit: number;
    narrativePaceFit: number;
    proseFit: number;
    emotionalFit: number;
    philosophicalFit: number;
    spiritualityFit: number;
    worldviewFit: number;
    maturityFit: number;
  };
}

export interface RecommendationRunResult {
  generatedAt: string;
  recommendations: ScoredRecommendation[];
  topCategories: {
    bestMatches: ScoredRecommendation[];
    adjacentMatches: ScoredRecommendation[];
    stretchMatches: ScoredRecommendation[];
    hiddenGems: ScoredRecommendation[];
  };
}
