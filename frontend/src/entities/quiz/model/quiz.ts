export interface IQuiz {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  questions: IQuestion[];
}

export interface IQuizSummary {
  id: string;
  title: string;
  description: string | null;
  questionCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuestion {
  id: string;
  text: string;
  type: EQuestionType;
  order: number;
  options: IAnswer[];
}

export interface IAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export enum EQuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  TEXT = 'TEXT',
}

export interface ICreateQuizDto {
  title: string;
  description?: string;
  questions: ICreateQuestionDto[];
}

export interface ICreateQuestionDto {
  text: string;
  type: EQuestionType;
  order: number;
  options?: ICreateAnswerDto[];
}

export interface ICreateAnswerDto {
  text: string;
  isCorrect: boolean;
}
