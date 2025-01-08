import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from '@/constants/Theme';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: typeof Theme.light | typeof Theme.dark;
};

const THEME_STORAGE_KEY = '@theme_mode';

const defaultContextValue: ThemeContextType = {
  isDarkMode: false,
  toggleTheme: () => {},
  theme: Theme.light
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  // Uygulama başladığında kaydedilmiş tema tercihini yükle
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Tema tercihi yüklenirken hata:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newThemeMode = !isDarkMode;
      setIsDarkMode(newThemeMode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newThemeMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Tema değiştirilirken hata:', error);
    }
  };

  const theme = isDarkMode ? Theme.dark : Theme.light;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 