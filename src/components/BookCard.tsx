import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, Ban, ArrowUpRight, BookOpen, Scroll, Check } from 'lucide-react';
import { Book } from '../types/book';
import { storageService } from '../services/storageService';
import { RationaleBadge } from './RationaleBadge';
import { RecommendationCategory } from '../types/recommendation';

interface BookCardProps {
  book: Book;
  score?: number;
  category?: RecommendationCategory;
  rationale?: string;
  resonantDimensions?: string[];
  onStateChange?: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  score,
  category,
  rationale,
  resonantDimensions,
  onStateChange
}) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isRejected, setIsRejected] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    setIsSaved(storageService.isBookSaved(book.id));
    setIsRejected(storageService.isBookRejected(book.id));
  }, [book.id]);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      storageService.removeSavedBookId(book.id);
      setIsSaved(false);
    } else {
      storageService.saveBookId(book.id);
      setIsSaved(true);
      setIsRejected(false);
    }
    window.dispatchEvent(new CustomEvent('fablefinds:saved_changed'));
    if (onStateChange) onStateChange();
  };

  const handleToggleReject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRejected) {
      storageService.unrejectBookId(book.id);
      setIsRejected(false);
    } else {
      storageService.rejectBookId(book.id);
      setIsRejected(true);
      setIsSaved(false);
    }
    window.dispatchEvent(new CustomEvent('fablefinds:saved_changed'));
    if (onStateChange) onStateChange();
  };

  return (
    <article style={{
      backgroundColor: 'var(--bg-card)',
      border: isSaved ? '1px solid var(--gold-accent)' : '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
      position: 'relative',
      opacity: isRejected ? 0.55 : 1,
      boxShadow: 'var(--shadow-card)'
    }}
    className="book-card-hover"
    >
      {/* Top Banner if in recommendation mode */}
      {rationale && (
        <div style={{ padding: '0.75rem 1rem 0 1rem' }}>
          <RationaleBadge 
            score={score} 
            category={category} 
            rationale={rationale} 
            resonantDimensions={resonantDimensions} 
          />
        </div>
      )}

      <div style={{ display: 'flex', padding: '1.25rem', gap: '1.25rem', flex: 1 }}>
        {/* Cover Thumbnail */}
        <Link to={`/book/${book.id}`} style={{ flexShrink: 0, width: '95px', position: 'relative' }}>
          <div style={{
            width: '95px',
            height: '142px',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-parchment-accent)',
            boxShadow: '0 4px 8px rgba(36, 28, 24, 0.15)',
            border: '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {!imgError ? (
              <img 
                src={book.coverUrl} 
                alt={`Cover of ${book.title}`} 
                onError={() => setImgError(true)}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div style={{
                padding: '0.5rem',
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
                <BookOpen size={20} color="var(--gold-glow)" style={{ marginBottom: '0.25rem' }} />
                <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-serif-title)', lineHeight: 1.1 }}>
                  {book.title}
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* Content Details */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          {/* Metadata badges row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.4rem', alignItems: 'center' }}>
            {book.itihaasa && (
              <span className="badge badge-itihaasa">
                <Scroll size={11} /> Itihaasa
              </span>
            )}
            <span className="badge badge-parchment">
              {book.originalLanguage}
            </span>
            <span className="badge badge-parchment" style={{ fontSize: '0.7rem' }}>
              {book.era}
            </span>
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '1.25rem',
            lineHeight: 1.3,
            marginBottom: '0.25rem'
          }}>
            <Link to={`/book/${book.id}`} style={{
              color: 'var(--ink-primary)',
              textDecoration: 'none',
              transition: 'color 0.15s ease'
            }} className="book-title-link">
              {book.title}
            </Link>
          </h3>

          {/* Author */}
          <p style={{
            fontSize: '0.92rem',
            fontFamily: 'var(--font-sans-ui)',
            color: 'var(--ink-secondary)',
            fontWeight: 500,
            marginBottom: '0.65rem'
          }}>
            by {book.author}
          </p>

          {/* Genres & Themes */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
            {book.genre.slice(0, 3).map((g, idx) => (
              <span key={idx} style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-sans-ui)',
                backgroundColor: 'rgba(74, 62, 55, 0.06)',
                color: 'var(--ink-secondary)',
                padding: '0.15rem 0.5rem',
                borderRadius: '3px'
              }}>
                {g}
              </span>
            ))}
          </div>

          {/* Short Why Read snippet */}
          <p style={{
            fontSize: '0.88rem',
            lineHeight: 1.45,
            color: 'var(--ink-muted)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '1rem',
            flex: 1
          }}>
            {book.whyRead || book.description}
          </p>

          {/* Action Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '0.75rem',
            marginTop: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Save Button */}
              <button
                onClick={handleToggleSave}
                className={isSaved ? "btn btn-gold" : "btn btn-secondary"}
                style={{
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.8rem',
                  borderRadius: 'var(--radius-sm)'
                }}
                title={isSaved ? "Saved to your reading shelf" : "Save for later"}
              >
                {isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>

              {/* Not For Me (Reject) Button */}
              <button
                onClick={handleToggleReject}
                className="btn btn-ghost"
                style={{
                  padding: '0.4rem 0.65rem',
                  fontSize: '0.78rem',
                  color: isRejected ? 'var(--maroon-accent)' : 'var(--ink-faint)',
                  border: isRejected ? '1px solid var(--maroon-border)' : '1px solid transparent',
                  backgroundColor: isRejected ? 'var(--maroon-surface)' : 'transparent'
                }}
                title={isRejected ? "Marked as not interested" : "Not for me (reduces similar recommendations)"}
              >
                <Ban size={13} />
                <span>{isRejected ? "Not for me" : "Pass"}</span>
              </button>
            </div>

            {/* Read Detail Link */}
            <Link 
              to={`/book/${book.id}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.2rem',
                fontSize: '0.84rem',
                fontFamily: 'var(--font-sans-ui)',
                color: 'var(--maroon-accent)',
                fontWeight: 600
              }}
            >
              <span>Details</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .book-card-hover:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-float);
          border-color: var(--border-medium);
        }
        .book-title-link:hover {
          color: var(--maroon-accent) !important;
        }
      `}</style>
    </article>
  );
};
