import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BooksScreen() {
  const { theme } = useTheme();
  
  return (
    <SafeAreaView 
      style={{ flex: 1, backgroundColor: theme.colors.background, paddingTop: 10 }}
      edges={['top']}
    >
      <View style={styles.header}>
          <ThemedText style={[styles.greeting, { color: theme.colors.text.primary }]}>
            Merhaba 👋
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Bugün kendini nasıl hissediyorsun?
          </ThemedText>
        </View>
    </SafeAreaView>
  );
}
