import { EQuestionType } from '../../../entities/quiz/model/quiz';

export const QUESTION_TYPE_CONFIG = {
  [EQuestionType.MULTIPLE_CHOICE]: {
    label: 'Multiple Choice',
    color: 'primary' as const,
  },
  [EQuestionType.TRUE_FALSE]: {
    label: 'True/False',
    color: 'secondary' as const,
  },
  [EQuestionType.TEXT]: {
    label: 'Text Input',
    color: 'success' as const,
  },
} as const;

export const QUIZ_DETAIL_PAGE_CONFIG = {
  title: 'Quiz Details',
  backButtonText: 'Back to Quizzes',
  questionsTitle: 'Questions',
  answersTitle: 'Answer Options',
  correctAnswerText: 'Correct',
} as const;
