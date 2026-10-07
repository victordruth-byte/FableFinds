import { QuizQuestion } from '../types/quiz';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-language',
    category: 'language',
    title: 'In which language(s) do you prefer to experience literature?',
    subtitle: 'Select one or more languages you read or would love to discover translations in.',
    type: 'multi-choice',
    allowSkip: false,
    options: [
      {
        id: 'lang-en',
        label: 'English',
        description: 'Global and translated literary works',
        traitImpact: { languages: ['English'] }
      },
      {
        id: 'lang-hi',
        label: 'Hindi (हिन्दी)',
        description: 'Premchand, Renu, modern Hindi literature & translations',
        traitImpact: { languages: ['Hindi'] }
      },
      {
        id: 'lang-sa',
        label: 'Sanskrit (संस्कृतम्)',
        description: 'Classical Itihaasa, kavya, shlokas, and timeless treatises',
        traitImpact: { languages: ['Sanskrit'] }
      },
      {
        id: 'lang-bn',
        label: 'Bengali (বাংলা)',
        description: 'Tagore, Bibhutibhushan, Sarat Chandra, modern Bengali',
        traitImpact: { languages: ['Bengali'] }
      },
      {
        id: 'lang-ta',
        label: 'Tamil (தமிழ்)',
        description: 'Sangam classics, Kalki, Perumal Murugan, contemporary Tamil',
        traitImpact: { languages: ['Tamil'] }
      },
      {
        id: 'lang-kn',
        label: 'Kannada (ಕನ್ನಡ)',
        description: 'Navya movement, Ananthamurthy, Bendre, Kuvempu',
        traitImpact: { languages: ['Kannada'] }
      },
      {
        id: 'lang-ml',
        label: 'Malayalam (മലയാളം)',
        description: 'Basheer, MT Vasudevan Nair, OV Vijayan, modern fiction',
        traitImpact: { languages: ['Malayalam'] }
      },
      {
        id: 'lang-te',
        label: 'Telugu (తెలుగు)',
        description: 'Classical prabandhas, Chalam, modern Telugu realism',
        traitImpact: { languages: ['Telugu'] }
      },
      {
        id: 'lang-mr',
        label: 'Marathi (मराठी)',
        description: 'Dalit literature, Khandekar, Pu La Deshpande, contemporary',
        traitImpact: { languages: ['Marathi'] }
      },
      {
        id: 'lang-ur',
        label: 'Urdu (اردو)',
        description: 'Ghalib, Manto, Faiz, progressive writers movement',
        traitImpact: { languages: ['Urdu'] }
      }
    ]
  },
  {
    id: 'q-experience',
    category: 'experience',
    title: 'How would you characterize your present reading rhythm?',
    subtitle: 'This helps us tune narrative density without overwhelming or understimulating you.',
    type: 'single-choice',
    allowSkip: false,
    options: [
      {
        id: 'exp-starter',
        label: 'Looking for a refreshing on-ramp',
        description: 'I read occasionally or am getting back into books; I need engaging, swift prose.',
        badge: 'Accessible',
        traitImpact: {
          readingMaturity: 'accessible-starter',
          proseComplexity: 'accessible',
          pace: 'fast'
        }
      },
      {
        id: 'exp-intermediate',
        label: 'Steady and eclectic reader',
        description: 'I read regular fiction and popular non-fiction with comfort and enjoyment.',
        badge: 'Intermediate',
        traitImpact: {
          readingMaturity: 'intermediate',
          proseComplexity: 'moderate',
          pace: 'moderate'
        }
      },
      {
        id: 'exp-seasoned',
        label: 'Devoted, attentive reader',
        description: 'I appreciate substantial literary craft, psychological depth, and complex prose.',
        badge: 'Seasoned',
        traitImpact: {
          readingMaturity: 'seasoned',
          proseComplexity: 'dense',
          pace: 'slow-burn'
        }
      },
      {
        id: 'exp-advanced',
        label: 'Serious literature & classics enthusiast',
        description: 'I am ready for multi-volume epics, rigorous philosophical inquiry, and classical texts.',
        badge: 'Advanced',
        traitImpact: {
          readingMaturity: 'advanced-literary',
          proseComplexity: 'classical-demanding',
          pace: 'slow-burn'
        }
      }
    ]
  },
  {
    id: 'q-narrative',
    category: 'narrative',
    title: 'What draws you deeper into a literary work?',
    subtitle: 'Choose the narrative engine that most reliably sustains your attention.',
    type: 'single-choice',
    allowSkip: false,
    options: [
      {
        id: 'nar-psychological',
        label: 'Intimate psychological interiority',
        description: 'Characters wrestling with their conscience, doubts, memories, and unspoken desires.',
        traitImpact: {
          pace: 'slow-burn',
          philosophicalDepth: 'profound',
          emotionalTones: ['intense', 'contemplative']
        }
      },
      {
        id: 'nar-sweeping',
        label: 'Grand civilizational or historical tapestries',
        description: 'Destinies of dynasties, kingdoms, wars, and social epochs interwoven with human drama.',
        traitImpact: {
          pace: 'slow-burn',
          genres: ['Itihaasa', 'Historical Fiction', 'Literary Epic'],
          philosophicalDepth: 'profound'
        }
      },
      {
        id: 'nar-social',
        label: 'Grounded social observation & everyday human warmth',
        description: 'Authentic village or town life, poignant domestic realities, subtle societal irony.',
        traitImpact: {
          pace: 'moderate',
          genres: ['Social Realism', 'Literary Fiction'],
          emotionalTones: ['comforting', 'melancholic']
        }
      },
      {
        id: 'nar-propulsive',
        label: 'Fast-paced, contemporary stakes & interpersonal friction',
        description: 'High momentum, relatable modern dilemmas, romantic tension, and sharp dialogue.',
        traitImpact: {
          pace: 'fast',
          proseComplexity: 'accessible',
          genres: ['Commercial Fiction', 'Campus Fiction', 'Commercial Romance']
        }
      }
    ]
  },
  {
    id: 'q-prose',
    category: 'prose',
    title: 'What style of language and prose resonates with you?',
    subtitle: 'From crystalline simplicity to ornate classical cadence.',
    type: 'single-choice',
    allowSkip: false,
    options: [
      {
        id: 'prose-accessible',
        label: 'Brisk, transparent, and conversational',
        description: 'Direct language that does not call attention to itself; story and emotion take front stage.',
        traitImpact: {
          proseComplexity: 'accessible'
        }
      },
      {
        id: 'prose-lyrical',
        label: 'Evocative, luminous, and observational',
        description: 'Poetic prose with atmospheric texture, nature descriptions, and quiet precision.',
        traitImpact: {
          proseComplexity: 'moderate'
        }
      },
      {
        id: 'prose-dense',
        label: 'Layered, intellectually dense, and demanding',
        description: 'Long complex periods, philosophical discursions, and psychological interrogation.',
        traitImpact: {
          proseComplexity: 'dense'
        }
      },
      {
        id: 'prose-classical',
        label: 'Archaic grandeur, poetic meter, or classical elevation',
        description: 'Epic Sanskrit shlokas, monumental cadence, and timeless scriptural weight.',
        traitImpact: {
          proseComplexity: 'classical-demanding'
        }
      }
    ]
  },
  {
    id: 'q-emotion',
    category: 'emotion',
    title: 'What emotional climate do you look for in a book right now?',
    subtitle: 'Literature moves us in distinct registers; choose up to two emotional tones.',
    type: 'multi-choice',
    maxSelections: 2,
    allowSkip: false,
    options: [
      {
        id: 'emo-contemplative',
        label: 'Quiet contemplation & philosophical wonder',
        description: 'Lingering stillness, moral questioning, and deep perspective on life.',
        traitImpact: { emotionalTones: ['contemplative'] }
      },
      {
        id: 'emo-uplifting',
        label: 'Spiritually uplifting & inspiring',
        description: 'Clarity, devotion, ethical courage, and civilizational harmony.',
        traitImpact: { emotionalTones: ['spiritually-uplifting'] }
      },
      {
        id: 'emo-intense',
        label: 'Psychologically intense & morally fraught',
        description: 'High-stakes conscience, obsession, ideological tension, and suspense.',
        traitImpact: { emotionalTones: ['intense'] }
      },
      {
        id: 'emo-melancholic',
        label: 'Bittersweet nostalgia & poignant beauty',
        description: 'Fleeting youth, tender sorrow, memory, and the passing of seasons.',
        traitImpact: { emotionalTones: ['melancholic'] }
      },
      {
        id: 'emo-comforting',
        label: 'Warmth, gentle humor, and human camaraderie',
        description: 'Affectionate humor, domestic warmth, and comforting humanity.',
        traitImpact: { emotionalTones: ['comforting'] }
      },
      {
        id: 'emo-romantic',
        label: 'Passionate romance & emotional chemistry',
        description: 'Courtship, longing, cross-cultural friction, and romantic devotion.',
        traitImpact: { emotionalTones: ['romantic'] }
      }
    ]
  },
  {
    id: 'q-philosophy',
    category: 'philosophy',
    title: 'How deep do you like the philosophical or existential undercurrents?',
    subtitle: 'How much do you want the narrative to question life, ethics, and human nature?',
    type: 'single-choice',
    allowSkip: false,
    options: [
      {
        id: 'phil-light',
        label: 'Subtle or experiential',
        description: 'I want an engaging narrative first; themes should arise naturally without heavy debates.',
        traitImpact: { philosophicalDepth: 'light' }
      },
      {
        id: 'phil-moderate',
        label: 'Thoughtful ethical and social dilemmas',
        description: 'Characters facing genuine moral cross-roads, class tensions, and duty.',
        traitImpact: { philosophicalDepth: 'moderate' }
      },
      {
        id: 'phil-profound',
        label: 'Radical existential, metaphysical, and civilizational inquiry',
        description: 'Works that fundamentally interrogate free will, suffering, dharma, and the cosmos.',
        traitImpact: { philosophicalDepth: 'profound' }
      }
    ]
  },
  {
    id: 'q-spirituality',
    category: 'spirituality',
    title: 'What role does spiritual, sacred, or metaphysical inquiry play in your reading?',
    subtitle: 'FableFinds respects both rigorous secular humanism and sacred civilizational traditions.',
    type: 'single-choice',
    allowSkip: false,
    options: [
      {
        id: 'spir-sacred',
        label: 'Devoted interest in sacred Indic traditions & Itihaasa',
        description: 'Deep reverence for classical texts, the Ramayana, Mahabharata, and Gita.',
        traitImpact: {
          spirituality: 'sacred-devotional',
          genres: ['Itihaasa', 'Sacred Classical']
        }
      },
      {
        id: 'spir-metaphysical',
        label: 'Philosophical mysticism & existential wonder',
        description: 'Exploring karma, destiny, cosmic solitude, and spiritual transcendence without rigid dogma.',
        traitImpact: {
          spirituality: 'metaphysical'
        }
      },
      {
        id: 'spir-secular',
        label: 'Grounded secular realism & rational humanism',
        description: 'Focus on worldly social forces, psychology, politics, science, and human agency.',
        traitImpact: {
          spirituality: 'secular'
        }
      },
      {
        id: 'spir-open',
        label: 'Fluid & welcoming to all traditions',
        description: 'I enjoy discovering both sacred epics and secular masterworks on their own literary merits.',
        traitImpact: {
          spirituality: 'philosophical'
        }
      }
    ]
  },
  {
    id: 'q-worldview',
    category: 'worldview',
    title: 'How do you prefer books to approach worldview and social questions?',
    subtitle: 'Descriptive preference to ensure recommendations align with or thoughtfully challenge your outlook.',
    type: 'single-choice',
    allowSkip: true,
    options: [
      {
        id: 'wv-universalist',
        label: 'Universalist humanism & pluralism',
        description: 'Emphasizing common human dignity across nations, cultures, and traditions.',
        traitImpact: { worldviews: ['universalist', 'pluralist', 'humanist'] }
      },
      {
        id: 'wv-traditionalist',
        label: 'Civilizational roots & moral tradition',
        description: 'Honoring heritage, dharma, historical continuity, and timeless ethical structures.',
        traitImpact: { worldviews: ['traditionalist'] }
      },
      {
        id: 'wv-social-realist',
        label: 'Social justice, reform, and subaltern voices',
        description: 'Examining caste, class inequities, state power, and agrarian struggles.',
        traitImpact: { worldviews: ['social-realist', 'reformist', 'socialist'] }
      },
      {
        id: 'wv-existentialist',
        label: 'Individual autonomy & existential skepticism',
        description: 'Challenging orthodoxies, exploring personal freedom and the absurdity of conventions.',
        traitImpact: { worldviews: ['existentialist', 'liberal'] }
      },
      {
        id: 'wv-any',
        label: 'No preference / Surprise me with contrasting viewpoints',
        description: 'I value diverse ideological perspectives if the literary craftsmanship is exceptional.',
        traitImpact: {}
      }
    ]
  },
  {
    id: 'q-ambition',
    category: 'ambition',
    title: 'What is your primary reading ambition right now?',
    subtitle: 'Tell us how you would like this discovery journey to guide you.',
    type: 'single-choice',
    allowSkip: false,
    options: [
      {
        id: 'amb-enjoyment',
        label: 'Delight, emotional absorption, and decompression',
        description: 'Immersive stories that give joy and emotional connection without exhausting study.',
        traitImpact: { readingAmbition: 'comfort-enjoyment' }
      },
      {
        id: 'amb-broaden',
        label: 'Broaden horizons across regional and world voices',
        description: 'Discover translated regional Indian gems and international literature I haven’t touched yet.',
        traitImpact: { readingAmbition: 'broadening-horizons' }
      },
      {
        id: 'amb-elevate',
        label: 'Deliberate literary elevation & civilizational depth',
        description: 'Tackle demanding masterworks, sacred epics, and timeless philosophical milestones.',
        traitImpact: { readingAmbition: 'rigorous-elevation' }
      }
    ]
  }
];
