import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@/constants/Theme';
import { useFavorites } from '@/hooks/useFavorites';

interface StatItemProps {
  icon: string;
  value: number;
  label: string;
  onPress?: () => void;
}

const StatItem = ({ icon, value, label, onPress }: StatItemProps) => (
  <Pressable onPress={onPress}>
    <View style={styles.statItem}>
      <View style={styles.iconContainer}>
        <IconButton 
          icon={icon} 
          size={24}
          iconColor={Theme.colors.primary}
        />
      </View>
      <View>
        <ThemedText style={styles.value}>{value}</ThemedText>
        <ThemedText style={styles.label}>{label}</ThemedText>
      </View>
    </View>
  </Pressable>
);

export function MotivationStats() {
  const router = useRouter();
  const { favorites } = useFavorites();

  const handleFavoritesPress = () => {
    router.push('/favorites');
  };

  return (
    <Animated.View 
      entering={FadeIn.delay(400)}
      style={styles.container}
    >
      <ThemedText style={styles.title}>İSTATİSTİKLERİM</ThemedText>
      <View style={styles.statsContainer}>
        <StatItem 
          icon="book-open-variant" 
          value={42}
          label="Okunan Alıntı"
        />
        <StatItem 
          icon="heart" 
          value={favorites.length}
          label="Favori"
          onPress={handleFavoritesPress}
        />
        <StatItem 
          icon="share" 
          value={5}
          label="Paylaşım"
        />
      </View>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Theme.spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: Theme.spacing.xs,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  label: {
    fontSize: 12,
    color: Theme.colors.text.muted,
    textAlign: 'center',
  },
}); 