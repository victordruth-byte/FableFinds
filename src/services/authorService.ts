import { Author } from '../types/book';
import { SEED_AUTHORS } from '../data/authors';

export const authorService = {
  getAuthors(): Author[] {
    return [...SEED_AUTHORS];
  },

  getAuthorById(id: string): Author | undefined {
    return SEED_AUTHORS.find(a => a.id === id);
  },

  searchAuthors(query: string): Author[] {
    if (!query.trim()) return [...SEED_AUTHORS];
    const q = query.toLowerCase().trim();
    return SEED_AUTHORS.filter(a => 
      a.name.toLowerCase().includes(q) ||
      (a.nativeName && a.nativeName.toLowerCase().includes(q)) ||
      a.primaryLanguage.toLowerCase().includes(q) ||
      a.majorThemes.some(t => t.toLowerCase().includes(q))
    );
  }
};
