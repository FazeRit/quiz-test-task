import { Injectable } from '@nestjs/common';
import { QuizReadService } from '../quiz-read-service/quiz-read.service';
import { QuizWriteService } from '../quiz-write-service/quiz-write.service';
import { CreateQuizDto } from '../../dto/request/create-quiz.dto';
import { QuizListResponseDto } from '../../dto/response/quiz-list.response';
import { QuizDetailResponseDto } from '../../dto/response/quiz-detail.response';

@Injectable()
export class QuizFacadeService {
  constructor(
    private readonly quizReadService: QuizReadService,
    private readonly quizWriteService: QuizWriteService,
  ) {}

  async createQuiz(
    createQuizDto: CreateQuizDto,
  ): Promise<QuizDetailResponseDto> {
    return this.quizWriteService.create(createQuizDto);
  }

  async getAllQuizzes(): Promise<QuizListResponseDto[]> {
    return this.quizReadService.findAll();
  }

  async getQuizById(id: string): Promise<QuizDetailResponseDto> {
    return this.quizReadService.findById(id);
  }

  async deleteQuiz(id: string): Promise<void> {
    return this.quizWriteService.delete(id);
  }
}
