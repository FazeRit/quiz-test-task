import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { IQuiz, IQuizSummary } from '../../entities/quiz/model/quiz';

interface IQuizState {
  quizzes: IQuizSummary[];
  currentQuiz: IQuiz | null;
  selectedQuizId: string | null;
  isLoading: boolean;
  error: string | null;
  isCreateDialogOpen: boolean;
}

interface IQuizActions {
  setQuizzes: (quizzes: IQuizSummary[]) => void;
  setCurrentQuiz: (quiz: IQuiz | null) => void;
  setSelectedQuizId: (id: string | null) => void;
  addQuiz: (quiz: IQuizSummary) => void;
  removeQuiz: (quizId: string) => void;
  updateQuiz: (quizId: string, updatedQuiz: Partial<IQuizSummary>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCreateDialogOpen: (open: boolean) => void;
  clearError: () => void;
  clearCurrentQuiz: () => void;
}

type IQuizStore = IQuizState & IQuizActions;

const initialState: IQuizState = {
  quizzes: [],
  currentQuiz: null,
  selectedQuizId: null,
  isLoading: false,
  error: null,
  isCreateDialogOpen: false,
};

export const useQuizStore = create<IQuizStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setQuizzes: (quizzes: IQuizSummary[]) => set({ quizzes }),

      setCurrentQuiz: (currentQuiz: IQuiz | null) => set({ currentQuiz }),

      setSelectedQuizId: (selectedQuizId: string | null) => set({ selectedQuizId }),

      addQuiz: (quiz: IQuizSummary) => set(state => ({ quizzes: [quiz, ...state.quizzes] })),

      removeQuiz: (quizId: string) =>
        set(state => ({
          quizzes: state.quizzes.filter(quiz => quiz.id !== quizId),
          currentQuiz: state.currentQuiz?.id === quizId ? null : state.currentQuiz,
          selectedQuizId: state.selectedQuizId === quizId ? null : state.selectedQuizId,
        })),

      updateQuiz: (quizId: string, updatedQuiz: Partial<IQuizSummary>) =>
        set(state => ({
          quizzes: state.quizzes.map(quiz => (quiz.id === quizId ? { ...quiz, ...updatedQuiz } : quiz)),
        })),

      setLoading: (isLoading: boolean) => set({ isLoading }),

      setError: (error: string | null) => set({ error, isLoading: false }),

      setCreateDialogOpen: (isCreateDialogOpen: boolean) => set({ isCreateDialogOpen }),

      clearError: () => set({ error: null }),

      clearCurrentQuiz: () => set({ currentQuiz: null }),
    }),
    {
      name: 'quiz-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        selectedQuizId: state.selectedQuizId,
        // Не зберігаємо quizzes та currentQuiz в localStorage, тільки selectedQuizId
      }),
    }
  )
);
