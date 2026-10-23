/**
 * Hanuman Chalisa in every supported reading language/script.
 *
 * This is independent of the app UI language (hi / en / pa): the Chalisa
 * screen lets the user read the text in any of these, while nav labels and
 * settings stay in the UI language.
 */
export interface ChalisaData {
    lang: string;
    title: string;
    invocation?: string;
    labels?: { doha: string; chaupai: string };
    doha_start: string[];
    chaupai: string[];
    doha_end: string[];
    closing?: string[];
}

export interface ChalisaLanguage {
    code: string;
    /** Name written in its own script */
    native: string;
    /** English name */
    name: string;
    data: ChalisaData;
}

export const CHALISA_LANGUAGES: ChalisaLanguage[] = [
    { code: 'hi', native: 'हिन्दी', name: 'Hindi', data: require('../../assets/data/hi/chalisa.json') },
    { code: 'en', native: 'English', name: 'English', data: require('../../assets/data/en/chalisa.json') },
    { code: 'mr', native: 'मराठी', name: 'Marathi', data: require('../../assets/data/mr/chalisa.json') },
    { code: 'ne', native: 'नेपाली', name: 'Nepali', data: require('../../assets/data/ne/chalisa.json') },
    { code: 'bn', native: 'বাংলা', name: 'Bengali', data: require('../../assets/data/bn/chalisa.json') },
    { code: 'as', native: 'অসমীয়া', name: 'Assamese', data: require('../../assets/data/as/chalisa.json') },
    { code: 'gu', native: 'ગુજરાતી', name: 'Gujarati', data: require('../../assets/data/gu/chalisa.json') },
    { code: 'pa', native: 'ਪੰਜਾਬੀ', name: 'Punjabi', data: require('../../assets/data/pa/chalisa.json') },
    { code: 'or', native: 'ଓଡ଼ିଆ', name: 'Odia', data: require('../../assets/data/or/chalisa.json') },
    { code: 'ta', native: 'தமிழ்', name: 'Tamil', data: require('../../assets/data/ta/chalisa.json') },
    { code: 'te', native: 'తెలుగు', name: 'Telugu', data: require('../../assets/data/te/chalisa.json') },
    { code: 'kn', native: 'ಕನ್ನಡ', name: 'Kannada', data: require('../../assets/data/kn/chalisa.json') },
    { code: 'ml', native: 'മലയാളം', name: 'Malayalam', data: require('../../assets/data/ml/chalisa.json') },
];

export const getChalisaLanguage = (code: string): ChalisaLanguage =>
    CHALISA_LANGUAGES.find(l => l.code === code) ?? CHALISA_LANGUAGES[0];
