import { QuestionType } from '@prisma/client';

export class QuizDetailResponseDto {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  questions: QuestionDetailDto[];
}

export class QuestionDetailDto {
  id: string;
  text: string;
  type: QuestionType;
  order: number;
  options: AnswerDetailDto[];
}

export class AnswerDetailDto {
  id: string;
  text: string;
  isCorrect: boolean;
}
