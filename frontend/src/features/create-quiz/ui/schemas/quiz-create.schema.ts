import { EQuestionType } from '../../../../entities/quiz/model/quiz';
import { z } from 'zod';

export const createAnswerSchema = z.object({
  text: z.string().min(1, 'Answer text is required'),
  isCorrect: z.boolean(),
});

export const createQuestionSchema = z
  .object({
    text: z.string().min(1, 'Question text is required'),
    type: z.nativeEnum(EQuestionType),
    order: z.number().min(1, 'Order must be at least 1'),
    options: z.array(createAnswerSchema).optional(),
  })
  .refine(
    data => {
      if (data.type === EQuestionType.TEXT) {
        return true;
      }
      return data.options && data.options.length >= 1;
    },
    {
      message: 'At least one answer option is required for non-text questions',
      path: ['options'],
    }
  );

export const createQuizSchema = z.object({
  title: z.string().min(1, 'Quiz title is required').max(255, 'Title is too long'),
  description: z.string().optional(),
  questions: z.array(createQuestionSchema).min(1, 'At least one question is required'),
});
