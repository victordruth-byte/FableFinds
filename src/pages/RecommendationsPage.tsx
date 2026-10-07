import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Target, Compass, Star, RotateCcw, Filter, BookOpen, Layers } from 'lucide-react';
import { storageService } from '../services/storageService';
import { recommendationService } from '../services/recommendationService';
import { ReaderProfile } from '../types/profile';
import { RecommendationRunResult, ScoredRecommendation, RecommendationCategory } from '../types/recommendation';
import { BookCard } from '../components/BookCard';
import { EmptyState } from '../components/EmptyState';

export const RecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ReaderProfile | null>(null);
  const [results, setResults] = useState<RecommendationRunResult | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const refreshRecommendations = (currentProfile: ReaderProfile) => {
    const runResult = recommendationService.generateRecommendations(currentProfile);
    setResults(runResult);
  };

  useEffect(() => {
    const p = storageService.getReaderProfile();
    setProfile(p);
    if (p) {
      refreshRecommendations(p);
    }
  }, []);

  if (!profile || !results) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <EmptyState
          title="No Recommendations Generated Yet"
          description="Take our 3-minute literary consultation to receive personalized, explainable recommendations tuned to your philosophical appetite, prose tolerance, and reading ambition."
          actionLabel="Take Literary Quiz"
          actionLink="/quiz"
          icon="book"
        />
      </div>
    );
  }

  const handleStateChange = () => {
    // Re-run recommendation scoring when user saves/rejects a book
    if (profile) {
      refreshRecommendations(profile);
    }
  };

  const filteredRecommendations = activeCategoryFilter === 'all'
    ? results.recommendations
    : results.recommendations.filter(r => r.category === activeCategoryFilter);

  return (
    <div className="container animate-fade-in" style={{ padding: '3.5rem 1.5rem 6rem 1.5rem' }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-md)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '2.5rem'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-gold">
                <Sparkles size={13} /> Tailored Curatorial List
              </span>
              <span style={{ fontSize: '0.84rem', color: 'var(--ink-muted)' }}>
                Tuned for: <strong style={{ color: 'var(--ink-primary)' }}>{profile.title}</strong>
              </span>
            </div>

            <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>
              Your Personalized Recommendations
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--ink-secondary)', maxWidth: '640px', lineHeight: 1.6 }}>
              Curated using multi-dimensional matching across your prose density tolerance, philosophical appetite, and languages. Every book includes a transparent rationale for why it was selected.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <Link to="/profile" className="btn btn-secondary" style={{ backgroundColor: '#fff', fontSize: '0.88rem' }}>
              <Layers size={15} />
              <span>Review Reader Profile</span>
            </Link>
            <Link to="/quiz" className="btn btn-ghost" style={{ fontSize: '0.84rem', color: 'var(--ink-muted)' }}>
              <RotateCcw size={13} />
              <span>Retake Quiz Consultation</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '1rem'
      }}>
        <button
          onClick={() => setActiveCategoryFilter('all')}
          style={{
            fontFamily: 'var(--font-sans-ui)',
            fontSize: '0.86rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: activeCategoryFilter === 'all' ? 'var(--walnut-deep)' : 'var(--bg-surface)',
            color: activeCategoryFilter === 'all' ? '#FAF6EE' : 'var(--ink-secondary)',
            border: activeCategoryFilter === 'all' ? '1px solid var(--walnut-deep)' : '1px solid var(--border-medium)',
            fontWeight: activeCategoryFilter === 'all' ? 600 : 500,
            cursor: 'pointer'
          }}
        >
          All Recommendations ({results.recommendations.length})
        </button>

        <button
          onClick={() => setActiveCategoryFilter('Best Match')}
          style={{
            fontFamily: 'var(--font-sans-ui)',
            fontSize: '0.86rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: activeCategoryFilter === 'Best Match' ? 'var(--gold-accent)' : 'var(--bg-surface)',
            color: activeCategoryFilter === 'Best Match' ? '#FFFFFF' : 'var(--ink-secondary)',
            border: activeCategoryFilter === 'Best Match' ? '1px solid var(--gold-accent)' : '1px solid var(--border-medium)',
            fontWeight: activeCategoryFilter === 'Best Match' ? 600 : 500,
            cursor: 'pointer'
          }}
        >
          ★ Best Matches ({results.topCategories.bestMatches.length})
        </button>

        <button
          onClick={() => setActiveCategoryFilter('Stretch Your Reading')}
          style={{
            fontFamily: 'var(--font-sans-ui)',
            fontSize: '0.86rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: activeCategoryFilter === 'Stretch Your Reading' ? 'var(--maroon-accent)' : 'var(--bg-surface)',
            color: activeCategoryFilter === 'Stretch Your Reading' ? '#FFFFFF' : 'var(--ink-secondary)',
            border: activeCategoryFilter === 'Stretch Your Reading' ? '1px solid var(--maroon-accent)' : '1px solid var(--border-medium)',
            fontWeight: activeCategoryFilter === 'Stretch Your Reading' ? 600 : 500,
            cursor: 'pointer'
          }}
        >
          🎯 Stretch Your Reading ({results.topCategories.stretchMatches.length})
        </button>

        <button
          onClick={() => setActiveCategoryFilter('Hidden Gem / Discover')}
          style={{
            fontFamily: 'var(--font-sans-ui)',
            fontSize: '0.86rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: activeCategoryFilter === 'Hidden Gem / Discover' ? '#285848' : 'var(--bg-surface)',
            color: activeCategoryFilter === 'Hidden Gem / Discover' ? '#FFFFFF' : 'var(--ink-secondary)',
            border: activeCategoryFilter === 'Hidden Gem / Discover' ? '1px solid #285848' : '1px solid var(--border-medium)',
            fontWeight: activeCategoryFilter === 'Hidden Gem / Discover' ? 600 : 500,
            cursor: 'pointer'
          }}
        >
          🧭 Hidden Gems ({results.topCategories.hiddenGems.length})
        </button>
      </div>

      {/* Recommendations Cards Grid */}
      {filteredRecommendations.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.75rem'
        }}>
          {filteredRecommendations.map(item => (
            <BookCard
              key={item.book.id}
              book={item.book}
              score={item.score}
              category={item.category}
              rationale={item.rationale}
              resonantDimensions={item.resonantDimensions}
              onStateChange={handleStateChange}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Books Found in this Category"
          description="Try switching the category filter above or review your quiz answers to broaden your recommendation horizons."
          actionLabel="Show All Recommendations"
          onActionClick={() => setActiveCategoryFilter('all')}
          icon="compass"
        />
      )}
    </div>
  );
};
