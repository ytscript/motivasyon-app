import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { QuoteCard } from './QuoteCard';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/Theme';

export function RecentQuotes() {
  const { theme } = useTheme();
  
  return (
    <Animated.View 
      entering={FadeIn.delay(300)}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ThemedText style={[styles.title, { color: theme.colors.text.primary }]}>
        SON OKUDUKLARIM
      </ThemedText>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Burada son okunan alıntılar listelenecek */}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Theme.spacing.lg,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Theme.spacing.md,
    marginLeft: Theme.spacing.lg,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.md,
  }
}); 