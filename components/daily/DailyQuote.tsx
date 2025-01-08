import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/Theme';

interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
}

export function DailyQuote() {
  const { theme } = useTheme();
  const [quote, setQuote] = useState<Quote | null>(null);
  
  useEffect(() => {
    setQuote({
      id: '1',
      text: 'Başarı yolculuğunda en önemli adım başlamaktır.',
      author: 'Anonim',
      category: 'motivasyon'
    });
  }, []);

  return (
    <Animated.View 
      entering={FadeIn.delay(200)}
      style={styles.container}
    >
      <View style={[styles.card, { backgroundColor: theme.colors.surface.default }]}>
        <ThemedText style={[styles.label, { color: theme.colors.text.muted }]}>GÜNÜN SÖZÜ</ThemedText>
        <ThemedText style={[styles.quote, { color: theme.colors.text.primary }]}>{quote?.text}</ThemedText>
        <ThemedText style={[styles.author, { color: theme.colors.text.secondary }]}>- {quote?.author}</ThemedText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.lg,
  },
  card: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    borderLeftWidth: 4,
    borderLeftColor: Theme.colors.primary,
  },
  label: {
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: Theme.spacing.sm,
  },
  quote: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Theme.spacing.sm,
    lineHeight: 28,
  },
  author: {
    fontSize: 14,
    fontStyle: 'italic',
  }
}); 