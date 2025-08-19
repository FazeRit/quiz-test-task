import { createAnswerSchema, createQuestionSchema, createQuizSchema } from '../schemas/quiz-create.schema';
import { z } from 'zod';

export type IQuizCreateForm = z.infer<typeof createQuizSchema>;
export type IQuestionCreateForm = z.infer<typeof createQuestionSchema>;
export type IAnswerCreateForm = z.infer<typeof createAnswerSchema>;

export interface IQuizCreateFormProps {
  onSuccess?: (quizId: string) => void;
  initialData?: Partial<IQuizCreateForm>;
}

export interface IQuizFormState {
  isSubmitting: boolean;
  currentStep: number;
  totalSteps: number;
}

export interface IQuizFormHandlers {
  onSubmit: (data: IQuizCreateForm) => Promise<void>;
  onAddQuestion: () => void;
  onRemoveQuestion: (index: number) => void;
  onAddAnswer: (questionIndex: number) => void;
  onRemoveAnswer: (questionIndex: number, answerIndex: number) => void;
}
