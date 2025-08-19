import React from 'react';
import { AppRoutes } from '../enum/app-router.enum';
import { QuizCreatePage, QuizDetailPage, QuizListPage, SignInPage, SignUpPage } from '../../../../pages';
import type { RouteConfig } from '../types';
import { RouterKeys } from '../../../../shared/constants/router-keys.const';

export const routeConfig: RouteConfig = {
  [AppRoutes.HOME]: {
    path: RouterKeys.HOME,
    element: <QuizListPage />,
    authOnly: false,
  },
  [AppRoutes.SIGN_IN]: {
    path: RouterKeys.AUTH.SIGN_IN,
    element: <SignInPage />,
    authOnly: false,
  },
  [AppRoutes.SIGN_UP]: {
    path: RouterKeys.AUTH.SIGN_UP,
    element: <SignUpPage />,
    authOnly: false,
  },
  [AppRoutes.QUIZ_LIST]: {
    path: RouterKeys.QUIZ.LIST,
    element: <QuizListPage />,
    authOnly: true,
  },
  [AppRoutes.QUIZ_DETAIL]: {
    path: '/quizzes/:id',
    element: <QuizDetailPage />,
    authOnly: true,
  },
  [AppRoutes.QUIZ_CREATE]: {
    path: RouterKeys.QUIZ.CREATE,
    element: <QuizCreatePage />,
    authOnly: true,
  },
} as RouteConfig;
