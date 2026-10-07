import { ProseComplexity, ReadingMaturity, EmotionalTone } from './book';

export interface DimensionScore {
  name: string;
  value: number; // 0 - 100
  label: string;
  description: string;
}

export interface ReaderProfile {
  id: string;
  title: string;
  archetype: string;
  narrativeSummary: string;
  readingMaturity: ReadingMaturity;
  proseTolerance: ProseComplexity;
  pacePreference: string;
  primaryLanguages: string[];
  favoriteGenres: string[];
  emotionalAppetite: EmotionalTone[];
  philosophicalInclination: string;
  spiritualOrientation: string;
  worldviewStance: string;
  readingAmbition: string;
  dimensions: DimensionScore[];
  starterPathDescription: string;
  stretchPathDescription: string;
  createdAt: string;
}
