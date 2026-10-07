import { QuizResponseMap } from '../types/quiz';
import { ReaderProfile, DimensionScore } from '../types/profile';
import { ProseComplexity, ReadingMaturity, EmotionalTone } from '../types/book';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

export const profileService = {
  generateReaderProfile(answers: QuizResponseMap): ReaderProfile {
    // 1. Language answers
    const langAnswers = answers['q-language'] || ['lang-en'];
    const primaryLanguages: string[] = [];
    const langMap: Record<string, string> = {
      'lang-en': 'English',
      'lang-hi': 'Hindi',
      'lang-sa': 'Sanskrit',
      'lang-bn': 'Bengali',
      'lang-ta': 'Tamil',
      'lang-kn': 'Kannada',
      'lang-ml': 'Malayalam',
      'lang-te': 'Telugu',
      'lang-mr': 'Marathi',
      'lang-ur': 'Urdu'
    };
    langAnswers.forEach(id => {
      if (langMap[id]) primaryLanguages.push(langMap[id]);
    });
    if (primaryLanguages.length === 0) primaryLanguages.push('English');

    // 2. Reading Experience
    const expAnswer = (answers['q-experience'] || ['exp-intermediate'])[0];
    let readingMaturity: ReadingMaturity = 'intermediate';
    let baseMaturityScore = 55;
    if (expAnswer === 'exp-starter') {
      readingMaturity = 'accessible-starter';
      baseMaturityScore = 25;
    } else if (expAnswer === 'exp-intermediate') {
      readingMaturity = 'intermediate';
      baseMaturityScore = 55;
    } else if (expAnswer === 'exp-seasoned') {
      readingMaturity = 'seasoned';
      baseMaturityScore = 78;
    } else if (expAnswer === 'exp-advanced') {
      readingMaturity = 'advanced-literary';
      baseMaturityScore = 95;
    }

    // 3. Narrative focus
    const narAnswer = (answers['q-narrative'] || ['nar-psychological'])[0];
    let pacePreference = 'moderate';
    if (narAnswer === 'nar-psychological') pacePreference = 'slow-burn';
    else if (narAnswer === 'nar-sweeping') pacePreference = 'slow-burn';
    else if (narAnswer === 'nar-social') pacePreference = 'moderate';
    else if (narAnswer === 'nar-propulsive') pacePreference = 'fast';

    // 4. Prose tolerance
    const proseAnswer = (answers['q-prose'] || ['prose-lyrical'])[0];
    let proseTolerance: ProseComplexity = 'moderate';
    let proseScore = 60;
    if (proseAnswer === 'prose-accessible') {
      proseTolerance = 'accessible';
      proseScore = 30;
    } else if (proseAnswer === 'prose-lyrical') {
      proseTolerance = 'moderate';
      proseScore = 60;
    } else if (proseAnswer === 'prose-dense') {
      proseTolerance = 'dense';
      proseScore = 85;
    } else if (proseAnswer === 'prose-classical') {
      proseTolerance = 'classical-demanding';
      proseScore = 95;
    }

    // 5. Emotional Appetite
    const emoAnswers = answers['q-emotion'] || ['emo-contemplative'];
    const emotionalAppetite: EmotionalTone[] = [];
    const emoScoreMap: Record<string, EmotionalTone> = {
      'emo-contemplative': 'contemplative',
      'emo-uplifting': 'spiritually-uplifting',
      'emo-intense': 'intense',
      'emo-melancholic': 'melancholic',
      'emo-comforting': 'comforting',
      'emo-romantic': 'romantic'
    };
    emoAnswers.forEach(id => {
      if (emoScoreMap[id]) emotionalAppetite.push(emoScoreMap[id]);
    });
    if (emotionalAppetite.length === 0) emotionalAppetite.push('contemplative');

    // 6. Philosophical Depth
    const philAnswer = (answers['q-philosophy'] || ['phil-moderate'])[0];
    let philosophicalInclination = 'moderate';
    let philScore = 55;
    if (philAnswer === 'phil-light') {
      philosophicalInclination = 'light';
      philScore = 25;
    } else if (philAnswer === 'phil-moderate') {
      philosophicalInclination = 'moderate';
      philScore = 60;
    } else if (philAnswer === 'phil-profound') {
      philosophicalInclination = 'profound';
      philScore = 92;
    }

    // 7. Spirituality
    const spirAnswer = (answers['q-spirituality'] || ['spir-open'])[0];
    let spiritualOrientation = 'philosophical';
    let itihaasaAffinityScore = 40;
    if (spirAnswer === 'spir-sacred') {
      spiritualOrientation = 'sacred-devotional';
      itihaasaAffinityScore = 95;
    } else if (spirAnswer === 'spir-metaphysical') {
      spiritualOrientation = 'metaphysical';
      itihaasaAffinityScore = 75;
    } else if (spirAnswer === 'spir-secular') {
      spiritualOrientation = 'secular';
      itihaasaAffinityScore = 20;
    } else {
      spiritualOrientation = 'philosophical';
      itihaasaAffinityScore = 60;
    }

    // 8. Worldview
    const wvAnswer = (answers['q-worldview'] || ['wv-any'])[0];
    let worldviewStance = 'Eclectic & Open';
    if (wvAnswer === 'wv-universalist') worldviewStance = 'Universalist Humanism';
    else if (wvAnswer === 'wv-traditionalist') worldviewStance = 'Civilizational & Traditionalist';
    else if (wvAnswer === 'wv-social-realist') worldviewStance = 'Social Realist & Reformist';
    else if (wvAnswer === 'wv-existentialist') worldviewStance = 'Existential & Individual Skepticism';

    // 9. Ambition
    const ambAnswer = (answers['q-ambition'] || ['amb-broaden'])[0];
    let readingAmbition = 'Broadening Horizons';
    if (ambAnswer === 'amb-enjoyment') readingAmbition = 'Comfort & Emotional Delight';
    else if (ambAnswer === 'amb-broaden') readingAmbition = 'Broadening Regional & World Horizons';
    else if (ambAnswer === 'amb-elevate') readingAmbition = 'Rigorous Literary & Civilizational Elevation';

    // Derive Archetype and Narrative Title
    let title = 'The Inquiring Reader';
    let archetype = 'Eclectic Explorer';
    let narrativeSummary = '';
    let starterPath = '';
    let stretchPath = '';

    if (spiritualOrientation === 'sacred-devotional' || (itihaasaAffinityScore > 80 && philScore > 70)) {
      title = 'The Civilizational Seeker';
      archetype = 'Seeker of Dharmic Memory & Epics';
      narrativeSummary = 'You view literature as a living bridge to timeless wisdom and civilizational grounding. You gravitate toward sacred Indic narratives, ethical gravity, and profound spiritual clarity.';
      starterPath = 'Begin with the foundational dialogues of Srimad Bhagavad Gita and the lyrical epic majesty of the Valmiki Ramayana.';
      stretchPath = 'Delve into the multi-volume Sanskrit Mahabharata or explore 19th-century philosophical epics like Tolstoy’s War and Peace.';
    } else if (philScore >= 80 && (proseTolerance === 'dense' || proseTolerance === 'classical-demanding')) {
      title = 'The Philosophical Inquirer';
      archetype = 'Psychological & Existential Seeker';
      narrativeSummary = 'You demand serious intellectual nourishment from your reading. You cherish dense prose, intense moral examinations, and psychological depths where human conscience is tested.';
      starterPath = 'Begin with Dostoevsky’s Crime and Punishment or Tagore’s Gora, where moral ideas collide with raw human passion.';
      stretchPath = 'Challenge yourself with Dostoevsky’s The Brothers Karamazov or U.R. Ananthamurthy’s dense modernist classic Samskara.';
    } else if (wvAnswer === 'wv-social-realist' || narAnswer === 'nar-social') {
      title = 'The Conscientious Humanist';
      archetype = 'Chronicler of Social Realities';
      narrativeSummary = 'Your heart lies with authentic human stories, social justice, and the dignity of ordinary lives. You are drawn to unpretentious yet powerful prose that captures village warmth, struggle, and resilience.';
      starterPath = 'Munshi Premchand’s Godaan and Basheer’s Pathummayude Aadu will immediately resonate with their honest social warmth.';
      stretchPath = 'Venture into Mahasweta Devi’s unflinching Mother of 1084 or Perumal Murugan’s rural allegorical fiction Poonachi.';
    } else if (proseTolerance === 'accessible' && pacePreference === 'fast') {
      title = 'The Contemporary Voyager';
      archetype = 'Curious Modern Reader';
      narrativeSummary = 'You love swift, energetic storytelling that mirrors contemporary dilemmas, youthful ambition, and vibrant emotional stakes without getting bogged down in archaic prose.';
      starterPath = 'Enjoy Chetan Bhagat’s Five Point Someone or Durjoy Datta’s emotional modern fiction for swift, relatable engagement.';
      stretchPath = 'Try Kazuo Ishiguro or R.K. Narayan’s The Guide—crisp, accessible language that introduces deeper literary subtlety.';
    } else if (emotionalAppetite.includes('melancholic') || emotionalAppetite.includes('romantic')) {
      title = 'The Poetic Contemplative';
      archetype = 'Seeker of Lyrical Atmosphere & Memory';
      narrativeSummary = 'You read for the ineffable: bittersweet nostalgia, exquisite pastoral imagery, and the quiet beauty of human affection through time.';
      starterPath = 'Bibhutibhushan’s Pather Panchali or Jane Austen’s Pride and Prejudice will delight your sensory and romantic sensibilities.';
      stretchPath = 'Experience the haunting magical realism of Gabriel García Márquez’s One Hundred Years of Solitude or Ishiguro’s The Remains of the Day.';
    } else {
      title = 'The Discerning Bibliophile';
      archetype = 'Balanced Literary Connoisseur';
      narrativeSummary = 'You bring a well-rounded appetite to literature: valuing rich narrative craft, nuanced characters, thoughtful themes, and cultural breadth.';
      starterPath = 'Explore R.K. Narayan’s Malgudi masterwork The Guide or George Orwell’s 1984.';
      stretchPath = 'Expand into Kalki’s sprawling Chola epic Ponniyin Selvan or Dostoevsky’s Crime and Punishment.';
    }

    // Build Dimension Scores for radar / visualization
    const dimensions: DimensionScore[] = [
      {
        name: 'Philosophical Depth',
        value: philScore,
        label: philScore > 75 ? 'Profound' : philScore > 45 ? 'Thoughtful' : 'Experiential',
        description: 'Appetite for existential questioning and metaphysical inquiry'
      },
      {
        name: 'Classical / Itihaasa Affinity',
        value: itihaasaAffinityScore,
        label: itihaasaAffinityScore > 80 ? 'Sacred Classical' : itihaasaAffinityScore > 45 ? 'Open Receptive' : 'Secular Focus',
        description: 'Inclination toward ancient Indic civilizational epics and sacred texts'
      },
      {
        name: 'Prose Density Tolerance',
        value: proseScore,
        label: proseScore > 80 ? 'Layered & Demanding' : proseScore > 50 ? 'Lyrical' : 'Clean & Transparent',
        description: 'Readiness for complex syntax, classical cadence, and rich periods'
      },
      {
        name: 'Reading Maturity',
        value: baseMaturityScore,
        label: readingMaturity === 'advanced-literary' ? 'Advanced' : readingMaturity === 'seasoned' ? 'Seasoned' : readingMaturity === 'intermediate' ? 'Intermediate' : 'Starter',
        description: 'Readiness for structural complexity and demanding volumes'
      },
      {
        name: 'Multilingual Breadth',
        value: Math.min(100, primaryLanguages.length * 28 + (primaryLanguages.includes('English') ? 15 : 25)),
        label: `${primaryLanguages.length} Languages Selected`,
        description: 'Openness to regional Indian languages and global literature'
      }
    ];

    return {
      id: `profile-${Date.now()}`,
      title,
      archetype,
      narrativeSummary,
      readingMaturity,
      proseTolerance,
      pacePreference,
      primaryLanguages,
      favoriteGenres: narAnswer === 'nar-propulsive' ? ['Commercial Fiction', 'Contemporary Romance'] : narAnswer === 'nar-sweeping' ? ['Itihaasa', 'Historical Fiction'] : ['Literary Fiction', 'Social Realism'],
      emotionalAppetite,
      philosophicalInclination,
      spiritualOrientation,
      worldviewStance,
      readingAmbition,
      dimensions,
      starterPathDescription: starterPath,
      stretchPathDescription: stretchPath,
      createdAt: new Date().toISOString()
    };
  }
};
