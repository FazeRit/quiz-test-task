import { lazy } from 'react';

export const SignInPage = lazy(() =>
  import('./auth/sign-in/sign-in.page').then(module => ({
    default: module.SignInPage,
  }))
);

export const SignUpPage = lazy(() =>
  import('./auth/sign-up/sign-up.page').then(module => ({
    default: module.SignUpPage,
  }))
);

export const QuizListPage = lazy(() =>
  import('./quiz-list/quiz-list.page').then(module => ({
    default: module.QuizListPage,
  }))
);

export const QuizDetailPage = lazy(() =>
  import('./quiz-detail/quiz-detail.page').then(module => ({
    default: module.QuizDetailPage,
  }))
);

export const QuizCreatePage = lazy(() =>
  import('./quiz-create/quiz-create.page').then(module => ({
    default: module.QuizCreatePage,
  }))
);
