import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/Theme';

export default function BooksScreen() {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ThemedText type="title" style={[styles.title, { color: theme.colors.text.primary }]}>
        Kitaplar
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.lg,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: Theme.spacing.lg,
  },
}); 