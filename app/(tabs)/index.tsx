import React, { useState } from 'react';
import { Platform, StyleSheet, ScrollView, View, RefreshControl, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { DailyQuote } from '@/components/daily/DailyQuote';
import { CategoryGrid } from '@/components/categories/CategoryGrid';
import { RecentQuotes } from '@/components/quotes/RecentQuotes';
import { MotivationStats } from '@/components/stats/MotivationStats';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/Theme';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function HomeScreen() {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  
  return (
    <SafeAreaView 
      style={{ 
        flex: 1, 
        backgroundColor: theme.colors.background,
        paddingTop: Platform.OS === 'ios' ? -5 : 0,
      }}
      edges={['top']}
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        <View style={styles.header}>
          <ThemedText style={[styles.greeting, { color: theme.colors.text.primary }]}>
            Merhaba 👋
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Bugün kendini nasıl hissediyorsun?
          </ThemedText>
        </View>

        <DailyQuote />
        <CategoryGrid />
        <RecentQuotes />
        <MotivationStats />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 8 : 16,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 4,
    paddingTop: 10,

  },
  subtitle: {
    fontSize: 16,
  }
});
