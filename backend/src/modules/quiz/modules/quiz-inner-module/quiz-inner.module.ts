import { Module } from '@nestjs/common';
import { QuizFacadeService } from '../../services/quiz-facade-service/quiz-facade.service';
import { QuizReadController } from '../../controllers/quiz-read-controller/quiz-read.controller';
import { QuizReadService } from '../../services/quiz-read-service/quiz-read.service';
import { QuizWriteController } from '../../controllers/quiz-write-controller/quiz-write.controller';
import { QuizWriteService } from '../../services/quiz-write-service/quiz-write.service';

@Module({
  controllers: [QuizReadController, QuizWriteController],
  providers: [QuizReadService, QuizWriteService, QuizFacadeService],
})
export class QuizInnerModule {}
