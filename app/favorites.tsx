import React from 'react';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';
import { useFavorites } from '@/hooks/useFavorites';
import { QuoteCard } from '@/components/quotes/QuoteCard';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FavoritesScreen() {
  const { theme } = useTheme();
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.colors.background }]}>
        <ThemedText style={[styles.emptyText, { color: theme.colors.text.muted }]}>
          Henüz favori alıntınız bulunmuyor.
        </ThemedText>
      </View>
    );
  }

  return (
    <SafeAreaView 
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={['top', 'right', 'left']}
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={[styles.content, {
          paddingTop: Platform.OS === 'ios' ? 16 : 24
        }]}
        showsVerticalScrollIndicator={false}
      >
        {favorites.map(quote => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            isFavorite={true}
            onFavorite={() => removeFavorite(quote.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Theme.spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
}); 