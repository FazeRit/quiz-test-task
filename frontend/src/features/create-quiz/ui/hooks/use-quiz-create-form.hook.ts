import { createQuizSchema } from '../schemas/quiz-create.schema';
import { EQuestionType } from '../../../../entities/quiz/model/quiz';
import { IQuizCreateForm, IQuizFormHandlers, IQuizFormState } from '../types/quiz-create-form.types';
import { useCallback } from 'react';
import { useCreateQuiz } from '../../api/use-create-quiz.hook';
import { useFieldArray, useForm } from 'react-hook-form';
import { useToast } from '../../../../shared/hooks/useToast';
import { zodResolver } from '@hookform/resolvers/zod';

interface IUseQuizCreateFormProps {
  onSuccess?: (quizId: string) => void;
  initialData?: Partial<IQuizCreateForm>;
}

interface IUseQuizCreateFormReturn extends IQuizFormHandlers, IQuizFormState {
  form: ReturnType<typeof useForm<IQuizCreateForm>>;
  questionFields: any[];
}

export const useQuizCreateForm = ({ onSuccess, initialData }: IUseQuizCreateFormProps): IUseQuizCreateFormReturn => {
  const toast = useToast();
  const createQuizMutation = useCreateQuiz();

  const form = useForm<IQuizCreateForm>({
    resolver: zodResolver(createQuizSchema),
    mode: 'onChange',
    defaultValues: initialData || {
      title: '',
      description: '',
      questions: [
        {
          text: '',
          type: EQuestionType.MULTIPLE_CHOICE,
          order: 1,
          options: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
          ],
        },
      ],
    },
  });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  const onSubmit = useCallback(
    async (data: IQuizCreateForm) => {

      try {
        const questionsWithOrder = data.questions.map((question, index) => {
          const { order, ...questionWithoutOrder } = question;
          let processedQuestion: any = {
            ...questionWithoutOrder,
            order: index + 1,
          };

          if (question.type === EQuestionType.TEXT) {
            processedQuestion.options = [];
          }

          return processedQuestion;
        });

        const quizData = {
          ...data,
          questions: questionsWithOrder,
        };

        const result = await createQuizMutation.mutateAsync(quizData);
        toast.success(`Quiz "${result.title}" created successfully!`);
        onSuccess?.(result.id);
      } catch (error) {
        toast.error('Failed to save quiz. Please try again.');
      }
    },
    [createQuizMutation, toast, onSuccess]
  );

  const onAddQuestion = useCallback(() => {
    appendQuestion({
      text: '',
      type: EQuestionType.MULTIPLE_CHOICE,
      order: questionFields.length + 1,
      options: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ],
    });
  }, [appendQuestion, questionFields.length]);

  const onRemoveQuestion = useCallback(
    (index: number) => {
      if (questionFields.length === 1) {
        toast.warning('Quiz must have at least one question');
        return;
      }
      removeQuestion(index);
    },
    [removeQuestion, questionFields.length, toast]
  );

  const onAddAnswer = useCallback(
    (questionIndex: number) => {
      const currentOptions = form.getValues(`questions.${questionIndex}.options`);
      form.setValue(`questions.${questionIndex}.options`, [...(currentOptions || []), { text: '', isCorrect: false }]);
    },
    [form]
  );

  const onRemoveAnswer = useCallback(
    (questionIndex: number, answerIndex: number) => {
      const currentOptions = form.getValues(`questions.${questionIndex}.options`);
      if (currentOptions && currentOptions.length === 1) {
        toast.warning('Question must have at least one answer option');
        return;
      }
      const newOptions = currentOptions?.filter((_, index) => index !== answerIndex);
      form.setValue(`questions.${questionIndex}.options`, newOptions);
    },
    [form, toast]
  );

  return {
    form,
    questionFields,
    isSubmitting: form.formState.isSubmitting || createQuizMutation.isPending,
    currentStep: 1,
    totalSteps: 1,
    onSubmit,
    onAddQuestion,
    onRemoveQuestion,
    onAddAnswer,
    onRemoveAnswer,
  };
};
