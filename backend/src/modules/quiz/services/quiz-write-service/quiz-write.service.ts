import { CreateQuizDto } from '../../dto/request/create-quiz.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { QuizDetailResponseDto } from '../../dto/response/quiz-detail.response';

@Injectable()
export class QuizWriteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto): Promise<QuizDetailResponseDto> {
    const { questions, ...quizData } = createQuizDto;

    const quiz = await this.prisma.quiz.create({
      data: {
        ...quizData,
        questions: {
          create: questions.map((question) => ({
            text: question.text,
            type: question.type,
            order: question.order,
            options: {
              create: question.options.map((option) => ({
                text: option.text,
                isCorrect: option.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    return {
      ...quiz,
      questions: quiz.questions.map((question) => ({
        ...question,
        options: question.options,
      })),
    };
  }

  async delete(id: string): Promise<void> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    await this.prisma.quiz.delete({
      where: { id },
    });
  }
}
