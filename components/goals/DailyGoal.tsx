import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/Theme';

export function DailyGoal() {
  const { theme } = useTheme();
  
  return (
    <Animated.View 
      entering={FadeIn.delay(400)}
      style={styles.container}
    >
      <Pressable>
        <LinearGradient
          colors={[theme.colors.primary + '90', theme.colors.accent + '80']}
          style={styles.gradient}
        >
          <ThemedText style={[styles.label, { color: theme.colors.text.light }]}>
            GÜNÜN HEDEFİ
          </ThemedText>
          <ThemedText style={[styles.text, { color: theme.colors.text.light }]}>
            Bugün en az 3 motivasyon sözü oku ve not al
          </ThemedText>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.spacing.md,
    overflow: 'hidden',
  },
  gradient: {
    padding: Theme.spacing.lg,
  },
  label: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: Theme.spacing.sm,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  }
}); 