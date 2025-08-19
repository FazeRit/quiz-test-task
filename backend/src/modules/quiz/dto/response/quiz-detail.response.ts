import { QuestionType } from '@prisma/client';

export class QuizDetailResponseDto {
  public id: string;
  public title: string;
  public description: string | null;
  public createdAt: Date;
  public updatedAt: Date;
  public questions: QuestionDetailDto[];

  constructor(quiz: QuizDetailResponseDto) {
    this.id = quiz.id;
    this.title = quiz.title;
    this.description = quiz.description;
    this.createdAt = quiz.createdAt;
    this.updatedAt = quiz.updatedAt;
    this.questions = quiz.questions;
  }
}

export class QuestionDetailDto {
  public id: string;
  public text: string;
  public type: QuestionType;
  public order: number;
  public options: AnswerDetailDto[];

  constructor(question: QuestionDetailDto) {
    this.id = question.id;
    this.text = question.text;
    this.type = question.type;
    this.order = question.order;
    this.options = question.options;
  }
}

export class AnswerDetailDto {
  public id: string;
  public text: string;
  public isCorrect: boolean;

  constructor(answer: AnswerDetailDto) {
    this.id = answer.id;
    this.text = answer.text;
    this.isCorrect = answer.isCorrect;
  }
}
