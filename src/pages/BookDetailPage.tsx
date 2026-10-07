import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Bookmark, BookmarkCheck, Ban, Scroll, BookOpen, 
  Sparkles, Layers, Globe, Feather, Check, Building 
} from 'lucide-react';
import { bookService } from '../services/bookService';
import { authorService } from '../services/authorService';
import { storageService } from '../services/storageService';
import { recommendationService } from '../services/recommendationService';
import { BookCard } from '../components/BookCard';
import { EmptyState } from '../components/EmptyState';
import { RationaleBadge } from '../components/RationaleBadge';

export const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState(bookService.getBookById(id || ''));
  const [author, setAuthor] = useState(book ? authorService.getAuthorById(book.authorId) : undefined);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isRejected, setIsRejected] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  // Profile-based personalized rationale
  const [profileRationale, setProfileRationale] = useState<{
    score?: number;
    category?: any;
    rationale?: string;
    dimensions?: string[];
  }>({});

  useEffect(() => {
    if (id) {
      const b = bookService.getBookById(id);
      setBook(b);
      if (b) {
        setAuthor(authorService.getAuthorById(b.authorId));
        setIsSaved(storageService.isBookSaved(b.id));
        setIsRejected(storageService.isBookRejected(b.id));

        // If user has a profile, calculate how well this specific book fits them
        const p = storageService.getReaderProfile();
        if (p) {
          const recRun = recommendationService.generateRecommendations(p);
          const found = recRun.recommendations.find(r => r.book.id === b.id);
          if (found) {
            setProfileRationale({
              score: found.score,
              category: found.category,
              rationale: found.rationale,
              dimensions: found.resonantDimensions
            });
          }
        }
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!book) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <EmptyState
          title="Book Not Found in Repository"
          description="The title you are looking for may have been moved or does not exist in our seed collection."
          actionLabel="Return to Catalog"
          actionLink="/explore"
          icon="compass"
        />
      </div>
    );
  }

  const handleToggleSave = () => {
    if (isSaved) {
      storageService.removeSavedBookId(book.id);
      setIsSaved(false);
    } else {
      storageService.saveBookId(book.id);
      setIsSaved(true);
      setIsRejected(false);
    }
    window.dispatchEvent(new CustomEvent('fablefinds:saved_changed'));
  };

  const handleToggleReject = () => {
    if (isRejected) {
      storageService.unrejectBookId(book.id);
      setIsRejected(false);
    } else {
      storageService.rejectBookId(book.id);
      setIsRejected(true);
      setIsSaved(false);
    }
    window.dispatchEvent(new CustomEvent('fablefinds:saved_changed'));
  };

  const relatedBooks = bookService.getRelatedBooks(book.id, 3);

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem 6rem 1.5rem' }}>
      {/* Back button link */}
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost"
          style={{ padding: '0.4rem 0.75rem', gap: '0.4rem', color: 'var(--ink-secondary)' }}
        >
          <ArrowLeft size={16} />
          <span>Back to previous page</span>
        </button>
      </div>

      {/* Main Editorial Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(260px, 340px) 1fr',
        gap: '3.5rem',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-md)',
        padding: '3rem',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '4rem'
      }} className="book-detail-grid">
        {/* Left Column: Cover & Actions */}
        <div>
          <div style={{
            width: '100%',
            maxWidth: '300px',
            margin: '0 auto 2rem auto',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-parchment-accent)',
            boxShadow: '0 12px 28px rgba(36, 28, 24, 0.22)',
            border: '1px solid var(--border-bold)',
            aspectRatio: '2/3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {!imgError ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                onError={() => setImgError(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                backgroundColor: 'var(--walnut-deep)',
                color: '#FAF6EE',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <BookOpen size={48} color="var(--gold-glow)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.2rem', color: '#FAF6EE' }}>
                  {book.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#D5C7BB', marginTop: '0.5rem' }}>{book.author}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '300px', margin: '0 auto' }}>
            <button
              onClick={handleToggleSave}
              className={isSaved ? "btn btn-gold" : "btn btn-primary"}
              style={{ width: '100%', padding: '0.85rem' }}
            >
              {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              <span>{isSaved ? "Saved in Your Reading Shelf" : "Save to Reading List"}</span>
            </button>

            <button
              onClick={handleToggleReject}
              className="btn btn-secondary"
              style={{
                width: '100%',
                padding: '0.75rem',
                color: isRejected ? 'var(--maroon-accent)' : 'var(--ink-secondary)',
                backgroundColor: isRejected ? 'var(--maroon-surface)' : 'transparent'
              }}
            >
              <Ban size={16} />
              <span>{isRejected ? "Marked as Not for Me" : "Not for Me (Refine Future Matches)"}</span>
            </button>
          </div>

          {/* Quick Stats Metadata Box */}
          <div style={{
            marginTop: '2rem',
            padding: '1.25rem',
            backgroundColor: 'var(--bg-parchment-accent)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.86rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem'
          }}>
            <div>
              <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Era & Region</span>
              <strong style={{ color: 'var(--ink-primary)' }}>{book.era} • {book.countryRegion}</strong>
            </div>
            {book.publisher && (
              <div>
                <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Publisher</span>
                <strong style={{ color: 'var(--ink-primary)' }}>{book.publisher}</strong>
              </div>
            )}
            {book.pageCount && (
              <div>
                <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Length</span>
                <strong style={{ color: 'var(--ink-primary)' }}>~{book.pageCount} pages ({book.lengthBand})</strong>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Narrative, Metadata & Deep Analysis */}
        <div>
          {/* Badges Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
            {book.itihaasa && (
              <span className="badge badge-itihaasa" style={{ fontSize: '0.82rem', padding: '0.3rem 0.65rem' }}>
                <Scroll size={13} /> Itihaasa (Indic Epic)
              </span>
            )}
            <span className="badge badge-gold">
              Original: {book.originalLanguage}
            </span>
            <span className="badge badge-parchment">
              {book.popularityBand.replace('-', ' ')}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
            marginBottom: '0.5rem',
            lineHeight: 1.2
          }}>
            {book.title}
          </h1>

          {/* Author */}
          <p style={{
            fontFamily: 'var(--font-serif-title)',
            fontSize: '1.25rem',
            color: 'var(--maroon-accent)',
            marginBottom: '1.75rem'
          }}>
            by {book.author}
          </p>

          {/* Personalized Rationale Callout if profile exists */}
          {profileRationale.rationale && (
            <div style={{ marginBottom: '2rem' }}>
              <RationaleBadge
                score={profileRationale.score}
                category={profileRationale.category}
                rationale={profileRationale.rationale}
                resonantDimensions={profileRationale.dimensions}
              />
            </div>
          )}

          {/* Editorial "Why Read This" Feature Box */}
          <div style={{
            backgroundColor: '#FAF5EA',
            borderLeft: '4px solid var(--gold-accent)',
            padding: '1.25rem 1.5rem',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            marginBottom: '2rem'
          }}>
            <h4 style={{
              fontFamily: 'var(--font-sans-ui)',
              fontSize: '0.82rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#8A6818',
              fontWeight: 700,
              marginBottom: '0.4rem'
            }}>
              Curatorial Perspective: Why Read This
            </h4>
            <p style={{
              fontFamily: 'var(--font-serif-editorial)',
              fontStyle: 'italic',
              fontSize: '1.08rem',
              color: 'var(--ink-primary)',
              lineHeight: 1.6,
              margin: 0
            }}>
              "{book.whyRead}"
            </p>
          </div>

          {/* Synopsis */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.2rem', marginBottom: '0.85rem' }}>
              Synopsis & Context
            </h3>
            <p style={{ fontSize: '1.08rem', lineHeight: 1.8, color: 'var(--ink-secondary)' }}>
              {book.description}
            </p>
          </div>

          {/* Literary Attributes Matrix */}
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '2rem',
            marginBottom: '2.5rem'
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.2rem', marginBottom: '1.25rem' }}>
              Literary Architecture
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem'
            }}>
              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--ink-muted)', display: 'block' }}>
                  Prose Complexity
                </span>
                <span style={{ fontWeight: 600, fontFamily: 'var(--font-sans-ui)', color: 'var(--ink-primary)' }}>
                  {book.proseComplexity.replace('-', ' ')}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--ink-muted)', display: 'block' }}>
                  Pacing
                </span>
                <span style={{ fontWeight: 600, fontFamily: 'var(--font-sans-ui)', color: 'var(--ink-primary)' }}>
                  {book.pace.replace('-', ' ')}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--ink-muted)', display: 'block' }}>
                  Philosophical Depth
                </span>
                <span style={{ fontWeight: 600, fontFamily: 'var(--font-sans-ui)', color: 'var(--ink-primary)' }}>
                  {book.philosophicalDepth}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--ink-muted)', display: 'block' }}>
                  Emotional Tone
                </span>
                <span style={{ fontWeight: 600, fontFamily: 'var(--font-sans-ui)', color: 'var(--ink-primary)' }}>
                  {book.emotionalTone.replace('-', ' ')}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--ink-muted)', display: 'block' }}>
                  Spirituality
                </span>
                <span style={{ fontWeight: 600, fontFamily: 'var(--font-sans-ui)', color: 'var(--ink-primary)' }}>
                  {book.spirituality.replace('-', ' ')}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--ink-muted)', display: 'block' }}>
                  Reading Maturity
                </span>
                <span style={{ fontWeight: 600, fontFamily: 'var(--font-sans-ui)', color: 'var(--ink-primary)' }}>
                  {book.readingMaturity.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Languages & Translations Availability */}
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.75rem',
            marginBottom: '2rem'
          }}>
            <h4 style={{ fontFamily: 'var(--font-sans-ui)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '0.75rem' }}>
              Available in Languages & Translations:
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {book.availableLanguages.map((lang, idx) => (
                <span key={idx} className="badge badge-parchment" style={{ fontSize: '0.82rem' }}>
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Author Note if available */}
          {author && (
            <div style={{
              backgroundColor: 'var(--bg-parchment-accent)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.5rem',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <Feather size={16} color="var(--gold-accent)" />
                <h4 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.05rem', margin: 0 }}>
                  About {author.name} {author.nativeName ? `(${author.nativeName})` : ''}
                </h4>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.6, margin: 0 }}>
                {author.bio}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Books Section */}
      {relatedBooks.length > 0 && (
        <div>
          <div style={{ marginBottom: '1.75rem' }}>
            <span style={{
              fontFamily: 'var(--font-sans-ui)',
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--gold-accent)',
              fontWeight: 600
            }}>
              Adjacent Discoveries
            </span>
            <h2 style={{ fontSize: '1.9rem', marginTop: '0.2rem' }}>
              Readers of "{book.title}" Also Explore
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {relatedBooks.map(related => (
              <BookCard key={related.id} book={related} />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .book-detail-grid {
            grid-template-columns: 1fr !important;
            padding: 2rem 1.5rem !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};
