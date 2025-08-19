export interface IQuizListPageProps {
  className?: string;
}

export interface IQuizListPageHandlers {
  handleQuizSelect: (quizId: string) => void;
  handleQuizDelete: (quizId: string) => void;
  handleCreateQuiz: () => void;
}

export interface IQuizListPageState {
  error: Error | null;
}
