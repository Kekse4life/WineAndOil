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
    // Wenn schon eine Sprache gespeichert ist, nichts tun
    if (localStorage.getItem('i18nextLng')) return;

    fetch('https://ip-api.com/json/?fields=countryCode')
      .then(res => res.json())
      .then(data => {
        const lang = countryToLang[data.countryCode];
        if (lang) {
          i18n.changeLanguage(lang);
        }
        // Kein Match → Browser-Sprache bleibt (Fallback durch i18next)
      })
      .catch(() => {
        // IP-API nicht erreichbar → Browser-Sprache bleibt
      });
  }, []);
}