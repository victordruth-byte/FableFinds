import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Compass, RotateCcw, BookmarkX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
  onActionClick?: () => void;
  icon?: 'book' | 'compass' | 'bookmark' | 'reset';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  actionLink,
  onActionClick,
  icon = 'book'
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'compass':
        return <Compass size={36} color="var(--gold-accent)" />;
      case 'bookmark':
        return <BookmarkX size={36} color="var(--maroon-accent)" />;
      case 'reset':
        return <RotateCcw size={36} color="var(--ink-secondary)" />;
      default:
        return <BookOpen size={36} color="var(--gold-accent)" />;
    }
  };

  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      backgroundColor: 'var(--bg-surface)',
      borderRadius: 'var(--radius-md)',
      border: '1px dashed var(--border-medium)',
      maxWidth: '600px',
      margin: '2rem auto'
    }}>
      <div style={{
        width: '70px',
        height: '70px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--bg-parchment-accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem auto'
      }}>
        {renderIcon()}
      </div>

      <h3 style={{
        fontFamily: 'var(--font-serif-title)',
        fontSize: '1.4rem',
        marginBottom: '0.65rem',
        color: 'var(--ink-primary)'
      }}>
        {title}
      </h3>

      <p style={{
        color: 'var(--ink-secondary)',
        fontSize: '0.96rem',
        lineHeight: 1.6,
        marginBottom: '1.75rem',
        maxWidth: '460px',
        margin: '0 auto 1.75rem auto'
      }}>
        {description}
      </p>

      {actionLabel && actionLink && (
        <Link to={actionLink} className="btn btn-primary">
          {actionLabel}
        </Link>
      )}

      {actionLabel && onActionClick && !actionLink && (
        <button onClick={onActionClick} className="btn btn-secondary">
          {actionLabel}
        </button>
      )}
    </div>
  );
};
