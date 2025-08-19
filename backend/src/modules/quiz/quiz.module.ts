import { Module } from '@nestjs/common';
import { QuizInnerModule } from './modules/quiz-inner-module/quiz-inner.module';

@Module({
  imports: [QuizInnerModule],
})
export class QuizModule {}
