import { IQuizSummary } from '../../../../entities/quiz/model/quiz';

export interface IQuizListProps {
  onQuizSelect?: (quizId: string) => void;
  onQuizDelete?: (quizId: string) => void;
}

export interface IQuizCardProps {
  quiz: IQuizSummary;
  onSelect?: (quizId: string) => void;
  onDelete?: (quizId: string) => void;
}
