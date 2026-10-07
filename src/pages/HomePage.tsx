import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Compass, Scroll, Sparkles, Feather, ArrowRight, ShieldCheck, Languages, CheckCircle2 } from 'lucide-react';
import { bookService } from '../services/bookService';
import { BookCard } from '../components/BookCard';
import { storageService } from '../services/storageService';

export const HomePage: React.FC = () => {
  const books = bookService.getAllBooks();
  const itihaasaCount = bookService.getItihaasaBooks().length;
  const hasProfile = !!storageService.getReaderProfile();

  // Curated showcase selection
  const featuredBooks = [
    books.find(b => b.id === 'book-shrimad-bhagavad-gita')!,
    books.find(b => b.id === 'book-crime-and-punishment')!,
    books.find(b => b.id === 'book-godaan')!,
    books.find(b => b.id === 'book-ponniyin-selvan')!
  ].filter(Boolean);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '5rem' }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '5rem 0 4.5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative watermark */}
        <div style={{
          position: 'absolute',
          right: '-5%',
          top: '-15%',
          opacity: 0.03,
          fontSize: '28rem',
          fontFamily: 'var(--font-serif-title)',
          pointerEvents: 'none',
          userSelect: 'none'
        }}>
          ❧
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--bg-parchment-accent)',
              border: '1px solid var(--border-medium)',
              padding: '0.4rem 1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.84rem',
              fontFamily: 'var(--font-sans-ui)',
              color: 'var(--ink-secondary)',
              marginBottom: '1.75rem',
              fontWeight: 500
            }}>
              <Feather size={14} color="var(--gold-accent)" />
              <span>Personalized Literary Discovery & Explainable Recommendations</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-serif-editorial)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: 'var(--ink-primary)',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em'
            }}>
              Stories that understand you.
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
              lineHeight: 1.6,
              color: 'var(--ink-secondary)',
              maxWidth: '680px',
              margin: '0 auto 2.5rem auto'
            }}>
              Most algorithms just ask what genre you bought last. FableFinds explores your reading temperament, emotional appetite, prose tolerance, worldview, and civilizational grounding.
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Link to="/quiz" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
                <BookOpen size={18} />
                <span>{hasProfile ? 'Review or Retake Quiz' : 'Begin Literary Consultation'}</span>
                <ArrowRight size={16} />
              </Link>

              <Link to="/explore" className="btn btn-secondary" style={{ padding: '0.9rem 1.8rem', fontSize: '1.05rem' }}>
                <Compass size={18} />
                <span>Explore Full Repository</span>
              </Link>
            </div>

            {hasProfile && (
              <p style={{ marginTop: '1.25rem', fontSize: '0.92rem' }}>
                <Link to="/recommendations" style={{ color: 'var(--maroon-accent)', textDecoration: 'underline', fontWeight: 600 }}>
                  View your active personalized recommendations →
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 3-Step Philosophical Approach */}
      <section style={{ padding: '4.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
            <span style={{
              fontFamily: 'var(--font-sans-ui)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontSize: '0.78rem',
              color: 'var(--gold-accent)',
              fontWeight: 600
            }}>
              The Methodology
            </span>
            <h2 style={{ fontSize: '2.2rem', marginTop: '0.4rem', marginBottom: '0.75rem' }}>
              How FableFinds Curates For You
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)' }}>
              No shallow social trends. Deterministic multi-dimensional matching based on literary substance.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {/* Step 1 */}
            <div style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem',
              position: 'relative'
            }}>
              <span style={{
                fontFamily: 'var(--font-serif-title)',
                fontSize: '2.2rem',
                fontWeight: 700,
                color: 'var(--gold-accent)',
                opacity: 0.85,
                display: 'block',
                marginBottom: '0.75rem'
              }}>
                01
              </span>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>
                Consultation, Not a Survey
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
                Answer deliberate questions exploring your narrative pace, prose density tolerance, emotional climate, and philosophical curiosity.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem',
              position: 'relative'
            }}>
              <span style={{
                fontFamily: 'var(--font-serif-title)',
                fontSize: '2.2rem',
                fontWeight: 700,
                color: 'var(--maroon-accent)',
                opacity: 0.85,
                display: 'block',
                marginBottom: '0.75rem'
              }}>
                02
              </span>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>
                Your Literary Archetype
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
                Receive an editorial profile identifying your reading maturity, spiritual orientation, narrative priorities, and growth trajectories.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem',
              position: 'relative'
            }}>
              <span style={{
                fontFamily: 'var(--font-serif-title)',
                fontSize: '2.2rem',
                fontWeight: 700,
                color: 'var(--walnut-deep)',
                opacity: 0.85,
                display: 'block',
                marginBottom: '0.75rem'
              }}>
                03
              </span>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>
                Explainable Reading Lists
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
                Discover ranked books with transparent reasoning—categorized into Best Matches, Stretch Discoveries, and Hidden Regional Treasures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Literary Breadth Showcase */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--bg-parchment-accent)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '2.5rem'
          }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-sans-ui)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontSize: '0.78rem',
                color: 'var(--maroon-accent)',
                fontWeight: 600
              }}>
                Curated Seed Selection
              </span>
              <h2 style={{ fontSize: '2.1rem', marginTop: '0.35rem' }}>
                From Civilizational Epics to Modern Voices
              </h2>
            </div>
            <Link to="/explore" className="btn btn-secondary" style={{ backgroundColor: '#fff' }}>
              <span>View All Seed Books</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {featuredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Itihaasa Distinct Highlight Banner */}
      <section style={{ padding: '4.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{
            backgroundColor: '#FCF8F2',
            border: '1px solid #EADBCC',
            borderRadius: 'var(--radius-md)',
            padding: '3rem 2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span className="badge badge-itihaasa" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                  <Scroll size={13} /> Distinct Product Section
                </span>
              </div>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: '#663309' }}>
                Itihaasa: Indic Civilizational Texts
              </h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--ink-secondary)', marginBottom: '1.5rem' }}>
                FableFinds strictly distinguishes classical, scriptural, and civilizational Indic works—the Valmiki Ramayana, Vyasa Mahabharata, and Bhagavad Gita—from modern fictional retellings and popular reinterpretations.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/itihaasa" className="btn" style={{ backgroundColor: '#8C4410', color: '#fff' }}>
                  <Scroll size={16} />
                  <span>Explore Itihaasa Section ({itihaasaCount} Texts)</span>
                </Link>
              </div>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E8DFD5',
              borderRadius: 'var(--radius-sm)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-card)'
            }}>
              <h4 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.1rem', marginBottom: '0.75rem', color: '#8C4410' }}>
                Principles of Itihaasa Classification
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem', color: 'var(--ink-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#8C4410" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Classical Sanskrit sources and authentic editions (e.g. Gita Press, Bhandarkar Institute).</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#8C4410" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Never labelled generically as "Hindu mythology".</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#8C4410" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Modern retellings are kept in the literary fiction catalog and never conflated with Itihaasa.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Indian Languages Section */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto 2.5rem auto' }}>
            <span style={{
              fontFamily: 'var(--font-sans-ui)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontSize: '0.78rem',
              color: 'var(--gold-accent)',
              fontWeight: 600
            }}>
              Civilizational & Multilingual Commitment
            </span>
            <h2 style={{ fontSize: '2.1rem', marginTop: '0.4rem', marginBottom: '0.75rem' }}>
              All 22 Scheduled Indian Languages Supported
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)' }}>
              Language is never used as a crude proxy for intelligence, politics, or genre. Whether you seek classical Tamil, Bengali realism, Kannada modernism, or Hindi classics, your mother tongue is honored.
            </p>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.25rem 2rem',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-medium)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <Languages size={28} color="var(--maroon-accent)" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-serif-title)', fontWeight: 600, fontSize: '1rem', color: 'var(--ink-primary)' }}>
                Filter & Discover by Any Official Language
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--ink-muted)' }}>
                Explore both original language works and authorized translations across traditions.
              </div>
            </div>
            <Link to="/explore" className="btn btn-secondary" style={{ marginLeft: '1rem' }}>
              Filter by Language
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
