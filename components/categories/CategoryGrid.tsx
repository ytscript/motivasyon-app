import React from 'react';
import { StyleSheet, View, Pressable, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { categoryConfigs } from '@/constants/Categories';
import { Theme } from '@/constants/Theme';

const { width } = Dimensions.get('window');

export function CategoryGrid() {
  const router = useRouter();

  const handlePress = (category: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    router.push(`/category/${category}`);
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>KATEGORİLER</ThemedText>
      <View style={styles.grid}>
        {Object.entries(categoryConfigs).map(([key, config]) => (
          <Pressable 
            key={key}
            onPress={() => handlePress(key)}
            style={({ pressed }) => [
              styles.categoryCard,
              pressed && Platform.OS !== 'web' && styles.pressed
            ]}
          >
            <LinearGradient
              colors={[Theme.colors.primary + '90', Theme.colors.accent + '80']}
              style={styles.gradient}
            >
              <IconSymbol name={config.icon} size={32} color={Theme.colors.text.light} />
              <ThemedText style={styles.categoryTitle}>{config.title}</ThemedText>
              <ThemedText style={styles.categoryDesc}>{config.description}</ThemedText>
            </LinearGradient>
          </Pressable>
        ))}
      </View>
    </View>
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
  grid: {
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  categoryCard: {
    width: '100%',
    borderRadius: Theme.radius.lg,
    overflow: 'hidden',
    marginBottom: Theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  gradient: {
    padding: Theme.spacing.lg,
    alignItems: 'center',
    minHeight: 120,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text.light,
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
    textAlign: 'center',
  },
  categoryDesc: {
    fontSize: 12,
    color: Theme.colors.text.light,
    opacity: 0.8,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
    transform: [{translateY: 2}],
  }
}); 