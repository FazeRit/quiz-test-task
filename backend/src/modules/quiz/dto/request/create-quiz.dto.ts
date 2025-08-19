import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsString,
  Min,
  ValidateNested
} from 'class-validator';
import { QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateQuizDto {
  @IsString()
  public title: string = '';

  @IsString()
  public description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  public questions: CreateQuestionDto[] = [];
}

export class CreateQuestionDto {
  @IsString()
  public text: string = '';

  @IsEnum(QuestionType)
  public type: QuestionType = QuestionType.MULTIPLE_CHOICE;

  @IsInt()
  @Min(1)
  public order: number = 1;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  public options: CreateAnswerDto[] = [];
}

export class CreateAnswerDto {
  @IsString()
  public text: string = '';

  @IsBoolean()
  public isCorrect: boolean = false;
}
