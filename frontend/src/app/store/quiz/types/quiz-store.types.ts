import { IQuiz, IQuizSummary } from '../../../../entities/quiz/model/quiz';

export interface IQuizState {
  quizzes: IQuizSummary[];
  currentQuiz: IQuiz | null;
  selectedQuizId: string | null;
  isLoading: boolean;
  error: string | null;
  isCreateDialogOpen: boolean;
}

export interface IQuizActions {
  setQuizzes: (quizzes: IQuizSummary[]) => void;
  setCurrentQuiz: (quiz: IQuiz | null) => void;
  setSelectedQuizId: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCreateDialogOpen: (open: boolean) => void;
  clearError: () => void;
  clearCurrentQuiz: () => void;
}

export type IQuizStore = IQuizState & IQuizActions;
