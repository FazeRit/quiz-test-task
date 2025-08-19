export interface IQuizCreatePageProps {
  className?: string;
}

export interface IQuizCreatePageHandlers {
  handleBack: () => void;
  handleSuccess: (quizId: string) => void;
}

export interface IQuizCreatePageState {
  isEdit: boolean;
  editId: string | null;
}
