export class QuizListResponseDto {
  public id: string;
  public title: string;
  public description: string | null = null;
  public questionCount: number;
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();

  constructor(quiz: QuizListResponseDto) {
    this.id = quiz.id;
    this.title = quiz.title;
    this.description = quiz.description;
    this.questionCount = quiz.questionCount;
  }
}
