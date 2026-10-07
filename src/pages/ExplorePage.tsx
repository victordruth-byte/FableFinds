import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Compass, BookOpen, RotateCcw, X, Filter } from 'lucide-react';
import { bookService } from '../services/bookService';
import { BookFilterCriteria } from '../types/book';
import { FilterSidebar } from '../components/FilterSidebar';
import { BookCard } from '../components/BookCard';
import { EmptyState } from '../components/EmptyState';

export const ExplorePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialItihaasa = searchParams.get('itihaasa') === 'true';

  const [filters, setFilters] = useState<BookFilterCriteria>({
    query: searchParams.get('q') || '',
    language: searchParams.get('lang') || undefined,
    itihaasaOnly: initialItihaasa,
    sortBy: 'relevance'
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Compute filtered books
  const filteredBooks = useMemo(() => {
    return bookService.filterBooks(filters);
  }, [filters]);

  const removeLanguageFilter = () => setFilters({ ...filters, language: undefined });
  const removeQueryFilter = () => setFilters({ ...filters, query: undefined });
  const removeItihaasaFilter = () => setFilters({ ...filters, itihaasaOnly: false });
  const removeGenreFilter = (genre: string) => {
    const updated = filters.genre?.filter(g => g !== genre);
    setFilters({ ...filters, genre: updated?.length ? updated : undefined });
  };
  const removeEraFilter = (era: string) => {
    const updated = filters.era?.filter(e => e !== era);
    setFilters({ ...filters, era: updated?.length ? updated : undefined });
  };
  const removeMaturityFilter = (mat: string) => {
    const updated = filters.readingMaturity?.filter(m => m !== mat);
    setFilters({ ...filters, readingMaturity: updated?.length ? updated : undefined });
  };

  const hasActiveFilters = Boolean(
    filters.query ||
    filters.language ||
    filters.itihaasaOnly ||
    (filters.genre && filters.genre.length > 0) ||
    (filters.era && filters.era.length > 0) ||
    (filters.readingMaturity && filters.readingMaturity.length > 0)
  );

  return (
    <div className="container animate-fade-in" style={{ padding: '3.5rem 1.5rem 6rem 1.5rem' }}>
      {/* Page Title & Overview */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <Compass size={18} color="var(--gold-accent)" />
          <span style={{
            fontFamily: 'var(--font-sans-ui)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontSize: '0.8rem',
            color: 'var(--gold-accent)',
            fontWeight: 600
          }}>
            Curated Repository
          </span>
        </div>

        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.6rem' }}>
          Explore the Literary Catalog
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'var(--ink-secondary)', maxWidth: '720px' }}>
          Search across canonical classics, Indic civilizational texts, translated regional masterpieces, and accessible modern works with precision filters.
        </p>
      </div>

      {/* Mobile Filter Button */}
      <div style={{ marginBottom: '1.5rem' }} className="mobile-filter-bar">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="btn btn-secondary"
          style={{ width: '100%', justifyContent: 'space-between' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} />
            {mobileFilterOpen ? 'Hide Filters' : 'Show Filters & Search'}
          </span>
          <span className="badge badge-parchment">{filteredBooks.length} Books</span>
        </button>
      </div>

      {/* Active Filter Pills Bar */}
      {hasActiveFilters && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.75rem',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)'
        }}>
          <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-sans-ui)', color: 'var(--ink-muted)', fontWeight: 600 }}>
            Active Filters:
          </span>

          {filters.query && (
            <span className="badge badge-parchment" style={{ gap: '0.4rem' }}>
              Search: "{filters.query}"
              <button onClick={removeQueryFilter}><X size={12} /></button>
            </span>
          )}

          {filters.language && (
            <span className="badge badge-parchment" style={{ gap: '0.4rem' }}>
              Language: {filters.language}
              <button onClick={removeLanguageFilter}><X size={12} /></button>
            </span>
          )}

          {filters.itihaasaOnly && (
            <span className="badge badge-itihaasa" style={{ gap: '0.4rem' }}>
              Itihaasa Only
              <button onClick={removeItihaasaFilter}><X size={12} /></button>
            </span>
          )}

          {filters.genre?.map(g => (
            <span key={g} className="badge badge-maroon" style={{ gap: '0.4rem' }}>
              Genre: {g}
              <button onClick={() => removeGenreFilter(g)}><X size={12} /></button>
            </span>
          ))}

          {filters.era?.map(e => (
            <span key={e} className="badge badge-gold" style={{ gap: '0.4rem' }}>
              Era: {e}
              <button onClick={() => removeEraFilter(e)}><X size={12} /></button>
            </span>
          ))}

          {filters.readingMaturity?.map(m => (
            <span key={m} className="badge badge-parchment" style={{ gap: '0.4rem' }}>
              Maturity: {m}
              <button onClick={() => removeMaturityFilter(m)}><X size={12} /></button>
            </span>
          ))}

          <button
            onClick={() => setFilters({ sortBy: 'relevance' })}
            style={{
              fontSize: '0.78rem',
              fontFamily: 'var(--font-sans-ui)',
              color: 'var(--maroon-accent)',
              marginLeft: 'auto',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar + Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '290px 1fr',
        gap: '2.5rem',
        alignItems: 'start'
      }} className="explore-layout-grid">
        {/* Left Filter Sidebar */}
        <div className={`explore-sidebar-container ${mobileFilterOpen ? 'mobile-open' : ''}`}>
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            resultCount={filteredBooks.length}
          />
        </div>

        {/* Right Books Grid */}
        <div>
          {filteredBooks.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Books Matched Your Filters"
              description="Try clearing some filter criteria, broadening your search term, or selecting 'All Languages'."
              actionLabel="Reset All Filters"
              onActionClick={() => setFilters({ sortBy: 'relevance' })}
              icon="compass"
            />
          )}
        </div>
      </div>

      <style>{`
        .mobile-filter-bar {
          display: none;
        }
        @media (max-width: 900px) {
          .explore-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .mobile-filter-bar {
            display: block !important;
          }
          .explore-sidebar-container {
            display: none;
          }
          .explore-sidebar-container.mobile-open {
            display: block !important;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </div>
  );
};
