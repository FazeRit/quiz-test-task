export class QuizListResponseDto {
  id: string;
  title: string;
  description: string | null;
  questionCount: number;
  createdAt: Date;
  updatedAt: Date;
}
