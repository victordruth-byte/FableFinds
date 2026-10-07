import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Bookmark, Compass, Sparkles, Feather, Menu, X, Scroll } from 'lucide-react';
import { storageService } from '../services/storageService';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [savedCount, setSavedCount] = useState<number>(0);
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateStats = () => {
      setSavedCount(storageService.getSavedBookIds().length);
      setHasProfile(!!storageService.getReaderProfile());
    };

    updateStats();
    // Listen for storage events across tabs or local mutations
    window.addEventListener('storage', updateStats);
    // Custom event to trigger re-reads inside current window
    window.addEventListener('fablefinds:saved_changed', updateStats);
    window.addEventListener('fablefinds:profile_changed', updateStats);

    return () => {
      window.removeEventListener('storage', updateStats);
      window.removeEventListener('fablefinds:saved_changed', updateStats);
      window.removeEventListener('fablefinds:profile_changed', updateStats);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header style={{
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'var(--header-height)'
      }}>
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--walnut-deep)',
            color: 'var(--gold-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(50, 31, 23, 0.15)'
          }}>
            <Feather size={20} />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-serif-title)',
              fontSize: '1.4rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: 'var(--ink-primary)',
              display: 'block',
              lineHeight: 1.1
            }}>
              FableFinds
            </span>
            <span style={{
              fontFamily: 'var(--font-sans-ui)',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--ink-muted)',
              display: 'block'
            }}>
              Literary Discovery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.75rem'
        }} className="desktop-nav">
          <Link to="/" style={{
            fontFamily: 'var(--font-sans-ui)',
            fontSize: '0.92rem',
            fontWeight: isActive('/') ? 600 : 500,
            color: isActive('/') ? 'var(--maroon-accent)' : 'var(--ink-secondary)',
            borderBottom: isActive('/') ? '2px solid var(--maroon-accent)' : '2px solid transparent',
            paddingBottom: '4px',
            transition: 'color 0.15s ease'
          }}>
            Home
          </Link>

          <Link to="/explore" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontFamily: 'var(--font-sans-ui)',
            fontSize: '0.92rem',
            fontWeight: isActive('/explore') ? 600 : 500,
            color: isActive('/explore') ? 'var(--maroon-accent)' : 'var(--ink-secondary)',
            borderBottom: isActive('/explore') ? '2px solid var(--maroon-accent)' : '2px solid transparent',
            paddingBottom: '4px'
          }}>
            <Compass size={16} />
            Explore
          </Link>

          <Link to="/itihaasa" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontFamily: 'var(--font-sans-ui)',
            fontSize: '0.92rem',
            fontWeight: isActive('/itihaasa') ? 600 : 500,
            color: isActive('/itihaasa') ? 'var(--maroon-accent)' : '#8C4410',
            borderBottom: isActive('/itihaasa') ? '2px solid #8C4410' : '2px solid transparent',
            paddingBottom: '4px'
          }}>
            <Scroll size={16} />
            Itihaasa
          </Link>

          {hasProfile && (
            <>
              <Link to="/recommendations" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontFamily: 'var(--font-sans-ui)',
                fontSize: '0.92rem',
                fontWeight: isActive('/recommendations') ? 600 : 500,
                color: isActive('/recommendations') ? 'var(--maroon-accent)' : 'var(--ink-secondary)',
                borderBottom: isActive('/recommendations') ? '2px solid var(--maroon-accent)' : '2px solid transparent',
                paddingBottom: '4px'
              }}>
                <Sparkles size={16} color="var(--gold-accent)" />
                Recommendations
              </Link>

              <Link to="/profile" style={{
                fontFamily: 'var(--font-sans-ui)',
                fontSize: '0.92rem',
                fontWeight: isActive('/profile') ? 600 : 500,
                color: isActive('/profile') ? 'var(--maroon-accent)' : 'var(--ink-secondary)',
                borderBottom: isActive('/profile') ? '2px solid var(--maroon-accent)' : '2px solid transparent',
                paddingBottom: '4px'
              }}>
                Profile
              </Link>
            </>
          )}

          <Link to="/about" style={{
            fontFamily: 'var(--font-sans-ui)',
            fontSize: '0.92rem',
            fontWeight: isActive('/about') ? 600 : 500,
            color: isActive('/about') ? 'var(--maroon-accent)' : 'var(--ink-secondary)',
            borderBottom: isActive('/about') ? '2px solid var(--maroon-accent)' : '2px solid transparent',
            paddingBottom: '4px'
          }}>
            About
          </Link>

          <Link to="/saved" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-sans-ui)',
            fontSize: '0.92rem',
            fontWeight: 500,
            color: isActive('/saved') ? 'var(--maroon-accent)' : 'var(--ink-secondary)',
            backgroundColor: 'var(--bg-parchment-accent)',
            padding: '0.4rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)'
          }}>
            <Bookmark size={15} />
            <span>Saved</span>
            {savedCount > 0 && (
              <span style={{
                backgroundColor: 'var(--maroon-accent)',
                color: '#fff',
                fontSize: '0.72rem',
                borderRadius: 'var(--radius-full)',
                padding: '0.1rem 0.45rem',
                fontWeight: 600
              }}>
                {savedCount}
              </span>
            )}
          </Link>

          {/* Quiz Action CTA */}
          <Link to="/quiz" className="btn btn-primary" style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }}>
            <BookOpen size={16} />
            <span>{hasProfile ? 'Retake Quiz' : 'Take Literary Quiz'}</span>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            color: 'var(--ink-primary)',
            padding: '0.5rem'
          }}
          className="mobile-toggle"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-subtle)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <Link to="/" style={{ padding: '0.5rem 0', fontWeight: 500 }}>Home</Link>
          <Link to="/explore" style={{ padding: '0.5rem 0', fontWeight: 500 }}>Explore Repository</Link>
          <Link to="/itihaasa" style={{ padding: '0.5rem 0', fontWeight: 500, color: '#8C4410' }}>Itihaasa (Indic Epics)</Link>
          {hasProfile && (
            <>
              <Link to="/recommendations" style={{ padding: '0.5rem 0', fontWeight: 500, color: 'var(--maroon-accent)' }}>Your Recommendations</Link>
              <Link to="/profile" style={{ padding: '0.5rem 0', fontWeight: 500 }}>Reader Profile</Link>
            </>
          )}
          <Link to="/saved" style={{ padding: '0.5rem 0', fontWeight: 500 }}>Saved Books ({savedCount})</Link>
          <Link to="/about" style={{ padding: '0.5rem 0', fontWeight: 500 }}>About & Philosophy</Link>
          <Link to="/quiz" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
            <BookOpen size={16} />
            <span>{hasProfile ? 'Retake Quiz' : 'Take Literary Quiz'}</span>
          </Link>
        </div>
      )}

      {/* Inline styles for responsive header */}
      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};
