import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoalTracker } from '@/components/goals/GoalTracker';
import { useTheme } from '@/contexts/ThemeContext';


export default function GoalsScreen() {
  const { theme } = useTheme();

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top']}
    >
      <GoalTracker />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
}); 