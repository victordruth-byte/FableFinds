import React from 'react';
import { Sparkles, Compass, Target, Star } from 'lucide-react';
import { RecommendationCategory } from '../types/recommendation';

interface RationaleBadgeProps {
  score?: number;
  category?: RecommendationCategory;
  rationale?: string;
  resonantDimensions?: string[];
}

export const RationaleBadge: React.FC<RationaleBadgeProps> = ({
  score,
  category = 'Best Match',
  rationale,
  resonantDimensions = []
}) => {
  const getBadgeStyle = () => {
    switch (category) {
      case 'Best Match':
        return {
          bg: '#FAF4E5',
          border: '1px solid #E8D39E',
          color: '#7D5C14',
          icon: <Star size={14} color="#B88B2A" />
        };
      case 'Stretch Your Reading':
        return {
          bg: '#F9EDEE',
          border: '1px solid #E5BEBF',
          color: '#782A2D',
          icon: <Target size={14} color="#782A2D" />
        };
      case 'Hidden Gem / Discover':
        return {
          bg: '#EEF4F2',
          border: '1px solid #C4D9D2',
          color: '#285848',
          icon: <Compass size={14} color="#285848" />
        };
      default:
        return {
          bg: 'var(--bg-parchment-accent)',
          border: '1px solid var(--border-medium)',
          color: 'var(--ink-secondary)',
          icon: <Sparkles size={14} color="var(--gold-accent)" />
        };
    }
  };

  const style = getBadgeStyle();

  return (
    <div style={{
      backgroundColor: style.bg,
      border: style.border,
      borderRadius: 'var(--radius-sm)',
      padding: '0.75rem 1rem',
      marginBottom: '1rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.82rem', color: style.color }}>
          {style.icon}
          <span>{category.toUpperCase()}</span>
        </div>
        {score !== undefined && (
          <span style={{
            fontSize: '0.82rem',
            fontFamily: 'var(--font-sans-ui)',
            fontWeight: 700,
            color: style.color
          }}>
            {score}% Fit
          </span>
        )}
      </div>

      {rationale && (
        <p style={{
          fontFamily: 'var(--font-serif-editorial)',
          fontStyle: 'italic',
          fontSize: '0.92rem',
          lineHeight: 1.45,
          color: 'var(--ink-secondary)',
          marginBottom: resonantDimensions.length > 0 ? '0.5rem' : '0'
        }}>
          "{rationale}"
        </p>
      )}

      {resonantDimensions.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.35rem' }}>
          {resonantDimensions.map((dim, idx) => (
            <span key={idx} style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-sans-ui)',
              backgroundColor: 'rgba(255,255,255,0.65)',
              padding: '0.15rem 0.45rem',
              borderRadius: '3px',
              color: style.color,
              fontWeight: 500
            }}>
              ✓ {dim}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
