export type Era = 
  | 'Ancient / Classical' 
  | 'Pre-Modern (1500-1850)' 
  | 'Modern (1850-1950)' 
  | 'Post-War (1950-2000)' 
  | 'Contemporary (2001-Present)';

export type EmotionalTone = 
  | 'comforting' 
  | 'melancholic' 
  | 'intense' 
  | 'contemplative' 
  | 'hopeful' 
  | 'dark' 
  | 'tragic' 
  | 'romantic' 
  | 'spiritually-uplifting' 
  | 'intellectually-challenging';

export type ProseComplexity = 
  | 'accessible' 
  | 'moderate' 
  | 'dense' 
  | 'classical-demanding';

export type Pace = 'fast' | 'moderate' | 'slow-burn';

export type PhilosophicalDepth = 'light' | 'moderate' | 'profound';

export type SpiritualityType = 'secular' | 'metaphysical' | 'sacred-devotional' | 'philosophical';

export type ReadingMaturity = 
  | 'accessible-starter' 
  | 'intermediate' 
  | 'seasoned' 
  | 'advanced-literary';

export type LengthBand = 'short' | 'medium' | 'epic';

export type PopularityBand = 
  | 'canonical-classic' 
  | 'widespread-popular' 
  | 'literary-prize' 
  | 'hidden-gem' 
  | 'civilizational-monument';

export interface Author {
  id: string;
  name: string;
  nativeName?: string;
  era: string;
  country: string;
  primaryLanguage: string;
  bio: string;
  majorThemes: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  authorId: string;
  originalLanguage: string;
  availableLanguages: string[];
  countryRegion: string;
  era: Era;
  genre: string[];
  themes: string[];
  emotionalTone: EmotionalTone;
  proseComplexity: ProseComplexity;
  pace: Pace;
  philosophicalDepth: PhilosophicalDepth;
  spirituality: SpiritualityType;
  worldviewTags: string[];
  readingMaturity: ReadingMaturity;
  lengthBand: LengthBand;
  popularityBand: PopularityBand;
  itihaasa: boolean;
  publisher?: string;
  description: string;
  whyRead: string;
  coverUrl: string;
  pageCount?: number;
  publishedYear?: number;
}

export interface BookFilterCriteria {
  query?: string;
  language?: string;
  genre?: string[];
  era?: Era[];
  readingMaturity?: ReadingMaturity[];
  pace?: Pace[];
  proseComplexity?: ProseComplexity[];
  philosophicalDepth?: PhilosophicalDepth[];
  spirituality?: SpiritualityType[];
  worldview?: string[];
  lengthBand?: LengthBand[];
  itihaasaOnly?: boolean;
  sortBy?: 'relevance' | 'title' | 'author' | 'year' | 'maturity';
}
