import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  progress: number;
  completed: boolean;
  category: 'kişisel' | 'iş' | 'eğitim';
  priority: 'düşük' | 'orta' | 'yüksek';
  createdAt: string;
}

interface GoalsState {
  goals: Goal[];
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
}

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set) => ({
      goals: [],
      addGoal: (goal) => set((state) => ({ 
        goals: [...state.goals, goal] 
      })),
      updateGoal: (id, updates) => set((state) => ({
        goals: state.goals.map(goal => 
          goal.id === id ? { ...goal, ...updates } : goal
        )
      })),
      deleteGoal: (id) => set((state) => ({
        goals: state.goals.filter(goal => goal.id !== id)
      })),
    }),
    {
      name: 'goals-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const { addGoal, updateGoal, deleteGoal } = useGoalsStore.getState(); 