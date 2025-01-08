import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/constants/Theme';
import { IconButton, FAB, Portal, Modal, TextInput, Button, ProgressBar } from 'react-native-paper';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format, tr } from 'date-fns';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useGoalsStore, Goal } from '@/lib/goals';

export function GoalTracker() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const goals = useGoalsStore(state => state.goals);
  const deleteGoal = useGoalsStore(state => state.deleteGoal);
  const updateGoal = useGoalsStore(state => state.updateGoal);
  const router = useRouter();

  const openGoalForm = (goal?: Goal) => {
    router.push({
      pathname: '/goals/form',
      params: { editingGoal: goal ? JSON.stringify(goal) : null }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText style={[styles.title, { color: theme.colors.text.primary }]}>
            Hedeflerim
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            {goals.length} aktif hedef
          </ThemedText>
        </View>

        {goals.length === 0 ? (
          <Animated.View 
            entering={FadeIn}
            style={styles.emptyState}
          >
            <ThemedText style={[styles.emptyText, { color: theme.colors.text.muted }]}>
              Henüz hedef eklemediniz.{'\n'}
              Yeni bir hedef eklemek için + butonuna dokunun.
            </ThemedText>
          </Animated.View>
        ) : (
          goals.map((goal, index) => (
            <Animated.View 
              key={goal.id}
              entering={SlideInRight.delay(index * 100)}
              style={[styles.goalCard, { 
                backgroundColor: theme.colors.surface.default,
                borderLeftColor: goal.completed ? theme.colors.accent : theme.colors.primary,
              }]}
            >
              <View style={styles.goalHeader}>
                <ThemedText style={[styles.goalTitle, { 
                  color: theme.colors.text.primary,
                  textDecorationLine: goal.completed ? 'line-through' : 'none',
                }]}>
                  {goal.title}
                </ThemedText>
                <View style={styles.actions}>
                  <IconButton 
                    icon={goal.completed ? 'undo' : 'check'}
                    iconColor={goal.completed ? theme.colors.accent : theme.colors.primary}
                    size={20}
                    onPress={() => updateGoal(goal.id, { completed: !goal.completed })}
                  />
                  <IconButton 
                    icon="pencil"
                    iconColor={theme.colors.text.muted}
                    size={20}
                    onPress={() => {
                      openGoalForm(goal);
                    }}
                  />
                  <IconButton 
                    icon="delete"
                    iconColor={theme.colors.text.muted}
                    size={20}
                    onPress={() => deleteGoal(goal.id)}
                  />
                </View>
              </View>

              <ThemedText style={[styles.description, { color: theme.colors.text.secondary }]}>
                {goal.description}
              </ThemedText>

              <ProgressBar 
                progress={goal.progress / 100} 
                color={goal.completed ? theme.colors.accent : theme.colors.primary}
                style={styles.progressBar}
              />

              <View style={styles.footer}>
                <ThemedText style={[styles.deadline, { color: theme.colors.text.muted }]}>
                  Bitiş: {format(goal.deadline, 'd MMMM yyyy', { locale: tr })}
                </ThemedText>
                <ThemedText style={[styles.progress, { color: theme.colors.text.secondary }]}>
                  %{goal.progress}
                </ThemedText>
              </View>
            </Animated.View>
          ))
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => openGoalForm()}
        color={theme.colors.text.light}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: Theme.spacing.lg,
  },
  goalCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  deadline: {
    fontSize: 12,
  },
  modal: {
    flex: 1,
    margin: 0,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  actions: {
    flexDirection: 'row',
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  progress: {
    fontSize: 14,
    fontWeight: '500',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  modalScroll: {
    flex: 1,
  },
  modalContent: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  flex1: {
    flex: 1,
  },
  categoryButton: {
    borderRadius: 8,
  },
  priorityButton: {
    borderRadius: 8,
    borderWidth: 2,
  },
}); 