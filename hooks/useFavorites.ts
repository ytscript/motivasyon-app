import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Quote } from '@/constants/Quotes';

const FAVORITES_KEY = '@motivasyon_app_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Favoriler yüklenirken hata:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addFavorite = async (quote: Quote) => {
    try {
      const newFavorites = [...favorites, quote];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
      return true;
    } catch (error) {
      console.error('Favori eklenirken hata:', error);
      return false;
    }
  };

  const removeFavorite = async (quoteId: string) => {
    try {
      const newFavorites = favorites.filter(q => q.id !== quoteId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
      return true;
    } catch (error) {
      console.error('Favori silinirken hata:', error);
      return false;
    }
  };

  const isFavorite = (quoteId: string) => {
    return favorites.some(q => q.id === quoteId);
  };

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite
  };
} 