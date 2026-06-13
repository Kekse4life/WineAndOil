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
    const userSelected = localStorage.getItem('userSelectedLang');

    if (userSelected) {
      i18n.changeLanguage(userSelected);
      return;
    }

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const lang = countryToLang[data.country_code];
        i18n.changeLanguage(lang ?? 'en');
      })
      .catch(() => {
        i18n.changeLanguage('en');
      });
  }, []);
}