import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { QuizDetailResponseDto } from '../../dto/response/quiz-detail.response';
import { QuizListResponseDto } from '../../dto/response/quiz-list.response';

@Injectable()
export class QuizReadService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<QuizListResponseDto[]> {
    const quizzes = await this.prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            questions: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      questionCount: quiz._count.questions,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    }));
  }

  async findById(id: string): Promise<QuizDetailResponseDto> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
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

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return {
      ...quiz,
      questions: quiz.questions.map((question) => ({
        ...question,
        options: question.options,
      })),
    };
  }

  async exists(id: string): Promise<boolean> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!quiz;
  }
}
