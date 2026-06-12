import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Übersetzungen importieren
import de from './locales/de.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import es from './locales/es.json';
import hr from './locales/hr.json';
import sr from './locales/sr.json';
import bs from './locales/bs.json';
import sl from './locales/sl.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: de },
      en: { translation: en },
      fr: { translation: fr },
      it: { translation: it },
      es: { translation: es },
      hr: { translation: hr },
      sr: { translation: sr },
      bs: { translation: bs },
      sl: { translation: sl },
    },
    fallbackLng: 'en',
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;