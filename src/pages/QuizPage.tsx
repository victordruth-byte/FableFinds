import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Sparkles, BookOpen, RotateCcw, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { QuizResponseMap, QuizSessionState } from '../types/quiz';
import { storageService } from '../services/storageService';
import { profileService } from '../services/profileService';

export const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<QuizResponseMap>({});
  const [isStarted, setIsStarted] = useState<boolean>(false);

  // Load existing session progress if any
  useEffect(() => {
    const saved = storageService.getQuizState();
    if (saved && !saved.isCompleted && Object.keys(saved.answers).length > 0) {
      setAnswers(saved.answers);
      setCurrentIndex(Math.min(saved.currentQuestionIndex, QUIZ_QUESTIONS.length - 1));
      setIsStarted(true);
    }
  }, []);

  // Save session state to localStorage on modification
  const persistProgress = (newAnswers: QuizResponseMap, newIndex: number) => {
    const state: QuizSessionState = {
      currentQuestionIndex: newIndex,
      answers: newAnswers,
      isCompleted: false,
      startedAt: new Date().toISOString(),
      version: '1.0'
    };
    storageService.saveQuizState(state);
  };

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const selectedOptions = answers[currentQuestion?.id] || [];

  const handleSelectOption = (optionId: string) => {
    const q = currentQuestion;
    let updatedSelection: string[] = [];

    if (q.type === 'single-choice') {
      updatedSelection = [optionId];
    } else {
      // Multi-choice
      if (selectedOptions.includes(optionId)) {
        updatedSelection = selectedOptions.filter(id => id !== optionId);
      } else {
        if (q.maxSelections && selectedOptions.length >= q.maxSelections) {
          // Replace or prevent
          updatedSelection = [...selectedOptions.slice(1), optionId];
        } else {
          updatedSelection = [...selectedOptions, optionId];
        }
      }
    }

    const newAnswers = {
      ...answers,
      [q.id]: updatedSelection
    };
    setAnswers(newAnswers);
    persistProgress(newAnswers, currentIndex);
  };

  const handleNext = () => {
    // If not selected and not skippable, default to first option
    if (selectedOptions.length === 0 && !currentQuestion.allowSkip) {
      const defaultOption = [currentQuestion.options[0].id];
      const newAnswers = { ...answers, [currentQuestion.id]: defaultOption };
      setAnswers(newAnswers);
      persistProgress(newAnswers, currentIndex);
    }

    if (currentIndex < totalQuestions - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      persistProgress(answers, nextIdx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Complete Quiz
      finishQuiz();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      persistProgress(answers, prevIdx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSkip = () => {
    // Mark as skipped/not-sure
    const newAnswers = { ...answers, [currentQuestion.id]: ['skip'] };
    setAnswers(newAnswers);
    if (currentIndex < totalQuestions - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      persistProgress(newAnswers, nextIdx);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    // Generate profile
    const profile = profileService.generateReaderProfile(answers);
    storageService.saveReaderProfile(profile);
    
    // Mark quiz completed
    const completedState: QuizSessionState = {
      currentQuestionIndex: totalQuestions - 1,
      answers,
      isCompleted: true,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      version: '1.0'
    };
    storageService.saveQuizState(completedState);

    // Notify listeners
    window.dispatchEvent(new CustomEvent('fablefinds:profile_changed'));

    // Navigate to profile page
    navigate('/profile');
  };

  const handleStartFresh = () => {
    storageService.clearQuizState();
    setAnswers({});
    setCurrentIndex(0);
    setIsStarted(true);
  };

  // Welcome Screen before quiz starts
  if (!isStarted) {
    return (
      <div className="container-narrow animate-fade-in" style={{ padding: '4rem 1.5rem 6rem 1.5rem' }}>
        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '3.5rem 2.5rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-parchment-accent)',
            color: 'var(--walnut-deep)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            border: '1px solid var(--border-medium)'
          }}>
            <BookOpen size={30} />
          </div>

          <span style={{
            fontFamily: 'var(--font-sans-ui)',
            fontSize: '0.82rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--gold-accent)',
            fontWeight: 600
          }}>
            Literary Consultation
          </span>

          <h1 style={{
            fontSize: '2.5rem',
            marginTop: '0.5rem',
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>
            Discover your true reading temperament.
          </h1>

          <p style={{
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: 'var(--ink-secondary)',
            maxWidth: '560px',
            margin: '0 auto 2.5rem auto'
          }}>
            This consultation takes approximately 3 minutes. It investigates your prose tolerance, pacing appetite, emotional depth, worldview, and civilizational interests without shallow clichés.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <button
              onClick={() => setIsStarted(true)}
              className="btn btn-primary"
              style={{ padding: '0.9rem 2.5rem', fontSize: '1.05rem' }}
            >
              <span>Begin Consultation</span>
              <ArrowRight size={18} />
            </button>

            <span style={{ fontSize: '0.84rem', color: 'var(--ink-muted)' }}>
              10 thoughtful questions • Instant profile generation
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-narrow animate-fade-in" style={{ padding: '3rem 1.5rem 5rem 1.5rem' }}>
      {/* Quiz Progress Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span style={{
            fontFamily: 'var(--font-sans-ui)',
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--gold-accent)'
          }}>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span style={{
            fontFamily: 'var(--font-sans-ui)',
            fontSize: '0.85rem',
            color: 'var(--ink-muted)'
          }}>
            {progressPercent}% Complete
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div style={{
          height: '6px',
          width: '100%',
          backgroundColor: 'var(--bg-parchment-deep)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            width: `${progressPercent}%`,
            backgroundColor: 'var(--walnut-deep)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Main Question Card */}
      <div style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '2.5rem 2rem',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '2rem'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.9rem',
            lineHeight: 1.3,
            color: 'var(--ink-primary)',
            marginBottom: '0.5rem'
          }}>
            {currentQuestion.title}
          </h2>
          <p style={{
            fontSize: '1.02rem',
            color: 'var(--ink-secondary)',
            lineHeight: 1.5
          }}>
            {currentQuestion.subtitle}
          </p>
          {currentQuestion.type === 'multi-choice' && (
            <span style={{
              display: 'inline-block',
              marginTop: '0.5rem',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-sans-ui)',
              color: 'var(--maroon-accent)',
              backgroundColor: 'var(--maroon-surface)',
              padding: '0.2rem 0.55rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              Select {currentQuestion.maxSelections ? `up to ${currentQuestion.maxSelections}` : 'all that apply'}
            </span>
          )}
        </div>

        {/* Answer Options Grid */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          marginBottom: '2.5rem'
        }}>
          {currentQuestion.options.map(option => {
            const isSelected = selectedOptions.includes(option.id);

            return (
              <div
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                style={{
                  backgroundColor: isSelected ? '#FDFBF7' : '#FFFFFF',
                  border: isSelected ? '2px solid var(--walnut-deep)' : '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.15rem 1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 2px 8px rgba(50, 31, 23, 0.08)' : 'none'
                }}
                className="quiz-option-item"
              >
                {/* Radio / Checkbox Indicator */}
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: currentQuestion.type === 'single-choice' ? '50%' : 'var(--radius-sm)',
                  border: isSelected ? '2px solid var(--walnut-deep)' : '2px solid var(--border-bold)',
                  backgroundColor: isSelected ? 'var(--walnut-deep)' : '#FFFFFF',
                  color: '#FAF6EE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                  transition: 'all 0.15s ease'
                }}>
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </div>

                {/* Option text */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-sans-ui)',
                      fontWeight: isSelected ? 700 : 600,
                      fontSize: '0.98rem',
                      color: 'var(--ink-primary)'
                    }}>
                      {option.label}
                    </span>
                    {option.badge && (
                      <span className="badge badge-gold" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>
                        {option.badge}
                      </span>
                    )}
                  </div>
                  {option.description && (
                    <p style={{
                      fontSize: '0.88rem',
                      color: 'var(--ink-secondary)',
                      lineHeight: 1.45,
                      margin: 0
                    }}>
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            {currentIndex > 0 ? (
              <button
                onClick={handleBack}
                className="btn btn-secondary"
                style={{ padding: '0.65rem 1.2rem' }}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            ) : (
              <button
                onClick={handleStartFresh}
                className="btn btn-ghost"
                style={{ fontSize: '0.85rem' }}
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {currentQuestion.allowSkip && (
              <button
                onClick={handleSkip}
                className="btn btn-ghost"
                style={{ fontSize: '0.88rem', color: 'var(--ink-muted)' }}
              >
                <span>Skip / Not Sure</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.8rem', fontSize: '0.98rem' }}
            >
              <span>{currentIndex === totalQuestions - 1 ? 'Generate Literary Profile' : 'Continue'}</span>
              {currentIndex === totalQuestions - 1 ? <Sparkles size={16} /> : <ArrowRight size={16} />}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .quiz-option-item:hover {
          border-color: var(--walnut-deep) !important;
          background-color: var(--bg-surface) !important;
        }
      `}</style>
    </div>
  );
};
