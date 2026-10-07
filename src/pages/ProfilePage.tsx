import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, BookOpen, RotateCcw, Compass, ArrowRight, ShieldCheck, Feather, Heart, Layers, Eye } from 'lucide-react';
import { storageService } from '../services/storageService';
import { ReaderProfile } from '../types/profile';
import { EmptyState } from '../components/EmptyState';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ReaderProfile | null>(null);

  useEffect(() => {
    const p = storageService.getReaderProfile();
    setProfile(p);
  }, []);

  if (!profile) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <EmptyState
          title="No Reader Profile Yet"
          description="You haven't completed the literary profiling consultation yet. Complete the 3-minute quiz to generate your profile and discover books tailored to your temperament."
          actionLabel="Begin Literary Consultation"
          actionLink="/quiz"
          icon="book"
        />
      </div>
    );
  }

  const handleRetakeQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3.5rem 1.5rem 6rem 1.5rem' }}>
      {/* Top Banner / Archetype Header */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-md)',
        padding: '3rem 2.5rem',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle emblem watermark */}
        <div style={{
          position: 'absolute',
          right: '2rem',
          top: '2rem',
          opacity: 0.05,
          color: 'var(--walnut-deep)',
          pointerEvents: 'none'
        }}>
          <Feather size={140} />
        </div>

        <div style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
            <span className="badge badge-gold" style={{ fontSize: '0.8rem', padding: '0.3rem 0.65rem' }}>
              <Sparkles size={12} /> Literary Archetype
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-sans-ui)' }}>
              Profiling Session: {new Date(profile.createdAt).toLocaleDateString()}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            marginBottom: '0.5rem',
            color: 'var(--ink-primary)',
            lineHeight: 1.2
          }}>
            {profile.title}
          </h1>

          <p style={{
            fontFamily: 'var(--font-serif-title)',
            fontSize: '1.2rem',
            color: 'var(--maroon-accent)',
            marginBottom: '1.5rem',
            letterSpacing: '0.02em'
          }}>
            {profile.archetype}
          </p>

          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.7,
            color: 'var(--ink-secondary)',
            marginBottom: '2.25rem'
          }}>
            {profile.narrativeSummary}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <Link to="/recommendations" className="btn btn-primary" style={{ padding: '0.85rem 1.8rem', fontSize: '1rem' }}>
              <Sparkles size={18} color="var(--gold-glow)" />
              <span>View Ranked Recommendations</span>
              <ArrowRight size={16} />
            </Link>

            <button onClick={handleRetakeQuiz} className="btn btn-secondary">
              <RotateCcw size={15} />
              <span>Retake or Refine Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Dimensional Scores & Literary Breakdown */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        marginBottom: '2.5rem'
      }}>
        {/* Dimensional Scores Card */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '2rem',
          boxShadow: 'var(--shadow-card)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={18} color="var(--gold-accent)" />
            Literary Dimension Calibration
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
            {profile.dimensions.map((dim, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                  <span style={{ fontFamily: 'var(--font-sans-ui)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--ink-primary)' }}>
                    {dim.name}
                  </span>
                  <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-sans-ui)', color: 'var(--maroon-accent)', fontWeight: 600 }}>
                    {dim.label} ({dim.value}%)
                  </span>
                </div>

                <div style={{
                  height: '7px',
                  backgroundColor: 'var(--bg-parchment-accent)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                  marginBottom: '0.3rem'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${dim.value}%`,
                    backgroundColor: 'var(--walnut-deep)',
                    borderRadius: 'var(--radius-full)'
                  }} />
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.3 }}>
                  {dim.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Preferences Matrix */}
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '2rem',
          boxShadow: 'var(--shadow-card)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Eye size={18} color="var(--maroon-accent)" />
            Profiling Signals
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {/* Preferred Languages */}
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Languages Selected
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {profile.primaryLanguages.map((lang, i) => (
                  <span key={i} className="badge badge-parchment" style={{ fontSize: '0.82rem' }}>
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Reading Maturity & Prose Tolerance */}
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  Reading Maturity
                </span>
                <span style={{ fontFamily: 'var(--font-sans-ui)', fontWeight: 600, fontSize: '0.92rem', color: 'var(--ink-primary)' }}>
                  {profile.readingMaturity.replace('-', ' ')}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  Prose Tolerance
                </span>
                <span style={{ fontFamily: 'var(--font-sans-ui)', fontWeight: 600, fontSize: '0.92rem', color: 'var(--ink-primary)' }}>
                  {profile.proseTolerance.replace('-', ' ')}
                </span>
              </div>
            </div>

            {/* Emotional Appetite */}
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', display: 'block', marginBottom: '0.35rem' }}>
                Emotional Appetite
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {profile.emotionalAppetite.map((tone, i) => (
                  <span key={i} className="badge badge-gold" style={{ fontSize: '0.8rem' }}>
                    {tone.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* Worldview Stance & Spiritual Orientation */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  Worldview Stance
                </span>
                <span style={{ fontFamily: 'var(--font-sans-ui)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--ink-primary)' }}>
                  {profile.worldviewStance}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  Spiritual Orientation
                </span>
                <span style={{ fontFamily: 'var(--font-sans-ui)', fontWeight: 600, fontSize: '0.88rem', color: 'var(--ink-primary)' }}>
                  {profile.spiritualOrientation.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Curated Paths: Starter & Stretch */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem'
      }}>
        {/* Starter Path */}
        <div style={{
          backgroundColor: '#FAF7F2',
          border: '1px solid #E5DCD0',
          borderRadius: 'var(--radius-md)',
          padding: '2rem'
        }}>
          <span style={{
            fontSize: '0.76rem',
            fontFamily: 'var(--font-sans-ui)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--gold-accent)',
            fontWeight: 700
          }}>
            Immediate Alignment
          </span>
          <h3 style={{ fontSize: '1.35rem', marginTop: '0.35rem', marginBottom: '0.75rem' }}>
            Recommended Starter Path
          </h3>
          <p style={{ fontSize: '0.98rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {profile.starterPathDescription}
          </p>
          <Link to="/recommendations" className="btn btn-secondary" style={{ backgroundColor: '#fff', fontSize: '0.88rem' }}>
            <span>Explore Matching Titles</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Stretch Path */}
        <div style={{
          backgroundColor: '#F9F1F2',
          border: '1px solid #E4CECE',
          borderRadius: 'var(--radius-md)',
          padding: '2rem'
        }}>
          <span style={{
            fontSize: '0.76rem',
            fontFamily: 'var(--font-sans-ui)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--maroon-accent)',
            fontWeight: 700
          }}>
            Horizon Expansion
          </span>
          <h3 style={{ fontSize: '1.35rem', marginTop: '0.35rem', marginBottom: '0.75rem', color: 'var(--maroon-accent)' }}>
            Suggested Stretch Trajectory
          </h3>
          <p style={{ fontSize: '0.98rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {profile.stretchPathDescription}
          </p>
          <Link to="/explore" className="btn btn-secondary" style={{ backgroundColor: '#fff', fontSize: '0.88rem' }}>
            <span>Browse Stretch Works</span>
            <Compass size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};
