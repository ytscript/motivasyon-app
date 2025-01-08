import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { IconButton } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { QuoteCard } from './QuoteCard';
import { Quote, QuoteCategory, getRandomQuote } from '@/constants/Quotes';
import { useTheme } from '@/contexts/ThemeContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Theme } from '@/constants/Theme';

interface QuoteSliderProps {
  category: QuoteCategory;
  onClose?: () => void;
}

export function QuoteSlider({ category, onClose }: QuoteSliderProps) {
  const router = useRouter();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme, isDarkMode } = useTheme();

  useEffect(() => {
    const initialQuotes = Array(5).fill(null).map(() => getRandomQuote(category));
    setQuotes(initialQuotes);
  }, [category]);

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.replace('/(tabs)');
  };

  const handleNext = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (currentIndex < quotes.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setQuotes(prev => [...prev, getRandomQuote(category)]);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleFavorite = async (quote: Quote) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    
    if (isFavorite(quote.id)) {
      await removeFavorite(quote.id);
    } else {
      await addFavorite(quote);
    }
  };

  if (quotes.length === 0) {
    return (
      <Animated.View 
        entering={FadeIn}
        style={[styles.container, styles.loadingContainer]}
      >
        <BlurView intensity={95} tint="dark" style={StyleSheet.absoluteFill} />
        <ThemedText>Yükleniyor...</ThemedText>
      </Animated.View>
    );
  }

  return (
    <Animated.View 
      entering={FadeIn}
      exiting={FadeOut}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <BlurView 
        intensity={95} 
        tint={isDarkMode ? "dark" : "light"} 
        style={StyleSheet.absoluteFill} 
      />
      
      <View style={styles.header}>
        <IconButton 
          icon="chevron-left"
          iconColor={theme.colors.text.light}
          size={28}
          onPress={handleBack}
        />
        <ThemedText style={[styles.headerTitle, { color: theme.colors.text.light }]}>
          {category.toUpperCase()}
        </ThemedText>
      </View>

      <Pressable 
        style={styles.cardContainer} 
        onPress={handleNext}
      >
        <Animated.View 
          key={currentIndex}
          entering={FadeIn}
        >
          <QuoteCard 
            quote={{
              id: quotes[currentIndex].id,
              text: quotes[currentIndex].text,
              author: quotes[currentIndex].author,
              category: quotes[currentIndex].category,
              views: quotes[currentIndex].views,
              likes: quotes[currentIndex].likes,
              comments: quotes[currentIndex].comments?.length
            }}
            isFavorite={isFavorite(quotes[currentIndex].id)}
            onFavorite={() => handleFavorite(quotes[currentIndex])}
            onShare={() => {
              // Paylaşım istatistiği
            }}
            onSpeak={() => {
              // Dinleme istatistiği
            }}
            onComment={() => {
              // Yorum istatistiği
            }}
            stats={{
              views: Math.floor(Math.random() * 1000),
              likes: Math.floor(Math.random() * 100),
              comments: Math.floor(Math.random() * 10)
            }}
          />
        </Animated.View>

        <ThemedText style={styles.tapHint}>
          {currentIndex === quotes.length - 1 
            ? 'Ana sayfaya dönmek için dokun'
            : 'Değiştirmek için dokun'}
        </ThemedText>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.md,
  },
  tapHint: {
    fontSize: 14,
    color: Theme.colors.text.muted,
    textAlign: 'center',
    marginTop: Theme.spacing.xl,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 