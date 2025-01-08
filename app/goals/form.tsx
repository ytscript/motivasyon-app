import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Pressable, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Appbar, TextInput, SegmentedButtons, IconButton, Surface, Snackbar } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useTheme } from '@/contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ThemedText } from '@/components/ThemedText';
import { useGoalsStore } from '@/lib/goals';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Theme } from '@/constants/Theme';

interface SubGoal {
  id: string;
  title: string;
  completed: boolean;
}

export default function GoalFormScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const params = useLocalSearchParams();
  const addGoal = useGoalsStore(state => state.addGoal);
  const updateGoal = useGoalsStore(state => state.updateGoal);
  
  const editingGoal = params.editingGoal && typeof params.editingGoal === 'string' 
    ? JSON.parse(params.editingGoal) 
    : null;

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [subGoals, setSubGoals] = useState<SubGoal[]>([]);
  const [subGoalTitle, setSubGoalTitle] = useState('');
  
  const [formData, setFormData] = useState({
    title: editingGoal?.title || '',
    description: editingGoal?.description || '',
    deadline: editingGoal?.deadline ? new Date(editingGoal.deadline) : new Date(),
    category: editingGoal?.category || 'kişisel',
    priority: editingGoal?.priority || 'orta',
    progress: editingGoal?.progress || 0
  });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Başlık zorunludur';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Açıklama zorunludur';
    }
    
    if (formData.deadline < new Date()) {
      newErrors.deadline = 'Geçmiş bir tarih seçilemez';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      setSnackbarMessage('Lütfen tüm alanları doldurun');
      setSnackbarVisible(true);
      return;
    }

    try {
      if (editingGoal) {
        updateGoal(editingGoal.id, formData);
      } else {
        addGoal({
          id: Date.now().toString(),
          ...formData,
          completed: false,
          createdAt: new Date().toISOString()
        });
      }
      router.back();
    } catch (error) {
      setSnackbarMessage('Hedef kaydedilirken bir hata oluştu');
      setSnackbarVisible(true);
    }
  };

  const addSubGoal = () => {
    if (!subGoalTitle.trim()) return;
    
    setSubGoals([
      ...subGoals,
      {
        id: Date.now().toString(),
        title: subGoalTitle.trim(),
        completed: false
      }
    ]);
    setSubGoalTitle('');
  };

  const toggleSubGoal = (id: string) => {
    setSubGoals(subGoals.map(sg => 
      sg.id === id ? { ...sg, completed: !sg.completed } : sg
    ));
  };

  const removeSubGoal = (id: string) => {
    setSubGoals(subGoals.filter(sg => sg.id !== id));
  };

  const renderSubGoals = () => (
    <View>
      <View style={styles.subGoalInput}>
        <TextInput
          label="Alt hedef ekle"
          value={subGoalTitle}
          onChangeText={setSubGoalTitle}
          style={styles.flex1}
          mode="outlined"
        />
        <IconButton
          icon="plus"
          onPress={addSubGoal}
        />
      </View>
      {subGoals.map(subGoal => (
        <Animated.View 
          key={subGoal.id}
          entering={FadeInDown}
          style={styles.subGoalItem}
        >
          <Pressable 
            style={styles.subGoalCheckbox}
            onPress={() => toggleSubGoal(subGoal.id)}
          >
            <IconButton
              icon={subGoal.completed ? 'checkbox-marked' : 'checkbox-blank-outline'}
              iconColor={theme.colors.primary}
              size={20}
            />
            <ThemedText style={[
              styles.subGoalTitle,
              subGoal.completed && styles.completedSubGoal
            ]}>
              {subGoal.title}
            </ThemedText>
          </Pressable>
          <IconButton
            icon="close"
            size={20}
            onPress={() => removeSubGoal(subGoal.id)}
          />
        </Animated.View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface.default }}>
        <Appbar.BackAction 
          onPress={() => router.back()}
          iconColor={theme.colors.text.primary}
        />
        <Appbar.Content 
          title={editingGoal ? 'Hedefi Düzenle' : 'Yeni Hedef'}
          titleStyle={{ color: theme.colors.text.primary }}
        />
        <Appbar.Action 
          icon="check" 
          onPress={handleSave}
          iconColor={theme.colors.primary}
        />
      </Appbar.Header>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeInDown.delay(100).springify()}>
            <Surface style={[styles.card, { backgroundColor: theme.colors.surface.default }]}>
              <TextInput
                label="Başlık"
                value={formData.title}
                onChangeText={text => setFormData({...formData, title: text})}
                mode="outlined"
                right={<TextInput.Icon icon="format-title" />}
                style={styles.input}
                outlineStyle={styles.inputOutline}
                textColor={theme.colors.text.primary}
                outlineColor={theme.colors.outline}
                activeOutlineColor={theme.colors.primary}
                error={!!errors.title}
                helperText={errors.title}
              />

              <TextInput
                label="Açıklama"
                value={formData.description}
                onChangeText={text => setFormData({...formData, description: text})}
                mode="outlined"
                multiline
                numberOfLines={4}
                right={<TextInput.Icon icon="text" />}
                style={styles.input}
                outlineStyle={styles.inputOutline}
                textColor={theme.colors.text.primary}
                outlineColor={theme.colors.outline}
                activeOutlineColor={theme.colors.primary}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Surface>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <Surface style={[styles.card, { backgroundColor: theme.colors.surface.default }]}>
              <ThemedText style={styles.sectionTitle}>Kategori</ThemedText>
              <SegmentedButtons
                value={formData.category}
                onValueChange={value => setFormData({...formData, category: value})}
                buttons={[
                  { value: 'kişisel', label: 'Kişisel', icon: 'account' },
                  { value: 'iş', label: 'İş', icon: 'briefcase' },
                  { value: 'eğitim', label: 'Eğitim', icon: 'school' },
                ]}
                style={styles.segmentedButton}
              />

              <ThemedText style={[styles.sectionTitle, { marginTop: 16 }]}>Öncelik</ThemedText>
              <SegmentedButtons
                value={formData.priority}
                onValueChange={value => setFormData({...formData, priority: value})}
                buttons={[
                  { value: 'düşük', label: 'Düşük', icon: 'flag-outline' },
                  { value: 'orta', label: 'Orta', icon: 'flag' },
                  { value: 'yüksek', label: 'Yüksek', icon: 'flag-variant' },
                ]}
                style={styles.segmentedButton}
              />
            </Surface>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).springify()}>
            <Surface style={[styles.card, { backgroundColor: theme.colors.surface.default }]}>
              <ThemedText style={styles.sectionTitle}>Bitiş Tarihi</ThemedText>
              <Pressable 
                onPress={() => setDatePickerVisible(true)}
                style={[styles.dateButton, { borderColor: theme.colors.outline }]}
              >
                <IconButton 
                  icon="calendar" 
                  size={24}
                  iconColor={theme.colors.primary}
                />
                <ThemedText style={styles.dateText}>
                  {format(formData.deadline, 'd MMMM yyyy', { locale: tr })}
                </ThemedText>
              </Pressable>
            </Surface>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).springify()}>
            <Surface style={[styles.card, { backgroundColor: theme.colors.surface.default }]}>
              <View style={styles.progressHeader}>
                <ThemedText style={styles.sectionTitle}>İlerleme</ThemedText>
                <ThemedText style={styles.progressText}>
                  %{Math.round(formData.progress)}
                </ThemedText>
              </View>
              <Slider
                value={formData.progress}
                onValueChange={value => setFormData({...formData, progress: value})}
                minimumValue={0}
                maximumValue={100}
                step={5}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.outline}
                thumbTintColor={theme.colors.primary}
                style={styles.slider}
              />
              <View style={styles.progressLabels}>
                <ThemedText style={styles.progressLabel}>Başlangıç</ThemedText>
                <ThemedText style={styles.progressLabel}>Tamamlandı</ThemedText>
              </View>
            </Surface>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(500).springify()}>
            <Surface style={[styles.card, { backgroundColor: theme.colors.surface.default }]}>
              <View style={styles.subgoalsHeader}>
                <ThemedText style={styles.sectionTitle}>Alt Hedefler</ThemedText>
              </View>
              {renderSubGoals()}
            </Surface>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          setFormData({...formData, deadline: date});
          setDatePickerVisible(false);
        }}
        onCancel={() => setDatePickerVisible(false)}
        locale="tr"
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ backgroundColor: theme.colors.error }}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  input: {
    marginBottom: 16,
  },
  inputOutline: {
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  segmentedButton: {
    marginBottom: 8,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  progressText: {
    minWidth: 48,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '500',
  },
  subgoalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subGoalInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flex1: {
    flex: 1,
  },
  subGoalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  subGoalCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  subGoalTitle: {
    fontSize: 16,
  },
  completedSubGoal: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  slider: {
    height: 40,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: Theme.colors.text.secondary,
  },
}); 