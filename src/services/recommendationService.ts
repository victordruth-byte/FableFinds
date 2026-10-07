import { Book, ReadingMaturity, ProseComplexity } from '../types/book';
import { ReaderProfile } from '../types/profile';
import { ScoredRecommendation, RecommendationCategory, RecommendationRunResult } from '../types/recommendation';
import { bookService } from './bookService';
import { storageService } from './storageService';

// Configurable weights for recommendation calculation
export const RECOMMENDATION_WEIGHTS = {
  LANGUAGE_MATCH: 18,
  PHILOSOPHICAL_DEPTH: 16,
  SPIRITUALITY_AFFINITY: 16,
  EMOTIONAL_TONE: 14,
  PROSE_COMPATIBILITY: 12,
  PACE_COMPATIBILITY: 10,
  READING_MATURITY: 10,
  GENRE_RESONANCE: 12,
  WORLDVIEW_ALIGNMENT: 10,
  NOVELTY_BONUS: 4,
  REJECTED_PENALTY: 999
};

const MATURITY_LEVELS: Record<ReadingMaturity, number> = {
  'accessible-starter': 1,
  'intermediate': 2,
  'seasoned': 3,
  'advanced-literary': 4
};

const PROSE_LEVELS: Record<ProseComplexity, number> = {
  'accessible': 1,
  'moderate': 2,
  'dense': 3,
  'classical-demanding': 4
};

