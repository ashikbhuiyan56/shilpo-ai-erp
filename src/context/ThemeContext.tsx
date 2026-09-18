import React, { createContext, useContext, useState, useEffect } from 'react';

export type OfficeTheme = 'purple' | 'slate' | 'navy' | 'light';

interface ThemeContextType {
  theme: OfficeTheme;
  setTheme: (theme: OfficeTheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Permanently locked to 'purple' theme for all visitors, devices, and sessions
  const [theme] = useState<OfficeTheme>('purple');

  const setTheme = (_newTheme: OfficeTheme) => {
    // Theme is fixed to purple; ignore any changes
  };

  const toggleTheme = () => {
    // Theme is fixed to purple; ignore any toggling
  };

  useEffect(() => {
    // Ignore and clear any previously saved theme in localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('shilpo_office_theme');
      } catch {
        // Ignore storage exceptions
      }
    }

    const root = document.documentElement;
    root.classList.remove('theme-official-slate', 'theme-official-navy', 'theme-official-light');
    root.classList.add('theme-official-purple');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'purple', setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useOfficeTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useOfficeTheme must be used within a ThemeProvider');
  }
  return context;
};

