import { QUERY_KEYS } from '../../../shared/constants/query.keys';
import { quizService } from '../../../entities/quiz/api/quiz.service';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '../../../shared/hooks/useToast';

export const useQuiz = (id: string) => {
  const toast = useToast();

  const query = useQuery({
    queryKey: QUERY_KEYS.QUIZ.DETAIL(id),
    queryFn: () => quizService.getQuizById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.error) {
      const errorMessage = query.error instanceof Error ? query.error.message : 'Failed to load quiz';
      toast.error(errorMessage);
    }
  }, [query.error, toast]);

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};
