import React from 'react';
import { Search, X, RotateCcw, Filter, Check, Scroll } from 'lucide-react';
import { BookFilterCriteria, Era, ReadingMaturity, Pace, ProseComplexity, PhilosophicalDepth, SpiritualityType } from '../types/book';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { bookService } from '../services/bookService';

interface FilterSidebarProps {
  filters: BookFilterCriteria;
  onFilterChange: (newFilters: BookFilterCriteria) => void;
  resultCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  resultCount
}) => {
  const allGenres = bookService.getAllDistinctGenres();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, query: e.target.value });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, language: e.target.value || undefined });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, sortBy: e.target.value as any });
  };

  const toggleGenre = (genre: string) => {
    const current = filters.genre || [];
    const updated = current.includes(genre)
      ? current.filter(g => g !== genre)
      : [...current, genre];
    onFilterChange({ ...filters, genre: updated.length ? updated : undefined });
  };

  const toggleEra = (era: Era) => {
    const current = filters.era || [];
    const updated = current.includes(era)
      ? current.filter(e => e !== era)
      : [...current, era];
    onFilterChange({ ...filters, era: updated.length ? updated : undefined });
  };

  const toggleMaturity = (mat: ReadingMaturity) => {
    const current = filters.readingMaturity || [];
    const updated = current.includes(mat)
      ? current.filter(m => m !== mat)
      : [...current, mat];
    onFilterChange({ ...filters, readingMaturity: updated.length ? updated : undefined });
  };

  const toggleItihaasa = () => {
    onFilterChange({ ...filters, itihaasaOnly: !filters.itihaasaOnly });
  };

  const clearAllFilters = () => {
    onFilterChange({
      query: '',
      language: undefined,
      genre: undefined,
      era: undefined,
      readingMaturity: undefined,
      pace: undefined,
      proseComplexity: undefined,
      philosophicalDepth: undefined,
      spirituality: undefined,
      itihaasaOnly: undefined,
      sortBy: 'relevance'
    });
  };

  const hasActiveFilters = Boolean(
    filters.query ||
    filters.language ||
    (filters.genre && filters.genre.length > 0) ||
    (filters.era && filters.era.length > 0) ||
    (filters.readingMaturity && filters.readingMaturity.length > 0) ||
    filters.itihaasaOnly
  );

  return (
    <aside style={{
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      boxShadow: 'var(--shadow-card)'
    }}>
      {/* Top Header & Reset */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color="var(--ink-primary)" />
          <h4 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.1rem', fontWeight: 600 }}>
            Filter Catalog
          </h4>
        </div>
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className="btn btn-ghost"
            style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', gap: '0.3rem' }}
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Result Count Badge */}
      <div style={{
        padding: '0.5rem 0.75rem',
        backgroundColor: 'var(--bg-parchment-accent)',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.85rem',
        fontFamily: 'var(--font-sans-ui)',
        color: 'var(--ink-secondary)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>Found Titles:</span>
        <strong style={{ color: 'var(--ink-primary)', fontSize: '0.95rem' }}>{resultCount}</strong>
      </div>

      {/* Search Input */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '0.84rem',
          fontFamily: 'var(--font-sans-ui)',
          fontWeight: 600,
          color: 'var(--ink-primary)',
          marginBottom: '0.4rem'
        }}>
          Search Title, Author, Keyword
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={filters.query || ''}
            onChange={handleSearchChange}
            placeholder="e.g. Dostoevsky, Gita, Bombay, conscience..."
            style={{
              width: '100%',
              padding: '0.65rem 0.75rem 0.65rem 2.2rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-medium)',
              backgroundColor: '#FFFFFF',
              fontSize: '0.9rem',
              color: 'var(--ink-primary)'
            }}
          />
          <Search size={16} color="var(--ink-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          {filters.query && (
            <button 
              onClick={() => onFilterChange({ ...filters, query: '' })}
              style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-muted)' }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Sort Selector */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '0.84rem',
          fontFamily: 'var(--font-sans-ui)',
          fontWeight: 600,
          color: 'var(--ink-primary)',
          marginBottom: '0.4rem'
        }}>
          Sort Order
        </label>
        <select
          value={filters.sortBy || 'relevance'}
          onChange={handleSortChange}
          style={{
            width: '100%',
            padding: '0.6rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-medium)',
            backgroundColor: '#FFFFFF',
            fontSize: '0.88rem',
            color: 'var(--ink-primary)'
          }}
        >
          <option value="relevance">Relevance / Curated Rank</option>
          <option value="title">Book Title (A–Z)</option>
          <option value="author">Author (A–Z)</option>
          <option value="year">Chronological (Newest First)</option>
          <option value="maturity">Reading Depth (Starter to Advanced)</option>
        </select>
      </div>

      {/* Itihaasa Distinct Filter */}
      <div style={{
        padding: '0.75rem',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: filters.itihaasaOnly ? '#FDF3E7' : 'var(--bg-parchment-accent)',
        border: filters.itihaasaOnly ? '1px solid #F1D4B8' : '1px solid var(--border-subtle)',
        cursor: 'pointer',
        transition: 'all 0.15s ease'
      }} onClick={toggleItihaasa}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Scroll size={16} color="#8C4410" />
            <span style={{ fontFamily: 'var(--font-serif-title)', fontSize: '0.88rem', fontWeight: 600, color: '#8C4410' }}>
              Itihaasa Only
            </span>
          </div>
          <input 
            type="checkbox" 
            checked={!!filters.itihaasaOnly} 
            onChange={() => {}} 
            style={{ accentColor: '#8C4410', cursor: 'pointer' }} 
          />
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginTop: '0.3rem', lineHeight: 1.3 }}>
          Filter strictly to Indic civilizational & scriptural epics.
        </p>
      </div>

      {/* Language Filter (Supports all 22 scheduled Indian languages + English) */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '0.84rem',
          fontFamily: 'var(--font-sans-ui)',
          fontWeight: 600,
          color: 'var(--ink-primary)',
          marginBottom: '0.4rem'
        }}>
          Language (22 Scheduled + English)
        </label>
        <select
          value={filters.language || ''}
          onChange={handleLanguageChange}
          style={{
            width: '100%',
            padding: '0.6rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-medium)',
            backgroundColor: '#FFFFFF',
            fontSize: '0.88rem',
            color: 'var(--ink-primary)'
          }}
        >
          <option value="">All Languages</option>
          {SUPPORTED_LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.name}>
              {lang.name} ({lang.nativeName}) {lang.isScheduled ? '• Scheduled' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Reading Maturity Filter */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '0.84rem',
          fontFamily: 'var(--font-sans-ui)',
          fontWeight: 600,
          color: 'var(--ink-primary)',
          marginBottom: '0.5rem'
        }}>
          Reading Maturity
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {(['accessible-starter', 'intermediate', 'seasoned', 'advanced-literary'] as ReadingMaturity[]).map(mat => {
            const isSelected = filters.readingMaturity?.includes(mat);
            const labelMap: Record<string, string> = {
              'accessible-starter': 'Accessible Starter',
              'intermediate': 'Intermediate',
              'seasoned': 'Seasoned',
              'advanced-literary': 'Advanced Literary'
            };
            return (
              <button
                key={mat}
                type="button"
                onClick={() => toggleMaturity(mat)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.4rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isSelected ? 'var(--walnut-deep)' : '#FFFFFF',
                  color: isSelected ? '#FAF6EE' : 'var(--ink-secondary)',
                  border: isSelected ? '1px solid var(--walnut-deep)' : '1px solid var(--border-subtle)',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-sans-ui)',
                  textAlign: 'left'
                }}
              >
                <span>{labelMap[mat]}</span>
                {isSelected && <Check size={13} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Historical Era Filter */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '0.84rem',
          fontFamily: 'var(--font-sans-ui)',
          fontWeight: 600,
          color: 'var(--ink-primary)',
          marginBottom: '0.5rem'
        }}>
          Epoch & Era
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {([
            'Ancient / Classical',
            'Pre-Modern (1500-1850)',
            'Modern (1850-1950)',
            'Post-War (1950-2000)',
            'Contemporary (2001-Present)'
          ] as Era[]).map(era => {
            const isSelected = filters.era?.includes(era);
            return (
              <button
                key={era}
                type="button"
                onClick={() => toggleEra(era)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.4rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isSelected ? 'var(--gold-accent)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--ink-secondary)',
                  border: isSelected ? '1px solid var(--gold-accent)' : '1px solid var(--border-subtle)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-sans-ui)'
                }}
              >
                <span>{era}</span>
                {isSelected && <Check size={13} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Literary Genres */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '0.84rem',
          fontFamily: 'var(--font-sans-ui)',
          fontWeight: 600,
          color: 'var(--ink-primary)',
          marginBottom: '0.5rem'
        }}>
          Genres & Classifications
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', maxHeight: '180px', overflowY: 'auto' }}>
          {allGenres.map(genre => {
            const isSelected = filters.genre?.includes(genre);
            return (
              <button
                key={genre}
                type="button"
                onClick={() => toggleGenre(genre)}
                style={{
                  fontSize: '0.76rem',
                  fontFamily: 'var(--font-sans-ui)',
                  padding: '0.25rem 0.55rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isSelected ? 'var(--maroon-accent)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--ink-secondary)',
                  border: isSelected ? '1px solid var(--maroon-accent)' : '1px solid var(--border-medium)',
                  transition: 'all 0.1s ease'
                }}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
