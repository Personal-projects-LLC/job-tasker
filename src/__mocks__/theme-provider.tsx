import React, { createContext, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const mockThemeContext: ThemeContextType = {
    isDark: false,
    toggleTheme: jest.fn(),
  };

  return (
    <ThemeContext.Provider value={mockThemeContext}>
      {children}
    </ThemeContext.Provider>
  );
};
