import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from './modules/jwt/jwt.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/modules/prisma.module';
import { QuizModule } from './modules/quiz/quiz.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    JwtModule,
    QuizModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
