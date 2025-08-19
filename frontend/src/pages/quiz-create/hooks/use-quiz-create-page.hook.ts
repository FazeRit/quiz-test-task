import { IUseQuizCreatePageReturn } from '../types/use-quiz-create-page.types';
import { RouterKeys } from '../../../shared/constants/router-keys.const';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useQuizCreatePage = (): IUseQuizCreatePageReturn => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(RouterKeys.QUIZ.LIST);
  }, [navigate]);

  const handleSuccess = useCallback(
    (quizId: string) => {
      navigate(RouterKeys.QUIZ.DETAIL(quizId));
    },
    [navigate]
  );

  return {
    handleBack,
    handleSuccess,
  };
};
