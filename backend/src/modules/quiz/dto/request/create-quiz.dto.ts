import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateQuizDto {
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsInt()
  @Min(1)
  order: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  options: CreateAnswerDto[];
}

export class CreateAnswerDto {
  @IsString()
  text: string;

  @IsBoolean()
  isCorrect: boolean;
}
