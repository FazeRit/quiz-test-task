import { IQuizState } from '../types/quiz-store.types';

export const QUIZ_STORE_NAME = 'quiz-storage';

export const QUIZ_INITIAL_STATE: IQuizState = {
  quizzes: [],
  currentQuiz: null,
  selectedQuizId: null,
  isLoading: false,
  error: null,
  isCreateDialogOpen: false,
};
