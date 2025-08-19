export const RouterKeys = {
  HOME: '/',
  AUTH: {
    SIGN_IN: '/auth/sign-in',
    SIGN_UP: '/auth/sign-up',
  },
  QUIZ: {
    LIST: '/quizzes',
    DETAIL: (id: string) => `/quizzes/${id}`,
    CREATE: '/create',
  },
} as const;
