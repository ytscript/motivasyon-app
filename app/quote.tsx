import React from 'react';
import { StyleSheet, View, ScrollView, Share, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/Theme';
import { IconButton } from 'react-native-paper';
import { useFavorites } from '@/hooks/useFavorites';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';

export default function QuoteScreen() {
  const { theme } = useTheme();
  const { id, text, author, category } = useLocalSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.card, { backgroundColor: theme.colors.surface.default }]}>
        <View style={styles.header}>
          <ThemedText style={[styles.category, { color: theme.colors.text.muted }]}>
            {category?.toString().toUpperCase()}
          </ThemedText>
          <IconButton
            icon={isFavorite(id?.toString() || '') ? 'heart' : 'heart-outline'}
            iconColor={theme.colors.primary}
            size={24}
            onPress={() => toggleFavorite({
              id: id?.toString() || '',
              text: text?.toString() || '',
              author: author?.toString() || '',
              category: category?.toString() || ''
            })}
          />
        </View>
        <ThemedText style={[styles.quote, { color: theme.colors.text.primary }]}>
          {text}
        </ThemedText>
        <ThemedText style={[styles.author, { color: theme.colors.text.secondary }]}>
          - {author}
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: Theme.spacing.lg,
    padding: Theme.spacing.xl,
    borderRadius: Theme.radius.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  category: {
    fontSize: 12,
  },
  quote: {
    fontSize: 24,
    lineHeight: 36,
    marginBottom: Theme.spacing.lg,
  },
  author: {
    fontSize: 16,
    fontStyle: 'italic',
  },
}); 