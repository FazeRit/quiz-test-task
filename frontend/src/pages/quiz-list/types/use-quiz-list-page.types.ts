import { IQuizListPageHandlers, IQuizListPageState } from './quiz-list-page.types';
import { IQuizSummary } from '../../../entities/quiz/model';

export interface IUseQuizListPageReturn extends IQuizListPageHandlers, IQuizListPageState {
  quizzes: IQuizSummary[];
}
