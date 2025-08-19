import { EQuestionType } from '../../../entities/quiz/model/quiz';

export interface IQuizDetailPageProps {
  className?: string;
}

export interface IQuizDetailPageHandlers {
  handleBack: () => void;
  handleEdit: () => void;
}

export interface IQuizDetailPageState {
  error: Error | null;
  quiz: any | null;
}
