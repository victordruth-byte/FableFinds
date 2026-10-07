import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, BookOpen, Compass, Scroll, ShieldCheck, Heart } from 'lucide-react';
import { SCHEDULED_INDIAN_LANGUAGES } from '../data/languages';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--walnut-surface)',
      color: '#E8DFD5',
      marginTop: 'auto',
      borderTop: '1px solid rgba(184, 139, 42, 0.25)',
      padding: '4rem 0 2.5rem 0'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand & Vision */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(184, 139, 42, 0.2)',
                color: 'var(--gold-glow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--gold-accent)'
              }}>
                <Feather size={18} />
              </div>
              <span style={{
                fontFamily: 'var(--font-serif-title)',
                fontSize: '1.35rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: '#FAF6EE'
              }}>
                FableFinds
              </span>
            </div>
            <p style={{
              color: '#BFAFA4',
              fontSize: '0.94rem',
              lineHeight: 1.6,
              marginBottom: '1.25rem'
            }}>
              A hyper-personalized literary discovery platform built on deep reader profiling, philosophical resonance, and respectful curation of civilizational literature.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.8rem',
              color: 'var(--gold-glow)',
              backgroundColor: 'rgba(184, 139, 42, 0.1)',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(184, 139, 42, 0.3)'
            }}>
              <ShieldCheck size={14} />
              <span>Deterministic & Explainable Recommendations</span>
            </div>
          </div>

          {/* Navigation Discovery */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-serif-title)',
              color: '#FAF6EE',
              fontSize: '1.05rem',
              letterSpacing: '0.05em',
              marginBottom: '1.25rem'
            }}>
              Curated Shelves
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.92rem' }}>
              <li>
                <Link to="/explore" style={{ color: '#D5C7BB', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Compass size={14} /> Comprehensive Book Repository
                </Link>
              </li>
              <li>
                <Link to="/itihaasa" style={{ color: '#E8B67C', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Scroll size={14} /> Itihaasa (Indic Epics & Classics)
                </Link>
              </li>
              <li>
                <Link to="/quiz" style={{ color: '#D5C7BB', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <BookOpen size={14} /> Literary Profiling Consultation
                </Link>
              </li>
              <li>
                <Link to="/saved" style={{ color: '#D5C7BB', transition: 'color 0.2s' }}>
                  Saved Reading List
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: '#D5C7BB', transition: 'color 0.2s' }}>
                  Product & Methodology Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Civilizational & Multilingual Commitment */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-serif-title)',
              color: '#FAF6EE',
              fontSize: '1.05rem',
              letterSpacing: '0.05em',
              marginBottom: '1.25rem'
            }}>
              Multilingual Breadth
            </h4>
            <p style={{ color: '#BFAFA4', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              Built to support all <strong>22 officially scheduled Indian languages</strong> as direct literary equals, without reducing regional voice to cultural stereotypes.
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem',
              maxHeight: '110px',
              overflowY: 'auto',
              padding: '0.5rem',
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: 'var(--radius-sm)'
            }}>
              {SCHEDULED_INDIAN_LANGUAGES.map(lang => (
                <span key={lang.code} style={{
                  fontSize: '0.72rem',
                  color: '#C8BEB5',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  padding: '0.15rem 0.4rem',
                  borderRadius: '3px'
                }}>
                  {lang.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.84rem',
          color: '#9E8F84'
        }}>
          <div>
            © {new Date().getFullYear()} FableFinds. Stories that understand you.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Local & Private (Client-Side Persistence)</span>
            <span>Itihaasa Verified Metadata</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
