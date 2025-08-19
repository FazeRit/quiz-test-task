import { ICreateQuizDto, IQuiz } from '../../../entities/quiz/model/quiz';
import { QUERY_KEYS } from '../../../shared/constants/query.keys';
import { quizService } from '../../../entities/quiz/api/quiz.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../../shared/hooks/useToast';

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (quizData: ICreateQuizDto) => quizService.createQuiz(quizData),
    onSuccess: (newQuiz: IQuiz) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUIZ.ALL });
      queryClient.setQueryData(QUERY_KEYS.QUIZ.DETAIL(newQuiz.id), newQuiz);
    },
    onError: (error: Error) => {
      toast.error(`Failed to create quiz: ${error.message}`, {
        duration: 6000,
      });
    },
  });
};
