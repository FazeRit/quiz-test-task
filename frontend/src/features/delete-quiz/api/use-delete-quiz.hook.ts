import { QUERY_KEYS } from '../../../shared/constants/query.keys';
import { quizService } from '../../../entities/quiz/api/quiz.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../../shared/hooks/useToast';

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (quizId: string) => quizService.deleteQuiz(quizId),
    onSuccess: (_, deletedQuizId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUIZ.ALL });

      queryClient.removeQueries({
        queryKey: QUERY_KEYS.QUIZ.DETAIL(deletedQuizId),
      });
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete quiz: ${error.message}`);
    },
  });
};
