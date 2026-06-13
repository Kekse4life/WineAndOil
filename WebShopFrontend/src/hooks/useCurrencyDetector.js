import { useState, useEffect } from 'react';

const countryToCurrency = {
  // Eurozone
  AT: 'EUR', DE: 'EUR', FR: 'EUR', IT: 'EUR',
  ES: 'EUR', BE: 'EUR', SI: 'EUR', PT: 'EUR',
  NL: 'EUR', IE: 'EUR', FI: 'EUR', GR: 'EUR',
  LU: 'EUR', MT: 'EUR', CY: 'EUR', EE: 'EUR',
  LV: 'EUR', LT: 'EUR', SK: 'EUR', HR: 'EUR',
  // Nicht-Eurozone
  CH: 'CHF',
  RS: 'RSD',
  BA: 'BAM',
  GB: 'GBP',
};

const currencySymbols = {
  EUR: '€',
  CHF: 'CHF',
  RSD: 'RSD',
  BAM: 'KM',
  GBP: '£',
  USD: '$',
};

export function useCurrencyDetector() {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('userSelectedCurrency') ?? 'EUR';
  });
  const [rates, setRates] = useState({ EUR: 1 });
  const [loading, setLoading] = useState(true);

  // Wechselkurse laden
  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/EUR')
      .then(res => res.json())
      .then(data => {
        setRates(data.rates);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // IP-Erkennung
  useEffect(() => {
    if (localStorage.getItem('userSelectedCurrency')) return;

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const detected = countryToCurrency[data.country_code] ?? 'USD';
        setCurrency(detected);
      })
      .catch(() => setCurrency('USD'));
  }, []);

  const convertPrice = (eurPrice) => {
    if (loading || !rates[currency]) return eurPrice;
    return (eurPrice * rates[currency]).toFixed(2);
  };

  const formatPrice = (eurPrice) => {
    const converted = convertPrice(eurPrice);
    const symbol = currencySymbols[currency] ?? currency;
    return `${symbol} ${converted}`;
  };

  const changeCurrency = (newCurrency) => {
    localStorage.setItem('userSelectedCurrency', newCurrency);
    setCurrency(newCurrency);
  };

  return { currency, formatPrice, changeCurrency, currencySymbols };
}