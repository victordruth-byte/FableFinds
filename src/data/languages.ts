export interface LanguageDefinition {
  code: string;
  name: string;
  nativeName: string;
  script: string;
  isScheduled: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageDefinition[] = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin', isScheduled: false },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', script: 'Bengali-Assamese', isScheduled: true },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali', isScheduled: true },
  { code: 'brx', name: 'Bodo', nativeName: 'बर’', script: 'Devanagari', isScheduled: true },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', script: 'Devanagari', isScheduled: true },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati', isScheduled: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', isScheduled: true },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada', isScheduled: true },
  { code: 'ks', name: 'Kashmiri', nativeName: 'कॉशुर / کٲشُر', script: 'Nastaliq / Sharada', isScheduled: true },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', script: 'Devanagari / Romi', isScheduled: true },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', script: 'Devanagari / Tirhuta', isScheduled: true },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam', isScheduled: true },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্ / Meitei', script: 'Meitei Mayek', isScheduled: true },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari', isScheduled: true },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', script: 'Devanagari', isScheduled: true },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia', isScheduled: true },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ / پنجابی', script: 'Gurmukhi / Shahmukhi', isScheduled: true },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', script: 'Devanagari', isScheduled: true },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki', isScheduled: true },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي / सिन्धी', script: 'Arabic / Devanagari', isScheduled: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil', isScheduled: true },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', isScheduled: true },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', script: 'Nastaliq', isScheduled: true }
];

export const SCHEDULED_INDIAN_LANGUAGES = SUPPORTED_LANGUAGES.filter(l => l.isScheduled);
