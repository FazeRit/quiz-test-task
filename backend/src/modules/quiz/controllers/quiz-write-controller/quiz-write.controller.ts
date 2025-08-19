import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateQuizDto } from '../../dto/request/create-quiz.dto';
import { QuizDetailResponseDto } from '../../dto/response/quiz-detail.response';
import { QuizFacadeService } from '../../services/quiz-facade-service/quiz-facade.service';

@Controller('quizzes')
export class QuizWriteController {
  constructor(private readonly facade: QuizFacadeService) {}

  @Post()
  async create(
    @Body() createQuizDto: CreateQuizDto,
  ): Promise<QuizDetailResponseDto> {
    return this.facade.createQuiz(createQuizDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.facade.deleteQuiz(id);
  }
}
