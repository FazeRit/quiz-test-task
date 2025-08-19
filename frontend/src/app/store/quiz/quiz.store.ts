import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { IQuiz, IQuizSummary } from '../../../entities/quiz/model/quiz';
import { IQuizStore } from './types/quiz-store.types';
import { QUIZ_INITIAL_STATE, QUIZ_STORE_NAME } from './const/quiz-store.const';

export const useQuizStore = create<IQuizStore>()(
  persist(
    (set, get) => ({
      ...QUIZ_INITIAL_STATE,

      setQuizzes: (quizzes: IQuizSummary[]) => set({ quizzes }),

      setCurrentQuiz: (currentQuiz: IQuiz | null) => set({ currentQuiz }),

      setSelectedQuizId: (selectedQuizId: string | null) => set({ selectedQuizId }),

      setLoading: (isLoading: boolean) => set({ isLoading }),

      setError: (error: string | null) => set({ error }),

      setCreateDialogOpen: (isCreateDialogOpen: boolean) => set({ isCreateDialogOpen }),

      clearError: () => set({ error: null }),

      clearCurrentQuiz: () => set({ currentQuiz: null }),
    }),
    {
      name: QUIZ_STORE_NAME,
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        selectedQuizId: state.selectedQuizId,
      }),
    }
  )
);
