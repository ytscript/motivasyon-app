import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Appbar, TextInput, Button } from 'react-native-paper';

export function GoalForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const editingGoal = route.params?.editingGoal;
  
  const [formData, setFormData] = useState({
    title: editingGoal?.title || '',
    description: editingGoal?.description || '',
    deadline: editingGoal?.deadline || new Date(),
    category: editingGoal?.category || 'kişisel',
    priority: editingGoal?.priority || 'orta',
  });

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={editingGoal ? 'Hedefi Düzenle' : 'Yeni Hedef'} />
        <Appbar.Action icon="check" onPress={handleSave} />
      </Appbar.Header>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          {/* Form içeriği buraya gelecek */}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
} 