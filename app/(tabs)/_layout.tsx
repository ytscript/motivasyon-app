import { Tabs } from 'expo-router';
import { IconButton } from 'react-native-paper';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { theme } = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.muted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface.default,
          borderTopColor: theme.colors.surface.light,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Anasayfa',
          tabBarIcon: ({ color }) => (
            <IconButton icon="home" size={24} iconColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: 'Hedefler',
          tabBarIcon: ({ color }) => (
            <IconButton icon="target" size={24} iconColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          title: 'Kitaplar',
          tabBarIcon: ({ color }) => (
            <IconButton icon="book" size={24} iconColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Hesabım',
          tabBarIcon: ({ color }) => (
            <IconButton icon="account" size={24} iconColor={color} />
          ),
        }}
      />
    </Tabs>
  );
}
