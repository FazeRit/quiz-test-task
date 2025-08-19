import { Controller, Get, Param } from '@nestjs/common';
import { QuizDetailResponseDto } from '../../dto/response/quiz-detail.response';
import { QuizFacadeService } from '../../services/quiz-facade-service/quiz-facade.service';
import { QuizListResponseDto } from '../../dto/response/quiz-list.response';

@Controller('quizzes')
export class QuizReadController {
  constructor(private readonly facade: QuizFacadeService) {}

  @Get()
  async findAll(): Promise<QuizListResponseDto[]> {
    return this.facade.getAllQuizzes();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<QuizDetailResponseDto> {
    return this.facade.getQuizById(id);
  }
}
