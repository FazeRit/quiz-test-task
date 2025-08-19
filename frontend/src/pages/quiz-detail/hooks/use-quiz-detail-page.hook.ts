import { EQuestionType } from '../../../entities/quiz/model/quiz';
import { IUseQuizDetailPageReturn } from '../types/use-quiz-detail-page.types';
import { RouterKeys } from '../../../shared/constants/router-keys.const';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuiz } from '../../../features/quiz-detail/api/use-quiz.hook';

export const useQuizDetailPage = (): IUseQuizDetailPageReturn => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const quizId = id!;
  const { data: quiz, error } = useQuiz(quizId);

  const handleBack = useCallback(() => {
    navigate(RouterKeys.QUIZ.LIST);
  }, [navigate]);

  const handleEdit = useCallback(() => {
    navigate(RouterKeys.QUIZ.CREATE + `?edit=${quizId}`);
  }, [navigate, quizId]);

  return {
    quizId,
    quiz: quiz || null,
    error,
    handleBack,
    handleEdit,
  };
};
