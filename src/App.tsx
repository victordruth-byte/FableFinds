import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import { ProfilePage } from './pages/ProfilePage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { ExplorePage } from './pages/ExplorePage';
import { BookDetailPage } from './pages/BookDetailPage';
import { ItihaasaPage } from './pages/ItihaasaPage';
import { AboutPage } from './pages/AboutPage';
import { SavedBooksPage } from './pages/SavedBooksPage';
import { EmptyState } from './components/EmptyState';

// Automatically scroll to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      <Navbar />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
          <Route path="/itihaasa" element={<ItihaasaPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/saved" element={<SavedBooksPage />} />
          {/* Catch-all 404 */}
          <Route path="*" element={
            <div className="container" style={{ padding: '6rem 1.5rem' }}>
              <EmptyState
                title="Page Not Found"
                description="The literary corner you are looking for does not exist or has been relocated."
                actionLabel="Return Home"
                actionLink="/"
                icon="compass"
              />
            </div>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
