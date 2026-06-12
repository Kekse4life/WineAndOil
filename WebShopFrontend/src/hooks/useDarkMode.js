import { useState, useEffect } from 'react';

export function useDarkMode() {
  // Initialize from localStorage, default to light mode (false)
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    // Only enable dark mode if explicitly stored as 'true', otherwise default to light mode
    return stored === 'true';
  });

  // Update DOM and persist to localStorage whenever darkMode changes
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    if (darkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    
    // Explicitly save as string 'true' or 'false'
    localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
  }, [darkMode]);

  return [darkMode, setDarkMode];
}