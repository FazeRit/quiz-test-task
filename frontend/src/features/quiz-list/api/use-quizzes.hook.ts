import { QUERY_KEYS } from '../../../shared/constants/query.keys';
import { quizService } from '../../../entities/quiz/api/quiz.service';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '../../../shared/hooks/useToast';

export const useQuizzes = () => {
  const toast = useToast();

  const query = useQuery({
    queryKey: QUERY_KEYS.QUIZ.ALL,
    queryFn: () => quizService.getQuizzes(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.error) {
      const errorMessage = query.error instanceof Error ? query.error.message : 'Failed to load quizzes';
      toast.error(errorMessage);
    }
  }, [query.error, toast]);

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};
