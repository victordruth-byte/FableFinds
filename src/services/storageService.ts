import { QuizSessionState, QuizResponseMap } from '../types/quiz';
import { ReaderProfile } from '../types/profile';

const STORAGE_KEYS = {
  QUIZ_STATE: 'fablefinds_quiz_state_v1',
  READER_PROFILE: 'fablefinds_reader_profile_v1',
  SAVED_BOOK_IDS: 'fablefinds_saved_books_v1',
  REJECTED_BOOK_IDS: 'fablefinds_rejected_books_v1',
  SEARCH_HISTORY: 'fablefinds_search_history_v1'
};

export const storageService = {
  // --- Quiz Session ---
  getQuizState(): QuizSessionState | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_STATE);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('Failed to read quiz state from localStorage', e);
      return null;
    }
  },

  saveQuizState(state: QuizSessionState): void {
    try {
      localStorage.setItem(STORAGE_KEYS.QUIZ_STATE, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save quiz state to localStorage', e);
    }
  },

  clearQuizState(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.QUIZ_STATE);
    } catch (e) {
      console.warn('Failed to clear quiz state', e);
    }
  },

  // --- Reader Profile ---
  getReaderProfile(): ReaderProfile | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.READER_PROFILE);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('Failed to read reader profile from localStorage', e);
      return null;
    }
  },

  saveReaderProfile(profile: ReaderProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.READER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save reader profile to localStorage', e);
    }
  },

  clearReaderProfile(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.READER_PROFILE);
    } catch (e) {
      console.warn('Failed to clear reader profile', e);
    }
  },

  // --- Saved Books ---
  getSavedBookIds(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SAVED_BOOK_IDS);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  saveBookId(bookId: string): string[] {
    const current = this.getSavedBookIds();
    if (!current.includes(bookId)) {
      const updated = [...current, bookId];
      try {
        localStorage.setItem(STORAGE_KEYS.SAVED_BOOK_IDS, JSON.stringify(updated));
      } catch (e) {}
      // If book was previously rejected, unreject it
      this.unrejectBookId(bookId);
      return updated;
    }
    return current;
  },

  removeSavedBookId(bookId: string): string[] {
    const current = this.getSavedBookIds();
    const updated = current.filter(id => id !== bookId);
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_BOOK_IDS, JSON.stringify(updated));
    } catch (e) {}
    return updated;
  },

  isBookSaved(bookId: string): boolean {
    return this.getSavedBookIds().includes(bookId);
  },

  // --- Rejected Books (Not for me) ---
  getRejectedBookIds(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.REJECTED_BOOK_IDS);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  rejectBookId(bookId: string): string[] {
    const current = this.getRejectedBookIds();
    if (!current.includes(bookId)) {
      const updated = [...current, bookId];
      try {
        localStorage.setItem(STORAGE_KEYS.REJECTED_BOOK_IDS, JSON.stringify(updated));
      } catch (e) {}
      // If book was saved, remove from saved
      this.removeSavedBookId(bookId);
      return updated;
    }
    return current;
  },

  unrejectBookId(bookId: string): string[] {
    const current = this.getRejectedBookIds();
    const updated = current.filter(id => id !== bookId);
    try {
      localStorage.setItem(STORAGE_KEYS.REJECTED_BOOK_IDS, JSON.stringify(updated));
    } catch (e) {}
    return updated;
  },

  isBookRejected(bookId: string): boolean {
    return this.getRejectedBookIds().includes(bookId);
  },

  // Reset entire state (Start Over)
  resetAllState(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.QUIZ_STATE);
      localStorage.removeItem(STORAGE_KEYS.READER_PROFILE);
      localStorage.removeItem(STORAGE_KEYS.SAVED_BOOK_IDS);
      localStorage.removeItem(STORAGE_KEYS.REJECTED_BOOK_IDS);
      localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
    } catch (e) {
      console.warn('Failed to reset all local storage state', e);
    }
  }
};
