import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, BookOpen, ShieldCheck, Compass, Sparkles, Scroll, Languages, Database, CheckCircle2 } from 'lucide-react';
import { SCHEDULED_INDIAN_LANGUAGES } from '../data/languages';

export const AboutPage: React.FC = () => {
  return (
    <div className="container animate-fade-in" style={{ padding: '3.5rem 1.5rem 6rem 1.5rem', maxWidth: '860px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--bg-parchment-accent)',
          border: '1px solid var(--border-medium)',
          padding: '0.4rem 1rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.84rem',
          color: 'var(--ink-secondary)',
          marginBottom: '1.25rem'
        }}>
          <Feather size={14} color="var(--gold-accent)" />
          <span>Product Philosophy & Architecture</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', lineHeight: 1.15, marginBottom: '1rem' }}>
          Literature That Listens Before It Recommends
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--ink-secondary)', lineHeight: 1.65 }}>
          FableFinds was created out of dissatisfaction with commercial book discovery that reduces readers to shallow genre tags or algorithmic bestsellers.
        </p>
      </div>

      {/* Narrative Section */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '2.5rem 2.25rem',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '2.5rem'
      }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--ink-primary)' }}>
          The FableFinds Core Vision
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--ink-secondary)', marginBottom: '1.25rem' }}>
          When you enter a venerable bookstore or an old reading room, a truly wise curator does not simply ask: <em>"Which genre do you like?"</em>
        </p>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--ink-secondary)', marginBottom: '1.25rem' }}>
          They listen to your mood, your patience for intricate syntax, the questions that keep you awake at night, your appetite for moral complexity, and the cultural languages in which your heart thinks.
        </p>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--ink-secondary)' }}>
          FableFinds translates this human curatorial intuition into a transparent, deterministic recommendation system. It treats both canonical classics and commercial page-turners with respect—because the best book is the one that genuinely meets the reader where they are.
        </p>
      </div>

      {/* Core Principles */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          Foundational Architectural Pillars
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Pillar 1 */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.5rem 1.75rem',
            display: 'flex',
            gap: '1.25rem',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-parchment-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Sparkles size={20} color="var(--gold-accent)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>
                Multi-Dimensional Profiling
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--ink-secondary)', lineHeight: 1.6, margin: 0 }}>
                We score across ten distinct literary dimensions: prose density tolerance, philosophical appetite, spiritual orientation, narrative pacing, emotional climate, worldview stance, and civilizational grounding.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.5rem 1.75rem',
            display: 'flex',
            gap: '1.25rem',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: '#FDF3E7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Scroll size={20} color="#8C4410" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>
                Civilizational Integrity: Itihaasa
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--ink-secondary)', lineHeight: 1.6, margin: 0 }}>
                We never degrade sacred Indic epics into generic "mythology". Itihaasa represents historical and dharmic civilizational memory, strictly separated from modern fictional retellings and popular mytho-fantasy novels.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.5rem 1.75rem',
            display: 'flex',
            gap: '1.25rem',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-parchment-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Languages size={20} color="var(--maroon-accent)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>
                22 Scheduled Indian Languages
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--ink-secondary)', lineHeight: 1.6, margin: 0 }}>
                Language is treated as an authentic literary dimension, never a proxy for political worldview or intellectual ability. Every scheduled language has space for classical, regional, popular, and modern voices.
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.5rem 1.75rem',
            display: 'flex',
            gap: '1.25rem',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-parchment-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Database size={20} color="var(--ink-primary)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>
                Clean Service Boundaries for Future Cloud Migration
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--ink-secondary)', lineHeight: 1.6, margin: 0 }}>
                Built with strict service interfaces (bookService, authorService, recommendationService, storageService) so this client-side MVP can smoothly plug into Supabase / PostgreSQL in the future without UI rewrites.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Clarification Note */}
      <div style={{
        backgroundColor: '#FAF5EA',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-sm)',
        padding: '1.5rem',
        marginBottom: '3rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <ShieldCheck size={18} color="var(--gold-accent)" />
          <h4 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1rem', color: 'var(--ink-primary)', margin: 0 }}>
            Analytics Architecture Note
          </h4>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: 1.6, margin: 0 }}>
          Google Analytics 4 (GA4) has been intentionally omitted from this initial build to keep the codebase clean and prevent unwanted tracking. The user will manually append their verified Google Analytics Measurement ID tag when ready for production release.
        </p>
      </div>

      {/* CTA Footer */}
      <div style={{ textAlign: 'center' }}>
        <Link to="/quiz" className="btn btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}>
          <BookOpen size={18} />
          <span>Begin Your Literary Consultation</span>
        </Link>
      </div>
    </div>
  );
};
