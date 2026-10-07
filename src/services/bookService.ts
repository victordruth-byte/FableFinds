import { Book, BookFilterCriteria } from '../types/book';
import { SEED_BOOKS } from '../data/books';

export const bookService = {
  getAllBooks(): Book[] {
    return [...SEED_BOOKS];
  },

  getBookById(id: string): Book | undefined {
    return SEED_BOOKS.find(b => b.id === id);
  },

  getItihaasaBooks(): Book[] {
    // Strictly classical Indic civilizational / scriptural works; exclude modern retellings
    return SEED_BOOKS.filter(b => b.itihaasa === true);
  },

  getRelatedBooks(bookId: string, limit = 3): Book[] {
    const target = this.getBookById(bookId);
    if (!target) return [];

    return SEED_BOOKS
      .filter(b => b.id !== bookId)
      .map(candidate => {
        let similarity = 0;
        // Same author
        if (candidate.authorId === target.authorId) similarity += 5;
        // Shared genres
        const sharedGenres = candidate.genre.filter(g => target.genre.includes(g));
        similarity += sharedGenres.length * 3;
        // Shared themes
        const sharedThemes = candidate.themes.filter(t => target.themes.includes(t));
        similarity += sharedThemes.length * 2;
        // Same era
        if (candidate.era === target.era) similarity += 2;
        // Same emotional tone
        if (candidate.emotionalTone === target.emotionalTone) similarity += 2;
        // Same philosophical depth
        if (candidate.philosophicalDepth === target.philosophicalDepth) similarity += 1;
        // Itihaasa matching
        if (candidate.itihaasa && target.itihaasa) similarity += 4;

        return { book: candidate, similarity };
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map(item => item.book);
  },

  filterBooks(criteria: BookFilterCriteria): Book[] {
    let result = [...SEED_BOOKS];

    // Itihaasa only filter
    if (criteria.itihaasaOnly) {
      result = result.filter(b => b.itihaasa === true);
    }

    // Text search (Title, author, keywords, themes, genres, description)
    if (criteria.query && criteria.query.trim()) {
      const q = criteria.query.toLowerCase().trim();
      result = result.filter(b => 
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.some(g => g.toLowerCase().includes(q)) ||
        b.themes.some(t => t.toLowerCase().includes(q)) ||
        b.originalLanguage.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
      );
    }

    // Language filter (either original or available translation)
    if (criteria.language) {
      const langLower = criteria.language.toLowerCase();
      result = result.filter(b => 
        b.originalLanguage.toLowerCase() === langLower ||
        b.availableLanguages.some(l => l.toLowerCase() === langLower)
      );
    }

    // Genre filter
    if (criteria.genre && criteria.genre.length > 0) {
      result = result.filter(b => 
        criteria.genre!.some(g => b.genre.includes(g))
      );
    }

    // Era filter
    if (criteria.era && criteria.era.length > 0) {
      result = result.filter(b => criteria.era!.includes(b.era));
    }

    // Reading maturity filter
    if (criteria.readingMaturity && criteria.readingMaturity.length > 0) {
      result = result.filter(b => criteria.readingMaturity!.includes(b.readingMaturity));
    }

    // Pace filter
    if (criteria.pace && criteria.pace.length > 0) {
      result = result.filter(b => criteria.pace!.includes(b.pace));
    }

    // Prose complexity filter
    if (criteria.proseComplexity && criteria.proseComplexity.length > 0) {
      result = result.filter(b => criteria.proseComplexity!.includes(b.proseComplexity));
    }

    // Philosophical depth filter
    if (criteria.philosophicalDepth && criteria.philosophicalDepth.length > 0) {
      result = result.filter(b => criteria.philosophicalDepth!.includes(b.philosophicalDepth));
    }

    // Spirituality filter
    if (criteria.spirituality && criteria.spirituality.length > 0) {
      result = result.filter(b => criteria.spirituality!.includes(b.spirituality));
    }

    // Length band filter
    if (criteria.lengthBand && criteria.lengthBand.length > 0) {
      result = result.filter(b => criteria.lengthBand!.includes(b.lengthBand));
    }

    // Sorting
    if (criteria.sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria.sortBy === 'author') {
      result.sort((a, b) => a.author.localeCompare(b.author));
    } else if (criteria.sortBy === 'year') {
      result.sort((a, b) => (b.publishedYear ?? 0) - (a.publishedYear ?? 0));
    } else if (criteria.sortBy === 'maturity') {
      const rankMap: Record<string, number> = {
        'accessible-starter': 1,
        'intermediate': 2,
        'seasoned': 3,
        'advanced-literary': 4
      };
      result.sort((a, b) => (rankMap[a.readingMaturity] || 0) - (rankMap[b.readingMaturity] || 0));
    }

    return result;
  },

  getAllDistinctGenres(): string[] {
    const genres = new Set<string>();
    SEED_BOOKS.forEach(b => b.genre.forEach(g => genres.add(g)));
    return Array.from(genres).sort();
  },

  getAllDistinctThemes(): string[] {
    const themes = new Set<string>();
    SEED_BOOKS.forEach(b => b.themes.forEach(t => themes.add(t)));
    return Array.from(themes).sort();
  }
};
