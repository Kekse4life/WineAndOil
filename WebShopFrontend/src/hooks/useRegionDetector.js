import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const countryToLang = {
  DE: 'de', AT: 'de', CH: 'de',
  FR: 'fr', BE: 'fr',
  IT: 'it',
  ES: 'es', MX: 'es', AR: 'es',
  HR: 'hr',
  RS: 'sr',
  BA: 'bs',
  SI: 'sl',
};

export function useRegionDetector() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Nur überspringen wenn der User die Sprache manuell gesetzt hat
    if (localStorage.getItem('userSelectedLang')) return;

    fetch('https://ip-api.com/json/?fields=countryCode')
      .then(res => res.json())
      .then(data => {
        const lang = countryToLang[data.countryCode];
        if (lang) {
          i18n.changeLanguage(lang);
        }
      })
      .catch(() => {
        // IP-API nicht erreichbar → Browser-Sprache bleibt
      });
  }, []);
}