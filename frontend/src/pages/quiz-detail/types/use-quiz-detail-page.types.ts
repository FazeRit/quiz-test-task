import { IQuiz } from '../../../entities/quiz/model';
import { IQuizDetailPageHandlers, IQuizDetailPageState } from './quiz-detail-page.types';

export interface IUseQuizDetailPageReturn extends IQuizDetailPageHandlers, IQuizDetailPageState {
  quizId: string;
  quiz: IQuiz | null;
}
