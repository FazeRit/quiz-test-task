import { IUseQuizListPageReturn } from '../types/use-quiz-list-page.types';
import { RouterKeys } from '../../../shared/constants/router-keys.const';
import { useCallback } from 'react';
import { useDeleteQuiz } from '../../../features/delete-quiz/api/use-delete-quiz.hook';
import { useNavigate } from 'react-router-dom';
import { useQuizzes } from '../../../features/quiz-list/api/use-quizzes.hook';
import { useToast } from '../../../shared/hooks/useToast';

export const useQuizListPage = (): IUseQuizListPageReturn => {
  const navigate = useNavigate();
  const toast = useToast();
  const { data: quizzes, error } = useQuizzes();
  const deleteQuizMutation = useDeleteQuiz();

  const handleQuizSelect = useCallback(
    (quizId: string) => {
      navigate(RouterKeys.QUIZ.DETAIL(quizId));
    },
    [navigate]
  );

  const handleQuizDelete = useCallback(
    (quizId: string) => {
      if (window.confirm('Are you sure you want to delete this quiz?')) {
        deleteQuizMutation.mutate(quizId, {
          onSuccess: () => {
            toast.success('Quiz deleted successfully');
          },
          onError: (error: Error) => {
            toast.error(`Failed to delete quiz: ${error.message}`);
          },
        });
      }
    },
    [deleteQuizMutation, toast]
  );

  const handleCreateQuiz = useCallback(() => {
    navigate(RouterKeys.QUIZ.CREATE);
  }, [navigate]);

  return {
    quizzes,
    error,
    handleQuizSelect,
    handleQuizDelete,
    handleCreateQuiz,
  };
};
