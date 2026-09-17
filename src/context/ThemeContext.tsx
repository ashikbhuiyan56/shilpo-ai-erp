import React, { createContext, useContext, useState, useEffect } from 'react';

export type OfficeTheme = 'purple' | 'slate' | 'navy' | 'light';

interface ThemeContextType {
  theme: OfficeTheme;
  setTheme: (theme: OfficeTheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<OfficeTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shilpo_office_theme') as OfficeTheme;
      if (saved && ['purple', 'slate', 'navy', 'light'].includes(saved)) {
        return saved;
      }
    }
    return 'light'; // Default to Premium Light-Mode Enterprise ERP
  });

  const setTheme = (newTheme: OfficeTheme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('shilpo_office_theme', newTheme);
    }
  };

  const toggleTheme = () => {
    const cycle: Record<OfficeTheme, OfficeTheme> = {
      purple: 'slate',
      slate: 'light',
      light: 'navy',
      navy: 'purple',
    };
    setTheme(cycle[theme]);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-official-purple', 'theme-official-slate', 'theme-official-navy', 'theme-official-light');
    root.classList.add(`theme-official-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
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
