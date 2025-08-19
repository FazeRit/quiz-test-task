import { apiClient } from '../../../shared/api/base/api-client';
import { ICreateQuizDto, IQuiz, IQuizSummary } from '../model/quiz';

class QuizService {
  private api = apiClient;

  async getQuizzes(): Promise<IQuizSummary[]> {
    const response = await this.api.get<IQuizSummary[]>('/quizzes');
    return response.data;
  }

  async getQuizById(id: string): Promise<IQuiz> {
    const response = await this.api.get<IQuiz>(`/quizzes/${id}`);
    return response.data;
  }

  async createQuiz(quizData: ICreateQuizDto): Promise<IQuiz> {
    const response = await this.api.post<IQuiz>('/quizzes', quizData);
    return response.data;
  }

  async deleteQuiz(id: string): Promise<void> {
    await this.api.delete(`/quizzes/${id}`);
  }
}

export const quizService = new QuizService();
