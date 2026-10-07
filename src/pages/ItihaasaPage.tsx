import React from 'react';
import { Link } from 'react-router-dom';
import { Scroll, ShieldCheck, BookOpen, Compass, CheckCircle2, AlertCircle } from 'lucide-react';
import { bookService } from '../services/bookService';
import { BookCard } from '../components/BookCard';

export const ItihaasaPage: React.FC = () => {
  const itihaasaBooks = bookService.getItihaasaBooks();

  return (
    <div className="container animate-fade-in" style={{ padding: '3.5rem 1.5rem 6rem 1.5rem' }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: '#FCF8F2',
        border: '1px solid #EADBCC',
        borderRadius: 'var(--radius-md)',
        padding: '3.5rem 3rem',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '3rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '820px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="badge badge-itihaasa" style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}>
              <Scroll size={14} /> Dedicated Civilizational Section
            </span>
            <span style={{ fontSize: '0.84rem', color: '#8C4410', fontWeight: 600 }}>
              Indic Classical & Scriptural Heritage
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
            marginBottom: '1rem',
            color: '#5C2D0C',
            lineHeight: 1.15
          }}>
            Itihaasa: Thus Indeed It Was
          </h1>

          <p style={{
            fontSize: '1.15rem',
            lineHeight: 1.7,
            color: '#4A3423',
            marginBottom: '1.5rem'
          }}>
            The Sanskrit term <em>Itihaasa</em> (इतिहास — "thus indeed it was") denotes the foundational civilizational narratives of India, centered upon the Ramayana and the Mahabharata (including the Bhagavad Gita).
          </p>

          <p style={{
            fontSize: '0.98rem',
            lineHeight: 1.65,
            color: '#634E3E'
          }}>
            FableFinds respects the civilizational and spiritual integrity of these works. Here you will find authentic classical texts, shloka translations, and traditional editions from venerated institutions such as Gita Press and the Bhandarkar Oriental Research Institute.
          </p>
        </div>
      </div>

      {/* Distinction & Boundaries Callout Box */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3.5rem'
      }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5D8CA',
          borderRadius: 'var(--radius-sm)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <CheckCircle2 size={18} color="#8C4410" />
            <h3 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.1rem', color: '#8C4410' }}>
              What Is Included in Itihaasa
            </h3>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.6, margin: 0 }}>
            Classical epics, canonical Sanskrit scripture, traditional commentaries, and authentic verse-by-verse editions preserving the moral and philosophical gravity of Sanatana Dharma.
          </p>
        </div>

        <div style={{
          backgroundColor: '#FAF7F5',
          border: '1px solid #E2D7D0',
          borderRadius: 'var(--radius-sm)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <AlertCircle size={18} color="var(--maroon-accent)" />
            <h3 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.1rem', color: 'var(--maroon-accent)' }}>
              Strict Separation: Modern Retellings
            </h3>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.6, margin: 0 }}>
            Contemporary fictional retellings, novelized reinterpretations, and commercial mytho-fiction are cataloged separately under general literary fiction and are <strong>never</strong> conflated with Itihaasa.
          </p>
        </div>
      </div>

      {/* Catalog Grid */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-sans-ui)',
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--gold-accent)',
              fontWeight: 600
            }}>
              Curated Canonical Works
            </span>
            <h2 style={{ fontSize: '1.9rem', marginTop: '0.2rem' }}>
              Itihaasa Repository Collection
            </h2>
          </div>
          <span className="badge badge-itihaasa">
            {itihaasaBooks.length} Monumental Works
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.75rem'
        }}>
          {itihaasaBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      {/* Link to explore broader catalog */}
      <div style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        backgroundColor: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        marginTop: '3.5rem'
      }}>
        <h3 style={{ fontFamily: 'var(--font-serif-title)', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
          Explore the Broader Indian & World Literary Catalog
        </h3>
        <p style={{ fontSize: '0.96rem', color: 'var(--ink-secondary)', marginBottom: '1.5rem', maxWidth: '560px', margin: '0 auto 1.5rem auto' }}>
          Discover our 22 scheduled Indian languages, translated masterworks, and world classics.
        </p>
        <Link to="/explore" className="btn btn-secondary">
          <Compass size={16} />
          <span>Open Full Explore Repository</span>
        </Link>
      </div>
    </div>
  );
};
