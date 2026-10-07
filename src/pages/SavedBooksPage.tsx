import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Compass, Sparkles, BookOpen } from 'lucide-react';
import { bookService } from '../services/bookService';
import { storageService } from '../services/storageService';
import { Book } from '../types/book';
import { BookCard } from '../components/BookCard';
import { EmptyState } from '../components/EmptyState';

export const SavedBooksPage: React.FC = () => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);

  const loadSavedBooks = () => {
    const savedIds = storageService.getSavedBookIds();
    const allBooks = bookService.getAllBooks();
    const filtered = allBooks.filter(b => savedIds.includes(b.id));
    setSavedBooks(filtered);
  };

  useEffect(() => {
    loadSavedBooks();
    window.addEventListener('fablefinds:saved_changed', loadSavedBooks);
    return () => {
      window.removeEventListener('fablefinds:saved_changed', loadSavedBooks);
    };
  }, []);

  return (
    <div className="container animate-fade-in" style={{ padding: '3.5rem 1.5rem 6rem 1.5rem' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <Bookmark size={18} color="var(--gold-accent)" />
          <span style={{
            fontFamily: 'var(--font-sans-ui)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontSize: '0.8rem',
            color: 'var(--gold-accent)',
            fontWeight: 600
          }}>
            Personal Reading Shelf
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
          <h1 style={{ fontSize: '2.4rem', margin: 0 }}>
            Saved Books & Future Reads
          </h1>
          <span className="badge badge-gold" style={{ fontSize: '0.85rem' }}>
            {savedBooks.length} Books Stored Locally
          </span>
        </div>

        <p style={{ fontSize: '1.05rem', color: 'var(--ink-secondary)', marginTop: '0.5rem', maxWidth: '680px' }}>
          Your personal library of book discoveries, saved client-side for quiet contemplation.
        </p>
      </div>

      {/* Book Grid or Empty State */}
      {savedBooks.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.75rem'
        }}>
          {savedBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onStateChange={loadSavedBooks}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Your Reading Shelf is Currently Empty"
          description="As you explore the catalog or receive personalized recommendations, bookmark titles that captivate you to save them here for later."
          actionLabel="Explore Catalog"
          actionLink="/explore"
          icon="bookmark"
        />
      )}
    </div>
  );
};
