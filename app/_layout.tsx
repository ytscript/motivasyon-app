import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Stack } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function RootLayout() {
  const { theme } = useTheme();

  return (
    <PaperProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </PaperProvider>
  );
}