export const recommendationService = {
  generateRecommendations(profile: ReaderProfile): RecommendationRunResult {
    const allBooks = bookService.getAllBooks();
    const rejectedIds = storageService.getRejectedBookIds();
    const savedIds = storageService.getSavedBookIds();

    const scoredList: ScoredRecommendation[] = [];

    for (const book of allBooks) {
      // If user explicitly marked book as rejected, exclude from recommendation run
      if (rejectedIds.includes(book.id)) {
        continue;
      }

      const scoreBreakdown = {
        genreFit: 0,
        themeFit: 0,
        languageFit: 0,
        narrativePaceFit: 0,
        proseFit: 0,
        emotionalFit: 0,
        philosophicalFit: 0,
        spiritualityFit: 0,
        worldviewFit: 0,
        maturityFit: 0
      };

      const rationalePieces: string[] = [];
      const resonantDimensions: string[] = [];
      let isStretch = false;

      // 1. Language fit
      const hasOriginalMatch = profile.primaryLanguages.includes(book.originalLanguage);
      const hasAvailableMatch = book.availableLanguages.some(l => profile.primaryLanguages.includes(l));

      if (hasOriginalMatch) {
        scoreBreakdown.languageFit = RECOMMENDATION_WEIGHTS.LANGUAGE_MATCH;
        resonantDimensions.push(`Written natively in ${book.originalLanguage}`);
      } else if (hasAvailableMatch) {
        scoreBreakdown.languageFit = RECOMMENDATION_WEIGHTS.LANGUAGE_MATCH * 0.85;
        resonantDimensions.push(`Available in your preferred languages`);
      } else {
        // Still accessible via English translations
        scoreBreakdown.languageFit = RECOMMENDATION_WEIGHTS.LANGUAGE_MATCH * 0.4;
      }

      // 2. Philosophical Depth Fit
      if (profile.philosophicalInclination === book.philosophicalDepth) {
        scoreBreakdown.philosophicalFit = RECOMMENDATION_WEIGHTS.PHILOSOPHICAL_DEPTH;
        rationalePieces.push(`${book.philosophicalDepth} philosophical inquiry`);
        resonantDimensions.push(`${book.philosophicalDepth.charAt(0).toUpperCase() + book.philosophicalDepth.slice(1)} Philosophical Vision`);
      } else if (
        (profile.philosophicalInclination === 'profound' && book.philosophicalDepth === 'moderate') ||
        (profile.philosophicalInclination === 'moderate' && book.philosophicalDepth === 'profound')
      ) {
        scoreBreakdown.philosophicalFit = RECOMMENDATION_WEIGHTS.PHILOSOPHICAL_DEPTH * 0.65;
      } else {
        scoreBreakdown.philosophicalFit = RECOMMENDATION_WEIGHTS.PHILOSOPHICAL_DEPTH * 0.25;
      }

      // 3. Spirituality / Itihaasa Fit
      if (book.itihaasa) {
        if (profile.spiritualOrientation === 'sacred-devotional') {
          scoreBreakdown.spiritualityFit = RECOMMENDATION_WEIGHTS.SPIRITUALITY_AFFINITY;
          rationalePieces.push('foundational Itihaasa civilizational wisdom');
          resonantDimensions.push('Authentic Itihaasa Text');
        } else if (profile.spiritualOrientation === 'philosophical' || profile.spiritualOrientation === 'metaphysical') {
          scoreBreakdown.spiritualityFit = RECOMMENDATION_WEIGHTS.SPIRITUALITY_AFFINITY * 0.8;
          rationalePieces.push('rich metaphysical and epic depth');
          resonantDimensions.push('Classical Indic Epic');
        } else {
          scoreBreakdown.spiritualityFit = RECOMMENDATION_WEIGHTS.SPIRITUALITY_AFFINITY * 0.35;
        }
      } else {
        if (book.spirituality === profile.spiritualOrientation) {
          scoreBreakdown.spiritualityFit = RECOMMENDATION_WEIGHTS.SPIRITUALITY_AFFINITY;
          resonantDimensions.push(`Aligned ${book.spirituality} orientation`);
        } else if (book.spirituality === 'secular' && profile.spiritualOrientation === 'secular') {
          scoreBreakdown.spiritualityFit = RECOMMENDATION_WEIGHTS.SPIRITUALITY_AFFINITY;
        } else {
          scoreBreakdown.spiritualityFit = RECOMMENDATION_WEIGHTS.SPIRITUALITY_AFFINITY * 0.5;
        }
      }

      // 4. Emotional Tone Fit
      if (profile.emotionalAppetite.includes(book.emotionalTone)) {
        scoreBreakdown.emotionalFit = RECOMMENDATION_WEIGHTS.EMOTIONAL_TONE;
        rationalePieces.push(`${book.emotionalTone} atmosphere`);
        resonantDimensions.push(`${book.emotionalTone.replace('-', ' ')} emotional resonance`);
      } else {
        scoreBreakdown.emotionalFit = RECOMMENDATION_WEIGHTS.EMOTIONAL_TONE * 0.4;
      }

      // 5. Prose Complexity & Maturity Fit
      const userProseLevel = PROSE_LEVELS[profile.proseTolerance] || 2;
      const bookProseLevel = PROSE_LEVELS[book.proseComplexity] || 2;
      const proseDiff = bookProseLevel - userProseLevel;

      if (proseDiff === 0) {
        scoreBreakdown.proseFit = RECOMMENDATION_WEIGHTS.PROSE_COMPATIBILITY;
        resonantDimensions.push(`${book.proseComplexity} prose style`);
      } else if (proseDiff === 1) {
        // Stretch book!
        scoreBreakdown.proseFit = RECOMMENDATION_WEIGHTS.PROSE_COMPATIBILITY * 0.75;
        isStretch = true;
      } else if (proseDiff === -1) {
        scoreBreakdown.proseFit = RECOMMENDATION_WEIGHTS.PROSE_COMPATIBILITY * 0.8;
      } else {
        scoreBreakdown.proseFit = RECOMMENDATION_WEIGHTS.PROSE_COMPATIBILITY * 0.3;
      }

      const userMatLevel = MATURITY_LEVELS[profile.readingMaturity] || 2;
      const bookMatLevel = MATURITY_LEVELS[book.readingMaturity] || 2;
      const matDiff = bookMatLevel - userMatLevel;

      if (matDiff === 0) {
        scoreBreakdown.maturityFit = RECOMMENDATION_WEIGHTS.READING_MATURITY;
      } else if (matDiff === 1) {
        scoreBreakdown.maturityFit = RECOMMENDATION_WEIGHTS.READING_MATURITY * 0.8;
        isStretch = true;
      } else if (matDiff === -1) {
        scoreBreakdown.maturityFit = RECOMMENDATION_WEIGHTS.READING_MATURITY * 0.75;
      } else {
        scoreBreakdown.maturityFit = RECOMMENDATION_WEIGHTS.READING_MATURITY * 0.35;
      }

      // 6. Narrative Pace Fit
      if (profile.pacePreference === book.pace) {
        scoreBreakdown.narrativePaceFit = RECOMMENDATION_WEIGHTS.PACE_COMPATIBILITY;
        rationalePieces.push(`${book.pace} pacing`);
      } else {
        scoreBreakdown.narrativePaceFit = RECOMMENDATION_WEIGHTS.PACE_COMPATIBILITY * 0.5;
      }

      // 7. Genre resonance
      const genreMatches = book.genre.filter(g => profile.favoriteGenres.includes(g));
      if (genreMatches.length > 0) {
        scoreBreakdown.genreFit = RECOMMENDATION_WEIGHTS.GENRE_RESONANCE;
        rationalePieces.push(genreMatches.join(', '));
      } else {
        scoreBreakdown.genreFit = RECOMMENDATION_WEIGHTS.GENRE_RESONANCE * 0.45;
      }

      // 8. Worldview alignment
      const matchingWorldviews = book.worldviewTags.filter(t => 
        profile.worldviewStance.toLowerCase().includes(t.toLowerCase())
      );
      if (matchingWorldviews.length > 0) {
        scoreBreakdown.worldviewFit = RECOMMENDATION_WEIGHTS.WORLDVIEW_ALIGNMENT;
        resonantDimensions.push(`${matchingWorldviews[0]} worldview`);
      } else {
        scoreBreakdown.worldviewFit = RECOMMENDATION_WEIGHTS.WORLDVIEW_ALIGNMENT * 0.5;
      }

      // Compute total raw score (normalized to 0-100)
      const maxPossibleScore = Object.values(RECOMMENDATION_WEIGHTS).reduce((acc, curr) => 
        curr !== RECOMMENDATION_WEIGHTS.REJECTED_PENALTY ? acc + curr : acc, 0
      );

      const totalRaw = Object.values(scoreBreakdown).reduce((a, b) => a + b, 0);
      let normalizedScore = Math.min(99, Math.round((totalRaw / maxPossibleScore) * 100));

      // Saved bonus: if user has saved this book previously, slight affinity bump
      if (savedIds.includes(book.id)) {
        normalizedScore = Math.min(100, normalizedScore + 3);
      }

      // Compose transparent rationale
      let rationaleText = '';
      if (rationalePieces.length >= 2) {
        rationaleText = `Recommended because you appreciate ${rationalePieces.slice(0, 3).join(', ')}.`;
      } else if (book.itihaasa) {
        rationaleText = `Selected for its civilizational stature and alignment with your ethical inquiry.`;
      } else {
        rationaleText = `Selected because its ${book.emotionalTone} tone and ${book.proseComplexity} prose closely reflect your literary profile.`;
      }

      // Determine Category
      let category: RecommendationCategory = 'You May Also Like';
      if (isStretch) {
        category = 'Stretch Your Reading';
        rationaleText = `A rewarding stretch: pushes your reading horizon with ${book.proseComplexity} prose and ${book.lengthBand} scope while honoring your core themes.`;
      } else if (book.popularityBand === 'hidden-gem' || (book.originalLanguage !== 'English' && normalizedScore >= 70)) {
        category = 'Hidden Gem / Discover';
      } else if (normalizedScore >= 78) {
        category = 'Best Match';
      } else {
        category = 'You May Also Like';
      }

      scoredList.push({
        book,
        score: normalizedScore,
        category,
        rationale: rationaleText,
        resonantDimensions: resonantDimensions.slice(0, 3),
        isStretch,
        scoreBreakdown
      });
    }

    // Sort by score descending
    scoredList.sort((a, b) => b.score - a.score);

    // Limit author repetition (max 2 per author in top list)
    const authorCounts: Record<string, number> = {};
    const filteredList: ScoredRecommendation[] = [];

    for (const item of scoredList) {
      const aId = item.book.authorId;
      authorCounts[aId] = (authorCounts[aId] || 0) + 1;
      if (authorCounts[aId] <= 2) {
        filteredList.push(item);
      }
    }

    // Segregate into buckets
    const bestMatches = filteredList.filter(r => r.category === 'Best Match').slice(0, 4);
    const adjacentMatches = filteredList.filter(r => r.category === 'You May Also Like').slice(0, 4);
    const stretchMatches = filteredList.filter(r => r.category === 'Stretch Your Reading').slice(0, 3);
    const hiddenGems = filteredList.filter(r => r.category === 'Hidden Gem / Discover').slice(0, 3);

    // If bestMatches is too sparse, promote top adjacent
    if (bestMatches.length < 2 && adjacentMatches.length > 0) {
      const promoted = adjacentMatches.shift();
      if (promoted) {
        promoted.category = 'Best Match';
        bestMatches.push(promoted);
      }
    }

    const topList = [...bestMatches, ...adjacentMatches, ...stretchMatches, ...hiddenGems].slice(0, 12);

    return {
      generatedAt: new Date().toISOString(),
      recommendations: topList,
      topCategories: {
        bestMatches,
        adjacentMatches,
        stretchMatches,
        hiddenGems
      }
    };
  }
};
